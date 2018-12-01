<template>
  <transition name="fade">
    <div class="play">
      <div class="play-header">
        <!-- #FB7299 -->
        <mu-appbar style="width: 100%;" color="" text-color="#fff" z-depth="0" v-show="showHideContorl && isFullScreen" ref="controlsHeader">
          <mu-button icon slot="left" flat @click="() => this.$router.go(-1)">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          <div class="title" slot="left"></div>
          <div class="editTitle" slot="right"></div>
          <mu-button icon slot="right" flat>
            <mu-icon :size="22" value="tv"></mu-icon>
          </mu-button>
          <mu-button icon slot="right" @click="share()">
            <mu-icon :size="24" value="more_vert"></mu-icon>
          </mu-button>
        </mu-appbar>
        <div class="videoPlay">
          <div class="video">
            <tv-loading v-show="!videoInfo.playurl.durl"></tv-loading>
            <div class="playVideo" ref="playVideo" v-for="(item, index) in videoInfo.playurl.durl" :key="index">
              <video id="video" :src="item.url" ref="video" controlslist="nodownload" preload='auto' webkit-playsinline='true' playsinline='true' x-webkit-airplay='true' x5-video-player-type='h5' x5-video-player-fullscreen='true' x5-video-ignore-metadata='true' width='100%' height='100%'>不支持video</video>
              <div class="bgImg" v-show="showHideImg">
                <img :src="videoInfo.playurl.img">
              </div>
              <div class="tvPlay" @click="controlsPlay()" v-show="!startPlay"></div>
              <div class="controls"  v-show="startPlay" ref="controls">
                <div class="bg" @click="showHideComp()">
                  <div class="topBack" @click="exitFullScreen()" v-show="!isFullScreen && showHideContorl">
                    <mu-icon color="#fff" :size="30" value="chevron_left"></mu-icon>
                    <div class="titleWarpper"><span class="hTitle" ref="hTitle">{{listData.item.title}}</span></div>
                  </div>
                </div>
                <div class="comp" v-show="showHideContorl">
                  <div class="playbtn" :class="{active: !isPlay}" @click="controlsPlay()"></div>
                  <div class="line" ref="line" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)"><span class="bar" ref="bar"><i class="videoIcon"></i></span></div>
                  <div class="time">{{nowTime}}/{{totalTiem}}</div>
                  <div class="fullScreen" @click="fullScreenFun()" v-show="isFullScreen"></div>
                </div>
              </div>
            </div>
            <div class="send">
              <div class="msg">发个友善的弹幕见证当下</div>
            </div>
          </div>
          <ul class="tab">
            <li class="tab-item" :class="{active: isSwitch}" @click="Sidle()">简介</li>
            <li class="tab-item" :class="{active: !isSwitch}" @click="Sidle1()">评论</li>
          </ul>
        </div>
      </div>
      <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="ajax" v-if="isAjax" style="text-align: center;">正在加载中...</div>
              <recommend-play :listData="listData" v-else></recommend-play>
            </div>
            <div class="swiper-slide">
              <div class="ajax" v-if="isAjax" style="text-align: center;">正在加载中...</div>
              <comment-list v-else></comment-list>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper'
  import CommentList from './CommentList'
  import {mapState, mapMutations} from 'vuex'
  import RecommendPlay from './RecommendPlay'
  import {GET_HISTORY_DATA, TOGGLE_SHOW_SHARE} from '../../store/mutation-types'
  import {TvLoading} from '../widget'

  export default {
    created() {
      // console.log(this.videoInfo)
      this.$nextTick(() => {
        let _this = this
        this.sw = new Swiper(this.$refs.swiper, {
          autoHeight: true, // 自动适应高度
          on: {
            slideChange() {
              // console.log(this.activeIndex) 活动的索引值
              if (this.activeIndex === 0) {
                _this.isSwitch = true
                // console.log(123)
              } else {
                _this.isSwitch = false
              }
            }
          }
        })
      })
    },
    mounted() {
      this.$nextTick(() => {
        // this._translateXTitle()
      })
    },
    beforeUpdate() { // 数据发生改变,但页面还没有重新渲染
      if (this.listData) {
        // console.log(this.listData.item.aid)
        let aid = this.listData.item.aid
        let item = this.listData.item
        let list = this.listData.list
        let listData = {item, list}
        let obj = {aid, listData}
        this.addHistoryData(obj)
      }
    },
    data() {
      return {
        listData: this.$route.params,
        showHideImg: true,
        isPlay: true,
        nowTime: '00:00',
        totalTiem: '00:00',
        showHideContorl: true,
        startPlay: false,
        isFullScreen: true,
        isSwitch: true
      }
    },
    computed: mapState(['videoInfo', 'isAjax']),
    methods: {
      ...mapMutations({
        addHistoryData: GET_HISTORY_DATA,
        showShare: TOGGLE_SHOW_SHARE
      }),
      controlsPlay() {
        // console.log(this.$refs.video)
        this.startPlay = true
        let myVideo = this.$refs.video[0]
        let line = this.$refs.line[0]
        let bar = this.$refs.bar[0]
        if (this.isPlay) {
          myVideo.play()
          this.showHideImg = false
          this.isPlay = false
          let totalTime = 0
          myVideo.ontimeupdate = () => {
            totalTime = myVideo.duration // 总时长
            // let h = Math.floor(totalTime / 3600)
            // h = h > 10 ? h : '0' + h
            let m = Math.floor(totalTime / 60)
            m = m > 10 ? m : '0' + m
            let s = Math.floor(totalTime % 60)
            s = s > 10 ? s : '0' + s
            this.totalTiem = m + ':' + s
            let currentTime = myVideo.currentTime
            // let hour = Math.floor(currentTime / 3600)
            // hour = hour > 10 ? hour : '0' + hour
            let min = Math.floor(currentTime / 60)
            min = min > 10 ? min : '0' + min
            let second = Math.floor(currentTime % 60)
            second = second > 10 ? second : '0' + second
            this.nowTime = min + ':' + second
            let bili = currentTime / totalTime
            bar.style.width = bili * line.offsetWidth + 'px'
          }
        } else {
          myVideo.pause()
          // this.showHideImg = true
          this.isPlay = true
        }
      },
      // pc端鼠标移动
      // museDownLine(event) {
      //   let myVideo = this.$refs.video[0]
      //   let times = myVideo.duration
      //   let x = event.pageX
      //   let offsetX = this.$refs.line[0].offsetLeft
      //   let resx = x - offsetX
      //   let bili = resx / this.$refs.line[0].offsetWidth
      //   this.$refs.bar[0].style.width = resx + 'px'
      //   myVideo.currentTime = bili * times
      // },
      // museUpLine() {
      //   this.$refs.video[0].play()
      //   this.isPlay = false
      //   // this.controlsPlay()
      // },
      showHideComp() {
        this.showHideContorl = !this.showHideContorl
      },
      fullScreenFun() {
        this.isFullScreen = !this.isFullScreen
        let winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        this.$refs.video[0].style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 500;
          transform: rotate(90deg) translate(${(winHeight - winWidth) / 2}px, ${(winHeight - winWidth) / 2}px);
          width: ${winHeight}px;
          height: ${winWidth}px;
          transform-origin: center center;
          -webkit-transform-origin: center center;`
        this.$refs.controls[0].style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 600;
          transform: rotate(90deg) translate(${(winHeight - winWidth) / 2}px, ${(winHeight - winWidth) / 2}px);
          width: ${winHeight}px;
          height: ${winWidth}px;
          transform-origin: center center;
          -webkit-transform-origin: center center;
          `
      },
      exitFullScreen() {
        this.isFullScreen = !this.isFullScreen
        this.$refs.video[0].style.cssText = `
          position: static;
          z-index: 0;
          transform: none;
          width: 100%;
          height: 100%;`
        this.$refs.controls[0].style.cssText = `
          position: static;
          z-index: 0;
          transform: none;
          width: 100%;
          height: 100%;
          `
      },
      share() {
        this.showShare(true)
      },
      touchStart(event) { // 移动端
        // console.log('开始', event.changedTouches[0].pageX)
        this.touchMove(event)
      },
      touchMove(event) { // 移动端
        // console.log('移动', event.changedTouches[0].pageX)
        let myVideo = this.$refs.video[0]
        let times = myVideo.duration
        let x = event.changedTouches[0].pageX
        let offsetX = this.$refs.line[0].offsetLeft
        // let resx = x - offsetX
        if (!this.isFullScreen) { // 全屏时 默认是true不全屏
          x = event.changedTouches[0].pageY
          // offsetX = this.$refs.line[0].offsetTop
        }
        let resx = x - offsetX
        if (resx > this.$refs.line[0].offsetWidth) { // 控制进度条宽度
          return
        }
        let bili = resx / this.$refs.line[0].offsetWidth
        this.$refs.bar[0].style.width = resx + 'px'
        myVideo.currentTime = bili * times
      },
      touchEnd(event) { // 移动端
        // console.log('停止', event.changedTouches[0].pageX)
        this.$refs.video[0].play() // 播放
        this.isPlay = false
      },
      _translateXTitle() {
        let timer
        if (this.isFullScreen && this.showHideContorl) {
          let index = 0
          setInterval(() => {
            index++
            let width = this.$refs.hTitle[0].offsetWidth || 10
            if (index > width) {
              index = 0
            }
            this.$refs.hTitle[0].style = `transform: translateX(-${index}px)`
          }, 30)
        }
        clearInterval(timer)
      },
      Sidle() {
        this.sw.slideTo(0, 1000, true) // 跳转到指定的索引值
        this.isSwitch = true
        // console.log(this.sw.clickedIndex)
      },
      Sidle1() {
        this.sw.slideTo(1, 1000, true)
        this.isSwitch = false
        // console.log(this.sw.clickedIndex)
      }
    },
    components: {
      RecommendPlay,
      CommentList,
      TvLoading
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .play
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    z-index: 999
    transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .mu-appbar
      position: fixed
      top: 0
      left: 0
      color: #fff
      background: transparent
      z-index: 100
      button
        padding: 0
      .title
        margin-left: 8px
        font-size: 16px
    .videoPlay
      background: #000
      .video
        position: relative
        width: 100%
        height: 242px
        background: #333333
        z-index: 10
        .playVideo
          position: relative
          width: 100%
          height: 202px
          // background: url(../../assets/img/bg_following_default_image_tv.9.png) no-repeat center center
          overflow: hidden
          #video
            // 保持画面的原有比例
            // object-fit: cover
            // object-position: center center
            background: rgba(0, 0, 0, 0.5)
          .bgImg
            position: absolute
            top: 0
            left: 0
            right: 0
            bottom: 0
            background: rgba(60, 60, 60, 1)
            z-index: 1
            img
              width: 100%
              height: 100%
              padding: 0
              margin: 0
              opacity: .85
              filter: blur(.34133rem)
              -webkit-filter: blur(.34133rem)
          .tvPlay
            position: absolute
            display: inline-block
            right: 16px
            bottom: 30px
            width: 48px
            height: 48px
            background: url(../../assets/img/TV-Play.png) no-repeat
            background-size: 48px auto
            z-index: 300
            &.active
              background: url(../../assets/img/TV-Pause.png) no-repeat
              background-size: 48px auto
          .controls
            .bg
              position: absolute
              top: 0
              left: 0
              right: 0
              bottom: 0
              z-index: 200
              .topBack
                position: relative
                margin-left: 10px
                height: 24px
                .titleWarpper
                  position: absolute
                  top: 6px
                  left: 24px
                  width: 100px
                  color: #fff
                  white-space: nowrap
                  overflow: hidden
                  .hTitle
                    display: inline-block
                    padding-left: 4px
            .comp
              display: flex
              position: absolute
              left: 0
              right: 0
              bottom: 0
              padding: 5px 16px 0
              height: 34px
              line-height: 24px
              color: #fff
              background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%)
              z-index: 201
              .playbtn, .fullScreen
                flex: 0 0 24px
                width: 24px
                height: 24px
                background: url(../../assets/img/bili_player_play_can_play.png) no-repeat
                background-size: auto 24px
              .playbtn.active
                background: url(../../assets/img/bili_player_play_can_pause.png) no-repeat
                background-size: auto 24px
              .fullScreen
                background: url(../../assets/img/ic_player_portrait_fullscreen.png) no-repeat
                background-size: auto 24px
              .line
                position: relative
                flex: 1
                width: 100%
                margin: 10px 18px 0
                height: 4px
                background: rgba(255, 255, 255, 0.4)
                .bar
                  position: absolute
                  width: 0px
                  height: 4px
                  background: rgb(251, 114, 153)
                  .videoIcon
                    position: absolute
                    top: -6px
                    right: -8px
                    width: 18px
                    height: 18px
                    background: url(../../assets/img/music_icon_player_indicator.png) no-repeat
                    background-size: 18px auto
              .time
                padding-right: 12px
        .send
          position: absolute
          left: 0
          bottom: 0
          right: 0
          padding: 0 12px
          height: 38px
          .msg
            margin-top: 4px
            padding: 4px 0 4px 16px
            background: #5a5a5a
            color: #999999
            border-radius: 24px
            font-size: 14px
      .tab
        width: 100%
        height: 30px
        text-align: center
        background: #fff
        box-shadow: 1px 4px 1px #f6f6f6
        .tab-item
          display: inline-block
          padding: 6px 2px 2px
          border-bottom: 2px solid transparent
          color: #757575
          &:nth-child(1)
            float: left
            margin-left: 76px
          &:last-child
            float: right
            margin-right: 76px
          &.active
            color: #fb7299
            border-bottom: 2px solid #fb7299
    .swiper-container
      width: 100%
      height: 100%
      .swiper-wrapper
        width: 100%
        height: 100%
        .swiper-slide
          width: 100%
          height: 100%
          overflow: hidden
</style>
