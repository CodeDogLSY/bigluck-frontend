
import apiRequest from "./http"



/**
 * 正式环境为true
 * 测试环境为false
 */
let isPro = true
let addPath = isPro ? '' : ''

/**
 * 活动列表
 * @param {*} data
 * @returns
 */
export const getActivityList = (data) => {
  let path = addPath + '/activities'
  console.log("getActivityList")
  return apiRequest.post(path, {})
}





