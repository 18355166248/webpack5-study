const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const joinPath = (...paths) => path.join(__dirname, ...paths);

module.exports = {
  mode: "production",
  // devtool: "eval-source-map", // 或者 'cheap-module-source-map'
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: joinPath("dist"),
  },
  resolve: {
    extensions: [".js", ".mjs", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(?:ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // Babel 加载器会自动读取 babel.config.js 的配置
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // 从右到左顺序执行，先 css-loader 再 style-loader
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body", // 将所有资源注入到 <body> 标签中
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      overrideConfigFile: joinPath(".eslintrc.js"),
      emitWarning: true,
    }),
  ],
};
