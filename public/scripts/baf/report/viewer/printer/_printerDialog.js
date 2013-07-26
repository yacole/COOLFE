define(["dojo/_base/declare","baf/dijit/Dialog","base/Util","base/Env","dijit/form/RadioButton",
    "form/Button","form/TextBox","dijit/layout/ContentPane"],
    function(declare,Dialog,Util,Env,RadioButton,Button,TextBox,ContentPane){
        return declare("",Dialog,{
            cssFiles : null,
            srcGrid : null,
            //标题输入框
            titleTb : null,
            //开始行输入框
            rowStart : null,
            //合计行输入框
            rowCount : null,
            //全部打印选择
            radioAll : null,
            //当前选择行
            radioSelect : null,
            //自定义选择行
            radioCustomized : null,

            constructor : function(args){
                args.cssFiles = [Util.url.report_printer_cssFile()];
                args.href  = Util.url.report_printer_template();
                args.srcGrid = Env.reportGrid().grid;
                args.id = "printerDialog"
            },

            //展示布局选择和保持界面
            onDownloadEnd : function(){
                var printerDialog = this;
                printerDialog.titleTb = new TextBox({
                    style : "width:16em",
                    value : Env.currentWso().title
                },"title");

                printerDialog.rowStart = new TextBox({
                    style : "width:4em",
                    disabled : true,
                    required : true,
                    regExp : "^[1-9][0-9]*$"
                },"rowStart");

                printerDialog.rowCount = new TextBox({
                    style : "width:4em",
                    disabled : true,
                    required : true,
                    regExp : "^[1-9][0-9]*$"
                },"rowCount");

                printerDialog.radioAll = new RadioButton({
                    checked: true,
                    value: "all"
                },"printAll");


                printerDialog.radioSelect = new RadioButton({
                    value: "select"
                },"printSelect");

                printerDialog.radioCustomized = new RadioButton({
                    value: "customized",
                    onChange : function(v){
                        if(v){
                            printerDialog.rowStart.set("disabled",false);
                            printerDialog.rowCount.set("disabled",false);
                        }else{
                            printerDialog.rowStart.set("disabled",true);
                            printerDialog.rowCount.set("disabled",true);
                        }
                    }
                },"printCustomized");


                var printBt = new Button({
                    label: Util.label.grid_print_immediate,
                    onClick : function(){
                        if(Util.dijit_byId("dialogForm").validate()){
                            printerDialog.doPrint();
                        }
                    }
                },"doPrint");

                var previewBt = new Button({
                    label: Util.label.grid_print_preview,
                    onClick : function(){
                        if(Util.dijit_byId("dialogForm").validate()){
                            printerDialog.doPreview();
                        }
                    }
                },"doPreview");

            },
            //打印所有
            printAll : function(){
                this.srcGrid.printGrid({
                    title: this.titleTb.value,
                    cssFiles: this.cssFiles
                });
            },
            //打印选择行
            printSelected : function(){
                if(!this.srcGrid.isSelectColumn()){
                    this.srcGrid.printSelected({
                        title: this.titleTb.value,
                        cssFiles: this.cssFiles
                    });
                }

            },
            //自定义答应
            printCustomized : function(){
                if(Util.string.isNumber(this.rowStart.value) && Util.string.isNumber(this.rowCount.value)){
                    this.srcGrid.printGrid({
                        title: this.titleTb.value,
                        cssFiles: this.cssFiles,
                        fetchArgs: {
                            start: Number(this.rowStart.value) - 1,
                            count: Number(this.rowCount.value)
                        }
                    });
                }
            },
            //HTML页面预览
            previewHTML : function(str){
                var win = window.open();
                win.document.open();
                win.document.write(str);
                /*Adjust row height/view width for multi-view grid*/
                if(!this.srcGrid){
                    this.srcGrid = Env.reportGrid().grid;
                }
                this.srcGrid.normalizePrintedGrid(win.document);
                win.document.close();
            },
            //dialog版本的预览
            previewDialog : function(str){
                var previewDialog = new Dialog({
                    title : Util.label.grid_print_preview
                });
                var printBt = new Button({
                    label : Util.label.grid_printer,
                    onClick : function(){
                        dijit.byId("printerDialog").doPrint();
                    }
                });
                previewDialog.addChild(printBt);
                var cancelBt = new Button({
                    label : Util.label.button_cancel,
                    onClick : function(){
                        previewDialog.hide();
                    }
                });
                previewDialog.addChild(cancelBt);
                var cp = new ContentPane({
                    content : str,
                    style :  Util.config.printer_preview_window_style
                });
                previewDialog.addChild(cp);
                previewDialog.show();
            },
            //根据配置选择预览方式
            preview : function(){
                if(Util.config.printer_preview_type && Util.config.printer_preview_type == "Dialog"){
                    return this.previewDialog;
                }else{
                    return this.previewHTML;
                }
            },
            //预览所有
            previewAll : function(){
                var preview = this.preview();
                this.srcGrid.exportToHTML({
                    title: this.titleTb.value,
                    cssFiles: this.cssFiles
                },preview);
            },
            //预览选择行
            previewSelected : function(){
                var preview = this.preview();
                if(!this.srcGrid.isSelectColumn()){
                    this.srcGrid.exportSelectedToHTML({
                        title: this.titleTb.value,
                        cssFiles: this.cssFiles
                    },preview);
                }
            },
            //自定义预览
            previewCustomized : function(){
                var preview = this.preview();
                if(Util.string.isNumber(this.rowStart.value) && Util.string.isNumber(this.rowCount.value)){
                    this.srcGrid.exportToHTML({
                        title: this.titleTb.value,
                        cssFiles: this.cssFiles,
                        fetchArgs: {
                            start: Number(this.rowStart.value) - 1,
                            count: Number(this.rowCount.value)
                        }
                    },preview);
                }
            },
            //执行打印
            doPrint : function(){
                if(this.radioAll.checked){
                    this.printAll();
                }
                if(this.radioSelect.checked){
                    this.printSelected();
                }
                if(this.radioCustomized.checked){
                    this.printCustomized();
                }
            },
            //执行预览
            doPreview : function(){
                if(this.radioAll.checked){
                    this.previewAll();
                }
                if(this.radioSelect.checked){
                    this.previewSelected();
                }
                if(this.radioCustomized.checked){
                    this.previewCustomized();
                }
            }

        });
    });