define(["dojo/_base/declare","base/Util","base/Env","grid/DataGrid",
    "dojo/data/ItemFileWriteStore","dojo/json","dojo/dom-form","dijit/layout/ContentPane",
    "dijit/form/Button","report/viewer/setup/_util","report/viewer/filter/_parameter","dojox/grid/cells/dijit"],
    function(declare,Util,Env,DataGrid,ItemFileWriteStore,JSON,domForm,ContentPane,Button,u,parameter){
        return declare("",[ContentPane],{
            report_id : null,
            leftGrid : null,
            rightGrid : null,

            constructor : function(args){
                args.href = Util.url.report_builder_setup_template("/parameter/_parameter");
                this.inherited(arguments);
            },

            onDownloadEnd  : function(){
                var o = this;
                //根据不同的数据源设置不同
                Util.get(Util.url.report("find_last_version_source",{report_id : this.report_id}),function(data){
                    if(data.source_type == '01'){
                        //SQL类型数据源
                        //获取列的列表,定义左侧grid
                        Util.get(Util.url.report("column_list",{id : data.id}),function(colists){
                            //右侧数据
                            Util.get(Util.url.report("parameter_list",{report_id : o.report_id}),function(params){
                                //初始化左侧
                                o._leftFields(colists.items,params.items);
                                var lstore = new ItemFileWriteStore({
                                    data : colists
                                });
                                if(Util.hasChildren(params)){
                                    params.items.forEach(function(e){
                                        e.action_desc = u.descAction(e.action)
                                    });
                                }
                                var  rstore = new ItemFileWriteStore({
                                    data : params
                                });

                                var lcolumn = [{ name : Util.fieldLabel("field"), field : "field",width : Util.fieldSize("field")}];
                                var gridLeft = o.leftGrid = new DataGrid({
                                    store: lstore,
                                    structure : lcolumn,
                                    //直接显示含HTML标签字段
                                    escapeHTMLInData: false,
                                    singleClickEdit : true,
                                    onRowDblClick : function(e){
                                        o._moveRight(lstore,rstore,this.getItem(e.rowIndex));
                                    }
                                });
                                dojo.byId("columnList").appendChild(gridLeft.domNode);
                                gridLeft.startup();

                                //右边grid，现有参数列表
                                var ops = o._actionOptions();
                                var inputOps = [];
                                Util.get(Util.url.optionsByName("BC_RPT_INPUT_TYPE"),function(options){
                                    if(Util.hasChildren(options)){
                                        options.items.forEach(function(e){
                                            inputOps.push(e.label)
                                        });
                                        var rcolumn = [
                                            { name : Util.fieldLabel("field"), field : "field",width : Util.fieldSize("field")},
                                            { name : Util.fieldLabel("action_desc"), field : "action_desc",
                                                width : Util.fieldSize("action_desc"),
                                                editable: true, cellType: dojox.grid.cells.Select, options: ops
                                            },
                                            { name : Util.fieldLabel("input_type_desc"), field : "input_type_desc",
                                                width : Util.fieldSize("input_type_desc"),
                                                editable: true, cellType: dojox.grid.cells.Select, options: inputOps
                                            },
                                            { name : Util.fieldLabel("required_flag"), field : "required_flag",
                                                width : Util.fieldSize("required_flag"),
                                                editable: true,type: dojox.grid.cells.Bool, styles: 'text-align: center;'
                                            } ,
                                            { name : Util.fieldLabel("valuelist_name"), field : "valuelist_name",
                                                width : Util.fieldSize("valuelist_name"),editable: true
                                            },
                                            { name : Util.fieldLabel("default_value"), field : "default_value",
                                                width : Util.fieldSize("default_value"),editable: true
                                            }
                                        ];
                                        var gridRight = o.rightGrid = new DataGrid({
                                            store: rstore,
                                            structure : rcolumn,
                                            //直接显示含HTML标签字段
                                            escapeHTMLInData: false,
                                            singleClickEdit : true,
//                                            onRowDblClick : function(e){
//                                                o._moveLeft(rstore,lstore,this.getItem(e.rowIndex));
//                                            },
                                            onApplyCellEdit : function(inValue, inRowIndex, inFieldIndex){
                                                var rgrid = this;
                                                //验证数据的合法性，比如，值集输入
                                                if(inFieldIndex == "valuelist_name" && inValue != ""){
                                                    Util.get(Util.url.valuelist("find_by_name",{valuelist_name : inValue}),function(data){
                                                        if(!data){
                                                            Util.confirm(Util.message.error_valuelist_name,function(){
//                                                rgrid.doCancelEdit(inRowIndex);
                                                            });
                                                        }
                                                    });
                                                }
//                                console.info(inValue + "|"+inRowIndex+"|"+inFieldIndex)
                                            }
                                        });
                                        dojo.byId("paramSetup").appendChild(gridRight.domNode);
                                        gridRight.startup();

                                        var btToleft = new Button({
                                            label : "<<",
                                            onClick : function(){
                                                var items = gridRight.selection.getSelected();
                                                if(items.length > 0){
                                                    items.forEach(function(item){
                                                        o._moveLeft(rstore,lstore,item);
                                                    });
                                                }
                                            }
                                        });
                                        dojo.byId("btToLeft").appendChild(btToleft.domNode);
                                        btToleft.startup();
                                    }

                                    //按钮
                                    var btToright = new Button({
                                        label : ">>",
                                        onClick : function(){
                                            var items = gridLeft.selection.getSelected();
                                            if(items.length > 0){
                                                items.forEach(function(item){
                                                    o._moveRight(lstore,rstore,item);
                                                });
                                            }
                                        },
                                        canSort : function(){
                                            return false;
                                        }
                                    });
                                    dojo.byId("btToright").appendChild(btToright.domNode);
                                    btToright.startup();
                                });

                            });

                        });
                    }else{
                        //FUNCTION类型数据源
                        //参数自定义
                    }
                });

            },
            //返回选择菜单描述
            _actionOptions : function(){
                var rto = [];
                var options = u.actionOptions();
                options.forEach(function(op){
                    rto.push(op.label);
                });
                return rto;
            },
            _moveRight : function(lstore,rstore,item){
                var newItem = new Object ;
                newItem.field = item.field;
                newItem.action_desc = u.descAction("IN");
                newItem.valuelist_name = "";
                newItem.default_value = "";
                newItem.required_flag = false;
                newItem.input_type_desc = "文本框";
                rstore.newItem(newItem);
                lstore.deleteItem(item);
            },
            _moveLeft : function(rstore,lstore,item){
                var newItem = new Object ;
                newItem.field = item.field;
                lstore.newItem(newItem);
                rstore.deleteItem(item);
            },
            //排除现有的参数
            _leftFields : function(litems,ritems){
                if(ritems.length > 0){
                    ritems.forEach(function(item){
                        if(litems.length > 0){
                            litems.forEach(function(item2,indx){
                                if(item.field.toString() == item2.field.toString()){
                                    litems.splice(indx,1);
                                }
                            });
                        }
                        item.required_flag = Util.xflag(item.required_flag);
                    });
                }
            }

        });
    });