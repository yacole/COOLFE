define(["dojo/_base/declare","dijit/form/SimpleTextarea","base/Util"],
    function(declare,SimpleTextarea,Util){
        /*
         *   摘要:
         *       按钮组件
         */
        return declare("",[SimpleTextarea],{

            //构造函数重写，id赋值方式
            constructor : function(args){
                //默认属性
                if(args.name != undefined || args.id != undefined ){
                    if(!args.id){
                        args.id = Util.xId(args.name);
                    }else{
                        args.id = Util.xId(args.id);
                    }
                }
                this.inherited(arguments);

            },
            startup : function(){
                var field = Util.field(this.name);
                if(field){
                    //初始化值
                    if(this.cols == undefined){
                        this.set("cols" , field.field_size);
                    }
                    if(this.required == undefined){
                        this.set("required",Util.xflag(field.required_flag));
                    }
                    if(this.disabled == undefined){
                        this.set("disabled",Util.xflag(field.disabled_flag));
                    }
                } //if

            }//startup

        });
    });