define(["dojo/_base/declare","dijit/form/DateTextBox","baf/base/Util"],
    function(declare,DateTextBox,Util){
        /*
         *   摘要:
         *             时间选择框
         *             */
        return declare("",[DateTextBox],{

            startup : function(){
//                this.constraints = { datePattern : 'yyyy-MM-dd' };
//                this.promptMessage = "yyyy-MM-dd";
//                this.invalidMessage =  "Invalid date format. Use yyyy-MM-dd";
                if(args.name != undefined || args.id != undefined ){
                    if(!args.id){
                        args.id = Util.xId(args.name);
                    }else{
                        args.id = Util.xId(args.id);
                    }
                }
                this.inherited(arguments);
            }

        });

    });