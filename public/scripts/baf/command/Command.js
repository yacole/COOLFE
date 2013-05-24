/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-7
 * Time: 下午2:07
 * 发布命令
 */
define(["dojo/topic"],function(topic){
    return {
        //显示消息
        showMessage : function(type,classCode,messageCode){
            topic.publish("message",type,classCode,messageCode);
        },

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

        //显示弹出框
        show_dialog : function(args){
            topic.publish("dialog",args);
        },

        //记录页签关闭历史
        recordWso  : function(program_id,description){
             topic.publish("set/cmdHistory",program_id,description);
        },
        rollbackWso  : function(program_id){
            topic.publish("get/cmdHistory",program_id);
        },
        removeWso  : function(program_id){
            topic.publish("remove/cmdHistory",program_id);
        }

    }
});