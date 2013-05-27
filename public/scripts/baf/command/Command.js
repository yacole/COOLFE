define(["dojo/topic"],function(topic){
    /*
     *   摘要:
     *       命令模块：主要存放全局变量和全局的一些方法，通过topic机制，监听
     *       其他模块的调用，并触发订阅的方法
     */
    return {
        //显示消息：将信息显示在信息栏
        //type : 类型E W I；classCode ：消息类 ; messageCode : 消息编号
        showMessage : function(type,classCode,messageCode){
            topic.publish("message",type,classCode,messageCode);
        },

        //处理服务端的反馈数据
        //response : 反馈数据对象
        handleExport : function(response){
            topic.publish("handleExport",response);
        },

//        //显示工作区
//        show_workspace : function(program_id,params,pos){
//            topic.publish("show/workspace",program_id,params,pos);
//        },
//
//        //替代工作区
//        replace_workspace : function(program_id){
//            topic.publish("replace/workspace",program_id);
//        },

        //显示消息弹出框，args为标准的参数设定
        show_dialog : function(args){
            topic.publish("dialog",args);
        },

        //记录页签关闭历史
        //program_id : 程序id ； title ：程序标题
        recordWso  : function(program_id,title){
             topic.publish("set/cmdHistory",program_id,title);
        },

        //获取页签历史队列
        rollbackWso  : function(){
            topic.publish("get/cmdHistory");
        },

        //将数据从页签历史队列中移除
        //program_id : 程序id
        removeWso  : function(program_id){
            topic.publish("remove/cmdHistory",program_id);
        }

    }
});