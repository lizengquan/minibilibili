<template>
  <transition name="fade">
    <div class="sign-up" v-loading="loading" data-mu-loading-text="注册中..." data-mu-loading-color="rgb(251, 114, 153)" data-mu-loading-overlay-color="rgba(0, 0, 0, .6)">
        <div class="header">
          <mu-appbar style="width: 100%;" color="#FB7299" text-color="#fff" z-depth="1">
            <mu-button icon slot="left" flat @click="cancel(false)">
              <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            <mu-button icon slot="left" flat @click="cancel(false)">
              <mu-icon value="close"></mu-icon>
            </mu-button>
            <div class="title" slot="left">注册账号</div>
          </mu-appbar>
          <split></split>
          <mu-divider></mu-divider>
          <mu-list>
            <mu-list-item button ripple>
              <mu-list-item-title>中国大陆</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="keyboard_arrow_right" color="#b1b1b1"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
          <split></split>
          <mu-divider></mu-divider>
          <div class="inp">
            <label>
              <span>+86</span>
              <input type="text" v-model="phoneVal" placeholder="请输入常用手机号">
              <mu-icon size="12" value="close" v-show="phoneVal.length" @click="() => this.phoneVal = ''"></mu-icon>
            </label>
            <mu-divider></mu-divider>
            <label>
              <span>密码</span>
              <input type="password" v-model="passVal" placeholder="6~16个字符，区分大小写">
              <mu-icon size="12" value="close" v-show="passVal.length" @click="() => this.passVal = ''"></mu-icon>
            </label>
          </div>
          <mu-divider></mu-divider>
          <split></split>
          <div class="sign-btn">
            <mu-button full-width textColor="#fff" color="#fb7299" @click="signUp()">完成注册并登录</mu-button>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
  import {TOGGLE_SIGN_UP} from '../../store/mutation-types'
  import {mapMutations} from 'vuex'
  import {Split} from '../../components/widget'
  import Vue from 'vue'
  import Toast from 'muse-ui-toast'
  import Loading from 'muse-ui-loading'

  Vue.use(Toast, {
    position: 'top', // 弹出的位置
    time: 2000, // 显示的时长
    closeIcon: 'close', // 关闭的图标
    close: true, // 是否显示关闭按钮
    successIcon: 'check_circle', // 成功信息图标
    infoIcon: 'info', // 信息信息图标
    warningIcon: 'priority_high', // 提醒信息图标
    errorIcon: 'warning' // 错误信息图标
  })
  Vue.use(Loading)
  // Loading.config({
  //   overlayColor: 'hsla(0,0%,100%,.9)', // 背景色
  //   size: 48,
  //   color: 'primary', // color
  //   className: '', // loading class name
  //   text: '注册中...'
  // })

  export default {
    data() {
      return {
        phoneVal: '',
        passVal: '',
        loading: false
      }
    },
    methods: {
      ...mapMutations({
        cancel: TOGGLE_SIGN_UP
      }),
      signUp() {
        if (!this.phoneVal) {
          this.$toast.message('手机号为空')
          return
        }
        // console.log(this.phoneVal, this.passVal)
        // 验证常用手机号
        if (!(/^1[34578]\d{9}$/.test(this.phoneVal))) {
          // alert('手机号码有误，请重填')
          this.$toast.message('手机号码有误，请重填')
          return false
        }
        if (!this.passVal) {
          this.$toast.message('密码为空')
          return
        }
        // 验证密码 6~16个字符，区分大小写
        if (!(/^[a-zA-Z\d]{6,16}$/.test(this.passVal))) {
          this.$toast.message('请输入正确的密码')
          return false
        }
        var userData = {
          username: this.phoneVal,
          password: this.passVal
        }
        /* 把json对象转成字符串 */
        var str = JSON.stringify(userData)
        // 设置数据缓存
        window.sessionStorage.setItem('result', str)
        // this.fullscreen()
        // this.cancel(false)
        this.signLoading()
      },
      // fullscreen() {
      //   this.loading = true
      //   const loading = this.$loading()
      //   setTimeout(() => {
      //     loading.close()
      //     this.loading = false
      //     this.cancel(false)
      //   }, 3000)
      // },
      signLoading() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.cancel(false)
        }, 2000)
      }
    },
    components: {
      Split
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .sign-up
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #f4f4f4
    color: #333
    z-index: 20141226 // 侧栏层级20141228
    transition: all 0.3s
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .header
      .title
        margin-top: 2px
        font-size: 16px
    .mu-list
      padding: 0
      background: #fff
    .inp
      label
        position: relative
        display: block
        padding: 0 12px
        background: #fff
        span
          display: inline-block
          width: 72px
          height: 48px
          line-height: 48px
          text-align: left
          font-size: 16px
        input
          border: none
          outline: none
        i
          position: absolute
          top: 50%
          right: 12px
          margin-top: -6px
          color: #fff
          background-color: #b4b4b4
          border-radius: 50%
    .sign-btn
      padding: 0 12px
    .demo-button
      z-index: 30141225
</style>
