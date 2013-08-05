define(["dojo/_base/declare", "dojo/request", "dijit/Toolbar","dijit/MenuSeparator",
    "dijit/form/Button", "base/Util","base/Env","dijit/form/DropDownButton", "dijit/DropDownMenu",
    "dijit/MenuItem", "dijit/ToolbarSeparator"],
    function(declare,request,Toolbar,MenuSeparator,Button,Util,Env,DropDownButton,
             DropDownMenu,MenuItem,ToolbarSeparator){
        /*
         *   摘要:
         *       工具栏：存放各类自定义的工具按钮组件
         */
        return declare("",[Toolbar],{
            program_id : null,

            startup : function(){

            }
        });
    });