<template>
  <div class="purchase">
    <div class="header">
      <top-navigation></top-navigation>
    </div>
    <loading v-show="!bannerData.length"></loading>
    <div class="scroll" ref="scroll">
      <ul>
        <div v-for="i in 4" :key="i">
          <li class="item" ref="item" v-for="(item, index) in bannerData" :key="index">
            <div class="img">
              <img :src="item.pic" width="100%">
            </div>
            <div class="title">{{item.name}}</div>
          </li>
        </div>
      </ul>
    </div>
    <div class="bottomTip" :style="{bottom: `${tipBottom}px`}" v-show="isTip">╮(╯3╰)╭再怎么找也没有啦</div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Loading} from '../widget'
  import TopNavigation from '../topNav/TopNavigation'

  export default {
    name: 'PurchaseView',
    data () {
      return {
        num: 10,
        refreshing: false,
        loading: false,
        bannerData: [],
        isTip: false,
        tipBottom: 46
      }
    },
    created() {
      this.$nextTick(() => {
        this.axios.get('/api/banner').then(res => {
          let arr = JSON.parse(res.request.responseText)
          arr = JSON.parse(arr.data)
          // console.log(arr.data)
          this.bannerData = arr.data
        })
      })
    },
    mounted() {
      this.$nextTick(() => {
        if (this.bannerData) {
          this.scroll = new BScroll(this.$refs.scroll, {
            click: true,
            probeType: 3
          })
          this.scroll.on('scroll', ({y}) => {
            // console.log(parseInt(y))
            let offsetY = parseInt(y)
            let height = this.$refs.item[0].offsetHeight * this.bannerData.length * 4 - 396
            if (-offsetY > height) {
              this.isTip = true
              this.tipBottom = -offsetY - height
            } else {
              this.isTip = false
              this.tipBottom = 46
            }
            // console.log(height)
          })
        }
      })
    },
    components: {
      TopNavigation,
      Loading
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .purchase
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0px
    background: #fafafa
    .scroll
      position: absolute
      top: 56px
      left: 0
      right: 0
      bottom: 46px
      overflow: hidden
      .item
        margin: 12px
        box-shadow: 0px 2px 2px #e5e5e5
        background: #fff
        .img
          overflow: hidden
          border-top-left-radius: 4px
          border-top-right-radius: 4px
        .title
          padding: 6px 12px
          font-weight: 700
          color: #333
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
    .bottomTip
      position: fixed
      left: 0
      right: 0
      text-align: center
      color: #999
</style>
