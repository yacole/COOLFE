/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-26
 * Time: 上午10:15
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare",
    "dijit/form/Form",
    "baf/base/Util",
    "baf/base/Env",
    "baf/command/Command",
    "dojo/request",
    "dojo/dom-form"],
    function(declare,Form,Util,Env,Command,request,domForm){
        return declare("",[Form],{
            unsubmit : false,
            constructor : function(args){
                if(!args.id){
                    args.id = Util.xId(args.name);
                }else{
                    args.id = Util.xId(args.id);
                }

            },
            reset : function(){
                //清空描述区域
                var qrs = dojo.query("span[for]",this.domNode);
                if(qrs.length > 0){
                    qrs.forEach(function(e){
                        e.innerHTML = "";
                    });
                }
                this.inherited(arguments);
            }

        });
    });