define(["dojo/_base/declare","base/Util","base/Env","dojo/request","grid/DataGrid",
    "dojo/data/ItemFileWriteStore","dojo/json","dojo/dom-form","dijit/layout/ContentPane",
    "dijit/form/Button","./_util"],
    function(declare,Util,Env,request,DataGrid,ItemFileWriteStore,JSON,domForm,ContentPane,Button,u){
        return declare("",[ContentPane],{
            srcObj : null,

            constructor : function(args){
                args.title = Util.label.grid_setup_column;
                args.href = Util.url.report_setup_template("structure");
                this.inherited(arguments);
            },

            onDownloadEnd  : function(){
                var o = Env.reportGrid();
                var srcObj = this.srcObj;

                var currentStructure = o.grid.getColumns();

                //定义左侧grid
                var ldata = u.dataFromStructure(currentStructure);
                var lstore = new ItemFileWriteStore({
                    data : ldata
                });

                var lcolumn = [
                    { name : Util.label.grid_setup_currentColumn, field : "name",width : 13}
                ];
                var gridLeft = new DataGrid({
                    store: lstore,
                    structure : lcolumn,
                    //直接显示含HTML标签字段
                    escapeHTMLInData: false,
                    onRowDblClick : function(e){
                        u.move(lstore,rstore, gridLeft.getItem(e.rowIndex));
                    },
                    canSort : function(){
                        return false;
                    }
                });
                dojo.byId("s_gridLeft").appendChild(gridLeft.domNode);
                gridLeft.startup();

                //定义右侧grid
                var rcolumn = [{ name : Util.label.grid_setup_canplus, field : "name",width : 13}];
                var rdata = u.dataFromStructure(u.leftData(u.constructColumn(o.grid.getALLItems()),currentStructure));

                var rstore = new ItemFileWriteStore({
                    data : rdata
                });
                var gridRight = new DataGrid({
                    store: rstore,
                    structure : rcolumn,
                    //直接显示含HTML标签字段
                    escapeHTMLInData: false,
                    onRowDblClick : function(e){
                        u.move(rstore,lstore, gridRight.getItem(e.rowIndex));
                    }
                });
                dojo.byId("s_gridRight").appendChild(gridRight.domNode);
                gridRight.startup();

                //按钮
                var btToleft = new Button({
                    label : "<<",
                    onClick : function(){
                        var items = gridRight.selection.getSelected();
                        if(items.length > 0){
                            items.forEach(function(item){
                                u.move(rstore,lstore,item);
                            });
                        }
                    }
                });
                dojo.byId("s_btToLeft").appendChild(btToleft.domNode);
                btToleft.startup();

                //按钮
                var btToright = new Button({
                    label : ">>",
                    onClick : function(){
                        var items = gridLeft.selection.getSelected();
                        if(items.length > 0){
                            items.forEach(function(item){
                                u.move(lstore,rstore,item);
                            });
                        }
                    },
                    canSort : function(){
                        return false;
                    }
                });
                dojo.byId("s_btToright").appendChild(btToright.domNode);
                btToright.startup();

                var submitButton = new Button({
                    label : Util.label.button_confirm,
                    onClick : function(){
                        srcObj.hide();
                        o.grid.setStructure(u.dataToStructure(gridLeft.getALLItems()));
                    }
                });
                dojo.byId("s_submitButton").appendChild(submitButton.domNode);
                submitButton.startup();
            }

        });
});