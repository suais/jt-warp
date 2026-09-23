/*!
 * JT/T 808 & 809 解析器回归测试
 * 运行： node test/regression.mjs
 */
import { parse, buildFrame, bytesToHex, escape, unescape, xorChecksum, hexToBytes, scanEmbedded, parseRawBody, findHeadPlate } from '../src/parser.js';

let pass = 0, fail = 0;
const failures = [];
function eq(name, actual, expected) {
  const a = String(actual), e = String(expected);
  if (a === e) { pass++; console.log(`  \u2713 ${name} = ${a}`); }
  else { fail++; failures.push(name); console.log(`  \u2717 ${name}: 期望 "${e}"，实际 "${a}"`); }
}
function ok(name, cond, extra = '') {
  if (cond) { pass++; console.log(`  \u2713 ${name} ${extra}`); }
  else { fail++; failures.push(name); console.log(`  \u2717 ${name} ${extra}`); }
}
function includes(name, haystack, needle) {
  ok(name, String(haystack).includes(needle), `"${haystack}" 含 "${needle}"`);
}
function walk(arr, key) {
  for (const it of arr || []) {
    if (it.key === key) return it;
    if (it.children) { const r = walk(it.children, key); if (r) return r; }
  }
  return null;
}
const G = (res, key) => walk(res.bodyFields, key);
function dump(res) {
  const rec = (arr, d = 0) => {
    for (const it of arr || []) {
      const v = it.value === undefined ? '' : `: ${it.value}`;
      console.log(`${'    '.repeat(d)}- ${it.label}${v}${it.hint ? '   // ' + it.hint : ''}`);
      if (it.children) rec(it.children, d + 1);
    }
  };
  rec(res.bodyFields);
}

/* GBK 反查（测试构造用） */
const _td = new TextDecoder('gbk');
function gbkOf(str) {
  const out = [];
  for (const ch of str) {
    const code = ch.codePointAt(0);
    if (code < 0x80) { out.push(code); continue; }
    let found = false;
    for (let hi = 0x81; hi <= 0xFE && !found; hi++) {
      for (let lo = 0x40; lo <= 0xFE; lo++) {
        if (lo === 0x7F) continue;
        if (_td.decode(new Uint8Array([hi, lo])) === ch) { out.push(hi, lo); found = true; break; }
      }
    }
    if (!found) out.push(0x3f);
  }
  return out;
}
const i32be = (v) => [(v >>> 24) & 0xff, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff];
const i16be = (v) => [(v >> 8) & 0xff, v & 0xff];
const fixed = (bytes, n) => bytes.concat(new Array(Math.max(0, n - bytes.length)).fill(0));

/* 常用测试坐标（北纬 31.230416 / 东经 121.473701）*/
const LAT = 31230416, LON = 121473701;
/* 状态 = ACC开(0) + 已定位(1) + 北纬(2) + 东经(3) = 0x0F */
const STATUS_OK = 0x0f;

/* ============================================================
 * 用例 1：0x0200 位置汇报（2013 版，含附加项）
 * ========================================================== */
console.log('\n=== 用例 1: 0x0200 位置信息汇报 (2013 版) ===');
{
  const body = [
    ...i32be(0x00000001),   // 报警标志：紧急报警
    ...i32be(STATUS_OK),    // 状态
    ...i32be(LAT), ...i32be(LON),
    ...i16be(50),           // 高程
    ...i16be(650),          // 速度 65.0 km/h
    ...i16be(90),           // 方向
    0x24, 0x01, 0x01, 0x12, 0x00, 0x00,  // 2024-01-01 12:00:00
    0x01, 0x04, 0x00, 0x00, 0x30, 0x39,  // 附加项 0x01 里程 = 12345
    0x0d, 0x01, 0x1c,                    // 附加项 0x0d 信号强度
    0x0e, 0x01, 0x0c,                    // 附加项 0x0e 卫星数
  ];
  const frame = buildFrame(0x0200, { phone: '13800138000', seq: 0x0123, version: 1 }, new Uint8Array(body));
  console.log('  报文:', bytesToHex(frame));
  const res = parse(bytesToHex(frame));
  dump(res);
  eq('协议版本', res.versionText, 'JT/T 808-2011/2013');
  eq('消息名', res.msgName, '位置信息汇报');
  eq('流水号', res.header.seq, 291);
  eq('终端手机号', res.header.phone, '13800138000');
  ok('校验码通过', res.checksum.ok === true);
  ok('无警告', res.warnings.length === 0, `警告数 ${res.warnings.length}`);
  eq('纬度', G(res, 'LAT').value, '31.230416°  北纬 (N)');
  eq('经度', G(res, 'LON').value, '121.473701°  东经 (E)');
  eq('高程', G(res, 'ALTITUDE').value, '50 米');
  eq('速度', G(res, 'SPEED').value, '65.0 km/h');
  eq('方向', G(res, 'DIRECTION').value, '90°');
  eq('GPS 时间', G(res, 'TIME').value, '2024-01-01 12:00:00');
  includes('报警标志含紧急报警', G(res, 'ALARM_FLAG').onList.join('、'), '紧急报警');
  const stOn = G(res, 'STATUS').onList.join('、');
  includes('状态含 ACC 开', stOn, 'ACC 开');
  includes('状态含已定位', stOn, '已定位');
  eq('附加项数量', G(res, 'EXTRAS').children.length, 3);
  eq('附加项里程', G(res, 'EXTRA_0x01').value, '12345');
  eq('附加项卫星数', G(res, 'EXTRA_0x0E').value, '12');
}

