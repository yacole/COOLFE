define(["dojo/_base/declare","base/Util","dijit/layout/TabContainer","./Form","dojo/request",
    "layout/MenuBar","cmd/Command","./QueryForm","./QueryResult","./Report","layout/ToolBar"],
    function(declare,Util,TabContainer,Form,request,MenuBar,Command,QueryForm,QueryResult,Report,ToolBar){
        /*
         *   摘要:
         *       查询表单，用于对字段的查询，关联值列表
         */
        return declare("",[TabContainer],{

            //控制拖拽
            dndSource : null,
            //历史队列
            historyStack : null,
            //最大开启页签数
            tabMaxOpen : Util.config.tabMaxOpen,
            startup : function(){
                //初始化拖拽源
//                this.dndSource = new AutoSource(this.tablist.containerNode,{autoSync: true,horizontal : true});
                this.historyStack = new Array();
                this.inherited(arguments);
            },

            //打开程序
            //program_id : 程序id ； timestamp ： 时间戳 ；params ： 参数 ；pos ： 打开的位置；
            _openProgram : function(program_id,timestamp,params,pos){

                var tabpane = this;

                request.get(Util.url.find_program_byId({program_id : program_id}),{handleAs:"json"}).then(function(data){

                    //判断是否存在查询主页界面
                    if(data.home_page){
                        //如果已经有参数设定
                        if(params){
//                            console.info(params);
                            //则判断必输项参数是否填写，验证参数合法性过程
                            request.get( Util.url.ui_fieldlist_byid({program_id : data.home_page}),{handleAs: "json"}).then(function(response){
                                var fields = response.items;
                                var skipable = true;
                                if(fields){
                                    fields.forEach(function(field){
                                        //必输标识
                                        if(Util.xflag(field.required_flag)){
//                                            console.info(field);
                                            //检验必输项的值
                                            if(!params[field.field_name]){
                                                skipable = false;
                                            }
                                        }
                                    });

                                    if(skipable){
                                        //参数验证成功,直接打开程序
                                        tabpane._openWso(timestamp,data,params,pos);
                                    }else{
                                        //参数验证失败之后,选择打开主页
                                        tabpane._openProgram(data.home_page,timestamp,params,pos);
                                    }
                                }

                            });

                        }else{
                            //有主页无参数情况下，先打开主页
                            tabpane._openProgram(data.home_page,timestamp,params,pos);
                        }

                    }else{
                        //无主页情况下，直接打开
                        tabpane._openWso(timestamp,data,params,pos);
                    }

                },function(){
                    Command.show_dialog({content: Util.message.error_xhr_notreach});
                }); //request.get(Url.wor

            },

            //替换当前页：先关闭，再打开
            //checkDir是否检查脏数据
            _replaceProgram : function(program_id,timestamp,params,checkDirty){
                var indx = this.getIndexOfChild(this.currentChild());
                if(indx >= 0){
                    if(checkDirty){
                        this.closeProgram(this.currentChild());
                    }else{
                        this.removeChild(this.currentChild());
                    }
                    this._openProgram(program_id,timestamp,params,indx);

                }else{
                    this._openProgram(program_id,timestamp,params);
                }
            },

            //判断程序类型并打开相应的对象
            _openWso : function(timestamp,data,params,pos){

                //打开程序之前首先判断当前工作区的页签数量限制
                if(this.getChildren().length < this.tabMaxOpen){

                    var tabpane = this;

                    //创建系统菜单和工具栏
                    var sysMenuBar = new MenuBar({
                        id : Util.id.wso_MenuBar + timestamp,
                        program_id : data.program_id,
                        timestamp : timestamp
                    }).build();
                    sysMenuBar.set("class",Util.id.wso_MenuBar_class);

                    //获取工具栏
                    var sysToolBar = new ToolBar({
                        id : Util.id.wso_ToolBar + timestamp
                    });
                    sysToolBar.set("class",Util.id.wso_ToolBar_class);

                    //设置字段信息列表成功后创建对象
                    this.setFields(data.program_id,function(reponse){
                        //共享的一些参数
                        var wsoAtrributes = {
                            timestamp : timestamp,
                            program_id : data.program_id,
                            home_page : data.home_page,
                            title : data.title,
                            closable : true,
                            id : Util.id.wso_Child + timestamp,
                            fields :  reponse.items,
                            menuBar : sysMenuBar,
                            toolBar : sysToolBar
                        };
                        var wso ;

                        //判断程序类型，不同的程序类型，创建的模板不同
                        switch(data.program_type){

                            case Util.id.programTYPE_FORM:
                                wsoAtrributes.action = data.action;
                                wsoAtrributes.controller = data.controller;
                                wsoAtrributes.params = data.params;
                                //创建一个FORM工作区
                                wso = new Form(wsoAtrributes);
                                break;
                            case Util.id.programTYPE_REPORT:
                                wsoAtrributes.report_id = data.report_id;
                                //创建一个FORM工作区
                                wso = new Report(wsoAtrributes);
                                break;
                        } // switch(

                        //加入工作区并激活
                        tabpane.addChild(wso,pos);
                        tabpane.selectChild(wso);
                        //初始化工具栏
                        tabpane._setSysToolBar(wso);
                    });

                }else{
                    Command.show_dialog({content : Util.message.error_wsotab_openMax});
                }
            },

            //根据程序名称打开一个工作区对象
            //program_name ：程序名 ;target : "_self" | "_blank" ；params ： 参数；pos ： 打开位置
            openProgram_byName : function(program_name,target,params,pos){
                var wso = this;
                request.get(Util.url.find_program_byName({program_name : program_name}),{handleAs:"json"}).then(function(program){
//                    console.info(program);
                    wso.openProgram_byId(program.program_id,target,params,pos);
                },function(){
                    Command.show_dialog({content: Util.message.error_xhr_notreach});
                });
            },

            //根据程序名称打开一个工作区对象
            //program_id ：程序id ;target : "_self" | "_blank" ；params ： 参数；pos ： 打开位置
            //_self :        检查脏数据的替换 ；
            openProgram_byId : function(program_id,target,params,pos){
                var timestamp =  (new Date()).valueOf().toString();
                switch(target){
                    case "_self" :
                        this._replaceProgram(program_id,timestamp,params,true);
                        break;
                    case "_blank" :
                        this._openProgram(program_id,timestamp,params,pos);
                        break;
                    case "_selfNow" :
                        this._replaceProgram(program_id,timestamp,params,false);
                        break;
                    default :
                        this._openProgram(program_id,timestamp,params,pos);
                        break;
                }
            },

            //当前工作区对象
            currentChild : function(){
                return this.tablist._currentChild;
            }, //focusId :

            //关闭单个程序，关闭之前判断是否存在脏数据
            closeProgram : function(targetProgram){
                //判断是否有脏数据
                if(targetProgram.isDirty()){
                    if (confirm(Util.message.warnning_confirm_closeWso)){
                        this.removeChild(targetProgram);
                    }
                }else{
                    this.removeChild(targetProgram);
                }
            },

            //根据时间戳关闭其他程序
            closeOtherProgram : function(targetProgram){
                var wso = this;
                var pass = true;
                var deleteChildren = new Array();
                var passcount = 0;
                dojo.forEach(this.getChildren(),function(child){
                    //固定标签无法通过此方法删除
                    if(child != targetProgram && child.closable){
                        deleteChildren.push(child);
                        //判断是否有脏数据
                        if(child.isDirty() && passcount == 0){
                            passcount = passcount + 1;
                            pass = confirm(Util.message.warnning_confirm_closeWso);
                        }
                    }
                });
                //如果确定删除
                if(pass){
                    deleteChildren.forEach(function(e){
                       wso.removeChild(e);
                    });
                }
            },

            //根据时间戳关闭左边程序
            closeLeftProgram : function(targetProgram){
                var wso = this;
                var pass = true;
                var deleteChildren = new Array();
                var passcount = 0;
                var index = wso.getIndexOfChild(targetProgram);

                dojo.forEach(wso.getChildren(),function(child,i){
                    if(i < index && child.closable){
                        deleteChildren.push(child);
                        //判断是否有脏数据
                        if(child.isDirty() && passcount == 0){
                            passcount = passcount + 1;
                            pass = confirm(Util.message.warnning_confirm_closeWso);
                        }
                    }
                });
                //如果确定删除
                if(pass){
                    deleteChildren.forEach(function(e){
                        wso.removeChild(e);
                    });
                }
            },

            //根据时间戳关闭右边程序
            closeRightProgram : function(targetProgram){
                var wso = this;
                var pass = true;
                var deleteChildren = new Array();
                var passcount = 0;
                var index = wso.getIndexOfChild(targetProgram);

                dojo.forEach(wso.getChildren(),function(child,i){
                    if(i > index && child.closable){
                        deleteChildren.push(child);
                        //判断是否有脏数据
                        if(child.isDirty() && passcount == 0){
                            passcount = passcount + 1;
                            pass = confirm(Util.message.warnning_confirm_closeWso);
                        }
                    }
                });

                //如果确定删除
                if(pass){
                    deleteChildren.forEach(function(e){
                        wso.removeChild(e);
                    });
                }
            },

            //拷贝程序
            copyProgram : function(targetProgram){
                this.openProgram_byId(targetProgram.program_id,"_blank",targetProgram.params);
            },

            //由于时间戳为唯一标识，故可根据时间戳找到唯一的tab页
            getProgramBytimestamp : function(timestamp){
                var c ;
                dojo.forEach(this.getChildren(),function(child){
                    if(child.timestamp == timestamp){
                        c = child;
                    }
                });
                return c;
            },

            //获取工作区中第一个对象
            firstChild : function(){
              var wso = this;
              var c ;
                dojo.forEach(wso.getChildren(),function(child){
                    if(child.isFirstChild){
                        c = child;
                    }
                });
                return c;
            },

            //打开首页:根据个人设置
            openIndex : function(){

            },

            //重新刷新TabList：拖拽需要dojoDndItem class
            reflashTabList : function(){
                dojo.forEach(this.tablist.containerNode.childNodes,function(node){
                    dojo.toggleClass(node,"dojoDndItem",true);
                });

            },

            //重写关闭对象函数
            removeChild : function(node){
                //记录页签关闭历史
                Command.recordWso(node.program_id,node.title);
                this.inherited(arguments);
            },

            //刷性当前页内容
            refresh : function(targetProgram){
                //刷下字段列表:默认取消
                if(Util.config.autoReflashFieldList){
                    this.setFields(targetProgram.program_id,function(response){
                        targetProgram.fields = response.items;
                    });
                }
                targetProgram.refresh();

             }, //refresh

            //根据值列表打开查询界面
            openQForm : function(obj){

                request.get(Util.url.find_valuelist_byId({valuelist_id : obj.valuelist_id}),{handleAs:"json"}).then(function(data){
                    //如果存在则先销毁
                    var oldqform = dijit.byId(Util.id.queryform);
                    if(oldqform){
                        oldqform.destroyRecursive();
                    }

                    var oldrform = dijit.byId(Util.id.queryresult);
                    if(oldrform){
                        oldrform.destroyRecursive();
                    }

                    if(data.qform){
                        //存在Qform，打开查询界面
                        var qform = new QueryForm({
                            title : data.title,
                            id : Util.id.queryform,
                            href : Util.url.safeurl(data.controller,data.action),
                            onDownloadEnd : function(){
                                Util.queryTofillLabel(this.domNode,this.fields);
                            },
                            sourceObj : obj,
                            currentInput : obj.value
                        });
                        qform.show().then(function(){
                            //点击确定时,出现结果列表
                            var column = null;
                            var data = null;

                            var rs = new QueryResult({
                                column : column,
                                data : data,
                                id : Util.id.queryresult,
                                sourceObj : obj
                            });
                            rs.show();

                        },function(){
                            //点击取消时，隐藏

                        });

                    }else{
                        //不存在,直接出列表
                        var rs = new QueryResult({
                            url : Util.url.valuelist_selectOptions({valuelist_id : obj.valuelist_id}),
                            id : Util.id.queryresult,
                            sourceObj : obj
                        });
                        rs.show();
                    }



                },function(){
                    Command.show_dialog({content: Util.message.error_xhr_notreach});
                });
            },

            //设置wso的字段属性
            //program_id ： 程序id；func ：设置成功之后执行的函数
            setFields : function(program_id,func){
                request.get( Util.url.ui_fieldlist_byid({program_id : program_id}),{handleAs: "json"}).then(function(data){
//                    wso.fields = data.items;
                    if(func){
                        func(data);
                    }
                },function(){
                    Command.show_dialog({content: Util.message.error_xhr_notreach});
                });

            },
            _setSysToolBar : function(wso){
                //判断是否拥有主页
                var flag = true;
                if(wso.home_page){
                    flag = false;
                }
                wso.toolBar.homeButton.set("disabled",flag);
            }
        });
    });