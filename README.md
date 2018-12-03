# 高仿哔哩哔哩APP

> A Vue.js project

## 项目描述

实现像哔哩哔哩APP中的视频的分类及浏览

## 技术描述

1、项目使用vue全家桶(vue+vue-router+vuex+axios)，并基于Vue 2.0的Muse-UI库开发

2、使用vuex状态管理和Muse-UI库实现历史记录模块和我的收藏模块的添加删除功能

3、使用vue中的过渡类名实现组件页面显示隐藏的过渡动画效果

4、使用axios完成ajax请求并实现数据的交互，同时使用了superagent做后台代理

5、使用better-scroll实现多处页面的纵向滚动及频道分类导航栏的横向滚动，及页面的上拉加载

6、采用sass预编译语法扩展css；使用vue-lazyload懒加载图片；使用swiper实现首页轮播图

7、采用数组的filter方法实现模糊查询的功能

8、使用js的移动端触摸事件和ES6的模板字符串实现视频控件的制作及全屏显示的功能

9、使用HTML5的sessionStorage本地储存实现本地登录的实现

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 安装的三方库

``` bash
npm i vuex -S

npm i vue-router -S

npm i vue-lazyload -S

npm i axios -S

npm i vue-axios -S

npm i muse-ui -S

npm i better-scroll -S

npm i jsonp -S

npm i swiper -S

npm i sass-loader node-sass -D

npm i superagent -D
```

## 项目效果图

### 未登录

![首页01](./static/img/首页01.png)
![首页02](./static/img/首页02.png)
![首页上拉刷新](./static/img/首页上拉刷新03.png)
![频道01](./static/img/频道01.png)
![频道02](./static/img/频道02.png)
![频道03](./static/img/频道03.png)
![动态01](./static/img/动态01.png)
![购物](./static/img/购物.png)
![搜索](./static/img/搜索.png)
![视频01](./static/img/视频01.png)
![视频02](./static/img/视频02.png)
![视频03](./static/img/视频03.png)
![视频分享04](./static/img/视频分享04.png)
![视频04](./static/img/视频04.png)
![视频05](./static/img/视频05.png)
![视频06](./static/img/视频06.png)
![视频07](./static/img/视频07.png)
![视频08](./static/img/视频08.png)
![视频09](./static/img/视频09.png)
![侧栏01](./static/img/侧栏01.png)
![侧栏02](./static/img/侧栏02.png)
![侧栏02](./static/img/侧栏02.png)
![历史记录01](./static/img/历史记录01.png)
![历史记录02](./static/img/历史记录02.png)
![历史记录03](./static/img/历史记录03.png)
![历史记录04](./static/img/历史记录04.png)
![历史记录05](./static/img/历史记录05.png)
![我的收藏01](./static/img/我的收藏01.png)
![我的收藏02](./static/img/我的收藏02.png)
![我的收藏03](./static/img/我的收藏03.png)
![我的收藏04](./static/img/我的收藏04.png)



### 已注册

![登录页面](./static/img/登录01.png)
![登录页面](./static/img/登录02.png)
![注册01](./static/img/注册01.png)
![注册02](./static/img/注册02.png)
![注册03](./static/img/注册03.png)
![登录后01](./static/img/登录后01.png)
![登录后02](./static/img/登录后02.png)
![动态登录后02](./static/img/动态登录后02.png)

