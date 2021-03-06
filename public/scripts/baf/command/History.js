define(["dojo/_base/declare","dojo/_base/array","baf/config/Config"],
    function(declare,array,Config){
        /*
         *   摘要:
         *       页签历史记录相关操作
         */
        return declare("baf.command.History",null,{
            //获取配置:历史队列最大长度
            maxindex : Config.cmdHistoryMaxindex,

            //关闭窗口历史
            closeWsoList : {items : []},

            //添加记录
            //program_id :程序id ； description : 描述，默认为程序标题
            recordWso : function(program_id,description){
                var cmdhistory = this;
                var arr = cmdhistory.closeWsoList.items;

                //组合数据
                var rcd = {program_id : program_id,description : description};

                var indx = -1 ;

                array.forEach(arr,function(rc,i){
                    if(rc.program_id == program_id){
                        indx = i;
                    }
                });

                //判断队列中是否存在
                if (indx < 0 ){
                    //不存在
                    if(arr.length == cmdhistory.maxindex){
                        //队列满,删除第一个
                        arr.pop();
                    }

                } else {
                    //存在,删除
                    arr.splice(indx,1);
                } //if
                arr.unshift(rcd);

            },//recordWso

            //删除记录
            removeWso : function(program_id){
                var arr = this.closeWsoList.items;

                arr.forEach(function(rc,i){
                    if(rc.program_id == program_id){
                        arr.splice(i,1);
                    }
                });
            }

        });
});