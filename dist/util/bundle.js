"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.webpackRun = webpackRun;exports.default = exports.isRun = void 0;var _webpack = _interopRequireDefault(require("webpack"));
var _config = require("../config");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}


const { runClient } = _config.config;

const isRun = webpackconfig => {
  return Array.isArray(webpackconfig.entry) ? !!webpackconfig.entry.length : !!Object.keys(webpackconfig.entry).length;
};exports.isRun = isRun;

function webpackRun(webpackconfig, _stast) {
  if (Array.isArray(webpackconfig)) {
    return Promise.all(webpackconfig.map(config => webpackRun(config, config.stats)));
  }
  return new Promise((resolve, reject) => {
    if (!isRun(webpackconfig)) {
      return resolve();
    }
    const multiCompiler = (0, _webpack.default)(webpackconfig);
    multiCompiler.run((err, stats) => {
      if (err) {
        return reject();
      }
      console.info(stats.toString(webpackconfig.stats || _stast));
      resolve();
    });
  });
}var _default = /*#__PURE__*/_asyncToGenerator(

function* () {
  return webpackRun((0, _config.webpackDll)()).then(() => webpackRun([
  (0, _config.webpackServerEntry)(),
  ...(runClient ? [(0, _config.webpackClient)()] : [])])).
  then(() => webpackRun((0, _config.webpackServer)()));
});exports.default = _default;