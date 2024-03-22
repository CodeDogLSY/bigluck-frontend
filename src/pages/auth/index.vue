<template>
  <view class="auth">
    <!-- <div class="pad-info">{{ info }}</div> -->
    <image class="logo" src="../../assets/img/logo.jpg"></image>
    <div class="title">太福</div>
  </view>
</template>

<script setup>
import './index.scss'
import Taro from '@tarojs/taro'
import { useShareAppMessage } from '@tarojs/taro'
import { reactive, ref } from 'vue'
import { useMainStore } from '../../stores/main'

useShareAppMessage((res) => {
  return {
    title: '太福',
    path: '/pages/auth/index',
  }
})

const store = useMainStore()

const showData = reactive({
  showGetPhone: false,
  showPhoneLogin: false,
  ids: {
    unionid: '',
    openid: '',
    phone: '',
    codetxt: ''
  },
})

setTimeout(() => {
  Taro.switchTab({
    url: '/pages/tab/home/index',
  })
}, 500)



</script>
