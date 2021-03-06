define(["baf/dijit/Dialog","base/Util","base/Env","grid/DataGrid",
    "dojo/data/ItemFileReadStore","dojo/json","dojo/dom-form"],
    function(Dialog,Util,Env,DataGrid,ItemFileReadStore,JSON,domForm){
    return {
        //展示布局选择和保持界面
        show : function(type){
            var layoutDialog = this;
            var o = Env.reportGrid();
            var selectDialog = new Dialog({
//                href : Util.url.saveLayoutTooltipDialog(),
                href : Util.url.report_layout_template(),
                onDownloadEnd : function(){
                    //填充label
                    dojo.query("label[for=layout_type]",this.domNode)[0].innerHTML = Util.label.grid_layout_type;
                    dojo.query("label[for=layout_name]",this.domNode)[0].innerHTML = Util.label.grid_layout;
                    dojo.query("label[for=description]",this.domNode)[0].innerHTML = Util.label.grid_layout_description;
                    dojo.query("label[for=default_flag]",this.domNode)[0].innerHTML = Util.label.grid_layout_default_flag;
                    dojo.query("label[for=saveButton]",this.domNode)[0].innerHTML = Util.label.button_confirm;
                    dojo.query("label[for=deleteButton]",this.domNode)[0].innerHTML = Util.label.button_delete;
                    dojo.query("label[for=defaultButton]",this.domNode)[0].innerHTML = Util.label.button_default;

                    var selectDialog = this;

                     Util.get(Util.url.rpt_layouts(o.program_id),function(data){

                        //插入选择列表
                        var store = new ItemFileReadStore({
                            data : data
                        });
                        var column = [
                            {name : Util.label.grid_layout, field : "layout_name"},
                            {name : Util.label.grid_layout_description, field : "description",width : 20},
                            {name : Util.label.grid_layout_default_flag, field : "default_flag"},
                            {name : Util.label.created_by, field : "created_by"},
                            {name : Util.label.last_updated_by, field : "last_updated_by"}
                        ];
                        var grid = new DataGrid({
                            store: store,
                            structure :column,
                            escapeHTMLInData: false,
                            autoHeight : true,
                            autoWidth : true,
                            selectionMode : "single",
                            onRowDblClick : function(){
                                var items = this.selection.getSelected();
                                if(items.length) {
                                    var selectedItem = items[0];
                                    if(selectedItem !== null){
                                        switch(type){
                                            case  "save" :
                                                layoutDialog.fillValue(selectedItem);
                                                break;
                                            case "select" :
                                                o.selectLayout(selectedItem.layout_id.toString());
                                                selectDialog.hide();
                                                break;
                                        }
                                    }

                                }
                            }
                        },"layoutList");
                        grid.startup();

                        //下拉菜单动作
                        var typeSelect = Util.dijit_byId("layout_type");
                        typeSelect.options = [
                            {value :"ALL",label : Util.label.grid_layout_type_ALL,selected :true},
                            {value : "01",label : Util.label.grid_layout_type_01},
                            {value : "02",label : Util.label.grid_layout_type_02}
                        ];
                        typeSelect.attr("value","ALL");
                        dojo.connect(typeSelect,"onChange",function(){
                            if(this.value == "ALL"){
                                grid.setQuery({layout_type : "*"});
                            }else{
                                grid.setQuery({layout_type : this.value});
                            }
                        });
                        switch(type){
                            case  "save" :
                                //设置标题
                                selectDialog.set("title",Util.label.grid_layout_save);
                                //展示输入框
                                dojo.query("div #isNew",selectDialog.domNode).style("display","block");
                                //去除类型选择
//                                    typeSelect.options.splice(0,1);
                                typeSelect.removeOption(0);
                                typeSelect.attr("value","02");

                                //设置默认值
                                if(o.layout){
                                    store.fetch({
                                        query : {layout_id : o.layout},
                                        onComplete : function(items){
                                            if(items.length > 0){
                                                var item = items[0];
                                                layoutDialog.fillValue(item);
                                                grid.selection.setSelected(grid.getItemIndex(item), true)
                                            }
                                        }
                                    });//fetch
                                }//if

                                //为按钮附加事件
                                dojo.connect(Util.dijit_byId("saveButton"),"onClick",function(){
                                    var dialogForm = Util.dijit_byId("dialogForm");
                                    var postObj = domForm.toObject(dialogForm.id);
                                    //form验证通过则提交
                                    dialogForm.formValidate(function(){
                                        //获取数据，post到服务器
                                        postObj.program_id = o.program_id;
                                        postObj.default_flag = Util.xchecked(postObj.default_flag);

//                                        console.info(o.grid.structure);

                                        //刷新一下structure
//                                        var s = o.grid.buildStructureFromLayout();
                                        postObj.structure = JSON.stringify(o.grid._currentStructure());

                                        //判断是否覆盖当前布局
                                        if(o.layout){
                                            store.fetch({
                                                query : {layout_id : o.layout},
                                                onComplete : function(items){
                                                    if(items.length > 0){
                                                        if(confirm(Util.message.info_saveLayout_isRecover)){
                                                            Util.post("index.php/bc/grid_layout/save",postObj,function(){
                                                                selectDialog.hide();
                                                            });
                                                        }
                                                    }
                                                }
                                            });//fetch
                                        }else{
                                            //全新新建
                                            Util.post("index.php/bc/grid_layout/save",postObj,function(){
                                                selectDialog.hide();
                                            });
                                        }
                                    });

                                });
                                break;
                            case "select" :
                                selectDialog.set("title",Util.label.grid_layout_select);
                                break;
                            case "manage" :
                                selectDialog.set("title",Util.label.grid_layout_manage);
                                dojo.query("div #isManage",selectDialog.domNode).style("display","block");
                                //去除类型选择
//                                    typeSelect.options.splice(0,1);
                                typeSelect.removeOption(0);
                                typeSelect.attr("value","02");
                                //默认布局按钮事件
                                dojo.connect(Util.dijit_byId("defaultButton"),"onClick",function(){
                                    var items = grid.selection.getSelected();
                                    if(items.length) {
                                        dojo.forEach(items, function(selectedItem){
                                            //排除弹性域
                                            if(selectedItem !== null && grid.store.getValues(selectedItem,"default_flag") != 1){
                                                var postObj = new Object;
                                                postObj.layout_id = grid.store.getValues(selectedItem,"layout_id").toString();
                                                Util.post("index.php/bc/grid_layout/set_default",postObj,function(){
                                                    selectDialog.refresh()
                                                });
                                            }
                                        }); /* end forEach */
                                    } /* end if */
                                });
                                //删除按钮事件
                                dojo.connect(Util.dijit_byId("deleteButton"),"onClick",function(){
                                    var items = grid.selection.getSelected();
                                    if(items.length) {
                                        dojo.forEach(items, function(selectedItem){
                                            //排除弹性域
                                            if(selectedItem !== null){
                                                if(confirm(Util.message.info_sureDelete)){
                                                    var postObj = new Object;
                                                    postObj.layout_id = grid.store.getValues(selectedItem,"layout_id").toString();
                                                    Util.post("index.php/bc/grid_layout/destroy",postObj,function(){
                                                        selectDialog.refresh()
                                                    });
                                                }
                                            }
                                        }); /* end forEach */
                                    } /* end if */
                                });
                                break;
                        }//switch

                    });
                }
            });
//                selectDialog.setPosition(o.domNode);
            selectDialog.show();
        },
        fillValue : function(item){
            Util.dijit_byId("layout_name").set("value",item.layout_name);
            Util.dijit_byId("description").set("value",item.description);
            Util.dijit_byId("default_flag").set("checked",Util.xflag(item.default_flag));
            Util.dijit_byId("layout_type").set("value",item.layout_type);
        }

    }
});