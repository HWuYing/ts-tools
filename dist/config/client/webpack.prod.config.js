"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _webpack = _interopRequireDefault(require("webpack"));
var _webpackMerge = _interopRequireDefault(require("webpack-merge"));
var _webpackBase = _interopRequireDefault(require("./webpack.base.config"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

() => (0, _webpackMerge.default)((0, _webpackBase.default)(), {
  mode: 'production',
  plugins: [
  new _webpack.default.DefinePlugin({
    'process.env.NODE_ENV': "'production'" })] });exports.default = _default;