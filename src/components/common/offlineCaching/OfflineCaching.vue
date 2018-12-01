<template>
  <transition name="fade">
    <div class="offline">
      <mu-appbar style="width: 100%;" color="#FB7299" text-color="#fff" z-depth="1">
        <mu-button icon slot="left" flat @click="showSetDrawer(true)">
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        <div class="title" slot="left">离线缓存</div>
        <!--<mu-button flat slot="right" class="code"></mu-button>-->
      </mu-appbar>
      <div class="noLogin">
        <div class="bgImg"></div>
        <div class="title">这里还什么都没有呢~</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {TOGGLE_SET_DRAWER} from '../../../store/mutation-types'
  import {mapMutations} from 'vuex'

  export default {
    name: 'OfflineCaching',
    methods: {
      ...mapMutations({
        showSetDrawer: TOGGLE_SET_DRAWER
      })
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .offline
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fafafa
    z-index: 300
    transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .mu-appbar
      button
        padding: 0
      .title
        margin-left: 8px
        font-size: 16px
    .noLogin
      width: 70%
      margin: 50% auto 0
      text-align: center
      .bgImg
        display: inline-block
        width: 104px
        height: 110px
        text-align: center
        background: url(../../../assets/img/ic_no_income.png) no-repeat
        -webkit-background-size: auto 100%
        background-size: auto 100%
      .title
        color: #999
        font-size: 13px
</style>
