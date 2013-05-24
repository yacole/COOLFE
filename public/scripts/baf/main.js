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

            constructor: function(data){

                data.id = Util.id.appContainer;

                //填充视窗
                this.style = "width:100%;height:100%";
                this.design = "headline";
                //初始化各个面板
//                this.MenuPane = new ContentPane({
//                    id : "MenuPane",
//                    region : "top",
//                    style : "height:2em"
//                });

                //导航栏
                this.NavigatorPane = new Navigator({
                    id : Util.id.NavigatorPane,
                    region : "left",
                    splitter : true
                });
                this.NavigatorPane.startup(data);

                //工作区
                this.WorkspacePane = new Wso({
                    id : Util.id.WorkspacePane,
                    region : "center",
                    allowNested : true,
                    tabPosition : "bottom"
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
                    region : "bottom"
                });
                this.StatusPane.startup(data);



            },
            //替换父类方法
            startup : function(){

                //销毁加载信息并显示全部内容
                dojo._destroyElement(dojo.byId(Util.id.loading));
                dojo.place(this.domNode,dojo.body(),"first");
//                this.addChild(this.MenuPane);
                this.addChild(this.StatusPane);
                this.addChild(this.NavigatorPane);
                this.addChild(this.WorkspacePane);
                //此语句用于保留父类逻辑
                this.inherited(arguments);

            }


        });
    }
);