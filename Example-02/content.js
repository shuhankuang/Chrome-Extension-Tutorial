// content.js
console.log('content.js is 正在运行。。。')

// 初始化一些变量
let clientid = undefined // 发私信时传递的参数
let timeout = undefined //用于 settimeout
let kw = undefined // 当前搜索关键字
let msg = undefined // 当前的私信内容
let page = 1 // 当前页码

// 从扩展程序的存储空间获取数据，初始化数据
function init () {
  chrome.storage.local.get(['keyword', 'msg'], function(result){
    kw = result.keyword
    msg = result.msg
  })
}

// 检测微博私信服务的连接状态（就是检测页面的内容的变化，请看 前期技术调研 复习）
function checkConnect () {
  let url = window.location.href
  // 判断是否助手的窗口，是私信助手打开的窗口才会执行自动化
  if(url.indexOf('auto=1') < 0) {
    return
  }
  // 查找程序需要的变量 clientid
  let head = $('head') // 从 head 里面获取
  let script = head.find('script')
  let src = decodeURIComponent($(script[0]).attr('src')) // 需要进行转码
  if(src.indexOf('web.im.weibo.com') > -1){ // 如果找到了 clientid
    let params = new URLSearchParams(src)
    clientid = JSON.parse(params.get('message'))[0].clientId
    clearTimeout(timeout) // 清空持续检测
    timeout = undefined
    prepareUsers() // 搜索用户，开始发送私信
    return
  }
  // 递归，持续检测连接情况，获取 head 的变化
  timeout = setTimeout(function() {
    if(!clientid){
      checkConnect()
    }
  }, 3000) // 每 3 秒检测一次
}

// 发送事件给 background，然后给传过来的用户列表发送私信
function prepareUsers () {
  chrome.runtime.sendMessage({event: EVENT.USER_SEARCH, data: {page: page}}, 
    function(result){
    let users = result.users
    if(users.length > 0){
      nextMsg(users)
    }
  })
}

// 发送私信
function nextMsg(users) {
  let user = users.shift() // 从列表抽取一位用户
  // 如果用户列表已经发送完毕，那么就搜索下一页的用户
  if(!user){
    clearTimeout(timeout)
    timeout = undefined
    page += 1 // 翻页
    prepareUsers() // 再搜索用户
    return
  }
  // 发送私信
  timeout = setTimeout(function() {
    console.log(`search ${kw}, send ${msg} to ${user}`)
    sendMsg(user, clientid, msg, function(err, reuslt){
      console.log('发送私信成功！')
    })
    nextMsg(users) // 递归函数，穷举所有用户
  }, MSG_INTERVAL)
}

// content.js 加载完毕马上执行
$(function(){
  init() // 初始化
  checkConnect() // 检测
})
