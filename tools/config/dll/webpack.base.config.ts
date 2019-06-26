import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { Configuration, ProgressPlugin } from 'webpack';
import AssetsWebpackPlugin from 'assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { jsLoader, cssLoader } from '../../core/util';
import { requireSync } from '../../core/fs';
import config from '../config';

const { baseDir, buildDir, browserslist, babellrc: { presets, plugins }, isDebug } = config;
const mergeDllConfig = requireSync(`${baseDir}/webpack.dll.js`);

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
const cssRules = cssLoader({}, false);
const _mergeDllConfig = (typeof mergeDllConfig === 'function' ? mergeDllConfig : () => mergeDllConfig)(jsRules, cssRules, isDebug);
const assetsPlugin = new AssetsWebpackPlugin({
  filename: 'dll.json',
  path: buildDir,
  prettyPrint: true,
  update: true,
});

export default (): Configuration => merge({
  context: baseDir,
  target: 'web',
  entry: {},
  output: {
    path: path.join(buildDir, 'public'),
    filename: 'javascript/dll_[name].js',
    library: "[name]_[hash:8]",
  },
  module: {
    rules: [
      jsRules.babel({}),
      jsRules.ts({
        happyPackMode: true,
        transpileOnly: true,
        context: baseDir,
        configFile: 'ts.client.json',
      }),
      cssRules.less({
        javascriptEnabled: true,
      }),
      cssRules.css({}),
    ]
  },
  plugins: [
    assetsPlugin,
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styleSheet/[name].[hash:8].css',
      chunkFilename: 'styleSheet/[name].[chunkhash:8].css',
    }),
    new webpack.DllPlugin({
      path: path.join(buildDir, "dll-manifest.json"),
      name: "[name]_[hash:8]"
    }),
  ],
  stats: {
    colors: true,
    timings: true,
  },
}, _mergeDllConfig);