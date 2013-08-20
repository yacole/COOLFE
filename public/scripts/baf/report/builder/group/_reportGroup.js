define(["dojo/_base/declare", "base/Util","base/Env","baf/dijit/Dialog",
    "form/TextBox","form/Button"],
    function(declare,Util,Env,Dialog,TextBox,Button){
        /*
         *   摘要:
         *        报表组
         */
        return declare("",[],{
            //命名
            nameTextBox : null,
            //描述
            descTextBox : null,

            tree : null,

            create : function(){
                this._loadView(Util.label.report_group_create,"create_group");
            },
            show : function(report_group_id){
                var o = this;
                var dialog = new Dialog({
                    title : Util.label.report_group_show,
                    href : Util.url.report_group_template("show"),
                    onDownloadEnd : function(){
                        Util.get(Util.url.report_group(report_group_id),function(group){
                            new TextBox({style : "width:10em",value : group.name,disabled : true},"name");
                            new TextBox({style : "width:20em",value : group.description,disabled : true},"description");
                            new TextBox({style : "width:10em",value : group.created_by,disabled : true},"created_by");
                            new TextBox({style : "width:10em",value : group.creation_date,disabled : true},"creation_date");
                            new TextBox({style : "width:4em",value : group.report_count,disabled : true},"report_count");
                        });
                    }
                });
                dialog.show();
            },
            rename : function(item){
                this._loadView(Util.label.report_group_rename,"rename_group",true,item);
            },
            _loadView : function(title,action,isEdit,item){
                var o = this;
                var dialog = new Dialog({
                    title : title,
                    href : Util.url.report_group_template("form"),
                    onDownloadEnd : function(){
                        var d = this;
                        var dis = (isEdit != undefined && isEdit ? true : false);
                        var name,description = "";
                        if(item){
                            name = item.name.toString();
                            description = item.description.toString();
                        }
                        o.nameTextBox = new TextBox({
                            style : "width:10em",
                            value : name,
                            required : true,
                            uppercase : true,
                            disabled : dis
                        },"name");
                        o.descTextBox = new TextBox({
                            style : "width:20em",
                            required : true,
                            value : description
                        },"description");

                        var confirmButton = new Button({
                            label : Util.label.button_confirm,
                            onClick : function(){
                                var params = new Object();
                                params.name = o.nameTextBox.value;
                                params.description = o.descTextBox.value;
                                //提交
                                Util.post(Util.url.report(action),params,function(){
                                    d.hide();
                                    //在没有错误的情况下
                                    if(!Env.isError()){
                                        //如果指定修改的tree，则修改值。两种刷新方式：
                                        if(o.tree && dis){
                                            //重命名
                                            o.tree.model.store.setValue(item, 'description', params.description);
                                        }else{
                                            //刷新树
                                            Env.currentWso().refresh();
                                        }
                                    }
                                });
                            }
                        },"confirmButton");
                        var cancelButton = new Button({
                            label : Util.label.button_cancel,
                            onClick : function(){
                                d.hide();
                            }
                        },"cancelButton");
                    }
                });
                dialog.show();

            },
            //删除报表组
            destroySelf : function(item){
                var o = this;
                if(this.tree && item.children.length > 0){
                    Util.confirm(Util.message.error_cannot_destroy_report_group);
                }else{
                    var data = new Object();
                    data.report_group_id = item.report_group_id.toString();
                    Util.confirm(Util.message.info_sureDelete,function(){
                        Util.post(Util.url.report("destroy_group"),data,function(){
                            if(!Env.isError()){
                                o.tree.model.store.deleteItem(item);
                            }
                        });
                    });
                }
            }
        });
    });