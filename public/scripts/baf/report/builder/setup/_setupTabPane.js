define(["dojo/_base/declare","base/Util","dijit/layout/TabContainer","./_basePane",
    "./_sourcePane","./parameter/_showPane"],
    function(declare,Util,TabContainer,bp,sp,pp){
        /**
         * 摘要:
         *      报表设计器
         */
        return declare("",[TabContainer],{
            //默认可编辑状态
            baseDataReady : false,
            sourceDataReady : false,
            parameterDataReady : false,
            structureDataReady : false,
            basePane : null,
            sourcePane : null,
            paramPane : null,
            structurePane : null,
            report_id : null,

            startup : function(){
                if(this.report_id){
                    this.basePane = new bp({
                        title : Util.label.report_base,
                        report_id : this.report_id
                    });
                    this.addChild(this.basePane);

                    this.sourcePane = new sp({
                        title : Util.label.report_data_source,
                        disabled : !this.sourceDataReady,
                        report_id : this.report_id
                    });
                    this.addChild(this.sourcePane);

                    this.paramPane = new pp({
                        title : "参数",
                        disabled : !this.parameterDataReady,
                        report_id : this.report_id
                    });
                    this.addChild(this.paramPane);

                    this.inherited(arguments);
                }
            }
        });
    });
