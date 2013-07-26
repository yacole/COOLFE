define(["dojo/_base/declare","dijit/layout/ContentPane","dojo/request","base/Util","base/Env",
    "form/TextBox","form/Select"],
    function(declare,ContentPane,request,Util,Env,TextBox,Select){
        /**
         * 摘要:
         *      报表设计器:basePane
         */
        return declare("",[ContentPane],{
            //基础数据准备状态
            ready : false,

            constructor : function(args){
                args.href = Util.url.report_builder_template("base");
            },

            onDownloadEnd : function(){
                var o = this;
                Util.queryTofillLabel();

                var nameTb = new TextBox({name : "report_name"},"report_name");
                nameTb.startup();

                var descriptionTb = new TextBox({name : "description"},"description");
                descriptionTb.startup();

                var typeSelect = new Select({name : "report_type"},"report_type");
                typeSelect.startup();
            }
        });
    });
