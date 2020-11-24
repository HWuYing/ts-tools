"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _fs = require("../core/fs");
var _config = require("../config");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

const outputPath = (0, _config.platformConfig)(_config.PlatformEnum.server).outputPath || (0, _config.platformConfig)(_config.PlatformEnum.client).outputPath;var _default = /*#__PURE__*/_asyncToGenerator(

function* () {
  yield (0, _fs.cleanDir)(outputPath);
});exports.default = _default;