<template>
  <transition name="fade">
    <div class="search">
      <mu-appbar style="width: 100%;" color="#FB7299" text-color="#fff" :z-depth="1">
        <div class="searchBar">
          <input type="text" v-model="searchVal" placeholder="搜索视频或av号">
          <span class="close" v-show="searchVal.length" @click="clearVal()">
            <mu-icon color="#fff" :size="14" value="close"></mu-icon>
          </span>
        </div>
        <div class="cancel" slot="right" @click="cancel()">取消</div>
      </mu-appbar>
      <div class="searchResult" ref="scroll">
        <ul>
          <li v-for="(list, index) in filterResultData" :key="index">
            <div class="searchItem" v-for="(item, key) in list.result" :key="key" @click="toPlay(item, list.key)">
              <mu-ripple class="mu-ripple-wrapper"></mu-ripple>
              <div class="videoImg">
                <img v-lazy="item.pic" width="100%" height="100%">
              </div>
              <div class="videoInfo">
                <div class="title">{{item.title}}</div>
                <div class="des">
                  <span class="name" v-show="item.author">{{item.author}}</span>
                  <span class="play" v-show="item.play">{{item.play}}</span>
                  <span class="name" v-if="item.owner">{{item.owner.name}}</span>
                  <span class="play">{{item.attribute}}</span>
                  <span class="danmaku" v-show="item.stat.danmaku">{{item.stat.danmaku ? item.stat.danmaku : '--'}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import {TOGGLE_SEARCH} from '../../../store/mutation-types'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    created() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true
        })
      })
      // console.log(this.filterResultData)
    },
    data() {
      return {
        searchVal: ''
      }
    },
    computed: {
      ...mapState(['ranking']),
      filterResultData() {
        let result = []
        let result1 = []
        let str = this.searchVal.trim() // 去掉首尾空格
        if (!str) { // 内容为空不展示
          return result1
        }
        let obj = this.ranking
        for (let key in obj) {
          // console.log(obj[key], key)
          let arr = obj[key]
          result = arr.filter(item => {
            let reg = new RegExp(str, 'gim') // 把字符串作为正则表达式 i不区分大小写 g执行全文的搜索（而不是在找到第一个就停止查找,而是找到所有的匹配）m多行搜索
            return reg.test(item.title) || reg.test(item.owner.name) // 返回过滤掉的数组
          })
          if (result.length) {
            let newObj = {key, result}
            result1.push(newObj)
            // console.log(str, result1)
          }
        }
        return result1
      }
    },
    methods: {
      ...mapMutations({
        changeSearch: TOGGLE_SEARCH
      }),
      ...mapActions(['getVideoInfo']),
      cancel() {
        this.changeSearch(false)
      },
      clearVal() {
        this.searchVal = ''
      },
      toPlay(item, val) {
        console.log(item, val)
        let list = []
        let obj = this.ranking
        for (let key in obj) {
          if (key === val) {
            list = obj[key]
          }
        }
        // console.log(list)
        // this.$router.push({path: '/playDetail', query: {index}})
        this.$router.push({name: 'playDetail', params: {item, list}})
        let aid = item.aid
        let axios = this.axios
        this.getVideoInfo({axios, aid})
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .search
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #eaeaea
    z-index: 500
    transition: all 0.3s
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .mu-appbar
      .searchBar
        position: relative
        box-sizing: border-box
        flex: 1
        padding-left: 42px
        width: 100%
        height: 30px
        line-height: 30px
        border-radius: 30px
        background: #fff url(../../../assets/img/ic_channel_search_grey.png) no-repeat 12px center
        background-size: 18px auto
        input
          float: left
          margin: 0
          padding: 0
          border: none
          outline: none
          font-size: 16px
          font-weight: 500
          color: #333
          background-color: transparent
        .close
          position: absolute
          top: 8px
          right: 16px
          width: 14px
          height: 14px
          line-height: 14px
          border-radius: 50%
          background: #ccc
          z-index: 100
      .cancel
        flex: 0 0 42px
        width: 42px
        font-size: 16px
        font-weight: 500
    .searchResult
      width: 100%
      height: 100%
      overflow: hidden
      .searchItem
        position: relative
        display: flex
        padding: 10px 12px
        margin-top: 12px
        overflow: hidden
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
          position: relative
          font-size: 0
          width: 100%
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
            width: 100%
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
              @include videoInfo(url(../../../assets/img/ic_up_gray.png))
            .play
              @include videoInfo(url(../../../assets/img/mall_video_num.png))
            .danmaku
              margin-left: 8px
              @include videoInfo(url(../../../assets/img/mall_video_danmaku_num.png))
</style>
