import 'muse-ui/lib/styles/base.less'
import 'muse-ui-loading/dist/muse-ui-loading.css' // load css
import Helpers from 'muse-ui/lib/Helpers' // 工具类
// import Loading from 'muse-ui-loading' // 加载插件
// import Toast from 'muse-ui-toast' // 常用于主动操作后简短的消息提示功能
import 'muse-ui-message/dist/muse-ui-message.css'

import {
  AppBar,
  Avatar,
  BottomNav,
  Button,
  BottomSheet,
  Card,
  Checkbox,
  Dialog, // Message需要 弹框模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容
  Divider,
  Drawer,
  Grid,
  GridList,
  Icon,
  List,
  LoadMore,
  Paper,
  Progress,
  Snackbar, // 消息提示需要
  SubHeader,
  Tabs,
  Tooltip
  } from 'muse-ui'

const components = [
  AppBar,
  Avatar,
  BottomNav,
  Button,
  BottomSheet,
  Card,
  Checkbox,
  Dialog,
  Divider,
  Drawer,
  Grid,
  GridList,
  Icon,
  Helpers, // 工具类
  List,
  LoadMore,
  Paper,
  Progress,
  Snackbar,
  SubHeader,
  // Loading,
  // Toast
  Tabs,
  Tooltip
  ]

export default {
  install(Vue) {
    components.forEach(c => Vue.use(c))
  }
}
