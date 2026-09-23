import * as D from '../src/dict.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const tplPath = path.join(__dir, 'JT808-809协议参考.template.html');
const outPath = path.join(__dir, 'JT808-809协议参考.html');

const data = {
  MSG_808: D.MSG_808,
  MSG_809: D.MSG_809,
  SUBIZ_809: D.SUBIZ_809,
  SUBIZ_ALARM_RESULT: D.SUBIZ_ALARM_RESULT,
  ALARM_WARN_TYPE: D.ALARM_WARN_TYPE,
  LOCATION_EXTRAS: D.LOCATION_EXTRAS,
  ALARM_FLAGS: D.ALARM_FLAGS,
  STATUS_FLAGS: D.STATUS_FLAGS,
  PLATE_COLOR: D.PLATE_COLOR,
  VEHICLE_TYPE: D.VEHICLE_TYPE,
  MSG_VERSION: D.MSG_VERSION,
  REG_RESULT: D.REG_RESULT,
};
const json = JSON.stringify(data);
const tpl = fs.readFileSync(tplPath, 'utf8');
const marker = '/*__DATA__*/';
if (!tpl.includes(marker)) { console.error('marker missing'); process.exit(1); }
const out = tpl.replace(marker, 'const PROTO = ' + json + ';');
fs.writeFileSync(outPath, out, 'utf8');
console.log('generated:', outPath, out.length, 'bytes');
