<template>
  <transition  name="fade">
    <div class="pulice">
      <header-side :title="setDrawerData" :iconVal="iconVal" :depth="4" @emit-close="backPre()"></header-side>
      <div class="content">
        <div class="logo">
          <img src="../../../assets/img/bilibili_set.png">
        </div>
        <div class="load">
          <ul class="list">
            <li class="item" v-for="(item, index) in imgArr" :key="index" v-show="index === currentIndex">
              <img :src="item" width="100%">
            </li>
          </ul>
          <span>正在建设中...</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {headerSide} from '../../widget'
  import {TOGGLE_PUBLIC} from '../../../store/mutation-types'
  import {mapState, mapMutations} from 'vuex'

  export default {
    mounted() {
      this.$nextTick(() => {
        setInterval(() => {
          this.currentIndex++
          if (this.currentIndex >= this.imgArr.length) {
            this.currentIndex = 0
          }
        }, 150)
      })
    },
    data() {
      return {
        iconVal: 'arrow_back',
        imgArr: [
          require('../../../assets/img/dy/tv_loading_01.png'),
          require('../../../assets/img/dy/tv_loading_02.png'),
          require('../../../assets/img/dy/tv_loading_03.png'),
          require('../../../assets/img/dy/tv_loading_04.png'),
          require('../../../assets/img/dy/tv_loading_05.png'),
          require('../../../assets/img/dy/tv_loading_06.png'),
          require('../../../assets/img/dy/tv_loading_07.png'),
          require('../../../assets/img/dy/tv_loading_08.png')
        ],
        currentIndex: 0
      }
    },
    computed: mapState(['setDrawerData']),
    methods: {
      ...mapMutations({
        isPublic: TOGGLE_PUBLIC
      }),
      backPre() {
        this.isPublic(false)
      }
    },
    components: {
      headerSide
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .pulice
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fafafa
    z-index: 400
    transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .content
      width: 100%
      height: 100%
      .logo
        height: 25%
        display: flex
        justify-content: center
        algin-items: center
        img
          align-self: center
      .load
        position: relative
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        algin-items: center
        .list
          position: absolute
          top: 10%
          left: 0
          width: 100%
          white-space: nowrap
          .item
            position: absolute
            top: 0
            left: 0
            width: 100%
            float: left
        span
          font-size: 18px
          align-self: end
          color: #333

</style>
