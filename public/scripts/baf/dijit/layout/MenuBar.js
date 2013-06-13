define([
    "dojo/_base/declare", "dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/Menu",
    "dijit/MenuItem", "dijit/DropDownMenu", "dijit/PopupMenuItem", "dijit/MenuSeparator",
    "dojo/data/ItemFileReadStore"],
    function(declare,MenuBar, PopupMenuBarItem, Menu, MenuItem, DropDownMenu, PopupMenuItem, MenuSeparator,ItemFileReadStore){
        return declare("",[MenuBar],{
                program_id : null,
                timestamp : null,

                build : function(){

                    var pMenuBar = this;

                    //用于存储数据
                    var itemStore = new ItemFileReadStore({
//                        url : Util.url.menubar({id : program_id})
                        url : "index.php/main/menubar"
                    });

//                    console.info(Util.url.menubar({id : program_id}));

                    itemStore.fetch({
                        onBegin : function(item){

                        },
                        onItem : function(item){

                            var pSubMenu = new DropDownMenu({});
                            var pSubMenuList = item["children"];

                                pSubMenuList.forEach(function(e){
//                                    console.info(e.type);
                                    if(e.type == "MenuSeparator"){
                                        pSubMenu.addChild(new MenuSeparator());
                                    }else{
                                        if(pMenuBar._haschildren(e)){
//                                            console.info(e);
                                            //无限加载子菜单
                                            pMenuBar._build_children(e,pSubMenu,pMenuBar);

                                        } else {
                                            var nn = new MenuItem({
                                                label : e.label[0]
                                            });
                                            //正常菜单项
                                            pSubMenu.addChild(nn);

                                        }//if(this._ha
                                    }
                                });

                            pMenuBar.addChild(new PopupMenuBarItem({
                                label: item.label[0],
                                popup: pSubMenu
                            }));
//                            console.info(pMenuBar);
                        }

                    });

                    return pMenuBar;
                },
                _haschildren : function(item){

                    if(item["children"] == undefined){
                        return false;
                    } else {
                        return true;
                    }
                },
                _build_children : function(item,parentMenu,pMenuBar){

                    if(pMenuBar._haschildren(item)){

                        //拥有子菜单的菜单项
                        var pMenu = new Menu({});

                        var pSubMenuList2 = item["children"];

                        for(var y = 0;y < pSubMenuList2.length;y++){

                            if(pSubMenuList2[y]["type"] == "MenuSeparator"){
                                pMenu.addChild(new MenuSeparator);
                            } else {
                                //无限加载子菜单
                                pMenuBar._build_children(pSubMenuList2[y],pMenu,pMenuBar);
                            }

                        }//for(var y = 0;i

                        parentMenu.addChild(new PopupMenuItem({
                            label : item["label"][0],
                            popup : pMenu
                        }));

                    } else {
                        //正常菜单项
                        parentMenu.addChild(new MenuItem({
                            label : item["label"][0]
                        }));

                    }//if(this._ha


                }
            });//declare(
    }
);