const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src/falcor-react-toolkit.ts"),
  output: {
    library: "FalcorReactToolkit",
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "./dist"),
    filename: "falcor-react-toolkit.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
      umd: "react",
    },
  },
};
