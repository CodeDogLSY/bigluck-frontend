<template>
  <view class="page">
    <view class="item-list">
      <view class="item-item top">
        <text class="item-name">名称</text>
        <text class="item-description">数量</text>
        <text class="item-history">单位</text>
      </view>
      <view class="item-item" v-for="item in foodInventory.list" :key="item.itemId">
        <text class="item-name">{{ item.foodItem }}</text>
        <text class="item-description">{{ item.quantity }}</text>
        <text class="item-history">公斤</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import './index.scss'
import { reactive } from 'vue'
import Taro from '@tarojs/taro'
import { getFoodInventoryList } from '../../../api/api'
const foodInventory = reactive({
  list: []
})

Taro.showLoading()
getFoodInventoryList().then(res => {
  Taro.hideLoading()
  console.log(res)
  if (res && res.length > 0) {
    foodInventory.list = res
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
