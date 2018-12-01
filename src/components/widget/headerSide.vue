<template>
  <div class="header-side">
    <mu-appbar style="width: 100%;" color="#FB7299" text-color="#fff" :z-depth="depth">
      <mu-button icon slot="left" flat @click="close()">
        <mu-icon :value="iconVal"></mu-icon>
      </mu-button>
      <div class="title" slot="left" v-show="title">{{title}}</div>
      <div class="editTitle" slot="right" v-show="editTitle">{{editTitle}}</div>
      <mu-button icon slot="right" flat v-show="isOperation" @click="operation()">
        <mu-icon value="search"></mu-icon>
      </mu-button>
      <div class="editTitle" slot="right" v-show="edit" @click="editFun()">{{edit}}</div>
    </mu-appbar>
  </div>
</template>

<script>
  export default {
    props: {
      iconVal: { // icon的值
        type: String,
        default: 'arrow_back'
      },
      title: { // 标题
        type: String
      },
      editTitle: {
        type: String
      },
      depth: { // 阴影深度
        type: Number,
        default: 4
      },
      isOperation: {
        type: Boolean,
        default: false
      },
      edit: {
        type: String
      }
    },
    methods: {
      close() {
        this.$emit('emit-close')
      },
      operation() {
        this.$emit('emit-operation')
      },
      editFun() {
        this.$emit('emit-edit')
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .header-side
    .mu-appbar
      button
        padding: 0
      .title
        margin-left: 8px
        font-size: 16px
      .editTitle
        margin-right: 10px
        font-size: 14px
</style>
