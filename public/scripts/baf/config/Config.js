define([],function(){
    return {
        //语言
        language : "zh",
        //框架根目录
//        bafBaseUrl : "/public/scripts/baf/",
        //工作区标签位置
        wsoTabPosition : "bottom", //top,bottom

        //命令历史堆栈最大值
        cmdHistoryMaxindex : 10,
        //TAB页签的标题长度
        tabTileleght : 10,
        //TAB页签最大打开数量
        tabMaxOpen : 6,
        //GRID字段默认宽度
        gridColumnWidth : 8,
        max_gridColumnWidth : 20,
        //字符串长度对应列长度比例
        wordLengthToColumnWidth : 0.7,
        //自动刷新字段列表（当刷新界面时）
        autoReflashFieldList : true,
        //消息栏显示最大长度，超出则被截断
        message_max_length : 20,
        //远程提交请求超时时间,单位毫秒
        remote_timeout : 2000,

        //返回结果时，说明字段阶段处理
        rs_label_max_length : 50,

        //打印预览
        printer_preview_type : "HTML", //"HTML","Dialog"
        printer_preview_window_style : "width:600px,height:400px",

        //结果集窗口值字段长度
        result_grid_label_width : 20,
        result_grid_value_width : 12,
        //结果集窗口高度
        result_window_height: 20

    };
});

