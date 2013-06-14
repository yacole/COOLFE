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

        </table>
        <button data-dojo-type="baf/dijit/form/Button" type="button"  name="saveButton">
            <label for="saveButton"></label>
        </button>
    </div>

    <div id="isManage" style="display:none">
        <hr class="spacer"/>
        <button data-dojo-type="baf/dijit/form/Button" type="button"  name="deleteButton">
            <label for="deleteButton"></label>
        </button>
        <button data-dojo-type="baf/dijit/form/Button" type="button"  name="defaultButton">
            <label for="defaultButton"></label>
        </button>
    </div>
</form>