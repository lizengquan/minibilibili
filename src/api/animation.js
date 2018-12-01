// 动漫分区 tid在animationsId.config.js pn=id?tid=tid
import jsonp from '../assets/js/jsonp'
import { options, commonParams } from './config'

// https://api.bilibili.com/archive_rank/getarchiverankbypartion?tid=24&pn=0
export function getAniList(tid, n) {
  let url = 'https://api.bilibili.com/archive_rank/getarchiverankbypartion'

  const data = Object.assign({}, commonParams, {
    tid: tid,
    pn: n
  })

  return jsonp(url, data, options)
}
