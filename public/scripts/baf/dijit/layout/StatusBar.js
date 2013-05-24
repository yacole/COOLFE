/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-2
 * Time: 上午8:41
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dojo/request",
    "dijit/layout/ContentPane",
    "baf/dijit/layout/MessageBar",
    "dijit/Toolbar",
    "dijit/ToolbarSeparator",
    "dijit/form/Button",
    "baf/base/Util"
    ],
    function(declare,request,ContentPane,MessageBar,Toolbar,ToolbarSeparator,Button,Util){
    return declare("",[Toolbar],{

        messageblock : null,
        userinfoblock : null,
        hostblock : null,

        constructor : function(args){

            this.messageblock = new MessageBar({
                id : Util.id.messageblock
            });
            //fix bug IE6:Expected identifier, string or number
//            dojo.attr(this.messageblock.domNode, "class", Util.id.messageblock);
            this.messageblock.set("class",Util.id.messageblock);

            this.userinfoblock = new Button({
                id : Util.id.userinfoblock
//                class : Util.id.statusbarblock_class
            });
//            dojo.attr(this.userinfoblock.domNode, "class", Util.id.statusbarblock_class);
            this.userinfoblock.set("class",Util.id.statusbarblock_class);

            this.hostblock = new Button({
                id : Util.id.hostblock
//                class : Util.id.statusbarblock_class
            });
//            dojo.attr(this.hostblock.domNode, "class", Util.id.statusbarblock_class);
            this.hostblock.set("class",Util.id.statusbarblock_class);

        },
        startup : function(data){

            this.userinfoblock.set("label" , data.username);
            this.hostblock.set("label" , data.host);

            this.addChild(this.userinfoblock);

            var ts = new ToolbarSeparator();
            ts.set("class",Util.id.ToolbarSeparator_class);

            this.addChild(ts);
            this.addChild(this.hostblock);

            this.addChild(this.messageblock);

            //此语句用于保留父类逻辑
            this.inherited(arguments);
        }

    });
});