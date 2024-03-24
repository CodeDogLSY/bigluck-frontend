<template>
  <view class="page">
    <div class="top">
      <!-- {"name":"张三","gender":"男","age":"65","health_status":"健康良好","check_in_date":"2022-01-01","birth_date":"1957-05-10","reason_for_stay":"退休居住"} -->
      <image src="../../assets/img/avatar-gray.png" mode="aspectFill"></image>
      <div class="name-bar">
        <div class="bar">
          <text class="name">{{ residentData.base.name }}</text>
          <text class="gender">{{ residentData.base.gender }}</text>
          <text class="age">{{ residentData.base.age }}</text>
        </div>

        <div class="bar">入住时间：{{ residentData.base.check_in_date }}</div>
        <div class="bar">入住原因：{{ residentData.base.reason_for_stay }}</div>
        <div class="bar health">健康状态：{{ residentData.base.health_status }}</div>

      </div>

    </div>
    <nut-tabs v-model="value">
      <nut-tab-pane title="报名活动" pane-key="1">

        <view class="activity-item">
          <text class="activity-name">活动名称</text>
          <text class="activity-description">时间</text>
          <text class="activity-date">反馈</text>
        </view>
        <view class="activity-item" v-for="item in residentData.activitylist" :key="item.id">
          <text class="activity-name">{{ item.activityName }}</text>
          <text class="activity-description">{{ item.activityDate }}</text>
          <text class="activity-date">{{ item.feedback }}</text>
        </view>
      </nut-tab-pane>
      <nut-tab-pane title="饮食偏好" pane-key="2">
        <view class="activity-item">
          <text class="activity-name">偏好</text>
          <text class="activity-description">过敏</text>
        </view>
        <view class="activity-item" v-for="item in residentData.dietaryPreferenceList" :key="item.id">
          <text class="activity-name">{{ item.dietaryPreferences }}</text>
          <text class="activity-description">{{ item.dietaryRestrictions }}</text>
        </view>
      </nut-tab-pane>
      <nut-tab-pane title="就诊记录" pane-key="3">
        <view class="activity-item">
          <text class="activity-name">疾病</text>
          <text class="activity-description">历史</text>
          <text class="activity-date">用药</text>
        </view>
        <view class="activity-item" v-for="item in residentData.medicalRecordList" :key="item.id">
          <text class="activity-name">{{ item.health_condition }}</text>
          <text class="activity-description">{{ item.medical_history }}</text>
          <text class="activity-date">{{ item.medication }}</text>
        </view>
      </nut-tab-pane>
    </nut-tabs>

  </view>
</template>

<script setup>
import './index.scss'
import { reactive ,ref} from 'vue'
import Taro from '@tarojs/taro'
import { getResidentActivitiesByResident,getDietaryPreferencesByResident ,getMedicalRecordsByID} from '../../api/api'
const residentData = reactive({
  base:{},
  activitylist: [],
  dietaryPreferenceList: [],
  medicalRecordList: [],
})

const value = ref('1');


console.log(Taro.getCurrentInstance().router.params)
  let params = Taro.getCurrentInstance().router.params
  residentData.base = JSON.parse(params.data)

getResidentActivitiesByResident(residentData.base.id).then(res => {
  console.log(res)
  if (res && res.length > 0) {
    residentData.activitylist = res
  } else {
    Taro.showToast({
      title: '无数据',
      icon: 'error',
      duration: 2000
    })
  }
}).catch(e => {
  console.log(e)
})


getDietaryPreferencesByResident(residentData.base.id).then(res => {
  console.log(res)
  if (res && res.length > 0) {
    residentData.dietaryPreferenceList = res
  } else {
    Taro.showToast({
      title: '无数据',
      icon: 'error',
      duration: 2000
    })
  }
}).catch(e => {
  console.log(e)
})

getMedicalRecordsByID(residentData.base.id).then(res => {
  console.log(res)
  if (res && res.length > 0) {
    residentData.medicalRecordList = res
  } else {
    Taro.showToast({
      title: '无数据',
      icon: 'error',
      duration: 2000
    })
  }
}).catch(e => {
  console.log(e)
})
</script>
