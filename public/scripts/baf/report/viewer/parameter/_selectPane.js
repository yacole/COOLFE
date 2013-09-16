define(["dojo/_base/declare","dijit/layout/ContentPane","base/Util","base/Env",
    "form/TextBox","form/DateTextBox","../filter/_action","../setup/_util","form/Select"],
    function(declare,ContentPane,Util,Env,TextBox,DateTextBox,action,u,Select){
        return declare("",[ContentPane],{

            constructor : function(args){
                args.href = Util.url.report_viewer_parameter_template("show");
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
                            div.innerHTML = u.descAction(p.action);

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
                var rtObj = null;
                //判断是否为日期，如果为日期字段则生成日期选择框
                switch(p.input_type){
                    case '01':
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
                        rtObj = new TextBox(inputParam);
                        break;
                    case '02' :
                        if(inputParam.value == ""){
                            inputParam.value = new Date();
                        }
                        inputParam.constraints = {datePattern: "yyyy-MM-dd"};
                        rtObj = new DateTextBox(inputParam);
                        break;
                    case '03' :
                        if(inputParam.value.toUpperCase() == "X"){
                            inputParam.options = [
                                { label: "ALL", value: "ALL"},
                                { label: "YES", value: "1", selected: true },
                                { label: "NO", value: "0"}
                            ];
                        }else{
                            inputParam.options = [
                                { label: "ALL", value: "ALL", selected: true },
                                { label: "YES", value: "1"},
                                { label: "NO", value: "0"}
                            ];
                        }
                        rtObj = new Select(inputParam);
                        break;
                }
                return rtObj;
            }
        });
    });
