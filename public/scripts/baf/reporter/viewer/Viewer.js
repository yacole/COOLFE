define(["dojo/_base/declare","dojox/layout/ContentPane","baf/base/Util","dojo/request",
    "dojox/grid/enhanced/plugins/exporter/CSVWriter","dojox/grid/enhanced/plugins/Selector","dojox/grid/enhanced/plugins/Menu",
    "baf/dijit/grid/MenusObject", "baf/reporter/viewer/_toolBar","baf/reporter/viewer/_layoutDialog",
    "dojo/data/ItemFileReadStore","baf/dijit/grid/DataGrid","baf/reporter/viewer/_setupDialog",
    "dojox/grid/enhanced/plugins/DnD","dojo/json"],
    function (declare,ContentPane,Util,request,gridCSVWriter,gridSelector,gridMenu,
              MenusObject,ToolBarForReport,layoutDialog,ItemFileReadStore,DataGrid,setupDialog,DnD,JSON){
        /*
         *   摘要:
         *                    报表查看器
         */
        return declare("",[ContentPane],{
            dataUrl : null,
            grid :null,
            program_id : null,
            timestamp : null,
            layouts : null,
            //针对grid的工具栏
            toolBar : null,
            layout : null,


            constructor : function(args){
                this.inherited(arguments);
            },
            startup : function(){
                var o = this;
                this.toolBar = new ToolBarForReport({
                    id : Util.id.wso_ToolBarForReport + this.timestamp,
                    style : "",
                    program_id : o.program_id
                });
                this.addChild(this.toolBar);
                //加载布局
                this._loadDefaultLayout();

                this.inherited(arguments);
            },
            //构建列
            _constructColumn : function(data){
                var column = [];
                if(data.items.length > 0){
                    var line = data.items[0];
                    var i = 0;
                    for(var key in line){
                        column.push({ name : Util.fieldLabel(key), field : key,width : Util.fieldSize(key)});
                    }
                }
                return column;
            },
            //刷新
            refresh : function(){
                var store = new ItemFileReadStore({
                    url : this.dataUrl
                });
                this.grid.refresh(store);
            },
            //加载布局
            _loadDefaultLayout : function(){
                var o = this;
                //获取数据
                request.get(o.dataUrl,{handleAs : "json"}).then(function(data){
//                    console.info(Util.url.find_default_layout_for_rpt({program_id : o.program_id}));
                    //先判断是否存在默认布局
                    request.get(Util.url.find_default_layout_for_rpt({program_id : o.program_id}),{handleAs : "json"}).then(function(layout){
//                        console.info(layout);
                        var column = [];

                        var store = new ItemFileReadStore({
                            data : data
                        });

                        if(layout){
                            column = o._constructStructure(layout.structure);
                        }else{
                            //按原始顺序
                            column = o._constructColumn(data);
                        }
//                        console.info(column);
                        var menusObject = new MenusObject();

                        o.grid = new DataGrid({
                            store: store,
                            structure :column,
                            //直接显示含HTML标签字段
                            escapeHTMLInData: false,
                            //也可自定义设置高度，如果不设置高度将无法正常显示
                            autoHeight : true,
                            //如果设置此参数，冻结动作将无效
//                            autoWidth : true,
                            //不能排序
                            canSort :  function(){
                                return false;
                            },
                            //可选择文字
//                            selectable : true,
//                        width : "100px",
//                        hight : "100px",
                            plugins : {
                                menus : menusObject,
                                exporter: true,
                                selector: {row : "single",col : "single",cell : "disabled"},
                                dnd: {
                                    dndConfig: {
                                        //行不允许移动
                                        row : {
                                            within : false,
                                            in : false,
                                            out : false
                                        },
                                        cell : {
                                            within : false,
                                            in : false,
                                            out : false
                                        },
                                        col : {
                                            within : true,
                                            in : false,
                                            out : false
                                        }
                                    }
                                }
                             }
//                    rowSelector: '20px'
                        });
                        //设置源数据
                        menusObject.setSrcGrid(o.grid);
                        o.toolBar.srcGrid = o.grid;

                        o.addChild(o.grid);

                    });
                });

            },
            saveLayout : function(){
                if(this.layout){
                    //update
                }else{
                    //create
                }
                console.info(dojo.toJson(this.grid.structure));
            },
            //清除样式恢复到初始状态
            clearLayout : function(){
                var o = this;
                request.get(o.dataUrl,{handleAs : "json"}).then(function(data){
                    o.layout = null;
                    o.grid.setStructure(o._constructColumn(data));
                });

            },
            //选择布局，并变更
            selectLayout : function(layout_id){
                var o = this;
                request.get(Util.url.find_layout_for_rpt({layout_id : layout_id}),{handleAs : "json"}).then(function(data){
                    o.layout = layout_id;
                    o.grid.setStructure(o._constructStructure(data.structure));
                });
            },
            _constructStructure : function(s){
                var string = "{\"structure\":"+s+"}";
                return  JSON.parse(string).structure;
            },
            showLayoutList : function(isNew){
                layoutDialog.show(isNew);
            },
            showSetup : function(type){
                var sDialog = new setupDialog({
                    title : Util.label.grid_layout_edit
                });
               sDialog.show();
//                sDialog.selectTab(type);
            }

        });
    });