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
    next4: true
  },

  onLoad: function () {
    // 动画1
    var animation1 = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    animation1.left(-143).step();
    // 动画2
    var animation2 = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    animation2.left(-152).step();
    // 动画3
    var animation3 = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    animation3.left(-166).step();
    // 动画4
    var animation4 = wx.createAnimation({
      duration: 0,
      delay: 500
    });
    animation4.left(-172).step();

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
      animation.left(-143).step();
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
      animation.left(-152).step();
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
      animation.left(-166).step();
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
      animation.left(-172).step();
    } else {
      animation.left(0).step();
    }
    this.setData({
      ani4: animation.export(),
      next4: !this.data.next4
    })
  }
})