// https://pinia.esm.dev/introduction.html
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useMainStore = defineStore('main', () => {

  // {
  //   "fuWuSc": "3年8个月",
  //   "gxMc": "本人",
  //   "jiaTingDz": "东四十条保利大厦三单元4号门5025人和部门",
  //   "jianDangRq": "2019-10-04",
  //   "nianLing": null,
  //   "ryid": "194009",
  //   "shouJi": "13621003893",
  //   "xingBie": "男",
  //   "xingMing": "张永安",
  //   "zhuangTaiTxt": "服务中"
  // }
  const personData = reactive({
    list: [],//被照护人人员列表
    index: -1,//当前选中人员下标
  })

  /**
   * 是否更新家人列表
   */
  const updateList = ref(false)

  const localPhone = ref('')

  const setLocalPhone = (value) => {
    localPhone.value = value
  }

  /**
 * zone为区域选择模式时，此选项无效。
 * 单选模式下：true表示自动选择开启，即当前日期|选中日期即为选中日期，并加载对应数据；false表示关闭自动开始，不获取对应日期数据，并清空日期数据。
 */
  const isAutoSelect = ref(true)

  const setAutoSelect = (value) => {
    isAutoSelect.value = value
  }

  const setUpdateListStatus = (value) => {
    updateList.value = value
  }

  const userInfo = reactive({
    token: '',
    ryid: '',
    phone: '',
    avatar: '',
  })

  const systemInfo = reactive({
    height: 0,
  })

  /**
  * 用户数据
  * @param {*} value
  */
  const saveUserInfo = (phone, avatar) => {
    userInfo.phone = phone
    userInfo.avatar = avatar
  }

  /**
  * 保存高度
  * @param {*} value
  */
  const setHeight = (value) => {
    systemInfo.height = value
  }

  /**
  * 保存token
  * @param {*} value
  */
  const saveToken = (value) => {
    userInfo.token = value
  }

  /**
  * 保存ryid
  * @param {*} value
  */
  const saveRyid = (value) => {
    userInfo.ryid = value
  }

  /**
   * 初始化人员列表数据
   * @param {*} list
   */
  const insertList = (list) => {
    personData.list = []
    personData.list.push(...list)
    if (personData.list.length > 0) {
      personData.index = 0
    } else {
      personData.index = -1
    }
  }

  /**
 * 更新人员列表数据
 * @param {*} list
 */
  const updatePersonList = (list) => {
    let ryid = ''
    let hasReset = false
    if (personData.list.length > 0) {
      ryid = personData.list[personData.index].ryid
    }
    personData.list = []
    personData.list.push(...list)
    if (ryid) {
      for (let index = 0; index < personData.list.length; index++) {
        const element = personData.list[index]
        if (element.ryid === ryid) {
          personData.index = index
          hasReset = true
          break
        }
      }
    }

    if (!hasReset) {
      if (personData.list.length > 0) {
        personData.index = 0
      } else {
        personData.index = -1
      }
    }
  }

  /**
   * 变更当前人员
   * @param {*} value
   */
  const changeIndex = (value) => {
    personData.index = value
  }
  return {
    personData, insertList, changeIndex, updatePersonList,
    userInfo, saveToken, saveRyid,
    systemInfo, setHeight, saveUserInfo,
    updateList, setUpdateListStatus,
    setAutoSelect, isAutoSelect,
    localPhone, setLocalPhone
  }
})