/* ============================================================
 * 用例 2：0x0100 终端注册（2019 版，含 VIN）
 * ========================================================== */
console.log('\n=== 用例 2: 0x0100 终端注册 (2019 版) ===');
{
  const body = [
    ...i16be(61), ...i16be(3000),
    ...fixed(gbkOf('RENMI'), 5),
    ...fixed(gbkOf('RZ-X1'), 20),
    ...fixed(gbkOf('1234567'), 7),
    0x01,                                  // 车牌颜色 蓝
    ...fixed(gbkOf('LSVAM4187C2188888'), 17),
  ];
  const frame = buildFrame(0x0100, { phone: '13800138000', seq: 1, version: 2 }, new Uint8Array(body));
  console.log('  报文:', bytesToHex(frame));
  const res = parse(bytesToHex(frame));
  dump(res);
  eq('协议版本', res.versionText, 'JT/T 808-2019');
  eq('版本号字段', res.header.versionNo, 1);
  eq('终端手机号（10 字节 BCD）', res.header.phone, '13800138000');
  ok('校验码通过', res.checksum.ok === true);
  ok('无警告', res.warnings.length === 0, res.warnings.join('|'));
  includes('省域=陕西', G(res, 'PROVINCE').hint, '陕西省');
  eq('制造商 ID', G(res, 'MFR').value, 'RENMI');
  eq('终端型号', G(res, 'MODEL').value, 'RZ-X1');
  eq('终端 ID', G(res, 'TERM_ID').value, '1234567');
  eq('车牌颜色', G(res, 'PLATE_COLOR').value, '1 - 蓝色');
  eq('VIN', G(res, 'VIN').value, 'LSVAM4187C2188888');
}

/* ============================================================
 * 用例 3：转义处理（0x7E / 0x7D）
 * ========================================================== */
console.log('\n=== 用例 3: 转义字节还原 ===');
{
  const body = [0x01, 0x7e, 0x7d, 0x01, 0x7e, 0xaa];
  const frame = buildFrame(0x0900, { phone: '13900139000', seq: 5, version: 1 }, new Uint8Array(body));
  console.log('  报文:', bytesToHex(frame));
  const res = parse(bytesToHex(frame));
  ok('校验码通过（含转义）', res.checksum.ok === true);
  eq('消息名', res.msgName, '数据上行透传');
  // 未转义总长 = 消息头(12，2013版含手机号6) + 消息体(6) + 校验码(1) = 19
  eq('还原后字节数', res.raw.unescaped.length, 19);
  eq('转义帧长度', frame.length, 24);  // 7E + 转义后22 + 7E
  ok('还原长度 < 转义长度（因转义膨胀）', res.raw.unescaped.length < frame.length - 2,
    `转义 ${frame.length - 2} -> 还原 ${res.raw.unescaped.length}`);
  const idx = res.bodyFields.findIndex((x) => x.key === 'PASS_DATA');
  ok('透传数据已解析', idx >= 0);
  eq('透传数据还原正确', G(res, 'PASS_DATA').value, bytesToHex(new Uint8Array(body.slice(1))));
}
{
  const src = new Uint8Array([0x7e, 0x7d, 0x01, 0x7d, 0x02, 0x00, 0xff]);
  const esc = escape(src);
  eq('转义往返一致', bytesToHex(unescape(esc)), bytesToHex(src));
  eq('转义后长度', esc.length, 10);
  eq('异或校验', xorChecksum(new Uint8Array([0x01, 0x02, 0x03])), 0x00);
}

