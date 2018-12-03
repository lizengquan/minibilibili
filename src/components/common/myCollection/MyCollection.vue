<template>
  <div class="collection">
    <div class="header">
      <header-side :title="title" :iconVal="iconVal" :isOperation="search" :edit="edit" :depth="0" @emit-close="backPre()" @emit-edit="showCheckBox()"></header-side>
      <div class="topList" ref="topListScroll">
        <ul ref="topList">
          <li class="topNavItem">
            <span>视频</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="collectionList" ref="listScroll">
      <ul>
        <li class="videoItem" v-for="(list, key) in getFavoriteData" :key="key">
          <div class="left" v-show="isCheckBox">
            <mu-checkbox :value="list.listData.item.aid" color="#fb7299" v-model="checkbox" @change="abc"></mu-checkbox>
          </div>
          <div class="right" :style="{marginLeft: `${marginLeft}px`}"  @click="toPlay(list.listData.item, list.listData.list)">
            <div class="videoImg">
              <img v-lazy="list.listData.item.pic" width="100%" height="100%">
            </div>
            <div class="videoInfo">
              <div class="title">{{list.listData.item.title}}</div>
              <div class="des">
                <span class="name" v-show="list.listData.item.author">{{list.listData.item.author}}</span>
                <span class="play" v-show="list.listData.item.play">{{list.listData.item.play}}</span>
                <span class="name" v-if="list.listData.item.owner">{{list.listData.item.owner.name}}</span>
                <span class="play">{{list.listData.item.attribute}}</span>
                <span class="danmaku" v-show="list.listData.item.stat.danmaku">{{list.listData.item.stat.danmaku ? list.listData.item.stat.danmaku : '--'}}</span>
              </div>
            </div>
          </div>
        </li>
        <div class="bottomTip">╮(╯3╰)╭再怎么找也没有啦</div>
      </ul>
    </div>
    <div class="bottomSelect" v-show="isCheckBox">
      <div class="selectAll">
        <mu-checkbox label="全选" color="#fb7299" :input-value="checkAll" @change="handleCheckAll"></mu-checkbox>
      </div>
      <div class="cancel" :class="{active: checkbox.length}" :disabled="checkbox.length" @click="isCancel()">取消收藏</div>
    </div>
  </div>
</template>

<script>
  import {TOGGLE_SET_DRAWER, CANCEL_FAVORITE_ITEM} from '../../../store/mutation-types'
  import {headerSide} from '../../widget'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    created() {
      this.$nextTick(() => {
        this.listScroll = new BScroll(this.$refs.listScroll, {
          click: true
        })
      })
    },
    data() {
      return {
        title: '我的收藏',
        iconVal: 'menu',
        checkbox: [], // 复选框选中添加aid号，否则删除对应的
        checkAll: false, // 全选默认是false
        search: true, // 显示搜索
        edit: '编辑',
        isCheckBox: false,
        marginLeft: 0
      }
    },
    computed: {
      ...mapState(['userFavoriteData']),
      ...mapGetters(['getFavoriteData'])
    },
    watch: { // 观察者
      checkbox(newArr, oldArr) {
        if (newArr.length < oldArr.length) {
         this.checkAll = false // 不全选 新arr小于旧的arr
        }
      }
    },
    methods: {
      ...mapMutations({
        showDrawer: TOGGLE_SET_DRAWER,
        cancelCollection: CANCEL_FAVORITE_ITEM
      }),
      ...mapActions(['getVideoInfo']),
      backPre() {
        this.showDrawer(true)
      },
      toPlay(item, list) { // 进入视频页面
        // this.$router.push({path: '/playDetail', query: {index}})
        this.$router.push({name: 'playDetail', params: {item, list}})
        let aid = item.aid
        let axios = this.axios
        this.getVideoInfo({axios, aid})
      },
      handleCheckAll(val) { // 手动删除收藏记录
        let checkArr = []
        this.getFavoriteData.forEach((item, index) => {
          checkArr.push(item.aid)
        })
        if (val) {
          this.checkbox = checkArr
          this.checkAll = true // 全选
          return
        }
        this.checkbox = []
        this.checkAll = false
      },
      abc(val) {
        // console.log(this.checkAll)
        if (this.checkbox.length === this.getFavoriteData.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      cancel() {
        // console.log(this.checkbox) // 选中的aid号[36516600, 36708678]
        let aidArr = this.checkbox
        this.cancelCollection(aidArr)
        this.checkbox = []
      },
      showCheckBox() {
        this.isCheckBox = !this.isCheckBox // 显示隐藏
        if (this.isCheckBox) {
          this.edit = '完成'
          this.marginLeft = 48
        } else {
          this.edit = '编辑'
          this.marginLeft = 0
        }
      },
      isCancel() { // 清除本地存储
        this.$confirm('清除已选中的收藏记录吗?', {
          width: 350, // 对话框的宽度
          maxWidth: '80%', // 对话框最大宽度
          className: '', // 对话框的样式
          okLabel: '确定', // 对话框确定按钮文字
          cancelLabel: '取消', // 对话框取消按钮文字
          transition: 'scale' // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
        }).then((res) => { // 返回 Promise 对象
            // console.log(res.result) true false
            if (res.result) {
              this.cancel()
              return false
            }
            return false
        })
      }
    },
    components: {
      headerSide
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .collection
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #eaeaea
    z-index: 400
    .header
      box-shadow: 1px 2px 2px rgba(187, 187, 187, 1)
      background: rgb(251, 114, 153)
      .topList
        width: 100%
        box-sizing: border-box
        ul
          white-space: nowrap
          overflow: hidden
          width: 100%
        .topNavItem
          display: inline-block
          margin: 2px 10px 0
          height: 38px
          line-height: 38px
          font-size: 16px
          color: #fff
          span
            display: inline-block
            height: 38px
            line-height: 38px
            border-bottom: 2px solid #fff
    .collectionList
      position: absolute
      top: 96px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      .videoItem
        position: relative
        .left
          position: absolute
          top: 50%
          left: 15px
          margin-top: -12px
        .right
          display: flex
          padding: 10px 12px
          margin-top: 12px
          overflow: hidden
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
      .bottomTip
        height: 45px
        line-height: 45px
        text-align: center
        color: #999
  .bottomSelect
    display: flex
    position: fixed
    left: 0
    right: 0
    bottom: 0
    height: 48px
    background: #fff
    .selectAll
      flex: 1
      padding: 10px 0 0 15px
      height: 47px
      border-top: 1px solid #ccc
    .cancel
      flex: 0 0 100px
      width: 100px
      height: 48px
      line-height: 48px
      text-align: center
      color: #f0f0f0
      background: #ccc
      &.active
        color: #fff
        background: #ff3e3e
</style>
