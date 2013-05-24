define(["dojo/topic","baf/command/History","baf/config/IdList","baf/dijit/RightMenu"],
    function(topic,cmdHistory,IdList,RightMenu){
    return {
        /*
        *   摘要:
        *       整个系统的环境变量：包括一些全局变量，公用对象获取等。
        *   描述：
        *       通过startup来启动环境：动作的堆栈队列启动；
        *       需要在系统的首页启动；
        */
        //环境启动函数
        startup : function(){
            //命令历史记录
            var cmdhistory = new cmdHistory();

            //全局：记录页签关闭历史
            //program_id ： 程序id ； title ：程序的标题
            topic.subscribe("set/cmdHistory", function(program_id,title){
                cmdhistory.recordWso(program_id,title);
            });

            //获取历史队列，渲染右键菜单列表
            topic.subscribe("get/cmdHistory", function(){
                RightMenu.historyMenu(cmdhistory.closeWsoList.items);
            });

            //再次打开程序时，历史队列中此对象将被移除
            //program_id : 程序id
            topic.subscribe("remove/cmdHistory", function(program_id){
                cmdhistory.removeWso(program_id);
            });
        },

        //当前的工作区中的聚焦对象
        currentWso : function(){
            return this.wso().currentChild();
        },
        //当前的工作区
        wso : function(){
            return dijit.byId(IdList.WorkspacePane);
        },
        //任务栏中的消息栏
        messageBar : function(){
            return dijit.byId(IdList.messageblock);
        },
        //系统整个框架区域对象
        appContainer : function(){
            return dijit.byId(IdList.appContainer);
        }

    }
});