/* ============================================================
 * 用例 4：0x0001 终端通用应答
 * ========================================================== */
console.log('\n=== 用例 4: 0x0001 终端通用应答 ===');
{
  const frame = buildFrame(0x0001, { phone: '13800138000', seq: 100, version: 1 },
    new Uint8Array([...i16be(42), ...i16be(0x8100), 0x00]));
  const res = parse(bytesToHex(frame));
  dump(res);
  eq('应答流水号', G(res, 'RESP_SEQ').value, 42);
  eq('应答消息 ID', G(res, 'RESP_ID').value, '0x8100');
  includes('应答消息名', G(res, 'RESP_ID').hint, '终端注册应答');
  eq('应答结果', G(res, 'RESULT').value, '0 - 成功/确认');
}

/* ============================================================
 * 用例 5：0x8100 终端注册应答
 * ========================================================== */
console.log('\n=== 用例 5: 0x8100 终端注册应答 ===');
{
  const frame = buildFrame(0x8100, { phone: '13800138000', seq: 2, version: 1 },
    new Uint8Array([...i16be(1), 0x00, ...gbkOf('AUTH2024')]));
  const res = parse(bytesToHex(frame));
  dump(res);
  eq('结果', G(res, 'RESULT').value, '0 - 成功');
  eq('鉴权码', G(res, 'AUTH_CODE').value, 'AUTH2024');
}

/* ============================================================
 * 用例 6：0x8103 设置终端参数
 * ========================================================== */
console.log('\n=== 用例 6: 0x8103 设置终端参数 ===');
{
  const addr = gbkOf('192.168.1.100');
  const body = [
    0x03,
    0x00, 0x00, 0x00, 0x01, 0x04, 0x00, 0x00, 0x00, 0x3c,       // 0x0001 心跳 60
    0x00, 0x00, 0x00, 0x13, addr.length, ...addr,               // 0x0013 主服务器地址
    0x00, 0x00, 0x00, 0x55, 0x04, 0x00, 0x00, 0x03, 0x20,       // 0x0055 最高速度 800
  ];
  const res = parse(bytesToHex(buildFrame(0x8103, { phone: '13800138000', seq: 3, version: 1 }, new Uint8Array(body))));
  dump(res);
  eq('参数总数', G(res, 'PARAM_CNT').value, 3);
  includes('参数1名称', res.bodyFields[1].label, '终端心跳发送间隔');
  eq('参数1值', res.bodyFields[1].value, '60');
  includes('参数2值', res.bodyFields[2].value, '192.168.1.100');
  includes('参数3名称', res.bodyFields[3].label, '最高速度');
  eq('参数3值', res.bodyFields[3].value, '800');
}

/* ============================================================
 * 用例 7：0x0704 定位数据批量上传
 * ========================================================== */
console.log('\n=== 用例 7: 0x0704 定位数据批量上传 ===');
{
  const oneLoc = [
    ...i32be(0), ...i32be(STATUS_OK),
    ...i32be(LAT), ...i32be(LON),
    ...i16be(20), ...i16be(500), ...i16be(180),
    0x24, 0x06, 0x0f, 0x0a, 0x1e, 0x00,
  ];
  const body = [...i16be(2), 0x00,
    ...i16be(oneLoc.length), ...oneLoc,
    ...i16be(oneLoc.length), ...oneLoc,
  ];
  const res = parse(bytesToHex(buildFrame(0x0704, { phone: '13800138000', seq: 20, version: 1 }, new Uint8Array(body))));
  dump(res);
  eq('位置条数', G(res, 'LOC_CNT').value, 2);
  eq('数据类型', G(res, 'LOC_TYPE').value, '0 - 正常位置批量汇报');
  const loc0 = res.bodyFields.find((x) => x.key === 'LOC[0]');
  ok('第 1 条已解析', !!loc0);
  eq('第 1 条纬度', walk(loc0.children, 'LAT').value, '31.230416°  北纬 (N)');
  eq('第 1 条速度', walk(loc0.children, 'SPEED').value, '50.0 km/h');
  ok('无警告', res.warnings.length === 0, res.warnings.join('|'));
}

