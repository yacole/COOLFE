define(["dojo/_base/declare","dojo/request","base/Util","base/Env","dijit/layout/ContentPane",
    "./_toolBar", "dijit/Tree","dojo/data/ItemFileWriteStore","dijit/tree/ForestStoreModel","./_rightMenus"],
    function(declare,request,Util,Env,ContentPane,toolBar,Tree,ItemFileWriteStore,ForestStoreModel,rightMenus){
        /**
         * 摘要:
         *      报表设计器
         */
        return declare("",[ContentPane],{
            toolBar : null,
            groupTree : null,

            constructor : function(args){
//                args.href = Util.url.report_builder_template("main");
                args.id = Util.xId("reportBuilder");
            },

            startup : function(){
                this.toolBar = toolBar();

                //获取导航栏数据
                var treeStore = new ItemFileWriteStore({
                    url : "index.php/bc/report/find_all"
                });

                //存储模块
                var treeModel = new ForestStoreModel({
                    store: treeStore,
                    root : true,
                    rootId : '',
                    rootLabel : "报表设计器",
                    childrenAttrs : ["reports"]
                });

                this.groupTree = new Tree({
                    model: treeModel,
                    //双击打开
                    openOnDblClick : true,
                    //双击导航栏项目
                    onDblClick : function(item){
                        //展示属性

                    }
                });
                this.groupTree.startup();
                this.addChild(this.groupTree);

                //激活右键菜单
                rightMenus.startup(this.groupTree);

                console.info(this.groupTree);

                this.inherited(arguments);
            }
        });
    });
