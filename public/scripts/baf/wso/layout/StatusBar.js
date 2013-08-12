define(["dojo/_base/declare", "dojo/request", "dijit/layout/ContentPane","layout/MessageBar",
    "dijit/Toolbar", "dijit/ToolbarSeparator","dijit/form/Button", "base/Util" ],
    function(declare,request,ContentPane,MessageBar,Toolbar,ToolbarSeparator,Button,Util){
        /*
         *   摘要:
         *       状态栏，位于框架底部，用于显示系统状态、消息、用户环境
         */
    return declare("",[Toolbar],{
        //消息栏
        messageblock : null,
        //用户信息栏
        userinfoblock : null,
        //服务器信息栏
        hostblock : null,
        data : null,

        startup : function(data){

            this.messageblock = new MessageBar({
                id : Util.id.messageblock
            });
            this.messageblock.set("class",Util.id.messageblock);

            this.userinfoblock = new Button({
                id : Util.id.userinfoblock
            });
            this.userinfoblock.set("class",Util.id.statusbarblock_class);

            this.hostblock = new Button({
                id : Util.id.hostblock
            });
            this.hostblock.set("class",Util.id.statusbarblock_class);

            this.userinfoblock.set("label" , this.data.username);
            this.hostblock.set("label" , this.data.host);

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