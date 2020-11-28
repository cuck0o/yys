const app = getApp();
const db = wx.cloud.database({
  env: 'yys-7gws87sn973c67e2'
})


Page({
  data: {
    list: [],
    giveList: [],
    needList: [],
    needShow: false,
    giveShow: false
  },

  onLoad: function (options) {
    console.log("ssr : ", app.globalData.userObj.ssr);
    var that = this;

    wx.cloud.callFunction({
      name: 'getConfig',
      data: {},
      success: res => {
        that.setData({
          list: res.result
        })
        that.init();
      },
      fail: err => {
        console.log(err);
      },
    })
  },

  init: function () {
    var tempGiveArr = [];
    var tempNeedArr = [];
    var tempList = this.data.list;
    for (var i = 0; i < tempList.length; i++) {
      tempList[i].needSelect = false;
      tempList[i].giveSelect = false;
      if (app.globalData.userObj.ssr.give.indexOf(tempList[i].id) != -1) {
        tempList[i].giveSelect = true;
        tempGiveArr.push(tempList[i]);
      }
      if (app.globalData.userObj.ssr.need.indexOf(tempList[i].id) != -1) {
        tempList[i].needSelect = true;
        tempNeedArr.push(tempList[i]);
      }
    }
    this.setData({
      giveList: tempGiveArr,
      needList: tempNeedArr,
      list: tempList
    })
    console.log("初始化碎片列表完成：", this.data.giveList, this.data.needList, this.data.list);
  },

  onEditor: function (e) {
    if (e.currentTarget.dataset.type == 0) {
      this.setData({
        needShow: true
      })
    } else {
      this.setData({
        giveShow: true
      })
    }
  },

  onChange: function (e) {
    var index = e.currentTarget.dataset.index;
    var tempList = this.data.list;
    var tempGiveArr = this.data.giveList;
    var tempNeedArr = this.data.needList;
    if (this.data.needShow) {
      if (tempList[index].needSelect) {
        tempList[index].needSelect = false;
        var tt = tempNeedArr.findIndex(o => o.id == tempList[index].id);
        if (tt != -1) {
          tempNeedArr.splice(tt, 1);
        }
      } else {
        tempList[index].needSelect = true;
        tempNeedArr.push(tempList[index]);
      }
    } else if (this.data.giveShow) {
      if (tempList[index].giveSelect) {
        tempList[index].giveSelect = false;
        var tt = tempGiveArr.findIndex(o => o.id == tempList[index].id);
        if (tt != -1) {
          tempGiveArr.splice(tt, 1);
        }
      } else {
        tempList[index].giveSelect = true;
        tempGiveArr.push(tempList[index]);
      }
    }
    this.setData({
      giveList: tempGiveArr,
      needList: tempNeedArr,
      list: tempList
    })
  },

  onSubmit: function () {
    
  },

  onClose: function () {
    this.setData({
      needShow: false,
      giveShow: false
    })
  },

})