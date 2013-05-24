/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-7
 * Time: 下午1:30
 * 监听在框架搭建完成后启动
 */
define(["dojo/topic","baf/dijit/Dialog","baf/dijit/RightMenu","baf/base/Util","baf/base/Env","baf/command/Response"],
    function(topic,Dialog,RightMenu,Util,ENV,Response){
    return {
        startup : function(){

            /*
             监听右键菜单触发事件
             */
            RightMenu.startup();

            //环境变量启动
            ENV.startup();


            //状态栏-消息类
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

            //弹出框
            topic.subscribe("dialog", function(args){

                new Dialog(args).show();

            });//topic.s

            //处理服务器返回值
            topic.subscribe("handleExport", function(args){

                Response.handleExport(args);

            });//topic.s



        },
        shutdown : function(){

        }
    }
});
