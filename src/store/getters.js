// 收藏去重的方法
export const getFavoriteData = (state) => {
  let arr = state.userFavoriteData
  let result = []
  // 收藏去重
  function arrDuplicateRemoval(arr, keyName) {
    let res = new Set([])
    arr.forEach((json) => { // 遍历数组[{aid: 2233, listData: {}}, ...]
      let beforeSize = res.size // set的size属性可以获取set中元素的个数
      res.add(json[keyName]) // Set中不能添加重复元素
      let afterSize = res.size
      if (beforeSize !== afterSize) {
        result.push(json)
      }
    })
    // console.log(result)
    return result // 这个return的是函数内部的
  }
  arrDuplicateRemoval(arr, 'aid')
  return result // 计算属性要带return值
}

export const getHistoryData = (state) => {
  if (!state.historyData) {
    return
  }
  let arr = state.historyData
  let result = []
  // 收藏去重
  function arrDuplicateRemoval(arr, keyName) {
    let res = new Set([])
    arr.forEach((json) => { // 遍历数组[{aid: 2233, listData: {}}, ...]
      let beforeSize = res.size // set的size属性可以获取set中元素的个数
      res.add(json[keyName]) // Set中不能添加重复元素
      let afterSize = res.size
      if (beforeSize !== afterSize) {
        result.push(json)
      }
    })
    // console.log(result)
    return result // 这个return的是函数内部的
  }
  arrDuplicateRemoval(arr, 'aid')
  return result // 计算属性要带return值
}
