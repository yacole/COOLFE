<!-- CSS渲染 -->
<style>
    .label{
        text-align: left;
        width: 80px;
        height: 20px;
    }
</style>
<form data-dojo-type="baf/dijit/form/Form">
    <table class="maintable">
        <tr>
            <td class="label"><label for="q_program_name"></label></td>
            <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'q_program_name',uppercase : true" /></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="label"><label for="q_title"></label></td>
            <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'q_title'" /></td>
            <td>&nbsp;</td>
        </tr>
    </table>
</form>