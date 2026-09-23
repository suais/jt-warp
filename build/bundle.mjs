/*!
 * 将 src/parser.js + src/dict.js 打包为单文件浏览器脚本 build/parser.bundle.js
 * 运行： node build/bundle.mjs
 * 产物为 IIFE，挂载 globalThis.JT808 = { parse, buildFrame, ... }
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

let dict = fs.readFileSync(path.join(root, 'src/dict.js'), 'utf8');
let parser = fs.readFileSync(path.join(root, 'src/parser.js'), 'utf8');

const strip = (src) =>
  src
    // 去掉 import 语句
    .replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    // 去掉 export 关键字（保留 export const/function/class 的定义）
    .replace(/^export\s+(const|let|var|function|class|async)\s/gm, '$1 ')
    .replace(/^export\s*\{[^}]*\};?\s*$/gm, '')
    .replace(/^export\s+default\s+/gm, 'const __default__ = ');

const banner = `/*!
 * JT/T 808-2011/2013/2019 & JT/T 809 报文解析引擎（浏览器单文件版）
 * 由 build/bundle.mjs 自动生成，请勿直接修改。
 * 源码： src/dict.js  +  src/parser.js
 */
(function (global) {
'use strict';

`;

const exports = `
/* ---------------- 对外接口 ---------------- */
global.JT808 = {
  parse, buildFrame, hexToBytes, bytesToHex, toHex: bytesToHex,
  escape, unescape, xorChecksum, decodeGBK,
  parseHeader, mkField: f,
  scanEmbedded, parseRawBody, findHeadPlate,
  SUBIZ_809, SUBIZ_ALARM_RESULT, ALARM_WARN_TYPE,
  ADAS_ALARM_ACTIVE, DSM_ALARM_ACTIVE,
};})(typeof globalThis !== 'undefined' ? globalThis : window);
`;

const body = strip(dict) + '\n\n' + strip(parser);

const out = banner + body + exports;
fs.mkdirSync(path.join(root, 'build'), { recursive: true });
fs.writeFileSync(path.join(root, 'build/parser.bundle.js'), out, 'utf8');

// 语法检查
console.log('bundle 已生成：build/parser.bundle.js');
console.log('字节数：', Buffer.byteLength(out, 'utf8'));
