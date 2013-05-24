/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-5-1
 * Time: 上午10:37
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dijit/Editor",
    "baf/base/Util"],
    function(declare,Editor,Util){

        return declare("",[Editor],{

            creation_date : new Date,
            created_by : null,
            lastupdate_date : new Date,
            lastupdate_by : null,

            constructor : function(args){

                if(args.id){
                    args.id = Util.xId(args.id);
                }

            },

            startup : function(){

                var editor = this;

                var field = Util.field(editor.name);
                if(field){
                    //初始化值
                    if(field.field_size){
                        editor.set("style" , "width : "+field.field_size+"em;");
                    }

                    editor.set("disabled",Util.xflag(field.disabled_flag));
                }

                this.inherited( arguments);

            }


        });

    });