"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _browserSync = _interopRequireDefault(require("browser-sync"));
var _config = require("../config");
var _clean = _interopRequireDefault(require("./clean"));
var _dev = _interopRequireDefault(require("../lib/dev.server"));
var _dev2 = _interopRequireDefault(require("../lib/dev.client"));
var _devServer = _interopRequireDefault(require("../lib/dev.server.entry"));
var _dev3 = _interopRequireDefault(require("../lib/dev.dll"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

const { buildDir } = _config.config;
const app = (0, _express.default)();var _default = /*#__PURE__*/_asyncToGenerator(
function* () {
  app.use(_express.default.static(_path.default.join(buildDir, 'public')));
  yield (0, _clean.default)();
  yield (0, _dev3.default)();
  yield (0, _dev2.default)(app);
  yield (0, _devServer.default)(app);
  const host = yield (0, _dev.default)(app);
  return new Promise((resolve, reject) => {
    _browserSync.default.create().init({
      ui: false,
      proxy: {
        target: host,
        middleware: app } },

    (error, bs) => error ? reject(error) : resolve(bs));
  });
});exports.default = _default;