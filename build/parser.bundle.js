/*!
 * JT/T 808-2011/2013/2019 & JT/T 809 报文解析引擎（浏览器单文件版）
 * 由 build/bundle.mjs 自动生成，请勿直接修改。
 * 源码： src/dict.js  +  src/parser.js
 */
(function (global) {
'use strict';

/*!
 * JT/T 808-2011/2013/2019 & JT/T 809 数据字典
 * 纯前端，无依赖。所有表项均可人工扩展。
 */

/* ============================ 808 消息 ID ============================ */
// dir: 'up' 终端->平台  'down' 平台->终端  'both' 双向
const MSG_808 = {
  // ---- 终端管理类 0x0001 ~ 0x00FF ----
  0x0001: { name: '终端通用应答', dir: 'both', body: 'resp0001' },
  0x0002: { name: '终端心跳', dir: 'up', body: 'heartbeat' },
  0x0003: { name: '终端注销', dir: 'up', body: 'empty' },
  0x0004: { name: '查询服务器时间请求', dir: 'up', body: 'empty' },
  0x0005: { name: '终端补传分包请求', dir: 'up', body: 'retransmit' },

  0x0100: { name: '终端注册', dir: 'up', body: 'reg0100' },
  0x0101: { name: '终端注销(旧)', dir: 'up', body: 'empty' },
  0x0102: { name: '终端鉴权', dir: 'up', body: 'auth0102' },
  0x0103: { name: '设置终端通信参数', dir: 'down', body: 'commParam' },
  0x0104: { name: '查询终端参数', dir: 'down', body: 'queryParam0104' },
  0x0105: { name: '终端控制', dir: 'down', body: 'terminalControl' },
  0x0106: { name: '查询指定终端参数', dir: 'down', body: 'querySpecParam' },
  0x0107: { name: '查询终端属性', dir: 'down', body: 'empty' },
  0x0108: { name: '上传终端属性', dir: 'up', body: 'terminalAttr' },

  // ---- 位置与报警类 0x0200 ~ 0x02FF ----
  0x0200: { name: '位置信息汇报', dir: 'up', body: 'location' },
  0x0201: { name: '位置信息查询', dir: 'down', body: 'query0201' },
  0x0202: { name: '临时位置跟踪控制', dir: 'down', body: 'trackCtrl' },
  0x0203: { name: '人工确认报警消息', dir: 'up', body: 'alarmConfirm' },

  // ---- 信息类 0x0300 ~ 0x03FF ----
  0x0301: { name: '事件报告', dir: 'up', body: 'eventReport' },
  0x0302: { name: '提问应答', dir: 'up', body: 'questionResp' },
  0x0303: { name: '信息点播/取消', dir: 'up', body: 'infoDemand' },

  // ---- 电话类 0x0400 ~ 0x04FF ----
  0x0400: { name: '查询终端参数(旧)', dir: 'down', body: 'empty' },
  0x0401: { name: '电话回拨', dir: 'down', body: 'phoneCallback' },
  0x0402: { name: '设置电话本', dir: 'down', body: 'phoneBook' },
  0x0403: { name: '车辆控制应答', dir: 'up', body: 'empty' },
  0x0404: { name: '设置路线', dir: 'down', body: 'route' },
  0x0405: { name: '查询路线', dir: 'down', body: 'empty' },
  0x0406: { name: '路线应答', dir: 'up', body: 'routeResp' },

  // ---- 车辆控制类 0x0500 ----
  0x0500: { name: '车辆控制', dir: 'down', body: 'vehicleCtrl' },

  // ---- 终端管理扩展 0x0600 ~ 0x06FF ----
  0x0600: { name: '查询终端属性(旧)', dir: 'down', body: 'empty' },
  0x0601: { name: '终端升级包通知', dir: 'down', body: 'upgradeNotice' },
  0x0602: { name: '终端升级结果通知', dir: 'up', body: 'upgradeResult' },
  0x0604: { name: '终端升级(旧)', dir: 'down', body: 'empty' },
  0x0605: { name: '终端升级结果通知(旧)', dir: 'up', body: 'empty' },
  0x0606: { name: '查询终端参数(扩展)', dir: 'down', body: 'empty' },
  0x0608: { name: '查询终端属性', dir: 'down', body: 'empty' },

  0x0700: { name: '行驶记录数据采集命令', dir: 'down', body: 'drCmd' },
  0x0701: { name: '电子运单上报', dir: 'up', body: 'edriverOrder' },
  0x0702: { name: '驾驶员身份信息采集上报', dir: 'up', body: 'driverInfo' },
  0x0703: { name: '上报行驶记录数据(扩展)', dir: 'up', body: 'drUpExt' },
  0x0704: { name: '定位数据批量上传', dir: 'up', body: 'batchLocation' },
  0x0705: { name: 'CAN 总线数据上传', dir: 'up', body: 'canBus' },
  0x0706: { name: '油量/电量数据上报', dir: 'up', body: 'fuelData' },
  0x0707: { name: '报警附件上传指令', dir: 'up', body: 'mediaFileNotice' },

  // ---- 多媒体 0x0800 ~ 0x08FF ----
  0x0800: { name: '多媒体事件信息上传', dir: 'up', body: 'mediaEvent' },
  0x0801: { name: '多媒体数据上传', dir: 'up', body: 'mediaData' },
  0x0802: { name: '多媒体数据上传应答', dir: 'down', body: 'mediaDataResp' },
  0x0805: { name: '摄像头立即拍摄命令', dir: 'down', body: 'cameraShot' },
  0x0806: { name: '存储多媒体数据检索', dir: 'down', body: 'mediaSearch' },
  0x0807: { name: '存储多媒体数据上传', dir: 'down', body: 'mediaUpload' },
  0x0808: { name: '存储多媒体数据检索应答', dir: 'up', body: 'mediaSearchResp' },

  // ---- 通用应答/透传 0x08xx ----
  0x0900: { name: '数据上行透传', dir: 'up', body: 'passthrough' },
  0x0901: { name: '数据压缩上报', dir: 'up', body: 'passthroughCompress' },

  // ---- 平台/终端下行 0x8100 ~ 0x8FFF ----
  0x8100: { name: '终端注册应答', dir: 'down', body: 'regResp8100' },
  0x8101: { name: '设置终端参数(旧)', dir: 'down', body: 'empty' },
  0x8103: { name: '设置终端参数', dir: 'down', body: 'setParam8103' },
  0x8104: { name: '查询终端参数', dir: 'down', body: 'empty' },
  0x8105: { name: '终端控制', dir: 'down', body: 'terminalControl' },
  0x8106: { name: '查询指定终端参数', dir: 'down', body: 'querySpecParam' },
  0x8107: { name: '查询终端属性', dir: 'down', body: 'empty' },
  0x8108: { name: '下发终端升级包', dir: 'down', body: 'sendUpgrade' },
  0x8201: { name: '位置信息查询', dir: 'down', body: 'query0201' },
  0x8202: { name: '临时位置跟踪控制', dir: 'down', body: 'trackCtrl' },
  0x8203: { name: '人工确认报警消息', dir: 'down', body: 'alarmConfirm' },
  0x8204: { name: '链路检测', dir: 'down', body: 'empty' },
  0x8300: { name: '文本信息下发', dir: 'down', body: 'textMsg' },
  0x8301: { name: '事件设置', dir: 'down', body: 'eventSet' },
  0x8302: { name: '提问下发', dir: 'down', body: 'questionSend' },
  0x8303: { name: '信息点播菜单设置', dir: 'down', body: 'infoMenu' },
  0x8304: { name: '信息服务', dir: 'down', body: 'infoService' },
  0x8400: { name: '电话回拨', dir: 'down', body: 'phoneCallback' },
  0x8401: { name: '设置电话本', dir: 'down', body: 'phoneBook' },
  0x8500: { name: '车辆控制', dir: 'down', body: 'vehicleCtrl' },
  0x8600: { name: '设置圆形区域', dir: 'down', body: 'circleArea' },
  0x8601: { name: '删除圆形区域', dir: 'down', body: 'delArea' },
  0x8602: { name: '设置矩形区域', dir: 'down', body: 'rectArea' },
  0x8603: { name: '删除矩形区域', dir: 'down', body: 'delArea' },
  0x8604: { name: '设置多边形区域', dir: 'down', body: 'polygonArea' },
  0x8605: { name: '删除多边形区域', dir: 'down', body: 'delArea' },
  0x8606: { name: '设置路线', dir: 'down', body: 'route' },
  0x8607: { name: '删除路线', dir: 'down', body: 'delArea' },
  0x8608: { name: '查询区域或线路数据', dir: 'down', body: 'queryAreaData' },
  0x8700: { name: '行驶记录数据(下行)', dir: 'down', body: 'drDown' },
  0x8701: { name: '行驶记录数据上传', dir: 'up', body: 'drUp' },
  0x8702: { name: '驾驶员身份信息采集上传(旧)', dir: 'up', body: 'driverInfo' },
  0x8800: { name: '多媒体数据上传(旧)', dir: 'up', body: 'mediaData' },
  0x8801: { name: '摄像头立即拍摄命令', dir: 'down', body: 'cameraShot' },
  0x8802: { name: '存储多媒体数据检索', dir: 'down', body: 'mediaSearch' },
  0x8803: { name: '存储多媒体数据上传', dir: 'down', body: 'mediaUpload' },
  0x8804: { name: '录音开始命令', dir: 'down', body: 'recordStart' },
  0x8805: { name: '单条存储多媒体数据上传', dir: 'down', body: 'mediaUploadOne' },

  // ---- 苏标/部标扩展 (ADAS/DSM, JT/T 1078 附件) ----
  0x0200_1078: { name: '位置信息汇报(1078扩展)', dir: 'up', body: 'location' },
  0x9201: { name: '平台下发 ADAS 报警附件上传', dir: 'down', body: 'adasNotice' },
  0x9205: { name: '报警附件上传应答', dir: 'down', body: 'mediaDataResp' },
  0x0801_1078: { name: '文件上传完成通知', dir: 'up', body: 'fileUploadDone' },
  0x1210: { name: '报警附件信息消息(苏标)', dir: 'up', body: 'suAlarmAttach' },
  0x1211: { name: '文件信息上传(苏标)', dir: 'up', body: 'suFileInfo' },
  0x1212: { name: '文件上传完成消息(苏标)', dir: 'up', body: 'suFileDone' },
};

/* ======================= 809 平台间消息 ID ======================= */
const MSG_809 = {
  // 上级平台 -> 下级平台 / 双向
  0x1001: { name: '主链路登录请求', dir: 'up', body: 's809Login' },
  0x1002: { name: '主链路登录应答', dir: 'down', body: 's809LoginResp' },
  0x1003: { name: '主链路注销请求', dir: 'up', body: 's809Logout' },
  0x1004: { name: '主链路注销应答', dir: 'down', body: 's809LogoutResp' },
  0x1005: { name: '主链路连接保持请求', dir: 'up', body: 's809Keepalive' },
  0x1006: { name: '主链路连接保持应答', dir: 'down', body: 's809KeepaliveResp' },
  0x1007: { name: '下级平台实时上传车辆定位信息', dir: 'up', body: 's809RealtimeLocation' },
  0x1008: { name: '下级平台定位信息应答', dir: 'down', body: 's809RealtimeLocationResp' },
  0x1200: { name: '主链路动态信息交换', dir: 'both', body: 's809Dynamic' },
  0x1201: { name: '主链路动态信息交换应答', dir: 'both', body: 's809DynamicResp' },
  0x1009: { name: '主链路主动发起请求(旧)', dir: 'down', body: 'raw' },

  // 从链路
  0x9001: { name: '从链路连接请求', dir: 'up', body: 's809SubLinkReq' },
  0x9002: { name: '从链路连接应答', dir: 'down', body: 's809SubLinkResp' },
  0x9003: { name: '从链路注销请求', dir: 'up', body: 's809SubLinkLogout' },
  0x9004: { name: '从链路注销应答', dir: 'down', body: 's809SubLinkLogoutResp' },
  0x9005: { name: '从链路连接保持请求', dir: 'up', body: 's809Keepalive' },
  0x9006: { name: '从链路连接保持应答', dir: 'down', body: 's809KeepaliveResp' },
  0x9007: { name: '从链路动态信息交换', dir: 'both', body: 's809Dynamic' },
  0x9008: { name: '从链路动态信息交换应答', dir: 'both', body: 's809DynamicResp' },

  // 车辆动态信息交换
  0x1201: { name: '车辆定位信息上报应答', dir: 'down', body: 's809RealtimeLocationResp' },
  0x1202: { name: '车辆定位信息批量上传', dir: 'up', body: 's809BatchLocation' },
  0x1203: { name: '车辆定位信息批量上传应答', dir: 'down', body: 's809BatchResp' },

  // 平台间消息转发
  0x1300: { name: '平台间消息转发', dir: 'both', body: 's809Forward' },
  0x1301: { name: '平台间消息转发应答', dir: 'both', body: 's809ForwardResp' },
  0x1302: { name: '平台间监管对象互查请求', dir: 'both', body: 's809ObjQuery' },
  0x1303: { name: '平台间监管对象互查应答', dir: 'both', body: 's809ObjQueryResp' },

  // 报警/其他
  0x1400: { name: '车辆报警信息上报', dir: 'up', body: 's809Alarm' },
  0x1401: { name: '下级平台车辆定位信息请求', dir: 'down', body: 's809RealtimeLocation' },
  0x1500: { name: '平台查岗请求', dir: 'down', body: 's809Inspect' },
  0x1501: { name: '平台查岗应答', dir: 'up', body: 's809InspectResp' },

  // 区域/线路
  0x1205: { name: '上报区域数据', dir: 'up', body: 's809AreaData' },
  0x1206: { name: '上报线路数据', dir: 'up', body: 's809RouteData' },
  0x1207: { name: '上报区域线路应答', dir: 'down', body: 's809AreaResp' },
};

/* ======================= 809 平台间数据交换子业务类型 =======================
 * 依据《重点营运车辆联网联控系统动态监控报警信息平台间数据交换技术规范 V2
 * （服务商企业监控平台）》。这些是 809「动态信息交换 / 车辆报警信息」等
 * 顶层消息内承载的子业务类型标识（DATA_TYPE），不是 809 顶层消息 ID。
 * ===================================================================== */
const SUBIZ_809 = {
  0x1201: '上传车辆注册信息',
  0x120C: '上传驾驶员身份信息',
  0x1402: '上报车辆报警信息',
  0x1412: '上报报警处理结果',
  0x9401: '报警督办请求',
  0x1401: '报警督办应答',
};

/* 809 报警督办应答 / 处理结果 —— RESULT 取值 */
const SUBIZ_ALARM_RESULT = {
  0x00: '处理中', 0x01: '已处理完毕', 0x02: '不作处理',
  0x03: '将来处理', 0x04: '误报警',
};

/* ============ 809 平台间数据交换报警类型（《规范 V2》附录「报警类型明细」） ============ */
const ALARM_WARN_TYPE = {
  // 一、位置相关报警
  0x0001: '超速报警', 0x0002: '疲劳驾驶报警', 0x0003: '紧急报警',
  0x0004: '进入指定区域报警', 0x0005: '离开指定区域报警', 0x0008: '越界报警',
  0x0009: '盗警', 0x000A: '劫警', 0x000B: '偏离路线报警', 0x000C: '车辆移动报警',
  0x000D: '超时驾驶报警', 0x0010: '违规行驶报警', 0x0011: '前撞报警',
  0x0012: '车道偏离报警', 0x0013: '胎压异常报警', 0x0014: '动态信息异常报警',
  0x00FF: '其他报警',
  // 二、非位置相关报警
  0xA001: '超时停车', 0xA002: '车辆定位信息上报时间间隔异常',
  0xA003: '车辆定位信息上报距离间隔异常', 0xA004: '下级平台异常断线',
  0xA005: '下级平台数据传输异常', 0xA006: '路段堵塞报警', 0xA007: '危险路段报警',
  0xA008: '雨雪天气报警', 0xA009: '驾驶员身份识别异常', 0xA00A: '终端异常(含线路连接异常)',
  0xA00B: '平台接入异常', 0xA00C: '核心数据异常', 0xA0FF: '其他报警',
  // 三、视频报警
  0x0101: '视频信号丢失报警', 0x0102: '视频信号遮挡报警', 0x0103: '存储单元故障报警',
  0x0104: '其他视频设备故障报警', 0x0105: '客车超员报警', 0x0106: '异常驾驶行为报警',
  0x0107: '特殊报警录像达到存储阈值报警',
  // 四、智能监控报警
  0xD201: '超速报警', 0xD202: '长时间不目视前方报警', 0xD203: '抽烟报警',
  0xD204: '接打手持电话报警', 0xD205: '驾驶员不在驾驶位置报警',
  0xD206: '双手同时脱离方向盘报警', 0xD207: '驾驶员身份异常报警',
  0xD208: '禁行时段行车报警', 0xD209: '未系安全带报警', 0xD210: '红外阻断型墨镜失效报警',
  0xD211: '玩手机报警', 0xD212: '夜间行驶报警', 0xD213: '生理疲劳驾驶报警',
  0xD214: '分心驾驶报警', 0xD215: '偏离驾驶位报警', 0xD216: '频繁变道报警',
  0xD217: '驾驶员变更报警', 0xD218: '长期异地经营报警', 0xD219: '离线位移报警',
  0xD220: '实线变道', 0xD221: '道路实际限速超速报警', 0xD222: '基础限速超速报警',
  0xD223: '不规范变道提醒', 0xD301: '驾驶辅助功能失效报警', 0xD302: '驾驶员行为监测功能失效报警',
  0xD303: '终端故障报警', 0xD304: '三天未上线报警', 0xD305: '断电报警',
  0xD306: '天线断开报警', 0xD307: '设备失效报警', 0xD308: '关闭终端报警',
  0xD401: '前向碰撞预警', 0xD402: '行人碰撞报警', 0xD403: '急加速报警',
  0xD404: '急减速报警', 0xD405: '急转弯报警', 0xD406: '碰撞预警', 0xD407: '侧翻预警',
  0xD408: '车道偏离报警', 0xD409: '后方接近报警', 0xD410: '左侧后方接近报警',
  0xD411: '右侧后方接近报警', 0xD412: '右侧前方接近报警', 0xD413: '怠速报警',
  0xD414: '异常熄火报警', 0xD415: '空挡滑行报警', 0xD416: '发动机超转报警',
  0xD417: '超时停车报警', 0xD418: '进出路线报警', 0xD419: '路段行驶时间不足报警',
  0xD420: '路段行驶时间过长报警', 0xD421: '车辆非法点火报警', 0xD422: '车辆非法位移报警',
  0xD423: '车距过近报警', 0xD424: '电子围栏报警', 0xD425: '障碍物报警',
  0xD426: '道路标识超限报警', 0xD427: '事故报警',
  0xD501: '胎压过高报警', 0xD502: '胎压过低报警', 0xD503: '轮胎温度过高报警',
  0xD504: '传感器异常报警', 0xD505: '胎压不平衡报警', 0xD506: '慢漏气报警',
  0xD507: '电池电压低报警', 0xD508: '电瓶欠压报警',
};

/* =================== 省份/城市区划（交通行业常用） =================== */
const PROVINCES = {
  11: '北京市', 12: '天津市', 13: '河北省', 14: '山西省', 15: '内蒙古自治区',
  21: '辽宁省', 22: '吉林省', 23: '黑龙江省',
  31: '上海市', 32: '江苏省', 33: '浙江省', 34: '安徽省', 35: '福建省', 36: '江西省', 37: '山东省',
  41: '河南省', 42: '湖北省', 43: '湖南省', 44: '广东省', 45: '广西壮族自治区', 46: '海南省',
  50: '重庆市', 51: '四川省', 52: '贵州省', 53: '云南省', 54: '西藏自治区',
  61: '陕西省', 62: '甘肃省', 63: '青海省', 64: '宁夏回族自治区', 65: '新疆维吾尔自治区',
  71: '中国台湾省', 81: '中国香港特别行政区', 82: '中国澳门特别行政区',
};

/* ======================= 报警标志位（DWORD） ======================= */
const ALARM_FLAGS = [
  { bit: 0, name: '紧急报警', desc: '紧急报警，触动报警开关后触发' },
  { bit: 1, name: '超速报警', desc: '超过终端设定的速度限值' },
  { bit: 2, name: '疲劳驾驶报警', desc: '疲劳驾驶' },
  { bit: 3, name: '危险预警', desc: '危险预警（2013起）' },
  { bit: 4, name: 'GNSS模块发生故障', desc: 'GNSS 模块故障' },
  { bit: 5, name: 'GNSS天线未接或被剪断', desc: 'GNSS 天线异常' },
  { bit: 6, name: 'GNSS天线短路', desc: 'GNSS 天线短路' },
  { bit: 7, name: '终端主电源欠压', desc: '主电源欠压' },
  { bit: 8, name: '终端主电源掉电', desc: '主电源掉电' },
  { bit: 9, name: '终端LCD或显示器故障', desc: '显示设备故障' },
  { bit: 10, name: 'TTS模块故障', desc: '语音合成模块故障' },
  { bit: 11, name: '摄像头故障', desc: '摄像头故障' },
  { bit: 12, name: '道路运输证IC卡模块故障', desc: '2013 新增' },
  { bit: 13, name: '超速预警', desc: '2013 新增' },
  { bit: 14, name: '疲劳驾驶预警', desc: '2013 新增' },
  { bit: 15, name: '保留', desc: '' },
  { bit: 18, name: '当天累计驾驶超时', desc: '2013 新增' },
  { bit: 19, name: '超时停车', desc: '2013 新增' },
  { bit: 20, name: '进出区域', desc: '2013 新增' },
  { bit: 21, name: '进出路线', desc: '2013 新增' },
  { bit: 22, name: '路段行驶时间不足/过长', desc: '2013 新增' },
  { bit: 23, name: '路线偏离报警', desc: '2013 新增' },
  { bit: 24, name: '车辆VSS故障', desc: '2013 新增' },
  { bit: 25, name: '车辆油量异常', desc: '2013 新增' },
  { bit: 26, name: '车辆被盗(通过车辆防盗器)', desc: '2013 新增' },
  { bit: 27, name: '车辆非法点火', desc: '2013 新增' },
  { bit: 28, name: '车辆非法位移', desc: '2013 新增' },
  { bit: 29, name: '碰撞侧翻报警', desc: '2013 新增' },
  { bit: 30, name: '碰撞预警', desc: '2019 新增' },
  { bit: 31, name: '侧翻预警', desc: '2019 新增' },
];

/* =================== 状态位（DWORD，JT/T 808） =================== */
const STATUS_FLAGS = [
  { bit: 0, name: 'ACC 开', trueText: 'ACC 开', falseText: 'ACC 关' },
  { bit: 1, name: '定位已建立', trueText: '已定位', falseText: '未定位' },
  { bit: 2, name: '定位类型', trueText: '北纬', falseText: '南纬', skipZero: false },
  { bit: 3, name: '定位类型', trueText: '东经', falseText: '西经' },
  { bit: 4, name: '运营状态', trueText: '运营状态', falseText: '停运状态' },
  { bit: 5, name: '经纬度加密', trueText: '经纬度已加密', falseText: '经纬度未加密' },
  { bit: 6, name: '载重状态', trueText: '车辆载重', falseText: '车辆空载' },
  { bit: 8, name: '油路/电路', trueText: '油路正常', falseText: '油路断开' },
  { bit: 9, name: '油路/电路', trueText: '电路正常', falseText: '电路断开' },
  { bit: 10, name: '车门', trueText: '车门加锁', falseText: '车门解锁' },
  { bit: 11, name: '车门开关(1)', trueText: '车门1开', falseText: '车门1关' },
  { bit: 12, name: '车门开关(2)', trueText: '车门2开', falseText: '车门2关' },
  { bit: 13, name: '车门开关(3)', trueText: '车门3开', falseText: '车门3关' },
  { bit: 14, name: '车门开关(4)', trueText: '车门4开', falseText: '车门4关' },
  { bit: 15, name: '车门开关(5)', trueText: '车门5开', falseText: '车门5关' },
  { bit: 16, name: 'GPS 定位', trueText: 'GPS 已定位', falseText: 'GPS 未定位' },
  { bit: 17, name: '北斗定位', trueText: '北斗已定位', falseText: '北斗未定位' },
  { bit: 18, name: 'GLONASS 定位', trueText: 'GLONASS 已定位', falseText: 'GLONASS 未定位' },
  { bit: 19, name: 'Galileo 定位', trueText: 'Galileo 已定位', falseText: 'Galileo 未定位' },
];

/* ==================== 附加信息项（位置汇报 0x0200） ==================== */
const LOCATION_EXTRAS = {
  0x01: { name: '里程', unit: '1/10 km', type: 'u32' },
  0x02: { name: '油量', unit: '1/10 L', type: 'u16' },
  0x03: { name: '行驶记录功能获取的速度', unit: '1/10 km/h', type: 'u16' },
  0x04: { name: '需要人工确认报警事件的ID', unit: '', type: 'u16' },
  0x05: { name: '胎压', unit: '', type: 'tpms' },
  0x06: { name: '车厢温度', unit: '', type: 'temp' },
  0x07: { name: '超速报警附加信息', unit: '', type: 'overspeed' },
  0x08: { name: '进出区域/路线报警附加信息', unit: '', type: 'areaAlarm' },
  0x09: { name: '路段行驶时间不足/过长报警附加信息', unit: '', type: 'routeTime' },
  0x0A: { name: '车辆信号状态', unit: '', type: 'u32' },
  0x0B: { name: '车辆IO状态', unit: '', type: 'io' },
  0x0C: { name: '模拟量', unit: '', type: 'analog' },
  0x0D: { name: '无线通信网络信号强度', unit: '', type: 'u8' },
  0x0E: { name: 'GNSS 定位卫星数量', unit: '颗', type: 'u8' },
  0x0F: { name: '扩展车辆信号状态位', unit: '', type: 'u16' },
  0x10: { name: 'IO 状态位', unit: '', type: 'u16' },
  0x11: { name: 'ADAS 行驶安全信息', unit: '', type: 'adas' },
  0x12: { name: 'DSM 驾驶员状态监测', unit: '', type: 'dsm' },
  0x13: { name: '轮胎气压监测(TPMS)', unit: '', type: 'tpmsFull' },
  0x14: { name: '主动拍照/录像', unit: '', type: 'u32' },
  0x15: { name: '扩展车辆信号状态(苏标)', unit: '', type: 'u32' },
  0x16: { name: 'IO 状态(苏标)', unit: '', type: 'u16' },
  0x17: { name: 'AI 识别时间戳', unit: '', type: 'aiTime' },
  0x18: { name: '车辆载荷状态', unit: '', type: 'u8' },
  0x19: { name: '车辆 OBD 信息', unit: '', type: 'obd' },
  0x1A: { name: 'OBD 里程', unit: 'm', type: 'u32' },
  0x1B: { name: 'OBD 车速', unit: '1/10 km/h', type: 'u16' },
  0x1C: { name: 'OBD 诊断信息', unit: '', type: 'obdDiag' },
  0x1D: { name: 'ALC 报警状态', unit: '', type: 'u8' },
  0x1E: { name: '数字量', unit: '', type: 'analog' },
  0x1F: { name: '信号强度/网络类型', unit: '', type: 'netSignal' },
  0x20: { name: '扩展车辆信号状态(深圳)', unit: '', type: 'u32' },
  0x25: { name: '扩展车辆信号状态(苏标)', unit: '', type: 'u32' },
  0x30: { name: '无线通信网络信号强度', unit: 'dbm', type: 'u8Signed' },
  0x31: { name: 'GNSS 定位卫星数及信噪比', unit: '', type: 'satSnr' },
  0x40: { name: '车辆休眠状态', unit: '', type: 'u8' },
  0x51: { name: '苏标多媒体信息附加项', unit: '', type: 'suMedia' },
  0x63: { name: '中交兴路自定义', unit: '', type: 'u32' },
  /* 主动安全（苏标/山东团体标准）：0x0200 位置汇报新增报警附加项 */
  0x64: { name: '高级驾驶辅助系统(ADAS)报警', unit: '', type: 'adasActive' },
  0x65: { name: '驾驶员状态监测(DSM)报警', unit: '', type: 'dsmActive' },
  0x66: { name: '胎压监测(TPMS)报警', unit: '', type: 'tpmsActive' },
  0x67: { name: '盲区监测(BSD)报警', unit: '', type: 'bsdActive' },
  0xE0: { name: '自定义扩展', unit: '', type: 'raw' },
  0xFF: { name: '自定义扩展', unit: '', type: 'raw' },
};

/* ================= 终端参数 ID（JT/T 808-2019 附录） ================= */
const TERM_PARAMS = {
  0x0001: { name: '终端心跳发送间隔', unit: '秒' },
  0x0002: { name: 'TCP 消息应答超时时间', unit: '秒' },
  0x0003: { name: 'TCP 消息重传次数', unit: '次' },
  0x0004: { name: 'UDP 消息应答超时时间', unit: '秒' },
  0x0005: { name: 'UDP 消息重传次数', unit: '次' },
  0x0006: { name: 'SMS 消息应答超时时间', unit: '秒' },
  0x0007: { name: 'SMS 消息重传次数', unit: '次' },
  0x0010: { name: '主服务器 APN', unit: '' },
  0x0011: { name: '主服务器无线通信拨号用户名', unit: '' },
  0x0012: { name: '主服务器无线通信拨号密码', unit: '' },
  0x0013: { name: '主服务器地址', unit: 'IP 或域名' },
  0x0014: { name: '备份服务器 APN', unit: '' },
  0x0015: { name: '备份服务器无线通信拨号用户名', unit: '' },
  0x0016: { name: '备份服务器无线通信拨号密码', unit: '' },
  0x0017: { name: '备份服务器地址', unit: 'IP 或域名' },
  0x0018: { name: '服务器 TCP 端口', unit: '' },
  0x0019: { name: '服务器 UDP 端口', unit: '' },
  0x001A: { name: '道路运输证 IC 卡认证主服务器 IP 和端口', unit: '' },
  0x001B: { name: '道路运输证 IC 卡认证备份服务器 IP 和端口', unit: '' },
  0x001C: { name: '道路运输证 IC 卡认证密钥', unit: '' },
  0x0020: { name: '位置汇报策略', unit: '0定时 1定距 2定时定距' },
  0x0021: { name: '位置汇报方案', unit: '0按ACC 1按登签 2按ACC+登签' },
  0x0022: { name: '驾驶员未登录汇报时间间隔', unit: '秒' },
  0x0027: { name: '休眠时汇报时间间隔', unit: '秒' },
  0x0028: { name: '紧急报警时汇报时间间隔', unit: '秒' },
  0x0029: { name: '缺省时间汇报间隔', unit: '秒' },
  0x002C: { name: '缺省距离汇报间隔', unit: '米' },
  0x002D: { name: '驾驶员未登录汇报距离间隔', unit: '米' },
  0x002E: { name: '休眠时汇报距离间隔', unit: '米' },
  0x002F: { name: '紧急报警时汇报距离间隔', unit: '米' },
  0x0030: { name: '拐点补传角度', unit: '度' },
  0x0031: { name: '电子围栏半径', unit: '米' },
  0x0032: { name: '违规行驶时长(超速)阈值', unit: '秒' },
  0x0033: { name: '拐点补传距离', unit: '米' },
  0x0040: { name: '监控平台电话号码', unit: '' },
  0x0041: { name: '复位电话号码', unit: '' },
  0x0042: { name: '恢复出厂设置电话号码', unit: '' },
  0x0043: { name: '监控平台 SMS 电话号码', unit: '' },
  0x0044: { name: '接收终端 SMS 文本报警号码', unit: '' },
  0x0045: { name: '终端电话接听策略', unit: '0自动 1手动' },
  0x0046: { name: '每次最长通话时间', unit: '秒' },
  0x0047: { name: '当月最长通话时间', unit: '秒' },
  0x0048: { name: '监听电话号码', unit: '' },
  0x0049: { name: '监管平台特权短信号码', unit: '' },
  0x0050: { name: '报警屏蔽字', unit: '' },
  0x0051: { name: '报警发送文本 SMS 开关', unit: '' },
  0x0052: { name: '报警拍摄开关', unit: '' },
  0x0053: { name: '报警拍摄存储标志', unit: '' },
  0x0054: { name: '关键标志', unit: '' },
  0x0055: { name: '最高速度', unit: '1/10 km/h' },
  0x0056: { name: '超速持续时间', unit: '秒' },
  0x0057: { name: '连续驾驶时间限值', unit: '秒' },
  0x0058: { name: '连续驾驶时间间隔', unit: '秒' },
  0x0059: { name: '最小休息时间', unit: '秒' },
  0x005A: { name: '最长停车时间', unit: '秒' },
  0x005B: { name: '超速预警差值', unit: '1/10 km/h' },
  0x005C: { name: '疲劳驾驶预警差值', unit: '秒' },
  0x005D: { name: '碰撞报警参数', unit: '' },
  0x005E: { name: '侧翻报警参数', unit: '' },
  0x005F: { name: '超速预警差值(2019)', unit: '1/10 km/h' },
  0x0060: { name: '疲劳驾驶预警差值(2019)', unit: '秒' },
  0x0064: { name: '定位信息上传间隔(定时汇报)', unit: '秒' },
  0x0065: { name: '车辆里程表读数', unit: '1/10 km' },
  0x0066: { name: '车辆所在的省域 ID', unit: '' },
  0x0067: { name: '车辆所在的市域 ID', unit: '' },
  0x0068: { name: '车牌颜色', unit: '' },
  0x0069: { name: '车牌号(GBK)', unit: '' },
  0x0070: { name: '图像/视频质量', unit: '1~10' },
  0x0071: { name: '亮度', unit: '0~255' },
  0x0072: { name: '对比度', unit: '0~127' },
  0x0073: { name: '饱和度', unit: '0~127' },
  0x0074: { name: '色度', unit: '0~255' },
  0x0075: { name: '图像分辨率', unit: '' },
  0x0076: { name: '单独视频通道最大码流', unit: 'kbps' },
  0x0077: { name: '视频信号丢失报警', unit: '' },
  0x0078: { name: '视频遮挡报警', unit: '' },
  0x0079: { name: '存储器故障报警', unit: '' },
  0x007A: { name: '视频信号制式', unit: '' },
  0x0080: { name: '车辆类型', unit: '' },
  0x0081: { name: '车重', unit: 'kg' },
  0x0082: { name: '车辆轴数', unit: '' },
  0x0083: { name: '车辆制造日期', unit: '' },
  0x0084: { name: '道路运输证号', unit: '' },
  0x0085: { name: '车辆 VIN', unit: '' },
  0x0086: { name: '终端型号', unit: '' },
  0x0087: { name: '终端 SIM 卡 ICCID', unit: '' },
  0x0088: { name: '终端硬件版本号', unit: '' },
  0x0089: { name: '终端固件版本号', unit: '' },
  0x008A: { name: 'GNSS 模块属性', unit: '' },
  0x008B: { name: '通讯模块属性', unit: '' },
  0x008C: { name: '摄像头属性', unit: '' },
  0x0090: { name: '显示器属性', unit: '' },
  0x0091: { name: 'LCD 参数', unit: '' },
  0x0092: { name: '语音播报语音类型', unit: '' },
  0x0093: { name: '语音播报音量', unit: '' },
  0x0094: { name: '语音播报速率', unit: '' },
  0x0095: { name: '语音播报音色', unit: '' },
  0x0096: { name: '语音播报内容', unit: '' },
  0x0097: { name: '语音播报开关', unit: '' },
  0x00A0: { name: '省域 ID', unit: '' },
  0x00A1: { name: '市域 ID', unit: '' },
  0x00A2: { name: '车牌颜色', unit: '' },
  0x00A3: { name: '车牌号', unit: '' },
  0x00A4: { name: '终端主司机姓名', unit: '' },
  0x00A5: { name: '终端主司机身份证号', unit: '' },
  0x00A6: { name: '终端主司机从业资格证号', unit: '' },
  0x00A7: { name: '终端副司机姓名', unit: '' },
  0x00A8: { name: '终端副司机身份证号', unit: '' },
  0x00A9: { name: '终端副司机从业资格证号', unit: '' },
  0x00AA: { name: '蓝牙外设名称', unit: '' },
  0x00AB: { name: '蓝牙外设 PIN 码', unit: '' },
  0x00AC: { name: '蓝牙外设 MAC 地址', unit: '' },
  0x00AD: { name: '蓝牙密钥', unit: '' },
  0x00AE: { name: '蓝牙用户编号(深圳锐明)', unit: '' },
  0x00B0: { name: 'CAN 总线通道1采集间隔', unit: 'ms' },
  0x00B1: { name: 'CAN 总线通道2采集间隔', unit: 'ms' },
  0x00B2: { name: 'CAN 总线ID1', unit: '' },
  0x00B3: { name: 'CAN 总线ID2', unit: '' },
  0x00C0: { name: '车牌号(2019)', unit: '' },
  0x00C1: { name: '车道偏离报警参数', unit: '' },
  0x00C2: { name: '前向碰撞报警参数', unit: '' },
  0x00C3: { name: '车距过近报警参数', unit: '' },
  0x00C4: { name: '行人碰撞报警参数', unit: '' },
  0x00C5: { name: '频繁变道报警参数', unit: '' },
  0x00C6: { name: '道路标识超限报警参数', unit: '' },
  0x00C7: { name: '障碍物报警参数', unit: '' },
  0x00C8: { name: '驾驶辅助功能报警参数', unit: '' },
  0x00C9: { name: '胎压监测功能报警参数', unit: '' },
  0x00CA: { name: '疲劳驾驶监测报警参数', unit: '' },
  0x00D0: { name: '驾驶员身份识别功能', unit: '' },
  0x00D1: { name: '驾驶员身份识别超时时间', unit: '秒' },
  0x00E0: { name: '主动拍照参数', unit: '' },
  0x00E1: { name: 'DSM 报警参数', unit: '' },
  0x00F0: { name: '终端序列号', unit: '' },
  0x00F1: { name: 'SIM 卡号(2019)', unit: '' },
  0x00F2: { name: '自定义参数(厂商)', unit: '' },
  0xF364: { name: '自定义参数(厂商)', unit: '' },
  0xF365: { name: '自定义参数(厂商)', unit: '' },
};

/* ================= 驾驶员身份/事件/其他枚举 ================= */
const COLOR_LABEL = {
  0: '未知', 1: '蓝色', 2: '黄色', 3: '黑色', 4: '白色', 9: '其他',
  91: '农黄', 92: '农白', 93: '农黑', 94: '农绿', 95: '农其他',
};

/* 车牌颜色（注册消息 / 位置汇报附加项，1 字节，JT/T 808 附件） */
const PLATE_COLOR = {
  0: '无车牌', 1: '蓝色', 2: '黄色', 3: '黑色', 4: '白色',
  9: '其他', 10: '农用黄', 11: '农用白', 12: '农用黑',
  21: '渐变绿色', 22: '黄绿双拼色', 23: '黑色白字',
  24: '蓝白渐变', 25: '黄色白字', 26: '红色白字',
  31: '新能源绿', 32: '新能源黄绿',
  91: '农黄', 92: '农白', 93: '农黑', 94: '农绿', 95: '农其他',
};

/* 车辆类型（JT/T 809 车辆定位信息） */
const VEHICLE_TYPE_809 = {
  0x01: '客车', 0x02: '货车', 0x03: '危险品运输车', 0x04: '牵引车',
  0x05: '工程车', 0x06: '平板车', 0x07: '罐车', 0x08: '混凝土搅拌车',
  0x09: '出租车', 0x0A: '公交车', 0x0B: '校车', 0x0C: '旅游客车',
  0x0D: '长途客车', 0x0E: '农用车', 0x0F: '摩托车',
  0x10: '三轮车', 0x11: '拖拉机', 0x12: '轮式机械', 0x13: '其他',
};

const VEHICLE_TYPE = {
  0x01: '客车', 0x02: '货车', 0x03: '危险品运输车', 0x04: '牵引车',
  0x09: '工程车', 0x10: '平板车', 0x11: '罐车', 0x12: '混凝土搅拌车',
  0x20: '小型客车', 0x21: '小型货车', 0x30: '出租车', 0x40: '校车',
  0x50: '公交车', 0x90: '其他',
};

const MEDIA_TYPE = { 0: '图像', 1: '音频', 2: '视频', 3: '其他' };

const EVENT_TYPE = {
  0x01: '超速报警', 0x02: '疲劳驾驶', 0x03: '急加速', 0x04: '急减速',
  0x05: '急转弯', 0x06: '碰撞', 0x07: '侧翻', 0x08: '非法点火',
  0x09: '非法位移', 0x10: '超时停车', 0x11: '进出区域', 0x12: '进出路线',
  0x13: '路段行驶时间不足', 0x14: '路段行驶时间过长', 0x15: '路线偏离',
  0x20: '点火', 0x21: '熄火', 0x22: '空车', 0x23: '重车',
  0x24: '开门', 0x25: '关门',
};

/* ================ 苏标/粤标 ADAS(0x11) 与 DSM(0x12) 报警类型 ================ */
const ADAS_ALARM = {
  0x01: '前碰撞预警(FCW)', 0x02: '车道偏离预警(LDW)', 0x03: '车距过近预警(HMW)',
  0x04: '行人碰撞预警(PCW)', 0x05: '频繁变道预警', 0x06: '道路标识超限预警',
  0x07: '障碍物预警', 0x08: '驾驶辅助功能失效', 0x09: '前方车辆行驶预警',
  0x0A: '行人识别预警', 0x0B: '左转预警', 0x0C: '右转预警', 0x0D: '前方行人预警',
  0x10: '低速预警', 0x11: '前车溜车预警', 0x12: '前车静止预警',
};

const DSM_ALARM = {
  0x01: '疲劳驾驶(生理)', 0x02: '接打电话', 0x03: '抽烟', 0x04: '分神驾驶',
  0x05: '驾驶员异常', 0x06: '驾驶员身份识别', 0x07: '未系安全带',
  0x08: '手离方向盘', 0x09: '遮挡摄像头', 0x0A: '换人驾驶',
  0x0B: '红外阻挡', 0x0C: '疲劳驾驶(累计)', 0x0D: '疑似疲劳',
  0x0E: '饮水', 0x0F: '吃东西', 0x10: '左顾右盼',
};

/* ========== 主动安全（山东团体标准/苏标）ADAS(0x64) 与 DSM(0x65) 报警类型 ========== */
const ADAS_ALARM_ACTIVE = {
  0x01: '前向碰撞报警', 0x02: '车道偏离报警', 0x03: '车距过近报警', 0x04: '行人碰撞报警',
  0x06: '道路标识超限报警', 0x07: '障碍物报警',
  0x10: '道路标志识别事件', 0x11: '主动抓拍事件',
};
const DSM_ALARM_ACTIVE = {
  0x01: '疲劳驾驶报警', 0x02: '接打电话报警', 0x03: '抽烟报警', 0x04: '分神驾驶报警',
  0x05: '驾驶员异常报警', 0x06: '双手同时脱离方向盘报警',
  0x07: '驾驶员行为监测功能失效报警', 0x08: '未系安全带报警',
  0x10: '自动抓拍事件', 0x11: '驾驶员变更事件',
};
const ADAS_ACTIVE_FLAG = { 0x01: '开始', 0x02: '结束' };
const ADAS_ACTIVE_LEVEL = { 0x01: '一级报警(1张图片)', 0x02: '二级报警(1张图片+10秒视频)' };
const ADAS_ACTIVE_DEVIATION = { 0x01: '左侧偏离', 0x02: '右侧偏离' };
const ADAS_ACTIVE_ROADSIGN = { 0x01: '限速标志', 0x02: '限高标志', 0x03: '限重标志' };

const OVERSpeed_TYPE = {
  0: '无特定位置信息', 1: '圆形区域', 2: '矩形区域', 3: '多边形区域', 4: '路段',
};

const AREA_TYPE = {
  0: '圆形区域', 1: '矩形区域', 2: '多边形区域', 3: '路段',
};

const PHONE_TYPE = {
  0: '呼入', 1: '呼出', 2: '呼入/呼出', 3: '呼入(按键)', 4: '呼出(按键)',
};

/* ================= 809 相关枚举 ================= */
const S809_LOGIN_RESULT = {
  0: '成功', 1: 'IP 地址不正确', 2: '接入码不正确', 3: '用户没注册',
  4: '密码错误', 5: '资源紧张，稍后再连接(已经占用)',
  6: '其他错误', 7: '下级平台已存在主链路连接',
};

const S809_LOGIN_TYPE = { 1: '主链路', 2: '从链路' };
const S809_ENCRYPT = { 0: '不加密', 1: 'RSA 加密' };

const S809_MSGTYPE = {
  1: '上行(下级平台到上级平台)', 2: '下行(上级平台到下级平台)',
};

/* ============== 终端状态 / 注册应答 / 事件枚举 ============== */
const RESULT_CODE = {
  0: '成功/确认', 1: '失败', 2: '消息有误', 3: '不支持', 4: '报警处理确认',
};

const REG_RESULT = {
  0: '成功', 1: '车辆已被注册', 2: '数据库中无该车辆',
  3: '终端已被注册', 4: '数据库中无该终端',
};

const UPGRADE_RESULT = {
  0: '成功', 1: '失败', 2: '升级包错误', 3: '版本不支持',
  4: '升级包与终端不匹配', 5: '其他',
};

const UPGRADE_TYPE = {
  0: '终端固件', 1: '终端应用', 2: '其他', 12: '道路运输证 IC 卡读卡器',
  52: '北斗定位模块', 53: 'GNSS 模块',
};

const PLATE_FORMAT = {
  0: '无', 1: '数字/字母', 2: '中文', 3: '其他',
};

const NET_TYPE = { 0: '2G', 1: '3G', 2: '4G', 3: '5G', 15: '其他' };

const IMEI_ERR = { 0: '正常', 1: '越界', 2: '无效' };

/* ====================== 转义 / 常量 ====================== */
const FLAG_BIT = 0x7E;
const ESCAPE_BIT = 0x7D;
const ESCAPE_7E = 0x02;
const ESCAPE_7D = 0x01;

const MSG_VERSION = { 0: '2011', 1: '2013', 2: '2019' };

/* 分页/流水号等 */
const BCD_PLATE_COLORS = COLOR_LABEL;


/*!
 * JT/T 808 (2011/2013/2019) & JT/T 809 报文解析引擎
 * 纯 JavaScript，无任何依赖，可在浏览器直接运行。
 */


/* =====================================================================
 * 基础工具
 * ===================================================================== */

/** 十六进制字符串 -> Uint8Array（宽松解析：忽略空格/逗号/0x/换行等） */
function hexToBytes(input) {
  if (!input) return new Uint8Array(0);
  let s = String(input).trim();
  // 去除常见分隔符
  s = s.replace(/0x/gi, '').replace(/[^0-9a-fA-F]/g, '');
  if (s.length % 2 !== 0) {
    // 奇数位补 0（容错）
    s = s.slice(0, s.length - 1) + s.slice(-1);
  }
  const out = new Uint8Array(s.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(s.substr(i * 2, 2), 16);
  }
  return out;
}

function bytesToHex(bytes, sep = ' ') {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(sep);
}

/* ---- 字节流读取器 ---- */
class Reader {
  constructor(bytes, offset = 0) {
    this.bytes = bytes;
    this.pos = offset;
  }
  get left() { return this.bytes.length - this.pos; }
  get eof() { return this.pos >= this.bytes.length; }
  need(n) {
    if (this.left < n) throw new Error(`数据长度不足：需要 ${n} 字节，剩余 ${this.left} 字节（偏移 ${this.pos}）`);
  }
  u8() { this.need(1); return this.bytes[this.pos++]; }
  i8() { const v = this.u8(); return v > 127 ? v - 256 : v; }
  u16() { this.need(2); const v = (this.bytes[this.pos] << 8) | this.bytes[this.pos + 1]; this.pos += 2; return v; }
  i16() { const v = this.u16(); return v > 0x7fff ? v - 0x10000 : v; }
  u32() {
    this.need(4);
    const v = ((this.bytes[this.pos] << 24) >>> 0) + (this.bytes[this.pos + 1] << 16) +
      (this.bytes[this.pos + 2] << 8) + this.bytes[this.pos + 3];
    this.pos += 4;
    return v >>> 0;
  }
  i32() { const v = this.u32(); return v > 0x7fffffff ? v - 0x100000000 : v; }
  /** 8 字节转为 BigInt（用于 IMEI / 时间等大数） */
  u64() {
    this.need(8);
    let v = 0n;
    for (let i = 0; i < 8; i++) v = (v << 8n) | BigInt(this.bytes[this.pos + i]);
    this.pos += 8;
    return v;
  }
  /** BCD 编码字符串，n 字节 -> 2n 个十六进制大写字符 */
  bcd(n) {
    this.need(n);
    let s = '';
    for (let i = 0; i < n; i++) s += this.bytes[this.pos + i].toString(16).padStart(2, '0').toUpperCase();
    this.pos += n;
    return s;
  }
  /** 定长字节 */
  take(n) {
    this.need(n);
    const b = this.bytes.slice(this.pos, this.pos + n);
    this.pos += n;
    return b;
  }
  /** GBK 字符串（浏览器用 TextDecoder('gbk')，Node 环境回退 UTF-8） */
  gbk(n) {
    const b = this.take(n);
    return decodeGBK(b);
  }
  /** 以 GBK 解码直到遇到 0x00 或长度耗尽（定长字段） */
  gbkz(n) {
    const b = this.take(n);
    return decodeGBK(stripNul(b));
  }
  /** GBK 变长字段：读取全部剩余字节，按 0x00 截断 */
  gbkRest() {
    const b = this.rest();
    return decodeGBK(stripNul(b));
  }
  /** 剩余全部 */
  rest() {
    const b = this.bytes.slice(this.pos);
    this.pos = this.bytes.length;
    return b;
  }
}

/** 去掉字节数组中首个 0x00 及其之后的所有内容（C 风格字符串结尾） */
function stripNul(bytes) {
  let end = -1;
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] === 0x00) { end = i; break; }
  }
  return end < 0 ? bytes : bytes.slice(0, end);
}

