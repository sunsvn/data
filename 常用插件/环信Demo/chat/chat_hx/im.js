
//获取环信用户名登录 默认用户名
var login_account = 'tigo_m14990465711499046571';
var login_password = 'tigo_m14990465711499046571';
var send_to = 'xcjwy1492157461';

//初始化 进入界面掉用该方法
getHxUser(login_account,send_to);

/*
//初始化进去界面掉用该方法
getHxUser(login_account,send_to);
//发送图片调用方法  onClick("sendPrivateImg()")
sendPrivateImg();
//发送文件调用方法  onClick("sendPrivateFile()")
sendPrivateFile();
//发起视频聊天调用方法    onClick("videoCall()")
videoCall();
//发送文本消息调用方法    onClick("videoCall()")
sendPrivateText();
*/


/*  
 *  获取环信用户名及密码，同时登录环信
 *
 *  username：找个猫平台用户登录名称
 *  send_to：当前的聊天对象，环信用户名
 */
function getHxUser(username,send_to){
     //从项目中获取对应的环信用户名及环信密码 接口不管用 会使用默认的 用户名和密码
    var http_url = "https://webim.yjhome.top/EasemobUserAction_addFriend?friendUsername="+username;
     $.getJSON(http_url, function(data) {
        console.log(data);
        console.log(http_url);
        var hx_username;
        var hx_password
        if (data['obj']) {
            hx_username = data['obj']['name'];
            hx_password = data['obj']['passwd'];
        }else{
            hx_username = login_account;
            hx_password = login_password;
        }
        hx_init(hx_username,hx_password,send_to);//初始化环信用户并登录环信平台
    });
}
/*  
 *  环信用户登录
 *
 *  login_account：环信登录名称
 *  login_password：登录密码
 *  send_to：当前聊天对象的用户名
 */