/* ============================================================
 * 用例 8：809 主链路登录请求
 * ========================================================== */
console.log('\n=== 用例 8: 809 (0x1001) 主链路登录请求 ===');
{
  const body = [
    ...i32be(10001),
    ...fixed(gbkOf('12345678'), 8),
    0xc0, 0xa8, 0x01, 0x64,   // 下级 IP 192.168.1.100
    ...i16be(12345),
    0xc0, 0xa8, 0x01, 0x01,   // 上级 IP 192.168.1.1
    ...i16be(6000),
  ];
  const frame = buildFrame(0x1001, { phone: '13800138000', seq: 1, version: 1 }, new Uint8Array(body));
  console.log('  报文:', bytesToHex(frame));
  const res = parse(bytesToHex(frame));
  dump(res);
  eq('协议族', res.protocol, '809');
  eq('消息名', res.msgName, '主链路登录请求');
  ok('校验码通过', res.checksum.ok === true);
  eq('用户名/接入码', G(res, 'USER_ID').value, '10001');
  eq('密码', G(res, 'PASSWORD').value, '12345678');
  eq('下级平台 IP', G(res, 'DOWN_IP').value, '192.168.1.100');
  eq('下级平台端口', G(res, 'DOWN_PORT').value, 12345);
  eq('上级平台 IP', G(res, 'UP_IP').value, '192.168.1.1');
  eq('上级平台端口', G(res, 'UP_PORT').value, 6000);
}

/* ============================================================
 * 用例 9：809 主链路登录应答
 * ========================================================== */
console.log('\n=== 用例 9: 809 (0x1002) 主链路登录应答 ===');
{
  const res = parse(bytesToHex(buildFrame(0x1002, { phone: '13800138000', seq: 1, version: 1 },
    new Uint8Array([0x00, 0x1a, 0x2b, 0x3c, 0x4d]))));
  dump(res);
  eq('协议族', res.protocol, '809');
  eq('登录结果', G(res, 'RESULT').value, '0 - 成功');
  eq('校验码', G(res, 'VERIFY_CODE').value, '1A2B3C4D');
}

/* ============================================================
 * 用例 10：809 车辆定位信息批量上传
 * ========================================================== */
console.log('\n=== 用例 10: 809 (0x1202) 车辆定位信息批量上传 ===');
{
  const loc = [
    ...i32be(0), ...i32be(STATUS_OK),
    ...i32be(LAT), ...i32be(LON),
    ...i16be(50), ...i16be(650), ...i16be(90),
    0x24, 0x01, 0x01, 0x12, 0x00, 0x00,
  ];
  const one = [
    0x01, 0x01,
    ...fixed(gbkOf('陕A12345'), 21),
    0x02, 0x00,
    ...i16be(loc.length), ...loc,
  ];
  const body = [...i32be(1), ...one];
  const frame = buildFrame(0x1202, { phone: '13800138000', seq: 7, version: 1 }, new Uint8Array(body));
  console.log('  报文:', bytesToHex(frame));
  const res = parse(bytesToHex(frame));
  dump(res);
  eq('协议族', res.protocol, '809');
  eq('消息名', res.msgName, '车辆定位信息批量上传');
  eq('车辆数量', G(res, 'VEHICLE_CNT').value, 1);
  const veh = res.bodyFields.find((x) => x.key === 'VEH[0]');
  ok('车辆已解析', !!veh);
  eq('车牌号', walk(veh.children, 'PLATE').value, '陕A12345');
  eq('车牌颜色', walk(veh.children, 'PLATE_COLOR').value, '1 - 蓝色');
  eq('子业务类型', walk(veh.children, 'SUB_TYPE').value, '0x0200');
  eq('业务数据长度', walk(veh.children, 'DATA_LEN').value, 28);
  eq('纬度', walk(veh.children, 'LAT').value, '31.230416°  北纬 (N)');
  eq('经度', walk(veh.children, 'LON').value, '121.473701°  东经 (E)');
  eq('速度', walk(veh.children, 'SPEED').value, '65.0 km/h');
}

/* ============================================================
 * 用例 11：0x8300 文本信息下发（GBK 中文）
 * ========================================================== */
