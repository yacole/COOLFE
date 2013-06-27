define(["dojo/_base/declare","baf/dijit/Dialog","baf/base/Util","baf/base/Env","dojo/request",
    "baf/dijit/grid/DataGrid","dojo/data/ItemFileWriteStore","dojo/json",
    "dojo/dom-form","baf/command/Command","dijit/layout/TabContainer","dijit/layout/ContentPane",
    "dijit/form/Button","baf/reporter/viewer/setup/_structurePane","baf/reporter/viewer/setup/_sortPane"],
    function(declare,Dialog,Util,Env,request,DataGrid,ItemFileWriteStore,JSON,domForm,
             Command,TabContainer,ContentPane,Button,structurePane,sortPane){
        return declare ("",[Dialog],{
            paneContainer : null,
            //设置列
            structurePane : null,
            //设置排序
            sortPane : null,
            //设置过滤器
            filterPane : null,

            //展示布局选择和保持界面
            show : function(){

                this.paneContainer = new TabContainer({
                    //此处一定要定义长宽，不然tabcontainer在dialog里面显示会有问题
                    style : "width:40em;height:30em"
                });
                this.addChild(this.paneContainer);
                //布局修改
                this._buildStructurePane();
                //排序管理
                this._buildSortPane();

                this.inherited(arguments);
            },
            _buildStructurePane : function(){
                this.structurePane = new structurePane({
                    srcObj : this
                });
                this.paneContainer.addChild(this.structurePane);
            },
            _buildSortPane : function(){
                this.sortPane = new sortPane({
                    srcObj : this
                });
                this.paneContainer.addChild(this.sortPane);
            },
            selectTab : function(type){
                switch(type){
                    case "sort":
                        this.paneContainer.selectChild(this.sortPane);
                        break;
                    default :
                        this.paneContainer.selectChild(this.structurePane);
                        break;
                }
            }

        });
    });