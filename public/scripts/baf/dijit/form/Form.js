define(["dojo/_base/declare", "dijit/form/Form", "baf/base/Util", "baf/base/Env",
    "baf/command/Command", "dojo/request", "dojo/dom-form"],
    function(declare,Form,Util,Env,Command,request,domForm){
        /*
         *   摘要:
         *       表单组件
         */
        return declare("",[Form],{
            //不提交标识
            unsubmit : false,
            formType : Util.id.formType_normalForm,

            constructor : function(args){

                if(args.formType != Util.id.formType_innerForm){
                    if(!args.id){
                        args.id = Util.xId(args.name);
                    }else{
                        args.id = Util.xId(args.id);
                    }
                }

            },
            reset : function(){
                //清空描述区域
                var qrs = dojo.query("span[for]",this.domNode);
                if(qrs.length > 0){
                    qrs.forEach(function(e){
                        e.innerHTML = "";
                    });
                }
                this.inherited(arguments);
            },
            //验证表单输入
            // validFun : 验证成功后运行此函数 ；invalidFun : 验证失败后运行此函数 ；
            //  noError : 是否高亮标注验证失败字段 ；containerObj ：区域对象，默认为自身
            formValidate : function(validFun,invalidFun,noError,containerObj){
                var wso = Env.currentWso();

                //初始化区域对象
                if(!containerObj){
                    containerObj = this;
                }

                var objlist = containerObj.getChildren();

                //判断是否可提交
                if(this.validate()){
                    var validObj = new Object();
//                    console.info(objlist);
                    //获取需要远程验证的字段
                    if(objlist){
                        validObj["program_id"] = wso.program_id;
                        objlist.forEach(function(entry){
//                            console.info(entry.value);
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

                                //成功函数
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
            //展示错误漂浮提示
            _renderError : function(obj){
                obj.focus();
                obj.set("state","Error");
                obj.displayMessage(obj.remoteValidator.invalidmessage);
            }

        });
    });