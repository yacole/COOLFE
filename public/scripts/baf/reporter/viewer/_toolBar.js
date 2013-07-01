define(["dojo/_base/declare", "dojo/request", "dijit/Toolbar",
    "dijit/MenuSeparator", "dijit/form/Button", "baf/base/Util",
    "baf/base/Env","dijit/form/DropDownButton", "dijit/DropDownMenu", "dijit/MenuItem",
    "dijit/ToolbarSeparator","baf/reporter/viewer/_config","dijit/TooltipDialog"],
    function(declare,request,Toolbar,MenuSeparator,Button,Util,Env,DropDownButton,
             DropDownMenu,MenuItem,ToolbarSeparator,Config,TooltipDialog){
        /*
         *   摘要:
         *       工具栏：存放各类自定义的工具按钮组件
         */
        return declare("",[Toolbar],{
            program_id : null,
            //布局
            layoutButton : null,
            exportButton : null,
            selectTextButton : null,
            sortAscButton : null,
            sortDescButton : null,
            detailButton : null,
            printButton : null,
            searchButton : null,
            filterButton : null,
            sumButton : null,
            subSumButton : null,
            srcGrid : null,
            viewer : null,
            config : Config.toolBar,
            target : null,

            startup : function(){
                var o = this;
                var layoutMenu = new DropDownMenu({
                    style: "display: none;"
                });

                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_select,
                    onClick : function(){
                        o.viewer.showLayoutList("select");
                    },
                    disabled : o._boolean(o.config.layout)
                }));
                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_edit,
                    onClick : function(){
                        o.viewer.showSetup();
                    }
                }));
                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_save,
                    onClick : function(){
                        o.viewer.showLayoutList("save");
                    },
                    disabled : o._boolean(o.config.layout)
                }));
                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_manage,
                    onClick : function(){
                        o.viewer.showLayoutList("manage");
                    },
                    disabled : o._boolean(o.config.layout)
                }));

                layoutMenu.addChild(new MenuSeparator());

                layoutMenu.addChild(new MenuItem({
                    label : Util.label.grid_layout_clear,
                    onClick : function(){
                        o.viewer.clearLayout();
                    }
                }));

                this.layoutButton = new DropDownButton({
                    label : Util.label.grid_layout,
                    dropDown: layoutMenu
                });

                this.addChild(this.layoutButton);

                this.exportButton = new Button({
                    onClick : function(){
                        o.srcGrid.exportToExcel();
                    },
                    disabled : o._boolean(o.config.export),
                    iconClass : "gridToolBarExport"
                });
                this.addChild(this.exportButton);

                this.printButton = new Button({
                    label : "打印",
                    disabled : o._boolean(o.config.print)
                });
                this.addChild(this.printButton);

                this.addChild(new ToolbarSeparator({}));


                this.sortAscButton  = new Button({
                    label : "升序",
                    onClick : function(){
                        //判断是否行被选中
                        if(o.srcGrid.isSelectColumn() && o.target){
                            o.srcGrid.setSortIndex([{attribute: o.srcGrid.getCell(o.target.cellIndex).field,descending: false}]);
                            o.srcGrid.refresh();
                        }else{
                            o.viewer.showSetup("sort");
                        }
                    },
                    disabled : o._boolean(o.config.sortAsc)
                });
                this.addChild(this.sortAscButton);

                this.sortDescButton = new Button({
                    label : "降序",
                    onClick : function(){
                        if(o.srcGrid.isSelectColumn() && o.target){
                            o.srcGrid.setSortIndex([{attribute: o.srcGrid.getCell(o.target.cellIndex).field,descending: true}]);
                            o.srcGrid.refresh();
                        }else{
                            o.viewer.showSetup("sort");
                        }
                    },
                    disabled : o._boolean(o.config.sortDesc)
                });
                this.addChild(this.sortDescButton);

                this.searchButton = new Button({
                    label : "查找",
                    disabled : o._boolean(o.config.search)
                });
                this.addChild(this.searchButton);


                var filterMenu = new DropDownMenu({
                    style: "display: none;"
                });

                filterMenu.addChild(new MenuItem({
                    label : "设置过滤器",
                    onClick : function(){
                        if(o.srcGrid.isSelectColumn() && o.target){
                            o.viewer.filter.show(o.target.cellIndex);
                        }else{
                            o.viewer.showSetup("filter");
                        }
                    },
                    disabled : o._boolean(o.config.filter)
                }));

                filterMenu.addChild(new MenuItem({
                    label : "清除过滤器",
                    onClick : function(){
                        o.viewer.filter.clear();
                    },
                    disabled : o._boolean(o.config.filter)
                }));

                this.filterButton = new DropDownButton({
                    label : "过滤",
                    disabled : o._boolean(o.config.filter),
                    dropDown: filterMenu
                });
                this.addChild(this.filterButton);


                this.addChild(new ToolbarSeparator({}));

                this.detailButton = new Button({
                    label : "明细",
                    onClick : function(){
                        var rows = o.srcGrid.selection.getSelected();
                        if(rows.length > 0){
                            o.viewer.showDetail(rows[0]);
                        }
                    },
                    disabled : o._boolean(o.config.detail)
                });
                this.addChild(this.detailButton);

                this.selectTextButton = new Button({
                    label : "文本",
                    onClick : function(){
                        o.srcGrid.set("selectable",true);
                        o.srcGrid.refresh();
                    },
                    disabled : o._boolean(o.config.text)
                });
                this.addChild(this.selectTextButton);

                this.addChild(new ToolbarSeparator({}));

                var myDialog = new TooltipDialog({
                    style : "width:10em",
                    onHide : function(){
                        this.set("content","");
                    }
                });

                this.sumButton = new DropDownButton({
                    label : "汇总",
                    disabled : o._boolean(o.config.sum),
                    onClick : function(){
                        var sum = 0;
                        if(o.srcGrid.isSelectColumn() && o.target){
//                            o.subSumButton.set("disabled",false);
//                            o.viewer.showSummary(o.target.cellIndex);
                            sum = o.srcGrid.summaryColumn(o.target.cellIndex);
                        }
                        var content = "汇总值： "+sum.toString();
                        myDialog.set("content",content);
                    },
                    dropDown: myDialog
                });
                this.addChild(this.sumButton);

//                this.subSumButton = new Button({
//                    label : "小计",
//                    disabled : true,
//                    onClick : function(){
//                        //判断是否选中的时列，而且非汇总列
//                        if(o.srcGrid.isSelectColumn()){
//
//                        }
//                    }
//                });
//                this.addChild(this.subSumButton);

                this.addChild(new ToolbarSeparator({}));

                var t =   new Button({
                    label : "test",
                    onClick : function(){
                        console.info(o.srcGrid);
                        console.info(o.srcGrid.getSortProps());
                    }
                });
                this.addChild(t);
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
                dojo.connect(grid, 'onHeaderCellClick', function(e){
                    o.target = e;
                });
            },
            //配置转换
            _boolean : function(s){
                if(s == false){
                    return true;
                }else{
                    return false;
                }
            }

        });
    });