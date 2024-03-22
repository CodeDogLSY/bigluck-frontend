<!-- 日历控件，按月展示数据，有日志记录的当天特殊标识，当前选中的日期，特殊标识。 -->

<template>
  <div class="calendar">
    <div class="month-bar">
      <image class="arrow" src="../assets/img/arrow-left.svg" @tap="changeMonth(-1)">
      </image>
      <div class="month">{{ dateDate.year }}年&nbsp;{{ monthNameList[dateDate.month] }}</div>
      <image class="arrow" src="../assets/img/arrow-right.svg" @tap="changeMonth(1)">
      </image>
    </div>
    <div class="week-bar">
      <div class="week-item" v-for="item in weekList" :key="item">{{ item }}</div>
    </div>
    <div class="day-bar">
      <div class="day-item" v-for="(item, index) in emptyList" :key="index">
        <div class="day">
        </div>
        <div class="point">
        </div>
      </div>
      <div class="day-item" v-for="(item, index) in dayList" :key="index" @click="selectDay(index)"
        :class="{ 'in-zone': item.inZone }">
        <div class="day" :class="{ select: index === (dateDate.date - 1) && (!props.zone) && isAutoSelect }">
          {{ item.daySite }}
        </div>
        <div class="point" :class="{ select: item.hasLog }">
        </div>
      </div>
    </div>

    <div class="bar" v-if="zone">
      <div class="btn" :class="{ 'active': hasZone }" @tap="searchCustomTime">查询</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watchEffect, ref, watch } from 'vue'
import { getDaysInMonth } from '../tools/dateTool'
import dayjs from 'dayjs'
import Taro from '@tarojs/taro'
import { useMainStore } from '../stores/main'
const store = useMainStore()

const props = defineProps({
  dayLogList: Array,
  zone: Boolean,//true 为区域选择模式，false为单选模式
})

/**
 * zone为区域选择模式时，此选项无效。
 * 单选模式下：true表示自动选择开启，即当前日期|选中日期即为选中日期，并加载对应数据；false表示关闭自动开始，不获取对应日期数据，并清空日期数据。
 */
const isAutoSelect = ref(true)

const emit = defineEmits(['dateChange', "customTimeSearch"])

const weekList = ['日', '一', '二', '三', '四', '五', '六']
const monthNameList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const dayList = reactive([]) //当月展示天数
const emptyList = reactive([])//当月首行空格天数
const dateDate = reactive({ //非zone模式下，为当前选中时间，zone模式下，为当前展示
  year: 2023,//年
  month: 1,//月
  date: 1,//日
  day: 1,//周几
  dayNum: 30,//当月天数
})

const zoneDate = reactive([])
const hasZone = ref(false)

/**
 * 根据当前日期数据，更新页面
 */
const updateDaysView = () => {
  //获取当前月第一天的星期
  console.log(`${dateDate.year}/${dateDate.month + 1}/1`)
  let dateFirst = new Date(`${dateDate.year}/${dateDate.month + 1}/1`)
  {
    // 填充第一排空格
    emptyList.splice(0, emptyList.length)
    console.log("--------nmlgb--------")
    console.log(dateFirst.getDay())
    console.log(dateFirst)
    console.log(JSON.stringify(dateFirst))
    console.log("--------nmlgb--------")
    if (dateFirst.getDay() > 0) {
      for (let index = 0; index < dateFirst.getDay(); index++) {
        emptyList.push('empty')
      }
    }
  }
  {
    //填充所有日期
    dayList.splice(0, dayList.length)
    for (let index = 0; index < dateDate.dayNum; index++) {
      dayList.push({
        daySite: index + 1,
        hasLog: false
      })
    }
  }
}

/**
 * 根据当前日期数据，更新页面
 */
const updateZoneDaysView = () => {
  //获取当前月第一天的星期
  let dateFirst = new Date(`${dateDate.year}/${dateDate.month + 1}/1`)
  {
    // 填充第一排空格
    emptyList.splice(0, emptyList.length)
    if (dateFirst.getDay() > 0) {
      for (let index = 0; index < dateFirst.getDay(); index++) {
        emptyList.push('empty')
      }
    }
  }
  {
    //填充所有日期
    dayList.splice(0, dayList.length)
    for (let index = 0; index < dateDate.dayNum; index++) {
      let inZone = false
      if (props.zone && zoneDate.length > 0) {
        if (zoneDate.length === 1) {
          inZone = zoneDate[0].year === dateDate.year &&
            zoneDate[0].month === dateDate.month &&
            zoneDate[0].date === index + 1
        } else if (zoneDate.length === 0) {
          inZone = false
        } else {
          let zoneStart = dayjs(`${zoneDate[0].year}-${zoneDate[0].month + 1}-${zoneDate[0].date}`).valueOf()
          let zoneEnd = dayjs(`${zoneDate[1].year}-${zoneDate[1].month + 1}-${zoneDate[1].date}`).valueOf()
          let tempTime = dayjs(`${dateDate.year}-${dateDate.month + 1}-${index + 1}`).valueOf()
          if (zoneStart > zoneEnd) {
            inZone = zoneEnd <= tempTime && tempTime <= zoneStart
          } else {
            inZone = zoneStart <= tempTime && tempTime <= zoneEnd
          }
        }
      }
      dayList.push({
        daySite: index + 1,
        hasLog: false,
        inZone
      })
    }
  }
}

