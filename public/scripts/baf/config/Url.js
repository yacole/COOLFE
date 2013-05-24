/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-11
 * Time: 上午9:15
 * 保存默认的一些URL，取数
 */
define(function(){
    //处理URL
    var url = function(controller,action,params){
        if(params == undefined){
            return "index.php/" +controller + "/" + action;
        }else{
            var paramstr = "";
            var i = 0;
            for(key in params){
                if(i == 0){
                    paramstr = paramstr + "?" +key + "=" + params[key];
                } else{
                    paramstr = paramstr + "&" + key + "=" + params[key];
                }
                i = i + 1;
            }
            return "index.php/" +controller + "/" + action + paramstr;
        }
    };
    return {
        safeurl : url,
        withParameters : function(uri,params){
            if(params == undefined){
                return "index.php/"+ uri;
            }else{
                var paramstr = "";
                var i = 0;
                for(key in params){
                    if(i == 0){
                        paramstr = paramstr + "?" +key + "=" + params[key];
                    } else{
                        paramstr = paramstr + "&" + key + "=" + params[key];
                    }
                    i = i + 1;
                }
                return "index.php/"+ uri + paramstr;
            }
        },
        navigator : url("main","navigator"),
        workspace : function(params){
            return url("bc/program","workspace",params);
        },
        find_program_byName : function(params){
            return url("bc/program","find_by_name",params);
        },
        find_program_byId : function(params){
            return url("bc/program","find",params);
        },
        menubar : function(params){
            return url("bc/program","menubar",params);
        },
        message :function(params){
            return url("bc/message","message_desc",params);
        },
        message_help :function(params){
            return url("bc/message","message_help",params);
        },
        ui_field :function(params){
            return url("bc/uifield","find_field_by_program_id_and_name",params);
        },
        ui_fieldlist_byid :function(params){
            return url("bc/uifield","find_fields_by_program_id",params);
        },
        ui_field_manager : function(params){
            return url("bc/uifield","index",params);
        },
        valuelist_selectOptions : function(params){
            return url("bc/valuelist","selectOptions",params);
        },
        find_valuelist_byId : function(params){
            return url("bc/valuelist","find",params);
        },
        find_validator_byId : function(params){
            return url("bc/validator","find",params);
        },
        find_message : function(params){
            return url("bc/message","find_by_class_and_code",params);
        },
        find_message_detail : function(params){
            return url("bc/message","show_detail",params);
        }
    }
 });
