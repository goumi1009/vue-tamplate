const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.vue', '.js'], //생략하고싶은 확장자
    alias: {
      '~': path.resolve(__dirname, 'src'), // 경로별칭을 이용해 절대경로로 지정해주기 유지보수에 도움이됨 루트경로로 만들어주는거지
    },
  },
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 결과가 만들어지는 파일 경로
    publicPath: '/',
    clean: true, //번들링 결과에 필요없는 파일은 지워짐 내가 맘대로 막추가해놔도 결국 다시번들링하면 지워지게되어있지
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader', 
          'css-loader', 
          'postcss-loader',
          'sass-loader'
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],
  devServer:{
    historyApiFallback: true
  }
};
