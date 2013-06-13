define(["dojo/_base/declare", "dijit/layout/ContentPane", "dojo/request", "baf/dijit/layout/MenuBar",
    "baf/base/Util", "baf/command/Command", "baf/dijit/layout/ToolBar", "dojox/layout/ContentPane",
    "baf/wso/InnerForm", "dojo/dom-construct"],
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

            constructor : function(args){
                this.inherited(arguments);
            },

            startup : function(){
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

            }
        });
    });
