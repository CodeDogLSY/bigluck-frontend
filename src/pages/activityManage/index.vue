<template>
  <view class="page">
    <view class="activity-list">
      <view class="activity-item top">
        <text class="activity-name">活动名称</text>
        <text class="activity-description">类型</text>
        <text class="activity-date">时间</text>
      </view>
      <view class="activity-item" v-for="activity in activityData.list" :key="activity.activityId">
        <text class="activity-name">{{ activity.name }}</text>
        <text class="activity-description">{{ activity.description }}</text>
        <text class="activity-date">{{ activity.date }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import './index.scss'
import { reactive } from 'vue'
import Taro from '@tarojs/taro'
import { getActivityList } from '../../api/api'
const activityData = reactive({
  list: []
})

Taro.showLoading()
getActivityList().then(res => {
  Taro.hideLoading()
  console.log(res)
  if (res && res.length > 0) {
    activityData.list = res
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
