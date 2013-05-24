/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-26
 * Time: 上午10:15
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dijit/form/Form",
    "baf/base/Util",
    "baf/base/Env",
    "baf/command/Command",
    "dojo/request",
    "dojo/dom-form"],
    function(declare,Form,Util,Env,Command,request,domForm){
        return declare("",[Form],{

            onSubmit : function(){
                var params = domForm.toObject(this.id);
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

                var form = this;

                this.formValidate(function(){
                    //如果已经通过验证，则直接提交表单
                    request.post(form.action,{
                        data : params,
                        timeout : 2000
                    }).then(function(response){

                    },function(error){

                    });
                },function(){
                    console.info("未通过验证");
                });

                return false;
            },
            //验证表单输入
            // validFun : 验证成功后运行此函数
            // invalidFun : 验证失败后运行此函数
            // noError : 是否高亮标注验证失败字段
            // needValid : 相反的验证高亮标注
            formValidate : function(validFun,invalidFun,noError,needValid){
                var wso = Env.currentWso();

                var objlist = wso.contentPane.getChildren();

                //判断是否可提交
                if(this.validate()){
                    var validObj = new Object();

                    //获取需要远程验证的字段
                    if(objlist){
                        validObj["program_id"] = wso.program_id;
                        objlist.forEach(function(entry){
                            if(entry.remoteValidator && entry.value){
                                validObj[entry.name] = entry.value;
                            }
                        })
                    }

//                    console.info(validObj);

                    var form = this;

                    //提交远程验证
                    request.post(Util.url.safeurl("bc/validator","validate"),{
                        data : validObj,
                        timeout : 2000,
                        handleAs : "json"
                    }).then(function(response){
//                            console.info(response);
                            if(response.isValid){

                                if(needValid){
                                    var fields = response.valid;
                                    if(fields.length > 0){
                                        fields.forEach(function(e){
                                            form._renderValid(Util.dijit_byId(e));
                                        });
                                    }
                                }

                                if(validFun){
                                    validFun();
                                }

                            }else{
                                //是否高亮标识错误
                                if(!noError){
                                    var fields = response.inValid;
                                    if(fields.length > 0){
                                        fields.forEach(function(e){
                                            form._renderError(Util.dijit_byId(e));
                                        });
                                    }
                                }
                                //失败函数
                                if(invalidFun){
                                    invalidFun();
                                }
                            }

                        },function(error){

                        });
                }//endif
            },
            _renderError : function(obj){
                obj.focus();
                obj.set("state","Error");
                obj.displayMessage(obj.remoteValidator.invalidmessage);
            },
            _renderValid : function(obj){
                obj.focus();
                obj.set("state","Error");
                obj.displayMessage(obj.remoteValidator.validmessage);
            }

        });
    });