define(["base/Util","./setup/_setupDialog","base/Env","./preview/_paramDialog"],
    function(Util,setupDialog,Env,paramDialog){
    return {
        //创建报表基础数据
        createBase : function(item,tree){
            var sDialog = new setupDialog({
                title :  Util.label.report_create,
                type : "base",
                report_group_name : item.name.toString(),
                tree : tree
            });
            sDialog.show();
        },
        //更新报表基础数据
        updateBase : function(item,tree){
            var sDialog = new setupDialog({
                title : Util.label.report_base,
                type : "base",
                report_group_name : item.name.toString(),
                report_id : item.report_id.toString(),
                tree : tree
            });
            sDialog.show();
        },
        //创建报表数据源
        createSource : function(item,tree){
            var o = this;
            this._status(item.report_id.toString(),function(data){
                if(data["hasBase"]){
                    var sDialog = new setupDialog({
                        title : Util.label.report_data_source,
                        type : "source",
                        report_id : item.report_id.toString()
                    });
                    sDialog.show();
                }else{
                    Util.confirm_error(Util.message.error_notexists_report_base_data,function(){
                        o.createBase(item,tree);
                    });
                }
            });

        },
        //创建报表参数
        createParam : function(item,tree){
            var o = this;
            this._status(item.report_id.toString(),function(data){
                if(data["hasSource"]){
                    var sDialog = new setupDialog({
                        title : Util.label.report_parameter,
                        type : "parameter",
                        report_id : item.report_id.toString()
                    });
                    sDialog.show();
                }else{
                    Util.confirm_error(Util.message.error_notexists_report_source_data,function(){
                        o.createSource(item,tree);
                    });
                }
            });
        },
        //创建报表布局
        createStructure : function(item,tree){
            var o = this;
            this._status(item.report_id.toString(),function(data){
                if(data["hasParameter"]){
                    o._createStructure(item,true);
                }else{
                    Util.confirm(Util.message.error_notexists_report_parameters,function(){
                        o.createParam(item,tree);
                    },function(){
                        o._createStructure(item,false);
                    });
                }
            });
        },
        //布局创建子程序
        _createStructure : function(item,hasParameter){
            if(hasParameter){
                //有参数先用参数获取数据
                var pcDialog = new paramDialog({
                    report_id : item.report_id.toString()
                });
                pcDialog.show();
            }else{
                var sDialog = new setupDialog({
                    title : Util.label.report_parameter,
                    type : "structure",
                    report_id : item.report_id.toString(),
                    hasParameter : hasParameter
                });
                sDialog.show();
            }
        },
        //删除报表
        destroyReport : function(item,tree){
            Util.confirm(Util.message.info_sureDelete,function(){
                var data = new Object();
                data.report_id = item.report_id.toString();
                Util.post(Util.url.report("destroy_report"),data,function(){
                    if(!Env.isError()){
//                        tree.model.store.deleteItem(item);
                        Env.currentWso().refresh();
                    }
                });
            });
        },
        //获取状态
        _status : function(report_id,actionFunc){
            Util.get(Util.url.report("hasData",{report_id : report_id}),actionFunc);
        }

    }
});