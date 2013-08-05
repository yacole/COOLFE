define(["dojo/_base/declare", "dojo/request", "base/Util","base/Env","baf/dijit/Dialog",
    "form/TextBox","form/Button"],
    function(declare,request,Util,Env,Dialog,TextBox,Button){
        /*
         *   摘要:
         *        报表组
         */
        return declare("",[],{
            //命名
            nameTextBox : null,
            //描述
            descTextBox : null,

            create : function(name){
                var o = this;
                var dialog = new Dialog({
                    title : "报表组创建",
                    href : Util.url.localUrl("report/builder/group/_form.html"),
                    id : "reportGroupCreateDialog",
                    onDownloadEnd : function(){
                        o.nameTextBox = new TextBox({
                            style : "width:10em",
                            value : name
                        },"name");
                        o.descTextBox = new TextBox({
                            style : "width:20em"
                        },"description");

                        var confirmButton = new Button({
                            label : "确认",
                            onClick : function(){
                                var params = new Object();
                                params.name = o.nameTextBox.value;
                                params.description = o.descTextBox.value;
                                //提交
                                Util.post("index.php/bc/report/create_report_group",params,function(){
                                    Util.dijit_byId("reportGroupCreateDialog").hide();
                                });
                            }
                        },"confirmButton");
                        var cancelButton = new Button({
                            label : "取消",
                            onClick : function(){
                                Util.dijit_byId("reportGroupCreateDialog").hide();
                            }
                        },"cancelButton");
                    }
                });
                dialog.show();
            },
            show : function(){

            },
            rename : function(){

            }
        });
    });