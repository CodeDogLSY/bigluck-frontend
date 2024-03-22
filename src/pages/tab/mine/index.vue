<template>
  <view class="mine">
    <view class="top">
      <image :src='store.userInfo.avatar' class="avater"></image>
      <text class="phone">{{ store.userInfo.phone ? store.userInfo.phone : store.localPhone }}</text>
      <view class="add_family">
        <image src='../../../assets/img/add-friend.svg' class="add-img"></image>
        <text class="add-text" @tap="gotoFamilyManage">家人管理</text>
      </view>
    </view>

    <view class="content">
      <view class="bar" style="margin-bottom: 10px;">
        <text class="title">体征数据</text>
        <SelectPerson />
      </view>

      <template v-for="(item, index) in signList" :key="index">
        <view class="bar" v-if="item.value">
          <image class="type" :src="item.iconUrl"></image>
          <text class="kind">{{ item.text }}</text>
          <text class="value">{{ item.value }}</text>
          <text class="date">{{ item.date }}</text>
        </view>
      </template>

      <view class="btn_more" @tap="gotoSigns">查看更多历史数据</view>

    </view>

    <view class="content" style="margin-top:22px;">
      <view class="bar" style="margin-bottom: 10px;">
        <text class="title">更多功能</text>
      </view>

      <view class="feature">
        <view class="item" @tap="gotoClassList" v-if="false">
          <image class="icon" src="../../../assets/img/video.svg"></image>
          <text class="name">课程中心</text>
        </view>
        <view class="item" @tap="callService">
          <image class="icon" src="../../../assets/img/call.svg"></image>
          <text class="name">客服电话</text>
        </view>
        <view class="item">
        </view>
      </view>

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
    title: '太福|服务报告',
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
