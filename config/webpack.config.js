const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { joinPath } = require("./utils");
const getCSSModuleLocalIdent = require("./getCSSModuleLocalIdent");
const StatoscopeWebpackPlugin = require("@statoscope/webpack-plugin").default;
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = function () {
  const isEnvDevelopment = process.env.NODE_ENV === "development";
  const isEnvProduction = process.env.NODE_ENV === "production";
  const isStatoscope = process.env.STATOSCOPE === "true";
  const isAnalyzer = process.env.ANALYZER === "true";

  return {
    profile: true,
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
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 10_000,
            },
          },
        },
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
      // 性能分析 start
      isStatoscope && new StatoscopeWebpackPlugin(),
      isAnalyzer && new BundleAnalyzerPlugin(),
      // 性能分析 end
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: {
            idHint: "",
            reuseExistingChunk: true,
            minChunks: 2,
            priority: -20,
          },
          defaultVendors: {
            idHint: "vendors",
            reuseExistingChunk: true,
            test: /[\\/]node_modules[\\/]/i,
            priority: -10,
          },
        },
      },
      minimize: isEnvProduction,
    },

    devServer: {
      // 这个配置确保了当服务器接收到未知请求时，它会返回应用程序的 index.html 文件，从而使 React Router 能够处理路由。
      historyApiFallback: true,
    },
  };
};
