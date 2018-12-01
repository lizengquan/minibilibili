<template>
  <div class="recommend-play" ref="scroll">
    <div>
      <!-- {{listData}} -->
      <div class="owner">
        <mu-appbar style="width: 100%; height: 62px" color="#fff" z-depth="0">
          <mu-avatar :size="30" slot="left">
            <img :src="listData.item.owner.face" v-if="listData.item.owner">
            <img :src="listData.item.face" alt="">
          </mu-avatar>
          <div class="name" slot="left">
            <div class="userName" v-if="listData.item.owner">{{listData.item.owner.name}}</div>
            <div class="userName" v-if="listData.item.author">{{listData.item.author}}</div>
            <span class="fans" v-show="listData.item.attributes">{{listData.item.attribute | transformNumPoint}}粉丝</span>
          </div>
          <mu-button color="#fb7299" text-color="#fff" slot="right">
            <mu-icon :size="18" value="add"></mu-icon>
            关注
          </mu-button>
        </mu-appbar>
      </div>
      <div class="playInfo">
        <i class="toggleIcon" :class="{active: show}" @click="show = !show"></i>
        <transition name="fade">
          <div class="title" v-if="show">{{listData.item.title}}</div>
          <div class="title" style="height: 20px" v-else>{{listData.item.title}}</div>
        </transition>
        <div class="minInfo">
          <div class="bar">
            <span class="attribute" v-show="listData.item.stat.view">{{listData.item.stat.view | transformNumPoint}}</span>
            <span class="danmaku" v-show="listData.item.stat.danmaku">{{listData.item.stat.danmaku}}</span>
            <span class="pubdate" v-show="listData.item.pubdate">{{listData.item.pubdate | filterCustomDate}}</span>
            <span class="pubdate">{{listData.item.create}}</span>
            <span class="aid">AV{{listData.item.aid}}</span>
          </div>
          <mu-expand-transition>
            <p class="desc" v-show="show">{{listData.item.desc}}</p>
          </mu-expand-transition>
        </div>
        <ul class="iconList">
          <li class="iconItem" :class="{active: isClickUp}" @click="changeUp(listData.item.stat)">
            <mu-tooltip :open="clickUp"  placement="right-end" :content="upTipTxt">
              <mu-button icon>
                <mu-checkbox color="rgb(251, 114, 153)" v-model="selects" value="value1" uncheck-icon="thumb_up_alt_border" checked-icon="thumb_up_alt"></mu-checkbox>
              </mu-button>
            </mu-tooltip>
            <div>{{listData.item.stat.like}}</div>
          </li>
          <li class="iconItem" :class="{active: isClickDown}" @click="chageDown(listData.item.stat)">
            <mu-tooltip :open="clickDown" :content="downTipTxt">
              <mu-button icon>
                <mu-checkbox color="rgb(251, 114, 153)" v-model="selects" value="value2" uncheck-icon="thumb_down_alt_border" checked-icon="thumb_down_alt"></mu-checkbox>
              </mu-button>
            </mu-tooltip>
            <div>{{ isClickDown ? 1 : '差评'}}</div>
          </li>
          <li class="iconItem" :class="{active: isClickCoin}" @click="changeCoin(listData.item.stat)">
              <mu-tooltip :open="clickCoin" :content="coinTipTxt">
                <mu-button icon>
                  <mu-checkbox color="rgb(251, 114, 153)" v-model="selects" value="value3" uncheck-icon="monetization_on_border" checked-icon="monetization_on"></mu-checkbox>
                </mu-button>
              </mu-tooltip>
            <div>{{listData.item.stat.coin}}</div>
          </li>
          <li class="iconItem" :class="{active: isClickFavorite}" @click="changeFavorite(listData.item.stat, listData)">
              <mu-tooltip :open="clickFavorite" :content="favoriteTipTxt">
                <mu-button icon>
                  <mu-checkbox color="rgb(251, 114, 153)" v-model="selects" value="value4" uncheck-icon="grade_border" checked-icon="grade"></mu-checkbox>
                </mu-button>
              </mu-tooltip>
            <div>{{listData.item.stat.favorite}}</div>
          </li>
          <li class="iconItem" @click="showShare(true)">
            <mu-button icon>
              <mu-checkbox color="#757575" v-model="selects" value="value5" uncheck-icon="share_border" checked-icon="share"></mu-checkbox>
            </mu-button>
            <div>{{listData.item.stat.share}}</div>
          </li>
        </ul>
      </div>
      <div class="recList">
        <div class="recItem" v-for="(item, index) in listData.list" :key="index" v-if="listData.item.aid !== item.aid" @click="toPlay(item, listData)">
          <mu-ripple class="mu-ripple-wrapper"></mu-ripple>
          <div class="recImg">
            <img :src="item.pic" width="100%" height="100%">
          </div>
          <div class="recContent">
            <div class="title">{{item.title}}</div>
            <div class="des">
              <span class="name" v-if="item.owner">{{item.owner.name}}</span>
              <span class="name" v-if="listData.item.author">{{listData.item.author}}</span>
              <span class="attribute">{{item.attribute | transformNumPoint}}</span>
              <span class="attribute" v-if="item.play">{{item.play | transformNumPoint}}</span>
              <span class="danmaku" v-show="item.stat.danmaku">{{item.stat.danmaku}}</span>
            </div>
            <i class="menuIcon"></i>
          </div>
        </div>
        <!-- <div class="bottomTip">╮(╯3╰)╭再怎么找也没有啦</div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import {transformNumPoint, filterCustomDate} from '../../assets/js/tools'
  import {TOGGLE_SHOW_SHARE, USER_FAVORITE_DATA, CANCEL_FAVORITE_ITEM} from '../../store/mutation-types'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    props: {
      listData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        selects: [],
        isClickUp: false,
        clickUp: false,
        isClickDown: false,
        clickDown: false,
        isClickCoin: false,
        clickCoin: false,
        isClickFavorite: false,
        clickFavorite: false,
        upTipTxt: '哔哩哔哩：感谢点赞，推荐已收到啦',
        downTipTxt: '哔哩哔哩：差评成功',
        coinTipTxt: '哔哩哔哩：投币成功',
        favoriteTipTxt: '哔哩哔哩：收藏成功',
        show: false
      }
    },
    computed: mapGetters(['getFavoriteData']),
    created() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scroll, {
            click: true,
            bounce: false
          })
        } else {
          this.scroll.refresh()
        }
        this.getFavoriteData.forEach(item => { // 是否收藏
          if (item.listData.item.aid === this.listData.item.aid) {
            this.isClickFavorite = true
            this.selects.push('value4')
            // console.log(item.listData.item.aid, this.listData.item.aid)
            // console.log('recommend-play')
          }
        })
      })
    },
    methods: {
      ...mapActions(['getVideoInfo']),
      ...mapMutations({
        showShare: TOGGLE_SHOW_SHARE,
        getUserFavoriteData: USER_FAVORITE_DATA,
        cancelFavoriteData: CANCEL_FAVORITE_ITEM
      }),
      toPlay(item, list) {
        this.$router.push({path: '/switchPlayDetail/*', query: {item, list}})
        // this.$router.push({name: 'switchPlayDetail', params: {item, list}})
        let aid = item.aid
        let axios = this.axios
        this.getVideoInfo({axios, aid})
      },
      setTimeHide(toggleTip) {
        setTimeout(() => {
          this.clickUp = false
          this.clickDown = false
          this.clickCoin = false
          this.clickFavorite = false
        }, 1000)
      },
      changeUp(item) {
        if (this.isClickUp) {
          item.like--
          this.isClickUp = false
          this.upTipTxt = '哔哩哔哩：取消点赞'
        } else {
          item.like++
          this.isClickUp = true
          this.upTipTxt = '哔哩哔哩：感谢点赞，推荐已收到啦'
        }
        this.clickUp = true
        this.setTimeHide()
      },
      chageDown(item) {
        if (this.isClickDown) {
          this.isClickDown = false
          item.dislike++
          this.downTipTxt = '哔哩哔哩：取消差评'
        } else {
          item.dislike--
          this.isClickDown = true
          this.downTipTxt = '哔哩哔哩：差评成功'
        }
        this.clickDown = true
        this.setTimeHide()
      },
      changeCoin(item) {
        item.coin++
        this.isClickCoin = true
        this.clickCoin = true
        this.setTimeHide()
      },
      changeFavorite(item, listData) {
        let aid = listData.item.aid
        if (this.isClickFavorite) {
          this.isClickFavorite = false
          item.favorite--
          this.favoriteTipTxt = '哔哩哔哩：取消收藏'
          this.cancelFavoriteData(aid)
        } else {
          item.favorite++
          this.isClickFavorite = true
          this.favoriteTipTxt = '哔哩哔哩：收藏成功'
          // console.log('收藏', listData, listData.item.aid)
          // let aid = listData.item.aid
          this.getUserFavoriteData({aid, listData})
        }
        this.clickFavorite = true
        this.setTimeHide()
      }
    },
    filters: {
      transformNumPoint(val) {
        return transformNumPoint(val)
      },
      filterCustomDate(val) {
        let template = 'MM-dd'
        return filterCustomDate(val, template)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .recommend-play
    width: 100%
    height: 100%
    overflow: hidden
    .owner
      margin: 0 12px
      button
        width: 66px
        height: 24px
        font-size: 12px
      .name
        margin-left: 12px
        .userName
          margin-top: 6px
          line-height: 1.2
          font-size: 12px
          color: #333
        .fans
          font-size: 10px
          color: #9b9b9b
    .playInfo
      position: relative
      .title
        margin: 0 42px 0 12px
        color: #333
        white-space: normal
        text-overflow: ellipsis
        overflow: hidden
        transition: all 300s
        &.fade-enter, &.fade-leave-to
          height: 20px
      .toggleIcon
        position: absolute
        top: 0
        right: 10px
        width: 24px
        height: 24px
        background: url(../../assets/img/mall_submit_icon_fold.png) no-repeat
        background-size: 16px auto
        &.active
          background: url(../../assets/img/mall_submit_icon_unfold.png) no-repeat
          background-size: 16px auto
      .minInfo
        margin: 0 12px
        font-size: 12px
        color: #999
        .bar
          height: 32px
          line-height: 32px
          span
            display: inline-block
            margin-right: 10px
          .attribute
            padding-left: 16px
            background: url(../../assets/img/mall_video_num.png) no-repeat left center
            background-size: auto 14px
          .danmaku
            padding-left: 16px
            background: url(../../assets/img/mall_video_danmaku_num.png) no-repeat left center
            background-size: auto 14px
      .iconList
        display: flex
        margin: 10px 0
        text-align: center
        font-size: 12px
        .iconItem
          color: #757575
          flex: 1
          &.active
            color: rgb(251, 114, 153)
          .mu-button
            width: 20px
            height: 20px
            transform: translateY(2px)
    .recList
      .recItem
        position: relative
        display: flex
        padding: 8px 0 8px 12px
        padding-right: 12px
        font-size: 0
        .mu-ripple-wrapper
          position: absolute
          top: 0
          left: 0
          height: 100%
          width: 100%
          overflow: hidden
          z-index: 2
        .recImg
          flex: 0 0 117px
          margin-right: 10px
          width: 117px
          height: 73px
          border-radius: 4px
          overflow: hidden
        .recContent
          position: relative
          flex: 1
          .title
            margin-bottom: 4px
            line-height: 1.3
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            font-size: 14px
          .des
            position: absolute
            bottom: -2px
            span
              display: inline-block
              padding-left: 16px
              font-size: 10px
              color: #999
            @mixin videoInfo($url)
              background:
                image: $url
                repeat: no-repeat
                position: left middle
                size: 14px auto
            .name
              width: 100%
              @include videoInfo(url('../../assets/img/ic_up_gray.png'))
            .attribute
              @include videoInfo(url(../../assets/img/mall_video_num.png))
            .danmaku
              margin-left: 8px
              @include videoInfo(url(../../assets/img/mall_video_danmaku_num.png))
          .menuIcon
            position: absolute
            right: 6px
            bottom: 4px
            width: 14px
            height: 14px
            background: url(../../assets/img/ic_more.png) no-repeat
            background-size: 14px auto
</style>
