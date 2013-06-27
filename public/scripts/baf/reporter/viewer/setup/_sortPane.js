define(["dojo/_base/declare","baf/base/Util","baf/base/Env","dojo/request",
    "baf/dijit/grid/DataGrid","dojo/data/ItemFileWriteStore","dojo/json",
    "dojo/dom-form","dijit/layout/ContentPane","dijit/form/Button","baf/reporter/viewer/setup/_util",
    "dojox/grid/cells/dijit"],
    function(declare,Util,Env,request,DataGrid,ItemFileWriteStore,JSON,domForm,ContentPane,Button,u){
        return declare("",[ContentPane],{
            srcObj : null,

            constructor : function(args){
                args.title = "排序设置";
                args.href = Util.url.localUrl("reporter/viewer/setup/_sort.html");
                this.inherited(arguments);
            },

            onDownloadEnd  : function(){
                var o = Env.reportGrid();
                var srcObj = this.srcObj;

                request.get(o.dataUrl,{handleAs : "json"}).then(function(data){
                    var currentStructure = o.grid.getColumns(true);
                    //定义左侧grid
                    var ldata = u._dataFromStructure(currentStructure);
                    var lstore = new ItemFileWriteStore({
                        data : ldata
                    });
                    var lcolumn = [
                        { name :"排序列", field : "name",width : 12},
                        { name :"降序", field : "descending",width : 2.5,editable: true,
                            type: dojox.grid.cells.Bool, styles: 'text-align: center;' }
                    ];
                    var gridLeft = new DataGrid({
                        store: lstore,
                        structure : lcolumn,
                        //直接显示含HTML标签字段
                        escapeHTMLInData: false,
                        onRowDblClick : function(e){
                            u._move(lstore,rstore, gridLeft.getItem(e.rowIndex),true);
                        },
                        canSort : function(){
                            return false;
                        }
                    });
                    dojo.byId("st_gridLeft").appendChild(gridLeft.domNode);
                    gridLeft.startup();

                    //定义右侧grid
                    var rcolumn = [{ name :"可添加列", field : "name",width : 12}];
                    var rdata = u._dataFromStructure(u._leftData(u._constructColumn(data,true),currentStructure));

                    var rstore = new ItemFileWriteStore({
                        data : rdata
                    });
                    var gridRight = new DataGrid({
                        store: rstore,
                        structure : rcolumn,
                        //直接显示含HTML标签字段
                        escapeHTMLInData: false,
                        onRowDblClick : function(e){
                            u._move(rstore,lstore, gridRight.getItem(e.rowIndex),true);
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
                                    u._move(rstore,lstore,item,true);
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
                                    u._move(lstore,rstore,item,true);
                                });
                            }
                        }
                    });
                    dojo.byId("st_btToright").appendChild(btToright.domNode);
                    btToright.startup();

                    var submitButton = new Button({
                        label : "确认",
                        onClick : function(){
                            srcObj.hide();
                            console.info(u._dataToSortInfo(gridLeft.store._arrayOfAllItems))
                            //设置排序信息
                            o.grid.setSortIndex(u._dataToSortInfo(gridLeft.store._arrayOfAllItems));
                        }
                    });
                    dojo.byId("st_submitButton").appendChild(submitButton.domNode);
                    submitButton.startup();

            });
            }
        });
    });