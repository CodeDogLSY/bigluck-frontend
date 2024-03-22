<template>
    <view class="wrapper">
        <div class="content">
            <image class="close" src="../assets/img/close.svg" @tap="close"></image>
            <input v-model="state.phone" placeholder="请输入手机号" />
            <div class="bar">
                <input v-model="state.pwd" placeholder="请输入验证码" />
                <ClockBtn :phone="state.phone" @getCode="getCode" :start="state.start" />
            </div>
            <div class="login-btn" @click="login">
                登录
            </div>
        </div>
    </view>
</template>
<script setup>
import { reactive } from 'vue'
import ClockBtn from './ClockBtn.vue'
import Taro from '@tarojs/taro'
import { getPhoneCode } from '../api/api'

const emit = defineEmits(['phoneCodeLogin', 'closePhoneCodeLogin'])

const state = reactive({
    phone: '',
    pwd: '',
    start: false,//倒计时按钮控制
})

const close = () => {
    emit('closePhoneCodeLogin')
}

const login = () => {
    if (state.phone && state.pwd) {
        emit('phoneCodeLogin', state.phone, state.pwd)
    } else {
        Taro.showToast({
            title: '手机号验证码错误',
            icon: 'error',
            duration: 2000
        })
    }
}

const getCode = () => {
    if (state.phone) {
        Taro.showLoading()
        getPhoneCode(state.phone)
            .then(res => {
                console.log(res)
                if (res.returnCode === 1 && res.returnData) {
                    //正常获取code,开始倒计时
                    state.start = true
                    Taro.hideLoading()
                } else {
                    new Error('获取异常')
                }
            })
            .catch(e => {
                console.log(e)
                Taro.hideLoading()
                Taro.showToast({
                    title: '发送异常请重试',
                    icon: 'error',
                    duration: 2000
                })
            })
    } else {
        Taro.showToast({
            title: '请输入正确手机号',
            icon: 'error',
            duration: 2000
        })
    }
}
</script>
<style lang="scss">
@import '../app.scss';

.wrapper {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;

    .content {
        display: flex;
        width: calc(100% - 40px);
        box-sizing: border-box;
        background: #fff;
        border-radius: 8px;
        align-items: center;
        flex-direction: column;
        padding: 20px;

        .close {
            width: 30px;
            height: 30px;
            align-self: flex-end;
            margin-bottom: 10px;
        }

        input {
            width: 100%;
            flex: 1 1 auto;
            height: 36px;
            box-sizing: border-box;
            padding-left: 10px;
            border: 1px solid #cccccc;
        }

        .bar {
            display: flex;
            width: 100%;
            margin-top: 10px;
            flex-direction: row;

        }

        .login-btn {
            width: 100%;
            height: 36px;
            background-color: $base-color;
            color: white;
            margin-top: 10px;
            text-align: center;
            line-height: 36px;
            border-radius: 4px;
        }
    }
}
</style>