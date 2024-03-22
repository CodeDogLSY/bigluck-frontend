<template>
  <nut-swiper :loop="true" :height="eHeight" direction="vertical" :pagination-visible="false" :touchable="true"
    style="height: 100%">

    <nut-swiper-item v-for="item in state.list" :key="item">
      <image :src="item.fengMianUrl" alt="" mode="scaleToFill" />
      <!-- <div class="tip-content">
        {{ item.neiRongTxt }}
      </div> -->

    </nut-swiper-item>
  </nut-swiper>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'
import { useMainStore } from '../../../stores/main'
import { getTips } from '../../../api/api'
import { useShareAppMessage } from '@tarojs/taro'
useShareAppMessage((res) => {
  return {
    title: '太福|服务报告',
    path: '/pages/auth/index',
  }
})

const store = useMainStore()
const eHeight = ref(store.systemInfo.height)
const state = reactive({
  list: []
})

Taro.showLoading()
getTips().then(res => {
  console.log(res)
  state.list = res.returnData
  Taro.hideLoading()
}).catch(e => {
  console.log(e)
  Taro.hideLoading()
})

</script>
<style lang="scss">
.nut-swiper-item {
  line-height: 100%;
  position: relative;

  image {
    width: 100%;
    height: 100%;
  }

  // .img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: contain;
  //   background-color: white;
  // }

  .tip-content {
    position: absolute;
    top: 20%;
    left: 20px;
    right: 20px;
    padding: 20px;
    line-height: 1.5;
    font-size: 15px;
    width: auto;
    margin: auto;
    z-index: 100;
    background-color: #00000066;
    color: white;
    border-radius: 20px;
  }


}
</style>
