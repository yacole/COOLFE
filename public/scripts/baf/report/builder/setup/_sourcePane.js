define(["dojo/_base/declare","dijit/layout/ContentPane","base/Util","form/Textarea","form/Select"],
    function(declare,ContentPane,Util,Textarea,Select){
        /**
         * 摘要:
         *      报表设计器:basePane
         */
        return declare("",[ContentPane],{
            isEdit : false,
            report_id : null,
            source_type : null,
            source_text : null,

            constructor : function(args){
                args.href = Util.url.report_builder_setup_template("_source");
                args.id = Util.xId("reportBuilderSourcePane");
            },

            onDownloadEnd : function(){
                if(this.report_id){
                    Util.queryTofillLabel(this.domNode);

                    this.source_type = new Select({name : "source_type",disabled : !this.isEdit},"source_type");
                    this.source_type.startup();
//                    console.info(this.source_type);

                    this.source_text = new Textarea({
                        name : "source_text",
                        rows: 10,
                        cols: 50,
//                        style: "width:auto;",
                        disabled : !this.isEdit
                    },"source_text");
                    this.source_text.startup();

                    var o = this;
                    //显示
                    Util.get(Util.url.report("find_last_version_source",{report_id : this.report_id}),function(data){
                        o.source_type.set("value",data.source_type);
                        o.source_text.set("value",data.source_text);
                    });
                }

            }
        });
    });
