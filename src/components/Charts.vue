<template>
  <view class="bar-chart ">
    <EChart ref="canvas" />
    <div class="unit">{{ unit }}</div>
    <image class="icon" :src="iconUrl" />
  </view>
</template>

<script setup>
import { ref, onMounted, watchEffect, watch } from "vue"
import Taro from "@tarojs/taro"
import { EChart } from "echarts4taro3"
import { getSignHistoryList } from '../api/api'

const iconUrl = ref('')

const props = defineProps({
  type: String,
  unit: String,
  start: String,
  end: String,
  ryid: String,
  title: String,
  randomKey: Number
})

let myChartObject = null

// watchEffect(() => {
//     if (myChartObject) {
//         getSignDataList()
//     }
// })

watch(() => props.start, () => {
  getSignDataList()
})
watch(() => props.end, () => {
  getSignDataList()
})
watch(() => props.ryid, () => {
  getSignDataList()
})
watch(() => props.randomKey, () => {
  getSignDataList()
})

function getSignDataList () {
  let data = {
    // ryid: 122323,
    // start: '2017-11-28',
    // end: '2023-11-30',
    ryid: props.ryid,
    start: props.start,
    end: props.end,
    type: props.type
  }
  getSignHistoryList(data).then(res => {
    console.log(res)
    if (res.returnCode === 1 && res.returnData) {
      if (res.returnData.length > 0 && res.returnData[0].iconUrl) {
        iconUrl.value = res.returnData[0].iconUrl
      }
      if (props.type === 'XY') {
        let x = []
        let y = []
        let y1 = []
        for (let index = 0; index < res.returnData.length; index++) {
          const element = res.returnData[index]
          x.push(element.date)
          const numList = element.value.split('/')
          y.push(Number(numList[0]))
          y1.push(Number(numList[1]))
        }
        options.series[0].data = y
        options.series[1].data = y1
        options.xAxis.data = x
      } else {
        let x = []
        let y = []
        for (let index = 0; index < res.returnData.length; index++) {
          const element = res.returnData[index]
          x.push(element.date)
          y.push(Number(element.value))
        }
        options.series[0].data = y
        options.xAxis.data = x
      }

      myChartObject.setOption(options)
    }


  }).catch(e => {
    console.log(e)
  })
}

const canvas = ref(null)
const options = {
  title: {
    text: props.title,
    textStyle: {
      fontSize: 14,
    },
    left: 30,
    top: 10
  },
  width: '82%',
  height: '78%',
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: '6%',
    right: '10%',
    top: '22%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: "category",
    data: [],
    show: true,
    axisLabel: {
      color: '#666', // 标签文字颜色为灰色
      fontSize: 12, // 标签文字大小为 12 像素
      interval: 0,// 强制显示所有标签
      rotate: 30
    }
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: true,
    },
    min: 'dataMin',
    max: 'dataMax',
    splitLine: {
      lineStyle: {
        type: "dotted"
      }
    }
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true
    },
  ],
}

if (props.type === 'XY') {
  options.series.push({
    data: [],
    type: 'line',
    smooth: true
  })
}

onMounted(() => {
  const echartComponentInstance = canvas.value // 组件实例
  Taro.nextTick(() => {
    setTimeout(() => {
      // 初始化图表
      echartComponentInstance.refresh(options).then((myChart) => {
        myChartObject = myChart
        getSignDataList()
        // /** 异步更新图表数据 */
        // setInterval(() => {
        //     let firstValue = options.series[0].data.shift()
        //     options.series[0].data.push(firstValue)
        //     myChart.setOption(options) // myChart 即为 echarts 实例，可使用的实例方法，具体可参考 echarts 官网
        // }, 2000)
      })
      // echartComponentInstance.refresh()
    })


  })
})
</script>

<style lang="scss">
.bar-chart {
  width: 100%;
  height: 100%;
  position: relative;

  .unit {
    position: absolute;
    right: 10px;
    top: 10px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
  }

  .icon {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
  }
}
</style>
