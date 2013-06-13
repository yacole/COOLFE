define(["dojo/_base/declare","dijit/Menu", "dijit/MenuItem", "dijit/MenuSeparator",
    "baf/base/Util","dojo/io/iframe"],
    function (declare,Menu,MenuItem,MenuSeparator,Util,iframe){
    /*
     *   摘要:
     *      表格组件默认右键菜单
     *   */
    return declare("",null,{

        forGrid : null,
        headerMenu: null,
        rowMenu: null,
        cellMenu: null,
        selectedRegionMenu: null,

        constructor : function(){
            this.headerMenu = this._headerMenu();
//            this.rowMenu = this._rowMenu();
            this.cellMenu = this._cellMenu();
//            this.selectedRegionMenu = this._selectedRegionMenu();
            this.headerMenu.startup();
//            this.rowMenu.startup();
            this.cellMenu.startup();
//            this.selectedRegionMenu.startup();
        },
        //选择标题右键菜单
        _headerMenu : function(){
            var obj = this;
            var headerMenu = new Menu();
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_hidden
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_addcolumn
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_fixhight
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_freeze
            }));
            headerMenu.addChild(new MenuSeparator());
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_ascOrder
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_descOrder
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_setFilter
            }));
//            headerMenu.startup();
            return headerMenu;
        },
        //选择行右键菜单
        _rowMenu : function(){
            var obj = this;
            var rowMenu = new Menu();
            rowMenu.addChild(new MenuItem({
                label : Util.label.grid_rowMenu_showDetail
            }));
            rowMenu.addChild(new MenuItem({
                label : "Row Menu Item 2"
            }));
            rowMenu.addChild(new MenuItem({
                label : "Row Menu Item 3"
            }));
            rowMenu.addChild(new MenuItem({
                label : "Row Menu Item 4"
            }));
//            rowMenu.startup();
            return rowMenu;
        },
        //选择区域右键菜单
        _selectedRegionMenu : function(){
            var obj = this;
            var selectedRegionMenu = new Menu();
            selectedRegionMenu.addChild(new MenuItem({
                label : "selectedRegion Menu Item 1"
            }));
            selectedRegionMenu.addChild(new MenuItem({
                label : "selectedRegion Menu Item 2"
            }));
            selectedRegionMenu.addChild(new MenuItem({
                label : "selectedRegion Menu Item 3"
            }));
            selectedRegionMenu.addChild(new MenuItem({
                label : "gogo",
                onClick : function(){
                    if(obj.forGrid){
//                        if(obj.forGrid.exporter){
//                            // Export the whole grid to CSV format, with separator of ":".
//                            obj.forGrid.exportSelected("csv", {writerArgs: {separator:","}}, function(str){
//                                console.info(str);
//                            });
//                        }
                        console.info(obj.forGrid);
                    }

                }
            }));
//            selectedRegionMenu.startup();
            return selectedRegionMenu;
        },
        //选择块右键菜单
        _cellMenu : function(){
            var obj = this;
            var cellMenu = new Menu();
            cellMenu.addChild(new MenuItem({
                label : Util.label.grid_menu_exportToExcel,
                onClick : function(){
                    //操作对象是否被赋值
                    if(obj.forGrid){
                        if(obj.forGrid.exporter){
                            // Export the whole grid to CSV format, with separator of ":".
                            obj.forGrid.exportGrid("csv", {writerArgs: {separator:","}}, function(str){
                                // do something interesting with str
                                var form = document.createElement('form');
                                dojo.attr(form, 'method', 'POST');
                                document.body.appendChild(form);
                                iframe.send({
                                    url: "index.php/bc/base/exportCsv",
                                    form: form,
                                    method: "POST",
                                    content: {exp: str},
                                    timeout: 15000
                                });
                                document.body.removeChild(form);
                            });
                        }
                    }
                }
            }));
//            cellMenu.startup();
            return cellMenu;
        }
    });
});