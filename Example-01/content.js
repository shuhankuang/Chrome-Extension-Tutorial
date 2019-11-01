// content.js
console.log('content.js is 正在运行。。。')
// 监听 serach_event 事件，然后进行关键字搜索
chrome.runtime.onMessage.addListener(function(params, sender, sendResponse){
  var event = params.event
  var data = params.data
  if(event === 'search_event'){
    search(data)
  }

  sendResponse(false) // 避免报错，返回相应信息
  return false
})

// 填充搜索框，然后搜索
function search (keyword) {
  // 把关键字输入搜索框
  $('#kw').val(keyword)
  // 设置延时，模拟点击，
  setTimeout(function(){
    $('#su').trigger('click')
  }, 300);
}