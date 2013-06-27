define(["baf/base/Util"],function(Util){
    return {
        //通过列结构获取列信息
        _dataFromStructure : function(structure){
            var data = {items:[]};
            if(structure && structure.length > 0){
                structure.forEach(function(e){
                    data.items.push(e);
                });
            }
            return data;
        },
        //构建列
        _constructColumn : function(data,sortInfo){
            var column = [];
            if(data.items.length > 0){
                var line = data.items[0];
                var i = 0;
                for(var key in line){
                    var s = new Object;
                    s.name = Util.fieldLabel(key);
                    s.field = key;
                    s.width = Util.fieldSize(key);
                    if(sortInfo){
                        s.descending = true;
                    }
                    column.push(s);
                }
            }
            return column;
        },
        //通过数据生成结构
        _dataToStructure : function(data){
            var s = [];
            if(data.length > 0){
                data.forEach(function(e){
                    //修复e为null的bug
                    if(e){
                        s.push({name :e.name.toString(),field :e.field.toString(),width :e.width.toString()});
                    }
                });
            }
            return s;
        },
        //通过数据生成排序信息
        _dataToSortInfo : function(data){
            var s = [];
            if(data.length > 0){
                data.forEach(function(e){
                    //修复e为null的bug
                    if(e){
                        s.push({attribute: e.field.toString(),descending: e.descending});
                    }
                });
            }
            return s;
        },
        //剩余数组数据
        _leftData : function(allData,nowData){
            var data = [];
            var q = false;
            if(allData && nowData){
                //进过一轮相减
                for(var i=0;i < allData.length ;i++){
                    q = false;
                    for(var y=0;y < nowData.length ;y++){
                        if(nowData[y].field == allData[i].field){
                            q = true;
                        }
                    }
                    if(!q){
                        data.push(allData[i]);
                    }
                }

            }
            return  data;
        },
        _move : function(sourceStore,directStore,item,sortInfo){
            //Uncaught Error: encountered bug in ItemFileWriteStore.newItem
            //不能直接引用，需重新创建
            var newItem = new Object ;
            newItem.name = item.name;
            newItem.field = item.field;
            newItem.width = item.width;
            if(sortInfo){
                newItem.descending = item.descending;
            }
            directStore.newItem(newItem);
            sourceStore.deleteItem(item);
        }
    }
});