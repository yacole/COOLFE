define(["dojo/_base/declare","dijit/layout/ContentPane","dojo/request","base/Util","base/Env",
    "form/TextBox","form/Select"],
    function(declare,ContentPane,request,Util,Env,TextBox,Select){
        /**
         * 摘要:
         *      报表设计器:structurePane
         */
        return declare("",[ContentPane],{
            //基础数据准备状态
            ready : false,

            constructor : function(args){
                args.href = Util.url.report_builder_setup_template("_base");
            },

            onDownloadEnd : function(){
                var o = this;
                Util.queryTofillLabel();
            }
        });
    });
