define(["dojo/_base/declare","dojo/request","baf/dijit/Dialog",
    "baf/reporter/viewer/filter/_parameter","baf/dijit/form/TextBox","baf/dijit/form/Button",
    "baf/base/Util","dojo/data/ItemFileWriteStore","dijit/form/Select","baf/reporter/viewer/filter/_action",
    "baf/reporter/viewer/setup/_util"],
    function(declare,request,Dialog,Parameter,TextBox,Button,Util,ItemFileWriteStore,Select,action,u){
        /*
         *   摘要:
         *             过滤器，参数列表，用于viewer
         */
        return declare("",[],{
            //字段列表
            parameters : [],
            srcGrid : null,
            allItems : null,

            constructor : function(args){
                this.srcGrid = args.srcGrid;
                this.allItems = args.allItems;
            },
            //动态添加参数
            _createParameterBycellId : function(cellIndex){
                if(cellIndex != undefined){
                    var cell = this.srcGrid.getCell(cellIndex);
                    if(!this._hasParameter(cell.field)){
                        //选择了一列
                        var p = new Parameter();
                        //默认action
                        p.action = action.IN;
                        p.field = cell.field;
                        this.parameters.push(p);
                    }
                }
            },
            createParameter : function(field,actionName){
                if(!this._hasParameter(field)){
                    //选择了一列
                    var p = new Parameter();
                    var options = u.actionOptions();
                    options.forEach(function(op){
                        if(op.label == actionName){
                            p.action = op.action;
                        }
                    });
                    p.field = field;
                    this.parameters.push(p);
                }
            },
            //删除某个字段的过滤
            destroyParameter : function(field){
                if(this.parameters.length > 0){
                    for(var i=0;i<this.parameters.length;i++){
                        if(this.parameters[i].field == field){
                            this.parameters.splice(i,1);
                        }
                    }
                }
            },
            //清除过滤器
            clear : function(){
                this.parameters = [];
                this._setGridStore(this.allItems);
            },
            //过滤器参数选择界面
            show : function(cellIndex){
                var o = this;
                if(cellIndex != undefined){
                    this._createParameterBycellId(cellIndex);
                }
                //判断参数列表是否为空
                if(this.parameters.length > 0){
                    var pDialog = new Dialog({
                        title : Util.label.grid_filter,
                        href : Util.url.localUrl("reporter/viewer/filter/_filter.html"),
//                        style : "width:40em;height:30em",
                        onDownloadEnd : function(){
                            o.parameters.forEach(function(p){
                                //构建参数选择输入框
                                o._buildInputObj(p);
                                var label = document.createElement("label");
                                var tr = document.createElement("tr");
                                var td1 = document.createElement("td");
                                var td2 = document.createElement("td");
                                var td3 = document.createElement("td");
                                label.for = p.field;
                                label.innerHTML = Util.fieldLabel(p.field);
                                td1.appendChild(label);
                                var div = document.createElement("div");
                                //创建一个下拉菜单，用于选择计算符
                                var options = u.actionOptions();
                                options.forEach(function(op){
                                    if(op.value == p.action.name){
                                        op.selected = true;
                                    }
                                });

                                var s = new Select({
                                    options : options,
                                    onChange : function(){
                                        p.action = o._getActionByName(this.value);
                                        //刷新输入框
                                        o._buildInputObj(p);
                                        td3.appendChild(p.inputObj.domNode);
                                    }
                                });
                                div.appendChild(s.domNode);

                                td2.appendChild(div);
                                td3.appendChild(p.inputObj.domNode);
                                tr.appendChild(td1);
                                tr.appendChild(td2);
                                tr.appendChild(td3);
                                dojo.byId("filter_table").appendChild(tr);
                            });

                            //加上确认按钮
                            var bt = new Button({
                                label : Util.label.button_confirm,
                                onClick : function(){
                                    //设置此次的选择值，并在参数队列中激活此参数，下次打开后依然存在
                                    o._focusParameters();
                                    o.setFilter();
                                    pDialog.hide();
                                }
                            });
                            dojo.byId("filterSubmit").appendChild(bt.domNode);
                        }
                    });
                    pDialog.show();
                    //清除非激活参数
                    dojo.connect(pDialog,"onHide",function(){
                        o._clearUnFocus();
                    });
                }
            },
            //构建参数选择
            _buildInputObj : function(p){
                if(p.inputObj){
                    p.inputObj.destroyRecursive();
                }
                var inputParam = new Object();
                inputParam.name =  p.field;
                inputParam.value =  p.value;
                //除了LIKE和NOT LIKE不能选择
                if(p.action != action.LIKE && p.action != action.NOT_LIKE && p.action != action.HE
                    && p.action != action.HNE && p.action != action.TE && p.action != action.TNE){
                    inputParam.canSelect = true;
                    inputParam.selectData = this._columnData(p.field);
                    switch(p.action){
                        case action.IN :
                            inputParam.mulitSelect = true;
                            break;
                        case action.NOT_IN:
                            inputParam.mulitSelect = true;
                            break;
                        default :
                            inputParam.mulitSelect = false;
                            break;
                    }
                }
                p.inputObj = new TextBox(inputParam);
            },
            //是否包含参数
            _hasParameter : function(field){
                var rt = false;
                if(this.parameters.length > 0){
                    for(var i=0;i<this.parameters.length;i++){
                        if(this.parameters[i].field == field){
                            rt = true;
                        }
                    }
                }
                return rt;
            },
            //全部激活
            _focusParameters : function(){
                if(this.parameters.length > 0){
                    this.parameters.forEach(function(p){
                        //获取参数对应的对象
                        var obj = Util.dijit_byId(p.field);
                        if(obj){
                            p.value = obj.value;
                        }
                        p.focus = true;
                    });
                }
            },
            //清除未激活参数
            _clearUnFocus : function(){
                var params = this.parameters;
                if(params.length > 0){
                    params.forEach(function(p,i){
                        if(!p.focus){
                            params.splice(i,1);
                        }
                    });
                }
            },
            //重新设置gird数据
            _setGridStore : function(items){
                var data = {items : items};
                var store = new ItemFileWriteStore({
                    data : data
                });
                this.srcGrid.refresh(store);
            },
            //设置过滤器
            setFilter : function(){
                var newItems = [];
                if(this.allItems.length > 0 && this.parameters.length > 0){
                    for(var i=0;i<this.allItems.length;i++){
                        var item = this.allItems[i];
                        //返回的行数据
                        var rtItem = new Object();
                        //通过所有参数过滤
                        this.parameters.forEach(function(p){
                            switch(p.action){
                                case action.EQ:
                                    if(item[p.field].toString() == p.value){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
                                    }
                                    break;
                                case action.NE:
                                    if(item[p.field].toString() != p.value){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
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
                                            rtItem = item;
                                        }else{
                                            rtItem = null;
                                        }
                                    }else{
                                        if(item[p.field].toString() != p.value){
                                            rtItem = item;
                                        }else{
                                            rtItem = null;
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
                                        if(rtflag){
                                            rtItem = null;
                                        }else{
                                            rtItem = item;
                                        }
                                    }else{
                                        if(item[p.field].toString() != p.value){
                                            rtItem = item;
                                        }else{
                                            rtItem = null;
                                        }
                                    }
                                    break;

                                case action.GT:
                                    if(item[p.field].toString() > p.value){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
                                    }
                                    break;
                                case action.GE:
                                    if(item[p.field].toString() >= p.value){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
                                    }
                                    break;
                                case action.LT:
                                    if(item[p.field].toString() < p.value){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
                                    }
                                    break;
                                case action.LE:
                                    if(item[p.field].toString() <= p.value){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
                                    }
                                    break;
                                case action.HE:
                                    if(item[p.field].toString().indexOf(p.value) == 0){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
                                    }
                                    break;
                                case action.HNE:
                                    if(item[p.field].toString().indexOf(p.value) != 0){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
                                    }
                                    break;
                                case action.TE:
                                    var str = item[p.field].toString();
                                    var wlen = p.value.length;
                                    if(wlen > str.length){
                                        rtItem = null;
                                    }else{
                                        var s = str.substr(str.length - wlen,wlen);
                                        if(s == p.value){
                                            rtItem = item;
                                        }else{
                                            rtItem = null;
                                        }
                                    }
                                    break;
                                case action.TNE:
                                    var str = item[p.field].toString();
                                    var wlen = p.value.length;
                                    if(wlen > str.length){
                                        rtItem = null;
                                    }else{
                                        var s = str.substr(str.length - wlen,wlen);
                                        if(s != p.value){
                                            rtItem = item;
                                        }else{
                                            rtItem = null;
                                        }
                                    }
                                    break;
                                case action.LIKE:
                                    if(item[p.field].toString().indexOf(p.value) >= 0){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
                                    }
                                    break;
                                case action.NOT_LIKE:
                                    if(item[p.field].toString().indexOf(p.value) < 0){
                                        rtItem = item;
                                    }else{
                                        rtItem = null;
                                    }
                                    break;
                                default:
                                    rtItem = null;
                                    break;
                            }

                       });//foreach
                        if(rtItem){
                            newItems.push(rtItem);
                            rtItem = null;
                        }
                   }//for
                }//if
                this._setGridStore(newItems);
            },
            //获取单列的数据
            _columnData : function(field){
                var data = {items:[]};
                var items = this.allItems;
                var tmp = [];
                if(items.length > 0){
                    items.forEach(function(item){
                        tmp.push(item[field].toString());
                    });
                    //排除重复性
                    Util.unique(tmp).forEach(function(item){
                        data.items.push({value : item});
                    });
                }
                return data;
            },
            //根据名称查找Action
            _getActionByName : function(name){
                var rtAction = new Object();
                u.actionOptions().forEach(function(e){
                    if(e.value == name){
                        rtAction = e.action;
                    }
                });
                return rtAction;
            }

        });
    });