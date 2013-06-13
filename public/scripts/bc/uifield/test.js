
    renderGrid();


function renderGrid(){
    require(["baf/base/Util","dojo/data/ItemFileReadStore","baf/dijit/grid/DataGrid",
        "baf/base/Env","dojo/request"],function(Util,ItemFileReadStore,DataGrid,Env,request){
        var o = Env.reportGrid();
        console.info(o);
        request.get(Util.url.find_layouts_for_rpt({program_id : o.program_id}),{handleAs : "json"}).then(function(data){

            if(Util.hasChildren(data)){
                //插入选择列表
                var store = new ItemFileReadStore({
                    data : data
                });
                var column = [
                    {name :Util.fieldLabel("layout_name"), field : "layout_name",width : Util.fieldSize("layout_name")},
                    {name :Util.fieldLabel("description"), field : "description",width : Util.fieldSize("description")},
                    {name :Util.fieldLabel("default_flag"), field : "default_flag",width : Util.fieldSize("default_flag")}
                ];
                var grid = new DataGrid({
                    store: store,
                    structure :column,
                    escapeHTMLInData: false,
                    autoHeight : true,
                    autoWidth : true,
                    onRowDblClick : function(){
                        var items = this.selection.getSelected();
                        if(items.length) {
                            var selectedItem = items[0];

                            if(selectedItem !== null){
                                o.selectLayout(selectedItem.layout_id);
                            }

                        }

                    }
                }, document.createElement("div"));
                var gridCon = Util.query("div #layoutList")[0];
                gridCon.appendChild(grid.domNode);
                grid.startup();
            }
        });
    });
}