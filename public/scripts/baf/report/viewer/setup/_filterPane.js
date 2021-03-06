define(["dojo/_base/declare","base/Util","base/Env","grid/DataGrid","dojo/data/ItemFileWriteStore",
    "dijit/layout/ContentPane","dijit/form/Button","./_util","../filter/_parameter","dojox/grid/cells/dijit"],
    function(declare,Util,Env,DataGrid,ItemFileWriteStore,ContentPane,Button,u,parameter){
        return declare("",[ContentPane],{
            srcObj : null,

            constructor : function(args){
                args.title = Util.label.grid_filter;
                args.href = Util.url.report_viewer_setup_template("filter");
                this.inherited(arguments);
            },

            onDownloadEnd  : function(){
                var o = Env.reportGrid();
                var srcObj = this.srcObj;

                //获取当前的过滤明细
                //定义左侧grid
                var ldata = u.dataFromStructure(o.filter.parameters,true);
                var lstore = new ItemFileWriteStore({
                    data : ldata
                });

                var ops = this._actionOptions();
                var lcolumn = [
                    { name : Util.label.grid_setup_currentParameter, field : "field",width : 12},
                    { name : Util.label.grid_setup_formula, field : "actionName",width : 8,
                        editable: true, cellType: dojox.grid.cells.Select, options: ops
                    }
                ];
                var gridLeft = new DataGrid({
                    store: lstore,
                    structure : lcolumn,
                    //直接显示含HTML标签字段
                    escapeHTMLInData: false,
                    singleClickEdit : true,
                    onRowDblClick : function(e){
                        this.store.deleteItem(this.getItem(e.rowIndex));
//                        u.move(lstore,rstore, gridLeft.getItem(e.rowIndex),false,true);
                    },
                    canSort : function(){
                        return false;
                    }
                });
                dojo.byId("f_gridLeft").appendChild(gridLeft.domNode);
                gridLeft.startup();

                //定义右侧grid
                var rcolumn = [{ name :Util.label.grid_setup_canplus, field : "field",width : 12}];
                var rdata = u.dataFromStructure(this._parameterList(),true);

                var rstore = new ItemFileWriteStore({
                    data : rdata
                });
                var gridRight = new DataGrid({
                    store: rstore,
                    structure : rcolumn,
                    //直接显示含HTML标签字段
                    escapeHTMLInData: false,
                    onRowDblClick : function(e){
                        u.move(rstore,lstore, gridRight.getItem(e.rowIndex),false,true);
                    }
                });
                dojo.byId("f_gridRight").appendChild(gridRight.domNode);
                gridRight.startup();

                //按钮
                var btToleft = new Button({
                    label : "<<",
                    onClick : function(){
                        var items = gridRight.selection.getSelected();
                        if(items.length > 0){
                            items.forEach(function(item){
                                u.move(rstore,lstore,item,false,true);
                            });
                        }
                    }
                });
                dojo.byId("f_btToLeft").appendChild(btToleft.domNode);
                btToleft.startup();

                //按钮
                var btToright = new Button({
                    label : ">>",
                    onClick : function(){
                        var items = gridLeft.selection.getSelected();
                        if(items.length > 0){
                            items.forEach(function(item){
                                lstore.deleteItem(item);
//                                u.move(lstore,rstore,item,false,true);
                            });
                        }
                    },
                    canSort : function(){
                        return false;
                    }
                });
                dojo.byId("f_btToright").appendChild(btToright.domNode);
                btToright.startup();

                var submitButton = new Button({
                    label : Util.label.button_confirm,
                    onClick : function(){
                        srcObj.hide();
                        var filter = o.filter;
                        var litems = gridLeft.getALLItems();
                        if(litems.length > 0){
                            filter.clearParameters();
                            litems.forEach(function(e){
                                if(e){
                                    filter.createParameter(e.field.toString(), e.actionName.toString(), e.value.toString(),true);
                                }
                            });
                            filter.show();
                        }else{
                            filter.clear();
                        }
                    }
                });
                dojo.byId("f_submitButton").appendChild(submitButton.domNode);
                submitButton.startup();

            },
            _parameterList : function(){
                var o = Env.reportGrid();
                var items = o.grid.getALLItems();
                var column = [];
                if(items.length > 0){
                    var line = items[0];
                    var i = 0;
                    for(var key in line){
                        //过滤dojo内部参数
                        if(key.indexOf("_") != 0){
                            var p = new parameter();
                            p.field = key;
                            column.push(p);
                        }
                    }
                }
                return column;
            },
            //返回选择菜单描述
            _actionOptions : function(){
                var rto = [];
                var options = u.actionOptions();
                options.forEach(function(op){
                    rto.push(op.label.toString());
                });
                return rto;
            }

        });
});