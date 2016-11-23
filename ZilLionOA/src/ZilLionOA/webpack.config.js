var path = require('path');
var webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = 9090;
module.exports = {


    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:' + port,
        path.resolve(__dirname, 'app/main.js')
    ],

 
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash:8].js',       
        publicPath: 'build/'
    },
    plugins: [

        //把webpack 生成的文件都包含在template中并生成制定文件http://www.th7.cn/web/html-css/201605/169542.shtml
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html', //模板位置
            inject: 'body', //true | ‘head’ | ‘body’ | false 。把所有产出文件注入到给定的 template 或templateContent。当传入 true或者 ‘body’时所有javascript资源将被放置在body元素的底部，“head”则会放在head元素内。
            filename: 'index.html' //生成的文件名称
        }),
        new webpack.DefinePlugin({ //开发环境
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }), //通过配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(), //用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new OpenBrowserPlugin({
            url: 'http://localhost:' + port
        })
    ]
};