{
  //初次进入，初始化时间
  let dateNow = new Date()
  //获取当前日期
  dateDate.year = dateNow.getFullYear()
  dateDate.month = dateNow.getMonth()
  dateDate.date = dateNow.getDate()
  dateDate.day = dateNow.getDay()
  dateDate.dayNum = getDaysInMonth(dateDate.year, dateDate.month)
  if (props.zone) {
    zoneDate.push({
      year: dateNow.getFullYear(),
      month: dateNow.getMonth(),
      date: dateNow.getDate(),
      day: dateNow.getDay(),
      dayNum: getDaysInMonth(dateDate.year, dateDate.month),
    })
    updateZoneDaysView()
  } else {
    updateDaysView()
    console.log(dateDate)
    emit('dateChange', dateDate.year, dateDate.month, dateDate.date, true)
  }
}

/**
 * 当前月，有日志日期数据变更
 */
watchEffect(() => {
  for (let index = 0; index < dayList.length; index++) {
    const item = dayList[index]
    item.hasLog = false
  }
  if (props.dayLogList && props.dayLogList.length > 0) {
    props.dayLogList.forEach(element => {
      if (element) {
        const lastTwoChars = element.slice(-2)
        for (let index = 0; index < dayList.length; index++) {
          const item = dayList[index]
          if (item.daySite === Number.parseInt(lastTwoChars)) {
            item.hasLog = true
          }
        }
      }
    })
  }
})

/**
 * 修改选中的日期
 * @param {} index
 */
const selectDay = (index) => {
  isAutoSelect.value = true
  store.setAutoSelect(true)
  dateDate.date = index + 1
  if (props.zone) {
    if (zoneDate.length >= 2) {
      zoneDate.splice(0, zoneDate.length)
    } else {
      zoneDate.push({
        year: dateDate.year,
        month: dateDate.month,
        date: dateDate.date,
        day: dateDate.day,
        dayNum: getDaysInMonth(dateDate.year, dateDate.month),
      })
    }
    console.log(zoneDate)
    console.log(dateDate)
    console.log(dayList)
    if (zoneDate.length === 1) {
      dayList.forEach(e => {
        e.inZone = zoneDate[0].year === dateDate.year &&
          zoneDate[0].month === dateDate.month &&
          zoneDate[0].date === e.daySite
      })
    } else if (zoneDate.length === 0) {
      dayList.forEach(e => {
        e.inZone = false
      })
    } else {
      let zoneStart = dayjs(`${zoneDate[0].year}-${zoneDate[0].month + 1}-${zoneDate[0].date}`).valueOf()
      let zoneEnd = dayjs(`${zoneDate[1].year}-${zoneDate[1].month + 1}-${zoneDate[1].date}`).valueOf()
      console.log(zoneStart, zoneEnd)
      dayList.forEach(e => {
        let tempTime = dayjs(`${dateDate.year}-${dateDate.month + 1}-${e.daySite}`).valueOf()
        if (zoneStart > zoneEnd) {
          e.inZone = zoneEnd <= tempTime && tempTime <= zoneStart
        } else {
          e.inZone = zoneStart <= tempTime && tempTime <= zoneEnd
        }
      })
    }

  } else {
    //更新数据
    emit('dateChange', dateDate.year, dateDate.month, dateDate.date, true)
  }
  hasZone.value = zoneDate.length >= 2
}


/**
 * 修改选中的月份
 * @param {} index
 */
const changeMonth = (step) => {
  isAutoSelect.value = false
  store.setAutoSelect(false)
  console.log(step)
  dateDate.month += step
  if (dateDate.month === -1) {
    dateDate.year--
    dateDate.month = 11
  } else if (dateDate.month === 12) {
    dateDate.year++
    dateDate.month = 0
  }
  dateDate.dayNum = getDaysInMonth(dateDate.year, dateDate.month)
  if (dateDate.dayNum < dateDate.date) {
    dateDate.date = dateDate.dayNum
  }
  if (props.zone) {
    updateZoneDaysView()
  } else {
    updateDaysView()
    emit('dateChange', dateDate.year, dateDate.month, dateDate.date, false)
  }

}

const searchCustomTime = () => {
  if (hasZone.value) {
    let zoneStart = dayjs(`${zoneDate[0].year}-${zoneDate[0].month + 1}-${zoneDate[0].date}`).valueOf()
    let zoneEnd = dayjs(`${zoneDate[1].year}-${zoneDate[1].month + 1}-${zoneDate[1].date}`).valueOf()

    emit('customTimeSearch', zoneStart < zoneEnd ? zoneStart : zoneEnd, zoneStart > zoneEnd ? zoneStart : zoneEnd)
  } else {
    Taro.showToast({
      title: '请选择时间区段',
      icon: 'error',
      duration: 2000
    })
  }
}

</script>

<style lang="scss">
@import '../app.scss';

.calendar {
  width: calc(100%);
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;

  .month-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    border-bottom: 1px solid #e6e6e6;

    .arrow {
      width: 31px;
      height: 31px;
      padding: 7px;
      box-sizing: border-box;
    }
  }

  .week-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    font-size: 13px;

    .week-item {
      width: calc(100% / 7);
      text-align: center;
      line-height: 36px;
    }
  }

  .day-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    font-size: 13px;

    .day-item {
      width: calc(100% / 7);
      text-align: center;
      line-height: 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      padding-top: 4px;

      &.in-zone {
        background-color: pink;
      }

      .day {
        line-height: 22px;
        width: 22px;
        text-align: center;

        &.select {
          border-radius: 50%;
          background-color: $base-color;
          color: white;
        }
      }

      .point {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: transparent;
        margin-top: 4px;
        margin-bottom: 10px;

        &.select {
          background-color: $base-color;
        }
      }
    }
  }

  .bar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .btn {
      background-color: #666;
      color: white;
      border-radius: 20px;
      padding: 2px 20px;

      &.active {
        background-color: $base-color;
      }
    }
  }
}
</style>
