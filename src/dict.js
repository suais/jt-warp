/*!
 * JT/T 808-2011/2013/2019 & JT/T 809 数据字典
 * 纯前端，无依赖。所有表项均可人工扩展。
 */

/* ============================ 808 消息 ID ============================ */
// dir: 'up' 终端->平台  'down' 平台->终端  'both' 双向
export const MSG_808 = {
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
export const MSG_809 = {
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
export const SUBIZ_809 = {
  0x1201: '上传车辆注册信息',
  0x120C: '上传驾驶员身份信息',
  0x1402: '上报车辆报警信息',
  0x1412: '上报报警处理结果',
  0x9401: '报警督办请求',
  0x1401: '报警督办应答',
};

/* 809 报警督办应答 / 处理结果 —— RESULT 取值 */
export const SUBIZ_ALARM_RESULT = {
  0x00: '处理中', 0x01: '已处理完毕', 0x02: '不作处理',
  0x03: '将来处理', 0x04: '误报警',
};

/* =================== 省份/城市区划（交通行业常用） =================== */
export const PROVINCES = {
  11: '北京市', 12: '天津市', 13: '河北省', 14: '山西省', 15: '内蒙古自治区',
  21: '辽宁省', 22: '吉林省', 23: '黑龙江省',
  31: '上海市', 32: '江苏省', 33: '浙江省', 34: '安徽省', 35: '福建省', 36: '江西省', 37: '山东省',
  41: '河南省', 42: '湖北省', 43: '湖南省', 44: '广东省', 45: '广西壮族自治区', 46: '海南省',
  50: '重庆市', 51: '四川省', 52: '贵州省', 53: '云南省', 54: '西藏自治区',
  61: '陕西省', 62: '甘肃省', 63: '青海省', 64: '宁夏回族自治区', 65: '新疆维吾尔自治区',
  71: '中国台湾省', 81: '中国香港特别行政区', 82: '中国澳门特别行政区',
};

/* ======================= 报警标志位（DWORD） ======================= */
export const ALARM_FLAGS = [
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
export const STATUS_FLAGS = [
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
export const LOCATION_EXTRAS = {
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
  0x64: { name: '中交兴路自定义', unit: '', type: 'u32' },
  0x65: { name: '中交兴路自定义', unit: '', type: 'u16' },
  0xE0: { name: '自定义扩展', unit: '', type: 'raw' },
  0xFF: { name: '自定义扩展', unit: '', type: 'raw' },
};

/* ================= 终端参数 ID（JT/T 808-2019 附录） ================= */
export const TERM_PARAMS = {
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
export const COLOR_LABEL = {
  0: '未知', 1: '蓝色', 2: '黄色', 3: '黑色', 4: '白色', 9: '其他',
  91: '农黄', 92: '农白', 93: '农黑', 94: '农绿', 95: '农其他',
};

/* 车牌颜色（注册消息 / 位置汇报附加项，1 字节，JT/T 808 附件） */
export const PLATE_COLOR = {
  0: '无车牌', 1: '蓝色', 2: '黄色', 3: '黑色', 4: '白色',
  9: '其他', 10: '农用黄', 11: '农用白', 12: '农用黑',
  21: '渐变绿色', 22: '黄绿双拼色', 23: '黑色白字',
  24: '蓝白渐变', 25: '黄色白字', 26: '红色白字',
  31: '新能源绿', 32: '新能源黄绿',
  91: '农黄', 92: '农白', 93: '农黑', 94: '农绿', 95: '农其他',
};

/* 车辆类型（JT/T 809 车辆定位信息） */
export const VEHICLE_TYPE_809 = {
  0x01: '客车', 0x02: '货车', 0x03: '危险品运输车', 0x04: '牵引车',
  0x05: '工程车', 0x06: '平板车', 0x07: '罐车', 0x08: '混凝土搅拌车',
  0x09: '出租车', 0x0A: '公交车', 0x0B: '校车', 0x0C: '旅游客车',
  0x0D: '长途客车', 0x0E: '农用车', 0x0F: '摩托车',
  0x10: '三轮车', 0x11: '拖拉机', 0x12: '轮式机械', 0x13: '其他',
};

export const VEHICLE_TYPE = {
  0x01: '客车', 0x02: '货车', 0x03: '危险品运输车', 0x04: '牵引车',
  0x09: '工程车', 0x10: '平板车', 0x11: '罐车', 0x12: '混凝土搅拌车',
  0x20: '小型客车', 0x21: '小型货车', 0x30: '出租车', 0x40: '校车',
  0x50: '公交车', 0x90: '其他',
};

export const MEDIA_TYPE = { 0: '图像', 1: '音频', 2: '视频', 3: '其他' };

export const EVENT_TYPE = {
  0x01: '超速报警', 0x02: '疲劳驾驶', 0x03: '急加速', 0x04: '急减速',
  0x05: '急转弯', 0x06: '碰撞', 0x07: '侧翻', 0x08: '非法点火',
  0x09: '非法位移', 0x10: '超时停车', 0x11: '进出区域', 0x12: '进出路线',
  0x13: '路段行驶时间不足', 0x14: '路段行驶时间过长', 0x15: '路线偏离',
  0x20: '点火', 0x21: '熄火', 0x22: '空车', 0x23: '重车',
  0x24: '开门', 0x25: '关门',
};

/* ================ 苏标/粤标 ADAS(0x11) 与 DSM(0x12) 报警类型 ================ */
export const ADAS_ALARM = {
  0x01: '前碰撞预警(FCW)', 0x02: '车道偏离预警(LDW)', 0x03: '车距过近预警(HMW)',
  0x04: '行人碰撞预警(PCW)', 0x05: '频繁变道预警', 0x06: '道路标识超限预警',
  0x07: '障碍物预警', 0x08: '驾驶辅助功能失效', 0x09: '前方车辆行驶预警',
  0x0A: '行人识别预警', 0x0B: '左转预警', 0x0C: '右转预警', 0x0D: '前方行人预警',
  0x10: '低速预警', 0x11: '前车溜车预警', 0x12: '前车静止预警',
};

export const DSM_ALARM = {
  0x01: '疲劳驾驶(生理)', 0x02: '接打电话', 0x03: '抽烟', 0x04: '分神驾驶',
  0x05: '驾驶员异常', 0x06: '驾驶员身份识别', 0x07: '未系安全带',
  0x08: '手离方向盘', 0x09: '遮挡摄像头', 0x0A: '换人驾驶',
  0x0B: '红外阻挡', 0x0C: '疲劳驾驶(累计)', 0x0D: '疑似疲劳',
  0x0E: '饮水', 0x0F: '吃东西', 0x10: '左顾右盼',
};

export const OVERSpeed_TYPE = {
  0: '无特定位置信息', 1: '圆形区域', 2: '矩形区域', 3: '多边形区域', 4: '路段',
};

export const AREA_TYPE = {
  0: '圆形区域', 1: '矩形区域', 2: '多边形区域', 3: '路段',
};

export const PHONE_TYPE = {
  0: '呼入', 1: '呼出', 2: '呼入/呼出', 3: '呼入(按键)', 4: '呼出(按键)',
};

/* ================= 809 相关枚举 ================= */
export const S809_LOGIN_RESULT = {
  0: '成功', 1: 'IP 地址不正确', 2: '接入码不正确', 3: '用户没注册',
  4: '密码错误', 5: '资源紧张，稍后再连接(已经占用)',
  6: '其他错误', 7: '下级平台已存在主链路连接',
};

export const S809_LOGIN_TYPE = { 1: '主链路', 2: '从链路' };
export const S809_ENCRYPT = { 0: '不加密', 1: 'RSA 加密' };

export const S809_MSGTYPE = {
  1: '上行(下级平台到上级平台)', 2: '下行(上级平台到下级平台)',
};

/* ============== 终端状态 / 注册应答 / 事件枚举 ============== */
export const RESULT_CODE = {
  0: '成功/确认', 1: '失败', 2: '消息有误', 3: '不支持', 4: '报警处理确认',
};

export const REG_RESULT = {
  0: '成功', 1: '车辆已被注册', 2: '数据库中无该车辆',
  3: '终端已被注册', 4: '数据库中无该终端',
};

export const UPGRADE_RESULT = {
  0: '成功', 1: '失败', 2: '升级包错误', 3: '版本不支持',
  4: '升级包与终端不匹配', 5: '其他',
};

export const UPGRADE_TYPE = {
  0: '终端固件', 1: '终端应用', 2: '其他', 12: '道路运输证 IC 卡读卡器',
  52: '北斗定位模块', 53: 'GNSS 模块',
};

export const PLATE_FORMAT = {
  0: '无', 1: '数字/字母', 2: '中文', 3: '其他',
};

export const NET_TYPE = { 0: '2G', 1: '3G', 2: '4G', 3: '5G', 15: '其他' };

export const IMEI_ERR = { 0: '正常', 1: '越界', 2: '无效' };

/* ====================== 转义 / 常量 ====================== */
export const FLAG_BIT = 0x7E;
export const ESCAPE_BIT = 0x7D;
export const ESCAPE_7E = 0x02;
export const ESCAPE_7D = 0x01;

export const MSG_VERSION = { 0: '2011', 1: '2013', 2: '2019' };

/* 分页/流水号等 */
export const BCD_PLATE_COLORS = COLOR_LABEL;
