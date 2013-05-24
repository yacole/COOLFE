/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-22
 * Time: 上午9:44
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dijit/form/ValidationTextBox",
    "baf/base/Util",
    "dijit/form/Button",
    "dojo/request",
    "baf/base/Env"],
    function(declare,ValidationTextBox,Util,Button,request,Env){
    return declare("baf.dijit.form.TextBox",[ValidationTextBox],{
        //可多选
        mselect : false,
        //提交的值
        key : null,
        //输入框外部显示值
        detail : null,
        label : null,
        valuelist_id : null,

        creation_date : new Date,
        created_by : null,
        lastupdate_date : new Date,
        lastupdate_by : null,
        field_id : null,
        remoteValidator : null,
//        remoteIsValid : null,

        constructor : function(args){
            //默认属性
            this.trim = true;
//            this.uppercase = true;

            if(!args.id){
                args.id = Util.xId(args.name);
            }else{
                args.id = Util.xId(args.id);
            }

        },

        startup : function(){
            var textbox = this;

//            console.info(textbox.getParent());

            var entry = Util.field(textbox.name);
            //在字段能对应的情况下
            if(entry){
                textbox.field_id = entry.ui_field_id;
//                console.info(Util.url.find_validator_by_uifield_id({field_id : textbox.field_id}));
                //设置属性
                if(entry.validation_id){
                    request.get(Util.url.find_validator_byId({validation_id : entry.validation_id}),{handleAs : "json"}).then(function(data){

                        if(data){
                            //函数验证
                            textbox.remoteValidator = data;

                            if(data.regexp){
                                //正则表达式
                                textbox.set("regExp",data.regexp);
                            }
//                            textbox.set("invalidMessage",data.invalidmessage);
                        }
                    });
                }

//                console.info(textbox);

                textbox.set("disabled" , Util.xflag(entry.disabled_flag));

                if(!textbox.value){
                    textbox.set("value",entry.default_value);
                }

                if(!textbox.required){
                    textbox.set("required",Util.xflag(entry.required_flag));
                }


                if(Util.xflag(entry.hidden_flag)){
                    textbox.set("type","hidden");
                }

                //设置唯一性表示ID
//                textbox.set("id" , Util.xId(textbox.name));

                if(entry.field_size){
                    textbox.set("style" , "width : "+entry.field_size+"em;");
//                textbox.style = "width : "+entry.size+"px;";
                }

                textbox.valuelist_id = entry.valuelist_id;
                textbox.label = entry.label;

            }

            this.inherited(arguments);

        },
        //聚焦时如果存在值集，显示
        onFocus : function(){
            var textbox = this;
            var vlbt = dijit.byId(Util.id.vlbutton);
            if(vlbt != undefined){
                vlbt.destroyRecursive();
            }

            //如果存在值列表
            if(textbox.valuelist_id != undefined ){
//                console.info(textbox.valuelist_id);
                var bt = new Button({
                    label : Util.label.reseach,
                    onClick: function(){
                        //打开查询界面，如果不存在查询界面，则为默认
                        var wso = Env.wso();
                        wso.openQForm(textbox);
                    },
                    id : Util.id.vlbutton,
                    style : "position: fixed;"
                });
                bt.placeAt(textbox.domNode,"after");
//                console.info(textbox.domNode);
            }
        }

    });
});
