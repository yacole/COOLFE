define(["../../../../../../dojo1.8.3/dojo/_base/declare","dijit/layout/ContentPane","dojo/request","base/Util",
    "base/Env","form/Button","form/Textarea","form/Select"],
    function(declare,ContentPane,request,Util,Env,Textarea,Select){
        /**
         * 摘要:
         *      报表设计器:basePane
         */
        return declare("",[ContentPane],{

            builder : null,
            source_type : null,
            source_text : null,

            constructor : function(args){
                args.href = Util.url.report_builder_template("source");
                args.id = Util.xId("reportBuilderSourcePane");
            },

            onDownloadEnd : function(){
                var o = this;
                Util.queryTofillLabel();

                this.source_type = new Select({name : "source_type",disabled : !this.builder.isEdit},"source_type");
                this.source_type.startup();


                this.source_text = new Textarea({
                    name : "source_text",
                    rows: 4,
                    cols: 50,
                    style: "width:auto;",
                    disabled : !this.builder.isEdit
                },"source_text");
                this.source_text.startup();

            },
            //在被选中时触发事件
            onShow : function(){
                //替换工具栏的提交按钮
                Env.currentWso().toolBar.saveButton.onClick = this._submit;
            },
            //替换工具栏的提交按钮
            _submit : function(){
                var o = this;
                var innerForm = Env.currentWso().innerForm;
                innerForm.set("action","index.php/bc/report/create_source_data");
//                dojo.connect(innerForm,"successFunc",this._activeSourcePane2);
                innerForm.successFunc = function(){
                    var basePane = Util.dijit_byId("reportBuilderBasePane");
                    basePane._activeSourcePane();
                };
                innerForm.submit();
            }
        });
    });
