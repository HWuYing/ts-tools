"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _webpackNodeExternals = _interopRequireDefault(require("webpack-node-externals"));
var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _path = _interopRequireDefault(require("path"));
var _webpack = _interopRequireWildcard(require("../base/webpack.config"));
var _util = require("../../core/util");
var _config = require("../config");function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const jsRules = (0, _util.jsLoader)({ options: _config.babellrc });
const _mergeServerConfig = (0, _webpack.getMergeConfig)(`webpack.server.js`, jsRules, undefined) || {};
const { entry = {
    server: _path.default.resolve(_config.srcDir, 'server/index.ts') },
  isNodExternals } = _mergeServerConfig;var _default =

() => (0, _webpackMerge.default)(_webpack.default, {
  target: 'node',
  context: _config.baseDir,
  entry,
  output: {
    path: _config.buildDir,
    chunkFilename: `[name].check.[hash:8].js`,
    filename: `[name].js`,
    library: 'commonjs2' },

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [new TsconfigPathsPlugin({})] },

  externals: isNodExternals !== false ? [(0, _webpackNodeExternals.default)()] : [],
  module: {
    rules: [
    jsRules.babel(),
    jsRules.ts({
      transpileOnly: true,
      context: _config.baseDir,
      configFile: 'tsconfig.json' })] },



  plugins: [
  ...(0, _webpack.copyPlugin)(_path.default.join(_config.baseDir, '.env'), _path.default.join(_config.buildDir))],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false } },

(0, _webpack.filterAttr)(_mergeServerConfig, ['isNodExternals']));exports.default = _default;