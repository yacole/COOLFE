<!-- CSS渲染 -->
<style>
    .label{
        text-align: left;
        width: 80px;
        height: 20px;
    }
</style>
<form data-dojo-type="baf/dijit/form/Form" id="dialogForm" unsubmit=true>
    <label for="layout_type"></label>
    <select data-dojo-type="baf/dijit/form/Select" id="layout_type" data-dojo-props="name : 'layout_type'"></select>
    <hr class="spacer"/>
    <div id="layoutList"></div>
    <div id="isNew" style="display:none">
        <hr class="spacer"/>


            <table>
                <tr>
                    <td class="label"><label for="layout_name"></label></td>
                    <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'layout_name'" /></td>
                </tr>
                <tr>
                    <td class="label"><label for="description"></label></td>
                    <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'description'" /></td>
                </tr>

                <tr>
                    <td class="label"></td>
                    <td>
                        <input data-dojo-type="baf/dijit/form/CheckBox" data-dojo-props="name : 'default_flag'" />
                        <label for="default_flag"></label>
                    </td>
                </tr>

                <tr>
                    <td class="label"></td>
                    <td>
                        <button data-dojo-type="dijit/form/Button" type="button" onclick="update_grid();" name="saveButton">
                            <label for="saveButton"></label>
                        </button>

                        <button data-dojo-type="dijit/form/Button" type="button" onclick="hide_dialog();" name="cancelButton">
                            <label for="cancelButton"></label>
                        </button>
                    </td>
                </tr>
            </table>
    </div>
</form>