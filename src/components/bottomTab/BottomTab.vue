<template>
  <div class="bottom-tab">
    <mu-bottom-nav @change="change" :value.sync="tab">
      <mu-bottom-nav-item value="home" title="首页" icon="home"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="channel" title="频道" icon="group_work"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="dynamic" title="动态" icon="location_on"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="purchase" title="会员购" icon="local_mall"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
  export default {
    name: 'BottomTab',
    data() {
      return {
        tab: 'home'
      }
    },
    methods: {
      change(val) {
        // console.log(val)
        this.$router.push(val)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
</style>
