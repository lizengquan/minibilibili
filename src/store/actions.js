import * as types from './mutation-types'
import {getPlayer} from '../api/player'

// import api from '../api'
export default {
  async getHomeData({commit}, axios) { // 在main.js触发
    commit(types.REFRESH_AJAX, true) // 正在请求
    let ranking = await axios.get('/api/ranking')
    // console.log(ranking.data.data.text)
    let recommendData = JSON.parse(ranking.data.data.text)
    // console.log(recommendData.data)
    recommendData = recommendData.data
    commit(types.RECEVIVE_DATA, recommendData)
    commit(types.REFRESH_AJAX, false) // 请求完毕
  },
  hasLoginIn({commit}, val) {
    commit(types.HAS_LOGIN_IN, val)
  },
  async getVideoInfo({commit}, {axios, aid, data}) {
    // console.log(data, 123)
    // console.log(aid, data)
    commit(types.VIDEO_RECOMMENDDATA, data)
    commit(types.REFRESH_AJAX, true) // 正在请求
    // let playurl = await axios.get('/api/playurl?' + `aid=${aid}`)
    // getPlayer(8626597).then(res => { console.log(res) })
    let playurl = {}
    getPlayer(aid).then(res => { // 视频地址
      playurl = res
      let comment = {}
      axios.get('/api/comment?' + `aid=${aid}`).then((result) => { // 评论
        comment = result
        comment = JSON.parse(comment.request.responseText)
        // comment = comment.data
        comment = JSON.parse(comment.data)
        comment = comment.data
        // console.log(playurl)
        // console.log(comment)
        commit(types.RECEVIVE_VIDEO_DATA, {playurl, comment})
        commit(types.REFRESH_AJAX, false) // 请求完毕
      })
    })
  },
  changeChannel({commit}, payload) {
    commit('GET_CHANNEL_LIST', payload.item)
    commit('TOGGLE_CHANNEL_LIST', payload.val)
  },
  getAnimation({commit}, payload) {
      let query = `?id=${payload.tid}`
      // console.log(query)
      payload.axios.get('/api/animation' + query)
        .then((res) => {
          // console.log(res.data.data)
          let animationData = JSON.parse(res.data.data)
          // console.log(animationData.data.archives)
          animationData = animationData.data.archives
          commit(types.GET_ZONE_DATA, animationData)
        })
  },
  getSetDrawer({commit}, payload) {
    commit('SET_DRAWER_DATA', payload.setData)
    commit('TOGGLE_PUBLIC', payload.val)
  }
}
