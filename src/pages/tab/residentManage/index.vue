<template>
  <view class="page">
    <view class="item-list">
      <view class="item-item top">
        <text class="item-name">居民姓名</text>
        <text class="item-description">性别</text>
        <text class="item-history">入住时间</text>
      </view>

      <view class="item-item" v-for="item in residents.list" :key="item.itemId" @click="gotoDetail(item)">
        <text class="item-name">{{ item.name }}</text>
        <text class="item-description">{{ item.gender }}</text>
        <text class="item-history">{{ item.check_in_date }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import './index.scss'
import { reactive } from 'vue'
import Taro from '@tarojs/taro'
import { getResidents } from '../../../api/api'
const residents = reactive({
  list: []
})

Taro.showLoading()
getResidents().then(res => {
  Taro.hideLoading()
  console.log(res)
  if (res && res.length > 0) {
    residents.list = res
  } else {
    Taro.showToast({
      title: '无数据',
      icon: 'error',
      duration: 2000
    })
  }
}).catch(e => {
  console.log(e)
  Taro.hideLoading()
})

const gotoDetail = (data)=>{
  console.log(data)
  Taro.navigateTo({
    url: `/pages/residentDetail/index?data=${JSON.stringify(data)}`,
  })
}
</script>
