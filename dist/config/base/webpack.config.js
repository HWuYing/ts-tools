"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.copyPlugin = exports.filterAttr = exports.getMergeConfig = void 0;var _fs = require("fs");

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _config = _interopRequireDefault(require("../config"));
var _fs2 = require("../../core/fs");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const { baseDir, isDebug, webpackDir } = _config.default;
const webpackDirConfig = webpackDir || 'webpack';

const getMergeConfig = (fileName, jsRules, cssRules) => {
  const mergeClientConfig = (0, _fs2.requireSync)(`${baseDir}/${webpackDirConfig}/${fileName}`);
  return (typeof mergeClientConfig === 'function' ? mergeClientConfig : () => mergeClientConfig || {})(jsRules, cssRules, isDebug);
};exports.getMergeConfig = getMergeConfig;

const filterAttr = (mergeConfig, filter) => {
  const config = {};
  Object.keys(mergeConfig || {}).filter(key => !filter.includes(key)).forEach(key => config[key] = mergeConfig[key]);
  return config;
};exports.filterAttr = filterAttr;

const copyPlugin = (formFile, toFile) => {
  const files = (Array.isArray(formFile) ? formFile : [formFile]).reduce((copyArr, filePath) => {
    if ((0, _fs.existsSync)(filePath)) {
      copyArr.push({ from: filePath, to: toFile });
    }
    return copyArr;
  }, []);
  return (0, _fs.existsSync)(toFile) && files.length && [new _copyWebpackPlugin.default({ patterns: files })] || [];
};exports.copyPlugin = copyPlugin;var _default =

{
  mode: 'production',
  context: baseDir,
  stats: {
    colors: true,
    hash: true, // required by custom stat output
    timings: true, // required by custom stat output
    chunks: true, // required by custom stat output
    chunkModules: false,
    modules: false,
    reasons: false,
    warnings: true,
    errors: true,
    assets: true, // required by custom stat output
    version: false,
    errorDetails: false,
    moduleTrace: false } };exports.default = _default;