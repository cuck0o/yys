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
    giveShow: false,
    searchIndex: 0,
    searchResult: [],
    searching: false,
    resultShow: false,
    hasResult: false
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
    var that = this;
    app.globalData.userObj.ssr.give = [];
    for (var i = 0; i < this.data.giveList.length; i++) {
      app.globalData.userObj.ssr.give.push(this.data.giveList[i].id);
    }
    app.globalData.userObj.ssr.need = [];
    for (var j = 0; j < this.data.needList.length; j++) {
      app.globalData.userObj.ssr.need.push(this.data.needList[j].id);
    }
    // 保存
    wx.cloud.callFunction({
      name: 'updateSsrOption',
      data: {
        id: String(app.globalData.openid),
        data: app.globalData.userObj.ssr
      },
      success: res => {
        console.log("ssr保存成功：", res);
      },
      fail: err => {
        console.log(err);
      },
    })
    // 搜索
    this.onSearch();
    this.setData({
      searchIndex: 0,
      searchResult: [],
      searching: true
    })
  },

  onSearch: function () {
    if (this.data.searchIndex >= app.globalData.userObj.ssr.need.length) {
      this.setData({
        searching: false,
        resultShow: true,
        hasResult: this.data.searchResult.length > 0 ? true : false
      })
      return;
    }
    var that = this;
    var finder = app.globalData.userObj.ssr.need[this.data.searchIndex];
    console.log("ssr开始匹配", finder);
    var tempList = this.data.searchResult;
    db.collection('yys').where({
      'ssr.give': Number(finder)
    }).get({
      success: res => {
        console.log(res.data);
        for (var k = 0; k < res.data.length; k++) {
          for (var j = 0; j < res.data[k].ssr.need.length; j++) {
            if (app.globalData.userObj.ssr.give.indexOf(res.data[k].ssr.need[j]) >= 0) {
              var obj = {
                "need": finder,
                "give": res.data[k].ssr.need[j],
                "name": res.data[k].nickname
              }
              tempList.push(obj);
              console.log(obj);
            }
          }
        }
        that.setData({
          searchIndex: this.data.searchIndex += 1,
          searchResult: tempList
        })
        that.onSearch();
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  onClose: function () {
    this.setData({
      needShow: false,
      giveShow: false,
      resultShow: false
    })
  },

  onCopy: function (e) {
    var str = e.currentTarget.dataset['name'];
    wx.setClipboardData({
      data: str,
      success(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

})