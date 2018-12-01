<template>
  <div class="banner">
    <div class="swiper-container" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in bannerData" :key="index">
          <img :src="item.pic" width="100%">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper'

  export default {
    created() {
      this.$nextTick(() => {
        this.axios.get('/api/banner').then(res => {
          console.log()
          let arr = JSON.parse(res.request.responseText)
          arr = JSON.parse(arr.data)
          // console.log(arr.data)
          this.bannerData = arr.data
        })
      })
    },
    updated() {
      this.$nextTick(() => {
        this.sw = new Swiper(this.$refs.swiper, {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: true, // 启动自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay
        })
      })
    },
    data() {
      return {
        bannerData: []
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .banner
    width: 100%
    height: 100%
    .swiper-container
      width: 100%
      height: 100%
      .swiper-wrapper
        width: 100%
        height: 100%
      .swiper-pagination
        text-align: right
</style>
