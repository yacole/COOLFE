define(["dojo/_base/declare"],
    function(declare){
        /*
         *   摘要:
         *             参数对象
         */
        return declare("",[],{
            //动作：= ; != ; > ; < ; LIKE ; NOT LIKE ;IN ; NOT IN ;
            action : 'IN',
            //列
            cell : null,
            //参数值
            value : null,
            //参数位置
            index : null,
            //输入组件:textbox ,select
            inputObj : null,
            //是否为激活状态
            focus : false

        });
    });