var conn;//环信连接对象 全局
var rtcCall;//视频对象
var group;//环信连接对象 全局
function hx_init(login_account,login_password,send_to){
    document.title = login_account+"->"+send_to;//修改标题

    /* 函数内直接引用 */ 
    login_account = login_account.toLowerCase();//用户名字符串转换为小写
    send_to = send_to.toLowerCase();//用户名字符串转换为小写
    group = login_account+':'+send_to;//设置当前聊天组 key: "user1:user2" 当前用户和user2聊天
    /* 函数内直接引用 */ 

    //创建连接对象
    conn = new WebIM.connection({
        https: WebIM.config.https,
        url: WebIM.config.xmppURL,
        isAutoLogin: WebIM.config.isAutoLogin,
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions
    });

    //用户登录
    var options = { 
      apiUrl: WebIM.config.apiURL,
      user: login_account,//登录用户名
      pwd: login_password,//登录密码
      appKey: WebIM.config.appkey
    };
    conn.open(options);

    //消息回调函数
    conn.listen({
        onOpened: function ( message ) {console.log('连接成功');},//连接成功回调  
        onClosed: function ( message ) {},         //连接关闭回调
        /*  收到文本消息  */
        onTextMessage: function ( message ) {
            console.log('收到'+send_to+'发送的消息：'+message.data);
            if (message.from==send_to) {//处理当前的聊天消息并缓存
                detailMessage(message.data,message.from,'text',message.id);//缓存数据
                showMessage();//显示接受消息；
            }else{//处理其他用户发送的消息
                otherDetailMessage(message.data,message.from,'text',message.id);
            }
        },    
        /*  收到表情消息  */
        onEmojiMessage: function ( message ) {
            console.log('收到'+send_to+'发送的Emoji'+':'+message.data); 
            //缓存数据
            for(var i=0;i<message.data.length;i++){
                var img = message.data[i];
                var string;
                if (img.type=='txt') {string = string+img.data;}
                else{string = string+'<img class="emoji" '+'src="'+img.data +'" />';}
            }
            string = string.replace('undefined','');
            if (message.from==send_to) {//处理当前的聊天消息并缓存
                detailMessage(string,message.from,'text',message.id);
                showMessage();//显示接受消息；
            }else{//处理其他用户发送的消息
                otherDetailMessage(string,message.from,'text',message.id);
            }
        },   
        /*  收到图片消息  */
        onPictureMessage: function ( message ) {
            console.log('收到'+send_to+'发送的图片'+':'+message.url);
            if (message.from==send_to) {//处理当前的聊天消息并缓存
                detailMessage(message.url,message.from,'picture',message.id);//缓存数据
                showMessage();//显示接受消息；
            }else{//处理其他用户发送的消息
                otherDetailMessage(message.url,message.from,'picture',message.id);
            }
        }, 
        /*  收到文件消息  */
        onFileMessage: function ( message ) {
            from_user = message.from;
            console.log('收到'+send_to+'发送的文件'+':'+message.url);
            if (from_user==send_to) {//处理当前的聊天消息并缓存
                detailMessage(message.url,message.from,'file',message.id);//缓存数据
                showMessage();//显示接受消息；
            }else{//处理其他用户发送的消息
                otherDetailMessage(message.url,message.from,'file',message.id);
            }
        },   
        onCmdMessage: function ( message ) {},     //收到命令消息
        onAudioMessage: function ( message ) {},   //收到音频消息
        onLocationMessage: function ( message ) {},//收到位置消息
        onVideoMessage: function (message) {
            var node = document.getElementById('privateVideo');  //id必填
            var option = {
                url: message.url,
                headers: {
                  'Accept': 'audio/mp4'
                },
                onFileDownloadComplete: function (response) {
                    var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                    node.src = objectURL;
                },
                onFileDownloadError: function () {
                    console.log('File down load error.')
                }
            };
            WebIM.utils.download.call(conn, option);
        },   //收到视频消息
        onPresence: function ( message ) {},       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
        onRoster: function ( message ) {},         //处理好友申请
        onInviteMessage: function ( message ) {},  //处理群组邀请
        onOnline: function () {},                  //本机网络连接成功
        onOffline: function () {},                 //本机网络掉线
        onError: function ( message ) {},          //失败回调
        onBlacklistUpdate: function (list) {       //黑名单变动
            // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
            console.log(list);
        }
    });
    /* 登录后加载已缓存的数据 */ 
    if (localStorage[group]) {
        var localContent = JSON.parse(localStorage[group]);
        //循环数组
        $(localContent).each(function(key , obj){
            console.log(obj.type);
            //获取对应模板
            var domstring = showBox(obj);
            $(".chat-container").append($(domstring));
            text2bottom();
        });
    }
    // 视频聊天部分
    rtcCall = new WebIM.WebRTC.Call({
        connection: conn,
        mediaStreamConstaints: {
                audio: true,
                video: true
        },
        listener: {
            onAcceptCall: function (from, options) {
                console.log('onAcceptCall::', 'from: ', from, 'options: ', options);
            },
            //通过streamType区分视频流和音频流，streamType: 'VOICE'(音频流)，'VIDEO'(视频流)
            onGotRemoteStream: function (stream, streamType) {
                console.log('onGotRemoteStream::', 'stream: ', stream, 'streamType: ', streamType);
                var video = document.getElementById('video');
                video.srcObject = stream;
            },
            onGotLocalStream: function (stream, streamType) {
                console.log('onGotLocalStream::', 'stream:', stream, 'streamType: ', streamType);
                var video = document.getElementById('localVideo');
                video.srcObject = stream;
            },
            onRinging: function (caller) {
                console.log('onRinging::', 'caller:', caller);
            },
            onTermCall: function (reason) {
                console.log('onTermCall::');
                console.log('reason:', reason);
            },
            onIceConnectionStateChange: function (iceState) {
                console.log('onIceConnectionStateChange::', 'iceState:', iceState);
            },
            onError: function (e) {
                console.log(e);
            }
         }
    });
}

