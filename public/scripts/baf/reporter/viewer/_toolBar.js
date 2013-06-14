define(["dojo/_base/declare", "dojo/request", "dijit/Toolbar",
    "dijit/MenuSeparator", "dijit/form/Button", "baf/base/Util",
    "baf/base/Env","dijit/form/DropDownButton", "dijit/DropDownMenu", "dijit/MenuItem"],
    function(declare,request,Toolbar,MenuSeparator,Button,Util,Env,DropDownButton,DropDownMenu,MenuItem){
        /*
         *   摘要:
         *       工具栏：存放各类自定义的工具按钮组件
         */
        return declare("",[Toolbar],{
            program_id : null,
            //布局
            layoutButton : null,

            startup : function(){
                var layoutMenu = new DropDownMenu({style: "display: none;"});

                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_select,
                    onClick : function(){
                        Env.reportGrid().showLayoutList("select");
                    }
                }));
                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_edit,
                    onClick : function(){
                        Env.reportGrid().showSetup("structure");
                    }
                }));
                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_save,
                    onClick : function(){
                        Env.reportGrid().showLayoutList("save");
                    }
                }));
                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_manage,
                    onClick : function(){
                        Env.reportGrid().showLayoutList("manage");
                    }
                }));

                layoutMenu.addChild(new MenuSeparator());

                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_clear,
                    onClick : function(){
                        Env.reportGrid().clearLayout();
                    }
                }));

                this.layoutButton = new DropDownButton({
                    label : Util.label.grid_layout,
                    dropDown: layoutMenu
                });

                this.addChild(this.layoutButton);
            }

        });
    });