define(["baf/base/Util","../filter/_action"],function(Util,action){
    return {
        //通过列结构获取列信息
        dataFromStructure : function(structure,filterInfo){
            var data = {items:[]};
            if(structure && structure.length > 0){
                //如果是过滤器则结构
                if(filterInfo){
                    structure.forEach(function(e){
                        var s = new Object();
                        s.actionName = e.action.description.toString();
                        s.field = e.field;
                        s.focus = true;
                        s.value = (e.value == undefined ? "" : e.value);
                        data.items.push(s);
                    });
                }else{
                    structure.forEach(function(e){
                        data.items.push(e);
                    });
                }

            }
            return data;
        },
        //构建列
        constructColumn : function(items,sortInfo){
            var column = [];
            if(items.length > 0){
                var line = items[0];
                var i = 0;
                for(var key in line){
                    //过滤dojo内部参数
                    if(key.indexOf("_") != 0){
                        var s = new Object;
                        s.name = Util.fieldLabel(key);
                        s.field = key;
                        s.width = Util.fieldSize(key);
                        //排序信息
                        if(sortInfo){
                            s.descending = true;
                        }
                        column.push(s);
                    }
                }
            }
            return column;
        },
        //通过数据生成结构
        dataToStructure : function(data){
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
        dataToSortInfo : function(data){
            var s = [];
            if(data.length > 0){
                data.forEach(function(e){
                    //修复e为null的bug
                    if(e){
                        s.push({attribute: e.field.toString(),descending: e.descending.toString() == "true"});
                    }
                });
            }
            return s;
        },
        //剩余数组数据
        leftData : function(allData,nowData){
            var data = [];
            var q = false;
            if(allData && nowData){
                //进过一轮相减
                for(var i=0;i < allData.length ;i++){
                    q = false;
                    for(var y=0;y < nowData.length ;y++){
                        if(nowData[y].field == allData[i].field){
                            q = true;
                            break;
                        }
                    }
                    if(!q){
                        data.push(allData[i]);
                    }
                }

            }
            return  data;
        },
        move : function(sourceStore,directStore,item,sortInfo,filterInfo){
            //Uncaught Error: encountered bug in ItemFileWriteStore.newItem
            //不能直接引用，需重新创建
            var newItem = new Object ;
            newItem.name = item.name;
            newItem.field = item.field;
            newItem.width = item.width;
            if(sortInfo){
                newItem.descending = item.descending;
            }
            if(filterInfo){
                newItem.actionName = item.actionName;
                newItem.focus = true;
                newItem.value = "";
            }
            directStore.newItem(newItem);
            //过滤器不删除右侧
            if(!filterInfo){
                sourceStore.deleteItem(item);
            }
        },
        //获取action列表
        actionOptions : function(){
            return [
                { value: action.IN.description, label: action.IN.description,action : action.IN},
                { value: action.NOT_IN.description, label: action.NOT_IN.description,action :action.NOT_IN},
                { value: action.EQ.description, label: action.EQ.description,action :action.EQ},
                { value: action.NE.description, label: action.NE.description,action :action.NE},
                { value: action.GT.description, label: action.GT.description,action :action.GT},
                { value: action.GE.description, label: action.GE.description,action :action.GE},
                { value: action.LT.description, label: action.LT.description,action :action.LT},
                { value: action.LE.description, label: action.LE.description,action :action.LE},
                { value: action.HE.description, label: action.HE.description,action :action.HE},
                { value: action.HNE.description, label: action.HNE.description,action :action.HNE},
                { value: action.TE.description, label: action.TE.description,action :action.TE},
                { value: action.TNE.description, label: action.TNE.description,action :action.TNE},
                { value: action.LIKE.description, label: action.LIKE.description,action :action.LIKE},
                { value: action.NOT_LIKE.description, label: action.NOT_LIKE.description,action :action.NOT_LIKE}
            ];
        }
    }
});