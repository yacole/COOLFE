/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-11
 * Time: 上午11:10
 * 系统状态栏消息
 */
define(["dojo/_base/declare",
    "dijit/layout/ContentPane",
    "dijit/form/Button",
    "dojo/request",
    "baf/base/Util",
    "baf/dijit/Dialog",
    "dojo/dom-construct"],
function(declare,ContentPane,Button,request,Util,Dialog,construct){

    return declare("",[Button],{
        //详细信息
        detail : new Array(),

        showMessage : function(type,classCode,messageCode){
            var messageBar = this;
            request.get(Util.url.find_message({class_code : classCode,message_code : messageCode}),{handleAs : "json"}).then(
                function(message){

                    if(message){
                        //设置详细信息
                        messageBar.detail = [];
                        messageBar.detail.push(message);
                        messageBar.setMessage(message);
                    }

            });
        },

        //显示状态栏消息
        setMessage : function(message,length){

            if(!length){
                length = Util.config.message_max_length;
            }

            switch(message.type){
                case Util.id.messageTYPE_WARNNING :
                    //警告信息效果
                    this.set({
                        style : "background-color:yellow;"
                    });
                    break;
                case  Util.id.messageTYPE_ERROR :
                    //错误信息效果
                    this.set({
                        style : "background-color:red;"
                    });
                    break;
                case  Util.id.messageTYPE_INFO :
                    //常规信息效果
                    this.set({
                        style : "background-color:#F0F0F0;"
                    });
                    break;
                default:
                    this.set({
                        style : "background-color:#F0F0F0;"
                    });
            } //switch

            //判断是否需要截取
            if(message.content.length > length){
                this.set("label",message.content.substring(0,length) + "...");
            }else{
                this.set("label",message.content);
            }

        },
        //弹框显示消息具体内容
        onClick : function(){
            //存在消息时
            if(this.detail.length > 0){
//                this.detail.forEach();
                var message = this.detail[0];
                this._showDetail(message);
            }
        },
        _showDetail : function(message){
            var detailDialog = new Dialog({
                href : Util.url.find_message_detail({message_id : message.message_id,content : message.content,code : message.code})
            });
            detailDialog.show();
        },
        clear : function(){
            this.set("style","display:none");
        }

    });

});
