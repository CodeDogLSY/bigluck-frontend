import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useMainStore } from './stores/main'
import Taro from '@tarojs/taro'

import { Swiper, SwiperItem } from '@nutui/nutui-taro'

import './app.scss'

const App = createApp({
  onShow (options) {
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())
App.use(Swiper)
App.use(SwiperItem)

const store = useMainStore()

function getHeight () {
  const { model, screenHeight, statusBarHeight } = Taro.getSystemInfoSync()
  let tabBarHeight = 0
  console.log(model)
  if (model.indexOf('iPhone X') !== -1 || model.indexOf('iPhone 11') !== -1) {
    // 如果是 iPhone X 或 11 等机型，则底部有安全区域，需要加上底部安全区域的高度
    tabBarHeight = 82 + 10
  } else if (model.indexOf('iPhone 13 (Pro)') !== -1) {
    tabBarHeight = 50 + 24
  } else if (model.indexOf('iPhone 12') !== -1 || model.indexOf('iPhone 13') !== -1 || model.indexOf('iPhone 14') !== -1) {
    tabBarHeight = 50 + 44
  } else {
    // 如果是其他机型，则默认 Tab 栏高度为 50
    tabBarHeight = 50
  }
  const { height } = Taro.getMenuButtonBoundingClientRect()
  const visibleHeight = screenHeight - height - statusBarHeight - tabBarHeight
  // const visibleHeight = screenHeight
  store.setHeight(visibleHeight)
}

getHeight()

export default App
