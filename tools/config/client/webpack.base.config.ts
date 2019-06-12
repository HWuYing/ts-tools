import path from 'path';
import merge from 'webpack-merge';
import { Configuration, ProgressPlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsWebpackPlugin from 'assets-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { requireSync } from '../../core/fs';
import { jsLoader, cssLoader } from '../../core/util';
import config from '../config';

const { srcDir, baseDir, buildDir, babellrc, browserslist, isDebug } = config;
const  mergeClientConfig = requireSync(`${baseDir}/webpack.client.js`);
const assetsPlugin = new AssetsWebpackPlugin({
  filename: 'assets.json',
  path: buildDir,
  prettyPrint: true,
  update: true,
});
const copyPlugin = new CopyPlugin([{ from: path.join(baseDir, 'public'), to: path.join(buildDir, 'public') }]);
const { presets, plugins } = babellrc;
const jsRules = jsLoader({
  options: {
    presets: [
      ["@babel/preset-env", {
        "targets": browserslist,
      }],
      ...(presets || []).slice(1),
    ],
    plugins: [
      ...(plugins || []),
    ],
  }
});

const extractLess = new ExtractTextPlugin(`styleSheet/[name]less.[hash:8].css`);
const extractScss = new ExtractTextPlugin(`styleSheet/[name]scss.[hash:8].css`);
const cssRules = cssLoader({}, isDebug);

export default (): Configuration => merge({
  context: baseDir,
  target: 'web',
  entry: {
    main: path.resolve(srcDir, 'app/main.ts'),
  },
  output: {
    publicPath: '',
    path: path.join(buildDir, 'public'),
    chunkFilename: `check/[name].[chunkhash:8].js`,
    filename: `javascript/[name].[hash:8].js`,
  },
  resolve: {
    modules: [path.resolve(baseDir, 'node_modules'), path.relative(baseDir, 'src')],
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      jsRules.babel({}),
      jsRules.ts({
        transpileOnly: true,
        context: baseDir,
        configFile: 'ts.client.json',
      }),
      cssRules.less({}, extractLess),
      cssRules.sass({}, extractScss),
    ],
  },
  plugins: [
    copyPlugin,
    extractLess,
    extractScss,
    new ProgressPlugin(),
    assetsPlugin,
  ],
  stats: {
    colors: true,
    timings: true,
  },
}, mergeClientConfig);
