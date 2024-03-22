<template>
  <div class="list">
    <div class="item" v-for="item in  state.list " :key="item">
      <div class="title-bar">
        <image src="../../../assets/img/avatar-person.png" alt="" class="avatar" />
        <div class="name">王元平</div>
        <div class="time">2024/01/01 14:30</div>
        <div class="eye-bar" @click="item.b = !item.b">
          <image src="../../../assets/img/eye.png" alt="" class="eye" />
          <div class="num">15</div>
        </div>

        <div class="person-content" v-if="item.b">

          <div class="inner-content">
            <div class="person-list">
              <div class="cell" v-for="cell in personList" :key="cell">
                <div class="c-name"> {{ cell.name }}</div>
                <div class="c-family">{{ cell.desc }}</div>
              </div>
            </div>
            <div class="desc-person">*本条动态中的其他老人家属也可看到此内容
            </div>
          </div>

        </div>


      </div>
      <div class="content">
        <!-- <video src="" class="video"></video> -->
        <t-video v-if="item.a === 1" class="video"
          src="http://flv4mp4.people.com.cn/videofile7/pvmsvideo/2024/3/13/GuiZhou-WuFeng_b4732458529e9e71392559ea447d8730_android_c.mp4"
          style="width:100%;height: 100%;" bindProgress="onProgress" loop="{{true}}" show_fullscreen_btn="{{false}}"
          show_progress="{{false}}" bindVideoloaded="bindvideoloaded" bindVideosuccess="bindvideosuccess"
          bindVideofailed="bindvideofailed" />

        <t-video v-if="item.a === 2" class="video" :src="video_options.src" style="width:100%;height: 100%;"
          bindProgress="onProgress" loop="{{true}}" show_fullscreen_btn="{{false}}" show_progress="{{false}}"
          bindVideoloaded="bindvideoloaded" bindVideosuccess="bindvideosuccess" bindVideofailed="bindvideofailed" />

        <video v-if="item.a === 3" class="video" style="width:100%;height: 100%;" :src="src" initial-time="0"
          :controls="true" :autoplay="false" :loop="false" :muted="false" />

        <nut-swiper v-if="item.a === 4" :init-page="2" :auto-play="3000" pagination-visible pagination-color="#426543"
          pagination-unselected-color="#808080" style="height: 100%;">
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="height: 100%;">
            <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
          </nut-swiper-item>
        </nut-swiper>
      </div>
      <div class="sub-bar">
        <image src="../../../assets/img/path.png" alt="" class="type" />
        <div class="sub-title">20240203·日常运动-乒乓球快跑</div>
      </div>
      <div class="desc">
        今日份银杏舍长者运动量达标！✨💫🌟有趣都藏在今日的银杏舍活动中，不负今日好时光，感受一下运动与激情的魅力吧！我们在热烈而又欢快的乒乓球快跑小游戏中度过，集手脑协调于一起，开发长者大脑，健康在于运动！
      </div>

      <div class="operate-bar">
        <div class="operate-btn">
          <image src="../../../assets/img/like.png" alt="" class="icon" />
          <div class="name">点赞</div>
        </div>

        <div class="operate-btn" @click="download">
          <image src="../../../assets/img/download.png" alt="" class="icon" />
          <div class="name">下载</div>
        </div>

        <div class="operate-btn">
          <image src="../../../assets/img/plane.png" alt="" class="icon" />
          <div class="name">分享</div>
        </div>
      </div>

      <div class="msg-bar">
        <image src="../../../assets/img/avatar-gray.png" alt="" class="avatar-input" />
        <div class="content-input">在这里留下你的评论吧…</div>
      </div>

      <div class="msg-list">
        <div class="cell-msg">
          <div class="person">王翠花:</div>
          <div class="msg-content">
            <span class="reply-to">回复了</span>
            <span class="reply-p">谢书娟</span>
            <span class="content">请继续努力！</span>
            <span class="replay-o" @click="state.msgReply = true">回复</span>
          </div>
        </div>

        <div class="cell-msg">
          <div class="person">谢书娟:</div>
          <div class="msg-content">
            <span class="content">后续安排更多</span>
            <span class="replay-o" @click="state.msgReply = true">回复</span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="msg-reply" v-if="state.msgReply" @click="state.msgReply = false">

    <div class="bar" @tap="(e) => {
      e.stopPropagation();
    }">
      <input type=" text" class="input" placeholder="友善的评论是交流的起点">
      <div class="btn" @click="state.msgReply = false">发送</div>
    </div>
  </div>