/** GBK 解码：
 *  浏览器：TextDecoder('gbk') 原生支持；
 *  Node / 老浏览器：使用内置 GBK 索引表手工解码（不依赖 ICU）。
 */
let _gbkTable = null;
let _gbkTableTried = false;

function decodeGBK(bytes) {
  if (!bytes || bytes.length === 0) return '';
  // 优先使用原生 TextDecoder（浏览器与完整 ICU 的 Node）
  if (typeof TextDecoder !== 'undefined') {
    try {
      const td = new TextDecoder('gbk', { fatal: false });
      const s = td.decode(bytes);
      // 若解码结果不含替换字符，直接采用
      if (!s.includes('\ufffd')) return s;
    } catch (e) { /* 不支持 gbk，走内置表 */ }
  }
  return decodeGBKTable(bytes);
}

/** 内置 GBK 解码（表来自 dict-table 生成脚本，缺失时降级为转义显示） */
function decodeGBKTable(bytes) {
  if (!_gbkTableTried) {
    _gbkTableTried = true;
    try {
      _gbkTable = GBK_TABLE;
    } catch (e) { _gbkTable = null; }
  }
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    if (b < 0x80) {
      out += String.fromCharCode(b);
    } else if (i + 1 < bytes.length) {
      const pair = (b << 8) | bytes[i + 1];
      if (_gbkTable && _gbkTable[pair]) {
        out += _gbkTable[pair];
      } else {
        out += `\\x${b.toString(16).padStart(2, '0')}\\x${bytes[i + 1].toString(16).padStart(2, '0')}`;
      }
      i++;
    } else {
      out += `\\x${b.toString(16).padStart(2, '0')}`;
    }
  }
  return out;
}

