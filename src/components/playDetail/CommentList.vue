<template>
  <div class="commentWarpper">
    <div class="scroll" ref="scroll">
      <div class="comment-list">
        <div class="listHeader">
          <span class="acount" v-if="videoInfo.comment.page">评论(<i>{{videoInfo.comment.page.acount ? videoInfo.comment.page.acount : 0}}</i>)</span>
          <i class="menuIcon"></i>
        </div>
        <!-- {{videoInfo.comment.replies}} -->
        <div class="replies" v-for="(item,index) in getPartData" :key="index">
          <div class="userInfo">
            <img class="bg" :src="item.member.pendant.image" width="62">
            <mu-avatar :size="30" slot="left">
              <img :src="item.member.avatar">
            </mu-avatar>
            <div class="info">
              <div class="uname">{{item.member.uname}}<i>{{item.member.level_info.current_level}}</i></div>
              <span>#{{item.floor}}</span>
              <span>{{item.ctime | filterCustomDate}}</span>
            </div>
            <div class="follow" @click="follow(index)">{{index === currentIndex ? '已关注' : '+关注'}}</div>
          </div>
          <div class="message">
            {{item.content.message}}
          </div>
          <div class="iconList">
            <i :class="{active: thumbsUp}" @click="thumbsUpFun(item)"></i>
            <span>{{item.like}}</span>
            <i :class="{active: thumbsDown}" @click="thumbsDownFun()"></i>
            <span v-show="thumbsDown">1</span>
            <i @click="showShare(true)"></i>
          </div>
          <ul class="rep">
            <li class="repItem" v-for="(list, key) in item.replies" :key="key">
              <span class="name">{{list.member.uname}}:</span>
              <span class="msg">{{list.content.message}}</span>
            </li>
            <li class="rcount">共{{item.rcount}}条回复</li>
          </ul>
          <mu-divider></mu-divider>
        </div>
        <!-- {{videoInfo.comment.page}}<br/> -->
        <!-- 消息{{videoInfo.comment.notice}}<br/> -->
        <!-- 回复{{videoInfo.comment.replies}} -->
        <div class="loaded">
          <div class="bottomTip">╮(╯3╰)╭再怎么找也没有啦</div>
        </div>
      </div>
    </div>
    <div class="tip" v-show="loading">
      <mu-circular-progress class="progress" color="#FB7299" :stroke-width="2" :size="14"></mu-circular-progress>
      <span class="text">加载中...</span>
    </div>
  </div>
</template>

<script>
  import {TOGGLE_SHOW_SHARE} from '../../store/mutation-types'
  import {mapState, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  import {filterCustomDate} from '../../assets/js/tools'

  export default {
    created() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true,
          scrollY: true,
          pullUpLoad: {
            threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
          }
        })
        this.scroll.on('pullingUp', () => {
          if (this.showNum >= this.videoInfo.comment.replies.length) {
            this.loading = false
            return
          }
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.showNum += 2
          }, 2000)
          // console.log('上拉加载')
          this.scroll.refresh()
          this.scroll.finishPullUp() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        })
        // console.log(this.videoInfo.comment.replies)
      })
    },
    data() {
      return {
        showNum: 6,
        loading: false,
        thumbsUp: false,
        thumbsDown: false,
        currentIndex: 0
      }
    },
    computed: {
      ...mapState(['videoInfo']),
      getPartData() {
        let arr = []
        if (this.videoInfo.comment.replies) {
          arr = this.videoInfo.comment.replies.filter((item, index) => {
            return index < this.showNum
          })
        }
        return arr
      }
    },
    methods: {
      ...mapMutations({
        showShare: TOGGLE_SHOW_SHARE
      }),
      thumbsUpFun(item) {
        this.thumbsUp = !this.thumbsUp
        if (this.thumbsUp) {
          item.like++
          return
        }
        item.like--
      },
      thumbsDownFun() {
        this.thumbsDown = !this.thumbsDown
      },
      follow(index) {
        this.currentIndex = index
      }
    },
    filters: {
      filterCustomDate(val) {
        let template = 'MM-dd'
        return filterCustomDate(val, template)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .commentWarpper
    position: relative
    width: 100%
    height: 100%
    background: #eee
    .scroll
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 272px
      overflow: hidden
      .listHeader
        position: relative
        padding: 0 12px
        height: 45px
        line-height: 45px
        color: #333
        background: #fff
        .menuIcon
          position: absolute
          top: 50%
          right: 8px
          margin-top: -7px
          width: 14px
          height: 14px
          background: url(../../assets/img/ic_more.png) no-repeat
          background-size: 14px auto
      .replies
        background: #fff
        .userInfo
          position: relative
          padding: 14px 12px 12px 15px
          .bg
            position: absolute
            top: -6px
            left: -1px
          .info
            display: inline-block
            margin-left: 13px
            font-size: 0
            .uname
              font-size: 14px
              color: #757575
            span
              display: inline-block
              font-size: 10px
              color: #999
              &:last-child
                margin-left: 6px
          .follow
            position: absolute
            top: 4px
            right: 0
            margin-right: 16px
            font-size: 16px
            color: #fb7299
        .message
          margin: 0 16px 0 62px
          text-align: left
        .iconList
          margin: 10px 0 10px 62px
          height: 16px
          font-size: 10px
          color: #999
          & > i
            display: inline-block
            vertical-align: middle
            margin-bottom: 4px
            width: 16px
            height: 16px
            background: url(../../assets/img/biligame_comment_liked.png) no-repeat left center
            background-size: 16px auto
            &:nth-child(1)
              &.active
                background: url(../../assets/img/biligame_comment_liked_blue.png) no-repeat left center
                background-size: 16px auto
            &:nth-child(3)
              margin-left: 12px
              background: url(../../assets/img/biligame_comment_disliked.png) no-repeat left center
              background-size: 16px auto
              &.active
                background: url(../../assets/img/biligame_comment_disliked_blue.png) no-repeat left center
                background-size: 16px auto
            &:last-child
              margin-left: 10px
              background: url(../../assets/img/ic_vector_share.png) no-repeat left center
              background-size: 16px auto
        .rep
          margin: 0 12px 9px 62px
          padding: 0 10px
          background: #f4f4f4
          overflow: hidden
          .repItem
            margin-top: 10px
          .rcount
            padding: 10px 0
            font-size: 10px
            color: #5090CC
      .loaded
        width: 100%
        height: 35px
        line-height: 35px
        text-align: center
        color: #b4b4b4
        background: #eee
    .tip
      position: absolute
      left: 0
      right: 0
      bottom: 272px
      height: 35px
      line-height: 35px
      text-align: center
      background: #fff

</style>
