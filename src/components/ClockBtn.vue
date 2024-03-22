<!-- 倒计时按钮 -->
<template>
    <div class="btn-wrapper">
        <div class="btn" v-show="state.type" @click="start">获取验证码</div>
        <nut-countdown time="60000" ref="Countdown" :autoStart="false" format=" ss 秒" @on-end="end" v-show="!state.type" />
    </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import Taro from '@tarojs/taro'
const Countdown = ref(null)
const reg = /^1(3\d|4[579]|5[0-35-9]|6[567]|7[0135678]|8\d|9[89])\d{8}$/

const props = defineProps({
    phone: String,
    start: Boolean
})

watch(() => props.start, (newValue, oldValue) => {
    if (newValue) {
        state.type = false
        Countdown.value.start()
    }
})

const emits = defineEmits(['getCode'])

const state = reactive({
    type: true,//true为未计时，false为计时

})

const start = () => {
    if (props.phone && reg.test(props.phone)) {
        emits('getCode')
    } else {
        Taro.showToast({
            title: '请输入正确手机号',
            icon: 'error',
            duration: 2000
        })
    }
}

const end = () => {
    state.type = true
    Countdown.value.reset()
}

</script>
<style lang="scss">
.btn-wrapper {
    width: 100px;
    height: 36px;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cccccc;
    color: white;
}
</style>