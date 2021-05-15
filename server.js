// 在node中使用webpack
// 参考  node  api
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');  //webpack开发中间件

const app = express();  //创建服务器实例

// Serve the files on port 3000.
app.listen(3000, function () {   //监听端口号 可以自己定义端口号
  console.log('Example app listening on port 3000!\n');
});

const config = require('./webpack.config.js');  //引入webpack配置文件
const compiler = webpack(config);   //结合配置文件进行编译

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath   //对应webpack输出路径
}));

// http://localhost:3000/   可以打开页面
