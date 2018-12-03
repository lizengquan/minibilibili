<template>
  <mu-drawer :open="open" @close="hideSetDrawer(false)" :docked="false">
    <div class="set-drawer" ref="side">
      <div>
        <!-- 登录状态 -->
        <div class="side-header active" v-show="hasLoginIn()">
          <div class="bgImg">
            <mu-avatar :size="58" @click="userMsg(true)">
              <img src="../../../assets/img/userImg.jpeg">
            </mu-avatar>
            <div class="info">
              <div class="user-info">
                <span class="name">夏棋影</span>
                <span class="rank">&nbsp;LV3</span>
                <span class="member">正式会员</span>
              </div>
              <div class="coin">
                <span>B币:&nbsp;<i>0.0</i>&nbsp;</span>
                <span>硬币:&nbsp;<i>144.0</i></span>
              </div>
            </div>
          </div>
        </div>
        <!-- 未登录状态 -->
        <div class="side-header" v-show="!loginIn">
          <div class="bgImg">
            <mu-avatar :size="58" @click="Login(true)">
              <img src="../../../assets/img/bili_default_avatar.png">
            </mu-avatar>
            <div class="name">点击头像登录</div>
          </div>
        </div>
        <mu-list @change="change" :value.sync="tab">
          <div v-for="(item,index) in setDataList" :key="index">
            <mu-list-item button ripple :value="item.value">
              <mu-icon :value="item.iconVal" color="#7f7f7f"></mu-icon>
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
            </mu-list-item>
            <mu-divider v-if="item.value === 'later'"></mu-divider>
            <mu-divider v-if="item.value === 'creative'"></mu-divider>
          </div>
        </mu-list>
      </div>
    </div>
    <div class="footer">
      <div flat color="primary" class="flex-item" @click="setUp(true)">
        <mu-icon left value="settings" color="#7f7f7f"></mu-icon>
        设置
      </div>
      <div flat color="primary" class="flex-item">
        <mu-icon left value="color_lens" color="#7f7f7f"></mu-icon>
        主题
      </div>
      <div flat color="primary" class="flex-item">
        <mu-icon left value="brightness_3" color="#7f7f7f"></mu-icon>
        夜间
      </div>
      </div>
  </mu-drawer>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {TOGGLE_SET_DRAWER, TOGGLE_LOGIN, TOGGLE_HISTORY, TOGGLE_OFFLINE, TOGGLE_MY_COLLECTION, TOGGLE_SET_UP, TOGGLE_PUBLIC} from '../../../store/mutation-types'

  export default {
    created() {
      this.$nextTick(() => {
        this.sideScroll = new BScroll(this.$refs.side, {
          click: true,
          bounce: false
        })
      })
    },
    data () {
      return {
        tab: 'home',
        setDataList: [
          {value: 'home', iconVal: 'home', title: '首页'},
          {value: 'history', iconVal: 'history', title: '历史记录'},
          {value: 'offline', iconVal: 'cloud_download', title: '离线缓存'},
          {value: 'myCollection', iconVal: 'star', title: '我的收藏'},
          {value: 'later', iconVal: 'video_library', title: '稍后再看'},
          {value: 'sion', iconVal: 'cloud_upload', title: '投稿'},
          {value: 'activity', iconVal: 'assistant_photo', title: '热门活动'},
          {value: 'creative', iconVal: 'star', title: '创作中心'},
          {value: 'live', iconVal: 'star', title: '直播中心'},
          {value: 'member', iconVal: 'star', title: '我的大会员'},
          {value: 'flow', iconVal: 'wifi_tethering', title: '免流量服务'},
          {value: 'order', iconVal: 'local_grocery_store', title: '我的订单'},
          {value: 'shopping', iconVal: 'local_mall', title: '会员购中心'},
          {value: 'service', iconVal: 'headset_mic', title: '联系客服'}
        ]
      }
    },
    computed: {
      ...mapState({
        open: 'showSetDrawer',
        loginIn: 'loginIn',
        isPublic: 'isPublic'
      })
    },
    methods: {
      ...mapMutations({
        hideSetDrawer: TOGGLE_SET_DRAWER,
        Login: TOGGLE_LOGIN,
        showHistory: TOGGLE_HISTORY,
        showOffline: TOGGLE_OFFLINE,
        showMyCollection: TOGGLE_MY_COLLECTION,
        setUp: TOGGLE_SET_UP,
        showPublic: TOGGLE_PUBLIC
      }),
      ...mapActions({
        isLogin: 'hasLoginIn',
        getSetDrawer: 'getSetDrawer'
      }),
      change(val) {
        // console.log(val) // home
        this.tab = val
        this.hideSetDrawer(false)
        if (/^home$/.test(val)) {
          this.$router.push(val)
          this.showHistory(false)
          this.showOffline(false)
          this.showMyCollection(false)
          this.showPublic(false)
          return
        }
        if (/^history$/.test(val)) {
          this.showHistory(true)
          this.showOffline(false)
          this.showMyCollection(false)
          this.showPublic(false)
          return
        }
        if (/^offline$/.test(val)) {
          this.showOffline(true)
          this.showHistory(false)
          this.showMyCollection(false)
          this.showPublic(false)
          return
        }
        if (/^myCollection$/.test(val)) {
          this.showMyCollection(true)
          this.showOffline(false)
          this.showHistory(false)
          this.showPublic(false)
          return
        }
        // if (/^home$|^history$|^offline$|^myCollection$/.test(val)) {
        //   this.showPublic(false)
        //   return
        // }
        let setData = ''
        this.setDataList.forEach(item => {
          if (val === item.value) {
            setData = item.title
          }
        })
        // console.log(setData)
        this.getSetDrawer({val: true, setData})
      },
      userMsg() {
        console.log('个人主页')
      },
      hasLoginIn() { // 是否已登录
        // 获取缓存数据 用户数据
        var res = window.sessionStorage.getItem('result')
        // console.log(res)
        // 把字符串转成json对象
        var userData = JSON.parse(res)
        // userData存在 state.js中的loginIn存在
        if (userData && this.loginIn) {
          this.isLogin(true)
        } else {
          this.isLogin(false)
        }
        return this.loginIn
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .set-drawer
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 50px
    color: #333
    z-index: 10
    .side-header
      position: relative
      width: 100%
      height: 137px
      background: url(../../../assets/img/bili_drawerbg_not_logined.png) no-repeat bottom right
      -webkit-background-size: 67% auto
      background-size: 67% auto
      &.active
        background: url(../../../assets/img/bili_drawerbg_logined.png) no-repeat bottom right
        -webkit-background-size: 67% auto
        background-size: 67% auto
      .bgImg
        position: absolute
        padding: 12px 18px 0
        width: 100%
        height: 100%
        font-size: 0
        background: rgba(251, 114, 150, 0.9)
        .mu-avatar
          border: 2px solid #fff
        .name, .info
          margin-top: 10px
          font-size: 14px
          color: #fff
          .rank
            font-weight: 200
            padding: 0 2px
            font-size: 10px
            border: 2px solid #fff
            border-radius: 4px
          .member
            font-weight: 200
            font-size: 10px
            color: #fc7da1
            border: 1px solid #fff
            border-radius: 4px
            background: #fdc7d6
          .coin
            font-weight: 200
            margin-top: 4px
            color: #fdc7d6
    .mu-list
      .mu-item-title
        margin-left: 25px
  .footer
    position: fixed
    display: flex
    left: 0
    right: 0
    bottom: 0
    padding: 0 15px
    height: 50px
    line-height: 50px
    background: #fff
    z-index: 20
    .flex-item
      flex: 1
      font-size: 12px
      color: #333
      i
        display: inline-block
        width: 30px
        height: 30px
        vertical-align: middle
</style>
