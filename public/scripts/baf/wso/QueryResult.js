/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-5-9
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dijit/Dialog",
    "baf/base/Util",
    "dojox/grid/DataGrid",
    "dojo/data/ItemFileReadStore",
    'dojo/dom-construct'],
    function(declare,Dialog,Util,DataGrid,ItemFileReadStore,construct){
    return declare("",[Dialog],{
        resultGrid : null,
        column : null,
        url : null,
        //选择数据返回前一个界面
        sourceObj : null,

        //不能互为QFORM 暂标注
        constructor : function(args){
            if(args.title == undefined){
                this.title = Util.label.dialog_rform_title;
            }
        },
        postCreate : function(){

            var d = this;
            d.column = [
                { name : Util.label.column_value, field : "value",width : 10},
                { name : Util.label.column_label, field : "label",width : 20}
            ];
            var store = new ItemFileReadStore({
                url : d.url
            });

            //计算grid的高
            var gridHeight;

            d.resultGrid = new DataGrid({
                store: store,
                structure : d.column,
                //直接显示含HTML标签字段
                escapeHTMLInData: false,
                //也可自定义设置高度，如果不设置高度将无法正常显示
                autoHeight : true,
//                height : "20em",
//                autoWidth : true,
                rowsPerPage : 4 ,
                id : Util.xId(Util.id.qrGrid),
                rowSelector: '1em',
                style : "width : 40em",
                onRowDblClick : function(){
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
                }
            },construct.create('div'));
//            d.resultGrid.startup();
            d.resultGrid.set("class",Util.id.qrGrid_class);
            d.set("content",d.resultGrid.domNode);

            this.inherited('postCreate', arguments);
        },
        show : function(){
            this.inherited( arguments);
        }
    });
});