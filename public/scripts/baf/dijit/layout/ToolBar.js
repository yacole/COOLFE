define(["dojo/_base/declare", "dojo/request", "dijit/Toolbar",
    "dijit/ToolbarSeparator", "dijit/form/Button", "baf/base/Util",
    "baf/base/Env"],
    function(declare,request,Toolbar,ToolbarSeparator,Button,Util,Env){
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

            constructor : function(args){
            },
            startup : function(){
                this.set("class",Util.id.wso_Content_class);

                this.homeButton = new Button({
                    label : "H",
                    onClick : function(){
                        var wso = Env.wso();
                        var currentWso = Env.currentWso();
                        wso.openProgram_byId(currentWso.home_page,"_self");
                    }
                });
                this.addChild(this.homeButton);

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

            }

        });
    });