define(["dojo/_base/declare","base/Util","./_paramChoosePane","baf/dijit/Dialog",
    "form/Button","dojo/dom-form","base/Env"],
    function(declare,Util,paramChoosePane,Dialog,Button,domForm,Env){

        return declare("",[Dialog],{
            choosePane : null,
            report_id : null,

            constructor : function(args){
                args.title = "参数选择";
            },

            //展示所有属性
            startup : function(){
                var o = this;
                var pcPane = this.choosePane = new paramChoosePane({
                    report_id : this.report_id
                });
                this.addChild(pcPane);

                var confirmButton = new Button({
                    label : Util.label.button_confirm,
                    onClick : function(){
                        var params = domForm.toObject(Util.xId("paramChooseForm"));
                        params.report_id = o.report_id;
                        var form = Util.dijit_byId("paramChooseForm");
                        if(form.validate()){
                            //根据来源类型不同获取数据的形式不同
                            Util.post(Util.url.report("preview_data"),params,function(data){
                                if(!Env.isError()){
                                    Env.reportGrid().refresh_data(data);
                                    o.hide();
                                }
                            });
                        }
                    }
                });
                this.addChild(confirmButton);

                var cancelButton = new Button({
                    label : Util.label.button_cancel,
                    onClick : function(){
                        o.hide();
                    }
                });
                this.addChild(cancelButton);
                this.inherited(arguments);
            }
        });
    });
