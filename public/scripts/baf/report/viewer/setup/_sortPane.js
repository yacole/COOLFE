define(["dojo/_base/declare","base/Util","base/Env","dojo/request","grid/DataGrid",
    "dojo/data/ItemFileWriteStore","dojo/json","dojo/dom-form","dijit/layout/ContentPane",
    "dijit/form/Button","./_util","dojox/grid/cells/dijit"],
    function(declare,Util,Env,request,DataGrid,ItemFileWriteStore,JSON,domForm,ContentPane,Button,u){
        return declare("",[ContentPane],{
            srcObj : null,

            constructor : function(args){
                args.title = Util.label.grid_setup_sort;
                args.href = Util.url.report_setup_template("sort");
                this.inherited(arguments);
            },

            onDownloadEnd  : function(){
                var o = Env.reportGrid();
                var srcObj = this.srcObj;

                var currentStructure = o.grid.getColumns(true);
                //定义左侧grid
                var ldata = u.dataFromStructure(currentStructure);
                var lstore = new ItemFileWriteStore({
                    data : ldata
                });
                var lcolumn = [
                    { name : Util.label.grid_setup_sortColumn, field : "name",width : 12},
                    { name : Util.label.grid_sortDesc, field : "descending",width : 2.5,editable: true,
                        type: dojox.grid.cells.Bool, styles: 'text-align: center;' }
                ];
                var gridLeft = new DataGrid({
                    store: lstore,
                    structure : lcolumn,
                    //直接显示含HTML标签字段
                    escapeHTMLInData: false,
                    onRowDblClick : function(e){
                        u.move(lstore,rstore, gridLeft.getItem(e.rowIndex),true);
                    },
                    canSort : function(){
                        return false;
                    }
                });
                dojo.byId("st_gridLeft").appendChild(gridLeft.domNode);
                gridLeft.startup();

                //定义右侧grid
                var rcolumn = [{ name : Util.label.grid_setup_canplus, field : "name",width : 12}];
                var rdata = u.dataFromStructure(u.leftData(u.constructColumn(o.grid.getALLItems(),true),currentStructure));

                var rstore = new ItemFileWriteStore({
                    data : rdata
                });
                var gridRight = new DataGrid({
                    store: rstore,
                    structure : rcolumn,
                    //直接显示含HTML标签字段
                    escapeHTMLInData: false,
                    onRowDblClick : function(e){
                        u.move(rstore,lstore, gridRight.getItem(e.rowIndex),true);
                    },
                    canSort : function(){
                        return false;
                    }
                });
                dojo.byId("st_gridRight").appendChild(gridRight.domNode);
                gridRight.startup();

                //按钮
                var btToleft = new Button({
                    label : "<<",
                    onClick : function(){
                        var items = gridRight.selection.getSelected();
                        if(items.length > 0){
                            items.forEach(function(item){
                                u.move(rstore,lstore,item,true);
                            });
                        }
                    }
                });
                dojo.byId("st_btToLeft").appendChild(btToleft.domNode);
                btToleft.startup();

                //按钮
                var btToright = new Button({
                    label : ">>",
                    onClick : function(){
                        var items = gridLeft.selection.getSelected();
                        if(items.length > 0){
                            items.forEach(function(item){
                                u.move(lstore,rstore,item,true);
                            });
                        }
                    }
                });
                dojo.byId("st_btToright").appendChild(btToright.domNode);
                btToright.startup();

                var submitButton = new Button({
                    label : Util.label.button_confirm,
                    onClick : function(){
                        srcObj.hide();
//                        console.info(u._dataToSortInfo(gridLeft.getALLItems()))
                        //设置排序信息
                        o.grid.setSortIndex(u.dataToSortInfo(gridLeft.getALLItems()));
                        o.grid.refresh();
                    }
                });
                dojo.byId("st_submitButton").appendChild(submitButton.domNode);
                submitButton.startup();
            }
        });
    });