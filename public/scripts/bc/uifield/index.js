//引用和初始化全局变量
var program_name = pn;
pn = null;
var userId = uid;
uid = null;
var p_program_id = null;

dojo.addOnLoad(function(){
    if (program_name != ""){
        initial(program_name);
    }
    //初始化所有标签
    require(["baf/base/Util","baf/base/Env"],function(Util,Env){

        //设置工具栏
        Env.currentWso().toolBar.saveButton.set("disabled", true);

    });
});

//初始化界面
function initial(program_name){
    //界面
    require(['dojo/request','baf/base/Util','baf/command/Command',"baf/base/Env"],
        function(request,Util,Command,ENV){
            //验证输入有效性
            var currentWso = ENV.currentWso();
            var innerForm = currentWso.innerForm;
            innerForm.formValidate(
                //存在则显示
                function(){
                    Util.query(".actionButtonGroup").style("display","block");
                    Util.query("div #mygrid").style("display","block");
                    request.get(Util.url.safeurl("bc/program","find_by_name",{program_name : program_name}),{handleAs: "json"}).then(function(data){
                        Util.query("span[for="+"program_name"+"]")[0].innerHTML = data.title;
                        p_program_id = data.program_id;
                        //载入datagrid
                        render_grid(program_name);
                    },function(error){
                        //无反馈结果
                        Command.show_dialog({content : Util.message.error_xhr_notreach});
                    });
                },
                function(){
                    Util.query(".actionButtonGroup").style("display","none");
                    Util.query("div #mygrid").style("display","none");
                },
                false,
                currentWso.contentPane);
        });
}

function render_grid(program_name){
    require(['baf/base/Util',
        'dojo/data/ItemFileWriteStore',
        'baf/dijit/grid/DataGrid',
        "dojo/dom-construct"],
        function(Util,ItemFileWriteStore,DataGrid,domConstruct){
            var grid;
            //载入data grid
            var store = new ItemFileWriteStore({
                url : Util.url.safeurl("bc/uifield","find_fields_by_program_name",{program_name : program_name})
            });

//            console.info(store);
            var fieldArray = ["field_name","label","field_size","required_flag","hidden_flag","hidden_flag",
                                "disabled_flag","valuelist_name","default_value","addfield_flag","validation_code"];

            var column = new Array();

            //创建grid列属性
            fieldArray.forEach(function(c){
                column.push({ name : Util.fieldLabel(c), field : c,width : Util.fieldSize(c)});
            });

            //先清空，后附加
            var gridCon = Util.query("div #mygrid")[0];

            dojo.empty(gridCon);

            var oldgrid = Util.dijit_byId("mygrid");

            if(oldgrid){
                oldgrid.destroyRecursive();
            }

            grid = new DataGrid({
                store: store,
                structure :column,
                //直接显示含HTML标签字段
                escapeHTMLInData: false,
                //也可自定义设置高度，如果不设置高度将无法正常显示
                autoHeight : true,
                rowSelector: '20px',
                id : Util.xId("mygrid"),
                onRowDblClick : function(){
                    postEdit();
                }
            });

            domConstruct.place(grid.domNode,gridCon);
            grid.startup();

        });
}

function btclick(){
    require(['baf/base/Util'],function(Util){
        var node = Util.dom_byId('program_name');
        //如果内容为空则重新聚焦
        if(node.value == ""){
            node.focus();
        } else {
            var vprogram_name = node.value;
            initial(vprogram_name);
        }//if(no
    });
}

//提交新增
function postCreate(){
    show_dialog("新建字段");
}
//提交更新
function postEdit(){

    require(["baf/base/Util"],function(Util){

        var grid = Util.dijit_byId("mygrid");
        var items = grid.selection.getSelected();
        if(items.length) {
           var selectedItem = items[0];

            if(selectedItem !== null){
                show_dialog("编辑字段",selectedItem);
            } /* end if */

        } /* end if */

    });

}

//提交更新
function postDelete(){
    require(["baf/base/Util","baf/command/Command"],function(Util,Command){
        var grid = Util.dijit_byId("mygrid");
        var items = grid.selection.getSelected();
        if(items.length) {
            dojo.forEach(items, function(selectedItem){
                //排除弹性域
                if(selectedItem !== null && grid.store.getValues(selectedItem,"addfield_flag") != 1){

                    if(confirm("确定要删除？")){
                        var id = grid.store.getValues(selectedItem,"ui_field_id");
                        if(id){
                            remoteAction({ui_field_id : id},"destroy",function(){
                                //成功之后
                                Util.dijit_byId("mygrid").store.deleteItem(selectedItem);
                            });
                        }

                    }

                } else{
                    Command.show_dialog({content : "无法删除！"});
                } /* end if */
            }); /* end forEach */
        } /* end if */

    });
}


