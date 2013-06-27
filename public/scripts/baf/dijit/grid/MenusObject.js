define(["dojo/_base/declare","dijit/Menu", "dijit/MenuItem", "dijit/MenuSeparator",
    "baf/base/Util","baf/base/Env","baf/reporter/viewer/_config"],
    function (declare,Menu,MenuItem,MenuSeparator,Util,Env,Config){
    /*
     *   摘要:
     *      表格组件默认右键菜单
     *   */
    return declare("",null,{

        srcGrid : null,
        viewer : null,
        headerMenu: null,
        rowMenu: null,
        cellMenu: null,
        selectedRegionMenu: null,
        isDefault : true,
        config : Config.gridMenu,

        startup : function(){
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
                    o.viewer.showSetup();
                }
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_fixWidth,
                onClick : function(){
                    o.srcGrid.fixWidth();
                }
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_freeze,
                onClick : function(){
                    o.srcGrid.freezeAtCell(o.headerMenu.target.cellIndex);
                }
            }));
            headerMenu.addChild(new MenuSeparator());
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_ascOrder,
                onClick : function(){
                    var cell = o.srcGrid.getCell(o.headerMenu.target.cellIndex);
                    o.srcGrid.setSortIndex([{attribute: cell.field,descending: false}]);
                },
                disabled : o._boolean(o.config.sortAsc)
            }));
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_descOrder,
                onClick : function(){
                    var cell = o.srcGrid.getCell(o.headerMenu.target.cellIndex);
                    o.srcGrid.setSortIndex([{attribute: cell.field,descending: true}]);
                },
                disabled : o._boolean(o.config.sortDesc)
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
            var cellMenu = new Menu();
            cellMenu.addChild(new MenuItem({
                label : Util.label.grid_menu_exportToExcel,
                onClick : function(){
                    //操作对象是否被赋值
                    o.srcGrid.exportToExcel();
                }
            }));
//            cellMenu.startup();
            return cellMenu;
        },
        setSrcGrid : function(grid,viewer){
            if(grid){
                this.srcGrid = grid;
            }else{
                this.srcGrid = Env.reportGrid().grid;
            }
            if(viewer){
                this.viewer = viewer;
            }else{
                this.viewer = Env.reportGrid();
            }

            var o = this;
            //onCellContextMenu onRowContextMenu onHeaderCellContextMenu onSelectedRegionContextMenu
            dojo.connect(this.srcGrid, 'onHeaderCellContextMenu', function(e){
                o.headerMenu.target = e;
            });
        },
        //根据配置返回disabled状态
        _boolean : function(s){
            if(s == false){
                return true;
            }else{
                return false;
            }
        }
    });
});