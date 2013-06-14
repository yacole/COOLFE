define(["dojo/_base/declare","baf/dijit/Dialog","baf/base/Util","baf/base/Env","dojo/request",
    "baf/dijit/grid/DataGrid","dojo/data/ItemFileReadStore","dojo/json",
    "dojo/dom-form","baf/command/Command","dijit/layout/TabContainer","dijit/layout/ContentPane"],
    function(declare,Dialog,Util,Env,request,DataGrid,ItemFileReadStore,JSON,domForm,Command,TabContainer,ContentPane){
        return declare ("",[Dialog],{
            paneContainer : null,
            //设置列
            structurePane : null,
            //设置排序
            orderPane : null,
            //设置过滤器
            filterPane : null,

            //展示布局选择和保持界面
            show : function(){

                this.paneContainer = new TabContainer({
                    allowNested : false
                });

                this.structurePane = new ContentPane({
                    title : "列显示",
                    content : "待添加"
                });

                this.paneContainer.addChild(this.structurePane);

                this.addChild(this.paneContainer);

                this.inherited(arguments);

            },
            selectTab : function(type){

            }
        });
    });