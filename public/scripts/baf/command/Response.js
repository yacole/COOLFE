define(["baf/base/Util","baf/base/Env"],function(Util,ENV){
    /*
     *   摘要:
     *       处理服务端返回数据，包括处理：报错消息，数据包，运行程序等
     */
    return {
        //处理
        handleExport : function(response){
            if(response){
                var messages = response.messages;
                //处理消息
                if(messages){
                    this._handleMessage(messages);
                }

                //处理javascript代码

                //处理其他
            }
        },
        //处理消息列表：默认显示ERROR ，然后 WARNNING ，最后 INFO
        //点击消息按钮可以显示详细消息
        _handleMessage : function(messages){
            var mlen = messages.length;
            //获取messageBar
            var messageBar = ENV.messageBar();
            //显示必须要截断，根据配置
            var messageLength = Util.config.message_max_length;

            //处理message
            if(mlen > 0){
                //设置详细信息
                messageBar.detail = messages;

                if(mlen == 1){
                    //单行直接输出
                    messageBar.setMessage(messages[0],messageLength);
                }else{
                    //找到一个ERROR
                    var message = this._singleType(messages,Util.id.messageTYPE_ERROR);
                    if(!message){
                        //如果错误消息存在，优先输出错误消息
                        message = this._singleType(messages,Util.id.messageTYPE_WARNNING);
                        if(!message){
                            message = this._singleType(messages,Util.id.messageTYPE_WARNNING);
                        }
                    }
                    messageBar.setMessage(message,messageLength);
                }

            }
        },
        //根据消息类型，在消息列表中寻找一条消息
        _singleType : function(messages,type){
            var message = null;
            messages.forEach(function(m){
                if(m.type == type){
                    message = m;
                }
            });
            return message;
        }
    }

});