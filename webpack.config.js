const {resolve} = require("path");
const {CheckerPlugin} = require("awesome-typescript-loader");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const VENDOR_LIBS = [
  "axios", "babel-preset-stage-1", "lodash", "path",
  "react", "react-dom", "react-redux", "react-router",
  "redux", "redux-form", "redux-thunk"
];

const webpackConfig = {
  entry: {
    bundle: './src/index.tsx',
    vendor: VENDOR_LIBS
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: [/(node_modules)/, './src/assets/*'],
      },
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'awesome-typescript-loader'],
        exclude: [/(node_modules)/, './src/assets/*']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader",
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    https: true,
    compress: true,
    clientLogLevel: "error",
    port: 8787,
    stats: {
      providedExports: false,
      chunks: false,
      hash: false,
      version: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false
    }
  },
  plugins: [
    new CheckerPlugin(),
    new StyleLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  stats: {
    providedExports: false,
    chunks: false,
    hash: false,
    version: false,
    timings: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    warnings: false,
    publicPath: false,
    silent: true
  },
  performance: {
    hints: false
  }
};

if (process.env.NODE_ENV === 'production') {
  console.log('production mode: adding uglify');
  webpackConfig.plugins.push(
    new UglifyJsPlugin({
      compress: {
        screw_ie8: true
      }
    })
  )
}

module.exports = webpackConfig;