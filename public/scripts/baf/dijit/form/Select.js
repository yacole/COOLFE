define(["dojo/_base/declare", "dijit/form/Select",  "base/Util",  "dojo/request"],
    function(declare,Select,Util,request){
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

                var field = Util.field(select.name);
                if(field){

                    //是否存在值集ID
                    if(field.valuelist_id){

                        request.get(Util.url.valuelist_selectOptions({valuelist_id : field.valuelist_id}),{handleAs: "json"}).then(function(data){
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
                        select.set("style" , "width : "+field.field_size+"em;");
                    }

                    select.set("required",Util.xflag(field.required_flag));
                    select.set("disabled",Util.xflag(field.disabled_flag));


                } //if

            }//startup

        });

    });