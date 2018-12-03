<template>
    <div class="history">
      <header-side :iconVal="iconVal" :title="title" :edit="edit" @emit-close="backPre()" @emit-edit="showCheckBox()"></header-side>
      <div class="content">
        <div class="loading" v-show="loading">
          <mu-circular-progress class="progress" color="#FB7299" :stroke-width="3" :size="36"></mu-circular-progress>
        </div>
        <div class="noLogin" v-show="!getHistoryData.length">
          <div class="bgImg" :class="{loginImg: loginIn}"></div>
          <div class="title" v-show="!loginIn">登录后历史记录就可以多设备同步啦~</div>
          <div class="title">这里还什么都没有呢~</div>
          <div class="login-btn" @click="login(true)" v-show="!loginIn">
            <mu-button flat text-color="#fff">立即登录</mu-button>
          </div>
        </div>
        <div class="collectionList" ref="listScroll">
          <ul>
            <li class="videoItem" v-for="(list, key) in getHistoryData" :key="key">
              <div class="left" v-show="isCheckBox">
                <mu-checkbox :value="list.listData.item.aid" color="#fb7299" v-model="checkbox" @change="abc"></mu-checkbox>
              </div>
              <div class="right" :style="{marginLeft: `${marginLeft}px`}" @click="toPlay(list.listData.item, list.listData.list)">
                <div class="videoImg">
                  <img v-lazy="list.listData.item.pic" width="100%" height="100%">
                </div>
                <div class="videoInfo">
                  <div class="title">{{list.listData.item.title}}</div>
                  <div class="des">
                    <span class="name" v-show="list.listData.item.author">{{list.listData.item.author}}</span>
                    <span class="play" v-show="list.listData.item.play">{{list.listData.item.play}}</span>
                    <span class="name" v-if="list.listData.item.owner">{{list.listData.item.owner.name}}</span>
                    <span class="time">{{new Date().getTime() | filterCustomDate}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottomSelect" v-show="isCheckBox">
        <div class="selectAll">
          <mu-checkbox label="全选" color="#fb7299" :input-value="checkAll" @change="handleCheckAll"></mu-checkbox>
        </div>
        <div class="cancel" :class="{active: checkbox.length}" :disabled="checkbox.length" @click="isCancel()">删除</div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {headerSide} from '../../widget'
  import {filterCustomDate} from '../../../assets/js/tools'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import {TOGGLE_LOGIN, TOGGLE_SET_DRAWER, CHEAR_HISTORY} from '../../../store/mutation-types'

  export default {
    name: 'HistoricalRecords',
    created() {
      this.$nextTick(() => {
        this.listScroll = new BScroll(this.$refs.listScroll, {
          click: true
        })
        setTimeout(() => {
          this.loading = false
        }, 1500)
      })
    },
    data() {
      return {
        loading: true,
        iconVal: 'menu',
        title: '历史记录',
        checkbox: [],
        checkAll: false,
        edit: '编辑',
        isCheckBox: false,
        marginLeft: 0
      }
    },
    computed: {
      ...mapState(['loginIn', 'historyData']),
      ...mapGetters(['getHistoryData'])
    },
    watch: {
      checkbox(newArr, oldArr) {
        if (newArr.length < oldArr.length) {
         this.checkAll = false
        }
      }
    },
    methods: {
      ...mapMutations({
        login: TOGGLE_LOGIN,
        showDrawer: TOGGLE_SET_DRAWER,
        cancelCollection: CHEAR_HISTORY
      }),
      ...mapActions(['getVideoInfo']),
      toPlay(item, list) {
        // this.$router.push({path: '/playDetail', query: {index}})
        this.$router.push({name: 'playDetail', params: {item, list}})
        let aid = item.aid
        let axios = this.axios
        this.getVideoInfo({axios, aid})
      },
      backPre() {
        this.showDrawer(true)
      },
      handleCheckAll(val) {
        let checkAll = []
        this.getHistoryData.forEach((item, index) => {
          checkAll.push(item.aid)
        })
        if (val) {
          this.checkbox = checkAll
          this.checkAll = true
          return
        }
        this.checkbox = []
        this.checkAll = false
      },
      abc(val) {
        // console.log(this.checkAll)
        if (this.checkbox.length === this.getHistoryData.length) {
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
          this.edit = '取消'
          console.log('13')
          this.marginLeft = 48
        } else {
          this.edit = '编辑'
          this.marginLeft = 0
        }
      },
      isCancel() { // 清除本地存储
        this.$confirm('清除已选中的历史记录吗?', {
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
    filters: {
      filterCustomDate(val) {
        let template = 'MM-dd hh:mm'
        return filterCustomDate(val, template)
      }
    },
    components: {
      headerSide
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .history
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fafafa
    z-index: 200
    .content
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      .loading
        position: absolute
        top: 6px
        left: 0
        right: 0
        bottom: 0
        display: flex
        justify-content: center
        algin-items: center
        background: #fff
        z-index: 100
        .progress
          align-self: center
      .noLogin
        width: 70%
        margin: 50% auto
        text-align: center
        .bgImg
          display: inline-block
          margin-bottom: 14px
          width: 128px
          height: 108px
          background: url(../../../assets/img/img_tips_error_not_loin.png) no-repeat
          -webkit-background-size: auto 100%
          background-size: auto 100%
          &.loginImg
            width: 104px
            height: 110px
            text-align: center
            background: url(../../../assets/img/ic_no_income.png) no-repeat
            -webkit-background-size: auto 100%
            background-size: auto 100%
        .title
          color: #999
          font-size: 12px
        .login-btn
          margin-top: 32px
          width: 100%
          button
            background: #fb7299
      .collectionList
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 56px
        overflow: hidden
        .videoItem
          position: relative
          padding: 0 12px
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
                font-size: 10px
                color: #9e9e9e
                span
                  display: inline-block
                  padding-left: 16px
                .name
                  width: 100%
                  margin-bottom: 4px
                  background:
                    image: url(../../../assets/img/ic_up_gray.png)
                    repeat: no-repeat
                    position: left middle
                    size: 14px auto
                .time
                  padding-left: 0px
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
