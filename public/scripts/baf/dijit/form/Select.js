/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-5-1
 * Time: 下午12:45
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dijit/form/Select",
    "baf/base/Util",
    "dojo/request"],
    function(declare,Select,Util,request){

        return declare("",[Select],{

            creation_date : new Date,
            created_by : null,
            lastupdate_date : new Date,
            lastupdate_by : null,

            constructor : function(args){

                if(args.id){
                    args.id = Util.xId(args.id);
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