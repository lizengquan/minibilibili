// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Muse from './muse-ui.config'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import './assets/scss/_base.scss'

// vue文件中将需要懒加载的图片绑定 v-bind:src 修改为 v-lazy
Vue.use(VueLazyLoad, {
  error: require('./assets/img/ic_upper_comment_default.png'), // 图片路径错误时加载图片
  loading: require('./assets/img/ic_upper_comment_default.png'), // 预加载图片
  preLoad: 1 // 预加载高度比例
})
Vue.use(Muse)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 直接分发action
store.dispatch('getHomeData', axios)

router.beforeEach((to, from, next) => {
  // console.log(to.name)
  store.commit('CHANGE_HEADER_TITLE', to.name)
  next()
})

router.push('home')
