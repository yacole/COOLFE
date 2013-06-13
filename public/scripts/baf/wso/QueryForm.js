define(["dojo/_base/declare", 'dojo/_base/lang', "baf/dijit/Dialog", "baf/base/Util",
    'dojo/_base/Deferred', 'dojo/dom-construct', "baf/dijit/form/Button"],
    function(declare,lang,Dialog,Util,Deferred,construct,Button){
    /*
     *   摘要:
     *       查询表单，用于对字段的查询，关联值列表
     */
    return declare("",[Dialog],{
        //属性同wso的其他对象
        program_id : null,
        timestamp : null,
        controller : null,
        action : null,
        params : null,
        fields : null,

        //来源对象：文本框等
        sourceObj : null,
        //确认按钮
        okButton: null,
        //取消按钮
        cancelButton: null,

        dfd: null,
        //对象当前输入值
        currentInput : null,

        //不能互为QFORM 暂标注
        constructor : function(args){
            if(!args.title){
                this.title = Util.label.dialog_qform_title;
            }
        },
        postCreate : function(){
            this.inherited(arguments);

            var div = construct.create('div', {
                className: Util.id.dijitDialogPaneContent_class
            }, this.domNode, 'last');

            this.okButton = new Button({
                label: Util.label.button_confirm,
                onClick: lang.hitch(this, function() {
                    this.hide();
                    this.dfd.resolve();
                })
            }, construct.create('div'));
            div.appendChild(this.okButton.domNode);

            this.cancelButton = new Button({
                label:  Util.label.button_cancel,
                onClick: lang.hitch(this, function() {
                    this.hide();
                    this.dfd.cancel();

                })
            }, construct.create('div'));
            div.appendChild(this.cancelButton.domNode);

        },
        show : function(){
            this.inherited(arguments);
            //去掉背景
            construct.destroy(this.id + '_underlay');
            this.dfd = new Deferred();
            return this.dfd;
        }
    });
});
