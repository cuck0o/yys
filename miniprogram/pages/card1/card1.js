const app = getApp();

Page({
  data: {
    hasInfo: false,
    hasChange: false,
    searchResult: [],
    listData: [{
        "code": "A",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "2",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "3",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "4",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "5",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "6",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "7",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "8",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "9",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "10",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "J",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "Q",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "K",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      }
    ]
  },

  onLoad: function (options) {
    console.log("card1 : ", app.globalData.userObj.card1);
    var temp = this.data.listData;
    for (var i = 0; i < app.globalData.userObj.card1.give.length; i++) {
      var row = app.globalData.userObj.card1.give[i].split(",")[0];
      var col = app.globalData.userObj.card1.give[i].split(",")[1];
      switch (col) {
        case "0":
          temp[row].meihua = "可提供";
          break;
        case "1":
          temp[row].heitao = "可提供";
          break;
        case "2":
          temp[row].fangkuai = "可提供";
          break;
        case "3":
          temp[row].hongtao = "可提供";
          break;
      }
    }
    for (var i = 0; i < app.globalData.userObj.card1.need.length; i++) {
      var row = app.globalData.userObj.card1.need[i].split(",")[0];
      var col = app.globalData.userObj.card1.need[i].split(",")[1];
      switch (col) {
        case "0":
          temp[row].meihua = "我需要";
          break;
        case "1":
          temp[row].heitao = "我需要";
          break;
        case "2":
          temp[row].fangkuai = "我需要";
          break;
        case "3":
          temp[row].hongtao = "我需要";
          break;
      }
    }
    if (app.globalData.userObj.card1.give.length > 0 || app.globalData.userObj.card1.need.length > 0) {
      this.setData({
        hasInfo: true
      })
    }
    this.setData({
      listData: temp
    })
  },

  onTouch: function (e) {
    var row = e.currentTarget.dataset['row'];
    var col = e.currentTarget.dataset['col'];
    var temp = this.data.listData;
    switch (e.currentTarget.dataset['col']) {
      case "0":
        if (temp[row].meihua == "") {
          temp[row].meihua = "我需要";
        } else if (temp[row].meihua == "我需要") {
          temp[row].meihua = "可提供"
        } else if (temp[row].meihua == "可提供")
          temp[row].meihua = "";
        break;
      case "1":
        if (temp[row].heitao == "") {
          temp[row].heitao = "我需要";
        } else if (temp[row].heitao == "我需要") {
          temp[row].heitao = "可提供"
        } else if (temp[row].heitao == "可提供")
          temp[row].heitao = "";
        break;
      case "2":
        if (temp[row].fangkuai == "") {
          temp[row].fangkuai = "我需要";
        } else if (temp[row].fangkuai == "我需要") {
          temp[row].fangkuai = "可提供"
        } else if (temp[row].fangkuai == "可提供")
          temp[row].fangkuai = "";
        break;
      case "3":
        if (temp[row].hongtao == "") {
          temp[row].hongtao = "我需要";
        } else if (temp[row].hongtao == "我需要") {
          temp[row].hongtao = "可提供"
        } else if (temp[row].hongtao == "可提供")
          temp[row].hongtao = "";
        break;
    }
    this.setData({
      listData: temp,
      hasChange: true
    })
  },

  onSubmit: function () {
    var that = this;
    app.globalData.userObj.card1.give = [];
    app.globalData.userObj.card1.need = [];
    for (var i = 0; i < this.data.listData.length; i++) {
      if (this.data.listData[i].meihua == "我需要") {
        app.globalData.userObj.card1.need.push(i + "," + "0");
      } else if (this.data.listData[i].meihua == "可提供") {
        app.globalData.userObj.card1.give.push(i + "," + "0");
      }
      if (this.data.listData[i].heitao == "我需要") {
        app.globalData.userObj.card1.need.push(i + "," + "1");
      } else if (this.data.listData[i].heitao == "可提供") {
        app.globalData.userObj.card1.give.push(i + "," + "1");
      }
      if (this.data.listData[i].fangkuai == "我需要") {
        app.globalData.userObj.card1.need.push(i + "," + "2");
      } else if (this.data.listData[i].fangkuai == "可提供") {
        app.globalData.userObj.card1.give.push(i + "," + "2");
      }
      if (this.data.listData[i].hongtao == "我需要") {
        app.globalData.userObj.card1.need.push(i + "," + "3");
      } else if (this.data.listData[i].hongtao == "可提供") {
        app.globalData.userObj.card1.give.push(i + "," + "3");
      }
    }
    if (app.globalData.userObj.card1.give.length > 0 || app.globalData.userObj.card1.need.length > 0) {
      this.setData({
        hasInfo: true
      })
    } else {
      this.setData({
        hasInfo: false
      })
    }
    wx.cloud.callFunction({
      name: 'updateOption',
      data: {
        id: String(app.globalData.openid),
        data: app.globalData.userObj.card1
      },
      success: res => {
        console.log(res);
        that.setData({
          hasChange: false
        })
      },
      fail: err => {
        console.log(err);
      },
    })
  },

  onSearch: function () {
    const db = wx.cloud.database({
      env: 'yys-7gws87sn973c67e2'
    })
    var that = this;
    console.log("开始匹配");
    for (var i = 0; i < app.globalData.userObj.card1.need.length; i++) {
      var finder = app.globalData.userObj.card1.need[i];
      console.log(finder);
      db.collection('yys').where({
        'card1.give': String(finder)
      }).get({
        success: res => {
          that.setData({
            searchResult: res.data
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }

  }
})