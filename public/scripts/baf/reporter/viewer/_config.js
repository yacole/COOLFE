define([],function(){
    return {
        grid : {
            //直接显示含HTML标签字段
            escapeHTMLInData: false,
            //也可自定义设置高度，如果不设置高度将无法正常显示
            autoHeight : true,
            //默认排序
//                            sortFields: [{attribute: 'col4', descending: false},{attribute: 'col7', descending: true}],
            //如果设置此参数，冻结动作将无效
//                            autoWidth : true,
            //不能排序
//                            canSort :  function(){
//                                return false;
//                            },
            //可选择文字
//                            selectable : true,
//                        width : "100px",
//                        hight : "100px",
            //插件
            plugins : {
                //导出
                exporter: true,
                //选择器
                selector: {row : "single",col : "single",cell : "disabled"},
                //拖拽
                dnd: {
                    dndConfig: {
                        //行不允许移动
                        row : { within : false, in : false, out : false },
                        cell : { within : false, in : false, out : false },
                        col : { within : true, in : false, out : false }
                    }
                },
                //分页
                pagination: {
    //                                    pageSizes: ["10","25", "50", "100", "All"],
    //                                    defaultPageSize : 2,
                    description: true,
                    sizeSwitch: true,
                    pageStepper: true,
                    gotoButton: true,
                    /*page step to be displayed*/
                    maxPageStep: 4,
                    /*position of the pagination bar*/
                    position: "bottom"
                },
                //排序
                nestedSorting: true
            }
//                    rowSelector: '20px',
        },
        toolBar : {
            //布局管理：选择，保存，管理，false时可作修改（无法保存）
            layout : true,
            //导出按钮
            export : true,
            //文本选择按钮
            text : true,
            //排序：升序按钮
            sortAsc : true,
            //排序：降序按钮
            sortDesc : true,
            //明细显示按钮
            detail : true,
            //打印
            print : true,
            //查找
            search : true,
            //汇总
            sum : true,
            //过滤器
            filter : true
        },
       gridMenu : {
            //头部菜单：升序
            sortAsc : true,
            //头部菜单：降序
            sortDesc : true
        }
    }
});