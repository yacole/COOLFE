define(["dojo/_base/declare","dijit/Menu", "dijit/MenuItem", "dijit/MenuSeparator",
    "baf/base/Util","baf/base/Env"],
    function (declare,Menu,MenuItem,MenuSeparator,Util,Env){
    /*
     *   摘要:
     *      表格组件默认右键菜单
     *   */
    return declare("",null,{

        srcGrid : null,
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
            var o = this;
            var gridPane = Env.reportGrid();

            var headerMenu = new Menu();
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_hidden,
                onClick : function(){
                    if(o.headerMenu.target){
                        o.srcGrid.hiddenCell(o.headerMenu.target.cellIndex);
                    }
                }
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_addcolumn,
                onClick : function(){
                    gridPane.showSetup();
                }
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_fixWidth
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_freeze,
                onClick : function(){
                    o.srcGrid.freezeAtCell(o.headerMenu.target.cellIndex);
                }
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
                }
            }));
//            selectedRegionMenu.startup();
            return selectedRegionMenu;
        },
        //选择块右键菜单
        _cellMenu : function(){
            var gridPane = Env.reportGrid();
            var cellMenu = new Menu();
            cellMenu.addChild(new MenuItem({
                label : Util.label.grid_menu_exportToExcel,
                onClick : function(){
                    //操作对象是否被赋值
                    gridPane.grid.exportToExcel();
                }
            }));
//            cellMenu.startup();
            return cellMenu;
        },
        setSrcGrid : function(grid){
            if(grid){
                this.srcGrid = grid;
            }else{
                this.srcGrid = Env.reportGrid().grid;
            }
            var o = this;
            //onCellContextMenu onRowContextMenu onHeaderCellContextMenu onSelectedRegionContextMenu
            dojo.connect(grid, 'onHeaderCellContextMenu', function(e){
                o.headerMenu.target = e;
            });
        }
    });
});