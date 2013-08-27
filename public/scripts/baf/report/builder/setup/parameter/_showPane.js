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
                    { name : "字段", field : "field",width : 12},
                    { name : Util.label.grid_setup_formula, field : "action",width : 6},
                    { name : "值集", field : "valuelist_name",width : 12},
                    { name : "默认值", field : "default_value",width : 12},
                    { name : "必输", field : "required_flag",width : 2.5,styles: 'text-align: center;'}
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