/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-23
 * Time: 下午2:37
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dijit/form/Button",
    "baf/base/Util"],
    function(declare,Button,Util){
        return declare("",[Button],{

            constructor : function(args){
                //默认属性
                if(!args.id){
                    args.id = Util.xId(args.name);
                }else{
                    args.id = Util.xId(args.id);
                }
                this.inherited(arguments);

            },

            startup : function(){

                this.inherited(arguments);

            }

        });
    });