</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'
import { useMainStore } from '../../../stores/main'
import { getCurrentInstance } from '@tarojs/taro'


const store = useMainStore()
const state = reactive({
  msgReply: false,
  list: [
    {
      a: 1,
      b: false
    },
    {
      a: 2,
      b: false
    },
    {
      a: 3,
      b: false
    },
    {
      a: 4,
      b: false
    }]
})

const list = ref([
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
])

const personList = ref([
  {
    name: "徐景泽",
    desc: "（刘强、李明）"
  },
  {
    name: "王**",
    desc: "（李**、王**）"
  },
  {
    name: "周**",
    desc: "（赵*、孙**）"
  },
  {
    name: "薛**",
    desc: "（王**）"
  },
  {
    name: "周**",
    desc: "（赵*、周**）"
  },
  {
    name: "郑**",
    desc: "（薛**、郑*）"
  },
  {
    name: "张*",
    desc: "（张*、周**）"
  },
  {
    name: "徐景泽",
    desc: "（刘强、李明）"
  },
  {
    name: "王**",
    desc: "（李**、王**）"
  },
  {
    name: "周**",
    desc: "（赵*、孙**）"
  },
  {
    name: "薛**",
    desc: "（王**）"
  },
  {
    name: "周**",
    desc: "（赵*、周**）"
  },
  {
    name: "郑**",
    desc: "（薛**、郑*）"
  },
  {
    name: "张*",
    desc: "（张*、周**）"
  },
  {
    name: "薛**",
    desc: "（王**）"
  },
  {
    name: "周**",
    desc: "（赵*、周**）"
  },
  {
    name: "郑**",
    desc: "（薛**、郑*）"
  },
  {
    name: "张*",
    desc: "（张*、周**）"
  }
])

const src = "http://flv4mp4.people.com.cn/videofile7/pvmsvideo/2024/3/13/GuiZhou-WuFeng_b4732458529e9e71392559ea447d8730_android_c.mp4"

const video_options = reactive({
  miLinToken: "f9fc7d14f33d11eab23f018010376106",//测试token
  src: "http://flv4mp4.people.com.cn/videofile7/pvmsvideo/2024/3/13/GuiZhou-WuFeng_b4732458529e9e71392559ea447d8730_android_c.mp4",
  // src: "https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
  autoplay: false, //是否自动播放
  controls: false,//是否显示控制栏
  loop: false, //循环播放
  "enable-progress-gesture": false,//是否开启控制进度的手势
  "show-center-play-btn": false, //是否显示视频中间的播放按钮
})

onMounted(() => {
}
)

const download = () => {
  Taro.showLoading()
  Taro.downloadFile({
    url: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
    success: (res) => {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      console.log(JSON.stringify(res))
      if (res.statusCode === 200) {

        // Taro.openDocument({
        //   filePath: res.tempFilePath,
        //   showMenu: true,
        //   success: function (res) {
        //     console.log('打开文档成功')
        //   }
        // })

        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) { }
        })

        // Taro.getFileSystemManager().saveFile({
        //   tempFilePath: res.tempFilePath,
        //   success: function (res) {
        //     var savedFilePath = res.savedFilePath
        //     console.log(savedFilePath)
        //   }
        // })

        // Taro.showToast({
        //   title: res.tempFilePath,
        //   icon: 'error',
        //   duration: 2000
        // })
      }
    },
    complete: () => {
      Taro.hideLoading()
    }
  })
}
const bindvideosuccess = (e) => {
  console.log(e)
}
const bindvideoloaded = (e) => {
  console.log(e)
}

const bindvideofailed = (e) => {
  console.log(e)
}



// Taro.showLoading()
// getTips().then(res => {
//   console.log(res)
//   state.list = res.returnData
//   Taro.hideLoading()
// }).catch(e => {
//   console.log(e)
//   Taro.hideLoading()
// })

</script>
