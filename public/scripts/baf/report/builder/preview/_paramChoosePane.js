define(["dojo/_base/declare","dijit/layout/ContentPane","base/Util","base/Env",
    "form/TextBox","form/DateTextBox","report/viewer/filter/_action","report/viewer/setup/_util"],
    function(declare,ContentPane,Util,Env,TextBox,DateTextBox,action,u){
        return declare("",[ContentPane],{

            constructor : function(args){
                args.href = Util.url.report_builder_preview_template("paramChoose");
            },

            onDownloadEnd : function(){
                var o = this;
                Util.queryTofillLabel();
                Util.get(Util.url.report("parameter_list",{report_id : this.report_id}),function(data){
                    if(data.items.length > 0){
                        data.items.forEach(function(p){
                            //构建参数选择输入框
                            var input = o._buildInputObj(p);
                            var label = document.createElement("label");
                            var tr = document.createElement("tr");
                            var td1 = document.createElement("td");
                            var td2 = document.createElement("td");
                            var td3 = document.createElement("td");
                            label.for = p.field;
                            if(Util.xflag(p.required_flag)){
                                //必输项前面标注：*
                                label.innerHTML = "* " + Util.fieldLabel(p.field);
                            }else{
                                label.innerHTML = Util.fieldLabel(p.field);
                            }
                            td1.appendChild(label);
                            var div = document.createElement("div");
                            div.innerHTML = o._descAction(p.action);

                            td2.appendChild(div);
                            td3.appendChild(input.domNode);
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            dojo.byId("filter_table").appendChild(tr);
                        });
                    }
                });

            },
            _buildInputObj : function(p){
                var inputParam = new Object();
                inputParam.name =  p.field;
                inputParam.required =  Util.xflag(p.required_flag);
                inputParam.value =  p.default_value;
                //判断是否为日期，如果为日期字段则生成日期选择框
                if(p.input_type == "02"){
                    return new DateTextBox({
                        constraints: {datePattern: "yyyy-MM-dd"},
                        value : p.default_value
                    });
                }else{
                    //除了LIKE和NOT LIKE不能选择
                    if(p.valuelist_id){
                        inputParam.canSelect = true;
                        inputParam.valuelist_id = p.valuelist_id;
                        switch(p.action){
                            case action.IN.name :
                                inputParam.mulitSelect = true;
                                break;
                            case action.NOT_IN.name:
                                inputParam.mulitSelect = true;
                                break;
                            default :
                                inputParam.mulitSelect = false;
                                break;
                        }
                    }
                    return new TextBox(inputParam);
                }
            },
            //中文解释action
            _descAction : function(name){
                var options = u.actionOptions();
                var desc = name;
                for(var i = 0 ; i < options.length ; i ++){
                    if(options[i].action.name == name){
                        desc = options[i].label;
                        break;
                    }
                }
                return desc;
            }
        });
    });
