define(["dojo/_base/declare","baf/dijit/Dialog","./_parameter","form/TextBox","form/Button",
    "base/Util","dojo/data/ItemFileWriteStore","form/Select","./_action","../setup/_util",
    "./_validator","form/DateTextBox"],
    function(declare,Dialog,Parameter,TextBox,Button,Util,ItemFileWriteStore,Select,action,u,validator,DateTextBox){
        /*
         *   摘要:
         *             过滤器，参数列表，用于viewer
         */
        return declare("",[],{
            //字段列表
            parameters : [],
            srcGrid : null,

            constructor : function(args){
                this.srcGrid = args.srcGrid;
            },
            //动态添加参数
            _createParameterBycellId : function(cellIndex){
                if(cellIndex != undefined){
                    var cell = this.srcGrid.getCell(cellIndex);
//                    console.info(cell.field);
//                    console.info(this._hasParameter(cell.field,undefined,false));
                    if(!this._hasParameter(cell.field,undefined,false)){
                        //选择了一列
                        var p = new Parameter();
                        //默认action
                        p.action = action.IN;
                        p.field = cell.field;
                        this.parameters.push(p);
                    }
                }
            },
            createParameter : function(field,actionName,value,focus){
                var p = new Parameter();
                p.action = this.getActionByName(actionName);
                p.field = field;
                p.value = value;
                p.focus = focus;
                this.parameters.push(p);
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
            //获取某个参数
            getParameter : function(field,action,focus){
                var rtp = null;
                focus = (focus == undefined ? false : true);
                if(this.parameters.length > 0){
                    for(var i=0;i<this.parameters.length;i++){
                        var p = this.parameters[i];
                        if(action == undefined){
                            if(p.field == field && p.focus == focus){
                                rtp  = this.parameters[i];
                            }
                        }else{
                            if(p.field == field && p.action == action  && p.focus == focus){
                                rtp  = this.parameters[i];
                            }
                        }
                    }
                }
                return rtp;
            },
            //清除过滤器
            clear : function(){
                this.clearParameters();
                this._setGridStore(this.srcGrid.snapItems);
            },
            clearParameters : function(){
                this.parameters = [];
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
                        href : Util.url.report_filter_template(),
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
                                    if(op.value == p.action.description){
                                        op.selected = true;
                                    }
                                });

                                var s = new Select({
                                    options : options,
                                    onChange : function(){
                                        p.action = o.getActionByName(this.value);
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
//                inputParam.name =  p.field;
                inputParam.value =  p.value;
                //判断是否为日期，如果为日期字段则生成日期选择框
                if(Util.string.isDateStr(Util.notNULLcolumn(this.srcGrid.snapItems, p.field))){
                    p.inputObj = new DateTextBox({
                        constraints: {datePattern: "yyyy-MM-dd"},
                        value : p.value
                    });
                }else{
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
                }

            },
            //是否包含参数
            _hasParameter : function(field,action,focus){
//                console.info(this.getParameter(field,action,focus));
                return (this.getParameter(field,action,focus) != null);
            },
            //全部激活
            _focusParameters : function(){
                if(this.parameters.length > 0){
                    this.parameters.forEach(function(p){
                        //dojo.date.locale.format(dateBox.value, {datePattern: "yyyy-MM-dd", selector: "date"})
                        p.value = p.inputObj.displayedValue;
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
                var newItems = validator.validate(this.srcGrid.snapItems,this.parameters);
                this._setGridStore(newItems);
            },
            //获取单列的数据
            _columnData : function(field){
                var data = {items:[]};
                var items = this.srcGrid.snapItems;
                var tmp = [];
                if(items.length > 0){
                    items.forEach(function(item){
                        tmp.push(item[field].toString());
                    });
                    //排序
                    tmp.sort();
                    //排除重复性
                    Util.unique(tmp).forEach(function(item){
                        data.items.push({value : item});
                    });
                }
                return data;
            },
            //根据名称查找Action
            getActionByName : function(name){
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