console.log('\n=== 用例 11: 0x8300 文本信息下发（GBK 中文）===');
{
  const txt = gbkOf('请注意行车安全');
  const body = [0x00, 0x00, ...txt];
  const res = parse(bytesToHex(buildFrame(0x8300, { phone: '13800138000', seq: 30, version: 1 }, new Uint8Array(body))));
  dump(res);
  eq('消息名', res.msgName, '文本信息下发');
  eq('文本内容', G(res, 'TEXT').value, '请注意行车安全');
}

/* ============================================================
 * 用例 12：容错 —— 校验码错误 / 未知消息 / 长度不符
 * ========================================================== */
console.log('\n=== 用例 12: 容错与告警 ===');
{
  // 校验码错误
  const good = bytesToHex(buildFrame(0x0002, { phone: '13800138000', seq: 9, version: 1 }, new Uint8Array([])));
  const parts = good.split(' ');
  const bad = parts.map((p, i) => (i === parts.length - 2 ? '00' : p)).join(' ');
  const res = parse(bad);
  ok('校验码错误被检出', res.checksum.ok === false);
  ok('产生校验码警告', res.warnings.some((w) => w.includes('校验码不匹配')));

  // 未知消息 ID
  const res2 = parse(bytesToHex(buildFrame(0x0FFF, { phone: '13800138000', seq: 1, version: 1 }, new Uint8Array([0x01, 0x02]))));
  ok('未知消息 ID 有警告', res2.warnings.some((w) => w.includes('未收录')));
  eq('未知消息展示原始字节', G(res2, '_RAW').value, '01 02');

  // 长度不足
  const res3 = parse('7E 02 00 00 FF 01 38 00 13 80 00 01 23 7E');
  ok('长度不足被检出', res3.warnings.some((w) => w.includes('长度不足')));

  // 空输入
  try { parse(''); ok('空输入抛错', false); }
  catch (e) { ok('空输入抛错', true, e.message); }

  // 无 7E 定界的裸报文
  const raw = bytesToHex(buildFrame(0x0002, { phone: '13800138000', seq: 9, version: 1 }, new Uint8Array([])));
  const inner = raw.split(' ').slice(1, -1).join(' ');
  const res4 = parse(inner);
  eq('裸报文（无 7E）可解析', res4.msgName, '终端心跳');
}

/* ============================================================
 * 用例 13：809 查岗
 * ========================================================== */
console.log('\n=== 用例 13: 809 (0x1500) 平台查岗请求 ===');
{
  const objId = gbkOf('陕A12345');
  const body = [...i16be(88), 0x01, ...objId];
  const res = parse(bytesToHex(buildFrame(0x1500, { phone: '13800138000', seq: 50, version: 1 }, new Uint8Array(body))));
  dump(res);
  eq('协议族', res.protocol, '809');
  eq('查岗消息流水号', G(res, 'MSG_SEQ').value, 88);
  eq('查岗对象类型', G(res, 'OBJ_TYPE').value, '1 - 车辆');
  eq('查岗对象 ID', G(res, 'OBJ_ID').value, '陕A12345');
}

/* ============================================================
 * 用例 14：非帧数据的内嵌报文扫描（现场真实数据）
 * 一段平台内部定位记录：没有 7E 定界、首字节不是合法消息头，
 * 但偏移 64 起藏着一条标准 0x0200 位置汇报消息体（48 字节）
 * ========================================================== */
