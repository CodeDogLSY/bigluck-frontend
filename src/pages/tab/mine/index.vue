<template>
  <view class="mine">
    <view class="top">
      <image src='../../../assets/img/avater.png' class="avater"></image>
      <text class="phone">13302548964</text>
    </view>

  </view>
</template>

<script setup>
import './index.scss'
import Taro from '@tarojs/taro'
import { useDidShow } from '@tarojs/taro'
import SelectPerson from '../../../components/SelectPerson.vue'

import { useMainStore } from '../../../stores/main'
import { reactive, watch } from 'vue'
import { getSignList, getPersonList } from '../../../api/api'
import { useShareAppMessage } from '@tarojs/taro'
useShareAppMessage((res) => {
  return {
    title: '太福',
    path: '/pages/auth/index',
  }
})

const store = useMainStore()
let currentMember = {}
const signList = reactive([])
/**
 * 更新被照护人数据
 */
useDidShow(() => {
  console.log(Taro)
  Taro.getStorage({
    key: 'localId',
  }).then(res => {
    console.log(res)
    if (res.data) {
      let ids = JSON.parse(res.data)
      let unionId = ids.unionid
      getPersonList(unionId).then(
        (res) => {
          // let id = ''
          // if (res.returnData.kehuLx === '付款人') {
          //   //保存家人信息
          //   if (res.returnData.bzhrlist && res.returnData.bzhrlist.length > 0) {
          //     id = res.returnData.bzhrlist[0].ryid
          //   }
          // } else {
          //   id = res.returnData.khid
          // }
          // store.saveRyid(id)
          // store.saveUserInfo(res.returnData.shouji, res.returnData.photo)
          store.updatePersonList(res.returnData.bzhrlist)
        }
      )
    }
  }).catch(e => {
  })
})

const getBodyData = () => {
  signList.splice(0, signList.length)
  getSignList(currentMember).then(res => {
    console.log(res)
    if (res.returnCode === 1 && res.returnData) {
      let list = res.returnData
      console.log(JSON.stringify(list))
      list.sort((a, b) => {
        if (a.text === '血压' && b.text !== '血压') {
          return -1 // a排在b前面
        } else if (a.text !== '血压' && b.text === '血压') {
          return 1 // b排在a前面
        } else {
          return 0 // 保持原有顺序
        }
      })
      console.log(JSON.stringify(list))
      signList.push(...list)
    }
  }).catch(e => {
    console.log(e)
  })
}

watch(store.personData, (newValue, oldValue) => {
  if (newValue.index != -1) {
    currentMember = store.personData.list[store.personData.index]
    getBodyData()
  }
}, {
  immediate: true
})

const callService = () => {
  Taro.makePhoneCall({
    phoneNumber: '400-111-1128'
  })
}
const gotoClassList = () => {
  Taro.navigateTo({
    url: '/pages/classList/index',
  })
}
const gotoSigns = () => {
  Taro.navigateTo({
    url: '/pages/signs/pages/signs/index',
  })
}

const gotoFamilyManage = () => {
  Taro.navigateTo({
    url: '/pages/family/familyManage/index'
  })
}
</script>
