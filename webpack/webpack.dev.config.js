import webpack from 'webpack';
import * as common from './webpack.common.config';
import HtmlPlugin from 'html-webpack-plugin';
import path from 'path';
import fs from 'fs';
import env from './env/';

export const cache = true;
export const devtool = 'cheap-module-eval-source-map';
export const context = common.context;
export const resolve = common.resolve;

export const entry = {
  app: [
    common.clientPath,
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://${env.host}:${env.port}`
  ]
};

export const output = {
  path: common.buildPath,
  publicPath: '/',
  library: '[name]',
  filename: '[name].js',
  sourceMapFilename: '[name].map',
  chunkFilename: '[name].chunk.js'
};

export const module = {
  rules: common.module.rules.concat([
    {
      test: [/\.jsx?$/],
      include: [/src/],
      loader: 'babel-loader',
      exclude: [/node_modules/, /dist/, /server/],
      query: {
        cacheDirectory: true,
        presets: ['react-hmre', 'es2015', 'stage-0', 'react']
      }
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]-[hash:base64:4]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => common.postcss
          }
        }
      ]
    }
  ])
};

const vendorFiles = fs.readdirSync(common.buildPath).map((file) => {
  if (file.indexOf('dll.') >= 0) {
    return '/' + file;
  }
  return null;
}).filter(Boolean);

export const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"development"'
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DllReferencePlugin({
    context: common.context,
    manifest: require(`${common.dllPath}/vendor-manifest.json`)
  }),
  new HtmlPlugin({
    template: path.resolve(`${common.basePath}/templates`, 'index.ejs'),
    inject: true,
    minify: {
      collapseWhitespace: false
    },
    vendorFiles
  })
].concat(common.plugins);

export const devServer = {
  contentBase: './dist',
  historyApiFallback: true,
  hot: true,
  port: env.port,
  publicPath: `/`,
  noInfo: false
};
