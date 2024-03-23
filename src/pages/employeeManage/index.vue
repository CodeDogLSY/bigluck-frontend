<template>
  <view class="page">
    <view class="item-list">
      <view class="item-item top">
        <text class="item-name">员工姓名</text>
        <text class="item-description">职位</text>
        <text class="item-history">联系方式</text>
      </view>
      <view class="item-item" v-for="item in employees.list" :key="item.itemId">
        <text class="item-name">{{ item.name }}</text>
        <text class="item-description">{{ item.position }}</text>
        <text class="item-history">{{ item.contact }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import './index.scss'
import { reactive } from 'vue'
import Taro from '@tarojs/taro'
import { getEmployees } from '../../api/api'
const employees = reactive({
  list: []
})

Taro.showLoading()
getEmployees().then(res => {
  Taro.hideLoading()
  console.log(res)
  if (res && res.length > 0) {
    employees.list = res
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
</script>
