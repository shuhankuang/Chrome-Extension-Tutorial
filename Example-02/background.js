// background.js
console.log('background.js 正在运行。。。')

// 扩展程序安装或者更新，都会执行此函数
chrome.runtime.onInstalled.addListener(function(){
  let kw = '炉石传说'
  let msg = '你好，这是一个测试信息，请忽略，打扰了，抱歉。'
  chrome.storage.local.set({keyword: kw, msg: msg}, function(){
    console.log('初始关键字成功！')
  })
})

// 监听其他文件发送过来的消息
chrome.runtime.onMessage.addListener(function(params, sender, sendResponse){
  let event = params.event
  let data = params.data

  // 如果收到 （USER_SEARCH）搜索用户 的消息，那么就根据条件查找用户
  if(event === EVENT.USER_SEARCH){
    chrome.storage.local.get(['keyword'], function(result){
      let kw = result.keyword
      let page = data.page
      // 根据条件搜索用户
      searchUsers(kw, page, function(err, users){
        sendResponse({users: users}) // 将 用户列表 返回给 content.js
      })
    })
  }

  // 如果收到 （START）开始的消息，用户点击了 “发送私信按钮”
  if(event === EVENT.START){
    let url = 'https://api.weibo.com/chat?auto=1' // 加了 auto 变量来区分是否扩展程序打开的窗口
    chrome.windows.create({
      url: url,
      type: 'popup',
      width: 800,
      height: 600,
    })
  }

  return true // 这里必须返回 true, 不然 sendResponse 会失效

})