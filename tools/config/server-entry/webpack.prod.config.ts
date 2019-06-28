import webpack, { HashedModuleIdsPlugin, DllReferencePlugin } from 'webpack';
import merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import { existsSync } from 'fs';
import baseConfig from './webpack.base.config';
import config from '../config';

export default () => merge(baseConfig(), {
  mode: 'production',
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new HashedModuleIdsPlugin(),
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          safari10: true,
          output: {
            ascii_only: true,
            comments: false,
            webkit: true,
          },
          compress: {
            pure_getters: true,
            passes: 3,
            inline: 3,
          }
        }
      }),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'"
    }),
  ]
});
