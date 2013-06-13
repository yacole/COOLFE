define(["dojo/_base/declare","dijit/Dialog","baf/base/Util","dojo/dom-geometry"],
    function(declare,Dialog,Util,domGeometry){
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
        postCreate : function(){
            this.inherited(arguments);
            //设置对话框默认位置
            var pos = {
                x : Math.round(document.body.scrollWidth * 0.3),
                y : Math.round(document.body.scrollHeight * 0.2),
                w : 0,
                h : 0
            };
            this.setPosition(pos);
        },
        onHide : function(){
            this.inherited(arguments);
            this.destroyRecursive();
        },
        setPosition : function(position){
            this._relativePosition = position;
        },
        setPosition_byNode : function(domNode){
            var position = domGeometry.position(domNode);
            this._relativePosition = position;
        }
    });
});

