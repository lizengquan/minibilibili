'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// 引入后台ajax模块
const ajax = require('superagent')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
  before(app) {
      app.get('/api/ranking', (req, res) => { // 推荐 排行榜
        // 后台网络请求其他服务器的数据
        ajax.get('https://api.bilibili.com/x/web-interface/dynamic/index')
          // .send({info, userid, key}) // 发送信息
          .end((err, data) => { // 返回的信息
            if(err) {
              console.log(err)
            }
            res.json({
              data: data
            })
          })
      })
      app.get('/api/search', (req, res) => { // 搜索
        // 后台网络请求其他服务器的数据
        ajax.get('https://www.bilibili.com/search?action=hotword&main_ver=v1')
          .end((err, data) => { // 返回的信息
            if(err) {
              console.log(err)
            }
            res.json({
              // data: data.text
              data: data.text
            })
          })
      })
      app.get('/api/animation', (req, res) => { // 动画分区
        // req.query = {id: 123,msg: 'hello'}
        let tid = req.query.id // 168
        let pn = req.query.n // 1
        // 后台网络请求其他服务器的数据
        ajax.get('https://api.bilibili.com/archive_rank/getarchiverankbypartion?' + `tid=${tid}&pn=${pn}`)
          // .send({info, userid, key}) // 发送信息
          .end((err, data) => { // 返回的信息
            if(err) {
              console.log(err)
            }
            res.json({
              // data: data.text
              data: data.text
            })
          })
      })
      // http://localhost:8080/api/playurl?aid=8626597
      app.get('/api/playurl', (req, res) => { // av号对应的视频资源
        // 后台网络请求其他服务器的数据
        let oid = req.query.aid
        ajax.get('https://api.bilibili.com/playurl?' + `callback=callbackfunction&aid=${oid}&page=1&platform=html5&quality=1&vtype=mp4`)
          .end((err, data) => { // 返回的信息
            if(err) {
              console.log(err)
            }
            res.json({
              // data: data.text
              data: data
            })
          })
      })
      // http://localhost:8080/api/comment?aid=8626597
      app.get('/api/comment', (req, res) => { // av号对应的视频评论列表
        // 后台网络请求其他服务器的数据
        let oid = req.query.aid
        ajax.get('https://api.bilibili.com/x/v2/reply?' + `type=1&sort=2&oid=${oid}&pn=1&nohot=1`)
          .end((err, data) => { // 返回的信息
            if(err) {
              console.log(err)
            }
            res.json({
              // data: data.text
              data: data.text
            })
          })
      })
      // https://api.bilibili.com/x/web-interface/ranking?rid=160&day=3
      app.get('/api/category', (req, res) => { // av号对应的视频评论列表
        // 后台网络请求其他服务器的数据
        let rid = req.query.rid
        ajax.get('https://api.bilibili.com/x/web-interface/ranking?' + `rid=${rid}&day=3`)
          .end((err, data) => { // 返回的信息
            if(err) {
              console.log(err)
            }
            res.json({
              // data: data.text
              data: data.text
            })
          })
      })
      app.get('/api/banner', (req, res) => {
        ajax.get('https://api.bilibili.com/x/web-show/res/loc?pf=7&id=1695')
          .end((err, data) => {
            if (err) {
              console.log(err)
            }
            res.json({
              data: data.text
            })
          })
      })
      // https://comment.bilibili.com/' + cid + '.xml
      // 'https://api.bilibili.com/x/v1/dm/list.so?oid=' + cid bilibili弹幕获取api
      app.get('/api/barrage', (req, res) => { // av号对应的视频弹幕列表
        // 后台网络请求其他服务器的数据
        let cid = req.query.cid // 62978856
        ajax.get('https://api.bilibili.com/x/v1/dm/list.so?oid=62978856')
          .end((err, data) => { // 返回的信息
            if(err) {
              console.log(err)
            }
            res.json({
              // data: data.text
              data: data
            })
          })
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: {
      "/api": {
        target: "https://api.bilibili.com/x/web-show/res/loc?pf=7&id=1695",
        pathRewrite: {"^/api" : ""}
      }
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
