define(["dojo/_base/declare","base/Util","./_setupTabPane","baf/dijit/Dialog"],
    function(declare,Util,setupTabPane,Dialog){
        /**
         * 摘要:
         *      报表设计器
         */
        return declare("",[Dialog],{
            setupTabPane : null,

            //展示所有属性
            showAll : function(report_id){
                var o = this;
                Util.get(Util.url.report("hasData",{report_id : report_id}),function(data){
                    console.info(data);
                    o.setupTabPane = new setupTabPane({
                        style :  "width:40em;height:20em",
                        report_id : report_id,
                        baseDataReady : data.hasBase,
                        sourceDataReady : data.hasSource,
                        parameterDataReady : data.hasParameter,
                        structureDataReady : data.hasStructure
                    });
                    console.info(o.setupTabPane.baseDataReady);
                    o.addChild(o.setupTabPane);
                    o.show();
                });
            }
        });
    });
