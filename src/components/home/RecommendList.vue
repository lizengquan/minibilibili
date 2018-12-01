<template>
  <div class="recommend" ref="container">
    <mu-load-more :refreshing="refreshing">
      <div class="banner">
        <banner></banner>
      </div>
      <ul>
        <li class="list" v-for="(list,key) in getPartData()" :key="key">
          <div class="item" v-for="(item,index) in list" :key="index" @click="toPlay(item, list)">
            <mu-ripple class="mu-ripple-wrapper"></mu-ripple>
            <div class="playInfo">
              <img v-lazy="item.pic" width="100%" height="100%"/>
              <div class="bar">
                <span class="view">{{item.stat.view | transformNumPoint}}</span>
                <span class="danmaku">{{item.stat.danmaku | transformNumPoint}}</span>
              </div>
            </div>
            <div class="title">{{item.title}}</div>
            <div class="tname">{{item.tname}}<i class="icon"></i></div>
          </div>
        </li>
      </ul>
    </mu-load-more>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {Banner} from '../widget'
  import {transformNumPoint} from '../../assets/js/tools'

  export default {
    props: {
      showNum: {
        types: Number,
        default: 1
      },
      refreshing: {
        types: Boolean,
        default: false
      },
      getHomeData: {
        types: Object
      }
    },
    computed: {
      ...mapState({
        recommendData: 'ranking'
      }),
      recommendDataArr() {
        let obj = this.recommendData
        let arr = []
        if (obj) {
          for (let key in obj) {
            arr.push(obj[key])
          }
        }
        return arr
      }
    },
    methods: {
      ...mapActions(['getVideoInfo']),
      toPlay(item, list) {
        // this.$router.push({path: '/playDetail', query: {index}})
        let data = {item, list}
        this.$router.push({name: 'playDetail', params: data})
        let aid = item.aid
        let axios = this.axios
        this.getVideoInfo({axios, aid, data})
      },
      getPartData() { // 展示10条数据
        let data = this.recommendDataArr.filter((item, index) => { // 过滤指定的值
          return index < this.showNum
        })
        // console.log(data)
        return data
      }
    },
    filters: {
      transformNumPoint(val) {
        return transformNumPoint(val)
      }
    },
    components: {
      Banner
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  .recommend
    width: 100%
    height: 100%
    display: flex
    padding: 0 6px
    .list
      .item
        position: relative
        display: inline-block
        margin: 10px 5px 0
        width: 164px
        height: 178px
        overflow: hidden
        border-radius: 6px
        background: #fff
        box-shadow: 0px 1px 1px #e5e5e5
        &:nth-child(odd)
          flex: 1 1 auto // 奇数行
        &:nth-child(even)
          flex: 1 1 auto // 偶数行
        .mu-ripple-wrapper
          position: absolute
          top: 0
          left: 0
          height: 100%
          width: 100%
          overflow: hidden
          z-index: 2
        .playInfo
          position: relative
          width: 164px
          height: 100px
          overflow: hidden
          .bar
            position: absolute
            left: 0
            bottom: 0
            padding: 0 2px 4px
            font-size: 12px
            color: #fff
            span
              display: inline-block
              padding-left: 20px
              &.view
                background: url(../../assets/img/ic_clip_view_num.png) no-repeat left center
                background-size: 20px auto
              &.danmaku
                background: url(../../assets/img/ic_clip_danmaku_num.png) no-repeat left center
                background-size: 20px auto
        .title
          margin-top: 12px
          padding: 0px 12px
          width: 163px
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          font-size: 14px
          line-height: 1.2
          color: #212121
        .tname
          position: absolute
          left: 0
          bottom: 6px
          right: 0
          padding: 0 12px
          font-size: 12px
          color: #9b9b9b
          .icon
            position: absolute
            right: 8px
            bottom: 2px
            width: 14px
            height: 14px
            background: url(../../assets/img/ic_more.png) no-repeat
            background-size: 14px auto
</style>
