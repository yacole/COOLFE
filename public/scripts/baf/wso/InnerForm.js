define(["dojo/_base/declare", "form/Form", "base/Util", "base/Env","cmd/Command", "dojo/request", "dojo/dom-form"],
    function(declare,Form,Util,Env,Command,request,domForm){
        /*
         *   摘要:
         *       表单组件，用于提交数据到服务端
         */
        return declare("",[Form],{

            formType : Util.id.formType_innerForm,
            //被指定的参数，忽略原有的参数获取方法
            parameter : null,

            // 重写了提交函数，改用AJAX提交
            onSubmit : function(){
                var params = new Object();
                var o = this;
                if(!this.parameter){
                    params = domForm.toObject(this.id);
                    var wso = Env.currentWso();
                    var objlist = wso.contentPane.getChildren();

                    //如果没有指定action则默认程序本身
                    if(!this.action){
                        this.set("action",Util.url.safeurl(wso.controller,wso.action))
                    }

                    //查找FORM中是否存在Editor
                    var editors = Util.query("div .dijitEditor");
                    if(editors.length > 0){
                        var editor = dijit.byNode(editors[0]);
                        params[editor.name] = Util.trim(editor.value);
                    }

                    //加入key值:实际输入值，通常为id
                    if(objlist){
                        objlist.forEach(function(entry){
                            if(entry.key){
                                params[entry.name+"_key"] = entry.key;
                            }
                        })
                    }
                }else{
                    params = this.parameter;
                }
                this.formValidate(function(){
                    //如果已经通过验证，则直接提交表单
                    Util.post(o.action,params,o.successFunc,o.failureFunc);

                });

                return false;
            },
            successFunc : function(){},
            failureFunc : function(){}
        });
    });