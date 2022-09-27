const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              filename: 'main.css',
              chunkFilename: 'main.css',
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              filename: 'main.css',
              chunkFilename: 'main.css',
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    // new ServiceWorkerWebpackPlugin({
    //   entry: path.resolve(__dirname, 'src/scripts/service-worker.js'),
    // }),
    
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: "./sw.bundle.js",
    }),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    concatenateModules: false,
    usedExports: true,
    sideEffects: true,
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 1000,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new UglifyJsPlugin(),
    ],
  },
};