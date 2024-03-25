<template>
  <view class="page">
    <nut-calendar-card v-model="employees.selectDay" @change="onChange"></nut-calendar-card>
    <view class="item-list">

      <view class="item-item top">
        <text class="item-name">日期</text>
        <text class="item-description">值班人</text>
        <text class="item-history">联系方式</text>
      </view>
      <view class="item-item" v-for="item in employees.list" :key="item.itemId"
        :class="{ select: isSelect(item.schedule_date) }" @click="setDate(item.schedule_date)">
        <text class="item-name">{{ item.schedule_date }}</text>
        <text class="item-description">{{ item.employee_name }}</text>
        <text class="item-history">123456</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import './index.scss'
import dayjs from 'dayjs'
import { reactive, ref } from 'vue'
import Taro from '@tarojs/taro'
import { getSchedules } from '../../api/api'
const employees = reactive({
  list: [],
  selectDay: new Date()
})

const onChange = (val) => {
  console.log(val)
  const formattedDate = dayjs(val).format('YYYY-MM-DD')
  console.log(formattedDate)
}

const isSelect = (data) => {
  const formattedDate = dayjs(employees.selectDay).format('YYYY-MM-DD')
  if (data == formattedDate) {
    console.log(data)
    console.log(formattedDate)
  }
  return data == formattedDate
}

const setDate = (data) => {
  employees.selectDay = new Date(data)
}

Taro.showLoading()
getSchedules().then(res => {
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
