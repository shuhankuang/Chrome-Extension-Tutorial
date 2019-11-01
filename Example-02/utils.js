// utils.js
/**
 * get 请求
 * @param { string } url 发送地址
 * @param { object } data 传参对象
 * @param { function } cb 
 */
function getUrl (url, data,  cb) {
  $.get(url, data, function(result){
    cb && cb(null, result)
  })
}
/**
 * post 请求
 * @param { string } url 发送地址
 * @param { object } data 传参对象
 * @param { function } cb 
 */
function postUrl (url, data, cb) {
  $.post(url, data, function(result){
    cb && cb(null, result)
  })
}
/**
 * 根据关键字搜索用户，提供页码参数
 * @param { string } kw 搜索关键字
 * @param { number } page 页码
 * @param { function } cb 回调函数
 */
function searchUsers (kw, page, cb) {
  var url = `https://s.weibo.com/user?q=${kw}&Refer=SUer_all&page=${page}`
  getUrl(url, {}, function(err, result){
    var o = $(result) // jQuery 解析返回的数据
    var users = o.find('.card-user-b') // 寻找包含用户的元素
    var arr = []
    $.map(users, function(user, i){
      var profile = $(user).find('.s-nobr').find('a').attr('href') // 查找用户 id
      var uid = profile.split('/')[3]
      arr.push(uid) // 保存到数组
    })
    cb && cb(err, arr)
  })
}

/**
 * 通过 new.json 接口向用户发送私信
 * @param { number } to 私信接收人
 * @param { string } clientid 
 * @param { string } msg 私信内容
 * @param { function } cb 回调函数
 */
function sendMsg (to, clientid, msg, cb) {
  var url = `https://api.weibo.com/webim/2/direct_messages/new.json`
  // 通过网络请求发送私信
  postUrl(url, {
    text: msg,
    uid: to,
    extensions: {"clientid": clientid},
    is_encoded: 0,
    decodetime: 1,
    source: 209678993
  }, cb)
}