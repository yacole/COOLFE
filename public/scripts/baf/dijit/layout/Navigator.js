define(["dojo/_base/declare", "base/Util", "dijit/Tree","dojo/data/ItemFileReadStore",
    "dijit/tree/ForestStoreModel","dijit/layout/ContentPane", "base/Env","dijit/form/TextBox"],
    function(declare,Util,Tree, ItemFileReadStore,ForestStoreModel,ContentPane,Env,TextBox){
        /*
         *   摘要:
         *       导航栏，位于框架左侧，存放权限菜单以及收藏夹
         */
        return declare([ContentPane],{
            //权限菜单
            rolePane : null,
            //收藏夹
            favoritePane : null,
            //万能查询框
            searchPane : null,
            //用于显示在菜单root
            username : null,

            startup : function(){

                //设置用户角色菜单
                this.searchPane = new ContentPane({
                    id : Util.id.searchPane
                });
                var tb = new TextBox({});
                this.searchPane.addChild(tb);

                //设置用户角色菜单
                this.rolePane = new ContentPane({
                    title : Util.label.tabtitle_usermenu,
                    id : Util.id.rolePane
                });

                //获取导航栏数据
                var treeStore = new ItemFileReadStore({
                    url : Util.url.navigator
                });

                //存储模块
                var treeModel = new ForestStoreModel({
                    store: treeStore,
                    root : true,
                    rootId : '',
                    rootLabel : Util.label.welcome + this.username,
                    childrenAttrs : [ "children" ]
                });

                var oktree = new Tree({
                    id : Util.id.rolePane_tree,
                    model: treeModel,
                    //双击打开
                    openOnDblClick : true,
//                    persist:false,    //每次打开都初始化
                    //双击导航栏项目
                    onDblClick : function(item){
                        //展示工作区
//                        Command.show_workspace(item["program_id"]);
                        Env.wso().openProgram_byId(item["program_id"]);

                    }
                });

                this.rolePane.addChild(oktree);
                this.addChild(this.searchPane);

                this.addChild(this.rolePane);

                //设置收藏夹
//                navigator.favoritePane = new ContentPane({
//                    title : Util.label.tabtitle_favorite,
//                    id : Util.id.favoritePane
//                });
//
//                navigator.addChild(navigator.favoritePane);

                //此语句用于保留父类逻辑
                this.inherited(arguments);

            }
        });
    }
);