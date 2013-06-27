define(["dojo/_base/declare","baf/base/Util","baf/base/Env","dojo/request",
    "baf/dijit/grid/DataGrid","dojo/data/ItemFileWriteStore","dojo/json",
    "dojo/dom-form","dijit/layout/ContentPane","dijit/form/Button","baf/reporter/viewer/setup/_util"],
    function(declare,Util,Env,request,DataGrid,ItemFileWriteStore,JSON,domForm,ContentPane,Button,u){
        return declare("",[ContentPane],{
            srcObj : null,

            constructor : function(args){
                args.title = "列显示";
                args.href = Util.url.localUrl("reporter/viewer/setup/_structure.html");
                this.inherited(arguments);
            },

            onDownloadEnd  : function(){
                var o = Env.reportGrid();
                var srcObj = this.srcObj;

                request.get(o.dataUrl,{handleAs : "json"}).then(function(data){
                    var currentStructure = o.grid.getColumns();

                    //定义左侧grid
                    var ldata = u._dataFromStructure(currentStructure);
                    var lstore = new ItemFileWriteStore({
                        data : ldata
                    });

                    var lcolumn = [
                        { name :"现有列", field : "name",width : 13}
                    ];
                    var gridLeft = new DataGrid({
                        store: lstore,
                        structure : lcolumn,
                        //直接显示含HTML标签字段
                        escapeHTMLInData: false,
                        onRowDblClick : function(e){
                            u._move(lstore,rstore, gridLeft.getItem(e.rowIndex));
                        },
                        canSort : function(){
                            return false;
                        }
                    });
                    dojo.byId("s_gridLeft").appendChild(gridLeft.domNode);
                    gridLeft.startup();

                    //定义右侧grid
                    var rcolumn = [{ name :"可添加列", field : "name",width : 13}];
                    var rdata = u._dataFromStructure(u._leftData(u._constructColumn(data),currentStructure));

                    var rstore = new ItemFileWriteStore({
                        data : rdata
                    });
                    var gridRight = new DataGrid({
                        store: rstore,
                        structure : rcolumn,
                        //直接显示含HTML标签字段
                        escapeHTMLInData: false,
                        onRowDblClick : function(e){
                            u._move(rstore,lstore, gridRight.getItem(e.rowIndex));
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
                                    u._move(rstore,lstore,item);
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
                                    u._move(lstore,rstore,item);
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
                        label : "确认",
                        onClick : function(){
                            srcObj.hide();
                            o.grid.setStructure(u._dataToStructure(gridLeft.store._arrayOfAllItems));
                        }
                    });
                    dojo.byId("s_submitButton").appendChild(submitButton.domNode);
                    submitButton.startup();

                });
            }

        });
});