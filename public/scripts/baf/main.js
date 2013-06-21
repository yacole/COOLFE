/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-3-28
 * Time: 下午2:51
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "baf/wso/Wso",
    "baf/dijit/layout/StatusBar",
    "baf/dijit/layout/Navigator",
    "baf/base/Util"],
    function(declare,BorderContainer, ContentPane,Wso,StatusBar,Navigator,Util){
        return  declare("baf.main",[BorderContainer],{

            TopPane : null,
            NavigatorPane : null,
            WorkspacePane : null,
            StatusPane : null,
            data : null,

            constructor: function(args){
                args.id = Util.id.appContainer;
//                args.design = "headline";
            },
            //替换父类方法
            startup : function(){

                 //初始化各个面板
                this.TopPane = new ContentPane({
                    id : Util.id.TopPane,
                    region : "top"
                });
                this.TopPane.startup();

                //导航栏
                this.NavigatorPane = new Navigator({
                    id : Util.id.NavigatorPane,
                    region : "left",
                    splitter : true,
                    username : this.data.username
                });
                this.NavigatorPane.startup();

                //工作区
                this.WorkspacePane = new Wso({
                    id : Util.id.WorkspacePane,
                    region : "center",
                    allowNested : true,
                    tabPosition : Util.config.wsoTabPosition
                });
                this.WorkspacePane.startup();

//                dojo.forEach(this.WorkspacePane.tablist.containerNode.children, function(node) {
//                    dojo.addClass(node, "dojoDndItem");
//                });
//                var dndSource = new dndSource(this.WorkspacePane.tablist.containerNode, {
//                    withHandles: false
//                });

                //状态栏
                this.StatusPane = new StatusBar({
                    id : Util.id.StatusPane,
                    region : "bottom",
                    data : this.data
                });
                this.StatusPane.startup();

                //销毁加载信息并显示全部内容
                dojo._destroyElement(dojo.byId(Util.id.loading));
                dojo.place(this.domNode,dojo.body(),"first");
                this.addChild(this.TopPane);
                this.addChild(this.StatusPane);
                this.addChild(this.NavigatorPane);
                this.addChild(this.WorkspacePane);
                //此语句用于保留父类逻辑
                this.inherited(arguments);

            }


        });
    }
);