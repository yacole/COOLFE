define(["baf/dijit/Dialog","baf/base/Util","baf/base/Env","dojo/request",
        "baf/dijit/grid/DataGrid","dojo/data/ItemFileReadStore"],
    function(Dialog,Util,Env,request,DataGrid,ItemFileReadStore){
    return {
        //展示布局选择和保持界面
        show : function(isNew){
            var o = Env.reportGrid();
            var selectDialog = new Dialog({
                href : Util.url.saveLayoutTooltipDialog(),
                onDownloadEnd : function(){
                    //填充label
                    Util.queryTofillLabel(this.domNode);

                    var selectDialog = this;

                    request.get(Util.url.find_layouts_for_rpt({program_id : o.program_id}),{handleAs : "json"}).then(function(data){

                        if(Util.hasChildren(data)){
                            //插入选择列表
                            var store = new ItemFileReadStore({
                                data : data
                            });
                            var column = [
                                {name :Util.fieldLabel("layout_name"), field : "layout_name",width : Util.fieldSize("layout_name")},
                                {name :Util.fieldLabel("description"), field : "description",width : Util.fieldSize("description")},
                                {name :Util.fieldLabel("default_flag"), field : "default_flag",width : Util.fieldSize("default_flag")}
                            ];
                            var grid = new DataGrid({
                                store: store,
                                structure :column,
                                escapeHTMLInData: false,
                                autoHeight : true,
                                autoWidth : true,
                                onRowDblClick : function(){
                                    var items = this.selection.getSelected();
                                    if(items.length) {
                                        var selectedItem = items[0];

                                        if(selectedItem !== null){
                                            if(isNew){
                                                Util.dijit_byId("layout_name").set("value",selectedItem.layout_name);
                                                Util.dijit_byId("description").set("value",selectedItem.description);
                                            }else{
                                                o.selectLayout(selectedItem.layout_id);
                                                selectDialog.hide();
                                            }
                                        }

                                    }
                                }
                            },"layoutList");

                            grid.startup();

                            //下拉菜单动作
                            var typeSelect = Util.dijit_byId("layout_type");
                            typeSelect.options.unshift({value :"ALL",label : Util.label.ALL,selected :true});
                            typeSelect.attr("value","ALL");
                            dojo.connect(typeSelect,"onChange",function(){
                                if(this.value == "ALL"){
                                    grid.setQuery({layout_type : "*"});
                                }else{
                                    grid.setQuery({layout_type : this.value});
                                }
                            });

                            //新建保持时
                            if(isNew){
                                //设置标题
                                selectDialog.set("title",Util.label.grid_layout_save);
                                //展示输入框
                                dojo.query("div #isNew",selectDialog.domNode).style("display","block");
                                //去除类型选择
                                typeSelect.options.splice(0,1);
                                typeSelect.attr("value","01");

                                //设置默认值
                                if(o.layout){
                                    store.fetch({
                                        query : {layout_id : o.layout},
                                        onComplete : function(items){
                                            if(items.length > 0){
                                                var item = items[0];
                                                Util.dijit_byId("layout_name").set("value",item.layout_name);
                                                Util.dijit_byId("description").set("value",item.description);
                                                grid.selection.setSelected(grid.getItemIndex(item), true)
                                            }
                                        }
                                    });//fetch
                                }//if

                            }else{
                                selectDialog.set("title",Util.label.grid_layout_select);
                            }
                        }
                    });
                }
            });
//                selectDialog.setPosition(o.domNode);
            selectDialog.show();
        },
        manager : function(){

        }
    }
});