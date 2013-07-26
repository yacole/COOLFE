define([],function(){
    /*
     *   摘要:
     *       用于封装框架中使用的URL
     *
     */
    //处理URL：
    //controller ： 控制器；action ： 动作； params ： 参数
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
        //框架内部模版
        localUrl : function(uri){
           return dojo.config.bafBaseUrl +  uri;
        },
        navigator : url("main","navigator"),
        //获取工作区数据
        workspace : function(params){
            return url("bc/program","workspace",params);
        },
        //根据程序名查找程序
        find_program_byName : function(params){
            return url("bc/program","find_by_name",params);
        },
        //根据程序id查找程序
        find_program_byId : function(params){
            return url("bc/program","find",params);
        },
        //获取菜单栏数据
        menubar : function(params){
            return url("bc/program","menubar",params);
        },
        //根据程序和字段名查找字段数据
        ui_field :function(params){
            return url("bc/uifield","find_field_by_program_id_and_name",params);
        },
        //根据程序id查找字段列表
        ui_fieldlist_byid :function(params){
            return url("bc/uifield","find_fields_by_program_id",params);
        },
        //字段管理首页
        ui_field_manager : function(params){
            return url("bc/uifield","index",params);
        },
        //获取值集列表（下拉菜单）
        valuelist_selectOptions : function(params){
            return url("bc/valuelist","selectOptions",params);
        },
        //根据值集id查找值列表
        find_valuelist_byId : function(params){
            return url("bc/valuelist","find",params);
        },
        //根据验证码id查找验证码
        find_validator_byId : function(params){
            return url("bc/validator","find",params);
        },
        //根据消息类和消息编码查找消息
        find_message : function(params){
            return url("bc/message","find_by_class_and_code",params);
        },
        //消息详细信息
        find_message_detail : function(params){
            return url("bc/message","show_detail",params);
        },
        find_default_layout_for_rpt : function(params){
            return url("bc/program","rpt_default_layout",params);
        },
        find_layout_for_rpt : function(params){
            return url("bc/program","rpt_find_layout",params);
        },
        find_layouts_for_rpt : function(params){
            return url("bc/program","rpt_layouts",params);
        },
        saveLayoutTooltipDialog : function(){
            return url("bc/grid_layout","index");
        },
        //报表数据读取url
        report_read_data_by_report_id : function(report_id){
            return url("bc/report","read_data",{report_id : report_id});
        },
        //报表设置
        report_setup_template : function(filename){
            return this.localUrl("report/viewer/setup/_"+filename+".html");
        },
        //报表打印路径
        report_printer_cssFile : function(){
            return this.localUrl("report/viewer/printer/style.css");
        },
        report_printer_template : function(){
            return this.localUrl("report/viewer/printer/printer.html");
        },
        //报表gird布局
        report_layout_template : function(){
            return this.localUrl("report/viewer/layout/_layout.html");
        },
        //报表过滤器筛选模版
        report_filter_template : function(){
            return this.localUrl("report/viewer/filter/_filter.html");
        },
        //报表生成器：base
        report_builder_template : function(filename){
            return this.localUrl("report/builder/_"+filename+".html");
        }

    }
 });
