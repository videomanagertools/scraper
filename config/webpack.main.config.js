const baseConfig = require("./webpack.config.base");
const merge = require("webpack-merge");
module.exports = merge.smart(baseConfig, {
  entry: "./src/main/main.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|.webpack)/,
        loaders: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
});
