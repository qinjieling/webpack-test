const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({    //自动生成dist文件中的index.html
      title: 'Output Management'
    }),
    // new webpack.NamedModulesPlugin(), //热更新
    // new webpack.HotModuleReplacementPlugin()   //热更新
  ],
  devtool: 'inline-source-map',    //控制台的错误指向具体的文件位置  //避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
  devServer: {
    contentBase: './dist',   //实时刷新浏览器  更新dist文件代码
    port: 9000,  //npm run start 会生成页面链接：http://localhost:9000/
    proxy: {
      "/api": "http://localhost:9000"  //跨域时可用于配置代理，vue.config.js中也用到了Sevserver对象中的proxy
    },
    hot: true  //开启热更新，方便调试css
  },                                                      
  output: {                          
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'     //以确保文件资源能够在 http://localhost:3000
  },
//   output: {
//     // publicPath:'http://cdn.example.com/assets/[hash]/', //配置域名,把静态资源放在cdn域名上    例如http://cdn.example.com/assets/8ff5ecbef9757aeee4ea/main.js
//     filename: '[name].js',  //name对应entry的key值
//     path: path.resolve(__dirname, 'dist')
// },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [  //需要两个loader，所以是数组格式
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options:{
            //placeholder   占位符
            name: '[name].[ext]',    // 打包出的图片名字和源文件同名
            outputPath:'images/'   //图片打包路径
          }
        }
      },
      // {
      //   test: /\.(png|jpg|gif)$/,    
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 204800   //大于200kb的话图片会用file-loader打包    //url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};