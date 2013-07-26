define([ "dijit/Menu", "dijit/MenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator",
    "dijit/PopupMenuItem", "dojo/aspect", "base/Util" , "base/Env","cmd/Command"],
    function(Menu, MenuItem, CheckedMenuItem, MenuSeparator, PopupMenuItem,aspect,Util,ENV,Command){
    /*
     *   摘要:
     *       系统右键菜单管理，全局，根据不同的对象，菜单展示可自定义
     */
    return {

        startup : function(){
            /*
                右键菜单的创建顺序是通过先全局后局部的方式：局部可覆盖全局
             */
            //整个窗体菜单
//            var mainMenu = new Menu({
//                contextMenuForWindow : true
//            });
//            mainMenu.addChild(new MenuItem({
//                iconClass : "dijitEditorIcon dijitEditorIconCut",
//                accelKey : "Ctrl+X",
//                label : Util.label.rightmenu_main_cut
//            }));
//            mainMenu.addChild(new MenuItem({
//                iconClass : "dijitEditorIcon dijitEditorIconCopy",
//                accelKey : "Ctrl+C",
//                label : Util.label.rightmenu_main_copy
//            }));
//            mainMenu.addChild(new MenuItem({
//                iconClass : "dijitEditorIcon dijitEditorIconPaste",
//                accelKey : "Ctrl+V",
//                label : Util.label.rightmenu_main_paste
//            }));
//            mainMenu.startup();

            //导航角色菜单全局
            var rolePane = dijit.byId(Util.id.rolePane);
            //导航角色菜单
            var tree = dijit.byId(Util.id.rolePane_tree);

            var navigator = new Menu({
                targetNodeIds: [rolePane.domNode],
                refocus : false
            });
            navigator.addChild(new MenuItem({
                label: Util.label.rightmenu_openALL,
                onClick : function(){
                    tree.expandAll();
                }
            }));
            navigator.addChild(new MenuItem({
                label: Util.label.rightmenu_closeALL,
                onClick : function(){
                    tree.collapseAll();
                }
            }));
            navigator.startup();

            var navigatorMenu = new Menu({
                targetNodeIds: [tree.domNode],
                selector: ".dijitTreeNode",
                refocus : false
            });

            //在单击右键之前获取当前的点击对象
            aspect.before(navigatorMenu, "_openMyself", dojo.hitch(this, function(e){

                var node = dijit.getEnclosingWidget(e.target); /*node就是节点对象*/
                var item = node.item;

                //重新设置菜单项
                dojo.forEach(navigatorMenu.getChildren(),function(entry){
                    entry.destroyRecursive();
                });

                //如果有类型则不是文件夹
                if(item.children == undefined){

                    navigatorMenu.addChild(new MenuItem({
                        label: Util.label.rightmenu_target_self,
                        onClick : function(){
                            ENV.wso().openProgram_byId(item.program_id,"_self");
                        }
                    }));
                    navigatorMenu.addChild(new MenuItem({
                        label: Util.label.rightmenu_target_blank,
                        onClick: function(){
                            ENV.wso().openProgram_byId(item.program_id);
                        }
                    }));
                    navigatorMenu.addChild(new MenuSeparator());
                    navigatorMenu.addChild(new MenuItem({
                        label: Util.label.rightmenu_show_help
                    }));
                    navigatorMenu.addChild(new MenuSeparator());
                    navigatorMenu.addChild(new MenuItem({
                        label: Util.label.rightmenu_favorite
                    }));

                }
            }));

            navigatorMenu.startup();

            /*
                工作区tab页右键菜单
             */
            var wsotabMenu = new Menu({
                targetNodeIds: [dijit.byId(Util.id.wstablist).domNode],
                selector: ".dijitTabInner",
                refocus : false,
                id : Util.id.wsotabMenu
            });

            aspect.before(wsotabMenu, "_openMyself", dojo.hitch(this, function(e){

                //重新设置菜单项
                dojo.forEach(wsotabMenu.getChildren(),function(entry){
                    entry.destroy();
                });

                var target_id = dijit.getEnclosingWidget(e.target).id;

                //可通过ID字符串的截取，获取CHILD的ID
                var timestamp = target_id.replace(Util.id.wstablist+"_"+Util.id.wso_Child,"" );

                var wso = dijit.byId(Util.id.WorkspacePane);

                //当前也签
                var targetProgram = wso.getProgramBytimestamp(timestamp);

                //选中鼠标点击页
                wso.selectChild(targetProgram);

                wsotabMenu.addChild(new MenuItem({
                    label: Util.label.rightmenu_tab_reflash,
                    onClick : function(){
                        wso.refresh(targetProgram);
                    }
                }));
                wsotabMenu.addChild(new MenuItem({
                    label: Util.label.rightmenu_tab_copy,
                    onClick : function(){
                        wso.copyProgram(targetProgram);
                    }
                }));

                if(targetProgram.closable){
                    wsotabMenu.addChild(new MenuItem({
                        label: Util.label.rightmenu_tab_block,
                        onClick : function(){
                            targetProgram.set("closable",false);
                        }
                    }));
                } else {
                    wsotabMenu.addChild(new MenuItem({
                        label: Util.label.rightmenu_tab_unblock,
                        onClick : function(){
                            targetProgram.set("closable",true);
                        }
                    }));
                }

                wsotabMenu.addChild(new MenuSeparator());
                //关闭当前页
                wsotabMenu.addChild(new MenuItem({
                    label: Util.label.rightmenu_tab_close,
                    onClick : function(){

                        wso.closeProgram(targetProgram);
                    }
                }));
                //关闭其他页
                wsotabMenu.addChild(new MenuItem({
                    label: Util.label.rightmenu_tab_closeother,
                    onClick : function(){
                        wso.closeOtherProgram(targetProgram);
                    }
                }));

                //当第一页时”关闭左侧不选“
                wsotabMenu.addChild(new MenuItem({
                    label: Util.label.rightmenu_tab_closeleft,
                    disabled : targetProgram.isFirstChild,
                    onClick : function(){
                        wso.closeLeftProgram(targetProgram);
                    }
                }));

                //当最后一页时”关闭右侧不选“
                wsotabMenu.addChild(new MenuItem({
                    label: Util.label.rightmenu_tab_closeright,
                    disabled : targetProgram.isLastChild,
                    onClick : function(){
                        wso.closeRightProgram(targetProgram);
                    }
                }));

                wsotabMenu.addChild(new MenuSeparator());

                wsotabMenu.addChild(new MenuItem({
                    label: Util.label.rightmenu_favorite
                }));

                Command.rollbackWso();

//                  console.info(dijit.byId(Util.id.WorkspacePane).getChildren())
            }));

            wsotabMenu.startup();

        },

        //管理页签右键中的历史列表
        historyMenu : function(idlist){
            //获取工作区右键菜单
            var wsotabMenu = dijit.byId(Util.id.wsotabMenu);

            //如果回退的记录为空
            if(idlist.length == 0){

                wsotabMenu.addChild(new MenuItem({
                    label: Util.label.rightmenu_tab_rollback,
                    disabled : true
                }));

            } else{

                var pMenu = new Menu();
                for(var y = 0;y < idlist.length;y++){

                    pMenu.addChild(new MenuItem({
                        label : idlist[y].description,
                        program_id : idlist[y].program_id,
                        onClick : function(){
                            dijit.byId(Util.id.WorkspacePane).openProgram_byId(this.program_id);
                            Command.removeWso(this.program_id);
                        }
                    }));

                }//for(var y = 0;i

                wsotabMenu.addChild(new PopupMenuItem({
                    label: Util.label.rightmenu_tab_rollback,
                    popup : pMenu
                }));
            }//if(idli
        }

    }


});
