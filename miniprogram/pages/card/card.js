const app = getApp()

Component({
  data: {
    userInfo: "",
    nickName: "",
    avatarUrl: "",
  },

  methods: {
    onLoad: function (options) {
      // 用户登录信息（openid获取，基础数据获取，活动数据获取）
      wx.getSetting({
        onGetUserInfo: function (e) {
          if (!this.data.logged && e.detail.userInfo) {
            this.setData({
              logged: true,
              avatarUrl: e.detail.userInfo.avatarUrl,
              userInfo: e.detail.userInfo
            })
          }
        },
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log("getUserInfo:", res.userInfo);
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,
                  userInfo: res.userInfo,
                })
              }
            })
          }
        }
      })
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid;
          this.getUserData();
        },
        fail: err => {
          this.showErr("获取用户信息出错，请刷新小程序后重试");
        }
      })
    },

    getUserData: function () {
      var that = this;
      const db = wx.cloud.database({
        env: 'yys-7gws87sn973c67e2'
      })
      db.collection('yys').where({
        "_openid": app.globalData.openid
      }).get({
        success: function (res) {
          if (res.data.length > 0) {
            console.log("getUserData:", res.data);
            app.globalData.userObj = res.data[0];
          } else {
            that.createUserData();
          }
        },
        fail: function (err) {
          wx.showModal({
            title: 'system error',
            content: "获取用户数据失败，请刷新后重试",
          })
          console.log(err);
        }
      })
    },

    // 新建用户开放信息
    createUserData: function () {
      const db = wx.cloud.database({
        env: 'yys-7gws87sn973c67e2'
      })
      var that = this;
      db.collection('yys').add({
        data: {
          card: {
            time: 0,
            need: [],
            give: [],
          },
          ssr: {
            time: 0,
            need: [],
            give: [],
          },
          task: [],
        },
        success: function (res) {
          console.log("createUserData:", res);
        },
        fail: function (err) {
          console.log(err);
        }
      })
    },

  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})