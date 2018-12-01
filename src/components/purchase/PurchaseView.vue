<template>
  <div class="purchase">
    <div class="header">
      <top-navigation></top-navigation>
    </div>
    <loading v-show="!bannerData.length"></loading>
    <div class="scroll" ref="scroll">
      <ul>
        <li class="item" v-for="(item, index) in bannerData" :key="index">
          <div class="img">
            <img :src="item.pic" width="100%">
          </div>
          <div class="title">{{item.name}}</div>
        </li>
      </ul>
    </div>
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
        bannerData: []
      }
    },
    created() {
      this.$nextTick(() => {
        this.axios.get('/api/banner').then(res => {
          console.log()
          let arr = JSON.parse(res.request.responseText)
          arr = JSON.parse(arr.data)
          console.log(arr.data)
          this.bannerData = arr.data
        })
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true
        })
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
    bottom: 56px
    background: #fafafa
    .scroll
      width: 100%
      height: 100%
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
</style>