/********************消息处理********************/
/* 时间格式化 */
function crtTimeFtt() {
    var date = new Date();
    return date.getFullYear()
    + '-' + (date.getMonth() + 1)
    + '-' + date.getDate()
    + ' ' + date.getHours()
    + ':' + date.getMinutes()
    + ':' + date.getSeconds();
}
/* 缓存消息处理 */
function detailMessage(data,from,type,id){
    var localContent = new Array();
    if (localStorage[group]) {
        localContent = JSON.parse(localStorage[group]);
    }
    localContent[localContent.length] = {
        'time':crtTimeFtt(),
        'data':data,//数据
        'from':from,//谁发的
        'type':type,//文本类型 text,emoji,file,picture
        'id':id//消息id
    };
    localStorage[group] = JSON.stringify(localContent);//存储本地；
}
/* 处理其他用户发送的消息 缓存处理 */
function otherDetailMessage(data,from,type,id){
    var localContent = new Array();
    var current_group = login_account+':'+from;
    if (localStorage[current_group]) {
        localContent = JSON.parse(localStorage[current_group]);
    }
    localContent[localContent.length] = {
        'time':crtTimeFtt(),
        'data':data,//数据
        'from':from,//谁发的
        'type':type,//文本类型 text,emoji,file,picture
        'id':id//消息id
    };
    localStorage[current_group] = JSON.stringify(localContent);//存储本地；
}

//模板
function showBox(obj){
    //生成数据绑定函数
    var leftContent_txt = _.template($("#em-widget-left-txt").html());
    var leftContent_picture = _.template($("#em-widget-left-picture").html());
    var leftContent_file = _.template($("#em-widget-left-file").html());
    var rightContent_txt = _.template($("#em-widget-right-txt").html());
    var rightContent_picture = _.template($("#em-widget-right-picture").html());
    var rightContent_file = _.template($("#em-widget-right-file").html());
    if (obj['from']=='me') {
        if (obj.type=='text') {
            var html = obj.data.replace('&lt','<');
            html = html.replace('&gt','>');
            html = html.replace('&nbsp','');
            html = html.replace('&amp','');
            html = html.replace('&quot','');
            obj['data'] = html;
            domstring = rightContent_txt(obj);
        }else if (obj.type=='picture') {
            domstring = rightContent_picture(obj);
        }else if (obj.type=='file') {
            domstring = rightContent_file(obj);
        }else{}
    }else{
        if (obj.type=='text') {
            domstring = leftContent_txt(obj);
        }else if (obj.type=='picture') {
            domstring = leftContent_picture(obj);
        }else if (obj.type=='file') {
            domstring = leftContent_file(obj);
        }else{}
    }
    domstring = domstring.replace(new RegExp("&lt;","gm"),"<");
    domstring = domstring.replace(new RegExp("&gt;","gm"),">");
    domstring = domstring.replace(new RegExp("&quot;","gm"),"'");
    return domstring;
}
/* 滑动至最底部 */ 
function text2bottom () {
    var div = $(".chat-wrapper").get(0);
    div.scrollTop = div.scrollHeight;
}
/* 显示发送和接收的消息消息 */
function showMessage(){
    console.log('message:'+localContent);
    var localContent = JSON.parse(localStorage[group]);
    var obj = localContent[localContent.length-1];
    console.log(obj);
    //获取对应模板
    var domstring = showBox(obj);//调用模板
    $(".chat-container").append($(domstring));
    text2bottom();
}
/********************消息处理********************/


