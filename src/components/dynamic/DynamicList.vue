<template>
  <div class="container" ref="scroll">
    <mu-paper class="loadmore-wrap">
      <div ref="container" class="loadmore-content">
        <mu-load-more @refresh="refresh" :refreshing="refreshing">
          <mu-list>
            <div v-for="(item, index) in getData(strNum)" :key="index" @click="toPlay(item, strNum)">
              <split></split>
              <mu-card :raised="false" style="width: 100%; max-width: 375px; margin: 0 auto;">
                <mu-card-header :title="item.owner.name" :sub-title="`${item.ctime}·投稿了视频`">
                  <mu-avatar slot="avatar">
                    <img :src="item.owner.face">
                  </mu-avatar>
                  <mu-button icon style="position: absolute;top: 0;right: 0">
                    <mu-icon :size="20" value="more_vert"></mu-icon>
                  </mu-button>
                </mu-card-header>
                <mu-card-title :sub-title="item.dynamic"></mu-card-title>
                <mu-card-media title="Image Title" sub-title="Image Sub Title">
                  <img v-lazy="item.pic" height="190px">
                </mu-card-media>
                <mu-card-text>
                  {{item.desc}}
                </mu-card-text>
                <mu-card-actions>
                  <mu-flex class="flex-wrapper" align-items="center">
                    <mu-flex class="flex" justify-content="center" fill>
                      <mu-button flat color="#757575">
                        <mu-icon left value="share"></mu-icon>
                        {{item.stat.share || '0'}}
                      </mu-button>
                    </mu-flex>
                    <mu-flex class="flex" justify-content="center" fill>
                      <mu-button flat color="#757575">
                        <mu-icon left value="chat_bubble"></mu-icon>
                        {{item.stat.reply || '0'}}
                      </mu-button>
                    </mu-flex>
                    <mu-flex class="flex" justify-content="center" fill>
                      <mu-button flat color="#757575">
                        <mu-icon left value="thumb_up"></mu-icon>
                        {{item.stat.like || '0'}}
                      </mu-button>
                    </mu-flex>
                  </mu-flex>
                </mu-card-actions>
              </mu-card>
            </div>
            <div class="bottomTip">╮(╯3╰)╭再怎么找也没有啦</div>
          </mu-list>
        </mu-load-more>
      </div>
    </mu-paper>
  </div>
</template>

<script>
  import {Split} from '../widget'
  import {mapState, mapActions} from 'vuex'
  import BScroll from 'better-scroll'
  import {filterCustomDate} from '../../assets/js/tools'

  export default {
    props: {
      strNum: {
        type: String
      }
    },
    created() {
      this.$nextTick(() => {
        this.refresh()
      })
    },
    updated() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true,
          bounce: false
        })
        this.getData(this.strNum)
      })
    },
    data() {
      return {
        refreshing: false
      }
    },
    computed: {
      ...mapState({
        getAllData: 'ranking'
      })
    },
    methods: {
      ...mapActions(['getHomeData', 'getVideoInfo']),
      refresh () {
        this.refreshing = true
        // this.$refs.container.scrollTop = 0
        this.cancelable = false
        let axios = this.axios
        this.getHomeData(axios)
        setTimeout(() => {
          this.refreshing = false
        }, 2000)
      },
      getData(val) {
        let arr = []
        for (let key in this.getAllData) {
          if (key === val) {
            arr = this.getAllData[key]
          }
        }
        return arr
      },
      toPlay(item, val) {
        // console.log(item, val)
        let list = []
        let obj = this.getAllData
        for (let key in obj) {
          if (key === val) {
            list = obj[key]
          }
        }
        this.$router.push({name: 'playDetail', params: {item, list}})
        let aid = item.aid
        let axios = this.axios
        this.getVideoInfo({axios, aid, data: {item, list}})
      }
    },
    filters: {
      filterCustomDate(val) {
        let template = 'MM-dd hh:mm'
        return filterCustomDate(val, template)
      }
    },
    components: {
      Split
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .container
    width: 100%
    height: 100%
    overflow: hidden
    background: #f4f4f4
    .loadmore-wrap
      width: 100%
      max-width: 360px
      display: flex
      flex-direction: column
      background: #f4f4f4
      .loadmore-content
        width: 100%
        height: 100%
        padding-bottom: 100px
        flex: 1
        overflow: auto
        -webkit-overflow-scrolling: touch
        .mu-list
          padding: 0
          margin: 0
    .bottomTip
      height: 35px
      line-height: 35px
      text-align: center
</style>
