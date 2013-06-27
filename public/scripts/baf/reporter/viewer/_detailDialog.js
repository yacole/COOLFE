define(["dojo/_base/declare","baf/dijit/Dialog","baf/base/Util","baf/base/Env",
    "baf/dijit/grid/DataGrid","dojo/data/ItemFileReadStore"],
    function(declare,Dialog,Util,Env,DataGrid,ItemFileReadStore){
        return declare ("",[Dialog],{
            grid : null,
            srcGrid : null,

            build : function(row,srcGrid){
                if(row){
                    if(srcGrid){
                        this.srcGrid = srcGrid;
                    }else{
                        this.srcGrid = Env.reportGrid().grid;
                    }
                    var s = this.srcGrid.store;
                    var attrs =  s.getAttributes(row);
                    var column = [
                        {name : "字段",field : "field",width : 10},
                        {name : "内容",field : "content",width : 15}
                    ]
                    var data = {items:[]};
                    if(attrs.length > 0){
                        attrs.forEach(function(attribute){
                            data.items.push({field : Util.fieldLabel(attribute),content : s.getValue(row,attribute)});
                        });
                    }
                    var store = new ItemFileReadStore({
                        data : data
                    });
                    this.gird = new DataGrid({
                        store: store,
                        structure :column,
                        escapeHTMLInData: false,
                        selectable : true,
                        autoWidth : true,
                        height : "30em"
                    });
                    this.addChild(this.gird);
                }
            }
        });
    });