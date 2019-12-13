//app.js
var Bmob = require('/utils/Bmob-2.2.1.min.js');
const utils = require('/utils/util');

App({
  onLaunch: function() {
    let that = this;
    Bmob.initialize(that.config.secret_key, that.config.API_key);
    // Bmob.debug(true);
  },
  config: {
    secret_key: '4820b283f8489834',
    API_key: 'GRJ526',
    url: 'www.ganrongjian.cn',
    app_auth: false
  },
  bmob_data() {
    return Bmob.Query('aphorisms')
  },
  bmob_user() {
    return Bmob.Query('_User')
  },
  login(detail, callback) {
    Bmob.User.auth().then(res => {
      Bmob.User.upInfo(detail);
      callback(res);
    }).catch(err => {
      console.log(err);
    });
  }
});

//app.json文件中底部tabBar代码
// "tabBar": {
// 	"color": "#ffffff",
// 		"selectedColor": "#d81e06",
// 			"backgroundColor": "#000000",
// 				"list": [
// 					{
// 						"pagePath": "pages/index/index",
// 						"text": "首页",
// 						"iconPath": "/images/index.png",
// 						"selectedIconPath": "/images/index-selected.png"
// 					},
// 					{
// 						"pagePath": "pages/accumulation/accumulation",
// 						"text": "积累",
// 						"iconPath": "/images/accumulation.png",
// 						"selectedIconPath": "/images/accumulation-selected.png"
// 					},
// 					{
// 						"pagePath": "pages/mine/mine",
// 						"text": "我的",
// 						"iconPath": "/images/mine.png",
// 						"selectedIconPath": "/images/mine-selected.png"
// 					}
// 				]
// },
