define(["dojo/_base/declare","base/Util","base/Env","./_setupTabPane",
    "baf/dijit/Dialog","./_basePane","./_sourcePane","form/Button",
    "./parameter/_setupPane","./_structurePane","dojo/json","report/viewer/setup/_util"],
    function(declare,Util,Env,setupTabPane,Dialog,basePane,sourcePane,Button,paramPane,structurePane,json,u){
        /**
         * 摘要:
         *      报表设计器
         */
        return declare("",[Dialog],{
            //被选择属性类型
            type : null,
            report_id : null,
            report_group_name : null,

            constructor : function(args){
//                args.style =  "width:50em;height:40em";
//                args.href = Util.url.report_builder_template("setup");
            },

            startup : function(){
                var o = this;
                switch(this.type){
                    case "base" :
                        this._buildBasePane();
                        break;
                    case "source" :
                        this._buildSourcePane();
                        break;
                    case "parameter" :
                        this._buildParamPane();
                        break;
                    case "structure" :
                        this._buildStructurePane();
                        break;
                    default :
                        this._buildBasePane();
                        break;
                }
                var cancelButton = new Button({
                    label : Util.label.button_cancel,
                    onClick : function(){
                        o.hide();
                    }
                });
                this.addChild(cancelButton);
                this.inherited(arguments);
            },
            _buildBasePane : function(){
                var o = this;
                var bp = new basePane({
                    isEdit : true,
                    report_id : this.report_id,
                    class : Util.id.rpt_builder_basePane,
                    report_group_name : this.report_group_name
                });
                this.addChild(bp);
                var confirmButton = new Button({
                    label : Util.label.button_confirm,
                    onClick : function(){
                        var form = Util.dijit_byId("reportSetupBase");
                        var data = new Object();
                        data.report_name = bp.report_name.value;
                        data.description = bp.description.value;
                        data.report_group = bp.report_group.value;
                        var url = "";
                        if(o.report_id){
                            //修改动作
                            data.report_id = o.report_id;
                            url = Util.url.report("update_base_data");
                        }else{
                            //新增
                            url = Util.url.report("create_base_data");
                        }
                        form.formValidate(function(){
                            Util.post(url,data,function(){
                                if(!Env.isError()){
                                    o.hide();
                                    Env.currentWso().refresh();
//                                    Util.pathByKey("name",data.report_name,Util.dijit_byId("reportBuilderTree"));
                                }
                            });
                        });
                    }
                });
                this.addChild(confirmButton);
            },
            _buildSourcePane : function(){
                var o = this;
                var sp = new sourcePane({
                    isEdit : true,
                    report_id : this.report_id,
                    class : Util.id.rpt_builder_sourcePane,
                    report_group_name : this.report_group_name
                });
                this.addChild(sp);
                var confirmButton = new Button({
                    label : Util.label.button_confirm,
                    onClick : function(){
                        var form = Util.dijit_byId("reportSetupSource");
                        var data = new Object();
                        data.source_type = sp.source_type.value;
                        data.source_text = sp.source_text.value;
                        data.report_id = o.report_id;
                        form.formValidate(function(){
                            Util.post(Util.url.report("create_source_data"),data,function(){
                                if(!Env.isError()){
                                    o.hide();
                                }
                            });
                        });
                    }
                });
                this.addChild(confirmButton);
            },
            _buildParamPane : function(){
                var o = this;
                var pp = new paramPane({
                    isEdit : true,
                    report_id : this.report_id,
                    class : Util.id.rpt_builder_paramPane
                });
                this.addChild(pp);
                var confirmButton = new Button({
                    label : Util.label.button_confirm,
                    onClick : function(){
                        if(pp.rightGrid){
                            var items = pp.rightGrid.getALLItems();
                            var data = new Object();
                            var arr = [];
                            if(items.length > 0){
                                for(var i = 0;i < items.length ;i++){
                                    arr.push(o._postItem(items[i]));
                                }
                            }
                            data.data = json.stringify(arr);
                            data.report_id = o.report_id;
                            Util.post(Util.url.report("update_parameters"),data,function(){
                                if(!Env.isError()){
                                    o.hide();
                                }
                            });
                        }
                    }
                });
                this.addChild(confirmButton);
            },
            _buildStructurePane : function(){
                var o = this;
                var pp = new structurePane({
                    isEdit : true,
                    report_id : this.report_id,
                    class : Util.id.rpt_builder_structurePane
                });
                this.addChild(pp);
                var confirmButton = new Button({
                    label : Util.label.button_confirm,
                    onClick : function(){
                        if(pp.rightGrid){
                            var items = pp.rightGrid.getALLItems();
                            var data = new Object();
                            var arr = [];
                            if(items.length > 0){
                                for(var i = 0;i < items.length ;i++){
                                    arr.push(o._postItem(items[i]));
                                }
                            }
                            data.data = json.stringify(arr);
                            data.report_id = o.report_id;
                            Util.post(Util.url.report("update_parameters"),data,function(){
                                if(!Env.isError()){
                                    o.hide();
                                }
                            });
                        }
                    }
                });
                this.addChild(confirmButton);
            },
            _postItem : function(item){
                var newItem = new Object();
                newItem.field = item.field.toString();
//                newItem.action = item.action.toString();
                if(item.valuelist_name){
                    newItem.valuelist_name = item.valuelist_name.toString();
                }else{
                    newItem.valuelist_name = "";
                }
                if(item.default_value){
                    newItem.default_value = item.default_value.toString();
                }else{
                    newItem.default_value = "";
                }
                if(item.required_flag && item.required_flag.toString() == "true"){
                    newItem.required_flag = "1";
                }else{
                    newItem.required_flag = "0";
                }
                if(item.input_type_desc){
                    newItem.input_type_desc = item.input_type_desc.toString();
                }else{
                    newItem.input_type_desc = "文本框";
                }
                if(item.action_desc){
                    newItem.action = u.nameAction(item.action_desc.toString());
                }else{
                    newItem.action = 'IN';
                }
                console.info(newItem.action);
                return newItem;
            }
        });
    });
