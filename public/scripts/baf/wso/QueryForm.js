/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-10
 * Time: 下午4:58
 *
 */
define(["dojo/_base/declare",
    'dojo/_base/lang',
    "dijit/Dialog",
    "baf/base/Util",
    'dojo/_base/Deferred',
    'dojo/dom-construct',
    "baf/dijit/form/Button"],function(declare,lang,Dialog,Util,Deferred,construct,Button){
    return declare("",[Dialog],{
        program_id : null,
        timestamp : null,
        controller : null,
        action : null,
        params : null,
        fields : null,
        sourceObj : null,
        okButton: null,
        cancelButton: null,
        dfd: null,
        //对象当前输入值
        currentInput : null,
        //不能互为QFORM 暂标注
        constructor : function(args){
            if(args.title == undefined){
                this.title = Util.label.dialog_qform_title;
            }
        },
        postCreate : function(){
            this.inherited('postCreate', arguments);

            var div = construct.create('div', {
                className: 'dijitDialogPaneContent'
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
            this.inherited('show', arguments);
            construct.destroy(this.id + '_underlay');
            this.dfd = new Deferred();
            return this.dfd;
        }
    });
});
