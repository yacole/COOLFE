define(["dojo/_base/declare", "dijit/layout/ContentPane", "dojo/request", "baf/dijit/layout/MenuBar",
    "baf/base/Util", "baf/command/Command","baf/dijit/layout/ToolBar","baf/reporter/viewer/Viewer"],
    function(declare,ContentPane,request,MenuBar,Util,Command,ToolBar,ReportGrid){
        /*
         *   摘要:
         *       工作区对象：表单
         */
        return declare("",[ContentPane],{
            //程序id
            program_id : null,
            //创建时间戳
            timestamp : null,
            //控制器 ，与action组合获取服务端url
            controller : null,
            //动作
            action : null,
            //参数
            params : null,
            //字段列表
            fields : null,
            //菜单栏
            menuBar : null,
            //工具栏
            toolBar : null,

            toolBarForReport : null,
            //表单内容面板，通过url加载
            gridPane : null,
            headerPane : null,
            footerPane : null,
            //主页程序id
            home_page : null,
            //工作区对象：属于表单
            wsoType : Util.id.programTYPE_REPORT,

            constructor : function(args){
                this.inherited(arguments);
            },

            startup : function(){

                //加载系统菜单栏和工具栏
                this.addChild(this.menuBar);
                this.addChild(this.toolBar);

                //内容包括在此面板中
                this.gridPane = new ReportGrid({
                    dataUrl : Util.url.safeurl(this.controller,this.action,this.params),
                    program_id : this.program_id,
                    timestamp : this.timestamp,
                    id : Util.id.wso_GridPane + this.timestamp
                });
                this.addChild(this.gridPane);

                this.inherited(arguments);

            },
            isDirty : function(){
                return false;
            }
        });
    });
