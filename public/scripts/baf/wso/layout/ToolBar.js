define(["dojo/_base/declare", "dijit/Toolbar","dijit/ToolbarSeparator","dijit/form/Button", "base/Util","base/Env"],
    function(declare,Toolbar,ToolbarSeparator,Button,Util,Env){
        /*
         *   摘要:
         *       工具栏：存放各类自定义的工具按钮组件
         */
        return declare("",[Toolbar],{
            //保存按钮
            saveButton : null,
            //查询按钮
            queryButton : null,
            //首页按钮
            homeButton : null,
            //返回按钮
            backButton : null,
            //关闭当前页按钮
            closeButton : null,
            //退出系统按钮
            logoutButton : null,

            constructor : function(args){
            },
            startup : function(){

                this.homeButton = new Button({
                    label : "H",
                    onClick : function(){
                        var wso = Env.wso();
                        var currentWso = Env.currentWso();
                        wso.openProgram_byId(currentWso.home_page,"_selfNow");
                    }
                });
                this.addChild(this.homeButton);

                this.backButton = new Button({
                    label : "返回",
                    onClick : function(){
                        var currentWso = Env.currentWso();
                        currentWso.callback();
                    },
                    disabled : true
                });
                this.addChild(this.backButton);

//                this.queryButton = new Button({
//                    label : "Q",
//                    onClick : function(){
//                        var wso = Env.wso();
//                        var currentWso = wso.currentChild();
//                        wso.openQForm(currentWso.qform,currentWso.timestamp,currentWso.params);
//                    }
//                });
//                this.addChild(this.queryButton);


                this.saveButton = new Button({
                    label : "S",
                    type : "submit",
                    onClick : function(){
                        //提交Form
                        var innerForm = Env.currentWso().innerForm;
                        innerForm.submit();

                    }
                });
                this.addChild(this.saveButton);

                this.closeButton = new Button({
                    label : "关闭",
                    onClick : function(){
                        var wso = Env.wso();
                        var currentWso = Env.currentWso();
                        wso.closeProgram(currentWso);
                    }
                });
                this.addChild(this.closeButton);

            }

        });
    });