define(["../../../../../../dojo1.8.3/dojo/_base/declare","dojo/request","base/Util","base/Env","dijit/layout/TabContainer",
    "./_basePane","./_sourcePane"],
    function(declare,request,Util,Env,TabContainer,bp,sp){
        /**
         * 摘要:
         *      报表设计器
         */
        return declare("",[TabContainer],{
            //默认可编辑状态
            isEdit : true,
            baseDataReady : false,
            sourceDataReady : false,
            parameterDataReady : false,
            structureDataReady : false,
            basePane : null,
            sourcePane : null,
            paramPane : null,
            structurePane : null,

            constructor : function(args){
                args.style =  "width:100%;height:100%;";
                args.useSlider =  false;
                args.useMenu = false;
            },

            startup : function(){
                this.basePane = new bp({
                    title : "基础",
                    builder : this
                });
                this.addChild(this.basePane);

                this.sourcePane = new sp({
                    title : "数据来源",
                    disabled : !this.baseDataReady,
                    builder : this
                });
                this.addChild(this.sourcePane);

                this.inherited(arguments);
            }
        });
    });
