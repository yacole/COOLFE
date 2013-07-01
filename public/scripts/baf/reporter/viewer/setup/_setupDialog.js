define(["dojo/_base/declare","baf/dijit/Dialog","baf/base/Util","baf/base/Env","dojo/request",
    "baf/dijit/grid/DataGrid","dojo/data/ItemFileWriteStore","dojo/json",
    "dojo/dom-form","baf/command/Command","dijit/layout/TabContainer","dijit/layout/ContentPane",
    "dijit/form/Button","baf/reporter/viewer/setup/_structurePane","baf/reporter/viewer/setup/_sortPane",
    "baf/reporter/viewer/filter/Filter"],
    function(declare,Dialog,Util,Env,request,DataGrid,ItemFileWriteStore,JSON,domForm,
             Command,TabContainer,ContentPane,Button,structurePane,sortPane,Filter){
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
                //过滤器
                this._buildfilterPane();

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
            _buildfilterPane : function(){
                var filter = new Filter({
                    srcObj : this
                });
                filter.buildSetupPane();
                this.filterPane = filter.setupPane;
                this.paneContainer.addChild(this.filterPane);
            },
            selectTab : function(type){
                switch(type){
                    case "sort":
                        this.paneContainer.selectChild(this.sortPane);
                        break;
                    case "filter":
                        this.paneContainer.selectChild(this.filterPane);
                        break;
                    default :
                        this.paneContainer.selectChild(this.structurePane);
                        break;
                }
            }

        });
    });