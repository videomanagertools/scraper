const baseConfig = require("./webpack.config.base");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = merge.smart(baseConfig, {
  devtool: "source-map",
  mode: "production",
  target: "electron-renderer",
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        cache: true
      })
    ]
  }
});
