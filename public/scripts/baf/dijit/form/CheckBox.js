define(["dojo/_base/declare","dijit/form/CheckBox","baf/base/Util"],
    function(declare,CheckBox,Util){
        /*
         *   摘要:
         *       选择框组件
         */
        return declare("",[CheckBox],{

            creation_date : null,
            created_by : null,
            last_update_date : null,
            last_updated_by : null,

            constructor : function(args){

                if(!args.id){
                    args.id = Util.xId(args.name);
                }else{
                    args.id = Util.xId(args.id);
                }

            }

        });

    });