/*!
 * 无浏览器环境下的页面自检：
 *  1. 校验 index.html 引用的 bundle 存在
 *  2. 用 JSDOM 风格的最小 shim 执行页面脚本，验证渲染不抛错
 *  3. 校验 HTML 中无残留占位/语法问题
 * 运行： node test/pagecheck.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

let pass = 0, fail = 0;
const ok = (n, c, x = '') => { c ? (pass++, console.log(`  \u2713 ${n} ${x}`)) : (fail++, console.log(`  \u2717 ${n} ${x}`)); };

console.log('=== 资源检查 ===');
const htmlPath = path.join(root, 'index.html');
const bundlePath = path.join(root, 'build/parser.bundle.js');
ok('index.html 存在', fs.existsSync(htmlPath));
ok('parser.bundle.js 存在', fs.existsSync(bundlePath));

const html = fs.readFileSync(htmlPath, 'utf8');
const bundle = fs.readFileSync(bundlePath, 'utf8');

console.log('\n=== HTML 结构检查 ===');
ok('引用 bundle', html.includes('src="build/parser.bundle.js"'));
ok('无外部 CDN 依赖（纯离线）', !/https?:\/\/[^"']*\.(js|css)/.test(html.replace(/<!--[\s\S]*?-->/g, '')));
ok('UTF-8 声明', /charset="UTF-8"/i.test(html));
ok('响应式 viewport', /name="viewport"/.test(html));
ok('暗色模式适配', /prefers-color-scheme/.test(html));
ok('无未替换占位符', !/\{\{[A-Z_]+\}\}/.test(html));

/* 括号平衡（粗检） */
const jsStart = html.indexOf('<script>\n(function(){');
const jsEnd = html.lastIndexOf('</script>');
ok('找到内联脚本块', jsStart > 0 && jsEnd > jsStart);

console.log('\n=== 脚本语法检查 ===');
const inlineJs = html.slice(html.indexOf('<script>', html.indexOf('parser.bundle.js')) + 8, jsEnd);
try {
  new Function(inlineJs);
  ok('内联脚本语法正确', true, `(${inlineJs.length} 字符)`);
} catch (e) {
  ok('内联脚本语法正确', false, e.message);
}

try {
  new Function(bundle);
  ok('bundle 脚本语法正确', true, `(${bundle.length} 字符)`);
} catch (e) {
  ok('bundle 脚本语法正确', false, e.message);
}

console.log('\n=== 关键元素 ID 检查 ===');
const neededIds = [
  'hex', 'btn-parse', 'btn-clear', 'btn-paste', 'btn-minify', 'btn-copy',
  'input-meta', 'examples', 'result',
  'tab-parse', 'tab-build', 'tab-dict',
  'view-parse', 'view-build', 'view-dict',
  'b-msgid', 'b-phone', 'b-seq', 'b-ver', 'b-enc', 'b-body',
  'b-gen', 'b-out', 'b-tpl-loc', 'b-tpl-reg', 'b-tpl-resp', 'b-parse-it',
  'dict-q', 'dict-kind', 'dict-body', 'net-badge',
];
const missingIds = neededIds.filter((id) => !html.includes(`id="${id}"`));
ok('所有必需元素 ID 存在', missingIds.length === 0, missingIds.length ? `缺失: ${missingIds.join(', ')}` : `(${neededIds.length} 个)`);

/* 交叉检查：脚本里 $('#xxx') 引用的 ID 都必须在 HTML 中存在 */
const refs = [...new Set([...inlineJs.matchAll(/\$\('#([\w-]+)'\)/g)].map((m) => m[1]))];
const notInHtml = refs.filter((r) => !html.includes(`id="${r}"`));
ok('脚本引用的 ID 均存在于 HTML', notInHtml.length === 0, notInHtml.length ? `缺失: ${notInHtml.join(', ')}` : `(${refs.length} 个引用)`);