/** GBK 索引表（由 gbk-table.js 提供，含 2 万+ 常用汉字） */
let GBK_TABLE = null;
function _setGbkTable(t) { GBK_TABLE = t || null; }

/** 安全取字典名 */
const dn = (dict, key, def = null) => (dict[key] !== undefined ? dict[key] : def);
const paramName = (id) => (TERM_PARAMS[id] ? TERM_PARAMS[id].name : null);
const paramUnit = (id) => (TERM_PARAMS[id] ? TERM_PARAMS[id].unit : '');

/* =====================================================================
 * 位标志解析
 * ===================================================================== */
function parseBits(value, table) {
  const on = [];
  const all = [];
  for (const item of table) {
    const set = ((value >>> item.bit) & 1) === 1;
    const label = set ? (item.trueText || item.name || '') : (item.falseText || item.name || '');
    all.push({ bit: item.bit, name: item.name, set, label, desc: item.desc });
    if (set) on.push({ bit: item.bit, name: item.name, label, desc: item.desc });
  }
  return { on, all };
}

/* =====================================================================
 * 字段构造辅助（统一输出结构，UI 直接渲染）
 * ===================================================================== */
let _uid = 0;
function f(key, label, value, extra = {}) {
  return { _id: ++_uid, key, label, value, ...extra };
}

/* =====================================================================
 * 消息头解析
 * 2011: 消息ID(2) 消息体属性(2) 终端手机号(6 BCD) 消息流水号(2)
 * 2013: 消息ID(2) 消息体属性(2) 终端手机号(6 BCD) 消息流水号(2)
 *       —— 与 2011 相同（区别在消息体属性 bit10-12 的版本位）
 * 2019: 消息ID(2) 消息体属性(2) 版本号(1) 终端手机号(10 BCD) 消息流水号(2)
 * ===================================================================== */
function parseHeader(r) {
  const header = { fields: [] };
  const msgId = r.u16();
  const attr = r.u16();

  const bodyLen = attr & 0x03ff;
  const encrypt = (attr >> 10) & 0x07;
  const isSubPackage = ((attr >> 13) & 1) === 1;
  // bit14 为主/从链路标识（809 用），bit15 保留
  const versionBit = (attr >> 14) & 1;
  const reserved = (attr >> 15) & 1;

  header.MSG_ID = msgId;
  header.attr = attr;
  header.bodyLen = bodyLen;
  header.encrypt = encrypt;
  header.isSubPackage = isSubPackage;

  // 版本判定：bit14=1 表示 2019 版本（含版本号字段），否则 2011/2013
  header.version = versionBit ? 2 : 1;

  header.fields.push(f('MSG_ID', '消息 ID', `0x${msgId.toString(16).padStart(4, '0').toUpperCase()}`));
  header.fields.push(f('ATTR', '消息体属性', `0x${attr.toString(16).padStart(4, '0').toUpperCase()} (${attr.toString(2).padStart(16, '0')})`));
  header.fields.push(f('BODY_LEN', '消息体长度', bodyLen, { hint: 'bit0-9' }));
  header.fields.push(f('ENCRYPT', '加密方式', encrypt === 0 ? '0 - 不加密' : `${encrypt} - 加密方式 ${encrypt}`, { hint: 'bit10-12' }));
  header.fields.push(f('SUB_PKG', '分包标志', isSubPackage ? '1 - 分包' : '0 - 不分包', { hint: 'bit13' }));

  if (versionBit) {
    const ver = r.u8();
    header.versionNo = ver;
    header.fields.push(f('VER_NO', '版本号', ver));
    header.fields.push(f('VER_BIT', '版本标识位', 'bit14 = 1 (2019 版协议)', { hint: 'bit14' }));
    const phone = r.bcd(10);
    header.phone = phone.replace(/^0+/, '') || '0';
    header.phoneRaw = phone;
    header.fields.push(f('PHONE', '终端手机号', header.phone, { hint: '10 字节 BCD' }));
  } else {
    header.fields.push(f('VER_BIT', '版本标识位', 'bit14 = 0 (2011/2013 版协议)', { hint: 'bit14' }));
    const phone = r.bcd(6);
    header.phone = phone.replace(/^0+/, '') || '0';
    header.phoneRaw = phone;
    header.fields.push(f('PHONE', '终端手机号', header.phone, { hint: '6 字节 BCD' }));
  }

  const seq = r.u16();
  header.seq = seq;
  header.fields.push(f('SEQ', '消息流水号', seq));

  if (isSubPackage) {
    const total = r.u16();
    const idx = r.u16();
    header.pkgTotal = total;
    header.pkgIndex = idx;
    header.fields.push(f('PKG_TOTAL', '分包总数', total));
    header.fields.push(f('PKG_INDEX', '分包序号', idx));
  }

  return header;
}

/* =====================================================================
 * 转义还原
 * 0x7D 0x02 -> 0x7E
 * 0x7D 0x01 -> 0x7D
 * ===================================================================== */
function unescape(bytes) {
  const out = [];
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] === 0x7d && i + 1 < bytes.length) {
      const nxt = bytes[i + 1];
      if (nxt === 0x02) { out.push(0x7e); i++; continue; }
      if (nxt === 0x01) { out.push(0x7d); i++; continue; }
    }
    out.push(bytes[i]);
  }
  return new Uint8Array(out);
}

function escape(bytes) {
  const out = [];
  for (const b of bytes) {
    if (b === 0x7e) { out.push(0x7d, 0x02); }
    else if (b === 0x7d) { out.push(0x7d, 0x01); }
    else out.push(b);
  }
  return new Uint8Array(out);
}

/** 异或校验（从消息头第一字节到校验码前一个字节） */
function xorChecksum(bytes) {
  let c = 0;
  for (const b of bytes) c ^= b;
  return c & 0xff;
}

/* =====================================================================
 * 主入口：解析整条报文
 * ===================================================================== */
function parseMessage(input) {
  const raw = hexToBytes(input);
  const warnings = [];

  if (raw.length === 0) throw new Error('输入为空，请输入 16 进制报文');

  // ---- 剥离 7E 帧头帧尾（可能包含多条） ----
  let frame = raw;
  let hadFlag = false;
  if (frame[0] === 0x7e) { frame = frame.slice(1); hadFlag = true; }
  if (frame.length && frame[frame.length - 1] === 0x7e) { frame = frame.slice(0, -1); hadFlag = true; }
  // 若内部还有 7E，说明粘包
  const innerFlags = [];
  for (let i = 0; i < frame.length; i++) if (frame[i] === 0x7e) innerFlags.push(i);

  const escapedFrame = frame;
  const body = unescape(frame);

  // ---- 校验码 ----
  let checksumOk = null;
  let declaredChecksum = null;
  let calcChecksum = null;
  let payload = body;
  if (body.length >= 2) {
    declaredChecksum = body[body.length - 1];
    const before = body.slice(0, body.length - 1);
    calcChecksum = xorChecksum(before);
    checksumOk = declaredChecksum === calcChecksum;
    payload = before;
  }

  const r = new Reader(payload);
  const header = parseHeader(r);

  // ---- 判定协议族：809 的消息 ID 范围 0x1xxx / 0x9xxx，且 attr bit14 表示主从链路 ----
  let protocol = '808';
  const is809Id = (header.MSG_ID >= 0x1000 && header.MSG_ID <= 0x1FFF) ||
    (header.MSG_ID >= 0x9000 && header.MSG_ID <= 0x9FFF);
  if (is809Id && MSG_809[header.MSG_ID]) protocol = '809';

  const dict = protocol === '809' ? MSG_809 : MSG_808;
  const def = dict[header.MSG_ID];

  const result = {
    protocol,
    header,
    checksum: { ok: checksumOk, declared: declaredChecksum, calculated: calcChecksum },
    msgId: header.MSG_ID,
    msgIdHex: `0x${header.MSG_ID.toString(16).padStart(4, '0').toUpperCase()}`,
    msgName: def ? def.name : `未知消息 (0x${header.MSG_ID.toString(16).toUpperCase()})`,
    msgDir: def ? def.dir : null,
    versionText: header.version === 2 ? 'JT/T 808-2019' : 'JT/T 808-2011/2013',
    warnings,
    bodyFields: [],
    raw: { input, frame: escapedFrame, unescaped: body, payload },
    frameInfo: {
      totalBytes: raw.length,
      withFlag: hadFlag,
      innerFlagCount: innerFlags.length,
      escapedBytes: escapedFrame.length,
      unescapedBytes: body.length,
    },
  };

  if (innerFlags.length > 0) {
    warnings.push(`报文内部存在 ${innerFlags.length} 个 0x7E 字节，可能为粘包（多条报文拼接）。本工具仅解析第一条。`);
  }
  if (checksumOk === false) {
    warnings.push(`校验码不匹配：报文声明 0x${declaredChecksum.toString(16).padStart(2, '0').toUpperCase()}，计算得 0x${calcChecksum.toString(16).padStart(2, '0').toUpperCase()}。`);
  }
  if (header.encrypt !== 0) {
    warnings.push(`消息体已加密（加密方式 ${header.encrypt}），无法解析明文内容。`);
  }
  if (!def) {
    warnings.push(`未收录的消息 ID ${result.msgIdHex}，已按原始字节展示。`);
  }

  // ---- 消息体长度校验 ----
  const bodyStart = header.fields.length; // 仅供参考
  const consumed = r.pos;
  const declaredLen = header.bodyLen;
  const packedExtraLen = header.isSubPackage ? 4 : 0;
  const expectTotal = consumed + declaredLen + packedExtraLen;
  if (declaredLen > 0 && payload.length < expectTotal) {
    warnings.push(`消息体长度不足：声明 ${declaredLen} 字节，实际可用 ${payload.length - consumed - packedExtraLen} 字节。`);
  } else if (declaredLen > 0 && payload.length > expectTotal) {
    warnings.push(`消息体长度偏小：声明 ${declaredLen} 字节，实际多出 ${payload.length - expectTotal} 字节（可能被截断或为粘包残留）。`);
  }

  // ---- 解析消息体 ----
  if (def && def.body && def.body !== 'empty' && header.encrypt === 0) {
    try {
      const limit = declaredLen > 0 ? Math.min(consumed + declaredLen, payload.length) : payload.length;
      const bodyBytes = payload.slice(consumed, limit);
      const br = new Reader(bodyBytes);
      const ctx = { protocol, msgId: header.MSG_ID, header };
      result.bodyFields = parseBody(def.body, br, ctx);
      if (br.left > 0) {
        result.bodyFields.push({
          _id: ++_uid,
          key: '_TAIL',
          label: '未解析的剩余字节',
          value: `${br.left} 字节`,
          hex: bytesToHex(br.rest()),
          kind: 'raw',
        });
      }
    } catch (e) {
      warnings.push(`消息体解析失败：${e.message}`);
      result.bodyFields = [{
        _id: ++_uid,
        key: '_ERR',
        label: '解析错误',
        value: e.message,
        kind: 'error',
      }];
    }
  } else if (def && def.body === 'empty' && declaredLen > 0) {
    result.bodyFields = [{ _id: ++_uid, key: '_RAW', label: '消息体原始数据', value: bytesToHex(payload.slice(consumed, consumed + declaredLen)), kind: 'raw', monospace: true }];
  }

  // 若消息体未完全消耗，且无 def
  if (!def && declaredLen > 0) {
    result.bodyFields = [{ _id: ++_uid, key: '_RAW', label: '消息体原始数据', value: bytesToHex(payload.slice(consumed, consumed + declaredLen)), kind: 'raw', monospace: true }];
  }

  return result;
}

/* =====================================================================
 * 消息体解析分发
 * ===================================================================== */
function parseBody(type, r, ctx) {
  const fn = BODY_PARSERS[type];
  if (!fn) return [{ _id: ++_uid, key: '_RAW', label: '原始数据', value: bytesToHex(r.rest()), kind: 'raw', monospace: true }];
  return fn(r, ctx);
}

