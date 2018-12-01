<template>
    <mu-bottom-sheet :open="open" @close="closeBottomSheet">
      <div class="subTitle">转发至站内</div>
      <div class="boxList">
        <ul class="list">
          <li class="item">
            <mu-avatar :size="44">
              <img src="../../assets/img/share/ic_player_share_dynamic.png">
            </mu-avatar>
            <span class="title">动态</span>
          </li>
          <li class="item">
            <mu-avatar :size="44">
              <img src="../../assets/img/share/ic_share_friend_msg.png">
            </mu-avatar>
            <span class="title">消息</span>
          </li>
        </ul>
      </div>
      <mu-divider></mu-divider>
      <div class="subTitle">分享至站外</div>
      <div class="boxList" ref="boxScroll">
        <ul class="list" ref="listDom">
          <li class="item" ref="itemDom" v-for="(item, index) in shareList" :key="index">
            <mu-avatar :size="44">
              <img :src="item.imgUrl">
            </mu-avatar>
            <span class="title">{{item.title}}</span>
          </li>
        </ul>
      </div>
      <div class="split"></div>
      <mu-flex justify-content="center" align-items="center">
        <mu-button full-width color="primary" @click="closeBottomSheet">取消</mu-button>
      </mu-flex>
    </mu-bottom-sheet>
</template>

<script>
  import {TOGGLE_SHOW_SHARE} from '../../store/mutation-types'
  import {mapState, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        shareList: [
          {
            imgUrl: require('../../assets/img/share/bili_socialize_qq_chat.png'),
            title: 'QQ'
          },
          {
            imgUrl: require('../../assets/img/share/bili_socialize_qq_zone.png'),
            title: 'QQ空间'
          },
          {
            imgUrl: require('../../assets/img/share/bili_socialize_wx_chat.png'),
            title: '微信'
          },
          {
            imgUrl: require('../../assets/img/share/bili_socialize_wx_moment.png'),
            title: '朋友圈'
          },
          {
            imgUrl: require('../../assets/img/share/bili_socialize_sina.png'),
            title: '微博'
          },
          {
            imgUrl: require('../../assets/img/share/bili_socialize_copy.png'),
            title: '复制链接'
          },
          {
            imgUrl: require('../../assets/img/share/bili_socialize_generic.png'),
            title: '更多'
          }
        ]
      }
    },
    computed: mapState({
      open: 'showShare'
    }),
    updated() {
      // console.log(this.$refs.itemDom)
      this._initScrollX()
    },
    methods: {
      ...mapMutations({
        closeShare: TOGGLE_SHOW_SHARE
      }),
      closeBottomSheet() {
        this.closeShare(false)
      },
      _initScrollX() {
        // console.log(this.$refs.itemDom)
        // 数组[] => true  判断数组的长度
        if (this.shareList && this.$refs.itemDom.length) {
          let itemLength = this.shareList.length
          let itemWidth = this.$refs.itemDom[0].offsetWidth + 26
          // console.log(itemWidth)
          this.$refs.listDom.style.width = itemWidth * itemLength + 'px'
          // console.log(this.$refs.listDom.offsetWidth)
          this.$nextTick(() => {
            this.boxScroll = new BScroll(this.$refs.boxScroll, {
              click: true,
              scrollX: true,
              bounce: false
            })
          })
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .subTitle
    margin-left: 22px
    height: 44px
    line-height: 44px
    font-size: 12px
    color: #505050
  .boxList
    width: 100%
    .list
      width: 100%
      white-space: nowrap
      .item
        display: inline-block
        margin: 0 0 14px 22px
        text-align: center
        font-size: 0
        color: #999
        .mu-avatar
          display: block
          margin-bottom: 6px
        .title
          font-size: 12px
  .split
    width: 100%
    height: 5px
    background: #f4f4f4
  .mu-button
    height: 55px
    font-size: 16px
    color: #505050
</style>
