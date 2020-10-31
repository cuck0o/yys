const app = getApp()

Page({
  data: {
    ani1: {},
    ani2: {},
    ani3: {},
    ani4: {},
    next1: true,
    next2: true,
    next3: true,
    next4: true,
    position1: -140,
    position2: -125,
    position3: -145,
    position4: -146,
    userInfo: null,
    curTouch: -1,
    showCreateCard1: false,
    showCreateCard2: false,
    showCreateSsr: false,
    showCreateTask: false,
  },

  onLoad: function () {
    // 动画1
    var animation1 = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    animation1.left(this.data.position1).step();
    // 动画2
    var animation2 = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    animation2.left(this.data.position2).step();
    // 动画3
    var animation3 = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    animation3.left(this.data.position3).step();
    // 动画4
    var animation4 = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    animation4.left(this.data.position4).step();

    this.setData({
      ani1: animation1.export(),
      ani2: animation2.export(),
      ani3: animation3.export(),
      ani4: animation4.export(),
      next1: !this.data.next1,
      next2: !this.data.next2,
      next3: !this.data.next3,
      next4: !this.data.next4
    })
  },

  reAnimation1(val) {
    var animation = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    if (this.data.next1) {
      animation.left(this.data.position1).step();
    } else {
      animation.left(0).step();
    }
    this.setData({
      ani1: animation.export(),
      next1: !this.data.next1
    })
  },

  reAnimation2(val) {
    var animation = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    if (this.data.next2) {
      animation.left(this.data.position2).step();
    } else {
      animation.left(0).step();
    }
    this.setData({
      ani2: animation.export(),
      next2: !this.data.next2
    })
  },

  reAnimation3(val) {
    var animation = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    if (this.data.next3) {
      animation.left(this.data.position3).step();
    } else {
      animation.left(0).step();
    }
    this.setData({
      ani3: animation.export(),
      next3: !this.data.next3
    })
  },

  reAnimation4(val) {
    var animation = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    if (this.data.next4) {
      animation.left(this.data.position4).step();
    } else {
      animation.left(0).step();
    }
    this.setData({
      ani4: animation.export(),
      next4: !this.data.next4
    })
  },

  checkInfo(e) {
    this.setData({
      curTouch: e.currentTarget.dataset['index']
    })
    // 用户登录信息（openid获取，基础数据获取，活动数据获取）
    wx.getSetting({
      onGetUserInfo: function (e) {
        if (!this.data.logged && e.detail.userInfo) {
          this.setData({
            logged: true,
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
          that.goto();
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
    var data = {
      card1: {
        time: 0,
        need: [],
        give: [],
      },
      card2: {
        time: 0,
        need: [],
        give: [],
      },
      ssr: {
        time: 0,
        need: [],
        give: [],
      },
      task: []
    }
    db.collection('yys').add({
      data: data,
      success: function (res) {
        console.log("createUserData:", res);
        app.globalData.userObj = data;
        that.goto();
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  goto() {
    console.log(this.data.curTouch);
    if (this.data.curTouch != -1) {
      var curtime = Date.parse(new Date()) / 1000;
      switch (this.data.curTouch) {
        case "1":
          if (app.globalData.userObj.card1.time == 0 || app.globalData.userObj.card1.time <= curtime) {
            this.createCard1();
          } else {
            this.toCard1();
          }
          break;
        case "2":
          if (app.globalData.userObj.card2.time == 0 || app.globalData.userObj.card2.time <= curtime) {
            this.createCard2();
          } else {
            this.toCard2();
          }
          break;
        case "3":
          if (app.globalData.userObj.ssr.time == 0 || app.globalData.userObj.ssr.time <= curtime) {
            this.createSsr();
          } else {
            this.toSsr();
          }
          break;
        case "4":
          if (app.globalData.userObj.task.length <= 0) {
            this.createTask();
          } else {
            this.toTask();
          }
          break;
      }
      this.setData({
        curTouch: -1
      })
    }
  },

  onPopClose() {
    this.setData({
      showCreateCard1: false,
      showCreateCard2: false,
      showCreateSsr: false,
      showCreateTask: false,
    });
  },

  createCard1() {
    this.setData({
      showCreateCard1: true
    });
  },

  createCard2() {
    this.setData({
      showCreateCard2: true
    });
  },

  createSsr() {
    this.setData({
      showCreateSsr: true
    });
  },

  createTask() {
    this.setData({
      showCreateTask: true
    });
  },

  toCard1() {
    wx.navigateTo({
      url: '/pages/card1/card1'
    })
  },

  toCard2() {
    wx.navigateTo({
      url: '/pages/card1/card2'
    })
  },

  toSsr() {
    wx.navigateTo({
      url: '/pages/ssr/ssr'
    })
  },

  toTask() {
    wx.navigateTo({
      url: '/pages/task/task'
    })
  },

})