const BODY_PARSERS = {
  /* ---------------- 0x0001 终端通用应答 / 0x8001 平台通用应答 ---------------- */
  resp0001(r) {
    const seq = r.u16();
    const id = r.u16();
    const res = r.u8();
    const out = [
      f('RESP_SEQ', '应答流水号', seq, { hint: '对应平台消息流水号' }),
      f('RESP_ID', '应答消息 ID', `0x${id.toString(16).padStart(4, '0').toUpperCase()}`, { hint: dn(MSG_808, id) ? MSG_808[id].name : '未知消息' }),
      f('RESULT', '应答结果', `${res} - ${dn(RESULT_CODE, res, '未知')}`),
    ];
    return out;
  },

  /* ---------------- 0x0002 终端心跳 ---------------- */
  heartbeat(r) {
    const out = [f('_NOTE', '说明', '心跳消息，消息体为空')];
    if (r.left > 0) out.push(f('_DATA', '附加数据', bytesToHex(r.rest()), { kind: 'raw', monospace: true }));
    return out;
  },

  empty() { return [f('_NOTE', '说明', '该消息消息体为空')]; },

  /* ---------------- 0x0005 补传分包请求 ---------------- */
  retransmit(r) {
    const seq = r.u16();
    const cnt = r.u16();
    const ids = [];
    for (let i = 0; i < cnt && r.left >= 2; i++) ids.push(r.u16());
    return [
      f('ORI_SEQ', '原始消息流水号', seq),
      f('PKG_CNT', '重传分包数量', cnt),
      f('PKG_IDS', '重传分包流水号', ids.map((x) => x).join(', '), { hint: '需要重传的分包消息流水号' }),
    ];
  },

  /* ---------------- 0x0100 终端注册 ---------------- */
  reg0100(r) {
    const prov = r.u16();
    const city = r.u16();
    const mfr = r.gbkz(5);
    const model = r.gbkz(20);
    const tid = r.gbkz(7);
    const color = r.u8();
    const vin = r.left >= 17 ? r.gbkz(17) : '';
    return [
      f('PROVINCE', '省域 ID', `${prov} (0x${prov.toString(16).padStart(4, '0').toUpperCase()})`, { hint: dn(PROVINCES, prov, '未知省份') }),
      f('CITY', '市域 ID', `${city} (0x${city.toString(16).padStart(4, '0').toUpperCase()})`),
      f('MFR', '制造商 ID', mfr, { hint: '5 字节 GBK' }),
      f('MODEL', '终端型号', model, { hint: '20 字节 GBK' }),
      f('TERM_ID', '终端 ID', tid, { hint: '7 字节 GBK' }),
      f('PLATE_COLOR', '车牌颜色', `${color} - ${dn(PLATE_COLOR, color, dn(COLOR_LABEL, color, '未知'))}`, { hint: '1 字节，JT/T 808-2019 在车牌颜色后追加车牌号' }),
      ...(vin ? [f('VIN', '车辆 VIN 识别码', vin, { hint: '17 字节 GBK，JT/T 808-2019 新增' })] : []),
    ];
  },

  /* ---------------- 0x0102 终端鉴权 ---------------- */
  auth0102(r, ctx) {
    const len = ctx.header.version === 2 && r.left >= 1 ? r.u8() : null;
    const code = r.take(len !== null ? len : r.left);
    return [
      ...(len !== null ? [f('CODE_LEN', '鉴权码长度', len, { hint: '2019 版新增长度字节' })] : []),
      f('AUTH_CODE', '鉴权码', decodeGBK(code), { hint: `${code.length} 字节` }),
      f('AUTH_HEX', '鉴权码 Hex', bytesToHex(code), { monospace: true }),
    ];
  },

  /* ---------------- 0x0103 设置终端通信参数（2011版） ---------------- */
  commParam(r) {
    return [
      f('TCP_TIMEOUT', 'TCP 消息应答超时时间', r.u32(), { hint: '秒' }),
      f('TCP_RETRY', 'TCP 消息重传次数', r.u32(), { hint: '次' }),
      f('UDP_TIMEOUT', 'UDP 消息应答超时时间', r.u32(), { hint: '秒' }),
      f('UDP_RETRY', 'UDP 消息重传次数', r.u32(), { hint: '次' }),
      f('SMS_TIMEOUT', 'SMS 消息应答超时时间', r.u32(), { hint: '秒' }),
      f('SMS_RETRY', 'SMS 消息重传次数', r.u32(), { hint: '次' }),
      f('MAIN_IP', '主服务器 IP 地址', r.gbkz(32)),
      f('MAIN_PORT', '主服务器端口', r.u16()),
      f('BACK_IP', '备份服务器 IP 地址', r.gbkz(32)),
      f('BACK_PORT', '备份服务器端口', r.u16()),
    ];
  },

  querySpecParam(r) {
    const cnt = r.u8();
    const ids = [];
    for (let i = 0; i < cnt && r.left >= 4; i++) ids.push(r.u32());
    const parts = ids.map((id) => {
      const key = `PARAM_${id.toString(16).padStart(4, '0').toUpperCase()}`;
      return { id, name: paramName(id) || '未知参数' };
    });
    return [
      f('PARAM_CNT', '参数总数', cnt),
      ...parts.map((p, i) => f(`PARAM[${i}]`, `参数 ID ${i + 1}`, `0x${p.id.toString(16).padStart(8, '0').toUpperCase()}`, { hint: p.name })),
    ];
  },

  queryParam0104(r) {
    return [f('_NOTE', '说明', '查询终端参数，消息体为空（部分实现带参数 ID 列表）')];
  },

  /* ---------------- 0x0105 / 0x8105 终端控制 ---------------- */
  terminalControl(r) {
    const cmd = r.u8();
    const CMD = {
      1: '无线升级', 2: '控制终端连接指定服务器', 3: '终端关机', 4: '终端复位',
      5: '终端恢复出厂设置', 6: '关闭数据通信', 7: '关闭无线通信',
      8: '查询终端属性', 9: '关闭终端(锁定)', 10: '打开终端(解锁)',
      0x80: '车辆油路断开', 0x81: '车辆油路恢复', 0x82: '车辆电路断开', 0x83: '车辆电路恢复',
    };
    const out = [f('CMD', '控制指令', `${cmd} (0x${cmd.toString(16).padStart(2, '0').toUpperCase()}) - ${dn(CMD, cmd, '未知指令')}`)];
    if (cmd === 2) {
      out.push(f('IP', '服务器 IP', r.gbkz(r.left)));
    } else if (r.left > 0) {
      out.push(f('CMD_PARAM', '指令参数', bytesToHex(r.rest()), { kind: 'raw', monospace: true }));
    }
    return out;
  },

  /* ---------------- 0x0107 / 0x0108 终端属性 ---------------- */
  terminalAttr(r) {
    const type = r.u16();
    const mfr = r.gbkz(5);
    const model = r.gbkz(20);
    const tid = r.gbkz(7);
    const iccid = r.gbkz(10);
    const hw = r.u8();
    const fw = r.u8();
    const gnss = r.u8();
    const comm = r.u8();
    const out = [
      f('TERM_TYPE', '终端类型', `0x${type.toString(16).padStart(4, '0').toUpperCase()}`),
      f('MFR', '制造商 ID', mfr, { hint: '5 字节' }),
      f('MODEL', '终端型号', model, { hint: '20 字节' }),
      f('TERM_ID', '终端 ID', tid, { hint: '7 字节' }),
      f('ICCID', '终端 SIM 卡 ICCID', iccid, { hint: '10 字节 BCD' }),
      f('HW_VER', '终端硬件版本号长度/值', stepVersion(hw, r, '硬件')),
      f('FW_VER', '终端固件版本号长度/值', stepVersion(fw, r, '固件')),
      f('GNSS_ATTR', 'GNSS 模块属性', `0x${gnss.toString(16).padStart(2, '0').toUpperCase()}`, { hint: gnssAttr(gnss) }),
      f('COMM_ATTR', '通信模块属性', `0x${comm.toString(16).padStart(2, '0').toUpperCase()}`, { hint: commAttr(comm) }),
    ];
    return out;
  },

  /* ---------------- 0x0200 位置信息汇报（核心） ---------------- */
  location(r, ctx) {
    return parseLocationBody(r, ctx);
  },

  batchLocation(r, ctx) {
    const cnt = r.u16();
    const type = r.u8();
    const TYPE = { 0: '正常位置批量汇报', 1: '盲区补报' };
    const out = [
      f('LOC_CNT', '位置汇报数据项个数', cnt),
      f('LOC_TYPE', '位置数据类型', `${type} - ${dn(TYPE, type, '未知')}`),
    ];
    for (let i = 0; i < cnt; i++) {
      if (r.left < 2) { out.push(f(`_ERR${i}`, '数据不足', `声明 ${cnt} 条，实际只解析到 ${i} 条`)); break; }
      const len = r.u16();
      const sub = r.take(Math.min(len, r.left));
      const sr = new Reader(sub);
      try {
        const fields = parseLocationBody(sr, ctx);
        out.push({
          _id: ++_uid,
          key: `LOC[${i}]`,
          label: `位置数据 #${i + 1}`,
          kind: 'group',
          children: fields,
          hint: `${len} 字节`,
        });
      } catch (e) {
        out.push({ _id: ++_uid, key: `LOC[${i}]`, label: `位置数据 #${i + 1}`, value: `解析失败：${e.message}`, kind: 'error' });
      }
      if (len > sub.length) break;
    }
    return out;
  },

  /* ---------------- 0x0201 / 0x8201 位置信息查询 ---------------- */
  query0201(r) {
    return [f('_NOTE', '说明', '位置信息查询，消息体为空')];
  },

  /* ---------------- 0x0202 / 0x8202 临时位置跟踪控制 ---------------- */
  trackCtrl(r) {
    const interval = r.u16();
    const duration = r.u32();
    return [
      f('INTERVAL', '时间间隔', interval, { hint: '秒；0 表示停止跟踪' }),
      f('DURATION', '位置跟踪有效期', duration, { hint: '秒' }),
    ];
  },

  /* ---------------- 0x0203 / 0x8203 人工确认报警 ---------------- */
  alarmConfirm(r) {
    const seq = r.u16();
    const type = r.u32();
    return [
      f('ALARM_SEQ', '报警消息流水号', seq),
      f('ALARM_TYPE', '人工确认报警类型', `0x${type.toString(16).padStart(8, '0').toUpperCase()}`, { hint: parseBits(type, ALARM_FLAGS).on.map((x) => x.name).join('、') || '无' }),
    ];
  },

  /* ---------------- 0x0301 事件报告 ---------------- */
  eventReport(r) {
    const id = r.u8();
    return [f('EVENT_ID', '事件 ID', id, { hint: dn(EVENT_TYPE, id, '未知事件') })];
  },

  questionResp(r) {
    const seq = r.u16();
    const flag = r.u8();
    const id = r.u8();
    return [
      f('ANS_SEQ', '应答流水号', seq),
      f('ANS_ID', '应答 ID', id),
      f('FLAG', '标志位', flag),
    ];
  },

  infoDemand(r) {
    const type = r.u8();
    const flag = r.u8();
    return [
      f('INFO_TYPE', '信息类型', type),
      f('ON_OFF', '开关', flag === 1 ? '1 - 取消' : '0 - 点播'),
    ];
  },

  /* ---------------- 电话类 ---------------- */
  phoneCallback(r) {
    const flag = r.u8();
    const phone = r.gbkz(r.left);
    return [
      f('CALL_FLAG', '标志', flag === 0 ? '0 - 普通通话' : '1 - 监听'),
      f('PHONE', '电话号码', phone),
    ];
  },

  phoneBook(r) {
    const flag = r.u8();
    const cnt = r.u8();
    const out = [
      f('SET_FLAG', '设置标志', flag === 0 ? '0 - 更新' : '1 - 删除'),
      f('CONTACT_CNT', '联系人总数', cnt),
    ];
    for (let i = 0; i < cnt && r.left > 0; i++) {
      const type = r.u8();
      const len = r.u8();
      const phone = r.gbkz(Math.min(len, r.left));
      const nameLen = r.left > 0 ? r.u8() : 0;
      const name = nameLen ? r.gbkz(Math.min(nameLen, r.left)) : '';
      out.push(f(`CONTACT[${i}]`, `联系人 ${i + 1}`, `${name || '(无名)'} / ${phone}`, { hint: `类型 ${type}` }));
    }
    return out;
  },

  route(r) {
    return [f('_NOTE', '说明', '设置路线（结构复杂，按原始字节展示）'), f('RAW', '原始数据', bytesToHex(r.rest()), { kind: 'raw', monospace: true })];
  },

  routeResp(r) {
    const seq = r.u16();
    const res = r.u8();
    return [
      f('RESP_SEQ', '应答流水号', seq),
      f('RESULT', '结果', `${res} - ${dn(RESULT_CODE, res, '未知')}`),
    ];
  },

  /* ---------------- 0x0500 / 0x8500 车辆控制 ---------------- */
  vehicleCtrl(r) {
    const type = r.u8();
    const T = { 1: '车门', 2: '驾驶席车窗', 3: '其他车窗', 4: '鸣笛', 5: '爆闪灯', 0x80: '断油', 0x81: '恢复油路', 0x82: '断电', 0x83: '恢复电路' };
    const out = [f('CTRL_TYPE', '控制类型', `${type} - ${dn(T, type, '未知')}`)];
    if (r.left >= 2) {
      const id = r.u16();
      out.push(f('CTRL_ID', '控制标志/ID', id, { hint: (id & 1) === 0 ? '0 - 打开/有效' : '1 - 关闭/无效' }));
      if (r.left >= 2) {
        const p = r.u16();
        out.push(f('CTRL_PARAM', '控制参数', p));
      }
    }
    return out;
  },

  /* ---------------- 升级 ---------------- */
  upgradeNotice(r) {
    const type = r.u8();
    const mfr = r.gbkz(5);
    const verLen = r.u8();
    const ver = r.gbkz(Math.min(verLen, r.left));
    const pkgLen = r.u32();
    const out = [
      f('UPG_TYPE', '升级类型', `${type} - ${dn(UPGRADE_TYPE, type, '未知')}`),
      f('MFR', '制造商 ID', mfr),
      f('VER', '版本号', ver, { hint: `${verLen} 字节` }),
      f('PKG_LEN', '升级包大小', pkgLen, { hint: '字节' }),
    ];
    return out;
  },

  upgradeResult(r) {
    const type = r.u8();
    const res = r.u8();
    return [
      f('UPG_TYPE', '升级类型', `${type} - ${dn(UPGRADE_TYPE, type, '未知')}`),
      f('RESULT', '升级结果', `${res} - ${dn(UPGRADE_RESULT, res, '未知')}`),
    ];
  },

  sendUpgrade(r) {
    const type = r.u8();
    const mfr = r.gbkz(5);
    const verLen = r.u8();
    const ver = r.gbkz(Math.min(verLen, r.left));
    const pkgLen = r.u32();
    const pkg = r.take(Math.min(pkgLen, r.left));
    return [
      f('UPG_TYPE', '升级类型', `${type} - ${dn(UPGRADE_TYPE, type, '未知')}`),
      f('MFR', '制造商 ID', mfr),
      f('VER', '版本号', ver),
      f('PKG_LEN', '升级包大小', pkgLen, { hint: '字节' }),
      f('PKG', '升级包数据', `${pkg.length} 字节（已省略）`, { kind: 'raw', monospace: true }),
    ];
  },

  /* ---------------- 行驶记录仪 ---------------- */
  drCmd(r) {
    const cmd = r.u8();
    const CMD = { 1: '采集驾驶员信息', 2: '采集事故疑点数据', 3: '采集行驶速度数据', 4: '采集疲劳驾驶记录', 0x80: '采集参数' };
    return [
      f('CMD', '命令字', `${cmd} - ${dn(CMD, cmd, '未知')}`),
      ...(r.left ? [f('PARAM', '命令参数', bytesToHex(r.rest()), { kind: 'raw', monospace: true })] : []),
    ];
  },

  drUp(r) {
    const cmd = r.u8();
    const data = r.rest();
    return [
      f('CMD', '命令字', cmd),
      f('DATA', '行驶记录数据', `${data.length} 字节`, { hex: bytesToHex(data), kind: 'raw' }),
    ];
  },

  drUpExt(r) {
    const seq = r.u16();
    const cmd = r.u8();
    const data = r.rest();
    return [
      f('RESP_SEQ', '应答流水号', seq),
      f('CMD', '命令字', cmd),
      f('DATA', '行驶记录数据', `${data.length} 字节`, { hex: bytesToHex(data), kind: 'raw' }),
    ];
  },

  drDown(r) {
    const seq = r.u16();
    const cmd = r.u8();
    const data = r.rest();
    return [
      f('SEQ', '流水号', seq),
      f('CMD', '命令字', cmd),
      f('DATA', '数据', `${data.length} 字节`, { hex: bytesToHex(data), kind: 'raw' }),
    ];
  },

  edriverOrder(r) {
    const type = r.u8();
    const data = r.rest();
    return [
      f('ORDER_TYPE', '数据类型', `${type} (0x${type.toString(16).padStart(2, '0')})`, { hint: dn({ 0: '电子运单', 1: '物流单据', 2: '货源信息' }, type, '未知') }),
      f('ORDER_DATA', '数据内容', `${data.length} 字节`, { hex: bytesToHex(data), kind: 'raw' }),
    ];
  },

  /* ---------------- 0x0702 驾驶员身份信息 ---------------- */
  driverInfo(r) {
    const flag = r.u8();
    const out = [f('STATE', '状态', flag, { hint: flag === 1 ? '1 - 从业资格证插入' : '0 - 从业资格证拔出' })];
    if (flag === 1) {
      if (r.left >= 1) {
        const t = r.u8();
        out.push(f('TIME', '时间', bcdTime6(t === 2 ? r.bcd(3) : null, t === 2 ? null : null)));
      }
      // 简化：读取姓名/证件号（GBK 变长，常见实现为长度前缀）
      const restBytes = r.rest();
      out.push(f('DRIVER_RAW', '驾驶员信息原文', bytesToHex(restBytes), { kind: 'raw', monospace: true }));
      const txt = decodeGBK(restBytes).replace(/\0/g, '');
      if (txt) out.push(f('DRIVER_TEXT', '驾驶员信息(GBK 尝试解码)', txt));
    }
    return out;
  },

  /* ---------------- 0x0705 CAN 总线数据 ---------------- */
  canBus(r) {
    const cnt = r.u16();
    const out = [f('CAN_CNT', 'CAN 总线数据项个数', cnt)];
    const receiveTime = r.bcd(5);
    out.push(f('RECV_TIME', 'CAN 总线数据接收时间', bcdTime5(receiveTime), { hint: `BCD: ${receiveTime}` }));
    for (let i = 0; i < cnt && r.left >= 10; i++) {
      const id = r.u32();
      const data = r.take(8);
      out.push(f(`CAN[${i}]`, `CAN 数据 ${i + 1}`, `ID=0x${id.toString(16).toUpperCase()} 数据=${bytesToHex(data)}`, { monospace: true }));
    }
    return out;
  },

  fuelData(r) {
    const out = [];
    while (r.left >= 1) {
      const len = r.u8();
      if (len === 0 || r.left < len) break;
      const item = r.take(len);
      out.push(f('FUEL', '油量/电量数据项', bytesToHex(item), { kind: 'raw', monospace: true }));
    }
    return out.length ? out : [f('_NOTE', '说明', '无数据')];
  },

  /* ---------------- 多媒体 ---------------- */
  mediaEvent(r) {
    const id = r.u32();
    const type = r.u8();
    const code = r.u8();
    const cnt = r.u8();
    return [
      f('MEDIA_ID', '多媒体数据 ID', id),
      f('MEDIA_TYPE', '多媒体类型', `${type} - ${dn(MEDIA_TYPE, type, '未知')}`),
      f('MEDIA_CODE', '多媒体格式编码', `${code} - ${dn({ 0: 'JPEG', 1: 'TIF', 2: 'MP3', 3: 'WAV', 4: 'WMV' }, code, '其他')}`),
      f('EVENT_CNT', '事件项个数', cnt),
    ];
  },

  mediaData(r) {
    const id = r.u32();
    const type = r.u8();
    const code = r.u8();
    const evtCnt = r.u8();
    const events = [];
    for (let i = 0; i < evtCnt && r.left >= 2; i++) events.push(r.u16());
    const out = [
      f('MEDIA_ID', '多媒体数据 ID', id),
      f('MEDIA_TYPE', '多媒体类型', `${type} - ${dn(MEDIA_TYPE, type, '未知')}`),
      f('MEDIA_CODE', '多媒体格式编码', `${code} - ${dn({ 0: 'JPEG', 1: 'TIF', 2: 'MP3', 3: 'WAV', 4: 'WMV' }, code, '其他')}`),
      f('EVENT_CNT', '事件项个数', evtCnt),
    ];
    if (events.length) out.push(f('EVENTS', '事件 ID 列表', events.map((e) => `${e}(${dn(MSG_808, e, '?')})`).join(', ')));
    // 位置信息
    if (r.left > 0 && r.left >= 28) {
      try {
        const fields = parseLocationBody(r, {});
        out.push({ _id: ++_uid, key: 'LOCATION', label: '位置信息汇报', kind: 'group', children: fields });
      } catch (e) { /* ignore */ }
    }
    if (r.left > 0) {
      const data = r.rest();
      out.push(f('MEDIA_DATA', '多媒体数据', `${data.length} 字节（二进制，已省略）`, { hex: bytesToHex(data.slice(0, 64)) + (data.length > 64 ? ' ...' : ''), kind: 'raw' }));
    }
    return out;
  },

  mediaDataResp(r) {
    const id = r.u32();
    const cnt = r.u8();
    const ids = [];
    for (let i = 0; i < cnt && r.left >= 4; i++) ids.push(r.u32());
    return [
      f('MEDIA_ID', '多媒体数据 ID', id),
      f('REQ_CNT', '要求重传包数', cnt),
      f('REQ_IDS', '重传包 ID 列表', ids.join(', ') || '(无)'),
    ];
  },

  cameraShot(r) {
    const ch = r.u8();
    const cmd = r.u16();
    const t = r.u16();
    const interval = r.u16();
    const save = r.u8();
    const res = r.u8();
    const mode = r.u8();
    const out = [
      f('CHANNEL', '通道 ID', ch),
      f('CMD', '拍摄命令', cmd === 0 ? '0 - 停止拍摄' : `${cmd} - 拍摄 ${cmd} 张`),
      f('DURATION', '拍摄间隔/录像时间', `${t} × 0.1 秒`, { hint: '0 表示按最小间隔连续拍照' }),
      f('SAVE_FLAG', '保存标志', `${save} - ${save === 0 ? '实时上传' : '保存'}`, { hint: save === 0 ? '0' : '1' }),
    ];
    if (r.left >= 1) out.push(f('RESOLUTION', '分辨率', `0x${r.u8().toString(16).padStart(2, '0').toUpperCase()}`));
    if (r.left >= 1) out.push(f('QUALITY', '图像/视频质量', r.u8(), { hint: '1~10' }));
    if (r.left >= 1) out.push(f('BRIGHTNESS', '亮度', r.u8()));
    if (r.left >= 1) out.push(f('CONTRAST', '对比度', r.u8()));
    if (r.left >= 1) out.push(f('SATURATION', '饱和度', r.u8()));
    if (r.left >= 1) out.push(f('CHROMA', '色度', r.u8()));
    return out;
  },

  recordStart(r) {
    const cmd = r.u8();
    const t = r.u16();
    const save = r.u8();
    const mode = r.u8();
    return [
      f('CMD', '命令字', cmd === 0 ? '0 - 停止录音' : '1 - 开始录音'),
      f('DURATION', '录音时长', `${t} 秒`),
      f('SAVE_FLAG', '保存标志', save === 0 ? '0 - 实时上传' : '1 - 保存'),
      f('AUDIO_MODE', '音频采样率', mode),
    ];
  },

  /* ---------------- 透传 ---------------- */
  passthrough(r) {
    const type = r.u8();
    const data = r.rest();
    const out = [
      f('PASS_TYPE', '透传消息类型', `0x${type.toString(16).padStart(2, '0').toUpperCase()}`),
      f('PASS_DATA', '透传数据', bytesToHex(data), { kind: 'raw', monospace: true, hint: `${data.length} 字节` }),
    ];
    const txt = safeText(data);
    if (txt) out.push(f('PASS_TEXT', '文本尝试解码', txt));
    return out;
  },

  passthroughCompress(r) {
    const len = r.u32();
    const data = r.rest();
    return [
      f('ORI_LEN', '原始数据长度', len, { hint: '字节（压缩前）' }),
      f('COMP_HEAD', '压缩数据头', bytesToHex(data.slice(0, 16))),
      f('COMP_LEN', '压缩数据长度', `${data.length} 字节`, { hint: '需解压后才能查看内容' }),
    ];
  },

  mediaFileNotice(r) {
    const ip = r.gbkz(32);
    const tcpPort = r.u16();
    const udpPort = r.u16();
    const ipLen = r.u8();
    const ip2 = r.gbkz(Math.min(ipLen, r.left));
    const pathLen = r.u8();
    const path = r.gbkz(Math.min(pathLen, r.left));
    return [
      f('ATTACH_IP', '附件服务器 IP', ip, { hint: '32 字节' }),
      f('TCP_PORT', '附件服务器 TCP 端口', tcpPort),
      f('UDP_PORT', '附件服务器 UDP 端口', udpPort),
      f('IP2', '备用 IP', ip2),
      f('PATH', '附件路径', path),
    ];
  },

  fileUploadDone(r) {
    const seq = r.u16();
    return [f('ACK_SEQ', '应答流水号', seq)];
  },

  adasNotice(r) {
    const type = r.u8();
    const ip = r.gbkz(32);
    const tcpPort = r.u16();
    const udpPort = r.u16();
    return [
      f('ALARM_TYPE', '报警类型', `0x${type.toString(16).padStart(2, '0').toUpperCase()}`, { hint: dn(ADAS_ALARM, type, '') || dn(DSM_ALARM, type, '') }),
      f('ATTACH_IP', '附件服务器 IP', ip),
      f('TCP_PORT', 'TCP 端口', tcpPort),
      f('UDP_PORT', 'UDP 端口', udpPort),
    ];
  },

  suAlarmAttach(r) {
    const seq = r.u16();
    const alarmId = r.bcd(r.left >= 32 ? 16 : r.left);
    return [
      f('MSG_SEQ', '消息流水号', seq),
      f('ALARM_ID', '报警 ID (BCD)', alarmId),
    ];
  },

  suFileInfo(r) {
    const seq = r.u16();
    const data = r.rest();
    return [
      f('MSG_SEQ', '消息流水号', seq),
      f('FILE_INFO', '文件信息', bytesToHex(data), { kind: 'raw', monospace: true }),
    ];
  },

  suFileDone(r) {
    const seq = r.u16();
    const data = r.rest();
    return [
      f('FILE_NAME', '文件名/信息', decodeGBK(data).replace(/\0/g, ''), { hex: bytesToHex(data) }),
    ];
  },

  /* ---------------- 文本/事件/提问下发 ---------------- */
  textMsg(r) {
    const flag = r.u8();
    const flags = parseBits(flag, [
      { bit: 0, name: '紧急', trueText: '紧急', falseText: '不紧急' },
      { bit: 1, name: '终端显示器显示', trueText: '终端显示', falseText: '终端不显示' },
      { bit: 2, name: '终端 TTS 播读', trueText: 'TTS 播读', falseText: '不播读' },
      { bit: 3, name: '广告屏显示', trueText: '广告屏显示', falseText: '不显示' },
      { bit: 4, name: '终端 LCD 显示', trueText: 'LCD 显示', falseText: '不显示' },
    ]);
    const type = r.u8();
    const text = r.gbkz(r.left);
    return [
      f('FLAG', '标志位', `0x${flag.toString(16).padStart(2, '0').toUpperCase()}`, { hint: flags.on.map((x) => x.name).join('、') || '无' }),
      f('TYPE', '文本类型', `${type} - ${dn({ 0: '通知', 1: '服务', 2: '其他' }, type, '未知')}`),
      f('TEXT', '文本内容', text),
    ];
  },

  eventSet(r) {
    const cnt = r.u8();
    const out = [f('EVENT_CNT', '事件总数', cnt)];
    for (let i = 0; i < cnt && r.left >= 2; i++) {
      const id = r.u8();
      const len = r.u8();
      const content = len ? r.gbkz(Math.min(len, r.left)) : '';
      out.push(f(`EVENT[${i}]`, `事件 ${i + 1}`, `ID=${id} 内容="${content}"`));
    }
    return out;
  },

  questionSend(r) {
    const flag = r.u8();
    const cnt = r.u8();
    const textLen = r.u8();
    const text = r.gbkz(Math.min(textLen, r.left));
    const out = [
      f('FLAG', '标志位', `0x${flag.toString(16).padStart(2, '0').toUpperCase()}`),
      f('ANSWER_CNT', '答案选项数量', cnt),
      f('QUESTION', '问题内容', text),
    ];
    for (let i = 0; i < cnt && r.left > 0; i++) {
      const id = r.u8();
      const len = r.u8();
      const c = r.gbkz(Math.min(len, r.left));
      out.push(f(`ANSWER[${i}]`, `答案 ${i + 1}`, `ID=${id} 内容="${c}"`));
    }
    return out;
  },

  infoMenu(r) {
    const type = r.u8();
    const cnt = r.u8();
    return [
      f('MENU_TYPE', '信息类型', type === 0 ? '0 - 删除所有' : '1 - 更新菜单'),
      f('INFO_CNT', '信息项数量', cnt),
    ];
  },

  infoService(r) {
    const type = r.u8();
    const len = r.u16();
    const content = r.gbkz(Math.min(len, r.left));
    return [
      f('INFO_TYPE', '信息类型', type),
      f('INFO_LEN', '信息长度', len),
      f('INFO_CONTENT', '信息内容', content),
    ];
  },

  /* ---------------- 区域/线路 ---------------- */
  circleArea(r) {
    const out = [];
    const cnt = r.u8();
    out.push(f('AREA_CNT', '区域总数', cnt));
    for (let i = 0; i < cnt && r.left >= 20; i++) {
      const id = r.u32();
      const attr = r.u16();
      const lat = r.u32();
      const lon = r.u32();
      const radius = r.u32();
      const start = bcdTime6(r.bcd(3), null, r.u32());
      const end = bcdTime6(r.bcd(3), null, r.u32());
      const maxSpeed = r.u16();
      const overTime = r.u8();
      const day = r.u16();
      out.push({
        _id: ++_uid, key: `AREA[${i}]`, label: `圆形区域 #${i + 1}`, kind: 'group',
        children: [
          f('AREA_ID', '区域 ID', id),
          f('ATTR', '区域属性', `0x${attr.toString(16).padStart(4, '0').toUpperCase()}`),
          f('CENTER', '中心点经纬度', `${fmtCoord(lat, lon)}`),
          f('RADIUS', '半径', `${radius} 米`),
          f('START_TIME', '起始时间', start),
          f('END_TIME', '结束时间', end),
          f('MAX_SPEED', '最高速度阈值', `${maxSpeed} km/h`),
          f('OVER_TIME', '超速持续时间', `${overTime} 秒`),
          f('DAY_FLAG', '时段/星期', day),
        ],
      });
    }
    return out;
  },

  rectArea(r) {
    const out = [];
    const cnt = r.u8();
    out.push(f('AREA_CNT', '区域总数', cnt));
    for (let i = 0; i < cnt && r.left >= 32; i++) {
      const id = r.u32();
      const attr = r.u16();
      const la1 = r.u32(); const lo1 = r.u32();
      const la2 = r.u32(); const lo2 = r.u32();
      out.push({
        _id: ++_uid, key: `AREA[${i}]`, label: `矩形区域 #${i + 1}`, kind: 'group',
        children: [
          f('AREA_ID', '区域 ID', id),
          f('ATTR', '区域属性', `0x${attr.toString(16).padStart(4, '0').toUpperCase()}`),
          f('TOP_LEFT', '左上点', fmtCoord(la1, lo1)),
          f('BOTTOM_RIGHT', '右下点', fmtCoord(la2, lo2)),
        ],
      });
    }
    return out;
  },

  polygonArea(r) {
    const out = [];
    const cnt = r.u8();
    out.push(f('AREA_CNT', '区域总数', cnt));
    for (let i = 0; i < cnt && r.left >= 6; i++) {
      const id = r.u32();
      const attr = r.u16();
      const ptCnt = r.u16();
      const pts = [];
      for (let j = 0; j < ptCnt && r.left >= 8; j++) {
        const lat = r.u32(); const lon = r.u32();
        pts.push(fmtCoord(lat, lon));
      }
      out.push({
        _id: ++_uid, key: `AREA[${i}]`, label: `多边形区域 #${i + 1}`, kind: 'group',
        children: [
          f('AREA_ID', '区域 ID', id),
          f('ATTR', '区域属性', `0x${attr.toString(16).padStart(4, '0').toUpperCase()}`),
          f('POINT_CNT', '顶点数量', ptCnt),
          f('POINTS', '顶点坐标', pts.join('  |  ')),
        ],
      });
    }
    return out;
  },

  delArea(r) {
    const cnt = r.u8();
    const ids = [];
    for (let i = 0; i < cnt && r.left >= 4; i++) ids.push(r.u32());
    return [
      f('DEL_CNT', '删除区域/线路数量', cnt),
      f('IDS', '区域/线路 ID 列表', ids.join(', ') || '(无)'),
    ];
  },

  queryAreaData(r) {
    const type = r.u8();
    const cnt = r.u8();
    const ids = [];
    for (let i = 0; i < cnt && r.left >= 4; i++) ids.push(r.u32());
    return [
      f('DATA_TYPE', '查询数据类型', `${type} - ${dn({ 1: '圆形区域', 2: '矩形区域', 3: '多边形区域', 4: '路线' }, type, '未知')}`),
      f('ID_CNT', '查询数量', cnt),
      f('IDS', '区域/线路 ID 列表', ids.join(', ') || '(无)'),
    ];
  },

  mediaSearch(r) {
    const type = r.u8();
    const ch = r.u8();
    const evt = r.u8();
    const start = bcdTime6(r.bcd(3), null, r.u32());
    const end = bcdTime6(r.bcd(3), null, r.u32());
    return [
      f('MEDIA_TYPE', '多媒体类型', `${type} - ${dn(MEDIA_TYPE, type, '未知')}`),
      f('CHANNEL', '通道 ID', ch),
      f('EVENT_FLAG', '事件项编码', `${evt} - ${dn({ 0: '所有', 1: '报警' }, evt, '未知')}`),
      f('START_TIME', '起始时间', start),
      f('END_TIME', '结束时间', end),
    ];
  },

  mediaUpload(r) {
    const type = r.u8();
    const ch = r.u8();
    const evt = r.u8();
    const start = bcdTime6(r.bcd(3), null, r.u32());
    const end = bcdTime6(r.bcd(3), null, r.u32());
    const del = r.u8();
    return [
      f('MEDIA_TYPE', '多媒体类型', `${type} - ${dn(MEDIA_TYPE, type, '未知')}`),
      f('CHANNEL', '通道 ID', ch),
      f('EVENT_FLAG', '事件项编码', evt),
      f('START_TIME', '起始时间', start),
      f('END_TIME', '结束时间', end),
      f('DEL_FLAG', '删除标志', del === 0 ? '0 - 保留' : '1 - 删除'),
    ];
  },

  mediaUploadOne(r) {
    const id = r.u32();
    const del = r.u8();
    return [
      f('MEDIA_ID', '多媒体 ID', id),
      f('DEL_FLAG', '删除标志', del === 0 ? '0 - 保留' : '1 - 删除'),
    ];
  },

  mediaSearchResp(r) {
    const seq = r.u16();
    const cnt = r.u16();
    const out = [
      f('RESP_SEQ', '应答流水号', seq),
      f('MEDIA_CNT', '多媒体数据总项数', cnt),
    ];
    for (let i = 0; i < cnt && r.left >= 4; i++) {
      const id = r.u32();
      const type = r.u8();
      const ch = r.u8();
      const evt = r.u8();
      const loc = r.left >= 28 ? parseLocationBody(r, {}).find((x) => x.key === 'LOC') : null;
      out.push(f(`MEDIA[${i}]`, `多媒体 ${i + 1}`, `ID=${id} 类型=${dn(MEDIA_TYPE, type, type)} 通道=${ch} 事件=${evt}`));
    }
    return out;
  },

  /* ---------------- 0x8100 终端注册应答 ---------------- */
  regResp8100(r) {
    const seq = r.u16();
    const res = r.u8();
    const code = r.left > 0 ? decodeGBK(r.rest()).replace(/\0/g, '') : '';
    return [
      f('RESP_SEQ', '应答流水号', seq, { hint: '对应终端注册消息的流水号' }),
      f('RESULT', '结果', `${res} - ${dn(REG_RESULT, res, '未知')}`),
      ...(code ? [f('AUTH_CODE', '鉴权码', code)] : []),
    ];
  },

  /* ---------------- 0x8103 设置终端参数 ---------------- */
  setParam8103(r) {
    const cnt = r.u8();
    const out = [f('PARAM_CNT', '参数总数', cnt)];
    for (let i = 0; i < cnt; i++) {
      if (r.left < 5) { out.push(f('_ERR', '数据不足', `声明 ${cnt} 个参数，实际解析 ${i} 个`)); break; }
      const id = r.u32();
      const len = r.u8();
      const data = r.take(Math.min(len, r.left));
      const name = paramName(id);
      const info = TERM_PARAMS[id] || {};
      const decoded = decodeParamValue(id, data, info);
      out.push({
        _id: ++_uid,
        key: `PARAM[${i}]`,
        label: `参数 #${i + 1}: ${name || `未知参数 0x${id.toString(16).toUpperCase()}`}`,
        value: decoded.value,
        hint: `ID=0x${id.toString(16).padStart(8, '0').toUpperCase()} 长度=${len} 字节${info.unit ? ' 单位=' + info.unit : ''}`,
        hex: bytesToHex(data),
        kind: decoded.kind || undefined,
      });
    }
    return out;
  },

  _unused() { return []; },
};