function update_grid(){

    require(["dojo/dom-form","baf/command/Command","baf/base/Util","baf/base/Env"],
        function(domForm,Command,Util,Env){

            var dialogForm = Util.dijit_byId("dialogForm");

            //调用自定义的验证工具：包括远程
            dialogForm.formValidate(function(){

                var dialogForm = Util.dijit_byId("dialogForm");
                var data = domForm.toObject(dialogForm.id);

                var grid = Util.dijit_byId("mygrid");
                var store = grid.store;
                var items = grid.store._arrayOfAllItems;

//            console.info(data);

                //如果field_name不存在 store.newItem
                if(data){
                    //获取helptext编辑框内容
                    data["help_text"] = Util.trim(Util.dijit_byId("myEditor").value);

                    //转换checkbox值
                    data["required_flag"] = Util.xchecked(data["required_flag"]);
                    data["hidden_flag"] = Util.xchecked(data["hidden_flag"]);
                    data["disabled_flag"] = Util.xchecked(data["disabled_flag"]);
                    data["addfield_flag"] = Util.xchecked(data["addfield_flag"]);
                    if(data["validation_code"] != ""){
                        data["validation_desc"] = Util.getDesc("validation_code",dialogForm.domNode);
                    }else{
                        data["validation_desc"] = "";
                    }

                    if(data["valuelist_name"] != ""){
                        data["valuelist_desc"] = Util.getDesc("valuelist_name",dialogForm.domNode);
                    }else{
                        data["valuelist_desc"] = "";
                    }

                    var hasflag = false;
                    items.forEach(function(item){
//                        console.info(store.getAttributes(item));
                        if(item && store.getValues(item,"field_name") == data.field_name){
                            data["ui_field_id"] = store.getValues(item,"ui_field_id");
                            hasflag = true;
                            var attributes = store.getAttributes(item);
                            attributes.forEach(function(attribute){
                                if(data[attribute] != undefined){
                                    //                                    console.info(attribute + ":" +data[attribute]);
                                    if(data[attribute] != store.getValues(item,attribute)){
                                        store.setValues(item,attribute,data[attribute]);
                                    }
                                }
                            });

                        } //if

                    }); //forEach
                    //不存在，则新增
                    if(hasflag){
                        //远程更新
                        remoteAction(data,"update");
                    } else{
                        Util.dijit_byId("program_name").key = p_program_id;
                        data["program_id"] = p_program_id;

                        remoteAction(data,"create",function(){
                            //成功之后新增grid条目
                            Util.dijit_byId("mygrid").store.newItem(data);
                        });
                    }

                    hide_dialog();

                }//if(data)

            });


    });

} //update_grid

//隐藏dialog
function hide_dialog(){
    require(["baf/base/Util"],function(Util){
        var formDialog = Util.dijit_byId("formDialog");
        formDialog.hide();
    });

}//hide_dialog

function show_dialog(title,item){
    require(["baf/base/Util","baf/dijit/Dialog"],function(Util,Dialog){

        var formDialog = Util.dijit_byId("formDialog");

        if(formDialog){
            formDialog.show();
            fillValue(formDialog,item);
        }else{
            formDialog = new Dialog({
                id : "formDialog",
                title : title,
                href : Util.url.safeurl("bc/uifield","formDialog"),
                onDownloadEnd : function(){
                    Util.queryTofillLabel(this.domNode);
                    fillValue(this,item);
                },
                onHide : function(){
                    //隐藏之前清空表单
                    var dialogForm = Util.dijit_byId("dialogForm");
                    //重置表单数据
                    dialogForm.reset();
                }
            });
            formDialog.show();
        }//if
    });

} //show_dialog

//填充值
function fillValue(formDialog,item){
    require(["baf/base/Util"],function(Util){
        if(item){
            var grid = Util.dijit_byId("mygrid");
            dojo.forEach(grid.store.getAttributes(item), function(attribute){
                var value = grid.store.getValues(item, attribute).toString();
                switch(attribute){
                    case "help_text":
                        //help_text
                        var editor = Util.dijit_byId("myEditor");
                        editor.setValue(value);
                        break;
                    case "validation_code":
                        Util.fillValue(attribute,value,grid.store.getValues(item, "validation_desc").toString(),formDialog.domNode);
                        break;
                    case "valuelist_name" :
                        Util.fillValue(attribute,value,grid.store.getValues(item, "valuelist_desc").toString(),formDialog.domNode);
                        break;
                    default:
                        Util.fillValue(attribute,value,null,formDialog.domNode);
                }
            }); /* end forEach */
        }
    });
}//fillValue

//远程作业
function remoteAction(data,type,successFun,errorFun){
    require(["dojo/request","baf/base/Util","baf/command/Command"],function(request,Util,Command){
        //远程更新
        request.post(Util.url.safeurl("bc/uifield",type),{
            data : data,
            timeout : 2000,
            handleAs : "json"
        }).then(function(response){
                Command.handleExport(response);
                if(successFun){
                    successFun();
                }
            },function(error){
                Command.show_dialog({content : error});
                if(errorFun){
                    errorFun();
                }
            });
    });
}

//当选择了值集之后，默认值的选框则可以选择
function defaultValue_onFocus(){
    //动态获取验证码
    require(["dojo/request","baf/base/Util"],function(request,Util){
        //远程更新
        var valuelist_name = Util.dijit_byId("valuelist_name").value;
        request.get(Util.url.safeurl("bc/valuelist","find_by_name",{valuelist_name : valuelist_name}),{handleAs : "json"}).then(function(data){
            if(data){
                var df = Util.dijit_byId("default_value");
                df.valuelist_id = data.valuelist_id;
                df.showQbutton();
            }
        });
    });
}