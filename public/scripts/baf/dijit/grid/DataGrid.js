define(["dojo/_base/declare","baf/base/Util","dojox/grid/EnhancedGrid"],
function (declare,Util,EnhancedGrid){
    /*
     *   摘要:
     *      表格组件
     *   */
    return declare("",[EnhancedGrid],{
        constructor : function(args){
            this.inherited(arguments);
        },
        startup : function(){
            this.inherited(arguments);
        },
        //默认双击为显示当前激活行的详细信息
        onRowDblClick : function(){
            this.inherited(arguments);
        },
        _showDetail : function(){

        },
        refresh : function(store){
            this.store.close();
            this.setStore(store);
        }
    });
});