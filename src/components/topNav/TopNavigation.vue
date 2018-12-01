<template>
  <div class="top-navigation">
    <mu-appbar style="width: 100%;" color="#FB7299" text-color="#fff" z-depth="0">
      <mu-avatar :size="24" slot="left" @click="showSetDrawer(true)">
        <img src="../../assets/img/bili_default_avatar.png" v-show="!loginIn">
        <img src="../../assets/img/userImg.jpeg" v-show="loginIn">
      </mu-avatar>
      <div class="title" v-show="headerTitle !== '首页'">{{headerTitle}}</div>
      <div class="search" v-show="headerTitle === '首页'" @click="showSearch()"></div>
      <div class="icon" slot="right">
        <div v-if="headerTitle === '首页'">
          <span class="icon-game" @click="showSet('游戏中心')"></span>
          <span class="icon-down" @click="showOffline"></span>
          <span class="icon-news" @click="showSet('消息')"></span>
        </div>
        <div v-else-if="headerTitle === '频道'">
          <span></span>
          <span class="icon-down" @click="showOffline"></span>
          <span class="icon-search" @click="showSearch()"></span>
        </div>
        <div v-else-if="headerTitle === '动态'">
          <span class="icon-edit" @click="showSet('编辑动态')"></span>
        </div>
        <div v-else>
          <span class="icon-cart" @click="showSet('订单中心')"></span>
          <span class="icon-info" @click="showSet('会员购物中心')"></span>
        </div>
      </div>
    </mu-appbar>
  </div>
</template>

<script>
  import {TOGGLE_SET_DRAWER, TOGGLE_SEARCH, TOGGLE_OFFLINE} from '../../store/mutation-types'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'TopNavigation',
    computed: {
      ...mapState(['headerTitle', 'isSearch', 'loginIn'])
    },
    methods: {
      ...mapMutations({
        showSetDrawer: TOGGLE_SET_DRAWER,
        changeSearch: TOGGLE_SEARCH,
        changeOffline: TOGGLE_OFFLINE
      }),
      ...mapActions(['getSetDrawer']),
      showSearch() {
        this.changeSearch(true)
      },
      showOffline() {
        this.changeOffline(true)
      },
      showSet(setData) {
        this.getSetDrawer({val: true, setData})
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .top-navigation
    .title
      text-align: center
      font-size: 18px
      font-weight: 500
    .search
      height: 30px
      border-radius: 24px
      background: rgba(0, 0, 0, 0.1) url(../../assets/img/ic_channel_search_grey.png) no-repeat 12px center
      -webkit-background-size: 18px auto
      background-size: 18px auto
    .mu-appbar
      padding-left: 22px
      background: url(../../assets/img/ic_drawer_home.png) no-repeat left center
      -webkit-background-size: 10px auto
      background-size: 8px auto
      .icon
        span
          display: inline-block
          margin: 0 10px
          width: 24px
          height: 24px
          font-size: 22px
          &.icon-down
            position: absolute
            top: 14px
            right: 36px
            font-size: 20px
          &.icon-game
            margin-right: 80px
          &.icon-search, &.icon-news
            vertical-align: middle
            position: absolute
            top: 14px
            right: 0
          &.icon-news
            font-size: 20px
          &.icon-edit
            font-size: 20px
</style>