/* =====================================================================
 * 位置信息汇报 消息体解析（0x0200 / 0x0704 复用）
 * ===================================================================== */
function parseLocationBody(r, ctx) {
  const alarm = r.u32();
  const status = r.u32();
  const latRaw = r.u32();
  const lonRaw = r.u32();
  const alt = r.u16();
  const speedRaw = r.u16();
  const dirRaw = r.u16();
  const time = r.bcd(6);

  // 2019 版位置附加字段（按位标志判定是否存在，避免误解析）
  let provId = null, cityId = null, plateColor = null, plateNo = null;
  if ((alarm >>> 29) & 1) provId = r.u16();
  if ((alarm >>> 30) & 1) cityId = r.u16();
  if ((alarm >>> 31) & 1) {
    plateColor = r.u8();
    plateNo = r.gbkz(r.left);
  }

  const alarmBits = parseBits(alarm, ALARM_FLAGS);
  const statusBits = parseBits(status, STATUS_FLAGS);

  const out = [];

  out.push({
    _id: ++_uid,
    key: 'ALARM_FLAG',
    label: '报警标志',
    value: `0x${alarm.toString(16).padStart(8, '0').toUpperCase()} (${alarm >>> 0})`,
    kind: 'bits',
    bits: alarmBits.all.filter((b) => ALARM_FLAGS.some((a) => a.bit === b.bit)),
    onList: alarmBits.on.map((x) => x.name),
  });

  out.push({
    _id: ++_uid,
    key: 'STATUS',
    label: '状态',
    value: `0x${status.toString(16).padStart(8, '0').toUpperCase()} (${status >>> 0})`,
    kind: 'bits',
    bits: statusBits.all,
    onList: statusBits.on.map((x) => x.label),
  });

  const lat = latRaw / 1e6;
  const lon = lonRaw / 1e6;
  const latDir = (status >> 2) & 1 ? '北纬 (N)' : '南纬 (S)';
  const lonDir = (status >> 3) & 1 ? '东经 (E)' : '西经 (W)';
  const encryptedLL = ((status >> 5) & 1) === 1;

  const latText = latRaw === 0 ? '0°（无效/无定位）' : `${lat.toFixed(6)}°  ${latDir}`;
  const lonText = lonRaw === 0 ? '0°（无效/无定位）' : `${lon.toFixed(6)}°  ${lonDir}`;

  // 部分终端不上报方向位：bit2/bit3=0 声明南纬/西经，但数值明显落在
  // 北半球东经范围（中国境内），此时应理解为北纬/东经
  const dirBitMissing = latRaw !== 0 &&
    ((status >> 2) & 1) === 0 && ((status >> 3) & 1) === 0 &&
    lat > 3 && lat < 54 && lon > 73 && lon < 136;

  out.push({
    _id: ++_uid, key: 'LOC', label: '纬经度', kind: 'group',
    children: [
      f('LAT', '纬度', latText, {
        hint: `原始值 ${latRaw}（百万分之一度）` + (dirBitMissing ? ' ⚠ 方向位未置，实际应为北纬' : ''),
      }),
      f('LON', '经度', lonText, {
        hint: `原始值 ${lonRaw}（百万分之一度）` + (dirBitMissing ? ' ⚠ 方向位未置，实际应为东经' : ''),
      }),
      f('COORD', '常用坐标表示', `${lat.toFixed(6)},${lon.toFixed(6)}`, { hint: '可直接粘贴到地图搜索' }),
      ...(dirBitMissing ? [f('_DIR_NOTE', '提示', '状态 bit2 / bit3 = 0（按规范声明南纬、西经），但经纬度落在北半球、东经常用范围内。部分终端不上报方向位，实际应按北纬 / 东经理解，解析时可直接采用上面的数值。')] : []),
      ...(encryptedLL ? [f('_ENC', '注意', '状态 bit5=1，经纬度已加密，以上数值为密文')] : []),
    ],
  });

  out.push(f('ALTITUDE', '高程', alt === 0xffff ? '65535（无效）' : `${alt} 米`, { hint: '海拔高度，0xFFFF 表示无效' }));
  out.push(f('SPEED', '速度', speedRaw === 0xffff ? '0xFFFF（无效）' : `${(speedRaw / 10).toFixed(1)} km/h`, { hint: `原始值 ${speedRaw}，单位 1/10 km/h` }));
  out.push(f('DIRECTION', '方向', `${dirRaw}°`, { hint: '0=正北，顺时针 0~359' }));
  out.push(f('TIME', 'GPS 时间', bcdTime6(time), { hint: `BCD: ${time}` }));

  // ---- 2019 版位置附加字段 ----
  if (provId !== null) {
    out.push(f('PROVINCE_ID', '省域 ID', `${provId}`, { hint: dn(PROVINCES, provId, '未知省份') }));
  }
  if (cityId !== null) {
    out.push(f('CITY_ID', '市域 ID', `${cityId}`));
  }
  if (plateColor !== null) {
    out.push(f('PLATE_COLOR', '车牌颜色', `${plateColor} - ${dn(PLATE_COLOR, plateColor, dn(COLOR_LABEL, plateColor, '未知'))}`));
    out.push(f('PLATE_NO', '车牌号', plateNo || '(空)', { hint: 'GBK 变长' }));
  }

  // ---- 附加信息 ----
  if (r.left > 0) {
    const extras = [];
    while (r.left >= 2) {
      // 先记录位置：若声明长度超出剩余字节，需要回退游标，
      // 否则会把这两字节"吃掉"，导致后续的"未解析剩余字节"起点偏移 2
      const mark = r.pos;
      const id = r.u8();
      const len = r.u8();
      if (r.left < len) {
        r.pos = mark;
        extras.push(f('_ERR', '附加项数据不足',
          `ID=0x${id.toString(16).toUpperCase().padStart(2, '0')} 声明 ${len} 字节，实际仅剩 ${r.left} 字节；已停止解析，其后字节按原始数据展示`,
          { kind: 'error' }));
        break;
      }
      const data = r.take(len);
      const def = LOCATION_EXTRAS[id];
      const parsed = parseExtraItem(id, data, def);
      extras.push({
        _id: ++_uid,
        key: `EXTRA_0x${id.toString(16).padStart(2, '0').toUpperCase()}`,
        label: `${def ? def.name : '未知附加项'} (0x${id.toString(16).padStart(2, '0').toUpperCase()})`,
        value: parsed.value,
        hint: `长度 ${len} 字节${def && def.unit ? ' 单位=' + def.unit : ''}`,
        hex: bytesToHex(data),
        kind: parsed.kind,
        children: parsed.children,
      });
    }
    out.push({ _id: ++_uid, key: 'EXTRAS', label: `附加信息项（${extras.length} 项）`, kind: 'group', children: extras });
  }

  return out;
}

