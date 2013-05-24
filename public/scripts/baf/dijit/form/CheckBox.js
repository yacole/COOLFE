/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-27
 * Time: 下午1:01
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dijit/form/CheckBox",
    "baf/base/Util"],
    function(declare,CheckBox,Util){

        return declare("",[CheckBox],{

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
                //查找label填写标题
                Util.fillLabel(this.name);
                //设置唯一性表示ID
                this.set("id" , Util.xId(this.name));
            },
            //在值更改的时候转换格式
            onClick : function(){

            }

        });

    });