// popup.js
console.log('popup.js 正在运行。。。')

$(function(){

  // 扩展程序的 id
  var id = chrome.runtime.id
  var keyword

  // 获取的本地数据并将关键字显示在按钮上
  chrome.storage.local.get(['keyword'], function(result){
    keyword = result.keyword
    $('#keyword').text(keyword)
  })

  // 定义按钮事件，点击按钮可以直接打开 Options 页面
  $('#options').click(function(e){
    chrome.tabs.create({
      url: `chrome://extensions/?options=${id}` // 注意，这里的不是 单引号 ，是 重音符 ，（度娘说的）
    })
  })

  $('#search').click(function(e){
    // 发送搜索事件
    // 参考：https://developer.chrome.com/extensions/runtime#method-sendMessage
    var event = 'search_event'
    chrome.runtime.sendMessage({event: event, data: keyword}, function(result){
      console.log(result)
    });
  })

})