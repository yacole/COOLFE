define(["dojo/_base/declare","dojo/request","base/Util","base/Env","dijit/layout/TabContainer",
    "./_basePane"],
    function(declare,request,Util,Env,TabContainer,bp){
        /**
         * 摘要:
         *      报表设计器
         */
        return declare("",[TabContainer],{
            //基础数据准备状态
            ready : false,
            basePane : null,
            sourcePane : null,
            paramPane : null,
            structurePane : null,

            constructor : function(args){
                //替换工具栏的提交按钮
                dojo.connect(Env.currentWso().toolBar.saveButton,"onClick",this.submit);
                args.style =  "width:100%;height:100%;";
                args.useSlider =  false;
                args.useMenu = false;
            },

            startup : function(){
                this.basePane = new bp({
                    title : "基础"
                });
                this.addChild(this.basePane);
                this.inherited(arguments);
            },
            //替换工具栏的提交按钮
            submit : function(){
                var innerForm = Env.currentWso().innerForm;
                innerForm.set("action","index.php/bc/report/save_base_data");
                dojo.connect(innerForm,"success",this._refreshParamPane);
                innerForm.submit();
            },
            _refreshParamPane : function(){
                this.paramGrid.refresh(new ItemFileWriteStore({
                    url : "index.php/bc/report/column_list"
                }));
            }
        });
    });
