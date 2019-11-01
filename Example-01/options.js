// options.js
console.log('options.js 正在运行。。。')

$(function(){
  chrome.storage.local.get(['keyword'], function(result){
    var keyword = result.keyword
    if(keyword){
      $('#keyword').val(keyword)
    }
  })
  // 保存关键字
  $('#save').click(function(e){
    var keyword = $('#keyword').val()
    chrome.storage.local.set({keyword: keyword}, function(){
      // 
    })
  })
})