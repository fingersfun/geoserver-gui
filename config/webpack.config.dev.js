const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  entry: {
    index: ["react-hot-loader/patch", "./src/index.js"],
  },
  output: {
    path: path.resolve(path.dirname(__dirname), "assets"),
    filename: "[name].[fullhash].dev.js",
    publicPath: "http://localhost:9000/assets/",
    chunkFilename: "[name].[id].js",
  }, // output
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@portal": path.resolve(__dirname, "../src"),
    },
    mainFields: ["module", "main"],
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      name: "vendor",
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules|zip/,
        include: path.join(path.dirname(__dirname), "src"),
      }, //JSX and JS -> babel-loader

      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },

      {
        test: /\.less$/,
        exclude: /zip/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "less-loader" },
        ],
      }, // less -> css

      {
        test: /antd\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        ],
      }, // antd.less -> css

      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      }, // Images -> url
    ], // rules
  }, // module
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new ESLintPlugin({
      context: path.join(path.dirname(__dirname), "src"),
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["index"],
      hash: true,
    }), // HTML plugin - portal
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      PATH_PREFIX: JSON.stringify(""),
      GEOSERVER: JSON.stringify("http://localhost:8080/geoserver"),
    }), // Define plugin
    // Copy Cesium Assets, Widgets, and Workers to a static directory
  ], //plugins
  devServer: {
    contentBase: path.join(__dirname, "assets"),
    historyApiFallback: {
      rewrites: [{ from: /^\//, to: "/assets/index.html" }], // rewrites
    },
    compress: true,
    hot: true,
    disableHostCheck: true,
    port: 9000,
    host: "0.0.0.0",
    public: "http://localhost:9000",
    publicPath: "/assets",
    serveIndex: true,
    sockPath: "/socket",
  }, // devServer
};
