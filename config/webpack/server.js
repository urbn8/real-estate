var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const loader = {
  babel: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0'
}

var config = {
  externals: nodeModules,
  target: 'node',

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname + '/src/app/components')
    }
  },

  entry: {
    server: ['./src/server.tsx'],
  },

  output: {
    path: path.resolve('./build/public'),
    filename: '../[name].js',
    sourceMapFilename: '../[name].js.map',
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        include: path.resolve('./src'),
        loader: loader.babel
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: path.resolve('./src'),
      },
      {
        test: /\.css$/,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.less$/,
        include: path.resolve('./src/app'),
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
          'less?sourceMap'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
          'sass?sourceMap',
        ]
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file?name=fonts/[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
      },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192' },
    ],
    // Shut off warnings about using pre-built javascript files
    // as Quill.js unfortunately ships one as its `main`.
    noParse: /node_modules\/quill\/dist/,
  },

  plugins: [],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
};

module.exports = config;
