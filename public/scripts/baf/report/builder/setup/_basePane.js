define(["../../../../../../dojo1.8.3/dojo/_base/declare","dijit/layout/ContentPane","dojo/request","base/Util","base/Env",
    "form/TextBox","form/Select"],
    function(declare,ContentPane,request,Util,Env,TextBox,Select){
        /**
         * 摘要:
         *      报表设计器:basePane
         */
        return declare("",[ContentPane],{

            builder : null,
            report_name : null,
            description : null,
            report_group : null,
            created_by : null,
            creation_date : null,
            last_updated_by : null,
            last_update_date : null,

            constructor : function(args){
                args.href = Util.url.report_builder_template("base");
                args.id = Util.xId("reportBuilderBasePane");
            },

            onDownloadEnd : function(){
                var o = this;
                Util.queryTofillLabel();

                this.report_name = new TextBox({name : "report_name",disabled : !this.builder.isEdit},"report_name");
                this.report_name.startup();

                this.description = new TextBox({name : "description",disabled : !this.builder.isEdit},"description");
                this.description.startup();

                this.report_group = new TextBox({name : "report_group",disabled : !this.builder.isEdit},"report_group");
                this.report_group.startup();

                this.created_by = new TextBox({name : "created_by",disabled : true},"created_by");
                this.created_by.startup();

                this.creation_date = new TextBox({name : "creation_date",disabled : true},"creation_date");
                this.creation_date.startup();

                this.last_updated_by = new TextBox({name : "last_updated_by",disabled : true},"last_updated_by");
                this.last_updated_by.startup();

                this.last_update_date = new TextBox({name : "last_update_date",disabled : true},"last_update_date");
                this.last_update_date.startup();
            },
            initReportName : function(report_name){
                this.report_name.set("value",report_name);
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
                innerForm.set("action","index.php/bc/report/create_base_data");
//                dojo.connect(innerForm,"successFunc",this._activeSourcePane2);
                innerForm.successFunc = function(){
                    var basePane = Util.dijit_byId("reportBuilderBasePane");
                    basePane._activeSourcePane();
                };
                innerForm.submit();
            },
            _activeSourcePane : function(){
                var o = this;
                if(!Env.isError()){
                    //update created and updated info
                    request.get(Util.url.safeurl("bc/report","find_base_by_name",{report_name : this.report_name.value}),{handleAs : "json"}).then(function(data){
                        if(data){
                            //激活数据来源页签
                            o.builder.baseDataReady = true;
                            o.builder.sourcePane.set("disabled",false);
                            o.created_by.set("value",data.created_by);
                            o.creation_date.value.set("value",data.creation_date);
                            o.last_updated_by.set("value",data.last_updated_by);
                            o.last_update_date.set("value",data.last_update_date);
                        }
                    });
                }
            }
        });
    });
