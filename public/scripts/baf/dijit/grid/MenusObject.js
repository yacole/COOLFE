define(["dojo/_base/declare","dijit/Menu", "dijit/MenuItem", "dijit/MenuSeparator",
    "base/Util","base/Env","report/viewer/_config","cmd/Help"],
    function (declare,Menu,MenuItem,MenuSeparator,Util,Env,Config,Help){
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
        config : Config.tool,

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
            //隐藏
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_hidden,
                onClick : function(){
                    if(o.headerMenu.target){
                        o.srcGrid.hiddenCell(o.headerMenu.target.cellIndex);
                    }
                }
            }));
            //添加列
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_addcolumn,
                onClick : function(){
                    o.viewer.showSetup();
                }
            }));
            //调整至最佳宽度
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_fixWidth,
                onClick : function(){
                    o.srcGrid.fixWidth();
                }
            }));
            //冻结至此列
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_freeze,
                onClick : function(){
                    o.srcGrid.freezeAtCell(o.headerMenu.target.cellIndex);
                }
            }));
            headerMenu.addChild(new MenuSeparator());
            //升序排序
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_ascOrder,
                onClick : function(){
                    var cell = o.srcGrid.getCell(o.headerMenu.target.cellIndex);
                    o.srcGrid.setSortIndex([{attribute: cell.field,descending: false}]);
                    o.srcGrid.refresh();
                },
                disabled : o._boolean(o.config.sort)
            }));
            //降序排序
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_descOrder,
                onClick : function(){
                    var cell = o.srcGrid.getCell(o.headerMenu.target.cellIndex);
                    o.srcGrid.setSortIndex([{attribute: cell.field,descending: true}]);
                    o.srcGrid.refresh();
                },
                disabled : o._boolean(o.config.sort)
            }));
            //设置过滤器
            headerMenu.addChild(new MenuItem({
                label : Util.label.grid_headerMenu_setFilter,
                onClick : function(){
                    o.viewer.filter.show(o.headerMenu.target.cellIndex);
                },
                disabled : o._boolean(o.config.filter)
            }));
            //字段帮助
            headerMenu.addChild(new MenuItem({
                label : "字段帮助",
                onClick : function(e){
                    var cell = o.srcGrid.getCell(o.headerMenu.target.cellIndex);
                    Help.field(cell.field);
                }
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
            var o = this;
            var cellMenu = new Menu();
            cellMenu.addChild(new MenuItem({
                label : Util.label.grid_menu_exportToExcel,
                onClick : function(){
                    //操作对象是否被赋值
                    o.srcGrid.exportToExcel();
                },
                disabled :  o._boolean(o.config.export)
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