console.log('\n=== 用例 14: 非帧数据的内嵌报文扫描（真实现场数据）===');
{
  const HEX = '5B000000A00266BF4A1200013526AF0100010000000000000000006AB33CACC9C24B453837323200000000000000000000000000021202000000620000000030000000000008000302444301068269FE045202BC003D26092310425301040014FD9B0202000003020000300104310112333530313032313031373800000000000000000000000000000000000000000000000000000000000000000000678E5D';
  const top = parse(HEX);
  console.log(`  顶层解析: ${top.msgName} | 校验码 ${top.checksum.ok === true ? '通过' : '不通过'}`);
  ok('顶层识别为未知消息', /^未知消息/.test(top.msgName), top.msgName);
  ok('顶层无 7E 定界符', top.frameInfo.withFlag === false);
  ok('给出"不是完整帧"提示', top.warnings.some((w) => w.includes('不含 7E')));
  ok('校验码不通过', top.checksum.ok === false);

  const sc = scanEmbedded(HEX);
  ok('扫描出候选数据段', sc.candidates.length >= 1, `${sc.candidates.length} 个`);
  const loc = sc.candidates[0];
  eq('候选类型', loc.kind, 'location');
  eq('候选偏移', loc.offset, 64);
  eq('候选长度', loc.length, 48);
  ok('识别出自定义包头车牌号', loc.headPlate === '陕KE8722', loc.headPlate);
  ok('经纬度落在榆林一带', loc.lat > 37.9 && loc.lat < 38.2 && loc.lon > 109.0 && loc.lon < 109.4,
    `${loc.lat.toFixed(6)}, ${loc.lon.toFixed(6)}`);
  eq('GPS 时间', loc.time, '2026-09-23 10:42:53');
  eq('速度', loc.speed.toFixed(1), '70.0');
  eq('高程', loc.altitude, 1106);
  eq('方向', loc.direction, 61);

  const r = parseRawBody(0x0200, hexToBytes(HEX).slice(64, 112));
  dump(r);
  eq('内嵌段解析为位置汇报', r.msgName, '位置信息汇报');
  ok('消息体长度自洽（48 字节）', r.header.bodyLen === 48, String(r.header.bodyLen));
  ok('解析无告警', r.warnings.length === 0, r.warnings.join(' | '));
  eq('纬度', G(r, 'LAT').value, '38.028033°  南纬 (S)');
  eq('经度', G(r, 'LON').value, '109.210110°  西经 (W)');
  eq('高程', G(r, 'ALTITUDE').value, '1106 米');
  eq('速度', G(r, 'SPEED').value, '70.0 km/h');
  eq('GPS 时间', G(r, 'TIME').value, '2026-09-23 10:42:53');
  eq('附加项数量', G(r, 'EXTRAS').children.length, 5);
  eq('里程附加项', G(r, 'EXTRA_0x01').value, '1375643');
  ok('方向位未置时给出提示', !!G(r, '_DIR_NOTE'));
  ok('无未解析的剩余字节', !r.bodyFields.some((x) => x.key === '_TAIL'));
}

/* ============================================================
 * 用例 15A：findHeadPlate —— 自定义包头车牌号识别
 * ========================================================== */
console.log('\n=== 用例 15A: findHeadPlate 自定义包头车牌号识别 ===');
{
  const hx = (s) => s.match(/.{2}/g).map((x) => parseInt(x, 16));
  // 样本头部（offset 0..64）：offset 31-38 为 陕(C9C2)+KE8722
  const head = hx('5B000000A00266BF4A1200013526AF0100010000000000000000006AB33CACC9C24B453837323200000000000000000000000000');
  eq('识别样本头部车牌', findHeadPlate(new Uint8Array(head)), '陕KE8722');

  // 不含车牌的头部 → null（SIM 号纯数字，不应误报）
  const noPlate = hx('5B000000A00266BF4A1200013526AF01000100000000000000000035303130323130313738000000000000000000000000');
  ok('无车牌头部返回空', findHeadPlate(new Uint8Array(noPlate)) === null);

  // 新能源 9 字节车牌（省份 GBK + 字母 + 6 位）
  const newEnergy = hx('0000000B4A4E' + 'C9C2' + '46' + '444433323331'); // 陕FDD3321? 构造示例
  const neRes = findHeadPlate(new Uint8Array(newEnergy));
  ok('识别 9 字节车牌', neRes !== null && neRes.startsWith('陕'), String(neRes));

  // 长度不足
  ok('长度不足返回空', findHeadPlate(new Uint8Array([0xC9, 0xC2, 0x41])) === null);
}

/* ============================================================
 * 用例 15：正常帧不应触发内嵌扫描
 * ========================================================== */
console.log('\n=== 用例 15: 正常帧不误报内嵌扫描 ===');
{
  const body = [
    ...i32be(0), ...i32be(STATUS_OK),
    ...i32be(LAT), ...i32be(LON),
    ...i16be(50), ...i16be(650), ...i16be(90),
    0x24, 0x01, 0x01, 0x12, 0x00, 0x00,
  ];
  const txt = bytesToHex(buildFrame(0x0200, { phone: '13800138000', seq: 1, version: 1 }, new Uint8Array(body)));
  const res = parse(txt);
  ok('正常帧校验通过', res.checksum.ok === true);
  ok('正常帧消息名已知', !/^未知消息/.test(res.msgName), res.msgName);
  ok('正常帧含 7E 定界', res.frameInfo.withFlag === true);
}

