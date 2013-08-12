define([ "dijit/Menu", "dijit/MenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator",
    "dijit/PopupMenuItem", "dojo/aspect", "base/Util" , "base/Env","cmd/Command","report/builder/group/_reportGroup"],
    function(Menu, MenuItem, CheckedMenuItem, MenuSeparator, PopupMenuItem,aspect,Util,Env,Command,reportGroup){
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
                        //设置选择路径
                        var buildme = [];
                        var result = Util.recursiveHunt(item.id.toString(), tree.model, buildme, tree.model.root);
                        if(result && result.length > 0){
                            tree.set('path', result);
                        }

                        //重新设置菜单项
                        dojo.forEach(treeMenu.getChildren(),function(entry){
                            entry.destroyRecursive();
                        });

                        //如果是ROOT节点
                        if(item.root){
                            treeMenu.addChild(new MenuItem({
                                label: "新建报表组",
                                onClick : function(){
                                    var rptgrp = new reportGroup({});
                                    rptgrp.tree = tree;
                                    rptgrp.create();
                                }
                            }));

                            treeMenu.addChild(new MenuSeparator());

                            treeMenu.addChild(new MenuItem({
                                label: "打开全部",
                                onClick : function(){tree.expandAll(); }
                            }));

                            treeMenu.addChild(new MenuItem({
                                label: "折叠全部",
                                onClick: function(){tree.collapseAll();}
                            }));

                            treeMenu.addChild(new MenuSeparator());
                            treeMenu.addChild(new MenuItem({
                                label: "刷新",
                                onClick : function(){
                                    Env.currentWso().refresh();
                                }
                            }));

                        }else{
                            if(item.reports){
                                //报表组节点
                                treeMenu.addChild(new MenuItem({
                                    label: "新建报表",
                                    onClick : function(){}
                                }));
                                treeMenu.addChild(new MenuItem({
                                    label: "重命名报表组",
                                    onClick : function(){
                                        var rptgrp = new reportGroup({});
                                        rptgrp.tree = tree;
                                        rptgrp.rename(item);
                                    }
                                }));
                                treeMenu.addChild(new MenuItem({
                                    label: "删除报表组",
                                    onClick : function(){
                                        //验证报表组下是否包含报表
                                    }
                                }));
                                treeMenu.addChild(new MenuSeparator());
                                treeMenu.addChild(new MenuItem({
                                    label: "属性",
                                    onClick : function(){
                                        var rptgrp = new reportGroup({});
                                        rptgrp.show(item.report_group_id.toString());
                                    }
                                }));
                            }else{
                                //叶子节点，报表节点
                                treeMenu.addChild(new MenuItem({
                                    label: "运行",
                                    onClick : function(){}
                                }));

                                treeMenu.addChild(new MenuItem({
                                    label: "拷贝",
                                    onClick : function(){}
                                }));

                                var pMenu = new Menu();

                                pMenu.addChild(new MenuItem({
                                    label : "重命名",
                                    onClick : function(){}
                                }));

                                pMenu.addChild(new MenuItem({
                                    label : "数据来源",
                                    onClick : function(){}
                                }));

                                pMenu.addChild(new MenuItem({
                                    label : "参数",
                                    onClick : function(){}
                                }));

                                pMenu.addChild(new MenuItem({
                                    label : "布局",
                                    onClick : function(){}
                                }));

                                treeMenu.addChild(new PopupMenuItem({
                                    label: "修改",
                                    popup : pMenu
                                }));
                                treeMenu.addChild(new MenuItem({
                                    label: "生成程序",
                                    onClick : function(){}
                                }));
                                treeMenu.addChild(new MenuSeparator());
                                treeMenu.addChild(new MenuItem({
                                    label: "属性",
                                    onClick : function(){
                                        //包含所对应的程序信息
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
