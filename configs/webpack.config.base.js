/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies } from '../package.json';

export default {
  externals: [...Object.keys(dependencies || {})],

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          'ts-loader'
        ]
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@actions': path.resolve(__dirname, '../app/actions'),
      '@types': path.resolve(__dirname, '../app/types'),
      '@components': path.resolve(__dirname, '../app/components'),
      '@constants': path.resolve(__dirname, '../app/constants'),
      '@utils': path.resolve(__dirname, '../app/utils'),
      '@config': path.resolve(__dirname, '../app/config-store'),
      '@scraper': path.resolve(__dirname, '../app/scraper')
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin()
  ]
};
