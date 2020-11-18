"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.baseDir = exports.platformConfig = exports.babellrc = exports.existenceClient = exports.project = exports.PlatformEnum = void 0;var _path2 = _interopRequireDefault(require("path"));
var _fs = require("fs");
var _lodash = require("lodash");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const factoryConfig = str => attr => {
  if (str.indexOf(attr) === -1) return null;
  return str.replace(new RegExp(`\[\\s\\S\]*${attr}=\(\[^ \]+\)\[\\s\\S\]*`, 'g'), '$1');
};

const resolve = base => _path => _path2.default.resolve(base, _path);
const toArray = obj => Array.isArray(obj) ? obj : obj && [obj] || [];

const baseDir = process.cwd();exports.baseDir = baseDir;
const baseResolve = resolve(baseDir);
const projectPath = baseResolve('project.config.json');
const babel = baseResolve('.babelrc');let

PlatformEnum;exports.PlatformEnum = PlatformEnum;(function (PlatformEnum) {PlatformEnum["client"] = "client";PlatformEnum["server"] = "server";PlatformEnum["dll"] = "dll";PlatformEnum["serverEntry"] = "server-entry";})(PlatformEnum || (exports.PlatformEnum = PlatformEnum = {}));

















































const defaultProject = {
  root: '.',
  output: 'dist',
  sourceRoot: "src",
  nodeModules: baseResolve('node_modules'),
  isDevelopment: false,
  architect: {
    build: {
      platform: {},
      options: {
        assetsPath: 'dist/public',
        assets: [],
        styles: [] } } } };





class ProjectConfig {









  constructor(arvg = []) {_defineProperty(this, "isDevelopment", false);_defineProperty(this, "environmental", void 0);_defineProperty(this, "arvg", ``);_defineProperty(this, "getArvgConfig", factoryConfig(this.arvg));_defineProperty(this, "baseResolve", resolve(process.cwd()));_defineProperty(this, "rootResolve", void 0);_defineProperty(this, "config", void 0);
    const [command] = arvg.slice(2);
    this.arvg = arvg.join(` `);
    this.environmental = command === 'start' ? 'development' : 'build';
    this.parseArvg();
  }

  parseArvg() {
    this.environmental = this.getArvgConfig('--environmental') || this.environmental;
    this.isDevelopment = !!this.getArvgConfig('--prod');
  }

  parseConfig(config) {
    this.config = (0, _lodash.merge)({}, defaultProject, config);
    const {
      root,
      output,
      sourceRoot,
      architect } =
    this.config;

    const environmentalBuild = (0, _lodash.merge)({}, architect.build, architect[this.environmental]);

    this.rootResolve = resolve(this.baseResolve(root));
    this.config.isDevelopment = this.isDevelopment;
    this.config.root = this.baseResolve(root);
    this.config.output = this.rootResolve(output);
    this.config.sourceRoot = this.rootResolve(sourceRoot);
    architect.build = this.parseBuild(environmentalBuild);
  }

  parseBuild(build) {
    const { platform, options, configurations } = build;
    build.platform = Object.keys(platform).reduce((obj, p) => {
      const current = platform[p];
      current.options = (0, _lodash.merge)({}, options, current.options);
      current.configurations = (0, _lodash.merge)({}, configurations, current.configurations);

      const { options: pOptions, configurations: pConfigurations, builder } = current;
      const { main, styles, index, assetsPath, assets, tsConfig } = pOptions;
      const { watchFile } = current.configurations;

      !!builder && (current.builder = this.rootResolve(current.builder));
      !!index && (pOptions.index = this.rootResolve(index));
      !!tsConfig && (pOptions.tsConfig = this.rootResolve(tsConfig));
      !!assetsPath && (pOptions.assetsPath = this.rootResolve(assetsPath));
      if (p !== PlatformEnum.dll) {
        pOptions.main = toArray(main).map(f => this.rootResolve(f));
      }
      pOptions.assets = toArray(assets).map(f => this.rootResolve(f));
      pOptions.styles = toArray(styles).map(f => this.rootResolve(f));
      pConfigurations.watchFile = toArray(watchFile).map(f => this.rootResolve(f));
      return { ...obj, [p]: current };
    }, {});
    !!options.assetsPath && (options.assetsPath = this.rootResolve(options.assetsPath));
    return build;
  }

  loadProjectConfig() {
    if ((0, _fs.existsSync)(projectPath)) {
      this.parseConfig(JSON.parse((0, _fs.readFileSync)(projectPath, 'utf-8')));
    }
    return this.config;
  }

  static get existenceClient() {
    const { architect: { build: { platform } } } = this.project;
    return !(0, _lodash.isEmpty)(platform.client);
  }

  static get project() {
    if ((0, _lodash.isEmpty)(this._project)) {
      this._project = new ProjectConfig(process.argv);
      this._project.loadProjectConfig();
    }
    return this._project && this._project.config || {};
  }}_defineProperty(ProjectConfig, "_project", void 0);


const project = ProjectConfig.project;exports.project = project;

const existenceClient = ProjectConfig.existenceClient;exports.existenceClient = existenceClient;

const babellrc = (0, _fs.existsSync)(babel) && JSON.parse((0, _fs.readFileSync)(babel).toString('utf-8')) || {};exports.babellrc = babellrc;

const platformConfig = key => {
  const { root, output, isDevelopment, sourceRoot, nodeModules } = project;
  const { architect: { build: { platform } } } = project;
  const { options, configurations, builder } = platform[key] || {};
  const { index, main, styles, assets, sourceMap, assetsPath, tsConfig } = options || {};
  const { nodeExternals, browserTarget, watchFile, sourceMap: hasSourceMap } = configurations || {};
  return {
    root,
    output,
    index,
    main,
    styles,
    assets,
    builder,
    tsConfig,
    assetsPath,
    browserTarget,
    nodeExternals,
    sourceRoot,
    nodeModules,
    watchFile,
    sourceMap,
    hasSourceMap,
    isDevelopment };

};exports.platformConfig = platformConfig;