<template>
  <div id="app">
    <div class="top-nav">
      <!-- <top-navigation></top-navigation> -->
    </div>
    <router-view/>
    <div class="footer">
      <bottom-tab></bottom-tab>
    </div>
    <!--登录页面-->
    <login-view v-if="showLogin"></login-view>
    <!--侧栏抽屉-->
    <setting-drawer></setting-drawer>
    <!--显示历史记录-->
    <historical-records v-if="showHistory"></historical-records>
    <!--离线缓存-->
    <offline-caching v-if="showOffline"></offline-caching>
    <!-- 我的收藏 -->
    <my-collection v-if="showMyCollection"></my-collection>
    <!-- 注册账号 -->
    <SignUp v-if="showSignUp"></SignUp>
    <!-- 设置页面 -->
    <set-up v-if="showSetUp"></set-up>
    <!-- 频道列表 -->
    <channel-list v-if="showChannelList"></channel-list>
    <app-cover></app-cover>
    <share></share>
    <search v-if="isSearch"></search>
    <public-component  v-if="isPublic"></public-component>
  </div>
</template>

<script>
  import BottomTab from './components/bottomTab/BottomTab'
  import LoginView from './components/login/LoginView'
  import {mapState} from 'vuex'
  import SettingDrawer from './components/common/settingDrawer/SettingDrawer'
  import HistoricalRecords from './components/common/historicalRecords/HistoricalRecords'
  import OfflineCaching from './components/common/offlineCaching/OfflineCaching'
  import MyCollection from './components/common/myCollection/MyCollection'
  import SignUp from './components/login/SignUp.vue'
  import SetUp from './components/common/setUp/setUp'
  import ChannelList from './components/channel/ChannelList'
  import {appCover, Share} from './components/widget'
  import Search from './components/common/search/Search'
  import PublicComponent from './components/common/publicComponent/PublicComponent'

  export default {
    name: 'App',
    computed: {
      ...mapState(['showLogin', 'showSignUp', 'showHistory', 'showOffline', 'showMyCollection', 'showSetUp', 'showChannelList', 'isSearch', 'isPublic'])
    },
    components: {
      BottomTab,
      LoginView,
      SignUp,
      SettingDrawer,
      HistoricalRecords,
      OfflineCaching,
      MyCollection,
      SetUp,
      ChannelList,
      appCover,
      Share,
      Search,
      PublicComponent
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50
    .footer
      position: fixed
      left: 0
      bottom: 0
      width: 100%
      height: 48px
      border-top: 1px solid #e2e2e3
</style>
