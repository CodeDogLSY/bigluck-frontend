<template>
  <view class="page">
    <template v-for="data in state.list" :key="data.zgid">

      <view class="card">
        <div class="person">
          <image class="avater" :src="data.photo ? data.photo : '123'" @error="handleImageError(data)"></image>

          <div class="text-content">
            <view class="bar">
              <text class="name">{{ data.xingming }}</text>
              <!-- <text class="position">{{ data.xingming }}</text> -->
            </view>

            <view class="bar" v-if="props.type == 'GJ'">
              <view class="btn" @tap="call(data)">
                <image class="icon" src="../assets/img/phone-round.svg"></image>
                <text class="desc-name">电话</text>
              </view>

              <view class="wechat" v-if="data.config_id">
                <cell bind:startmessage='startmessage' bind:completemessage="completemessage" :plugid='data.config_id'
                  buttonText="0" />
                <text class="desc-name">微信</text>
              </view>

            </view>
          </div>

        </div>

        <!-- <cell bind:startmessage='startmessage' bind:completemessage="completemessage"
          plugid='8e5de704328db765bf795f5f439f0a65' buttonText="4" blockStyle="button" styleType="2" /> -->

        <view class="list">

          <view class="title">
            <image class="icon" src="../assets/img/person.svg"></image>
            <text class="name">个人简介</text>
          </view>

          <view class="desc">{{ data.jianjie }}</view>

          <view class="title" v-if="data.shanChang">
            <image class="icon" src="../assets/img/person.svg"></image>
            <text class="name">专业技能</text>
          </view>

          <view class="desc" v-if="data.shanChang">{{ data.shanChang }}</view>

          <view class="title">
            <image class="icon" src="../assets/img/certified.svg"></image>
            <text class="name">认证信息</text>
          </view>

          <view class="cert-list">
            <view class="item" v-for="(item, index) in data.certList" :key="index">
              <!-- <image class="icon" src="../assets/img/correct.svg"></image> -->
              <view class="dot"></view>
              <text class="info">{{ item }}</text>
            </view>
          </view>
        </view>
      </view>


    </template>

  </view>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue'
import LikeNum from './LikeNum.vue'
import { getServiceMemberDetail, getContactIdByQxId } from '../api/api'
import Taro from '@tarojs/taro'
import defaultImageUrl from '../assets/img/avater.png'
import { View } from '@tarojs/components'

const state = reactive({
  list: [],
  showWechat: false
})
const props = defineProps({ type: String, id: String })

const handleImageError = (data) => {
  data.photo = defaultImageUrl
}

const call = (data) => {
  Taro.makePhoneCall({
    phoneNumber: data.shouji
  })
}

watch(() => props.id, (newValue, oldValue) => {
  getDetail()
})

const openService = () => {
  Taro.openCustomerServiceChat({
    extInfo: { url: 'https://work.weixin.qq.com/kfid/kfc6a1e2d6f6d7d2a1d' },
    corpId: 'ww0a570cd603245f64',
    success: function (res) { }
  })
}

const getContactId = (data) => {
  getContactIdByQxId({
    "type": 1,
    "scene": 1,
    "style": 2,
    "remark": "小程序客户",
    "state": "小程序",
    "user": [
      // "18201112072"
      data.weiXin
    ],
    "is_temp": false
  }).then(res => {
    console.log(res.config_id)
    state.list.forEach(element => {
      if (element.zgid === data.zgid) {
        element.config_id = res.config_id
      }
    })
  }).catch(e => {

  })
}

const getDetail = () => {
  Taro.showLoading()
  getServiceMemberDetail({
    ryid: props.id,
    type: props.type
  }).then(res => {
    console.log(res)
    if (res.returnCode === 1 && res.returnData && res.returnData.length > 0) {
      let list = res.returnData
      list.forEach(element => {
        element.config_id = ''
        if (element.teDian) {
          element.labelList = element.teDian.split('，')
        }
        if (props.type == 'GJ') {
          getContactId(element)
        }
        if (element.renZhengXinXi && element.renZhengXinXi.length > 0) {
          let certList = ['身份实名认证', '无犯罪证明', '健康证', '学历认证']
          let arr = element.renZhengXinXi
          arr = arr.sort(
            function compareFunction (param1, param2) {
              return param1.localeCompare(param2, "zh")
            })
          certList.push(...arr)
          element.certList = certList
        } else {
          element.certList = ['身份实名认证', '无犯罪证明', '健康证', '学历认证']
        }
      })

      state.list = list

    }
    Taro.hideLoading()
  }).catch(e => {
    Taro.hideLoading()
    console.log(e)
  })
}

onMounted(() => {
  getDetail()
})

</script>

<style lang="scss">
.page {
  width: 100%;

  .card {
    width: calc(100% - 26px);
    margin-left: 13px;
    background-color: white;
    border-radius: 10px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    .person {
      position: relative;
      height: 30px;

      .avater {
        width: 60px;
        height: 60px;
        border: 2px solid #f4c9dc;
        border-radius: 50%;
        position: absolute;
        box-sizing: border-box;
        left: 12px;
        top: -30px;
      }

      .text-content {
        position: absolute;
        width: calc(100% - 90px);
        left: 86px;
        top: -30px;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;

        .bar {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 30px;

          .name {
            font-weight: 700;
          }

          .position {
            font-size: 12px;
            background-color: #f4b1ce;
            color: white;
            padding: 2px 10px;
            border-radius: 20px;
            margin-left: 20px;
          }


          .btn {
            flex: 0 0 auto;
            width: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;

            .icon {
              width: 27px;
              height: 27px;
              box-sizing: border-box;
            }

            .desc-name {
              margin-left: 6px;
              font-size: 13px;
            }
          }

          .wechat {
            flex: 0 0 auto;
            width: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;

            .cell--bubble {
              width: 26px;
              height: 26px;
              box-sizing: border-box;

              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;

              image {
                width: 12px;
                height: 12px;
              }
            }



            .desc-name {
              margin-left: 6px;
              font-size: 13px;
            }
          }
        }
      }

    }

    .list {
      font-size: 10px;

      .title {
        width: calc(100% - 26px);
        margin-left: 14px;
        height: 30px;
        border-bottom: 1px solid #bfbfbf;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 20px;
        padding: 2px 0;

        .icon {
          width: 21px;
          height: 21px;
        }

        .name {
          font-size: 13px;
          font-weight: 700;
          margin-left: 5px;
        }
      }

      .desc {
        width: calc(100% - 26px);
        margin-left: 13px;
        font-size: 12px;
        height: auto;
        margin-top: 9px;
      }

      .cert-list {
        width: calc(100% - 26px);
        margin-left: 13px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 10px;

        .item {
          width: 50%;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 14px;
          margin-top: 8px;

          .dot {
            background-color: #f4b1ce;
            width: 4px;
            height: 4px;
            border-radius: 2px;
            margin-right: 8px;
          }

          .info {
            font-size: 12px;
          }

          .icon {
            width: 19px;
            height: 19px;
            margin-right: 14px;
          }
        }
      }
    }

  }


  .qr {
    width: 150px;
    height: 150px;
  }



}
</style>
