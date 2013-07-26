define(["baf/dijit/Dialog","base/Util"],
    function(Dialog,Util){
        /*
         *   摘要:
         *        帮助文档
         */
        return {
            field  : function(field_name){
                var field = Util.field(field_name);
                if(field && field.help_text != ""){
                    var fDialog = new Dialog({
                        title : field.label,
                        content : field.help_text
                    });
                    fDialog.set("class","systemHelpDialog");
                    fDialog.startup();
                    fDialog.show();
                }
            }
        }
    });
