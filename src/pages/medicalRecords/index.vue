<template>
  <view class="page">
    <view class="item-list">
      <view class="item-item top">
        <text class="item-name">居民</text>
        <text class="item-description">健康状态</text>
        <text class="item-history">疾病历史</text>
        <text class="item-medication">用药状况</text>
      </view>
      <view class="item-item" v-for="item in medicalRecords.list" :key="item.itemId">
        <text class="item-name">{{ item.resident_name }}</text>
        <text class="item-description">{{ item.health_condition }}</text>
        <text class="item-history">{{ item.medical_history }}</text>
        <text class="item-medication">{{ item.medication }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import './index.scss'
import { reactive } from 'vue'
import Taro from '@tarojs/taro'
import { getMedicalRecords } from '../../api/api'
const medicalRecords = reactive({
  list: []
})

Taro.showLoading()
getMedicalRecords().then(res => {
  Taro.hideLoading()
  console.log(res)
  if (res && res.length > 0) {
    medicalRecords.list = res
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
