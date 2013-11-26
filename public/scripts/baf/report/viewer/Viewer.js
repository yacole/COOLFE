define(["dojo/_base/declare","dojox/layout/ContentPane","base/Util",
    "dojox/grid/enhanced/plugins/exporter/CSVWriter","dojox/grid/enhanced/plugins/Selector",
    "dojox/grid/enhanced/plugins/Menu","grid/MenusObject","./_toolBar","./layout/_layoutDialog",
    "dojo/data/ItemFileWriteStore","grid/DataGrid","./setup/_setupDialog",
    "dojox/grid/enhanced/plugins/DnD","dojo/json","dojox/grid/enhanced/plugins/Pagination",
    "dojox/grid/enhanced/plugins/NestedSorting", "./_detailDialog","./_config","./setup/_util",
    "./filter/Filter","dojox/grid/enhanced/plugins/IndirectSelection","dojox/grid/enhanced/plugins/Printer",
    "./printer/_printerDialog", "./_header","./_footer","./parameter/_selectDialog"],
    function (declare,ContentPane,Util,gridCSVWriter,gridSelector,gridMenu,MenusObject,ToolBarForReport,
              layoutDialog,ItemFileWriteStore,DataGrid,setupDialog,DnD,JSON,Pagination,NestedSorting,detailDialog,
              Config,u,Filter,IndirectSelection,Printer,printerDialog,header,footer,selectDialog){
        /*
         *   摘要:
         *                    报表查看器
         */
        return declare("",[ContentPane],{
            dataUrl : null,
            grid :null,
            program_id : null,
            report_id : null,
            timestamp : null,
            //报表头
            header : null,
            //报表底
            footer : null,
            //针对grid的工具栏
            toolBar : null,
            layout : null,
            //配置
            config : Config,
            filter : null,

            startup : function(){
                this._chooseParameters();
                this.inherited(arguments);
            },
            build : function(data){
                if(this.grid){
                    //刷新
                    this.refresh_data(data);
                }else{
                    //新建
                    this._build(data);
                }
            },
            _build : function(data){
                this.header = new header({
                    content : "报表头"
                });
                this.addChild(this.header);

                //加载布局
                this._loadDefaultLayout(data);
            },
            //刷新，重新获取数据
            refresh : function(){
                this._chooseParameters();
            },
            //根据data刷新view
            refresh_data : function(data,column){
                if(data){
                    var store = new ItemFileWriteStore({
                        data : data
                    });
                    this.grid.refresh(store);
                }else{
                    var store = new ItemFileWriteStore({
                        url : this.dataUrl
                    });
                    this.grid.refresh(store);
                }

                //数据快照
                this.grid.snapItems = this.grid.getALLItems();
                //刷新表头
                this._refreshHeader();
                //刷新表尾
                this._refreshFooter();
                //当前结构为空时，清空布局
                if(column && column.length == 0){
                    this.clearLayout();
                }
            },
            //加载布局
            _loadDefaultLayout : function(mdata){
                console.info(mdata);
                var o = this;
                //获取数据
                o.toolBar = new ToolBarForReport({
                    id : Util.id.wso_ToolBarForReport + this.timestamp,
                    style : "",
                    program_id : this.program_id
                });
                o.addChild(o.toolBar);

//                    console.info(Util.url.rpt_default_layout(o.program_id));
                //先判断是否存在默认布局
                Util.get(Util.url.rpt_default_layout(o.program_id),function(layout){
                    //初始化的时候为空，等待参数选择
                    var data = {items:[]};
//                        console.info(layout);
                    var column = [];
                    var store = new ItemFileWriteStore({
                        data : data
                    });

                    if(layout){
                        //默认布局
                        column = o._constructStructure(layout.structure);
                    }else{
                        if(o.config && o.config.grid && o.config.column){
//                            console.info("11");
                            column = o.config.column;
                        }else{
                            //按原始顺序
                            column = u.constructColumn(data.items);
                        }
                    }
                        console.info(column);
                    //配置右键菜单
                    var menusObject = null;
                    if(o.config && o.config.grid && o.config.grid.plugins && o.config.grid.plugins.menus){
                        menusObject = o.config.grid.plugins.menus;
                    }else{
                        menusObject = new MenusObject();
                        menusObject.startup();
                    }

                    //gird配置获取
                    var gridConfig = new Object;
                    if(o.config && o.config.grid){
                        gridConfig = o.config.grid;
                    }
                    gridConfig.store = store;
                    gridConfig.plugins.menus = menusObject;
                    gridConfig.structure = column;

                    //排序配置
                    if(o.config && o.config.tool.sort){
                        gridConfig.plugins.nestedSorting = true;
                    }else{
                        gridConfig.canSort = function(){return false};
                    }

                    //导出配置
                    if(o.config && o.config.tool.export){
                        gridConfig.plugins.exporter = true;
                    }

                    //打印设置
                    if(o.config && o.config.tool.printer){
                        gridConfig.plugins.printer = true;
                    }

                    o.grid = new DataGrid(gridConfig);

                    //设置源数据
                    if(menusObject.isDefault){
                        menusObject.setSrcGrid(o.grid,o);
                    }
                    o.toolBar.setSrcGrid(o.grid,o);
                    o.addChild(o.grid);

                    if(o.config && o.config.tool.filter){
                        //设置过滤器
                        o.filter = new Filter({
                            srcGrid : o.grid
                        });
                    }
//                        //汇总
//                        if(o.config && o.config.tool.summary){
//                            //数据快照
//                            if(!o.grid.snapItems){
//                                o.grid.snapItems = o.grid.getALLItems();
//                            }
//                        }
                    o._buildFooter();
                    o.refresh_data(mdata,column);
                });
            },
            //清除样式恢复到初始状态
            clearLayout : function(){
                var o = this;
                Util.get(o.dataUrl,function(data){
                    o.layout = null;
                    o.grid.setStructure(u.constructColumn(data.items));
                });

            },
            //选择布局，并变更
            selectLayout : function(layout_id){
                var o = this;
                Util.get(Util.url.rpt_layout(layout_id),function(data){
                    o.layout = layout_id;
                    o.grid.setStructure(o._constructStructure(data.structure));
                });
            },
            //从服务端获取的结构字符串转换成结构
            _constructStructure : function(s){
                var string = "{\"structure\":"+s+"}";
                var structure =  JSON.parse(string).structure;
                //每次加载时，获取最新的字段描述
                structure.forEach(function(e){
                    if(e.cells[0].length > 0){
                        e.cells[0].forEach(function(c){
                            c.name = Util.fieldLabel(c.field);
                        });
                    }
                });
                return structure;
            },
            //打开布局窗口
            showLayoutList : function(type){
                layoutDialog.show(type);
            },
            //打开管理窗口
            showSetup : function(type){
                var sDialog = new setupDialog({
                    title : Util.label.grid_layout_edit
                });
               sDialog.show();
               sDialog.selectTab(type);
            },
            //显示行项目明细
            showDetail : function(row){
                var dDialog = new detailDialog({
                    title : Util.label.grid_detail
                });
                dDialog.build(row,this.grid);
                dDialog.show();
            },
            //打印预览
            showPrinter : function(){
                var pDialog = new printerDialog({
                    title : Util.label.grid_printer_setup
                });
                pDialog.show();
            },
            _buildFooter : function(){
                //报表底部
                this.footer = new footer({
                    content : "报表底"
                });
                this.addChild(this.footer);
            },
            rebuildGrid : function(){
                if(this.grid){
                    this.grid.destroyRecursive();
                }
            },
            _chooseParameters : function(){
                var o = this;
                Util.get(Util.url.report("parameter_list",{report_id : this.report_id}),function(data){
                    if(Util.hasChildren(data)){
                        //有参数先用参数获取数据
                        var pcDialog = new selectDialog({
                            report_id : o.report_id
                        });
                        pcDialog.show();
                    }else{
                        o.build();
                    }
                });
            },
            _refreshHeader : function(){

            },
            _refreshFooter : function(){

            }

       });
    });