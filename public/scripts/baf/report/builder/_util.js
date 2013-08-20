define(["base/Util","./setup/_setupDialog","base/Env"],function(Util,setupDialog,Env){
    return {
        createBase : function(item,tree){
            var sDialog = new setupDialog({
                title :  Util.label.report_create,
                type : "base",
                report_group_name : item.name.toString(),
                tree : tree
            });
            sDialog.show();
        },
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
        createSource : function(item){
            var sDialog = new setupDialog({
                title : Util.label.report_data_source,
                type : "source",
                report_id : item.report_id.toString()
            });
            sDialog.show();
        },
        createParam : function(item){
            var sDialog = new setupDialog({
                title : Util.label.report_parameter,
                type : "parameter",
                report_id : item.report_id.toString()
            });
            sDialog.show();
        },
        destroyReport : function(item,tree){
            if(confirm(Util.message.info_sureDelete)){
                var data = new Object();
                data.report_id = item.report_id.toString();
                Util.post(Util.url.report("destroy_report"),data,function(){
                    if(!Env.isError()){
                        tree.model.store.deleteItem(item);
                    }
                });
            }
        }
    }
});