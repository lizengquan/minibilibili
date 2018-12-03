<template>
  <div class="dynamic">
    <div class="header">
      <top-navigation></top-navigation>
    </div>
    <div class="noLogin" v-show="!loginIn">
      <div class="bgImg">
        <img src="../../assets/img/bilipay_tip_empty.png" width="100%">
      </div>
      <div class="title">你还没有登录哦~</div>
      <div class="title">赶快登录打开新世界的大门</div>
      <div class="login-btn" @click="showLogin(true)">
        <mu-button flat text-color="#fff">登录</mu-button>
      </div>
    </div>
    <div class="container" v-show="loginIn">
      <mu-tabs :value.sync="active" inverse color="#fb7299" indicator-color="#fb7299" text-color="#757575" center @change="changeTab(active)">
        <mu-tab @click="sidle(0)">视频</mu-tab>
        <mu-tab @click="sidle(1)">综合</mu-tab>
        <mu-tab @click="sidle(2)">热门</mu-tab>
      </mu-tabs>
      <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
              <dynamic-list :strNum="strNum"></dynamic-list>
            </div>
            <div class="swiper-slide">
              <dynamic-list :strNum="strNum"></dynamic-list>
            </div>
            <div class="swiper-slide">
              <dynamic-list :strNum="strNum"></dynamic-list>
            </div>
        </div>
      </div>
<!--       <div class="demo-text" v-if="active === 0">
        <dynamic-list :strNum="strNum"></dynamic-list>
      </div>
      <div class="demo-text" v-if="active === 1">
          <dynamic-list :strNum="strNum"></dynamic-list>
      </div>
      <div class="demo-text" v-if="active === 2">
        <dynamic-list :strNum="strNum"></dynamic-list>
      </div> -->
    </div>
  </div>
</template>

<script>
  import TopNavigation from '../topNav/TopNavigation'
  import {mapState, mapMutations} from 'vuex'
  import {TOGGLE_LOGIN} from '../../store/mutation-types'
  import DynamicList from './DynamicList'
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper'

  export default {
    name: 'DynamicView',
    created() {
      this.$nextTick(() => {
        let _this = this
        this.mySwiper = new Swiper(this.$refs.swiper, {
          autoHeight: true, // 自动适应高度
          init: false, // 未初始化
          on: {
            slideChange() {
              // console.log(this.activeIndex) // 活动的索引值
              if (this.activeIndex === 0) {
                _this.active = 0
                _this.strNum = '13'
              } else if (this.activeIndex === 1) {
                _this.active = 1
                _this.strNum = '1'
              } else {
                _this.active = 2
                _this.strNum = '181'
              }
            }
          }
        })
      })
    },
    updated() { // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
      this.mySwiper.init() // 现在才初始化swiper
    },
    data() {
      return {
        active: 0,
        strNum: '13'
      }
    },
    computed: {
      ...mapState({
        loginIn: 'loginIn'
      })
    },
    methods: {
      ...mapMutations({
        showLogin: TOGGLE_LOGIN
      }),
      changeTab(val) {
        // console.log(val)
        switch (val) {
          case 0:
            this.strNum = '13'
            break
          case 1:
            this.strNum = '1'
            break
          default:
            this.strNum = '181'
            break
        }
      },
      sidle(val) {
        // console.log(val)
        this.mySwiper.slideTo(val, 1000, false)
      }
    },
    components: {
      TopNavigation,
      DynamicList
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .dynamic
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 56px
    .noLogin
      width: 70%
      margin: 25% auto 0
      .bgImg
        margin-bottom: 16px
      .title
        text-align: center
        font-size: 16px
        color: #b7bbbf
      .login-btn
        margin-top: 30px
        width: 100%
        text-align: center
        button
          width: 50%
          padding: 20px 0
          background: #FB7299
    .container
      width: 100%
      height: 100%
      .swiper-container
        width: 100%
        height: 100%
        .swiper-wrapper
          width: 100%
          height: 100%
          .swiper-slide
            width: 100%
            height: 100%
</style>
