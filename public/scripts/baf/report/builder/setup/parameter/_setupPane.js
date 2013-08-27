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
                                var  rstore = new ItemFileWriteStore({
                                    data : params
                                });

                                var lcolumn = [{ name : "字段", field : "field",width : 12}];
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
                                var rcolumn = [
                                    { name : "字段", field : "field",width : 12},
                                    { name : Util.label.grid_setup_formula, field : "action",width : 6,
                                        editable: true, cellType: dojox.grid.cells.Select, options: ops
                                    },
                                    { name : "值集", field : "valuelist_name",width : 12,
                                        editable: true
                                    },
                                    { name : "默认值", field : "default_value",width : 12,
                                        editable: true
                                    },
                                    { name : "必输", field : "required_flag",width : 2.5,
                                        editable: true,type: dojox.grid.cells.Bool, styles: 'text-align: center;'
                                    }
                                ];
                                var gridRight = o.rightGrid = new DataGrid({
                                    store: rstore,
                                    structure : rcolumn,
                                    //直接显示含HTML标签字段
                                    escapeHTMLInData: false,
                                    singleClickEdit : true,
                                    onRowDblClick : function(e){
                                        o._moveLeft(rstore,lstore,this.getItem(e.rowIndex));
                                    },
                                    onApplyCellEdit : function(inValue, inRowIndex, inFieldIndex){
                                        var rgrid = this;
                                        //验证数据的合法性，比如，值集输入
                                        if(inFieldIndex == "valuelist_name" && inValue != ""){
                                            Util.get(Util.url.valuelist("find_by_name",{valuelist_name : inValue}),function(data){
                                                if(!data){
                                                    Util.confirm("输入的值集无效",function(){
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
                    rto.push(op.action.name.toString());
                });
                return rto;
            },
            _moveRight : function(lstore,rstore,item){
                var newItem = new Object ;
                newItem.field = item.field;
                newItem.action = "IN";
                newItem.valuelist_name = "";
                newItem.default_value = "";
                newItem.required_flag = false;
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