<template>
  <transition>
    <div class="home">
      <div class="header" :style="{transform: `translateY(${scrollHeight}px)`}">
        <top-navigation></top-navigation>
        <div class="nav">
          <ul class="tab" ref="tab">
            <li class="tab-item active"><span>推荐</span></li>
            <!-- <li class="tab-item" @click="active2()"><span>追番</span></li> -->
          </ul>
          <div class="nav-title active">
            <span>综合</span>
            <span class="ranking">排行榜</span>
          </div>
        </div>
      </div>
      <div class="scroll" ref="homeScroll" :style="{top: `${scrollTop}px`}">
        <ul>
          <li>
            <div class="ajax" v-if="isAjax" style="text-align: center;">正在加载中...</div>
            <recommend-list :showNum="showNum" :refreshing="refreshing" :getHomeData="getHomeData" v-else></recommend-list>
          </li>
          <li>
            <div class="comic" >
            <!-- 追番页面 -->
            </div>
          </li>
        </ul>
      </div>
      <div class="pullingUpLoading" v-show="loading">
        <mu-circular-progress class="progress" color="#FB7299" :stroke-width="2" :size="14"></mu-circular-progress>
        <span class="text">加载中...</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import TopNavigation from '../topNav/TopNavigation'
  import BScroll from 'better-scroll'
  import RecommendList from './RecommendList'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'HomeView',
    created() {
      this.$nextTick(() => {
        this.homeScroll = new BScroll(this.$refs.homeScroll, {
          click: true,
          probeType: 3,
          scrollY: true,
          pullUpLoad: {
            threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
          },
          pullDownRefresh: {
            threshold: 30,
            stop: 20
          }
        })
        this.homeScroll.on('scroll', ({y}) => {
          // console.log(parseInt(y))
          let offsetY = parseInt(y)
          if (y > -56 && y < 0) {
            this.scrollHeight = offsetY
            this.scrollTop = 154 + offsetY
          } else if (y <= -56) {
            this.scrollHeight = -56
            this.scrollTop = 98
          } else {
            this.scrollHeight = 0
            this.scrollTop = 154
          }
        })
        this.homeScroll.on('pullingUp', () => {
          // 做些事情
          this.load()
          // console.log('上拉加载')
          this.homeScroll.refresh()
          this.homeScroll.finishPullUp() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        })
        this.homeScroll.on('pullingDown', () => {
          this.refresh()
          // console.log('下拉刷新')
          this.homeScroll.finishPullDown() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
        })
      })
    },
    data() {
      return {
        scrollHeight: 0,
        scrollTop: 154,
        loading: false,
        showNum: 1,
        refreshing: false
      }
    },
    computed: mapState(['isAjax']),
    methods: {
      ...mapActions(['getHomeData']),
      load() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.showNum += 1
        }, 2000)
      },
      refresh() {
        this.refreshing = true
        // this.$refs.container.scrollTop = 0
        let axios = this.axios
        this.getHomeData(axios)
        setTimeout(() => {
          this.refreshing = false
          this.showNum = 1
        }, 2000)
      }
    },
    components: {
      TopNavigation,
      RecommendList
    }
  }
</script>

<style lang="sass" ref="stylesheet/scss" scoped>
  .home
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 46px
    overflow: hidden
    .header
      // transform: translateY(-100%)
      .nav
        .tab
          padding: 0 12px
          background: #fff
          .tab-item
            display: inline-block
            margin: 0 12px
            padding: 14px 5px 10px
            border-bottom: 2px solid transparent
            font-size: 14px
            color: #767676
            &.active
              border-bottom: 2px solid #fb7299
              color: #fb7299
        .nav-title
          padding: 15px 8px 15px 12px
          span
            display: inline-block
            font-size: 12px
            color: #333
            &.ranking
              padding-left: 26px
              background: url(../../assets/img/ic_bangumi_review_ranking.png) no-repeat
              background-size: 22px auto
              float: right
    .scroll
      position: fixed
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
    .pullingUpLoading
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      height: 30px
      text-align: center
      background: #fff
      z-index: 500
      .text
        display: inline-block
        height: 30px
        line-height: 30px
</style>
