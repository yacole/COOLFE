define(["dojo/_base/declare", "dijit/Editor", "base/Util"],
    function(declare,Editor,Util){
        /*
         *   摘要:
         *       富文本编辑框组件
         */
        return declare("",[Editor],{

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

            },

            startup : function(){

                var field = Util.field(this.name);
                if(field){
                    //初始化值
                    if(field.field_size){
                        this.set("style" , "width : "+field.field_size+"em;");
                    }

                    this.set("disabled",Util.xflag(field.disabled_flag));
                }

                this.inherited( arguments);

            }


        });

    });