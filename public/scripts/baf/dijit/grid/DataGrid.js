define(["dojo/_base/declare","baf/base/Util","dojox/grid/EnhancedGrid","dojo/io/iframe"],
function (declare,Util,EnhancedGrid,iframe){
    /*
     *   摘要:
     *      表格组件
     *   */
    return declare("",[EnhancedGrid],{
        constructor : function(args){
            this.inherited(arguments);
        },
        startup : function(){
            this.inherited(arguments);
        },
        //默认双击为显示当前激活行的详细信息
        onRowDblClick : function(){
            this.inherited(arguments);
        },
        _showDetail : function(){

        },
        refresh : function(store){
            this.store.close();
            this.setStore(store);
        },
        //获取当前列的列表
        getColumns: function(){
            var structure = [];
            var o = this;
            var cells = this.layout.cells;
            if(cells.length > 0){
                cells.forEach(function(c){
                    if(c.hidden != true){
                        structure.push(o._buildStructureObj(c));
                    }
                });
            }
            return structure;
        },
        //更新列的实际长度,并返回
        _currentStructure : function(){
            var layout = this.layout.structure;
            var structure = [];
            var o = this;
            layout.forEach(function(e,c){
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
            if(cell.unitWidth.indexOf("px") > 0){
                o.width = cell.unitWidth.replace(/px/,"") / 10;
            }
            if(cell.unitWidth.indexOf("em") > 0){
                o.width = cell.unitWidth.replace(/em/,"");
            }
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
        }
    });
});