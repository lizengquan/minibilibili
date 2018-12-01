<template>
  <div class="channel">
    <div class="header">
      <top-navigation></top-navigation>
    </div>
    <ul class="channelList">
      <li class="channelListItem" v-for="item in list" :key="item.id" @click="toChannelList(item, true)" v-if="item.id > 0">
        <img :src="item.img" width="100%"/>
        <span class="title">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {categoryList} from '../../assets/js/animationId.config'
  import TopNavigation from '../topNav/TopNavigation'
  import {mapActions} from 'vuex'

  export default {
    name: 'ChannelView',
    data() {
      return {
        list: categoryList
      }
    },
    methods: {
      ...mapActions(['changeChannel']),
      toChannelList(item, val) {
        this.changeChannel({item, val})
      }
    },
    components: {
      TopNavigation
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .channelList
    position: absolute
    top: 56px
    left: 0
    right: 0
    bottom: 56px
    .channelListItem
      display: inline-block
      padding: 20px
      width: 25%
      text-align: center
      img
        width: 100%
        max-width: 50px
      span
        display: block
        color: #333
</style>
