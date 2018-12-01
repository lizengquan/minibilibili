<template>
  <transition name="fade">
    <div class="channelList">
      <div class="header">
        <header-side :title="getChannelList.title ? getChannelList.title : ''" :depth="0" @emit-close="backPre()"></header-side>
        <div class="topList" ref="topListScroll">
          <ul ref="topList">
            <li class="topNavItem" ref="topItem" :class="{active: index ===topCurrentIndex}" v-for="(item,index) in getChannelList.topTList" :key="item.tid" @click="getVideoData(item.tid, index)">
              <span class="name" :class="{active: index ===topCurrentIndex}">{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <loading v-show="!partData.length"></loading>
      <div class="videoList" ref="videoListScroll">
        <ul>
          <div class="dynamic">综合动态</div>
          <li class="videoItem" v-for="(list, key) in partData" :key="key" @click="toPlay(list, AnimationZoneData)">
            <mu-ripple class="mu-ripple-wrapper"></mu-ripple>
            <div class="videoImg">
              <img v-lazy="list.pic" width="100%" height="100%">
            </div>
            <div class="videoInfo">
              <div class="title">{{list.title}}</div>
              <div class="des">
                <span class="name">{{list.author}}</span>
                <span class="play">{{list.play}}</span>
                <span class="danmaku">{{list.stat.danmaku ? list.stat.danmaku : '--'}}</span>
              </div>
              <i class="menuIcon"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="load" v-show="Loaded">
        <mu-circular-progress class="progress" color="#FB7299" :stroke-width="2" :size="14"></mu-circular-progress>
        加载中...
      </div>
      <div class="loaded" v-show="!Loaded">╮(╯3╰)╭再怎么找也没有啦</div>
    </div>
  </transition>
</template>

<script>
  import {headerSide, Loading} from '../widget'
  import {mapState, mapActions} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        topCurrentIndex: 0,
        showNum: 6,
        refreshing: false,
        loading: false,
        tid: 0
      }
    },
    created() {
      this.$nextTick(() => {
        this.videoListScroll = new BScroll(this.$refs.videoListScroll, {
          click: true,
          scrollY: true,
          pullUpLoad: {
            threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
          },
          pullDownRefresh: {
            threshold: 56,
            stop: 20
          }
        })
        this.videoListScroll.on('pullingUp', () => {
          // 做些事情
          // console.log('上拉加载')
          this.load()
          this.videoListScroll.refresh()
          this.videoListScroll.finishPullUp() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        })
        this.videoListScroll.on('pullingDown', () => {
          // console.log('下拉刷新')
          let tid = this.tid
          this.refresh(tid)
          this.videoListScroll.finishPullDown() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
        })
      })
    },
    mounted() { // 渲染之后
      this._initScrollX() // 头部标题导航横向滚动
      // console.log(this.getChannelList)
      // console.log(this.getChannelList.topTList[0].tid)
      this.tid = this.getChannelList.topTList[0].tid
      let tid = this.tid
      let axios = this.axios
      this.getAnimation({tid, axios}) // 默认展示第一个导航标题
    },
    computed: {
      ...mapState(['getChannelList', 'AnimationZoneData']),
      partData() {
        let partData = this.getPartData()
        return partData
      },
      Loaded() {
        let load = this.loading
        if (this.showNum >= this.partData.length) {
          load = false
        }
        return load
      }
    },
    methods: {
      ...mapActions(['changeChannel', 'getAnimation', 'getVideoInfo']),
      backPre() {
        this.changeChannel({val: false})
      },
      _initScrollX() { // 头部标题导航横向滚动
        if (this.getChannelList.topTList) {
          // let topItemLength = this.getChannelList.topTList.length
          let topItemWidth = 0 // 计算每个li的总和
          // console.log(this.$refs.topItem)
          this.$refs.topItem.forEach(function(item) {
            topItemWidth += item.offsetWidth
          })
          // let topListWidth = (topItemWidth) * topItemLength
          // console.log(topItemLength, topItemWidth, topListWidth)
          this.$refs.topList.style.width = topItemWidth + 'px' // js强制给ul宽度
          this.$nextTick(() => { // 子组件渲染完毕执行
            if (!this.topListScroll) { // 数据为空时 new BScroll
              this.topListScroll = new BScroll(this.$refs.topListScroll, {
                click: true,
                scrollX: true
              })
            } else { // 有数据时 重新刷新
              this.topListScroll.refresh()
            }
          })
        }
      },
      getVideoData(tid, index) {
        this.showNum = -1
        this.loading = false
        setTimeout(() => {
          let axios = this.axios
          this.getAnimation({tid, axios})
          this.showNum = 6
        }, 1500)
        this.topCurrentIndex = index
      },
      toPlay(item, list) {
        // this.$router.push({path: '/playDetail', query: {index}})
        this.$router.push({name: 'playDetail', params: {item, list}})
        let aid = item.aid
        let axios = this.axios
        this.getVideoInfo({axios, aid, data: {item, list}})
      },
      getPartData() {
        let data = this.AnimationZoneData.filter((item, index) => {
          return index <= this.showNum
        })
        // console.log(data)
        return data
      },
      load() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.showNum += 4
        }, 2000)
      },
      refresh(tid) {
        this.showNum = -1
        this.refreshing = true
        setTimeout(() => {
          let axios = this.axios
          this.getAnimation({tid, axios})
          this.refreshing = false
          this.showNum = 6
        }, 2000)
      }
    },
    components: {
      headerSide,
      Loading
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .channelList
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 200
    background: #eee
    transition: all 0.2s
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .header
      box-shadow: 1px 2px 2px rgba(187, 187, 187, 1)
      background: rgb(251, 114, 153)
      .topList
        width: 100%
        box-sizing: border-box
        ul
          white-space: nowrap
          overflow: hidden
          width: 100%
        .topNavItem
          display: inline-block
          padding: 2px 10px 0
          height: 38px
          line-height: 38px
          font-size: 16px
          color: #fdb8cc
          &.active
            color: #fff
          .name
            display: inline-block
            width: 100%
            height: 100%
            &.active
              border-bottom: 2px solid #fff
    .videoList
      box-sizing: border-box
      padding-top: 20px
      height: 100%
      overflow: hidden
      color: #333
      .dynamic
        margin: 14px 0 0 12px
      .videoItem
        position: relative
        display: flex
        padding: 12px 12px 0
        .mu-ripple-wrapper
          position: absolute
          top: 0
          left: 0
          height: 100%
          width: 100%
          overflow: hidden
          z-index: 2
        .videoImg
          flex: 0 0 144px
          margin-right: 10px
          width: 144px
          height: 90px
          overflow: hidden
          border-radius: 2px
        .videoInfo
          // position: relative
          font-size: 0
          .title
            line-height: 1.3
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            font-size: 14px
          .des
            position: absolute
            bottom: 2px
            font-size: 10px
            color: #9e9e9e
            span
              display: inline-block
              padding-left: 16px
            @mixin videoInfo($url)
              background:
                image: $url
                repeat: no-repeat
                position: left middle
                size: 14px auto
            .name
              width: 100%
              margin-bottom: 4px
              @include videoInfo(url('../../assets/img/ic_up_gray.png'))
            .play
              @include videoInfo(url(../../assets/img/mall_video_num.png))
            .danmaku
              margin-left: 8px
              @include videoInfo(url(../../assets/img/mall_video_danmaku_num.png))
          .menuIcon
            position: absolute
            right: 12px
            bottom: 4px
            width: 14px
            height: 14px
            background: url(../../assets/img/ic_more.png) no-repeat
            background-size: 14px auto
    .load
      position: fixed
      left: 0
      bottom: 0
      width: 100%
      text-align: center
    .loaded
      height: 45px
      line-height: 45px
      text-align: center
      color: #999
</style>
