/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-1
 * Time: 上午11:19
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "baf/base/Util",
    "baf/command/Command",
    "dijit/Tree",
    "dojo/data/ItemFileReadStore",
    "dijit/tree/ForestStoreModel",
    "dijit/layout/AccordionContainer",
    "dijit/layout/ContentPane",
    "baf/base/Env"
    ],
    function(declare,Util,Command,Tree, ItemFileReadStore,ForestStoreModel,AccordionContainer,ContentPane,Env){
        return declare([ContentPane],{
            rolePane : null,
            favoritePane : null,

            startup : function(data){

                var navigator = this;

                //设置用户角色菜单
                navigator.rolePane = new ContentPane({
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
                    rootLabel : Util.label.welcome + data.username,
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

                navigator.rolePane.addChild(oktree);

                navigator.addChild(navigator.rolePane);

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