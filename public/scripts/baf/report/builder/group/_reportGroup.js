define(["dojo/_base/declare", "dojo/request", "base/Util","base/Env","baf/dijit/Dialog",
    "form/TextBox","form/Button"],
    function(declare,request,Util,Env,Dialog,TextBox,Button){
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
                this._loadView("报表组新建","create_group");
            },
            show : function(report_group_id){
                var o = this;
                var dialog = new Dialog({
                    title : "报表组属性",
                    href : Util.url.localUrl("report/builder/group/_show.html"),
                    onDownloadEnd : function(){
                        request.get(Util.url.safeurl("bc/report","find_group",{report_group_id : report_group_id}),
                            {handleAs : "json"}).then(function(group){
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
                this._loadView("重命名报表组","rename_group",true,item);
            },
            _loadView : function(title,action,isEdit,item){
                var o = this;
                var dialog = new Dialog({
                    title : title,
                    href : Util.url.localUrl("report/builder/group/_form.html"),
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
                            label : "确认",
                            onClick : function(){
                                var params = new Object();
                                params.name = o.nameTextBox.value;
                                params.description = o.descTextBox.value;
                                //提交
                                Util.post("index.php/bc/report/"+action,params,function(){
                                    d.hide();
                                    //在没有错误的情况下
                                    if(!Env.isError()){
                                        //如果指定修改的tree，则修改值。两种刷新方式：
                                        if(o.tree){
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
                            label : "取消",
                            onClick : function(){
                                d.hide();
                            }
                        },"cancelButton");
                    }
                });
                dialog.show();

            }
        });
    });