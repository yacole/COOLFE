define(["dojo/_base/declare","base/Util","grid/DataGrid","dojo/data/ItemFileReadStore","dijit/layout/ContentPane"],
    function(declare,Util,DataGrid,ItemFileReadStore,ContentPane){
        return declare("",[ContentPane],{
            report_id : null,

            startup : function(){
                var  store = new ItemFileReadStore({
                    url : Util.url.report("parameter_list",{report_id : this.report_id})
                });
                //右边grid，现有参数列表
                var column = [
                    { name : Util.fieldLabel("field"), field : "field",width : Util.fieldSize("field")},
                    { name : Util.fieldLabel("action_desc"), field : "action",width : Util.fieldSize("action_desc")},
                    { name : Util.fieldLabel("default_value"), field : "default_value",width : Util.fieldSize("default_value")},
                    { name : Util.fieldLabel("required_flag"), field : "required_flag",
                        width : Util.fieldSize("required_flag"),styles: 'text-align: center;'}
                ];
                var grid = new DataGrid({
                    store: store,
                    structure : column,
                    //直接显示含HTML标签字段
                    escapeHTMLInData: false
                });
                this.addChild(grid);
                grid.startup();

                this.inherited(arguments);
            }
        });
    });