import * as types from './mutation-types'

// 公开对象
export default {
  [types.TOGGLE_LOGIN](state, val) {
    state.showLogin = val
  },
  [types.TOGGLE_SET_DRAWER](state, val) {
    state.showSetDrawer = val
  },
  [types.CHANGE_HEADER_TITLE](state, name) {
    state.headerTitle = state.decTitle[name]
  },
  [types.TOGGLE_HISTORY](state, val) {
    state.showHistory = val
  },
  [types.TOGGLE_OFFLINE](state, val) {
    state.showOffline = val
  },
  [types.TOGGLE_MY_COLLECTION](state, val) {
    state.showMyCollection = val
  },
  [types.TOGGLE_SIGN_UP](state, val) {
    state.showSignUp = val
  },
  [types.HAS_LOGIN_IN](state, val) {
    state.loginIn = val
  },
  [types.TOGGLE_SET_UP](state, val) {
    state.showSetUp = val
  },
  [types.RECEVIVE_DATA](state, data) { // 首页的数据
    state.ranking = data
  },
  [types.REFRESH_AJAX](state, status) { // 改变isAjax的状态值的方法
    state.isAjax = status
  },
  [types.VIDEO_RECOMMENDDATA](state, data) {
    state.videoRecommend = data
  },
  [types.RECEVIVE_VIDEO_DATA](state, data) {
    state.videoInfo = data
  },
  [types.GET_ZONE_DATA](state, data) {
    state.AnimationZoneData = data
  },
  [types.TOGGLE_CHANNEL_LIST](state, bool) {
    state.showChannelList = bool
  },
  [types.GET_CHANNEL_LIST](state, list) {
    state.getChannelList = list
  },
  [types.TOGGLE_SHOW_SHARE](state, val) {
    state.showShare = val
  },
  [types.USER_FAVORITE_DATA](state, data) {
    state.userFavoriteData.push(data)
  },
  [types.GET_HISTORY_DATA](state, data) {
    state.historyData.push(data)
    // console.log(state.historyData)
  },
  [types.CANCEL_FAVORITE_ITEM](state, aid) { // 取消收藏
    let arr = state.userFavoriteData
    if (aid instanceof Array) {
      aid.forEach(id => {
        arr.forEach((item, index) => { // 不符合条件的没有被删除掉
          if (item.aid === id) { // // 删除指定的aid的对象
            arr.splice(index, 1) // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
            // console.log(arr)
          }
        })
      })
    } else {
      arr.forEach((item, index) => { // 不符合条件的没有被删除掉
        if (item.aid === aid) { // // 删除指定的aid的对象
          arr.splice(index, 1) // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
          // console.log(arr)
        }
      })
    }
    // 封装成一个Array的方法
    // let arr = state.userFavoriteData
    // Array.prototype.del = function (filter) {
    //   var index = filter
    //   if (typeof filter === 'function') {
    //       for (var i = 0; i < this.length; i++) {
    //           if (filter(this[i], i)) index = i
    //       }
    //   }
    //   this.splice(index, 1)
    // }
    // arr.del(function (obj) {
    //     return obj.aid === aid
    // })
  },
  [types.CHEAR_HISTORY](state, aid) {
    let arr = state.historyData
    if (aid instanceof Array) { // 删除多个
      aid.forEach(id => {
        arr.forEach((item, index) => { // 不符合条件的没有被删除掉
          if (item.aid === id) { // // 删除指定的aid的对象
            arr.splice(index, 1) // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
            // console.log(arr)
          }
        })
      })
    } else { // 删除单个
      arr.forEach((item, index) => { // 不符合条件的没有被删除掉
        if (item.aid === aid) { // // 删除指定的aid的对象
          arr.splice(index, 1) // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
          // console.log(arr)
        }
      })
    }
  },
  [types.TOGGLE_SEARCH](state, val) {
    state.isSearch = val
  },
  [types.TOGGLE_PUBLIC](state, val) {
    state.isPublic = val
  },
  [types.SET_DRAWER_DATA](state, data) {
    state.setDrawerData = data
  }
}
