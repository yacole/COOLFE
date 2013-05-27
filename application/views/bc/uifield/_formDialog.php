<form data-dojo-type="baf/dijit/form/Form" id="dialogForm" unsubmit=true>

    <table class="maintable">
        <tr>
            <td class="label"><label for="field_name"></label></td>
            <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'field_name'" /></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="label"><label for="label"></label></td>
            <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'label'" /></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="label"><label for="field_size"></label></td>
            <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'field_size'" /></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><label for="property"></label></td>
            <td>
                <input data-dojo-type="baf/dijit/form/CheckBox" data-dojo-props="name : 'required_flag'" />
                <label for="required_flag"></label>
                <input data-dojo-type="baf/dijit/form/CheckBox" data-dojo-props="name : 'disabled_flag'" />
                <label for="disabled_flag"></label>
                <input data-dojo-type="baf/dijit/form/CheckBox" data-dojo-props="name : 'hidden_flag'" />
                <label for="hidden_flag"></label>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="label"><label for="valuelist_name"></label></td>
            <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'valuelist_name'" /></td>
            <td><span for="valuelist_name"></span></td>
        </tr>
        <tr>
            <td class="label"><label for="default_value"></label></td>
            <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'default_value'" onfocus="defaultValue_onFocus();"/></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="label"><label for="validation_code"></label></td>
            <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'validation_code'" /></td>
            <td><span for="validation_code"></span></td>
        </tr>
        <tr>
            <td class="label"><label for="help_text"></label></td>
            <td>
            </td>
            <td>&nbsp;</td>
        </tr>
    </table>
    <div data-dojo-type="baf/dijit/Editor" id="myEditor" name="help_text" data-dojo-props="height : '40'" ></div>

    <div class="buttongroup">
        <button data-dojo-type="dijit/form/Button" type="button" onclick="update_grid();" name="save_bt">
            <label for="save_bt"></label>
        </button>

        <button data-dojo-type="dijit/form/Button" type="button" onclick="hide_dialog();" name="cancel_bt">
            <label for="cancel_bt"></label>
        </button>
    </div>

</form>