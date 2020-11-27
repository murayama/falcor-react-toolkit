const BaseConfig = require("./webpack.config");

module.exports = {
  ...BaseConfig,
  mode: "development",
  devtool: "inline-source-map",
};
