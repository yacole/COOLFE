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
        //框架内部模版
        localUrl : function(uri){
           return dojo.config.bafBaseUrl +  uri;
        },
        /*布局*/
        navigator : url("main","navigator"),
        //获取工作区数据
        workspace : function(params){
            return url("bc/program","workspace",params);
        },
        //获取菜单栏数据
        menubar : function(params){
            return url("bc/program","menubar",params);
        },

        /*程序管理*/
        program : function(action,params){
            return url("bc/program",action,params);
        },
        //根据程序名查找程序
        find_program_by_name : function(program_name){
            return this.program("find_by_name",{program_name : program_name});
        },
        //根据程序id查找程序
        find_program : function(program_id){
            return this.program("find",{program_id : program_id});
        },
        //报表默认布局
        rpt_default_layout : function(program_id){
            return this.program("rpt_default_layout",{program_id : program_id});
        },
        //根据布局id获取布局
        rpt_layout : function(layout_id){
            return this.program("rpt_find_layout",{layout_id : layout_id});
        },
        //获取报表所有布局
        rpt_layouts : function(program_id){
            return this.program("rpt_layouts",{program_id : program_id});
        },

        /*UI字段*/
        uifield : function(action,params){
            return url("bc/uifield",action,params);
        },
        //根据程序id查找字段列表
        find_fields_by_program_id :function(program_id){
           return  this.uifield("find_fields_by_program_id",{program_id : program_id});
        },

        /*值集管理*/
        valuelist : function(action,params){
            return url("bc/valuelist",action,params);
        },
        //获取值集列表（下拉菜单）
        options : function(valuelist_id){
            return this.valuelist("select_options",{valuelist_id : valuelist_id});
        },
        optionsByName : function(valuelist_name){
            return this.valuelist("select_options_by_name",{valuelist_name : valuelist_name});
        },
        //根据值集id查找值列表
        find_valuelist : function(valuelist_id){
            return this.valuelist("find",{valuelist_id : valuelist_id});
        },

        /*验证码*/
        validator : function(action,params){
            return url("bc/validator",action,params);
        },
        //根据验证码id查找验证码
        find_validator : function(validation_id){
            return this.validator("find",{validation_id : validation_id});
        },

        /*消息管理*/
        message : function(action,params){
            return url("bc/message",action,params);
        },
        //根据消息类和消息编码查找消息
        find_message : function(classCode,messageCode){
            return this.message("find_by_class_and_code",{class_code : classCode,message_code : messageCode});
        },
        //消息详细信息
        find_message_detail : function(message_id,content,code){
            return this.message("show_detail",{message_id : message_id,content : content,code : code});
        },

        //报表
        report : function(action,params){
            return url("bc/report",action,params);
        },

        //报表数据读取url
        report_read_data_by_report_id : function(report_id){
            return this.report("read_data",{report_id : report_id});
        },
        //报表设置
        report_viewer_setup_template : function(filename){
            return this.localUrl("report/viewer/setup/_"+filename+".html");
        },
        report_builder_setup_template : function(filename){
            return this.localUrl("report/builder/setup/"+filename+".html");
        },
        report_builder_preview_template : function(filename){
            return this.localUrl("report/builder/preview/_"+filename+".html");
        },

        //报表打印路径
        report_printer_cssFile : function(){
            return this.localUrl("report/viewer/printer/style.css");
        },
        report_printer_template : function(){
            return this.localUrl("report/viewer/printer/_printer.html");
        },
        //报表gird布局
        report_layout_template : function(){
            return this.localUrl("report/viewer/layout/_layout.html");
        },
        //报表过滤器筛选模版
        report_filter_template : function(){
            return this.localUrl("report/viewer/filter/_filter.html");
        },

        //报表组
        report_group_template : function(file_name){
            return this.localUrl("report/builder/group/_"+file_name+".html");
        },
        report_group : function(report_group_id){
            return this.report("find_group",{report_group_id : report_group_id});
        }
    }
 });
