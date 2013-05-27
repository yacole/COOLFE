define(["dojo/topic","baf/dijit/Dialog","baf/dijit/RightMenu","baf/base/Util","baf/base/Env","baf/command/Response"],
    function(topic,Dialog,RightMenu,Util,ENV,Response){
        /*
         *   摘要:
         *       系统监听模块，在系统首页启动，启动的过程：
         *       右键菜单监听 --> 环境变量启动 --> 全局监听订阅
         */
    return {
        startup : function(){

            //监听右键菜单触发事件
            RightMenu.startup();

            //环境变量启动
            ENV.startup();


            //显示消息：将信息显示在信息栏
            //type : 类型E W I；classCode ：消息类 ; messageCode : 消息编号
            topic.subscribe("message", function(type,classCode,messageCode){

                ENV.messageBar().showMessage(type,classCode,messageCode);

            });//topic.s

//            //新建一个工作区：一般用作导航直接跳转
//            topic.subscribe("show/workspace", function(program_id,params,pos){
//
//                //获取s时间戳，保证ID的唯一性
//                var timestamp =  (new Date()).valueOf().toString();
//
//                var wso = dijit.byId(Util.id.WorkspacePane);
//                wso.openProgram(program_id,timestamp,params,pos);
//
////                messagebar.clear();
//
//            });
//
//
//            //替换当前工作区：一般用作菜单动作
//            topic.subscribe("replace/workspace", function(program_id){
//
//                var timestamp =  (new Date()).valueOf().toString();
//
//                var wso = dijit.byId(Util.id.WorkspacePane);
//                wso.replaceProgram(program_id,timestamp);
//
//            });

            //显示消息弹出框，args为标准的参数设定
            topic.subscribe("dialog", function(args){

                new Dialog(args).show();

            });//topic.s

            //处理服务端的反馈数据
            //response : 反馈数据对象
            topic.subscribe("handleExport", function(args){

                Response.handleExport(args);

            });//topic.s

        }
    }
});