/* ==================== 附加信息项具体解析 ==================== */
function parseExtraItem(id, data, def) {
  const rr = new Reader(data);
  const type = def ? def.type : 'raw';
  try {
    switch (type) {
      case 'u8': return { value: String(rr.u8()) };
      case 'u8Signed': return { value: `${rr.i8()} dBm` };
      case 'u16': return { value: String(rr.u16()) };
      case 'u32': return { value: String(rr.u32()) };
      case 'temp': {
        const t = rr.u16();
        return { value: `0x${t.toString(16).padStart(4, '0').toUpperCase()}（温度计型号 ${(t >> 8) & 0xff}，温度 ${t & 0xff} ℃）` };
      }
      case 'netSignal': {
        const b = rr.u8();
        return { value: `信号强度 ${b}，网络类型 ${dn(NET_TYPE, (b >> 5) & 0x07, '未知')}` };
      }
      case 'overspeed': {
        const locType = rr.u8();
        if (locType === 0) return { value: '0 - 无特定位置' };
        if (locType === 1) { const aid = rr.u32(); return { value: `圆形区域报警，区域 ID=${aid}` }; }
        if (locType === 2) { const aid = rr.u32(); return { value: `矩形区域报警，区域 ID=${aid}` }; }
        if (locType === 3) { const aid = rr.u32(); return { value: `多边形区域报警，区域 ID=${aid}` }; }
        if (locType === 4) {
          const road = rr.u32(); const lat = rr.u32(); const lon = rr.u32();
          const drive = rr.u8(); const limit = rr.u8(); const over = rr.u8();
          return {
            value: `路段报警 道路ID=${road} 位置=${fmtCoord(lat, lon)} 行驶 ${drive} 分 限速 ${limit} km/h 超速 ${over} km/h`,
          };
        }
        return { value: `类型 ${locType}` };
      }
      case 'areaAlarm': {
        const t = rr.u8();
        const aid = rr.u32();
        const dir = rr.u8();
        return { value: `${dn({ 1: '进区域', 2: '出区域', 3: '进路线', 4: '出路线' }, t, '未知')} ID=${aid} 方向=${dir === 0 ? '0-进' : '1-出'}` };
      }
      case 'routeTime': {
        const road = rr.u32();
        const drive = rr.u8();
        const limit = rr.u8();
        const t = rr.u8();
        return { value: `道路ID=${road} 行驶时间 ${drive} 分，标准时间 ${limit} 分，${dn({ 0: '正常', 1: '不足', 2: '过长' }, t, '未知')}` };
      }
      case 'io': {
        const b = rr.u8();
        return { value: `深度休眠=${b & 1}，休眠=${(b >> 1) & 1}，保留=${(b >> 2) & 0x3f}` };
      }
      case 'analog': {
        const kids = [];
        let idx = 0;
        while (rr.left >= 2) {
          const v = rr.u16();
          kids.push(f(`A${idx}`, `通道 ${idx + 1}`, String(v)));
          idx++;
        }
        return { value: `${kids.length} 路模拟量`, children: kids };
      }
      case 'adas': {
        const kids = [
          f('ADAS_ID', '报警 ID', String(rr.u32())),
          f('ADAS_FLAG', '报警标志', String(rr.u32())),
        ];
        const t = rr.u8();
        kids.push(f('ALARM_TYPE', '报警类型', `0x${t.toString(16).padStart(2, '0').toUpperCase()} - ${dn(ADAS_ALARM, t, '未知')}`));
        if (rr.left >= 1) kids.push(f('ALARM_LEVEL', '报警级别', String(rr.u8())));
        if (rr.left >= 1) kids.push(f('FRONT_CAR_DIST', '前车距离', `${rr.u8()} (0x10 单位)`));
        if (rr.left >= 1) kids.push(f('DEVIATION', '偏离类型', String(rr.u8())));
        if (rr.left >= 1) kids.push(f('ROAD_SIGN', '道路标志识别类型', String(rr.u8())));
        if (rr.left >= 1) kids.push(f('SPEED', '车速', `${(rr.u8() || 0)} km/h`));
        const extra = rr.rest();
        if (extra.length) kids.push(f('EXTRA', '扩展数据', bytesToHex(extra), { monospace: true }));
        return { value: `${dn(ADAS_ALARM, kids[2].value.split(' - ')[0] ? parseInt(kids[2].value.split(' - ')[0], 16) : 0, 'ADAS 报警')}`, children: kids };
      }
      case 'dsm': {
        const kids = [
          f('DSM_ID', '报警 ID', String(rr.u32())),
          f('DSM_FLAG', '报警标志', String(rr.u32())),
        ];
        const t = rr.u8();
        kids.push(f('ALARM_TYPE', '报警类型', `0x${t.toString(16).padStart(2, '0').toUpperCase()} - ${dn(DSM_ALARM, t, '未知')}`));
        if (rr.left >= 1) kids.push(f('ALARM_LEVEL', '报警级别', String(rr.u8())));
        if (rr.left >= 1) {
          const b = rr.u8();
          kids.push(f('DRIVER_FLAG', '驾驶员疲劳程度/状态', `${b} (0x${b.toString(16).padStart(2, '0').toUpperCase()})`));
        }
        const extra = rr.rest();
        if (extra.length) kids.push(f('EXTRA', '扩展数据', bytesToHex(extra), { monospace: true }));
        return { value: dn(DSM_ALARM, t, 'DSM 报警'), children: kids };
      }
      case 'adasActive': {
        // 主动安全 0x64 ADAS（山东团体标准 表4-15）
        const kids = [f('ALARM_ID', '报警 ID', String(rr.u32()))];
        const flag = rr.u8();
        kids.push(f('FLAG', '标志状态', `0x${flag.toString(16).padStart(2, '0').toUpperCase()}${dn(ADAS_ACTIVE_FLAG, flag, '') ? ' - ' + ADAS_ACTIVE_FLAG[flag] : ''}`));
        const t = rr.u8();
        kids.push(f('ALARM_TYPE', '报警/事件类型', `0x${t.toString(16).padStart(2, '0').toUpperCase()}${dn(ADAS_ALARM_ACTIVE, t, '') ? ' - ' + ADAS_ALARM_ACTIVE[t] : ''}`));
        const lv = rr.u8();
        kids.push(f('ALARM_LEVEL', '报警级别', `0x${lv.toString(16).padStart(2, '0').toUpperCase()}${dn(ADAS_ACTIVE_LEVEL, lv, '') ? ' - ' + ADAS_ACTIVE_LEVEL[lv] : ''}`));
        if (rr.left >= 1) kids.push(f('FRONT_SPEED', '前车车速', `${rr.u8()} km/h`, { hint: '仅前向碰撞/车道偏离有效' }));
        if (rr.left >= 1) kids.push(f('FRONT_DIST', '前车/行人距离', String(rr.u8()), { hint: '0x10 单位，仅前向碰撞/车道偏离/行人碰撞有效' }));
        const dv = rr.left >= 1 ? rr.u8() : -1;
        if (dv >= 0) kids.push(f('DEVIATION', '偏离类型', `0x${dv.toString(16).padStart(2, '0').toUpperCase()}${dn(ADAS_ACTIVE_DEVIATION, dv, '') ? ' - ' + ADAS_ACTIVE_DEVIATION[dv] : ''}`, { hint: '仅车道偏离有效' }));
        const rs = rr.left >= 1 ? rr.u8() : -1;
        if (rs >= 0) kids.push(f('ROAD_SIGN_TYPE', '道路标志识别类型', `0x${rs.toString(16).padStart(2, '0').toUpperCase()}${dn(ADAS_ACTIVE_ROADSIGN, rs, '') ? ' - ' + ADAS_ACTIVE_ROADSIGN[rs] : ''}`));
        if (rr.left >= 1) kids.push(f('ROAD_SIGN_DATA', '道路标志识别数据', String(rr.u8())));
        const extra = rr.rest();
        if (extra.length) kids.push(f('EXTRA', '扩展数据', bytesToHex(extra), { monospace: true }));
        return { value: dn(ADAS_ALARM_ACTIVE, t, 'ADAS 报警'), children: kids };
      }
      case 'dsmActive': {
        // 主动安全 0x65 DSM（山东团体标准 表4-17）
        const kids = [f('ALARM_ID', '报警 ID', String(rr.u32()))];
        const flag = rr.u8();
        kids.push(f('FLAG', '标志状态', `0x${flag.toString(16).padStart(2, '0').toUpperCase()}${dn(ADAS_ACTIVE_FLAG, flag, '') ? ' - ' + ADAS_ACTIVE_FLAG[flag] : ''}`));
        const t = rr.u8();
        kids.push(f('ALARM_TYPE', '报警/事件类型', `0x${t.toString(16).padStart(2, '0').toUpperCase()}${dn(DSM_ALARM_ACTIVE, t, '') ? ' - ' + DSM_ALARM_ACTIVE[t] : ''}`));
        const lv = rr.u8();
        kids.push(f('ALARM_LEVEL', '报警级别', `0x${lv.toString(16).padStart(2, '0').toUpperCase()}${dn(ADAS_ACTIVE_LEVEL, lv, '') ? ' - ' + ADAS_ACTIVE_LEVEL[lv] : ''}`));
        if (rr.left >= 1) kids.push(f('FATIGUE', '疲劳程度', String(rr.u8()), { hint: '1-10，越大越疲劳，仅疲劳驾驶有效' }));
        if (rr.left >= 4) kids.push(f('RESERVED', '预留', bytesToHex(rr.take(4)), { monospace: true }));
        if (rr.left >= 1) kids.push(f('SPEED', '车速', `${rr.u8()} km/h`));
        if (rr.left >= 2) kids.push(f('ALTITUDE', '高程', `${rr.u16()} 米`));
        if (rr.left >= 4) {
          const lat = rr.u32(); const lon = rr.u32();
          kids.push(f('LAT', '纬度', fmtCoord(lat, lon).split('  ')[0]));
          kids.push(f('LON', '经度', fmtCoord(lon, 0).split('  ')[0]));
        }
        if (rr.left >= 6) {
          const b = rr.take(6);
          const hx = Array.from(b).map((x) => x.toString(16).padStart(2, '0')).join('');
          const m = hx.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
          if (m) kids.push(f('TIME', '日期时间', `20${m[1]}-${m[2]}-${m[3]} ${m[4]}:${m[5]}:${m[6]}`, { hint: 'BCD[6] GMT+8' }));
          else kids.push(f('TIME', '日期时间', hx, { monospace: true }));
        }
        if (rr.left >= 2) kids.push(f('VEH_STATE', '车辆状态', `0x${rr.u16().toString(16).padStart(4, '0').toUpperCase()}`, { hint: '按标准表' }));
        if (rr.left >= 16) kids.push(f('ALARM_MARK', '报警标识号', bytesToHex(rr.take(16)), { monospace: true, hint: '报警识别号' }));
        const extra = rr.rest();
        if (extra.length) kids.push(f('EXTRA', '扩展数据', bytesToHex(extra), { monospace: true }));
        return { value: dn(DSM_ALARM_ACTIVE, t, 'DSM 报警'), children: kids };
      }
      case 'bsdActive': {
        // 主动安全 0x67 BSD（山东团体标准 表4-20，通用解析）
        const kids = [f('ALARM_ID', '报警 ID', String(rr.u32()))];
        if (rr.left >= 1) kids.push(f('ALARM_TYPE', '报警/事件类型', `0x${rr.u8().toString(16).padStart(2, '0').toUpperCase()}`));
        if (rr.left >= 1) kids.push(f('ALARM_LEVEL', '报警级别', `0x${rr.u8().toString(16).padStart(2, '0').toUpperCase()}`));
        const extra = rr.rest();
        if (extra.length) kids.push(f('EXTRA', '扩展数据', bytesToHex(extra), { monospace: true, hint: '盲区监测字段按标准表4-20，此处通用展示' }));
        return { value: 'BSD 报警', children: kids };
      }
      case 'tpms':
      case 'tpmsFull':
      case 'tpmsActive': {
        const kids = [];
        const label = ['左前', '右前', '左后', '右后', '左中', '右中', '备胎', '备用2'];
        let i = 0;
        while (rr.left >= 2 && i < 8) {
          const v = rr.u16();
          kids.push(f(`TPMS${i}`, `${label[i] || '轮位' + (i + 1)} 胎压`, `${v} (0x${v.toString(16).padStart(4, '0').toUpperCase()})`, { hint: `${(v & 0xff)} = 状态, ${(v >> 8) & 0xff} = 压力值` }));
          i++;
        }
        return { value: `${kids.length} 个轮位数据`, children: kids };
      }
      case 'obd': {
        const kids = [];
        while (rr.left >= 2) {
          const pid = rr.u8();
          const ln = rr.u8();
          const v = rr.take(Math.min(ln, rr.left));
          kids.push(f(`OBD${pid}`, `PID 0x${pid.toString(16).padStart(2, '0').toUpperCase()}`, `${bytesToHex(v)} (${v.length} 字节)`));
        }
        return { value: `${kids.length} 项 OBD 数据`, children: kids };
      }
      case 'obdDiag': {
        const kids = [];
        const cnt = rr.left >= 1 ? rr.u8() : 0;
        for (let i = 0; i < cnt && rr.left >= 3; i++) {
          const code = rr.u16();
          const st = rr.u8();
          kids.push(f(`DTC${i}`, `故障码 ${i + 1}`, `0x${code.toString(16).padStart(4, '0').toUpperCase()} 状态 ${st}`));
        }
        return { value: `${cnt} 个故障码`, children: kids };
      }
      case 'satSnr': {
        const kids = [];
        const cnt = rr.left >= 1 ? rr.u8() : 0;
        for (let i = 0; i < cnt && rr.left >= 2; i++) {
          const snr = rr.u8();
          const id = rr.u8();
          kids.push(f(`SAT${i}`, `卫星 ${i + 1}`, `信噪比 ${snr}，卫星编号 ${id}`));
        }
        return { value: `${cnt} 颗卫星`, children: kids };
      }
      case 'aiTime': {
        const kids = [];
        while (rr.left >= 4) kids.push(String(rr.u32()));
        return { value: kids.join(', ') || '(空)' };
      }
      case 'suMedia': {
        return { value: bytesToHex(data), kind: 'raw' };
      }
      case 'raw':
      default: {
        // 智能猜测
        if (data.length === 1) return { value: String(data[0]) };
        if (data.length === 2) return { value: String((data[0] << 8) | data[1]) };
        if (data.length === 4) return { value: String(((data[0] << 24 >>> 0) + (data[1] << 16) + (data[2] << 8) + data[3]) >>> 0) };
        const txt = safeText(data);
        return { value: txt ? `${bytesToHex(data)}  ("${txt}")` : bytesToHex(data), kind: 'raw' };
      }
    }
  } catch (e) {
    return { value: `解析失败：${e.message}`, kind: 'error' };
  }
}

/* =====================================================================
 * 809 消息体解析器
 * ===================================================================== */
function parseBody809(type, r, ctx) {
  const fn = BODY_809[type];
  if (!fn) return [{ _id: ++_uid, key: '_RAW', label: '原始数据', value: bytesToHex(r.rest()), kind: 'raw', monospace: true }];
  return fn(r, ctx);
}

/* =====================================================================
 * 809 平台间数据交换子业务解析
 * 依据《重点营运车辆联网联控系统动态监控报警信息平台间数据交换技术规范 V2
 * （服务商企业监控平台）》。统一公共头：
 *   VEHICLE_NO(21 GBK) + VEHICLE_COLOR(1) + DATA_TYPE(2) + DATA_LENGTH(4)
 * ===================================================================== */
/** 8 字节时间：优先 6 字节 BCD (YYMMDDHHMMSS)+2 字节；其次 8 字节 BCD (YYYYMMDDHHMMSS)；再低位 u32 秒(Unix)；否则原始 hex */
function readTime8(r, key, label, hint) {
  const raw = r.take(8);
  const hx = Array.from(raw).map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  const pad = (n) => String(n).padStart(2, '0');
  // 6 字节 BCD：YYMMDDHHMMSS（809 time_t 惯例，后 2 字节多为 0/毫秒）
  const m6 = hx.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
  if (m6) {
    const yy = +m6[1], mm = +m6[2], dd = +m6[3], hh = +m6[4], mi = +m6[5], ss = +m6[6];
    if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31 && hh <= 23 && mi <= 59 && ss <= 59) {
      return f(key, label, `${2000 + yy}-${pad(mm)}-${pad(dd)} ${pad(hh)}:${pad(mi)}:${pad(ss)}`, { hint: hint || '8 字节 time_t：6 字节 BCD (YYMMDDHHMMSS) + 2 字节' });
    }
  }
  // 8 字节 BCD：YYYYMMDDHHMMSS + 2 位
  const m8 = hx.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (m8) {
    const y = +m8[1], mm = +m8[2], dd = +m8[3], hh = +m8[4], mi = +m8[5], ss = +m8[6];
    if (y >= 2000 && y <= 2100 && mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31 && hh <= 23 && mi <= 59 && ss <= 59) {
      return f(key, label, `${y}-${pad(mm)}-${pad(dd)} ${pad(hh)}:${pad(mi)}:${pad(ss)}`, { hint: hint || '8 字节 BCD (YYYYMMDDHHMMSS)' });
    }
  }
  const u = ((raw[4] << 24) >>> 0) + (raw[5] << 16) + (raw[6] << 8) + raw[7];
  if (u > 1e8 && u < 3e9) {
    const d = new Date(u * 1000);
    if (!Number.isNaN(d.getTime())) return f(key, label, d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC', { hint: '低位 u32 秒 (Unix)' });
  }
  return f(key, label, hx, { kind: 'raw', hint: '非标准时间，按原始 hex' });
}

