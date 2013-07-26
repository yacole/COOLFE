<table>
    <tr>
        <td class="label"><label for="report_name"></label></td>
        <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'report_name'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="description"></label></td>
        <td><input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'description'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="report_type"></label></td>
        <td><input data-dojo-type="baf/dijit/form/Select" data-dojo-props="name : 'report_type'" /></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="label"><label for="source_text"></label></td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td colspan="3">
            <input data-dojo-type="baf/dijit/form/TextBox" name = "source_text" />
        </td>
    </tr>
    <tr>
        <td colspan="3">
            <button data-dojo-type="dijit/form/Button" type="button" onclick="showParamBuilder();">
                设置参数
            </button>
        </td>
    </tr>
</table>
<hr class="spacer"/>
<div>
    <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%; height: 100%;">
        <div data-dojo-type="dijit/layout/ContentPane" title="参数设置" data-dojo-props="selected:true">

        </div>
        <div data-dojo-type="dijit/layout/ContentPane" title="参数设置" data-dojo-props="selected:true">

        </div>
        <div data-dojo-type="dijit/layout/ContentPane" title="布局设置">

        </div>
    </div>
</div>
<script>
    function showParamBuilder(){

    }
</script>