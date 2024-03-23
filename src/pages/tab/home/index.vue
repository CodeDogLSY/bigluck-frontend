<template>
  <view class="home">
    <swiper class='banner' :vertical="false" :circular="true" indicatorDots="true" :autoplay="true">
      <swiper-item>
        <image src="../../../assets/img/banner1.jpg" mode="aspectFill"></image>
      </swiper-item>
      <swiper-item>
        <image src="../../../assets/img/banner2.jpg" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <view class="list">
      <view class="item" @tap="gotoServiceReport">
        <image src="../../../assets/img/title1.png" class="photo"></image>
        <text class="title">活动管理</text>
      </view>

      <view class="item" @tap="gotoServiceList">
        <image src="../../../assets/img/title2.png" class="photo"></image>
        <text class="title">医疗记录</text>
      </view>
      <view class="item" @tap="gotoMini">
        <image src="../../../assets/img/title3.svg" class="photo"></image>
        <text class="title">员工管理</text>
      </view>
      <view class="item" @tap="gotoWebview">
        <image src="../../../assets/img/title4.svg" class="photo"></image>
        <text class="title">排班管理</text>
      </view>


    </view>
  </view>
</template>

<script setup>
import './index.scss'
import { useDidShow } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import { getPersonList } from '../../../api/api'
import { useMainStore } from '../../../stores/main'
import { useShareAppMessage } from '@tarojs/taro'
useShareAppMessage((res) => {
  return {
    title: '太福|服务报告',
    path: '/pages/auth/index',
  }
})
const store = useMainStore()
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
          store.updatePersonList(res.returnData.bzhrlist)
        }
      )
    }
  }).catch(e => {
  })
})

const gotoServiceList = () => {
  Taro.navigateTo({
    url: '/pages/medicalRecords/index',
  })
}
const gotoServiceReport = () => {
  Taro.navigateTo({
    url: '/pages/activityManage/index',
  })
}

function gotoMini () {
  Taro.navigateTo({
    url: '/pages/employeeManage/index',
  })
}

function gotoWebview () {
  Taro.navigateTo({
    url: '/pages/schedulesManage/index',
  })
}

</script>
