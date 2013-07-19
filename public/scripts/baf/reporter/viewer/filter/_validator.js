define(["baf/reporter/viewer/filter/_action","baf/reporter/viewer/_string"],
    function(action,string){
    return {
        validate : function(allItems,parameters){
            var o = this;
            var newItems = [];
            if(allItems.length > 0 && parameters.length > 0){
                for(var i=0;i<allItems.length;i++){
                    var item = allItems[i];
                    //返回标识
                    var find_flag = false;
                    var oldflag = false;

                    //通过所有参数过滤
                    parameters.forEach(function(p,y){
                        oldflag = find_flag;
                        find_flag = false;
                        switch(p.action){
                            case action.EQ:
                                if(item[p.field].toString() == p.value){
                                    find_flag = true;
                                }
                                break;
                            case action.NE:
                                if(item[p.field].toString() != p.value){
                                    find_flag = true;
                                }
                                break;
                            case action.IN:
                                var values = p.value.split(",");
                                if(values.length > 0){
                                    var rtflag = false;
                                    for(var i=0;i<values.length;i++){
                                        if(item[p.field].toString() == values[i]){
                                            rtflag = true;
                                        }
                                    }
                                    //查找结果
                                    if(rtflag){
                                        find_flag = true;
                                    }
                                }else{
                                    if(item[p.field].toString() != p.value){
                                        find_flag = true;
                                    }
                                }
                                break;
                            case action.NOT_IN:
                                var values = p.value.split(",");
                                if(values.length > 0){
                                    var rtflag = false;
                                    for(var i=0;i<values.length;i++){
                                        if(item[p.field].toString() == values[i]){
                                            rtflag = true;
                                        }
                                    }
                                    //查找结果
                                    if(!rtflag){
                                        find_flag = true;
                                    }
                                }else{
                                    if(item[p.field].toString() != p.value){
                                        find_flag = true;
                                    }
                                }
                                break;

                            case action.GT:
                                //判断数字类型
                                if(string.isNumber(o.notNULLcolumn(allItems,p.field))){
                                    if(Number(item[p.field].toString()) > Number(p.value)){
                                        find_flag = true;
                                    }
                                }else{
                                    if(item[p.field].toString() > p.value){
                                        find_flag = true;
                                    }
                                }
                                break;
                            case action.GE:
                                //判断数字类型
                                if(string.isNumber(o.notNULLcolumn(allItems,p.field))){
                                    if(Number(item[p.field].toString()) >= Number(p.value)){
                                        find_flag = true;
                                    }
                                }else{
                                    if(item[p.field].toString() >= p.value){
                                        find_flag = true;
                                    }
                                }
                                break;
                            case action.LT:
                                //判断数字类型
                                if(string.isNumber(o.notNULLcolumn(allItems,p.field))){
                                    if(Number(item[p.field].toString()) < Number(p.value)){
                                        find_flag = true;
                                    }
                                }else{
                                    if(item[p.field].toString() < p.value){
                                        find_flag = true;
                                    }
                                }
                                break;
                            case action.LE:
                                //判断数字类型
                                if(string.isNumber(o.notNULLcolumn(allItems,p.field))){
                                    if(Number(item[p.field].toString()) <= Number(p.value)){
                                        find_flag = true;
                                    }
                                }else{
                                    if(item[p.field].toString() <= p.value){
                                        find_flag = true;
                                    }
                                }
                                break;
                            case action.HE:
                                if(item[p.field].toString().indexOf(p.value) == 0){
                                    find_flag = true;
                                }
                                break;
                            case action.HNE:
                                if(item[p.field].toString().indexOf(p.value) != 0){
                                    find_flag = true;
                                }
                                break;
                            case action.TE:
                                var str = item[p.field].toString();
                                var wlen = p.value.length;
                                if(wlen <= str.length){
                                    var s = str.substr(str.length - wlen,wlen);
                                    if(s == p.value){
                                        find_flag = true;
                                    }
                                }
                                break;
                            case action.TNE:
                                var str = item[p.field].toString();
                                var wlen = p.value.length;
                                if(wlen <= str.length){
                                    var s = str.substr(str.length - wlen,wlen);
                                    if(s != p.value){
                                        find_flag = true;
                                    }
                                }
                                break;
                            case action.LIKE:
                                if(item[p.field].toString().indexOf(p.value) >= 0){
                                    find_flag = true;
                                }
                                break;
                            case action.NOT_LIKE:
                                if(item[p.field].toString().indexOf(p.value) < 0){
                                    find_flag = true;
                                }
                                break;
                            default:
                                break;
                        }

                        if(y > 0){
                            find_flag = find_flag && oldflag;
                        }
                    });//foreach

                    if(find_flag){
                        newItems.push(item);
                    }
                }//for
            }//if
            return newItems;
        },
        //获取非空行中的字段
        notNULLcolumn : function(allItems,field){
            var items = allItems;
            var rts = "";
            if(items.length > 0){
                items.forEach(function(item){
                    if(item[field] && item[field].toString() != "" && rts == ""){
                        rts = item[field].toString();
                    }
                });
            }
            return rts;
        }
    }
});