const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8888,
    hot: true,
  },
  entry: {
    practice: './views/practice/practice.jsx',
    index: './views/index/index.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name]/[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'audio:src'],
            minimize: false,
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath(url, resourcePath) {
                const dir = path.dirname(resourcePath);
                const dirArr = dir.split(path.sep);
                const newDirArr = dirArr.slice(dirArr.length - 2);
                newDirArr.push(url);
                const outputPath = newDirArr.join('/');
                console.log('\033[40;33m outputPath===>', outputPath);
                return outputPath;
              },
              publicPath(url, resourcePath) {
                const dir = path.dirname(resourcePath);
                const dirArr = dir.split(path.sep);
                const dirName = dirArr[dirArr.length - 1];
                let publicPath;
                if (/public/.test(resourcePath)) {
                  publicPath = `../public/${dirName}/${url}`;
                } else {
                  publicPath = `./${dirName}/${url}`;
                }
                console.log('\033[40;34m publicPath===>', publicPath, '\033[0m');
                return publicPath;
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './views/practice/practice.html',
      filename: './practice/practice.html',
      chunks: ['practice'],
      hash: true,
      minify: {
        removeAttributeQuotes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: './views/index/index.html',
      filename: './index/index.html',
      chunks: ['index'],
      hash: true,
      minify: {
        removeAttributeQuotes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
