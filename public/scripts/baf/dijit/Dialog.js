define(["dojo/_base/declare","dijit/Dialog","baf/base/Util"],function(declare,Dialog,Util){
    /*
     *   摘要:
     *       弹出消息框组件
     */
    return declare("",[Dialog],{
        constructor : function(args){
            if(args.title == undefined){
                this.title = Util.label.dialog_default_title;
            }
            if(args.id){
                args.id = Util.xId(args.id);
            }

        },
        onHide : function(){
            this.inherited(arguments);
            this.destroyRecursive();
        }
    });
});