/* ============================================================
 * 用例 15B：809 平台间数据交换子业务解析（规范 V2）
 * ========================================================== */
console.log('\n=== 用例 15B: 809 子业务（0x1401 报警督办应答 + 0x9401 督办请求）细分解析 ===');
{
  const plateBytes = fixed(gbkOf('陕KE8722'), 21);          // 21 字节车牌号
  const alarmId = '6100000013800138000014021710825600';      // 34 ascii

  // --- 0x1401 报警督办应答 ---
  const subType1 = 0x1401;
  const subBody1 = [
    ...plateBytes,
    0x01,                                     // VEHICLE_COLOR
    ...i16be(subType1),                       // DATA_TYPE
    ...i32be(34 + 1),                         // DATA_LENGTH
    ...Array.from(alarmId, (c) => c.charCodeAt(0)), // ALARM_ID
    0x01,                                     // RESULT = 已处理完毕
  ];
  const frame1 = buildFrame(0x1200, { phone: '13800138000', seq: 1, version: 1 },
    new Uint8Array([...i16be(0x0000), ...i16be(subType1), ...subBody1]));
  const res1 = parse(bytesToHex(frame1));
  ok('0x1401 识别为 809 动态信息交换', res1.msgName.includes('动态信息交换'), res1.msgName);
  includes('0x1401 子业务名称', JSON.stringify(res1.bodyFields), '报警督办应答');
  includes('0x1401 车牌号', JSON.stringify(res1.bodyFields), '陕KE8722');
  includes('0x1401 处理结果', JSON.stringify(res1.bodyFields), '已处理完毕');
  includes('0x1401 报警唯一编码', JSON.stringify(res1.bodyFields), '1710825600');

  // --- 0x9401 报警督办请求 ---
  const subType2 = 0x9401;
  const platformId = '61000010001';           // 11 ascii
  const warnTime = [0x26, 0x09, 0x23, 0x10, 0x42, 0x53, 0x00, 0x00]; // 2026-09-23 10:42:53
  const endTime = [0x26, 0x09, 0x23, 0x22, 0x00, 0x00, 0x00, 0x00]; // 2026-09-23 22:00:00
  const dataLen2 = 11 + 8 + 2 + 34 + 8 + 1 + 16 + 20 + 32;
  const subBody2 = [
    ...plateBytes, 0x01, ...i16be(subType2), ...i32be(dataLen2),
    ...Array.from(platformId, (c) => c.charCodeAt(0)),
    ...warnTime,
    ...i16be(0x1402),                         // 报警消息源子业务类型
    ...Array.from(alarmId, (c) => c.charCodeAt(0)),
    ...endTime,
    0x00,                                     // 督办级别：紧急
    ...fixed(gbkOf('张三'), 16),              // 督办人
    ...fixed(gbkOf('13800138000'), 20),       // 督办电话
    ...fixed(gbkOf('a@b.com'), 32),           // 督办邮箱
  ];
  const frame2 = buildFrame(0x1200, { phone: '13800138000', seq: 1, version: 1 },
    new Uint8Array([...i16be(0x0000), ...i16be(subType2), ...subBody2]));
  const res2 = parse(bytesToHex(frame2));
  includes('0x9401 子业务名称', JSON.stringify(res2.bodyFields), '报警督办请求');
  includes('0x9401 督办人', JSON.stringify(res2.bodyFields), '张三');
  includes('0x9401 督办截止时间', JSON.stringify(res2.bodyFields), '2026-09-23 22:00:00');
  includes('0x9401 督办级别', JSON.stringify(res2.bodyFields), '紧急');
  includes('0x9401 报警消息源类型', JSON.stringify(res2.bodyFields), '上报车辆报警信息');
}

/* ============================================================
 * 汇总
 * ========================================================== */
console.log(`\n${'='.repeat(52)}`);
console.log(`  测试结果:  ${pass} 通过 / ${fail} 失败`);
if (failures.length) console.log(`  失败项: ${failures.join(' | ')}`);
console.log('='.repeat(52));
process.exit(fail > 0 ? 1 : 0);
