define(["dojo/_base/declare",
    "dijit/layout/ContentPane",
    "dojo/request",
    "baf/dijit/layout/MenuBar",
    "baf/base/Util",
    "baf/command/Command",
    "baf/dijit/layout/ToolBar",
    "dojox/layout/ContentPane",
    "baf/wso/InnerForm",
    "dojo/dom-construct",
    "baf/base/Env"],
    function(declare,ContentPane,request,MenuBar,Util,Command,ToolBar,ContentPaneX,InnerForm,construct,ENV){
        return declare("baf.wso.Form",[ContentPane],{
            program_id : null,
            timestamp : null,
            controller : null,
            action : null,
            params : null,
            fields : null,
            menuBar : null,
            toolBar : null,
            contentPane : null,
            home_page : null,
            home_url : null,
            //表单
            innerForm : null,
            wsoType : Util.id.programTYPE_FORM,
            isParse : false,

            constructor : function(args){
                this.inherited(arguments);
            },

            startup : function(){

//                console.info(timestamp);
                var form = this;

                //获取菜单栏
                form.menuBar = new MenuBar({
                    id : Util.id.wso_MenuBar + form.timestamp
                }).build(form.program_id);
                form.addChild(form.menuBar);

                //获取工具栏
                form.toolBar = new ToolBar({
                    id : Util.id.wso_ToolBar + form.timestamp,
                    style : ""
                });
                form.addChild(form.toolBar);

                //表单
                form.innerForm = new InnerForm({
                    id : Util.id.wso_innerForm  + form.timestamp
                });

                form.addChild(form.innerForm);

                //内容包括在此面板中
                form.contentPane = new  ContentPaneX({
                    id : Util.id.wso_Content + form.timestamp,
                    href : Util.url.safeurl(form.controller,form.action,form.params),
//                    class : Util.id.wso_Content_class,
                    title : form.title,
                    onDownloadEnd : function(){
                        //字段标签赋值
                        Util.queryTofillLabel();
                    }
                });
//                form.contentPane.startup();

                //内容面板加载
                construct.place(form.contentPane.domNode,form.innerForm.domNode);
                //fix bug IE:Expected identifier, string or number
                form.set("class",Util.id.wso_Content_class);
                form.innerForm.set("class",Util.id.wso_FormContent_class);

                this.inherited(arguments);

            },
            currentInnerForm : function(){
                var form = this;
                var returnForm ;
                var innerform = dojo.query('form',form.domNode);
                if(innerform){
                    innerform.forEach(function(e){
                        f = dijit.byNode(e);
                        if(!f && !f.unsubmit){
                            returnForm = f;
                        }
                    })
                }
                return returnForm;
            },
            onClose : function(){
                if(this.isDirty()){
                    return confirm(Util.message.warnning_confirm_closeWso);
                }else{
                    return true;
                }
            },
            directedTo : function(url){
                console.info(url);
                //当前页面跳转
                this.contentPane.set("href",url);
            },
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