/** 子业务业务字段解析器：key=子业务类型，fn(r, out) 追加字段 */
const _SUB_PARSERS = {
  0x1201(r, o) {
    o.push(f('PLATFORM_ID', '平台唯一编码', r.gbkz(11), { hint: '11 字节' }));
    o.push(f('PRODUCER_ID', '车载终端厂商编码', r.gbkz(11), { hint: '11 字节' }));
    o.push(f('TERMINAL_MODEL', '车载终端型号', r.gbkz(30), { hint: '30 字节，不足补 0' }));
    o.push(f('IMEI', '车载终端 IMEI', r.gbkz(15), { hint: '15 字节' }));
    o.push(f('TERMINAL_ID', '车载终端编号', r.gbkz(30), { hint: '30 字节，不足补 0' }));
    o.push(f('SIM_CODE', '终端 SIM 卡号', r.gbkz(13), { hint: '13 字节，不足前补 0' }));
  },
  0x120C(r, o) {
    o.push(f('DRIVER_NAME', '驾驶员姓名', r.gbkz(100), { hint: '100 字节' }));
    o.push(f('DRIVER_ID', '驾驶证编号', r.gbkz(20), { hint: '20 字节' }));
    o.push(f('LICENCE', '从业资格证号', r.gbkz(20), { hint: '20 字节' }));
    o.push(f('ORG_NAME', '发证机构名称', r.gbkz(200), { hint: '200 字节' }));
    o.push(readTime8(r, 'VALID_DATE', '证件有效期', '8 字节 time_t，时分秒置 0'));
    const ct = r.u8();
    const CT = { 0x01: '插入 IC 卡', 0x02: '拔出 IC 卡', 0x03: '驾驶员身份识别' };
    o.push(f('COLLECT_TYPE', '采集方式', `0x${ct.toString(16).padStart(2, '0').toUpperCase()}${dn(CT, ct, '') ? ' - ' + CT[ct] : ''}`));
    o.push(readTime8(r, 'COLLECT_DATE', '采集时间'));
  },
  0x1402(r, o) {
    o.push(f('PLATFORM_ID', '发起报警平台编码', r.gbkz(11), { hint: '11 字节' }));
    const wt = r.u16();
    o.push(f('WARN_TYPE', '报警类型', `0x${wt.toString(16).padStart(4, '0').toUpperCase()}${dn(ALARM_WARN_TYPE, wt, '') ? ' - ' + ALARM_WARN_TYPE[wt] : ''}`, { hint: '见《规范 V2》附录报警类型明细' }));
    o.push(readTime8(r, 'WARN_TIME', '报警时间'));
    o.push(readTime8(r, 'START_TIME', '事件开始时间'));
    o.push(readTime8(r, 'END_TIME', '事件结束时间'));
    o.push(f('VEHICLE_NO_2', '车牌号码', r.gbkz(21), { hint: '21 字节 GBK' }));
    const c2 = r.u8();
    o.push(f('VEHICLE_COLOR_2', '车牌颜色', `0x${c2.toString(16).padStart(2, '0').toUpperCase()}${dn(PLATE_COLOR, c2, '') ? ' - ' + PLATE_COLOR[c2] : ''}`));
    o.push(f('TARGET_PLATFORM_ID', '被报警平台编码', r.gbkz(11), { hint: '11 字节' }));
    o.push(f('DRV_LINE_ID', '线路 ID', r.u32(), { hint: 'JT/T 808 0x8606 线路 ID' }));
    o.push(f('ALARM_ID', '报警信息唯一编码', r.gbkz(34), { hint: '省份_手机号_类型_时间戳' }));
    const infoLen = r.u32();
    const info = r.take(Math.min(infoLen, r.left));
    const infoTxt = decodeGBK(info).replace(/\0+/g, '');
    o.push(f('INFO_LENGTH', '报警信息长度', infoLen));
    o.push(f('INFO_CONTENT', '报警信息内容', `${info.length} 字节${infoTxt ? '  "' + infoTxt + '"' : ''}`, { hex: bytesToHex(info), kind: infoTxt ? 'text' : 'raw' }));
    o.push(f('START_LAT', '报警开始纬度', (r.u32() / 1e6).toFixed(6), { hint: '1e-6 度' }));
    o.push(f('START_LON', '报警开始经度', (r.u32() / 1e6).toFixed(6), { hint: '1e-6 度' }));
    o.push(f('END_LAT', '报警结束纬度', (r.u32() / 1e6).toFixed(6), { hint: '1e-6 度' }));
    o.push(f('END_LON', '报警结束经度', (r.u32() / 1e6).toFixed(6), { hint: '1e-6 度' }));
    o.push(f('DRIVER', '驾驶员姓名', r.gbkz(100), { hint: '100 字节' }));
    o.push(f('DRIVER_NO', '从业资格证号', r.gbkz(20), { hint: '20 字节' }));
  },
  0x1412(r, o) {
    const st = r.u16();
    o.push(f('SOURCE_DATA_TYPE', '报警源子业务类型', `0x${st.toString(16).padStart(4, '0').toUpperCase()}${dn(SUBIZ_809, st, '') ? ' - ' + SUBIZ_809[st] : ''}`));
    o.push(f('VEHICLE_NO_2', '车牌号码', r.gbkz(21), { hint: '21 字节 GBK' }));
    const c2 = r.u8();
    o.push(f('VEHICLE_COLOR_2', '车牌颜色', `0x${c2.toString(16).padStart(2, '0').toUpperCase()}${dn(PLATE_COLOR, c2, '') ? ' - ' + PLATE_COLOR[c2] : ''}`));
    o.push(f('ALARM_ID', '报警唯一编码', r.gbkz(34)));
    const res = r.u8();
    o.push(f('RESULT', '处理结果', `0x${res.toString(16).padStart(2, '0').toUpperCase()} - ${dn(SUBIZ_ALARM_RESULT, res, '未知')}`));
    o.push(readTime8(r, 'DEAL_TIME', '报警处理时间'));
    o.push(f('SPECIFICATION', '处理情况说明', r.gbkz(500), { hint: '500 字节' }));
  },
  0x9401(r, o) {
    o.push(f('PLATFORM_ID', '发起报警平台编码', r.gbkz(11), { hint: '11 字节' }));
    o.push(readTime8(r, 'SOUCE_WARN_TIME', '报警时间'));
    const dt = r.u16();
    o.push(f('DATA_TYPE', '报警消息源子业务类型', `0x${dt.toString(16).padStart(4, '0').toUpperCase()}${dn(SUBIZ_809, dt, '') ? ' - ' + SUBIZ_809[dt] : ''}`));
    o.push(f('ALARM_ID', '报警信息唯一编码', r.gbkz(34)));
    o.push(readTime8(r, 'SUPERVISION_ENDTIME', '督办截止时间'));
    const lv = r.u8();
    o.push(f('SUPERVISION_LEVEL', '督办级别', `0x${lv.toString(16).padStart(2, '0').toUpperCase()}${lv === 0 ? ' - 紧急' : lv === 1 ? ' - 一般' : ''}`));
    o.push(f('SUPERVISOR', '督办人', r.gbkz(16)));
    o.push(f('SUPERVISOR_TEL', '督办联系电话', r.gbkz(20)));
    o.push(f('SUPERVISOR_EMAIL', '督办电子邮件', r.gbkz(32)));
  },
  0x1401(r, o) {
    o.push(f('ALARM_ID', '报警信息唯一编码', r.gbkz(34)));
    const res = r.u8();
    o.push(f('RESULT', '处理结果', `0x${res.toString(16).padStart(2, '0').toUpperCase()} - ${dn(SUBIZ_ALARM_RESULT, res, '未知')}`));
  },
};

/** 解析一个 809 子业务数据体（含统一公共头 VEHICLE_NO+VEHICLE_COLOR+DATA_TYPE+DATA_LENGTH） */
function parse809SubBiz(r) {
  const out = [];
  const plate = r.gbkz(21);
  out.push(f('VEHICLE_NO', '车牌号', plate || '(空)', { hint: '21 字节 GBK' }));
  const color = r.u8();
  out.push(f('VEHICLE_COLOR', '车牌颜色', `0x${color.toString(16).padStart(2, '0').toUpperCase()}${dn(PLATE_COLOR, color, '') ? ' - ' + PLATE_COLOR[color] : ''}`, { hint: 'JT/T 697.7 车牌颜色' }));
  const type = r.u16();
  out.push(f('DATA_TYPE', '子业务类型标识', `0x${type.toString(16).padStart(4, '0').toUpperCase()}${dn(SUBIZ_809, type, '') ? ' - ' + SUBIZ_809[type] : ''}`));
  const len = r.u32();
  out.push(f('DATA_LENGTH', '后续数据长度', len, { hint: `${len} 字节` }));
  const fn = _SUB_PARSERS[type];
  if (fn) {
    try { fn(r, out); }
    catch (e) { out.push({ _id: ++_uid, key: '_ERR', label: '子业务解析异常', value: e.message, kind: 'error' }); }
  }
  return out;
}

const BODY_809 = {
  /* ---- 0x1001 主链路登录请求 ---- */
  s809Login(r) {
    const userId = r.u32();
    const password = r.gbkz(8);
    const downIpB = r.take(4);
    const downPort = r.u16();
    const upIpB = r.take(4);
    const upPort = r.u16();
    return [
      f('USER_ID', '用户名 / 下级平台接入码', String(userId), { hint: '4 字节无符号整数' }),
      f('PASSWORD', '密码', password, { hint: '8 字节，长度不足补 0x00' }),
      f('DOWN_IP', '下级平台 IP', ipWithAlt(downIpB), { hint: '4 字节 BCD，例：192.168.1.1' }),
      f('DOWN_PORT', '下级平台端口', downPort),
      f('UP_IP', '上级平台 IP', ipWithAlt(upIpB), { hint: '4 字节 BCD' }),
      f('UP_PORT', '上级平台端口', upPort),
    ];
  },

  s809LoginResp(r) {
    const res = r.u8();
    const verify = r.left > 0 ? r.bcd(r.left) : '';
    return [
      f('RESULT', '登录结果', `${res} - ${dn(S809_LOGIN_RESULT, res, '未知')}`),
      ...(verify ? [f('VERIFY_CODE', '校验码', verify, { hint: '登录成功后返回的校验码，4 字节' })] : []),
    ];
  },

  s809Logout(r) {
    const userId = r.u32();
    return [f('USER_ID', '用户名 / 下级平台接入码', String(userId))];
  },

  s809LogoutResp(r) {
    const res = r.u8();
    const verify = r.left > 0 ? r.bcd(r.left) : '';
    return [
      f('RESULT', '注销结果', `0x${res.toString(16).padStart(2, '0').toUpperCase()}`, { hint: res === 0 ? '成功' : '失败' }),
      ...(verify ? [f('VERIFY_CODE', '校验码', verify)] : []),
    ];
  },

  s809Keepalive(r) {
    const userId = r.u32();
    return [f('USER_ID', '用户名 / 下级平台接入码', String(userId))];
  },

  s809KeepaliveResp(r) {
    const res = r.u8();
    return [f('RESULT', '保持连接结果', res === 0 ? '0 - 成功' : `${res} - 失败` )];
  },

  /* ---- 从链路 ---- */
  s809SubLinkReq(r) {
    const userId = r.u32();
    const verify = r.bcd(r.left >= 4 ? 4 : r.left);
    return [
      f('USER_ID', '用户名 / 下级平台接入码', String(userId)),
      f('VERIFY_CODE', '校验码', verify, { hint: '由主链路登录应答下发' }),
    ];
  },

  s809SubLinkResp(r) {
    const res = r.u8();
    return [f('RESULT', '从链路建立结果', res === 0 ? '0 - 成功' : `${res} - 失败` )];
  },

  s809SubLinkLogout(r) {
    const userId = r.u32();
    return [f('USER_ID', '用户名 / 下级平台接入码', String(userId))];
  },

  s809SubLinkLogoutResp(r) {
    const res = r.u8();
    return [f('RESULT', '从链路注销结果', res === 0 ? '0 - 成功' : `${res} - 失败` )];
  },

  /* ---- 0x1200 动态信息交换 ---- */
  s809Dynamic(r) {
    const out = [];
    out.push(f('MSG_TYPE', '业务数据类型', `0x${r.u16().toString(16).padStart(4, '0').toUpperCase()}`));
    const type = r.u16();
    out.push(f('SUB_TYPE', '子业务类型', `0x${type.toString(16).padStart(4, '0').toUpperCase()}${dn(SUBIZ_809, type, '') ? ' - ' + SUBIZ_809[type] : ''}`));
    // 剩余以「车牌号(21)+车牌颜色(1)+DATA_TYPE(2)+DATA_LENGTH(4)」开头的子业务消息体时，按规范 V2 细分
    if (r.left >= 28 && SUBIZ_809[type]) {
      try {
        const sub = parse809SubBiz(r);
        out.push({ _id: ++_uid, key: 'SUB', label: '子业务数据（按规范 V2 细分）', kind: 'group', children: sub });
      } catch (e) { /* 落到原始数据展示 */ }
    }
    if (r.left > 0) {
      const data = r.rest();
      out.push(f('DATA', '数据内容', `${data.length} 字节`, { hex: bytesToHex(data), kind: 'raw' }));
    }
    return out;
  },

  s809DynamicResp(r) {
    const seq = r.u16();
    return [f('RESP_SEQ', '对应转发消息流水号', seq)];
  },

  /* ---- 0x1007 实时上传车辆定位信息 ---- */
  s809RealtimeLocation(r) {
    return parse809Vehicle(r);
  },

  s809RealtimeLocationResp(r) {
    const seq = r.u16();
    const res = r.u8();
    return [
      f('VEHICLE_MSG_SEQ', '车辆定位信息流水号', seq, { hint: '对应 0x1007 消息的流水号' }),
      f('RESULT', '处理结果', res === 0 ? '0 - 成功' : `${res} - 失败`),
    ];
  },

  /* ---- 0x1202 批量定位 ---- */
  s809BatchLocation(r) {
    const cnt = r.u32();
    const out = [f('VEHICLE_CNT', '车辆数量', cnt)];
    for (let i = 0; i < cnt; i++) {
      if (r.left < 2) { out.push(f('_ERR', '数据不足', `声明 ${cnt} 辆，实际 ${i} 辆`)); break; }
      try {
        const fields = parse809Vehicle(r);
        out.push({ _id: ++_uid, key: `VEH[${i}]`, label: `车辆 #${i + 1}`, kind: 'group', children: fields });
      } catch (e) {
        out.push({ _id: ++_uid, key: `VEH[${i}]`, label: `车辆 #${i + 1}`, value: e.message, kind: 'error' });
        break;
      }
    }
    return out;
  },

  s809BatchResp(r) {
    const seq = r.u16();
    const res = r.u8();
    return [
      f('MSG_SEQ', '对应转发消息流水号', seq),
      f('RESULT', '处理结果', res === 0 ? '0 - 成功' : `${res} - 失败`),
    ];
  },

  /* ---- 0x1300 平台间消息转发 ---- */
  s809Forward(r) {
    const out = [];
    out.push(f('MSG_TYPE', '业务数据类型', `0x${r.u16().toString(16).padStart(4, '0').toUpperCase()}`));
    const data = r.rest();
    // 常见：转发 808 的 0x0200 位置汇报
    out.push(f('DATA', '转发数据', `${data.length} 字节`, { hex: bytesToHex(data.slice(0, 128)) + (data.length > 128 ? ' ...' : ''), kind: 'raw' }));
    return out;
  },

  s809ForwardResp(r) {
    const seq = r.u16();
    return [f('RESP_SEQ', '对应转发消息流水号', seq)];
  },

  s809ObjQuery(r) {
    const data = r.rest();
    return [
      f('QUERY_DATA', '查询条件', bytesToHex(data), { kind: 'raw', monospace: true }),
      f('_TEXT', '文本尝试解码', decodeGBK(data).replace(/\0/g, '') || '(非文本)'),
    ];
  },

  s809ObjQueryResp(r) {
    const data = r.rest();
    return [
      f('RESP_DATA', '查询结果', bytesToHex(data), { kind: 'raw', monospace: true, hint: `${data.length} 字节` }),
    ];
  },

  /* ---- 0x1400 车辆报警信息上报 ---- */
  s809Alarm(r) {
    return parse809Vehicle(r);
  },

  /* ---- 0x1500 平台查岗 ---- */
  s809Inspect(r) {
    const seq = r.u16();
    const objType = r.u8();
    const objId = r.gbkz(r.left);
    return [
      f('MSG_SEQ', '查岗消息流水号', seq),
      f('OBJ_TYPE', '查岗对象类型', `${objType} - ${dn({ 1: '车辆', 2: '下级平台' }, objType, '未知')}`),
      f('OBJ_ID', '查岗对象 ID', objId),
    ];
  },

  s809InspectResp(r) {
    const seq = r.u16();
    const data = r.rest();
    return [
      f('MSG_SEQ', '查岗消息流水号', seq),
      f('RESP_DATA', '查岗应答内容', decodeGBK(data).replace(/\0/g, '') || bytesToHex(data)),
    ];
  },

  /* ---- 区域/线路 ---- */
  s809AreaData(r) {
    const cnt = r.u8();
    const out = [f('AREA_CNT', '区域数量', cnt)];
    out.push(f('DATA', '区域数据', `${r.left} 字节`, { hex: bytesToHex(r.rest().slice(0, 128)), kind: 'raw' }));
    return out;
  },

  s809RouteData(r) {
    const cnt = r.u8();
    const out = [f('ROUTE_CNT', '线路数量', cnt)];
    out.push(f('DATA', '线路数据', `${r.left} 字节`, { hex: bytesToHex(r.rest().slice(0, 128)), kind: 'raw' }));
    return out;
  },

  s809AreaResp(r) {
    const seq = r.u16();
    const res = r.u8();
    return [
      f('MSG_SEQ', '对应消息流水号', seq),
      f('RESULT', '处理结果', res === 0 ? '0 - 成功' : `${res} - 失败`),
    ];
  },

  raw(r) {
    return [f('RAW', '原始数据', bytesToHex(r.rest()), { kind: 'raw', monospace: true })];
  },
};

/* ---- 809 车辆定位信息（省级平台 -> 部级平台）----
 * 结构（JT/T 809-2011）：
 *   车辆类型(1) 车牌颜色(1) 车牌号(变长GBK)
 *   子业务类型标识(2)
 *   业务数据：
 *     位置汇报消息(28字节：报警标志4+状态4+纬度4+经度4+高程2+速度2+方向2+时间6)
 *     司机信息、车辆状态等
 * 各地实现差异较大，这里采用最常见的一种解释并给出原始字节。
 */
function parse809Vehicle(r) {
  const out = [];
  const vehicleType = r.u8();
  const plateColor = r.u8();
  const plate = r.gbkz(21).replace(/\0/g, '');
  out.push(f('VEHICLE_TYPE', '车辆类型', `${vehicleType} (0x${vehicleType.toString(16).padStart(2, '0')})`, { hint: dn(VEHICLE_TYPE_809, vehicleType, dn(VEHICLE_TYPE, vehicleType, '未知')) }));
  out.push(f('PLATE_COLOR', '车牌颜色', `${plateColor} - ${dn(PLATE_COLOR, plateColor, dn(COLOR_LABEL, plateColor, '未知'))}`));
  out.push(f('PLATE', '车牌号', plate || '(空)', { hint: 'GBK，定长 21 字节' }));

  if (r.left >= 4) {
    // 子业务类型
    const subType = r.u16();
    const len = r.u16();
    out.push(f('SUB_TYPE', '子业务类型', `0x${subType.toString(16).padStart(4, '0').toUpperCase()}`, { hint: '0x0200 表示位置汇报' }));
    out.push(f('DATA_LEN', '业务数据长度', len, { hint: '字节' }));

    const take = Math.min(len || r.left, r.left);
    const data = r.take(take);
    if (data.length >= 28) {
      try {
        const sr = new Reader(data);
        const fields = parseLocationBody(sr, {});
        out.push({ _id: ++_uid, key: 'LOCATION', label: '车辆定位信息', kind: 'group', children: fields });
        if (sr.left > 0) {
          out.push(f('LOC_TAIL', '定位信息剩余字节', bytesToHex(sr.rest()), { kind: 'raw', monospace: true }));
        }
      } catch (e) {
        out.push(f('LOC_ERR', '定位信息解析失败', e.message, { kind: 'error' }));
        out.push(f('LOC_RAW', '定位原始字节', bytesToHex(data), { kind: 'raw', monospace: true }));
      }
    } else {
      out.push(f('DATA', '业务数据', bytesToHex(data), { kind: 'raw', monospace: true }));
    }
  }

  if (r.left > 0) {
    out.push(f('TAIL', '剩余字节', bytesToHex(r.rest()), { kind: 'raw', monospace: true }));
  }
  return out;
}

/* =====================================================================
 * 辅助：时间 / 坐标 / 参数值
 * ===================================================================== */
