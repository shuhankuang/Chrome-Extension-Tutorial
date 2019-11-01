// popup.js
console.log('popup.js 正在运行。。。')

$(function(){

  // 扩展程序的 id
  let id = chrome.runtime.id
  let keyword
  let msg

  // 获取的本地数据并将 搜索关键字 与 私信内容 显示出来
  chrome.storage.local.get(['keyword', 'msg'], function(result){
    keyword = result.keyword
    msg = result.msg
    $('#keyword').text(keyword)
    $('#msg').text(msg)
  })

  // 定义按钮事件，点击按钮可以直接打开 Options 页面
  $('#options').click(function(e){
    chrome.tabs.create({
      url: `chrome://extensions/?options=${id}`
    })
  })

  // 启动发送私信功能
  $('#start').click(function(e){
    let event = EVENT.START // 发送 start 信息到 background
    chrome.runtime.sendMessage({event: event}, function(){})
  })

  let v = chrome.runtime.getManifest().version
  $('#ver').text(`v ${v}`)

})