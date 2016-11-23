'use strict';
/*eslint no-console: 0*/
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);//输出当前环境
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
var path = require('path');
const devConfig = require('./webpack.config.js');
const prodConfig = require('./webpack.config.js');
const isDeveloping = process.env.NODE_ENV === 'development';
const port = isDeveloping ? 9090 : 9090;//端口

function baseConfig(config) {
  return new webpackDevServer(webpack(config), {
    //当设置为true时，访问所有服务器上不存在的文件，都会被重定向到/，也就是index.html文件
    historyApiFallback: true,
    hot: true,
    //noInfo: true,//打印信息报错之类的
    inline: true,
    progress: true, 
    //publicPath: path.resolve(__dirname, 'build'),
    //是否压缩
    compress: false,
   
    //设置WebpackDevServer的开发目录 //以public为根目录提供文件
    contentBase: "http://localhost/",
    colors: true,// 用颜色标识
  });
}

let server;
if(isDeveloping) {
  server = baseConfig(devConfig);
  console.log("development mode...");
} else {
  server = baseConfig(prodConfig);
  console.log("production mode...");
}

server.listen(port, "localhost", function(err) {
  if(err) {
    console.log(err);
  }
  console.log('==> 🌎 Listening on ' + process.env.NODE_ENV + ' port ' + port);
});