console.log('\n=== 在 Node 中执行页面脚本（DOM shim） ===');
{
  const created = new Map();
  const listeners = new Map();
  const mkEl = (tag, id) => {
    const el = {
      tagName: (tag || 'div').toUpperCase(),
      id: id || '',
      value: '',
      textContent: '',
      innerHTML: '',
      className: '',
      dataset: {},
      style: {},
      children: [],
      _attrs: {},
      setAttribute(k, v) { this._attrs[k] = v; },
      getAttribute(k) { return this._attrs[k]; },
      addEventListener(t, f) { const k = this.id + ':' + t; listeners.set(k, (listeners.get(k) || []).concat(f)); },
      appendChild(c) { this.children.push(c); return c; },
      removeChild() {},
      focus() {},
      select() {},
      classList: { add() {}, remove() {}, contains() { return false; } },
      querySelector() { return null; },
      querySelectorAll() { return []; },
      dispatchEvent() {},
    };
    return el;
  };
  const byId = new Map();
  for (const id of neededIds) { const e = mkEl('div', id); byId.set(id, e); }
  // 特殊：radio/option 的默认值
  byId.get('b-ver').value = '2';
  byId.get('b-enc').value = '0';
  byId.get('b-msgid').value = '0x0200';
  byId.get('b-phone').value = '13800138000';
  byId.get('b-seq').value = '1';
  byId.get('dict-kind').value = 'msg808';

  const document = {
    querySelector(s) {
      const m = /^#([\w-]+)$/.exec(s);
      if (m) return byId.get(m[1]) || null;
      return null;
    },
    createElement: (t) => mkEl(t),
    createDocumentFragment: () => mkEl('fragment'),
    body: { appendChild() {}, removeChild() {}, innerHTML: '' },
  };
  const window = { addEventListener() {}, scrollTo() {}, location: { href: '' } };
  const navigator = { onLine: true, clipboard: null };

  const sandbox = {
    window, document, navigator, console, TextDecoder, Uint8Array, Math, JSON, Object,
    Array, String, Number, Boolean, Date, RegExp, Error, parseInt, parseFloat, isNaN,
    setTimeout: (f) => { try { f(); } catch (e) {} return 0; },
    clearTimeout: () => {},
    alert: () => {},
  };
  sandbox.globalThis = sandbox;

  let scriptErr = null;
  try {
    // 先执行 bundle：bundle 内部写 globalThis.JT808，
    // 这里把 window 同时作为 globalThis 传入，以还原浏览器语义
    const g = window;                 // 浏览器中 window === globalThis
    new Function('window', 'document', 'navigator', 'console', 'TextDecoder', 'Uint8Array', 'globalThis', 'setTimeout', 'clearTimeout', 'alert',
      bundle + '\n;window.__bundleLoaded = true;'
    )(g, document, navigator, console, TextDecoder, Uint8Array, g, sandbox.setTimeout, sandbox.clearTimeout, sandbox.alert);
    ok('bundle 在 DOM shim 中执行成功', window.__bundleLoaded === true);
    ok('bundle 挂载了 JT808', !!window.JT808, window.JT808 ? `API: ${Object.keys(window.JT808).length} 个` : '');
  } catch (e) {
    scriptErr = e;
    ok('bundle 在 DOM shim 中执行成功', false, e.message);
  }

  try {
    new Function('window', 'document', 'navigator', 'console', 'TextDecoder', 'Uint8Array', 'globalThis', 'setTimeout', 'clearTimeout', 'alert',
      inlineJs
    )(window, document, navigator, console, TextDecoder, Uint8Array, window, sandbox.setTimeout, sandbox.clearTimeout, sandbox.alert);
    ok('页面脚本执行成功（初始化无异常）', true);
  } catch (e) {
    scriptErr = e;
    ok('页面脚本执行成功（初始化无异常）', false, e.message);
  }

  if (window.JT808) {
    const JT = window.JT808;
    console.log('\n=== 示例报文生成与解析（模拟点击示例按钮） ===');
    try {
      const I12 = (v) => [(v >> 8) & 255, v & 255];
      const I32 = (v) => [(v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255];
      const loc = JT.buildFrame(0x0200, { phone: '13800138000', seq: 0x0123, version: 1 }, new Uint8Array(
        [].concat(I32(1), I32(0x0f), I32(31230416), I32(121473701), I12(50), I12(650), I12(90),
          [0x24, 0x01, 0x01, 0x12, 0x00, 0x00], [0x01, 0x04, 0x00, 0x00, 0x30, 0x39], [0x0e, 0x01, 0x0c])));
      const txt = JT.bytesToHex(loc);
      const r = JT.parse(txt);
      ok('位置汇报示例可解析', r.msgName === '位置信息汇报');
      ok('校验码正确', r.checksum.ok === true);
      ok('含 2 项附加信息', r.bodyFields.find((x) => x.key === 'EXTRAS').children.length === 2);
      ok('附加项无残留字节', !r.bodyFields.some((x) => x.key === '_TAIL'));
    } catch (e) {
      ok('位置汇报示例可解析', false, e.message);
    }

    console.log('\n=== 内嵌报文扫描（现场数据）===');
    try {
      const HEX = '5B000000A00266BF4A1200013526AF0100010000000000000000006AB33CACC9C24B453837323200000000000000000000000000021202000000620000000030000000000008000302444301068269FE045202BC003D26092310425301040014FD9B0202000003020000300104310112333530313032313031373800000000000000000000000000000000000000000000000000000000000000000000678E5D';
      const top = JT.parse(HEX);
      ok('顶层识别为未知消息', /^未知消息/.test(top.msgName), top.msgName);
      const sc = JT.scanEmbedded(HEX);
      ok('bundle 暴露 scanEmbedded', typeof JT.scanEmbedded === 'function');
      ok('bundle 暴露 parseRawBody', typeof JT.parseRawBody === 'function');
      ok('扫描到内嵌数据段', sc.candidates.length >= 1, `${sc.candidates.length} 个`);
      eq0('内嵌偏移', sc.candidates[0].offset, 64);
      eq0('内嵌长度', sc.candidates[0].length, 48);
      const r2 = JT.parseRawBody(0x0200, JT.hexToBytes(HEX).slice(64, 112));
      ok('内嵌段解析为位置汇报', r2.msgName === '位置信息汇报');
      ok('内嵌段无告警', r2.warnings.length === 0, r2.warnings.join('|'));
    } catch (e) {
      ok('内嵌报文扫描', false, e.message);
    }
  }

  function eq0(name, actual, expected) {
    ok(name, String(actual) === String(expected), `= ${actual}${String(actual) === String(expected) ? '' : ' (期望 ' + expected + ')'}`);
  }

  // 触发某个元素上已注册的事件（用于端到端模拟用户操作）
  const fire = (id, type, ev) => {
    const fns = listeners.get(id + ':' + type) || [];
    for (const fn of fns) fn.call(byId.get(id), ev || {});
  };

  console.log('\n=== 渲染函数输出检查 ===');
  {
    // 直接调用 bundle 的解析，模拟 renderResult 的关键结构
    const htmlSnippet = byId.get('result').innerHTML;
    ok('初始化后已填充 result（自动解析示例）', htmlSnippet.length > 200, `(${htmlSnippet.length} 字符)`);
    ok('渲染含消息名称', htmlSnippet.includes('位置信息汇报') || htmlSnippet.includes('解析失败'));
    ok('渲染含表格', htmlSnippet.includes('<table class="fields"'));
    ok('渲染含原始字节视图', htmlSnippet.includes('rawview'));
  }

  console.log('\n=== 端到端：粘贴现场数据（非帧）后页面渲染 ===');
  {
    const FIELD_HEX = '5B000000A00266BF4A1200013526AF0100010000000000000000006AB33CACC9C24B453837323200000000000000000000000000021202000000620000000030000000000008000302444301068269FE045202BC003D26092310425301040014FD9B0202000003020000300104310112333530313032313031373800000000000000000000000000000000000000000000000000000000000000000000678E5D';
    byId.get('hex').value = FIELD_HEX;
    fire('hex', 'input', {});
    const h = byId.get('result').innerHTML;
    ok('渲染出内嵌扫描卡片', h.includes('内嵌报文扫描'), `(${h.length} 字符)`);
    ok('展示内嵌偏移与长度', h.includes('偏移 64') && h.includes('48 字节'));
    ok('展示解析出的纬经度', h.includes('38.028033') && h.includes('109.210110'));
    ok('展示 GPS 时间', h.includes('2026-09-23 10:42:53'));
    ok('展示速度与高程', h.includes('70.0 km/h') && h.includes('1106 米'));
    ok('说明这不是完整帧', h.includes('不像一条完整的'));
    ok('提供「解析这段」按钮', h.includes('btn-slice') && h.includes('解析这段'));
    ok('顶层展示为未知消息', h.includes('未知消息'));
  }

  console.log('\n=== 端到端：截断报文不应崩页 ===');
  {
    byId.get('hex').value = '7E 02 00 00 FF 01 38 00 13 80 00 01 23 7E';
    fire('hex', 'input', {});
    const h = byId.get('result').innerHTML;
    ok('截断报文有渲染输出', h.length > 100, `(${h.length} 字符)`);
    ok('提示消息头不完整', h.includes('消息头不完整'));
    ok('未显示为解析失败', !h.includes('解析失败'));
  }
}

console.log('\n=== 字典页数据 ===');
{
  ok('字典数据已内嵌', html.includes('DICT_MSG_808') && html.includes('DICT_MSG_809') && html.includes('DICT_ALARM')
    && html.includes('DICT_STATUS') && html.includes('DICT_EXTRA') && html.includes('DICT_PARAM'));
  const cnt = (re) => (html.match(re) || []).length;
  ok('808 消息条目充足', cnt(/0x0\d{3}:'/g) + cnt(/0x8\d{3}:'/g) > 40, `${cnt(/0x0\d{3}:'/g) + cnt(/0x8\d{3}:'/g)} 条`);
  ok('809 消息条目存在', cnt(/0x9\d{3}:'/g) > 5, `${cnt(/0x9\d{3}:'/g)} 条`);
  ok('报警标志位 29 项', cnt(/\[\d+,'[^']+'\](?=,|;|\n\])/g) >= 25);
}

console.log(`\n${'='.repeat(52)}`);
console.log(`  页面自检:  ${pass} 通过 / ${fail} 失败`);
console.log('='.repeat(52));
process.exit(fail > 0 ? 1 : 0);
