define(["dojo/_base/declare","dijit/layout/ContentPane","base/Util","form/TextBox"],
    function(declare,ContentPane,Util,TextBox){
        /**
         * 摘要:
         *      报表设计器:basePane
         */
        return declare("",[ContentPane],{
            report_name : null,
            description : null,
            report_group : null,
            created_by : null,
            creation_date : null,
            last_updated_by : null,
            last_update_date : null,
            isEdit : false,
            report_id : null,
            report_group_name : null,

            constructor : function(args){
                args.href = Util.url.report_builder_setup_template("_base");
                args.id = Util.xId("reportBuilderBasePane");
            },

            onDownloadEnd : function(){
                var o = this;
                Util.queryTofillLabel(this.domNode);

                this.report_name = new TextBox({name : "report_name",disabled : !this.isEdit},"report_name");
                this.report_name.startup();

                this.description = new TextBox({name : "description",disabled : !this.isEdit},"description");
                this.description.startup();

                this.report_group = new TextBox({
                    name : "report_group",
                    disabled : !this.isEdit,
                    value : this.report_group_name
                },"report_group");
                this.report_group.startup();

                this.created_by = new TextBox({name : "created_by",disabled : true},"created_by");
                this.created_by.startup();

                this.creation_date = new TextBox({name : "creation_date",disabled : true},"creation_date");
                this.creation_date.startup();

                this.last_updated_by = new TextBox({name : "last_updated_by",disabled : true},"last_updated_by");
                this.last_updated_by.startup();

                this.last_update_date = new TextBox({name : "last_update_date",disabled : true},"last_update_date");
                this.last_update_date.startup();
                //初始化值
                if(this.report_id){
                    var o = this;
                    //显示
                    Util.get(Util.url.report("find_base",{report_id : this.report_id}),function(data){
                        o.report_name.set("value",data.name);
                        o.report_name.set("disabled",true);
                        o.created_by.set("value",data.created_by);
                        o.creation_date.set("value",data.creation_date);
                        o.last_updated_by.set("value",data.last_updated_by);
                        o.last_update_date.set("value",data.last_update_date);
                        o.description.set("value",data.description);
                        o.report_group.set("value",data.report_group);
                    });

                }
            }
        });
    });
