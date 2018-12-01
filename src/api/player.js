// 视频api
import jsonp from '../assets/js/jsonp'
import { options, commonParams } from './config'

// https://api.bilibili.com/playurl?callback=callbackfunction&aid=8626597&page=1&platform=html5&quality=1&vtype=mp4
export function getPlayer(id) { // 视频资源地址 aid
  let url = 'https://api.bilibili.com/playurl'

  const data = Object.assign({}, commonParams, {
    callback: 'callbackfunction',
    aid: id, // 对应的视频av号
    page: 1,
    platform: 'html5',
    quality: 1,
    vtype: 'mp4'
  })

  return jsonp(url, data, options)
}

export function getCommint(id) { // av号对应的视频评论列表
  let url = 'https://api.bilibili.com/x/v2/reply'

  const data = Object.assign({}, commonParams, {
    type: 1,
    sort: 2,
    oid: id, // 对应的视频av号
    pn: 1,
    nohot: 1
  })

  return jsonp(url, data, options)
}

export function getBarrage(cid) {
  let url = 'https://api.bilibili.com/x/v1/dm/list.so'
  const data = Object.assign({}, commonParams, {
    oid: cid // 对应的视频cid号
  })

  return jsonp(url, data, options)
}
