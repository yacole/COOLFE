define(["dojo/_base/declare", "dijit/form/Select",  "base/Util"],
    function(declare,Select,Util){
        /*
         *   摘要:
         *       选择下拉菜单组件
         */
        return declare("",[Select],{

            creation_date : null,
            created_by : null,
            last_update_date : null,
            last_updated_by : null,

            constructor : function(args){

                if(args.name != undefined || args.id != undefined ){
                    if(!args.id){
                        args.id = Util.xId(args.name);
                    }else{
                        args.id = Util.xId(args.id);
                    }
                }
            },

            startup : function(){

                var select = this;

                var field = Util.field(this.name);

                if(field){
                    //是否存在值集ID
                    if(field.valuelist_id){
                        Util.get(Util.url.options(field.valuelist_id),function(data){
                            if(data.items){
                                var optionsArr = [];
                                data.items.forEach(function(option){

                                    if(option.value == field.default_value){
                                        option.selected = true;
                                    }

                                    optionsArr.push(option);

                                });//forEach
                                select.addOption(optionsArr);
                            }//if
                        });
                    }//if

                    //初始化值
                    if(field.field_size){
                        this.set("style" , "width : "+field.field_size+"em;");
                    }

                    if(this.required == undefined){
                        this.set("required",Util.xflag(field.required_flag));
                    }
                    if(this.disabled == undefined){
                        this.set("disabled",Util.xflag(field.disabled_flag));
                    }

                } //if

            }//startup

        });

    });