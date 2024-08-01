const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { joinPath } = require("./utils");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    clean: true,
    filename: "bundle.js",
    path: joinPath("../dist"),
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body", // 将所有资源注入到 <body> 标签中
    }),
  ],
};
