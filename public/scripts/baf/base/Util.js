var language = "zh"; //全局变量：用于控制语言包,默认为"zh"

define(["baf/config/Url", "baf/language/"+language+"/Label", "baf/language/"+language+"/Message",
    "baf/config/Idlist", "baf/config/Config", "dojo/dom-construct", "dijit/Dialog",
    "dijit/form/Button","dojo/request","baf/command/Command"],
    function(url,label,message,id,config,domConstruct,Dialog,Button,request,Command){
        /*
         *   摘要:
         *       主要是存放一些公用的函数和工具，创建各种工具的快捷通道，比如，url,label,message,id,config等，
         *       通过更改语言language变量来达到对不同语言的需求；
         */
        return {
            //以下都是用于创建其他常用工具模块的快速链接
            url : url , //用于封装超链接
            label : label,  //用于存放标题和短语
            message : message,  //用于存放系统中提示框的内容
            id : id,    //用于封装程序中用到的ID
            config : config,    //配置文件

            /*
            * 公用函数：字符串处理，ui处理等等
            */
            //转换字段成boolean
            //field : 字段值
            xflag : function(field){
                //如果本来就是boolean类型则返回自身
                if(typeof field === 'boolean'){
                    return field;
                }else{
                    return field == '1' ? true : false;
                }
            },
            //处理checkbox的勾选返回结果
            xchecked : function(flag){
                if(flag && flag == "on"){
                    return 1;
                } else{
                    return 0;
                }
            },
            //获取当前工作区中聚焦对象
            currentWso : function(){
              return dijit.byId(this.id.WorkspacePane).currentChild();
            },
            //生成当前时间戳的ID
            xId : function(id){
                return id + this.currentWso().timestamp;
            },
            //替代dojo.query,默认范围为当前工作区对象内
            query : function(args){
                var targetDomNode = this.currentWso().domNode;
                return dojo.query(args,targetDomNode);
            },
            //替代dom.byId，默认查找当前工作区
            dom_byId : function(id){
                return dojo.byId(this.xId(id));
            },
            //替代dijit.byId
            dijit_byId : function(id){
                return dijit.byId(this.xId(id));
            },
            //将node插入到id对应的区域
            placeAt : function(node,id){
                var target = this.query("div #"+id)[0];
                domConstruct.place(node,target);
            },
            //获取当前时间戳
            now : function(){
                return Math.round(new Date().getTime()/1000);
            },
            hasChildren : function(data){
                if(data && data.items && data.items.length > 0){
                    return true;
                }else{
                    return false;
                }
            },
            //远程提交post
            post : function(url,data,successFunc,failureFunc){
              request.post(url,{
                  data : data,
                  timeout : config.remote_timeout,
                  handleAs : "json"
              }).then(function(response){
                  Command.handleExport(response);
                  if(successFunc){
                      successFunc();
                  }
              },function(error){
                  Command.show_dialog({content : error});
                  if(failureFunc){
                      failureFunc();
                  }
              });
            },
            //输出报错到控制台
            postEcho : function(url,data){
                request.post(url,{
                    data : data,
                    timeout : config.remote_timeout
                }).then(function(response){
                        Command.show_dialog(response);
                },function(error){
                    Command.show_dialog({content : error});
                });
            },

            /*
                当前页签的字段操作
            */
            //在字段列表中查询字段
            //field_name ： 字段名 ；fields ： 字段列表
            field : function(field_name,fields){
                //当字段列表未被定义时，默认为当前工作区的字段列表
                if(!fields){
                    fields = this.currentWso().fields;
                }
                var vfield = null;
                if(fields){
                    fields.forEach(function(field){
                        if(field.field_name == field_name){
                            vfield = field;
                        }
                    });
                }
                return vfield;
            },
            //获取字段标签
            //field_name ：字段名 ；fileds ： 字段列表
            fieldLabel : function(field_name,fields){
                var f = this.field(field_name,fields);
                if(f){
                    return f.label;
                }else{
                    return field_name;
                }
            },
            //获取字段长度
            //field_name ：字段名 ；fileds ： 字段列表
            fieldSize : function(field_name){
                var f = this.field(field_name);
                if(f){
                    return f.field_size;
                }else{
                    return this.config.gridColumnWidth;
                }
            },
            //填充指定字段的标签
            fillLabel : function(field_name){
                var l = this.query("label[for=" + field_name + "]")[0];
                if(l){
                    l.innerHTML = this.fieldLabel(field_name);
                }
            },
            //填充指定字段对应的输入框以及描述区域
            //filed_name : 字段名 ； value : 输入框内容 ；description ： 描述区域内容 ；scope ：范围限定
            fillValue : function(field_name,value,description,scope){
//                console.info(field_name + ":" + value);
                //字段以及字段描述区域
                var target,target_desc;
//                console.info("scope:" + scope);
                if(scope){
                    target = dojo.query("input[name=" + field_name + "]",scope);
                }else{
                    target = this.query("input[name=" + field_name + "]");
                }
                if(target.length > 0){
                    if(target[0].type == "checkbox"){
                        var widget = dijit.getEnclosingWidget(target[0]);
                        widget.set('checked',this.xflag(value));
                    }else{
                        target[0].value = value;
                    }
                }
                //字段描述区域
                if(description){
                    if(scope){
                        target_desc = dojo.query("span[for=" + field_name + "]",scope);
                    }else{
                        target_desc = this.query("span[for=" + field_name + "]");
                    }
                    //赋值
                    if(target_desc.length > 0){
                        target_desc[0].innerHTML = description;
                    }
                }
            },
            //填充范围内容的所有标签
            //scope ： 范围 ； fields ： 字段列表
            queryTofillLabel : function(scope,fields){
                if(!fields){
                    fields = this.currentWso().fields;
                }
                var nodelist;
                if(scope){
                    nodelist = dojo.query("label[for]",scope);
                }else{
                    nodelist = this.query("label[for]");
                }
                var util = this;
                if(nodelist){
                    nodelist.forEach(function(target){
//                        target.innerHTML = util.fieldLabel(target.for);
                        if(target.innerHTML == ""){
                            target.innerHTML = util.fieldLabel(target.getAttribute("for"),fields);
                        }
                    });
                }

            },
            //获取描述字段的值
            getDesc : function(field_name,scope){
                var target,desc;
                if(scope){
                    target = dojo.query("span[for=" + field_name + "]",scope);
                }else{
                    target = this.query("span[for=" + field_name + "]");
                }
//                console.info(target);
                //赋值
                if(target.length > 0){
                    desc = this.trim(target[0].innerHTML);
                }
                return desc;
            },

            /*
                字符串空格处理
             */
            //去左空格;
            ltrim : function(string){
                return string.replace(/^\s*/, "");
            },
            //去右空格;
            rtrim : function(string){
                return string.replace(/\s*$/, "");
            },
            //去左右空格
            trim : function(string){
                //s.replace(/(^s*)|(s*$)/g, "");
                return this.rtrim(this.ltrim(string));
            },

            /*
               实用工具
             */
            //效果同js原先的confirm
            //content ：弹出框内容 ； callback ： 确认后要执行的内容
            confirm : function(content,callback){
                var util = this;
                //检查如果存在则销毁
                var di = dijit.byId(util.id.confirmDialog);
                if(di){
                    di.destroyRecursive();
                }

                var confirmDialog = new Dialog({
                    content : "<p>" + content + "</p>",
                    id : util.id.confirmDialog,
                    title : util.label.dialog_default_title
                });
                //确认按钮
                var okbotton = new Button({
                    label : "确认",
                    onClick : function(){
                        callback();
                        var di =  dijit.byId(util.id.confirmDialog);
                        di.hide();
                    }
                });
                okbotton.placeAt(util.id.confirmDialog);
                //取消按钮
                var cancelbotton = new Button({
                    label : "取消",
                    onClick : function(){
                        var di =  dijit.byId(util.id.confirmDialog);
                        di.hide();
                    }
                });
                cancelbotton.placeAt(util.id.confirmDialog);

                confirmDialog.show();
            } //confirm
        }
    }
);
