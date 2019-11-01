// options.js
console.log('options.js 正在运行。。。')

$(function(){
  // 显示发送私信的时间间隔
  $('#interval').text(MSG_INTERVAL / 1000)
  // 初始化
  chrome.storage.local.get(['keyword', 'msg'], function(result){
    var keyword = result.keyword
    var msg = result.msg
    if(keyword){
      $('#keyword').val(keyword)
      $('#msg').val(msg)
    }
  })
  // 保存相关数据
  $('#save').click(function(e){
    var keyword = $('#keyword').val()
    var msg = $('#msg').val()
    chrome.storage.local.set({keyword: keyword, msg: msg}, function(){
      // 
    })
  })
  // 显示当前扩展程序的版本号，版本号有助用户反馈问题
  var v = chrome.runtime.getManifest().version
  $('#ver').text(`v ${v}`)
})