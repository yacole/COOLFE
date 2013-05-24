<!-- CSS渲染 -->
<style>
    .label{
        text-align: left;
        width: 80px;
        height: 20px;
    }
    .buttongroup {
        float: right;
        margin: 5px;
    }
    .actionButtonGroup{
        display: none;
    }
</style>

<button data-dojo-type="dijit/form/Button" type="button" onclick="btclick();">
    确认
</button>

<label for="program_name"></label>
<input data-dojo-type="baf/dijit/form/TextBox" data-dojo-props="name : 'program_name',uppercase : true" value="<?= get_parameter('program_name') ?>"/>
<span for="program_name"></span>

<hr class="spacer"/>

<div class="actionButtonGroup">
    <!-- 动作按钮 -->
    <button data-dojo-type="dijit/form/Button" type="button" onclick="postCreate();" name="new_bt">
        <label for="new_bt"></label>
    </button>

    <button data-dojo-type="dijit/form/Button" type="button" onclick="postDelete();" name="delete_bt">
        <label for="delete_bt"></label>
    </button>

    <button data-dojo-type="dijit/form/Button" type="button" onclick="postEdit();" name="edit_bt">
        <label for="edit_bt"></label>
    </button>
</div>

<!-- 展示数据 -->
<div id = "mygrid"></div>

<script type="text/javascript" >
    //此处设置此页面的全局变量
    var pn = "<?= get_parameter('program_name') ?>";
    var uid = "<?= _sess('user_id') ?>";
</script>
<!-- 加载scripts相同文件名的js文件 -->
<script type="text/javascript" src="/public/scripts/bc/uifield/index.js"></script>
