define(["dojo/_base/declare","dijit/layout/ContentPane","dojo/request","baf/dijit/Dialog",
    "baf/reporter/viewer/filter/_parameter","baf/dijit/form/TextBox","baf/dijit/form/Button",
    "baf/base/Util"],
    function(declare,ContentPane,request,Dialog,Parameter,TextBox,Button,Util){
        /*
         *   摘要:
         *             过滤器，参数列表，用于viewer
         */
        return declare("",null,{
            //字段列表
            parameters : [],
            setupPane : null,
            parameterPane : null,
            srcGrid : null,

            //获取参数
            getParameters : function(){

            },
            //动态添加参数
            _createParameter : function(cellIndex){
                if(cellIndex){
                    var cell = this.srcGrid.getCell(cellIndex);
                    if(!this._hasParameter(cell.field)){
                        //选择了一列
                        var p = new Parameter();
                        p.cell = this.srcGrid.getCell(cellIndex);
                        this.parameters.push(p);
                    }
                }
            },
            //删除某个字段的过滤
            destroyParameter : function(field){
                if(this.parameters.length > 0){
                    for(var i=0;i<this.parameters.length;i++){
                        if(this.parameters[i].cell.field == field){
                            this.parameters.splice(i,1);
                        }
                    }
                }
            },
            //清除过滤器
            clear : function(){
                this.parameters = [];
            },
            //过滤器配置面板
            buildSetupPane : function(){
                this.setupPane = new ContentPane({
                    title : "过滤器",
                    content : "gogo"
                });
            },
            //过滤器参数选择界面
            show : function(cellIndex){
                var o = this;
                this._createParameter(cellIndex);
                //判断参数列表是否为空
                if(this.parameters.length > 0){
                    var pDialog = new Dialog({
                        title : "过滤器",
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
                                label.for = p.cell.field;
                                label.innerHTML = Util.fieldLabel(p.cell.field);
                                td1.appendChild(label);
                                var div = document.createElement("div");
                                div.innerHTML = p.action;
                                td2.appendChild(div);
                                td3.appendChild(p.inputObj.domNode);
                                tr.appendChild(td1);
                                tr.appendChild(td2);
                                tr.appendChild(td3);
                                dojo.byId("filter_table").appendChild(tr);
                            });

                            //加上确认按钮
                            var bt = new Button({
                                label : "确认",
                                onClick : function(){
                                    //设置此次的选择值，并在参数队列中激活此参数，下次打开后依然存在
                                    o._focusParameters();
                                    pDialog.hide();
                                }
                            });
                            dojo.byId("filter_submit").appendChild(bt.domNode);
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
                switch(p.action){
                    case "EQ":
                        p.inputObj = new TextBox({
                            name : p.cell.field,
                            //有查找按钮
                            canSelect : true,
                            selectData : this.srcGrid.columnData(p.cell.index),
                            mulitSelect : false
                        });
                        break;
                    default :
                        p.inputObj = new TextBox({
                            name : p.cell.field,
                            //有查找按钮
                            canSelect : true,
                            selectData : this.srcGrid.columnData(p.cell.index),
                            mulitSelect : true
                        });
                        break;
                }
            },
            //是否包含参数
            _hasParameter : function(field){
                var rt = false;
                if(this.parameters.length > 0){
                    for(var i=0;i<this.parameters.length;i++){
                        if(this.parameters[i].cell.field == field){
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
            }

        });
    });