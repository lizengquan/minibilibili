<template>
  <transition name="fade">
    <div class="login"  v-loading="loading">
      <div class="header">
        <mu-appbar style="width: 100%;" color="#FB7299" text-color="#fff" z-depth="1">
          <mu-button icon slot="left" flat @click="cancelLogin(false)">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          <div class="title" slot="left">登录</div>
          <mu-button flat slot="right" class="code">忘记密码？</mu-button>
        </mu-appbar>
      </div>
      <div class="content">
        <div class="img" :class="{active: showHideImg}"></div>
        <div class="inp">
          <div class="inp-item">
            <input type="text" v-model="userVal" @focus="() => this.showHideImg = false" placeholder="你的手机号/邮箱">
            <mu-icon size="12" value="close" v-show="userVal.length" @click="userValClose"></mu-icon>
          </div>
          <div class="inp-item">
            <input type="password" v-model="passVal" @focus="changeImg()" placeholder="请输入密码">
            <mu-icon size="12" value="close" v-show="passVal.length" @click="passValClose"></mu-icon>
          </div>
          <div class="login-btn">
            <mu-button flat text-color="#fff" @click="signUp" textColor="#FB7299">注册账号</mu-button>
            <mu-button :class="{active: passVal.length && userVal.length}" flat text-color="#fff" @click="login">登录</mu-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {TOGGLE_LOGIN, TOGGLE_SIGN_UP} from '../../store/mutation-types'
  import {mapMutations, mapActions} from 'vuex'
  import Vue from 'vue'
  import Loading from 'muse-ui-loading'
  import Message from 'muse-ui-message'

  Vue.use(Loading) // 加载登录成功
  Loading.config({ // 配置
    overlayColor: 'rgba(0, 0, 0, .6)', // 背景色
    size: 48, // 大小
    color: 'rgb(251, 114, 153)', // 字体color
    className: 'login', // loading class name
    text: '登录中...'
  })
  Vue.use(Message)
    Message.config({
    successIcon: 'check_circle', // 成功图标
    infoIcon: 'info', // 信息图标
    warningIcon: 'priority_high', // 提醒图标
    errorIcon: 'warning', // 错误图标
    iconSize: 24, // 图标大小
    width: 350, // 对话框的宽度
    maxWidth: '80%', // 对话框最大宽度
    className: '', // 对话框的样式
    okLabel: '确定', // 对话框确定按钮文字
    cancelLabel: '取消', // 对话框取消按钮文字
    transition: 'scale' // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
  })

  export default {
    name: 'LoginView',
    data() {
      return {
        userVal: '',
        passVal: '',
        showHideImg: false,
        loading: false
      }
    },
    methods: {
      userValClose() {
        this.userVal = ''
      },
      passValClose() {
        this.passVal = ''
      },
      changeImg() {
        this.showHideImg = !this.showHideImg
      },
      ...mapMutations({
        cancelLogin: TOGGLE_LOGIN,
        showSignUp: TOGGLE_SIGN_UP
      }),
      ...mapActions(['hasLoginIn']),
      login() {
        // 输入为空终止代码
        if (!this.userVal.length || !this.passVal.length) {
          return
        }
        // console.log(this.userVal)
        // console.log(this.passVal)

        // 获取缓存数据 用户数据
        var res = window.sessionStorage.getItem('result')
        // console.log(res)
        // 把字符串转成json对象
        var userData = JSON.parse(res)
        // console.log(userData.username, userData.password)
        // 判断输入的内容与web存储的用户数据是否相等
        if (userData) {
          if (this.userVal === userData.username && this.passVal === userData.password) {
            // console.log('登录成功')
            // hasLoginIn
            this.signLoading() // 区域加载
            return
          }
        }
        // console.log('登录失败')
        this.$alert('登录失败', '提示')
      },
      signUp() {
        this.showSignUp(true)
      },
      signLoading() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.hasLoginIn(true) // 已登录
          this.cancelLogin(false) // 登录成功关闭登录页面
        }, 2000)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .login
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #EAEAEA
    z-index: 20141225 // 20141224
    -webkit-transition: all 0.2s linear
    -moz-transition: all 0.2s linear
    -ms-transition: all 0.2s linear
    -o-transition: all 0.2s linear
    transition: all 0.3s linear
    &.fade-enter, &.fade-leave-to
      -webkit-transform: translateX(100%)
      -moz-transform: translateX(100%)
      -ms-transform: translateX(100%)
      -o-transform: translateX(100%)
      transform: translateX(100%)
    .header
      .title
        font-size: 16px
      .mu-appbar
        botton
          padding: 0
        .title
          margin-left: 8px
          font-size: 16px
    .content
      .img
        display: flex
        height: 100px
        background: url(../../assets/img/ic_22.png) no-repeat left bottom, url(../../assets/img/ic_33.png) no-repeat right bottom, url(../../assets/img/bili_logo.png) no-repeat center center
        -webkit-background-size: auto 76px, auto 82px, 134px auto
        background-size: auto 76px, auto 82px, 134px auto
        &.active
          background: url(../../assets/img/ic_22_hide.png) no-repeat left bottom, url(../../assets/img/ic_33_hide.png) no-repeat right bottom, url(../../assets/img/bili_logo.png) no-repeat center center
          -webkit-background-size: auto 76px, auto 82px, 134px auto
          background-size: auto 76px, auto 82px, 134px auto
      .inp
        width: 80%
        margin: 0 auto
        .inp-item
          position: relative
          width: 100%
          margin-bottom: 14px
          padding: 12px 40px
          border-bottom: 1px solid #FB7299
          background: url(../../assets/img/login_people.png) no-repeat left center
          -webkit-background-size: 25px auto
          background-size: 25px auto
          &:nth-child(2)
            background: url(../../assets/img/login_lock.png) no-repeat left center
            -webkit-background-size: 25px auto
            background-size: 25px auto
          input
            height: 30px
            line-height: 30px
            border: none
            outline: none
            background: transparent
          i
            position: absolute
            left: 0
            top: 20px
            margin-left: 100%
        .login-btn
          display: flex
          width: 100%
          margin: 0 auto
          text-align: center
          button
            flex: 1
            border: 1px solid #FB7299
            &:last-child
              margin-left: 10px
              border-color: transparent
              background: rgba(251, 114, 150, 0.4)
              &.active
                background: #FB7299
</style>