/** 6 字节 BCD 时间：YYMMDDhhmmss */
function bcdTime6(s) {
  if (!s || s.length < 12) return s || '';
  const yy = s.substr(0, 2), mm = s.substr(2, 2), dd = s.substr(4, 2);
  const hh = s.substr(6, 2), mi = s.substr(8, 2), ss = s.substr(10, 2);
  const y = parseInt(yy, 10) >= 70 ? `19${yy}` : `20${yy}`;
  return `${y}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

/** 5 字节 BCD：MMDDhhmmss（CAN 时间） */
function bcdTime5(s) {
  if (!s || s.length < 10) return s || '';
  return `MM-DD ${s.substr(0, 2)}-${s.substr(2, 2)} ${s.substr(4, 2)}:${s.substr(6, 2)}:${s.substr(8, 2)}`.replace(/^MM-DD /, '');
}

function bcdTime6Unused() { return ''; }

/** BCD 编码的 IPv4 地址 -> 点分十进制。
 *  规范中 4 字节每字节存放 1 位十进制（如 192 -> 0x01 0x92 会越界），
 *  因此以字节值直接解读，兼容主流实现。 */
function bcdIp(bcd) {
  if (!bcd || bcd.length < 4) return bcd ? bytesToHex(bcd) : '';
  return `${bcd[0]}.${bcd[1]}.${bcd[2]}.${bcd[3]}`;
}

/** BCD IP 的备用解读（每字节两个十进制数字） */
function bcdIpDigit(bcd) {
  if (!bcd || bcd.length < 8) return bcd ? bytesToHex(bcd) : '';
  return `${parseInt(bcd.substr(0, 2), 10)}.${parseInt(bcd.substr(2, 2), 10)}.${parseInt(bcd.substr(4, 2), 10)}.${parseInt(bcd.substr(6, 2), 10)}`;
}

/** 同时给出两种 IP 解读，便于对照现场实现 */
function ipWithAlt(bytes) {
  if (!bytes || bytes.length < 4) return bytesToHex(bytes || []);
  const a = bcdIp(bytes);
  const b = bytes.length >= 8 ? bcdIpDigit(bytes) : null;
  return b && b !== a ? `${a}  （若按每字节两位 BCD：${b}）` : a;
}

function fmtCoord(latRaw, lonRaw) {
  if (latRaw === 0 && lonRaw === 0) return '0,0（无效坐标）';
  return `${(latRaw / 1e6).toFixed(6)},${(lonRaw / 1e6).toFixed(6)}`;
}

function safeText(bytes) {
  if (!bytes || !bytes.length) return '';
  let printable = 0;
  for (const b of bytes) if ((b >= 0x20 && b < 0x7f) || b >= 0x80) printable++;
  if (printable / bytes.length < 0.8) return '';
  const t = decodeGBK(bytes).replace(/\0/g, '').replace(/[\x00-\x1f]/g, ' ').trim();
  return t.length > 2 ? t : '';
}

function stepVersion(len, r, label) {
  if (len === 0) return '无';
  const v = r.gbkz(Math.min(len, r.left));
  return v;
}

function gnssAttr(v) {
  const items = [];
  if (v & 1) items.push('GPS');
  if (v & 2) items.push('北斗');
  if (v & 4) items.push('GLONASS');
  if (v & 8) items.push('Galileo');
  return items.join('、') || '无';
}

function commAttr(v) {
  const items = [];
  if (v & 1) items.push('支持 GPRS');
  if (v & 2) items.push('支持 CDMA');
  if (v & 4) items.push('支持 TD-SCDMA');
  if (v & 8) items.push('支持 WCDMA');
  if (v & 16) items.push('支持 TD-LTE');
  if (v & 32) items.push('支持 FDD-LTE');
  return items.join('、') || '无';
}

/** 终端参数值解码（按 ID 类型区分数值/字符串） */
function decodeParamValue(id, data, info) {
  const STRING_IDS = new Set([
    0x0010, 0x0011, 0x0012, 0x0013, 0x0014, 0x0015, 0x0016, 0x0017,
    0x001A, 0x001B, 0x001C, 0x0040, 0x0041, 0x0042, 0x0043, 0x0044,
    0x0048, 0x0049, 0x0069, 0x0084, 0x0085, 0x0086, 0x0087, 0x0088,
    0x0089, 0x00A4, 0x00A5, 0x00A6, 0x00A7, 0x00A8, 0x00A9, 0x00AA,
    0x00AB, 0x00AC, 0x00AD, 0x00AE, 0x00C0, 0x00F0, 0x00F1, 0x00F2,
    0xF364, 0xF365,
  ]);

  if (STRING_IDS.has(id)) {
    const s = decodeGBK(data).replace(/\0/g, '');
    return { value: `"${s}"`, kind: 'text' };
  }
  // 数值类型
  if (data.length === 1) return { value: String(data[0]) };
  if (data.length === 2) return { value: String((data[0] << 8) | data[1]) };
  if (data.length === 4) return { value: String((((data[0] << 24) >>> 0) + (data[1] << 16) + (data[2] << 8) + data[3]) >>> 0) };
  if (data.length === 8) {
    let v = 0n;
    for (const b of data) v = (v << 8n) | BigInt(b);
    return { value: v.toString() };
  }
  // 多值或未知，尝试文本
  const txt = decodeGBK(data).replace(/\0/g, '');
  if (txt && /^[\x20-\x7e\u4e00-\u9fa5]+$/.test(txt)) return { value: `"${txt}"`, kind: 'text' };
  return { value: bytesToHex(data), kind: 'raw' };
}

/* =====================================================================
 * 暴露 809 解析入口（供 parseMessage 内部调用）
 * ===================================================================== */
const _origParseBody = parseBody;
function parseBodyDispatch(type, r, ctx) {
  if (ctx.protocol === '809') return parseBody809(type, r, ctx);
  return _origParseBody(type, r, ctx);
}

/* 重新绑定：把 parseMessage 中的 parseBody 调用替换为分发版本 */
function _patch() { /* no-op, 见下方导出包装 */ }

/* 用一个包装函数替代原 parseMessage 中的调用 */
const __parseMessage = parseMessage;
function parse(input) {
  const raw = hexToBytes(input);
  const warnings = [];
  if (raw.length === 0) throw new Error('输入为空，请输入 16 进制报文');

  let frame = raw;
  let hadFlag = false;
  if (frame[0] === 0x7e) { frame = frame.slice(1); hadFlag = true; }
  if (frame.length && frame[frame.length - 1] === 0x7e) { frame = frame.slice(0, -1); hadFlag = true; }
  const innerFlags = [];
  for (let i = 0; i < frame.length; i++) if (frame[i] === 0x7e) innerFlags.push(i);

  const body = unescape(frame);
  let checksumOk = null, declaredChecksum = null, calcChecksum = null;
  let payload = body;
  if (body.length >= 2) {
    declaredChecksum = body[body.length - 1];
    const before = body.slice(0, body.length - 1);
    calcChecksum = xorChecksum(before);
    checksumOk = declaredChecksum === calcChecksum;
    payload = before;
  }

  // 先探测消息 ID（不移动 reader）
  let probeMsgId = null;
  if (payload.length >= 2) probeMsgId = (payload[0] << 8) | payload[1];

  const r = new Reader(payload);
  let header = null;
  let headerErr = null;
  try {
    header = parseHeader(r);
  } catch (e) {
    // 消息头不完整（粘贴被截断）不应该让整个解析崩掉，
    // 返回一个带告警的结果，页面照常展示原始字节
    headerErr = e.message;
  }

  if (headerErr) {
    const mid = probeMsgId === null ? '—' : `0x${probeMsgId.toString(16).padStart(4, '0').toUpperCase()}`;
    return {
      protocol: '808',
      header: {
        fields: [], MSG_ID: probeMsgId, version: 1, versionNo: null,
        phone: '—', seq: '—', bodyLen: 0, encrypt: 0, isSubPackage: false,
        attr: null, incomplete: true,
      },
      checksum: { ok: checksumOk, declared: declaredChecksum, calculated: calcChecksum },
      msgId: probeMsgId,
      msgIdHex: mid,
      msgName: '消息头不完整，无法识别',
      msgDir: null,
      versionText: '未知（头部截断）',
      warnings: warnings.concat([`消息头不完整：${headerErr}`]),
      bodyFields: [],
      headerIncomplete: true,
      raw: { input, frame, unescaped: body, payload },
      frameInfo: {
        totalBytes: raw.length, withFlag: hadFlag, innerFlagCount: innerFlags.length,
        escapedBytes: frame.length, unescapedBytes: body.length, payloadBytes: payload.length,
      },
    };
  }

  let protocol = '808';
  const is809Id = (header.MSG_ID >= 0x1000 && header.MSG_ID <= 0x1FFF) ||
    (header.MSG_ID >= 0x9000 && header.MSG_ID <= 0x9FFF);
  if (is809Id && MSG_809[header.MSG_ID]) protocol = '809';

  const dict = protocol === '809' ? MSG_809 : MSG_808;
  const def = dict[header.MSG_ID];

  const result = {
    protocol,
    header,
    checksum: { ok: checksumOk, declared: declaredChecksum, calculated: calcChecksum },
    msgId: header.MSG_ID,
    msgIdHex: `0x${header.MSG_ID.toString(16).padStart(4, '0').toUpperCase()}`,
    msgName: def ? def.name : `未知消息 (0x${header.MSG_ID.toString(16).toUpperCase()})`,
    msgDir: def ? def.dir : null,
    versionText: header.version === 2 ? 'JT/T 808-2019' : 'JT/T 808-2011/2013',
    warnings,
    bodyFields: [],
    raw: { input, frame, unescaped: body, payload },
    frameInfo: {
      totalBytes: raw.length,
      withFlag: hadFlag,
      innerFlagCount: innerFlags.length,
      escapedBytes: frame.length,
      unescapedBytes: body.length,
      payloadBytes: payload.length,
    },
  };

  if (innerFlags.length > 0) warnings.push(`报文内部存在 ${innerFlags.length} 个 0x7E 字节，可能为粘包（多条报文拼接）。本工具仅解析第一条。`);
  if (checksumOk === false) warnings.push(`校验码不匹配：报文声明 0x${declaredChecksum.toString(16).padStart(2, '0').toUpperCase()}，实际计算 0x${calcChecksum.toString(16).padStart(2, '0').toUpperCase()}。`);
  if (header.encrypt !== 0) warnings.push(`消息体已加密（加密方式 ${header.encrypt}），无法解析明文内容。`);
  if (!def) warnings.push(`未收录的消息 ID ${result.msgIdHex}，已按原始字节展示。`);
  if (!def && !hadFlag) {
    warnings.push('输入不含 7E 首尾定界符，首字节也不是已知消息头。这段数据可能不是一条完整的 808/809 报文帧（例如平台内部记录、抓包被截断、或上层协议封装）。下方已尝试自动扫描其中内嵌的协议数据。');
  }

  const consumed = r.pos;
  const declaredLen = header.bodyLen;
  const expectTotal = consumed + declaredLen;
  if (declaredLen > 0 && payload.length < expectTotal) {
    warnings.push(`消息体长度不足：声明 ${declaredLen} 字节，实际可用 ${payload.length - consumed} 字节。`);
  } else if (declaredLen > 0 && payload.length > expectTotal && innerFlags.length === 0) {
    warnings.push(`消息体长度偏小：声明 ${declaredLen} 字节，实际多出 ${payload.length - expectTotal} 字节（可能为粘包残留）。`);
  }

  if (def && def.body && def.body !== 'empty' && header.encrypt === 0) {
    try {
      const limit = declaredLen > 0 ? Math.min(consumed + declaredLen, payload.length) : payload.length;
      const bodyBytes = payload.slice(consumed, limit);
      const br = new Reader(bodyBytes);
      const ctx = { protocol, msgId: header.MSG_ID, header };
      result.bodyFields = protocol === '809'
        ? parseBody809(def.body, br, ctx)
        : parseBody(def.body, br, ctx);
      if (br.left > 0 && def.body !== 'empty') {
        result.bodyFields.push({
          _id: ++_uid, key: '_TAIL', label: '未解析的剩余字节',
          value: `${br.left} 字节`, hex: bytesToHex(br.rest()), kind: 'raw',
        });
      }
    } catch (e) {
      warnings.push(`消息体解析失败：${e.message}`);
      result.bodyFields = [{ _id: ++_uid, key: '_ERR', label: '解析错误', value: e.message, kind: 'error' }];
    }
  } else if (declaredLen > 0) {
    result.bodyFields = [{
      _id: ++_uid, key: '_RAW', label: '消息体原始数据',
      value: bytesToHex(payload.slice(consumed, consumed + declaredLen)),
      kind: 'raw', monospace: true,
    }];
  }

  return result;
}

/* =====================================================================
 * 自定义包头车牌号识别
 * ---------------------------------------------------------------------
 * 平台导出的内部定长记录（如 5B + 长度 + 自定义字段 + 内嵌 808/809 消息体）
 * 常把车牌号放在自定义包头里。这里按「省份简称(GBK 双字节) + 大写字母 +
 * 5~6 位字母数字」的车牌模式，在位置块之前的头部字节里定位车牌号。
 * 注意：仅作为「推测」辅助识别，不改变 808/809 标准解析结果。
 * ===================================================================== */
const PLATE_PROV_GBK = {
  0xB2D8:'藏', 0xB4A8:'川', 0xB6F5:'鄂', 0xB8CA:'甘', 0xB8D3:'赣',
  0xB9F0:'桂', 0xB9F3:'贵', 0xBADA:'黑', 0xBBA6:'沪', 0xBCAA:'吉',
  0xBCBD:'冀', 0xBDF2:'津', 0xBDFA:'晋', 0xBEA9:'京', 0xC1C9:'辽',
  0xC2B3:'鲁', 0xC3C9:'蒙', 0xC3F6:'闽', 0xC4FE:'宁', 0xC7E0:'青',
  0xC7ED:'琼', 0xC9C2:'陕', 0xCBD5:'苏', 0xCDEE:'皖', 0xCFE6:'湘',
  0xD0C2:'新', 0xD3E5:'渝', 0xD4A5:'豫', 0xD4C1:'粤', 0xD4C6:'云', 0xD5E3:'浙',
};

/** 在自定义包头字节中定位车牌号（省份简称 GBK + 大写字母 + ≥5 位字母数字） */
function findHeadPlate(headBytes) {
  if (!headBytes || headBytes.length < 8) return null;
  const isUpper = (c) => c >= 0x41 && c <= 0x5A;                 // A-Z
  const isAlnum = (c) => (c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x5A); // 0-9 A-Z
  for (let i = 0; i + 2 < headBytes.length; i++) {
    const pair = (headBytes[i] << 8) | headBytes[i + 1];
    const prov = PLATE_PROV_GBK[pair];
    if (!prov) continue;
    if (!isUpper(headBytes[i + 2])) continue;                    // 发牌机关必须是大写字母
    let j = i + 3, k = 0;
    while (j < headBytes.length && k < 6 && isAlnum(headBytes[j])) { j++; k++; }
    if (k < 5) continue;                                         // 至少 5 位编号
    let s = prov;
    for (let t = i + 2; t < j; t++) s += String.fromCharCode(headBytes[t]);
    return s;
  }
  return null;
}

/* =====================================================================
 * 内嵌报文扫描
 * 当输入不是一条标准帧（没有 7E 定界 / 首字节不是合法消息头）时，
 * 尝试在字节流中定位内嵌的 808 / 809 数据：
 *   1) 结构自洽的消息头（消息 ID 已知 + 声明的消息体长度恰好落在数据内）
 *   2) 28 字节位置汇报块（BCD 时间合法 + 经纬度落在中国境内）
 * ===================================================================== */
function scanEmbedded(input) {
  const bytes = typeof input === 'string' ? hexToBytes(input) : input;
  const N = bytes.length;
  const cands = [];
  if (N < 12) return { candidates: [] };

  const rd = (o) => (((bytes[o] << 24) >>> 0) + (bytes[o + 1] << 16) + (bytes[o + 2] << 8) + bytes[o + 3]) >>> 0;

  // BCD 时间校验：注意要按 BCD 解码成十进制再判断范围，
  // 不能直接比较原始字节值（如 0x23 表示 23，不是 35）
  const bcdVal = (b) => (b >> 4) * 10 + (b & 0x0f);
  const bcdTimeOk = (o) => {
    if (o + 6 > N) return false;
    for (let k = o; k < o + 6; k++) {
      if ((bytes[k] >> 4) > 9 || (bytes[k] & 0x0f) > 9) return false;
    }
    const mm = bcdVal(bytes[o + 1]), dd = bcdVal(bytes[o + 2]);
    const hh = bcdVal(bytes[o + 3]), mi = bcdVal(bytes[o + 4]), ss = bcdVal(bytes[o + 5]);
    return mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31 &&
      hh <= 23 && mi <= 59 && ss <= 59;
  };

  /* ---- (1) 位置汇报块 ---- */
  for (let o = 0; o + 28 <= N; o++) {
    if (!bcdTimeOk(o + 22)) continue;
    const latRaw = rd(o + 8), lonRaw = rd(o + 12);
    const lat = latRaw / 1e6, lon = lonRaw / 1e6;
    if (!(lat > 3 && lat < 54 && lon > 73 && lon < 136)) continue;

    // 尝试连同附加项一起解析，得出真实消费长度
    let consumed = 28;
    try {
      const br = new Reader(bytes.slice(o));
      parseLocationBody(br, {});
      consumed = br.pos;
    } catch (e) { consumed = 28; }
    if (consumed > N - o) consumed = N - o;

    let tailAllZero = true;
    for (let k = o + consumed; k < N; k++) {
      if (bytes[k] !== 0) { tailAllZero = false; break; }
    }

    // 车牌号可能存在于自定义包头（位置块之前）；仅作推测辅助
    let headPlate = null;
    if (o > 0) headPlate = findHeadPlate(bytes.slice(0, o));

    const timeBcd = bytesToHex(bytes.slice(o + 22, o + 28)).replace(/ /g, '');
    cands.push({
      kind: 'location',
      offset: o,
      length: consumed,
      cleanEnd: tailAllZero,
      msgId: 0x0200,
      msgName: '位置信息汇报',
      headPlate,
      lat, lon, latRaw, lonRaw,
      speed: ((bytes[o + 18] << 8) | bytes[o + 19]) / 10,
      altitude: (bytes[o + 16] << 8) | bytes[o + 17],
      direction: (bytes[o + 20] << 8) | bytes[o + 21],
      time: bcdTime6(timeBcd),
      alarm: rd(o),
      status: rd(o + 4),
      reason: `偏移 ${o} 起为 28 字节位置块：经纬度落在中国境内（${lat.toFixed(6)}, ${lon.toFixed(6)}），BCD 时间合法（${bcdTime6(timeBcd)}）`,
    });
  }

  /* ---- (2) 结构自洽的消息头 ---- */
  for (let o = 0; o + 12 <= N; o++) {
    const id = (bytes[o] << 8) | bytes[o + 1];
    for (const [dict, proto] of [[MSG_808, '808'], [MSG_809, '809']]) {
      if (!dict[id]) continue;
      const attr = (bytes[o + 2] << 8) | bytes[o + 3];
      const bodyLen = attr & 0x03ff;
      const encrypt = (attr >> 10) & 0x07;
      const isSub = ((attr >> 13) & 1) === 1;
      const ver2 = ((attr >> 14) & 1) === 1;
      const hdr = 12 + (ver2 ? 3 : 0) + (isSub ? 4 : 0);
      if (encrypt !== 0) continue;
      if (bodyLen < 4) continue;
      if (o + hdr + bodyLen > N) continue;
      const slack = N - (o + hdr + bodyLen);
      if (slack > 16) continue;

      let checksumOk = null;
      if (o + hdr + bodyLen < N) {
        let calc = 0;
        for (let k = o; k < o + hdr + bodyLen; k++) calc ^= bytes[k];
        checksumOk = calc === bytes[o + hdr + bodyLen];
      }

      cands.push({
        kind: 'header',
        offset: o,
        length: hdr + bodyLen + (checksumOk === null ? 0 : 1),
        headerLen: hdr,
        bodyLen,
        protocol: proto,
        msgId: id,
        msgName: dict[id].name,
        checksumOk,
        slack,
        reason: `偏移 ${o} 处消息头结构自洽：${dict[id].name}（0x${id.toString(16).toUpperCase().padStart(4, '0')}），消息体声明 ${bodyLen} 字节${checksumOk === null ? '（无校验码可比对）' : checksumOk ? '，校验码正确' : '，但校验码不符'}`,
      });
    }
  }

  // 位置块优先，同级按偏移升序
  cands.sort((a, b) => (a.kind === b.kind ? a.offset - b.offset : a.kind === 'location' ? -1 : 1));
  return { candidates: cands };
}

/* =====================================================================
 * 只解析消息体（头部由工具合成），用于处理内嵌/裸消息体
 * ===================================================================== */
function parseRawBody(msgId, input, opts = {}) {
  const body = typeof input === 'string' ? hexToBytes(input) : input;
  const version = opts.version || 1;
  const frame = buildFrame(msgId, { phone: '000000000000', seq: 0, version }, body);
  const r = parse(bytesToHex(frame));
  r.synthesizedHeader = true;
  return r;
}

/* =====================================================================
 * 反向：构造报文（编码）—— 便于测试与造数据
 * ===================================================================== */
function buildFrame(msgId, headerOpts, bodyBytes) {
  const { phone = '13800138000', seq = 1, encrypt = 0, subPkg = null, version = 2 } = headerOpts || {};
  const len = bodyBytes.length;
  let attr = len & 0x03ff;
  attr |= (encrypt & 0x07) << 10;
  if (subPkg) attr |= 1 << 13;
  if (version === 2) attr |= 1 << 14;

  const parts = [];
  parts.push((msgId >> 8) & 0xff, msgId & 0xff);
  parts.push((attr >> 8) & 0xff, attr & 0xff);
  if (version === 2) {
    parts.push(0x01); // 版本号
    const ph = phone.replace(/\D/g, '').padStart(20, '0').slice(0, 20);
    for (let i = 0; i < 20; i += 2) parts.push(parseInt(ph.substr(i, 2), 16));
  } else {
    const ph = phone.replace(/\D/g, '').padStart(12, '0').slice(0, 12);
    for (let i = 0; i < 12; i += 2) parts.push(parseInt(ph.substr(i, 2), 16));
  }
  parts.push((seq >> 8) & 0xff, seq & 0xff);
  if (subPkg) {
    parts.push((subPkg.total >> 8) & 0xff, subPkg.total & 0xff);
    parts.push((subPkg.index >> 8) & 0xff, subPkg.index & 0xff);
  }
  const head = new Uint8Array(parts);
  const all = new Uint8Array(head.length + len + 1);
  all.set(head, 0);
  all.set(bodyBytes, head.length);
  all[all.length - 1] = xorChecksum(all.slice(0, all.length - 1));

  const esc = escape(all);
  const out = new Uint8Array(esc.length + 2);
  out[0] = 0x7e;
  out.set(esc, 1);
  out[out.length - 1] = 0x7e;
  return out;
}


/* ---------------- 对外接口 ---------------- */
global.JT808 = {
  parse, buildFrame, hexToBytes, bytesToHex, toHex: bytesToHex,
  escape, unescape, xorChecksum, decodeGBK,
  parseHeader, mkField: f,
  scanEmbedded, parseRawBody, findHeadPlate,
  SUBIZ_809, SUBIZ_ALARM_RESULT, ALARM_WARN_TYPE,
  ADAS_ALARM_ACTIVE, DSM_ALARM_ACTIVE,
};})(typeof globalThis !== 'undefined' ? globalThis : window);
