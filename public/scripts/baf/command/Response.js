/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-5-23
 * Time: 上午10:02
 * To change this template use File | Settings | File Templates.
 */
define(["baf/base/Util","baf/base/Env"],function(Util,ENV){

    return {
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