define(["dojo/_base/declare","dijit/layout/ContentPane","dojo/request","base/Util",
    "base/Env","form/TextBox","form/Select","dijit/layout/TabContainer","form/Button",
    "grid/DataGrid","dojo/data/ItemFileWriteStore","dojox/grid/cells/dijit"],
    function(declare,ContentPane,request,Util,Env,TextBox,Select,TabContainer,Button,DataGrid,ItemFileWriteStore){
        /**
         * 摘要:
         *      报表设计器:basePane
         */
        return declare("",[ContentPane],{
            //基础数据准备状态
            ready : false,
            paramGrid : null,

            constructor : function(args){
                args.href = Util.url.localUrl("reporter/builder/_base.html");
                //替换工具栏的提交按钮
                dojo.connect(Env.currentWso().toolBar.saveButton,"onClick",this.submit);
            },

            onDownloadEnd : function(){
                var o = this;
                Util.queryTofillLabel();

                var nameTb = new TextBox({name : "report_name"},"report_name");
                nameTb.startup();

                var descriptionTb = new TextBox({name : "description"},"description");
                descriptionTb.startup();

                var typeSelect = new Select({name : "report_type"},"report_type");
                typeSelect.startup();

                var confirmButton = new Button({ name : "confirmButton",
                    onClick : function(){ o.submit(); } },"confirmButton");
                confirmButton.startup();

                var tab = new TabContainer({
                    style: "width:100%;height:100%;",
                    useSlider: false,
                    useMenu:false
                },"tabContainer");
                tab.startup();

                var sourcePane = new ContentPane({
                    title : "数据来源"
                });
                sourcePane.startup();

                var sourceTb = new TextBox({name : "source_text"},dojo.create("div"));
                sourceTb.startup();

                var releaseButton = new Button({
                    name : "releaseButton",
                    label : "释放",
                    onClick : function(){
                        sourceTb.set("disabled",false);
                    }
                });
                confirmButton.startup();

                var editButton = new Button({
                    name : "editButton",
                    label : "编辑",
                    onClick : function(){
                        sourceTb.set("disabled",true);
                    }
                });
                confirmButton.startup();

                sourcePane.addChild(sourceTb);
                sourcePane.addChild(releaseButton);
                sourcePane.addChild(editButton);

                var paramPane = new ContentPane({
                    title : "参数设置"
                });
                paramPane.startup();

                var layoutPane = new ContentPane({
                    title : "布局设置"
                });
                layoutPane.startup();

                var store = new ItemFileWriteStore({
                    data : { items : []}
                });
                var structure = [
                    {field : "field_name",name : "字段",width:12},
                    {field : "field_name",name : "参数",width:4,editable: true,
                        type: dojox.grid.cells.Bool, styles: 'text-align: center;' },
                    {field : "valuelist_code",name : "值列表",width:12},
                    {field : "default_value",name : "默认值",width:20},
                    {field : "required_flag",name : "必输",width:4,editable: true,
                        type: dojox.grid.cells.Bool, styles: 'text-align: center;' }
                ];
                this.paramGrid = new DataGrid({
                    store : store,
                    structure : structure,
                    autoHeight : true
                });
                this.paramGrid.startup();
                paramPane.addChild(this.paramGrid);
                tab.addChild(sourcePane);
                tab.addChild(paramPane);
                tab.addChild(layoutPane);

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
