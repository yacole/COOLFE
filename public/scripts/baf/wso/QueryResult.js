define(["dojo/_base/declare", "baf/dijit/Dialog", "baf/base/Util", "baf/dijit/grid/DataGrid",
    "dojo/data/ItemFileReadStore", "dojo/dom-construct","dojox/grid/enhanced/plugins/IndirectSelection"],
    function(declare,Dialog,Util,DataGrid,ItemFileReadStore,construct,IndirectSelection){
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
                        //获取填写对象
                        var obj = d.sourceObj;
                        //获取双击目标
                        var items = this.selection.getSelected();
                        if(items.length) {
                            var selectedItem = items[0];
                            if(selectedItem !== null){
                                obj.set("value",selectedItem.value);
                                obj.set("key",selectedItem.key);
                                //填充说明栏，如果存在
                                var qrs = dojo.query("span[for="+obj.name+"]", obj.getParent().domNode);
                                if(qrs.length > 0){
                                    qrs[0].innerHTML = selectedItem.label;
                                }
                            } /* end if */

                        } /* end if */
                    }
                    //销毁
                    d.destroyRecursive();
                });
            }
//            this.resultGrid.set("class",Util.id.qrGrid_class);
            this.addChild(d.resultGrid);

            this.inherited(arguments);
        }
    });
});