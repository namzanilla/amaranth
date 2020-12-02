require('./src/dotenv');

const path = require('path'),
  AssetsPlugin = require('assets-webpack-plugin'),
  WebpackShellPlugin = require('webpack-shell-plugin'),
	AssetsPluginInstance = new AssetsPlugin(),
	CompressionPlugin = require('compression-webpack-plugin');

const {NODE_ENV = 'production'} = process.env;

const onBuildStart = [
  'find /var/www/projects/amaranth/static/public/js/build -name "*.gz" -type f -delete',
  'find /var/www/projects/amaranth/static/public/js/build -name "*.js" -type f -delete',
];
const plugins = [
  new WebpackShellPlugin({
    onBuildStart,
  }),
  AssetsPluginInstance,
  new CompressionPlugin({
    algorithm: 'gzip',
    compressionOptions: {level: 6},
  }),
];

const config = {
  target: 'web',
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: 'development' === NODE_ENV ? 'inline-source-map' : 'cheap-source-map',
  watch: 'development' === NODE_ENV,
  mode: NODE_ENV,
  entry: {
    app: path.resolve(__dirname, 'src', 'client.js'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.join(__dirname, '..', 'static', 'public', 'js', 'build'),
    filename: '[name].[hash].js',
  },
  plugins,
};

module.exports = config;
