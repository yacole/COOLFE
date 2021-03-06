define(["dojo/_base/declare", "dijit/layout/ContentPane","base/Util","cmd/Command","report/viewer/Viewer"],
    function(declare,ContentPane,Util,Command,ReportGrid){
        /*
         *   摘要:
         *       工作区对象：表单
         */
        return declare("",[ContentPane],{
            //程序id
            program_id : null,
            //创建时间戳
            timestamp : null,
            report_id : null,
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
                    dataUrl : Util.url.report_read_data_by_report_id(this.report_id),
                    program_id : this.program_id,
                    report_id : this.report_id,
                    timestamp : this.timestamp,
                    id : Util.id.wso_GridPane + this.timestamp
                });
                this.addChild(this.gridPane);

                this.inherited(arguments);

            },
            isDirty : function(){
                return false;
            },
            //根据程序id刷新对象
            refresh : function(){
                if(this.gridPane.grid){
                    this.gridPane.refresh();
                }
            }
        });
    });
