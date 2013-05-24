<!-- CSS渲染 -->
<style>
    .label{
        text-align: left;
        width: 80px;
        height: 20px;
    }
</style>
<table class="maintable">
    <tr>
        <td class="label"><label for="program_name"></label></td>
        <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'program_name',uppercase : true" value="<?= get_parameter('program_name')?>" /></td>
        <td><input data-dojo-type="baf/dijit/form/CheckBox" name="qform_flag"><label for="qform_flag"></label></td>
    </tr>
    <tr>
        <td class="label"><label for="title"></label></td>
        <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'title'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="appliction_code"></label></td>
        <td><select data-dojo-type="baf/dijit/form/Select" id="appliction_code" data-dojo-props="name : 'appliction_code'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="program_type"></label></td>
        <td><input data-dojo-type="baf/dijit/form/Select" data-dojo-props="name : 'program_type'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="controller"></label></td>
        <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'controller'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="action"></label></td>
        <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'action'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="menu_bar"></label></td>
        <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'menu_bar'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="qform"></label></td>
        <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'qform'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="help_text"></label></td>
        <td></td>
        <td>&nbsp;</td>
    </tr>
</table>
<div data-dojo-type="baf/dijit/Editor" id="myEditor" name="help_text" data-dojo-props="height : '40'"></div>