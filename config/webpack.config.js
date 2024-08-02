const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { joinPath } = require("./utils");
const getCSSModuleLocalIdent = require("./getCSSModuleLocalIdent");

module.exports = function () {
  const isEnvDevelopment = process.env.NODE_ENV === "development";
  const isEnvProduction = process.env.NODE_ENV === "production";

  return {
    mode: isEnvProduction ? "production" : "development",
    devtool: isEnvProduction
      ? "nosources-source-map"
      : "cheap-module-source-map",
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
          // Handle node_modules packages that contain sourcemaps
          enforce: "pre",
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: "source-map-loader",
        },
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
          use: [
            isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.scss$/i,
          exclude: /\.module\.s[ac]ss$/,
          use: [
            isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.module\.s[ac]ss$/i,
          use: [
            isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                esModule: true,
                sourceMap: true,
                modules: {
                  mode: "local",
                  getLocalIdent: getCSSModuleLocalIdent,
                  namedExport: true,
                  exportGlobals: true,
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: "body", // 将所有资源注入到 <body> 标签中
      }),
      isEnvDevelopment &&
        new ESLintPlugin({
          extensions: ["js", "jsx", "ts", "tsx"],
          overrideConfigFile: joinPath("../.eslintrc.js"),
          emitWarning: true,
        }),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
          chunkFilename: "[id].[contenthash].css",
          // filename: () => `${count++}.css`,
          // chunkFilename: () => `${count++}.css`,
        }),
    ].filter(Boolean),
  };
};
