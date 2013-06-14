<style>
    .messageDetailDialog{
        width: 40em;
    }
    h2{
        margin-top: 0;
    }
</style>
<div class="messageDetailDialog">

        <h2><?= $content ?></h2>
        <?= $code ?>
        <p/>
        <h2>原因诊断</h2>
        <?= $cause ?>
        <p/>
        <h2>解决方案</h2>
        <?= $resolution ?>

</div>