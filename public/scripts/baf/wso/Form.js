define(["dojo/_base/declare", "dijit/layout/ContentPane", "dojo/request", "layout/MenuBar",
    "base/Util", "cmd/Command", "layout/ToolBar", "dojox/layout/ContentPane","./InnerForm", "dojo/dom-construct"],
    function(declare,ContentPane,request,MenuBar,Util,Command,ToolBar,ContentPaneX,InnerForm,construct){
        /*
         *   摘要:
         *       工作区对象：表单
         */
        return declare("",[ContentPane],{
            //程序id
            program_id : null,
            //创建时间戳
            timestamp : null,
            //控制器 ，与action组合获取服务端url
            controller : null,
            //动作
            action : null,
            //参数
            params : null,
            //字段列表
            fields : null,
            //菜单栏
            menuBar : null,
            //工具栏
            toolBar : null,
            //表单内容面板，通过url加载
            contentPane : null,
            //主页程序id
            home_page : null,
            //内部form用于提交数据
            innerForm : null,
            //工作区对象：属于表单
            wsoType : Util.id.programTYPE_FORM,
            //页面跳转历史
            history : [],

            constructor : function(args){
                this.inherited(arguments);
            },

            startup : function(){
                var o = this;
                //加载系统菜单栏和工具栏
                this.addChild(this.menuBar);
                this.addChild(this.toolBar);

                //表单
                this.innerForm = new InnerForm({
                    id : Util.id.wso_innerForm  + this.timestamp,
                    formType : Util.id.formType_innerForm
                });
                this.addChild(this.innerForm);

                //内容包括在此面板中
                this.contentPane = new  ContentPaneX({
                    id : Util.id.wso_Content + this.timestamp,
                    href : Util.url.safeurl(this.controller,this.action,this.params),
                    title : this.title,
                    onDownloadEnd : function(){
                        //字段标签赋值
                        Util.queryTofillLabel();
                        //监控返回按钮
                        if(o.history.length > 0){
                            o.toolBar.backButton.set("disabled",false);
                        }else{
                            o.toolBar.backButton.set("disabled",true);
                        }
                    }
                });

                //内容面板加载
                construct.place(this.contentPane.domNode,this.innerForm.domNode);
                //fix bug IE:Expected identifier, string or number
                this.set("class",Util.id.wso_Content_class);
                this.innerForm.set("class",Util.id.wso_FormContent_class);

                this.inherited(arguments);

            },
            //关闭时，需要判断是否存在脏数据
            onClose : function(){
                if(this.isDirty()){
                    return confirm(Util.message.warnning_confirm_closeWso);
                }else{
                    return true;
                }
            },
            //表单内容面板动态转向
            directedTo : function(url){
                //记录页面url历史，便于返回
                this.history.push(this.contentPane.href);
                //当前页面跳转
                this.contentPane.set("href",url);
            },
            //判断是否存在脏数据
            isDirty : function(){
                //判断是否FORM中的必输项有值
                var wso = this;
                var fields = wso.fields;
                var isDirty = false;
                if(fields){
                    fields.forEach(function(field){
                        //必输标识
                        if(Util.xflag(field.required_flag) && !isDirty){
                            var target = dijit.byId(field.field_name+wso.timestamp);

                            if(target && target.value){
                                isDirty = true;
                            }
                        }
                    });
                }
                return isDirty;

            },
            //刷新
            refresh : function(){
                this.contentPane.refresh();
            },
            //返回上一页跳转的页面
            callback : function(){
                if(this.isDirty()){
                    if (confirm(Util.message.warnning_confirm_closeWso)){
                        this._backHistory();
                    }
                }else{
                    this._backHistory();
                }
            },
            //返回
            _backHistory : function(){
                var lastPos = this.history.length - 1;
                if(lastPos+1 > 0){
                    var url = this.history[lastPos];
                    this.contentPane.set("href",url);
                    this.history.splice(lastPos,1);
                }
            }

        });
    });
