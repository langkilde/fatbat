const filePath = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');

const PATHS = {
  root: filePath.resolve(__dirname, '..'),
  nodeModules: filePath.resolve(__dirname, '../node_modules'),
  src: filePath.resolve(__dirname, '../src'),
  build: filePath.resolve(__dirname, '../build'),
  style: filePath.resolve(__dirname, '../src/style'),
  images: filePath.resolve(__dirname, '../src/images')
};

const DEV_SERVER = {
  historyApiFallback: true,
  overlay: true,
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
};

interface env {
  build?: string;
  sourceMap?: string;
  awesome?: string;
}

module.exports = (env: env = {}) => {
  console.log({ env });
  const isBuild = !!env.build;
  const isDev = !env.build;
  const isSourceMap = !!env.sourceMap || isDev;

  return {
    cache: true,
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: DEV_SERVER,

    context: PATHS.root,

    entry: {
      app: [
        // 'react-hot-loader/patch',
        './src/index.tsx',
      ],
    },
    output: {
      path: PATHS.build,
      filename: isDev ? '[name].js' : '[name].[hash].js',
      publicPath: '/',
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      modules: ['src', 'node_modules'],
    },
    
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: PATHS.src,
          loader: (env.awesome ?
              [
                {
                  loader: 'awesome-typescript-loader',
                  options: {
                    transpileOnly: true,
                    useTranspileModule: false,
                    sourceMap: isSourceMap,
                  },
                },
              ] : [
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                    compilerOptions: {
                      'sourceMap': isSourceMap,
                      'target': isDev ? 'es2015' : 'es5',
                      'isolatedModules': true,
                      'noEmitOnError': false,
                    },
                  },
                },
              ]
          ),
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.json$/,
          include: [PATHS.src],
          loader: { loader: 'json-loader' },
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
            'file-loader?hash=sha512&limit=1000&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
          ]
        }
      ],
    },
    plugins: [
      StyleLintPlugin(),
      new ExtractTextPlugin('style.css'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module: any) => module.context && module.context.indexOf('node_modules') !== -1,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
      }),
      ...(isDev ? [
        new webpack.NamedModulesPlugin(),
        new DashboardPlugin(),
      ] : []),
      ...(isBuild ? [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          compress: {
            screw_ie8: true,
            warnings: false
          },
          comments: false,
          sourceMap: isSourceMap,
        }),
        new HtmlWebpackPlugin({
          template: './index.html',
        }),
      ] : []),
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

};
