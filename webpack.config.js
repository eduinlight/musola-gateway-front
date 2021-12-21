const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const BrotliPlugin = require("brotli-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config();
// const WorkboxPlugin = require('workbox-webpack-plugin');

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;
const PORT = process.env.PORT;

const devServer = {
  https: false,
  contentBase: "./public",
  hot: true,
  host: "localhost",
  open: true,
  writeToDisk: true,
  port: PORT,
  historyApiFallback: true
};

const optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors",
        chunks: "all"
      }
    }
  },
  usedExports: true,
  minimize: true,
  minimizer: [
    new TerserPlugin({
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};

const plugins = [
  // DEV PLUGINS
  isDev && new webpack.HotModuleReplacementPlugin(),
  isDev && new ReactRefreshWebpackPlugin(),
  // PROD PLUGINS
  isProd &&
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  isProd &&
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  isProd &&
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  // COMMON PLUGINS
  new HtmlWebPackPlugin({
    template: path.resolve(__dirname, "public/index.html"),
    filename: "index.html"
  }),
  new Dotenv({
    path: "./.env",
    safe: true,
    allowEmptyValues: true,
    systemvars: true,
    silent: true,
    defaults: false
  }),
  new CleanWebpackPlugin({
    cleanStaleWebpackAssets: false
  }),
  new CopyPlugin({
    patterns: [
      { from: "../public/robots.txt", to: "robots.txt" },
      { from: "../public/favicon.ico", to: "favicon.ico" },
      { from: "../public/manifest.json", to: "manifest.json" },
      { from: "../public/logo512.png", to: "logo512.png" },
      { from: "../public/logo192.png", to: "logo192.png" }
    ]
  })
  // new WorkboxPlugin.GenerateSW({
  // these options encourage the ServiceWorkers to get in there fast
  // and not allow any straggling "old" SWs to hang around
  // clientsClaim: true,
  // skipWaiting: true,
  // }),
].filter(Boolean);

const rules = [
  {
    test: /\.[jt]sx?$/,
    use: ["babel-loader", "source-map-loader"],
    exclude: /node_modules/
  },
  {
    test: /\.(css|scss|sass)$/,
    loaders: [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      { loader: "css-loader", options: { importLoaders: 1 } },
      "sass-loader"
    ]
  },
  {
    test: /\.(png|jpg|gif)?$/,
    use: [
      {
        loader: "file-loader",
        options: {
          outputPath: "./images",
          name: "[name].[ext]"
        }
      }
    ]
  },
  {
    test: /\.svg$/,
    use: ["@svgr/webpack"]
  },
  {
    test: /\.(eot|otf|wtf|ttf|woff|woff2)?$/,
    use: [
      {
        loader: "file-loader",
        options: {
          outputPath: "./fonts",
          name: "[name].[ext]"
        }
      }
    ]
  }
];

module.exports = {
  mode: isProd ? "production" : "development",
  optimization: isProd ? optimization : undefined,
  context: path.resolve(__dirname, "./src"),
  entry: "./index.tsx",
  devtool: isDev ? "inline-source-map" : undefined,
  devServer: isDev ? devServer : undefined,
  output: {
    filename: isProd ? "[name].bundle.js" : "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".json", ".ts", ".tsx", "js"]
  },
  module: {
    rules
  },
  plugins
};
