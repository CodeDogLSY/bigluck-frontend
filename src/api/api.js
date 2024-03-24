
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

/**
 * 员工列表
 * @param {*} data
 * @returns
 */
export const getEmployees = (data) => {
  let path = addPath + '/employees'
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 财务记录
 * @param {*} data
 * @returns
 */
export const getFinancialRecords = (data) => {
  let path = addPath + '/financialRecords'
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 获取单个居民的食材偏好
 * @param {*} data
 * @returns
 */
export const getDietaryPreferencesByResident = (data) => {
  // '/dietaryPreferences/resident/{residentId}'
  let path = addPath + '/dietaryPreferences/resident/'+data
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 添加单个居民的食材偏好
 * @param {*} data
 * @returns
 */
export const addDietaryPreferencesByResident = (data) => {
  let path = addPath + '/dietaryPreferences/add'
  console.log("getActivityList")
  return apiRequest.post(path, data)
}


/**
 * 财务记录增加
 * @param {*} data
 * @returns
 */
export const addFinancialRecord = (data) => {
  let path = addPath + '/financialRecords/add'
  console.log("getActivityList")
  return apiRequest.post(path, data)
}

/**
 * 食物库存列表
 * @param {*} data
 * @returns
 */
export const getFoodInventoryList = (data) => {
  let path = addPath + '/foodInventory'
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 医疗记录列表
 * @param {*} data
 * @returns
 */
export const getMedicalRecords = (data) => {
  let path = addPath + '/medical-records'
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 居民个人医疗记录列表
 * @param {*} data
 * @returns
 */
export const getMedicalRecordsByID = (data) => {
  let path = addPath + '/medical-records/resident/'+data
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 增加食物库存
 * @param {*} data
 * @returns
 */
export const addFoodInventory = (data) => {
  let path = addPath + '/foodInventory/add'
  console.log("getActivityList")
  return apiRequest.post(path, data)
}

/**
 * 减少食物库存
 * @param {*} data
 * @returns
 */
export const reduceFoodInventory = (data) => {
  let path = addPath + '/foodInventory/reduce'
  console.log("getActivityList")
  return apiRequest.post(path, data)
}

/**
 * 居民活动报名列表
 * @param {*} data
 * @returns
 */
export const getResidentActivities = (data) => {
  let path = addPath + '/residentActivities'
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 单个居民活动报名列表
 * @param {*} data
 * @returns
 */
export const getResidentActivitiesByResident = (data) => {
  //"/resident/{residentId}"
  let path = addPath + '/residentActivities/resident/'+data
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 单个活动的居民活动报名列表
 * @param {*} data
 * @returns
 */
export const getResidentActivitiesByActivity = (data) => {
  ///activity/{activityId}
  let path = addPath + '/residentActivities/activity/'+data
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 给单个居民活动报名
 * @param {*} data
 * @returns
 */
export const addResidentActivitiesByActivity = (data) => {
  ///activity/{activityId}
  let path = addPath + '/residentActivities/add'
  console.log("getActivityList")
  return apiRequest.post(path, data)
}

/**
 * 居民列表
 * @param {*} data
 * @returns
 */
export const getResidents = (data) => {
  let path = addPath + '/residents'
  console.log("getActivityList")
  return apiRequest.post(path, {})
}

/**
 * 排班列表
 * @param {*} data
 * @returns
 */
export const getSchedules = (data) => {
  let path = addPath + '/schedules'
  console.log("getActivityList")
  return apiRequest.post(path, {})
}








