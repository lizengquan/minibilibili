import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../components/home/HomeView'
import ChannelView from '../components/channel/ChannelView'
import DynamicView from '../components/dynamic/DynamicView'
import PurchaseView from '../components/purchase/PurchaseView'
import PlayDetail from '../components/playDetail/PlayDetail'
import SwitchPlayDetail from '../components/playDetail/SwitchPlayDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/channel',
      name: 'channel',
      component: ChannelView
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: DynamicView
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: PurchaseView
    },
    {
      path: '/playDetail',
      name: 'playDetail',
      component: PlayDetail
    },
    {
      path: '/switchPlayDetail/*',
      name: 'switchPlayDetail',
      component: SwitchPlayDetail,
      redirect: {name: 'playDetail'}
    }
  ]
})
