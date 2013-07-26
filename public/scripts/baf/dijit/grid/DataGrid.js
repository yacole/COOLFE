define(["dojo/_base/declare","base/Util","dojox/grid/EnhancedGrid","dojo/io/iframe"],
function (declare,Util,EnhancedGrid,iframe){
    /*
     *   摘要:
     *      表格组件
     *   */
    return declare("",[EnhancedGrid],{
        //快照数据
        snapItems : null,
        //汇总行
        summaryRow : null,

        //重新刷新gird，如果没有指定数据源则刷新本身
        refresh : function(store){
            this.summaryRow = null;
            var s = null;
            if(store){
                s = store;
            }else{
                s = this.store;
            }
            this.store.close();
            this.setStore(s);
        },
        //获取当前列的列表,sortInfo:排序信息
        getColumns: function(sortInfo){
            var structure = [];
            var o = this;
            var cells = this.layout.cells;
            if(cells.length > 0){
                //如果需要附加排序信息
                if(sortInfo){
                    var props = o.getSortProps();
                    if(props && props.length > 0){
                        //循环查找排序信息
                        for(var i=0;i<props.length;i++){
                            cells.forEach(function(c){
                                if(c.hidden != true){
                                    if(props[i].attribute == c.field){
                                        var s = o._buildStructureObj(c);
                                        s.descending = props[i].descending;
                                        structure.push(s);
                                    }
                                }
                            });
                        }
                    }
                }else{
                    //一般情况
                    cells.forEach(function(c){
                        if(c.hidden != true){
                            structure.push(o._buildStructureObj(c));
                        }
                    });
                }
            }
            return structure;
        },
        //更新列的实际长度,并返回
        _currentStructure : function(){
            var layout = this.layout.structure;
            var structure = [];
            var o = this;
            layout.forEach(function(e){
                var a = {};
                a.cells = [];
                a.cells[0] = [];
                if(e.noscroll == false){
                    a.noscroll = false;
                }
                if(e.cells[0].length > 0){
                    e.cells[0].forEach(function(c){
                        a.cells[0].push(o._buildStructureObj(c));
                    });
                }
                structure.push(a);
            });
            return structure;
        },
        //生成结构对象
        _buildStructureObj : function(cell){
            //获取当前长度
            var o = new Object;
            var width = 0;
            if(cell.unitWidth.indexOf("px") > 0){
                width = cell.unitWidth.replace(/px/,"") / 10;
            }
            if(cell.unitWidth.indexOf("em") > 0){
                width = cell.unitWidth.replace(/em/,"");
            }
            //列最大长度限制
            if(Util.config.max_gridColumnWidth){
                if(width > Util.config.max_gridColumnWidth){
                    width = Util.config.max_gridColumnWidth;
                }
            }
            o.width = width;
            //获取当前位置
            o.field = cell.field;
            o.name = cell.name;

            return o;
        },
        //隐藏列
        hiddenCell : function(cellIndex){
            var s = [];
            var layout = this._currentStructure();
            var i = 0;

            layout.forEach(function(e,c){
                var a = {};
                a.cells = [];
                a.cells[0] = [];
                if(e.noscroll == false){
                    a.noscroll = false;
                }
                if(e.cells[0].length > 0){
                    e.cells[0].forEach(function(c){
                        if(i != cellIndex){
                            a.cells[0].push({name : c.name,field: c.field,width :c.width});
                        }
                        i ++;
                    });
                }
                s.push(a);
            });
            this.setStructure(s);
            //隐藏列
//            this.layout.setColumnVisibility(cellIndex,false);
        },
        _isFreezonLayout : function(){
            var s = this.layout.structure;
            var rt = false;
            if(s.length > 0){
                //判断是否存在多层机构：即有冻结列
                if(s[0].cells){
                    rt = true;
                }
            }
            return rt;
        },
        //冻结至,
        freezeAtCell : function(cellIndex){
            var currentStr = this.getColumns();
            var layout = [];
            var freezeCells = {noscroll: false,cells :[[]]};
            var normalCells = {cells : [[]]};
            if(currentStr.length > 0){
                currentStr.forEach(function(e,i){
                    if(i <= cellIndex){
                        freezeCells.cells[0].push(e);
                    }else{
                        normalCells.cells[0].push(e);
                    }
                });
            }
            layout.push(freezeCells);
            layout.push(normalCells);
            this.setStructure(layout);

        },
        //导出excel
        exportToExcel : function(){
            if(this.exporter){
                // Export the whole grid to CSV format, with separator of ":".
                this.exportGrid("csv", {writerArgs: {separator:","}}, function(str){
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
        },
        //调整至最佳宽度
        fixWidth : function(){
            if(this.layout.cells.length > 0){
                var items = this._currentPageRows();
//                console.info(items);
                if(items.length > 0){
                    this.layout.cells.forEach(function(e){
                        var maxWidth = 0;
                        var columnW = e.name.length;
                        var cellW = 0;
                        //获取最长
                        for(var i=0;i<items.length;i++){
                            if(items[i] && items[i][e.field]){
                                var cellW2 = items[i][e.field].toString().length;
                                if(cellW2 > cellW){
                                    cellW = cellW2;
                                }
                            }
                        }
                        if(columnW > cellW){
                            //列说明长
                            maxWidth = columnW;
                        }else{
                            //当前字段列最大长度
                            maxWidth = cellW;
                        }
                        //字符串长度对应列长度比例
                        var pxTOem = 0.7;
                        if(Util.config.wordLengthToColumnWidth){
                            pxTOem = Util.config.wordLengthToColumnWidth;
                        }
                        maxWidth = Math.round(maxWidth*pxTOem);
                        //列最大长度限制
                        if(Util.config.max_gridColumnWidth){
                            if(maxWidth > Util.config.max_gridColumnWidth){
                                maxWidth = Util.config.max_gridColumnWidth;
                            }
                        }
                        e.unitWidth = maxWidth.toString()+"em";
                    });
                }
            }
//            console.info(this.layout.cells);
            this.setStructure(this._currentStructure());
        },
        //获取当前页的items
        _currentPageRows : function(){
            var rowItems = [];
            var allItems = this.getALLItems();
            if(this.usingPagination){
                //判断是否分页
                var currentPage = this.currentPage();
                var currentPageSize = this.currentPageSize();
                var maxLen = allItems.length;
//                console.info("currentPage:" + currentPage);
//                console.info("currentPageSize:" + currentPageSize);
//                console.info("maxLen:" + maxLen);

                if((currentPage * currentPageSize) >= maxLen){
                    //当前页签为末页
                    for(var i = 0;i < maxLen - ((currentPage-1) * currentPageSize);i++){
                        rowItems.push(this.getItem(i));
                    }
                }else{
                    for(var i = 0;i < currentPageSize;i++){
                        rowItems.push(this.getItem(i));
                    }
                }
            }else{
                rowItems = allItems;
            }
            return rowItems;
        },
        //获取所有数据items
        getALLItems : function(){
            //排除汇总行
            //do something...
            var items = this.store._arrayOfTopLevelItems;
            //删除NULL行
            for(var i=0;i<items.length;i++){
                if(items[i] == null){
                    items.splice(i,1);
                }
            }
//            console.info(this._hasSummaryRow());
//            if(this._hasSummaryRow()){
//                console.info("gogo");
//                items.splice(this.summaryRow,1);
//            }
            return items;
        },
        //当前选择是否为列
        isSelectColumn : function(){
            var rows = this.selection.getSelected();
            if(rows.length > 0){
                return false;
            }else{
                return true;
            }
        },
        //列汇总
        summaryColumn : function(CellIndex){
            //考虑过滤后的结果
            var items = this.getALLItems();
            var field = this.getCell(CellIndex).field.toString();
            var rs = 0;
            if(items.length>0){
                //判断是否为数字
                if(Util.string.isNumber(items[0][field].toString())){
                    items.forEach(function(item){
                        rs = rs + Number(item[field]);
                    });
                }
            }
            //重新处理
            if(isNaN(rs)){
                rs = 0;
            }
            return rs;
        },
        //拥有汇总行
        _hasSummaryRow : function(){
            return (this.summaryRow != null && this.summaryRow >= 0) ? true : false;
        },
        //当过滤器过滤时更新汇总行
        _updateSummaryRow : function(CellIndex){
            var item = this.getItem(this.summaryRow);
            var cell = this.getCell(CellIndex);
            this.store.setValue(item,cell.field,this.summaryColumn(CellIndex));
        },
        _addSummaryRow : function(CellIndex){
            var cell = this.getCell(CellIndex);
            var item = new Object();
            item[cell.field] = this.summaryColumn(CellIndex);
            item[this.getCell(0).field] = "汇总：";
            item["summaryRow"] = 1;
            this.summaryRow = this.store._arrayOfAllItems.length;
            this.store.newItem(item);
        },
        showSummaryRow : function(CellIndex){
            if(this._hasSummaryRow()){
                this._updateSummaryRow(CellIndex);
            }else{
                this._addSummaryRow(CellIndex);
            }
        }
    });
});