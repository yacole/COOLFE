define(["dojo/_base/declare","baf/dijit/Dialog","baf/base/Util","baf/base/Env","dojo/request",
    "baf/dijit/grid/DataGrid","dojo/data/ItemFileWriteStore","dojo/json",
    "dojo/dom-form","baf/command/Command","dijit/layout/TabContainer","dijit/layout/ContentPane",
    "dijit/form/Button"],
    function(declare,Dialog,Util,Env,request,DataGrid,ItemFileWriteStore,JSON,domForm,
             Command,TabContainer,ContentPane,Button){
        return declare ("",[Dialog],{
            paneContainer : null,
            //设置列
            structurePane : null,
            //设置排序
            orderPane : null,
            //设置过滤器
            filterPane : null,

            //展示布局选择和保持界面
            show : function(){

                this.paneContainer = new TabContainer({
                    //此处一定要定义长宽，不然tabcontainer在dialog里面显示会有问题
                    style : "width:38em;height:29em"
                });
                this.addChild(this.paneContainer);

                this._buildStructurePane();

                this.inherited(arguments);
            },
            _buildStructurePane : function(){
                var o = Env.reportGrid();
                var d = this;
                this.structurePane = new ContentPane({
                    title : "列显示",
                    href : Util.url.localUrl("reporter/viewer/setup/_structure.html"),
                    onDownloadEnd : function(){
                        request.get(o.dataUrl,{handleAs : "json"}).then(function(data){
                            var currentStructure = o.grid.getColumns();

                            //定义左侧grid
                            var ldata = d._dataFromStructure(currentStructure);
                            var lstore = new ItemFileWriteStore({
                                data : ldata
                            });
                            var lcolumn = [{ name :"现有列", field : "name",width : 13}];
                            var gridLeft = new DataGrid({
                                store: lstore,
                                structure : lcolumn,
                                //直接显示含HTML标签字段
                                escapeHTMLInData: false
                            });
                            dojo.byId("gridLeft").appendChild(gridLeft.domNode);
                            gridLeft.startup();

                            //定义右侧grid
                            var rcolumn = [{ name :"可添加列", field : "name",width : 13}];
                            var rdata = d._dataFromStructure(d._leftData(o._constructColumn(data),currentStructure));

                            var rstore = new ItemFileWriteStore({
                                data : rdata
                            });
                            var gridRight = new DataGrid({
                                store: rstore,
                                structure : rcolumn,
                                //直接显示含HTML标签字段
                                escapeHTMLInData: false,
                                onRowDblClick : function(e){
                                    d._move(rstore,lstore, gridRight.getItem(e.rowIndex));
                                }
                            });
                            dojo.byId("gridRight").appendChild(gridRight.domNode);
                            gridRight.startup();

                            //按钮
                            var btToleft = new Button({
                                label : "<<",
                                onClick : function(){
                                    var items = gridRight.selection.getSelected();
                                    if(items.length > 0){
                                        items.forEach(function(item){
                                            d._move(rstore,lstore,item);
                                        });
                                    }
                                }
                            });
                            dojo.byId("btToLeft").appendChild(btToleft.domNode);
                            btToleft.startup();

                            //按钮
                            var btToright = new Button({
                                label : ">>"
                            });
                            dojo.byId("btToright").appendChild(btToright.domNode);
                            btToright.startup();

                            var submitButton = new Button({
                                label : "确认",
                                onClick : function(){
                                    d.hide();
                                    o.grid.setStructure(d._dataToStructure(gridLeft.store._arrayOfAllItems));
                                }
                            });
                            dojo.byId("submitButton").appendChild(submitButton.domNode);
                            submitButton.startup();

                        });
                    }
                });
                this.paneContainer.addChild(this.structurePane);
            },
            selectTab : function(type){

            },
            //通过列结构获取列信息
            _dataFromStructure : function(structure){
                var data = {items:[]};
                if(structure && structure.length > 0){
                    structure.forEach(function(e){
                        data.items.push(e);
                    });
                }
                return data;
            },
            //通过数据生成结构
            _dataToStructure : function(data){
                var s = [];
                if(data.length > 0){
                    data.forEach(function(e){
                        s.push({name :e.name.toString(),field :e.field.toString(),width :e.width.toString()});
                    });
                }
                return s;
            },
            //剩余数组数据
            _leftData : function(allData,nowData){
                var data = [];
                var q = false;
                if(nowData.length > 0){
                    //进过一轮相减
                    for(var i=0;i < allData.length ;i++){
                        q = false;
                        for(var y=0;y < nowData.length ;y++){
                            if(nowData[y].field == allData[i].field){
                                q = true;
                            }
                        }
                        if(!q){
                            data.push(allData[i]);
                        }
                    }

                }
                return  data;
            },
            _move : function(sourceStore,directStore,item){
                //Uncaught Error: encountered bug in ItemFileWriteStore.newItem
                //不能直接引用，需重新创建
                var newItem = new Object ;
                newItem.name = item.name;
                newItem.field = item.field;
                newItem.width = item.width;
                directStore.newItem(newItem);
                sourceStore.deleteItem(item);
            }
        });
    });