export default {
  pages: [
    'pages/auth/index',
    'pages/tab/home/index',
    "pages/tab/residentManage/index",
    "pages/tab/mine/index",
    "pages/tab/foodInventoryManage/index",
    "pages/activityManage/index",
    "pages/medicalRecords/index",
    "pages/employeeManage/index",
    "pages/schedulesManage/index",
    "pages/residentDetail/index",
  ],
  tabBar: {
    color: '#383838',
    selectedColor: '#15488e',
    "list": [{
      "pagePath": "pages/tab/home/index",
      "text": "首页",
      iconPath: './assets/img/home-off.png',
      selectedIconPath: './assets/img/home-on.png',
    }, {
      "pagePath": "pages/tab/residentManage/index",
      "text": "居民管理",
      iconPath: './assets/img/team-off.png',
      selectedIconPath: './assets/img/team-on.png',
    }, {
      "pagePath": "pages/tab/foodInventoryManage/index",
      "text": "食物管理",
      iconPath: './assets/img/dynamic-off.png',
      selectedIconPath: './assets/img/dynamic-on.png',
    }, {
      "pagePath": "pages/tab/mine/index",
      "text": "我的",
      iconPath: './assets/img/mine-off.png',
      selectedIconPath: './assets/img/mine-on.png',
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  plugins: {
  }
}
