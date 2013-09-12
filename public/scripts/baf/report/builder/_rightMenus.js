define([ "dijit/Menu", "dijit/MenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator",
    "dijit/PopupMenuItem", "dojo/aspect", "base/Util" , "base/Env",
    "./group/_reportGroup","./setup/_showDialog","./_util"],
    function(Menu, MenuItem, CheckedMenuItem, MenuSeparator, PopupMenuItem,aspect,Util,Env,
             reportGroup,showDialog,u){
        return {
            startup : function(tree){
                if(tree){
                    var treeMenu = new Menu({
                        targetNodeIds: [tree.domNode],
                        selector: ".dijitTreeNode",
                        refocus : false
                    });

                    //在单击右键之前获取当前的点击对象
                    aspect.before(treeMenu, "_openMyself", dojo.hitch(this, function(e){

                        var node = dijit.getEnclosingWidget(e.target); /*node就是节点对象*/
                        var item = node.item;
                        Util.pathByKey('id',item.id.toString(),tree);

                        //重新设置菜单项
                        dojo.forEach(treeMenu.getChildren(),function(entry){
                            entry.destroyRecursive();
                        });

                        //如果是ROOT节点
                        if(item.root){
                            treeMenu.addChild(new MenuItem({
                                label: Util.label.report_group_create,
                                onClick : function(){
                                    var rptgrp = new reportGroup({});
                                    rptgrp.tree = tree;
                                    rptgrp.create();
                                }
                            }));

                            treeMenu.addChild(new MenuSeparator());

                            treeMenu.addChild(new MenuItem({
                                label: Util.label.rightmenu_openALL,
                                onClick : function(){tree.expandAll(); }
                            }));

                            treeMenu.addChild(new MenuItem({
                                label: Util.label.rightmenu_closeALL,
                                onClick: function(){tree.collapseAll();}
                            }));

                            treeMenu.addChild(new MenuSeparator());
                            treeMenu.addChild(new MenuItem({
                                label: Util.label.rightmenu_tab_reflash,
                                onClick : function(){
                                    Env.currentWso().refresh();
                                }
                            }));

                        }else{
                            if(item.children){
                                //报表组节点
                                treeMenu.addChild(new MenuItem({
                                    label: Util.label.report_create,
                                    onClick : function(){
                                        u.createBase(item,tree);
                                    }
                                }));
                                treeMenu.addChild(new MenuItem({
                                    label: Util.label.report_group_rename,
                                    onClick : function(){
                                        var rptgrp = new reportGroup({});
                                        rptgrp.tree = tree;
                                        rptgrp.rename(item);
                                    }
                                }));
                                treeMenu.addChild(new MenuItem({
                                    label:  Util.label.report_group_destroy,
                                    onClick : function(){
                                        //验证报表组下是否包含报表
                                        var rptgrp = new reportGroup({});
                                        rptgrp.tree = tree;
                                        rptgrp.destroySelf(item);
                                    }
                                }));
                                treeMenu.addChild(new MenuSeparator());
                                treeMenu.addChild(new MenuItem({
                                    label: Util.label.report_group_show,
                                    onClick : function(){
                                        var rptgrp = new reportGroup({});
                                        rptgrp.show(item.report_group_id.toString());
                                    }
                                }));
                            }else{
                                //叶子节点，报表节点
                                treeMenu.addChild(new MenuItem({
                                    label: Util.label.report_execute,
                                    onClick : function(){}
                                }));

                                treeMenu.addChild(new MenuItem({
                                    label: Util.label.report_copy,
                                    onClick : function(){}
                                }));

                                treeMenu.addChild(new MenuItem({
                                    label: Util.label.report_destroy,
                                    onClick : function(){
                                        u.destroyReport(item,tree);
                                    }
                                }));

                                var pMenu = new Menu();

                                pMenu.addChild(new MenuItem({
                                    label : Util.label.report_base,
                                    onClick : function(){
                                        u.updateBase(item,tree);
                                    }
                                }));

                                pMenu.addChild(new MenuItem({
                                    label : Util.label.report_data_source,
                                    onClick : function(){
                                        u.createSource(item,tree);
                                    }
                                }));

                                pMenu.addChild(new MenuItem({
                                    label : Util.label.report_parameter,
                                    onClick : function(){
                                        u.createParam(item,tree);
                                    }
                                }));

                                pMenu.addChild(new MenuItem({
                                    label : Util.label.report_structure,
                                    onClick : function(){
                                        u.createStructure(item,tree);
                                    }
                                }));

                                treeMenu.addChild(new PopupMenuItem({
                                    label: Util.label.report_setup,
                                    popup : pMenu
                                }));
                                treeMenu.addChild(new MenuItem({
                                    label: Util.label.report_to_program,
                                    onClick : function(){}
                                }));
                                treeMenu.addChild(new MenuSeparator());
                                treeMenu.addChild(new MenuItem({
                                    label: Util.label.report_show,
                                    onClick : function(){
                                        //包含所对应的程序信息
                                        var sDialog = new showDialog({
                                            title : this.label
                                        });
                                        sDialog.showAll(item.report_id.toString());
                                    }
                                }));
                            }
                        }
                    }));

                    treeMenu.startup();
                }

            }
        }


    });
