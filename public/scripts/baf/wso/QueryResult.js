define(["dojo/_base/declare", "baf/dijit/Dialog", "baf/base/Util", "baf/dijit/grid/DataGrid",
    "dojo/data/ItemFileReadStore", "dojo/dom-construct","dojox/grid/enhanced/plugins/IndirectSelection",
    "baf/dijit/form/Button"],
    function(declare,Dialog,Util,DataGrid,ItemFileReadStore,construct,IndirectSelection,Button){
    /*
     *   摘要:
     *       查询结果展示
     */
    return declare("",[Dialog],{
        //查询结果表格grid
        resultGrid : null,
        //表格字段
        column : null,
        //数据
        data : null,
        //获取数据的url
        url : null,
        //选择数据返回的对象
        sourceObj : null,

        constructor : function(args){
            if(args.title == undefined){
                this.title = Util.label.dialog_rform_title;
            }
        },
        postCreate : function(){

            var d = this;
            //默认结构
            if(!this.column){
                this.column = [
                    { name : Util.label.column_value, field : "value",width : 12},
                    { name : Util.label.column_label, field : "label",width : 22}
                ];
            }
            //设置存储
            var store = null;
            if(this.url){
                store = new ItemFileReadStore({
                    url : this.url
                });
            }else{
                store = new ItemFileReadStore({
                    data : this.data
                });
            }

            //gird属性配置
            var gridConfig = new Object();
            gridConfig.store = store;
            gridConfig.structure = this.column;
            gridConfig.id = Util.xId(Util.id.qrGrid);
            gridConfig.height = "20em";
            gridConfig.autoWidth = true;
            //判断是否为多选
            if(this.sourceObj.mulitSelect){
                gridConfig.plugins = {indirectSelection:  {headerSelector:true}};
                this.resultGrid = new DataGrid(gridConfig,construct.create('div'));
            }else{
                gridConfig.selectionMode = "single";
                this.resultGrid = new DataGrid(gridConfig,construct.create('div'));
                //双击事件
                dojo.connect(this.resultGrid,"onRowDblClick",function(){
                    if(d.sourceObj){
                        //获取双击目标
                        var items = this.selection.getSelected();
                        if(items.length > 0) {
                            var selectedItem = items[0];
                            if(selectedItem){
                                d.sourceObj.set("value",selectedItem.value.toString());
                                if(selectedItem.label){
                                    //充说明栏，如果存在
                                    var qrs = dojo.query("span[for="+d.sourceObj.name+"]", d.sourceObj.getParent().domNode);
                                    if(qrs.length > 0){
                                        qrs[0].innerHTML = selectedItem.label.toString();
                                    }
                                }
                            } /* end if */

                        } /* end if */
                    }
                    //销毁
                    d.destroyRecursive();
                });
            }
//            this.resultGrid.set("class",Util.id.qrGrid_class);
            this.addChild(this.resultGrid);

            var bt = new Button({
                label : "确认",
                name : "rsConfirm",
                onClick : function(){
                    var selectItems = d.resultGrid.selection.getSelected();
                    if(selectItems.length > 0){
                        //输出字符串数组
                        var values = [];
                        var labels = [];
                        selectItems.forEach(function(selectedItem){
                            if(selectedItem){
                                values.push(selectedItem.value.toString());
                                if(selectedItem.label){
                                    labels.push(selectedItem.label.toString());
                                }
                            }
                        });
                        d.sourceObj.set("value",values.join(","));
                        if(labels.length > 0){
                            //填充说明栏，如果存在
                            var qrs = dojo.query("span[for="+d.sourceObj.name+"]", d.sourceObj.getParent().domNode);
                            if(qrs.length > 0){
                                qrs[0].innerHTML = labels.join(",").substring(0,Util.config.rs_label_max_length);
                            }
                        }
                        //隐藏
                        d.hide();
                    }
                }
            });
            this.addChild(bt);
            this.inherited(arguments);
        }
    });
});