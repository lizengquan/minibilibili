<template>
  <transition name="fade">
    <div class="set-up">
      <header-side :title="title" @emit-close="setUp(false)"></header-side>
      <div class="set-list">
        <mu-list color="#fff">
          <split></split>
          <mu-list-item button ripple>
            <mu-list-item-title>播放设置</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item button ripple>
            <mu-list-item-title>解码设置</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item button ripple>
            <mu-list-item-title>弹幕设置</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item button ripple>
            <mu-list-item-title>离线设置</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item button ripple>
            <mu-list-item-title>追番设置</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <split></split>
          <mu-list-item button ripple>
            <mu-list-item-title>清理存储空间</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item button ripple>
            <mu-list-item-title>其他设置</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <split></split>
          <mu-list-item button ripple>
            <mu-list-item-title>我的客服</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item button ripple>
            <mu-list-item-title>帮助</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <split></split>
          <mu-list-item button ripple class="signOut" @click="clearUser()" v-show="loginIn">
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </transition>
</template>

<script>
  import {headerSide, Split} from '../../widget'
  import {TOGGLE_SET_UP} from '../../../store/mutation-types'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    computed: mapState(['loginIn']),
    methods: {
      ...mapMutations({setUp: TOGGLE_SET_UP}),
      ...mapActions(['hasLoginIn']),
      clearUser() { // 清除本地存储
        this.$confirm('乃确定不是手滑了么?', {
          width: 350, // 对话框的宽度
          maxWidth: '80%', // 对话框最大宽度
          className: '', // 对话框的样式
          okLabel: '注销', // 对话框确定按钮文字
          cancelLabel: '我手滑了', // 对话框取消按钮文字
          transition: 'scale' // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
        }).then((res) => { // 返回 Promise 对象
            // console.log(res.result) true false
            if (res.result) {
              this.hasLoginIn(false) // 修改state中的loginIn为false退出登录
              // console.log(this.loginIn)
              // window.sessionStorage.clear()
              return false
            }
            return false
        })
      }
    },
    data() {
      return {
        title: '设置'
      }
    },
    components: {
      headerSide,
      Split
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .set-up
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #f4f4f4
    z-index: 20141225
    transition: all 0.3s
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .set-list
      position: absolute
      top: 56px
      left: 0
      right: 0
      bottom: 0
      .mu-list
        li
          background: #fff
          &.signOut
            .mu-item-title
              text-align: center
</style>
