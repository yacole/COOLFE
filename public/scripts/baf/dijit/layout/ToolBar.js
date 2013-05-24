/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-23
 * Time: 下午2:40
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dojo/request",
    "dijit/Toolbar",
    "dijit/ToolbarSeparator",
    "dijit/form/Button",
    "baf/base/Util",
    "baf/base/Env"],
    function(declare,request,Toolbar,ToolbarSeparator,Button,Util,Env){
        return declare("",[Toolbar],{
            saveButton : null,
            queryButton : null,
            homeButton : null,
            constructor : function(args){
//                this.class = Util.id.wso_Content_class

            },
            startup : function(){
                //fix bug IE6:Expected identifier, string or number
//                dojo.attr(this.domNode, "class",Util.id.wso_Content_class);
                this.set("class",Util.id.wso_Content_class);

                this.homeButton = new Button({
                    label : "H",
                    onClick : function(){
                        var wso = Env.wso();
                        var currentWso = Env.currentWso();
                        wso.openProgram_byId(currentWso.home_page,"_self");
                    }
                });
                this.addChild(this.homeButton);

//                this.queryButton = new Button({
//                    label : "Q",
//                    onClick : function(){
//                        var wso = Env.wso();
//                        var currentWso = wso.currentChild();
//                        wso.openQForm(currentWso.qform,currentWso.timestamp,currentWso.params);
//                    }
//                });
//                this.addChild(this.queryButton);


                this.saveButton = new Button({
                    label : "S",
                    type : "submit",
                    onClick : function(){
                        //提交Form
                        var innerForm = Env.currentWso().innerForm;
                        innerForm.submit();

                    }
                });
                this.addChild(this.saveButton);

            }

        });
    });