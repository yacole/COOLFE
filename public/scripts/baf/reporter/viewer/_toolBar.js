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
                    label : "选择布局",
                    onClick : function(){
                        Env.reportGrid().showLayoutList();
                    }
                }));
                layoutMenu.addChild(new MenuItem({
                    label : "更改布局"
                }));
                layoutMenu.addChild(new MenuItem({
                    label : "保存布局",
                    onClick : function(){
                        Env.reportGrid().showLayoutList(true);
                    }
                }));
                layoutMenu.addChild(new MenuItem({
                    label : "管理布局"
                }));

                layoutMenu.addChild(new MenuSeparator());

                layoutMenu.addChild(new MenuItem({
                    label : "全部清空",
                    onClick : function(){
                        Env.reportGrid().clearLayout();
                    }
                }));

                this.layoutButton = new DropDownButton({
                    label : "布局",
                    dropDown: layoutMenu
                });

                this.addChild(this.layoutButton);
            }

        });
    });