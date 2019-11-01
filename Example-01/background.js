// background.js
console.log('background.js 正在运行。。。')

// 扩展程序安装或者更新，都会执行此函数
chrome.runtime.onInstalled.addListener(function(){
  console.log('Extension installed.')
  // 初始化默认关键字
  // 参考：https://developer.chrome.com/extensions/storage
  chrome.storage.local.set({keyword: '浏览器扩展程序'}, function(){
    console.log('初始关键字成功！')
  })
})

// 监听其他文件发送过来的消息
chrome.runtime.onMessage.addListener(function(params, sender, sendResponse){
  var event = params.event
  var data = params.data
  // 如果是搜索事件，那么就发送 search_event 事件
  if(event === 'search_event'){
    // 查找百度的页面
    chrome.tabs.query({
      url: 'https://*.baidu.com/*'
    }, function(tabs){
      // 发送消息到百度的页面
      tabs.forEach(tab => {
        // 参考：https://developer.chrome.com/extensions/tabs#method-sendMessage
        chrome.tabs.sendMessage(tab.id, {event: 'search_event', data: data}, function(){})
      })
    })
    sendResponse(false) // 避免报错，返回相应信息
  }

  return false
})