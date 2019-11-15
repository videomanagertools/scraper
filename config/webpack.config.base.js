/**
 * Base webpack config used across other specific configs
 */

const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        use: "node-loader"
      },
      {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: "@marshallofsound/webpack-asset-relocator-loader",
          options: {
            outputAssetBase: "native_modules"
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|.webpack)/,
        loaders: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.global\.(less)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /^((?!\.global).)*\.(less)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: "less-loader"
          }
        ]
      }
    ]
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: [".ts", ".tsx", ".less", ".js", ".css", ".json"],
    alias: {
      "@actions": path.resolve(__dirname, "../src/renderer/actions"),
      "@types": path.resolve(__dirname, "../src/renderer/types"),
      "@components": path.resolve(__dirname, "../src/renderer/components"),
      "@constants": path.resolve(__dirname, "../src/renderer/constants"),
      "@utils": path.resolve(__dirname, "../src/renderer/utils"),
      "@config": path.resolve(__dirname, "../src/renderer/config-store"),
      "@scraper": path.resolve(__dirname, "../src/renderer/scraper"),
      "@lib": path.resolve(__dirname, "../src/renderer/lib")
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      FLUENTFFMPEG_COV: false
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true
    }),
    new webpack.NamedModulesPlugin()
  ]
};