//快捷建发送
$(function() {
    function keydown() {
        if(event.ctrlKey && window.event.keyCode == 13){
            sendPrivateText();//发送消息
        }
    }
    document.onkeydown=keydown;
});
/* 发送单聊消息 */
function sendPrivateText() {
    var msg_content = $(".em-widget-textarea").val();//获取文本内容
    if (msg_content.length==0) return;
    console.log('发送至'+send_to);
    var id = conn.getUniqueId();                 // 生成本地消息id
    var msg = new WebIM.message('txt', id);      // 创建文本消息
    msg.set({
        msg: msg_content,                  // 消息内容
        to: send_to,                       // 接收消息对象（用户id）
        roomType: false,
        success: function (id, serverMsgId) {
            console.log('send private text Success');
            var textarea = document.getElementById("textarea");//id必填
            textarea.value = '';
            //缓存发送数据
            var id_time =Date.parse(new Date());
            var emojiMessage = WebIM.utils.parseEmoji(msg_content);
            detailMessage(emojiMessage,"me",'text',id_time);
            console.log('msg_content:'+emojiMessage);
            showMessage();    //显示发送消息;
        }
    });
    msg.body.chatType = 'singleChat';
    conn.send(msg.body);
}
/* 单聊发送图片消息 */
function sendPrivateImg() {
    $(this).change(function  () {
        var id = conn.getUniqueId();                   // 生成本地消息id
        var msg = new WebIM.message('img', id);        // 创建图片消息
        var input = document.getElementById('image');  // 选择图片的input   id必填
        var file = WebIM.utils.getFileUrl(input);      // 将图片转化为二进制文件
        var allowType = {'jpg': true,'gif': true,'png': true,'bmp': true};
        var img_url;
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: send_to,                       // 接收消息对象
                roomType: false,
                chatType: 'singleChat',
                onFileUploadError: function () {      // 消息上传失败
                    console.log('onFileUploadError');
                },
                onFileUploadComplete: function (aa) {   // 消息上传成功
                    console.log('onFileUploadComplete');
                    img_url = aa.uri+"/"+aa.entities[0].uuid;
                },
                success: function () {                // 消息发送成功
                    console.log('Success');
                    //缓存发送数据
                    var id_time =Date.parse(new Date());
                    console.log(img_url)
                    detailMessage(img_url,"me",'picture',id_time);
                    showMessage();
                },
                flashUpload: WebIM.flashUpload
            };
            msg.set(option);
            conn.send(msg.body);
        }
    });
};
/* 单聊发送文件消息 */
function sendPrivateFile() {
    $(this).change(function  () {
        var id = conn.getUniqueId();                   // 生成本地消息id
        var msg = new WebIM.message('file', id);        // 创建文件消息
        var input = document.getElementById('file');  // 选择文件的input  id必填
        var file = WebIM.utils.getFileUrl(input);      // 将文件转化为二进制文件
        var allowType = {'jpg': true,'gif': true,'png': true,'bmp': true,'zip': true,'txt': true,'doc': true,'pdf': true};
        var file_url;
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: send_to,                       // 接收消息对象
                roomType: false,
                chatType: 'singleChat',
                onFileUploadError: function () {      // 消息上传失败
                    console.log('onFileUploadError');
                },
                onFileUploadComplete: function (aa) {   // 消息上传成功
                    console.log('onFileUploadComplete');
                    file_url = aa.uri+"/"+aa.entities[0].uuid;
                },
                success: function () {                // 消息发送成功
                    console.log('Success');
                    //缓存发送数据
                    var id_time =Date.parse(new Date());
                    detailMessage(file_url,"me",'file',id_time);
                    showMessage();
                },
                flashUpload: WebIM.flashUpload
            };
            msg.set(option);
            conn.send(msg.body);
        }
    });
};

/* 视频呼叫对方 */ 
function videoCall() {
    console.log('发起视频聊天');
    rtcCall.caller = login_account ;
    rtcCall.makeVideoCall(send_to);
};
/* 音频呼叫对方 */ 
function voiceCall() {
    rtcCall.caller = login_account;
    rtcCall.makeVoiceCall(send_to);
};
/* 关掉/拒绝视频 */ 
function endCall() {
    console.log('拒绝');
    $(".video_box").addClass('hide');
    rtcCall.endCall();
} 
/* 接受对方呼叫 */ 
function acceptCall() {
    console.log('接收视频');
    $(".video_box").addClass('hide');
    rtcCall.acceptCall();
}
















