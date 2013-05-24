/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-10
 * Time: 下午4:58
 * 弹出消息类：一般用于页面切换间的提示
 */
define(["dojo/_base/declare","dijit/Dialog","baf/base/Util"],function(declare,Dialog,Util){
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

