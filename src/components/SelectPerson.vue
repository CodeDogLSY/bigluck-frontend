<template>
  <view class="change-person" @tap="state.showSheet = true">
    <text class="name" @tap="state.showSheet = true">{{ current }}</text>
    <image class="arrow" src="../assets/img/arrow-down.svg" @tap="state.showSheet = true" />
    <div class="list" v-show="state.showSheet && localList.length > 0">
      <div class="item" v-for="(item, site) in localList" :key="site" :class="{
        select: site === store.personData.index
      }" @tap="(e) => {
  e.stopPropagation();
  selectPerson(site);
}">
        {{ item.name }}
      </div>
    </div>
    <div class="mask" v-show="state.showSheet" @tap="(e) => {
      e.stopPropagation();
      changeShowSheet(false)
    }">
    </div>
  </view>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
import { useMainStore } from '../stores/main'
const store = useMainStore()
const current = ref('无数据')
const localList = reactive([])
const state = reactive({
  showSheet: false
})

/**
 * 切换数据状态
 */
watch(store.personData, (newValue, oldValue) => {
  localList.splice(0, localList.length)
  if (newValue.index != -1) {
    for (let position = 0; position < newValue.list.length; position++) {
      const element = newValue.list[position]
      localList.push({
        // name: `${element.xingMing} (${element.gxMc})`,
        name: `${element.xingMing}`,
        position
      })
    }
    current.value = localList[newValue.index].name
  } else {
    current.value = '无数据'
  }
}, { immediate: true })

/**
 * 变更人员
 * @param {*} site
 */
const selectPerson = (site) => {
  state.showSheet = false
  store.changeIndex(site)
}

const changeShowSheet = (status) => {
  state.showSheet = status
}
</script>
<style  lang="scss">
.change-person {
  flex: 0 0 auto;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #999;
  border-radius: 15px;
  padding: 4px 16px;
  color: #808080;
  font-size: 14px;
  background-color: white;
  position: relative;

  .name {
    margin-right: 10px;
  }

  .arrow {
    width: 10px;
    height: 10px;
  }

  .list {
    position: absolute;
    width: 100%;
    left: 0;
    top: 21px;
    border: 1px solid #808080;
    z-index: 100000;
    background-color: white;
    border-radius: 6px;
    color: rgba(128, 128, 128, 1);
    padding-left: 6px;

    .item {
      line-height: 1.6;

      &.select {
        font-weight: 700;
      }
    }
  }
}

.mask {
  position: fixed;
  background-color: #80808080;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
}
</style>
