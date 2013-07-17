define([],function(){
    return {
        grid : {
            //直接显示含HTML标签字段
            escapeHTMLInData: false,
            //也可自定义设置高度，如果不设置高度将无法正常显示
            autoHeight : true,
            //此属性设置为true,可以拖拽标题栏，更换列顺序
//            columnReordering : true,
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
//                exporter: true,
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
                    pageSizes: ["1000","2500", "5000", "All"],
                    defaultPageSize : 1000,
                    description: true,
                    sizeSwitch: true,
                    pageStepper: true,
                    gotoButton: true,
                    /*page step to be displayed*/
                    maxPageStep: 4,
                    /*position of the pagination bar*/
                    position: "bottom"
                }
                //排序
//                nestedSorting: true
                //勾选框
//                indirectSelection:  {headerSelector:true}
            }
//                    rowSelector: '20px',
        },
        tool : {
            //布局管理：选择，保存，管理，false时可作修改（无法保存）
            layout : true,
            //导出按钮
            export : false,
            //文本选择按钮
            text : true,
            //明细显示按钮
            detail : true,
            //打印
            print : true,
            //查找
            search : true,
            //汇总
            sum : true,
            //排序
            sort : true,
            //过滤器
            filter : true
        }

    }
});