<table class="maintable">
    <tr>
        <td class="label"></td>
        <td>
            <button data-dojo-type="baf/dijit/form/Button" id="createButton" type="button" onclick="directedToAction('create');">
                <label for="createButton"></label>
            </button>
            <button data-dojo-type="baf/dijit/form/Button" id="editButton" type="button" onclick="directedToAction('edit');">
                <label for="editButton"></label>
            </button>
            <button data-dojo-type="baf/dijit/form/Button" id="showButton" type="button" onclick="directedToAction('show');">
                <label for="showButton"></label>
            </button>
            <button data-dojo-type="baf/dijit/form/Button" id="destroyButton" type="button" onclick="directedToAction('destroy');">
                <label for="destroyButton"></label>
            </button>
            <button data-dojo-type="baf/dijit/form/Button" id="executButton" type="button" onclick="directedToAction('execute');">
                <label for="executeButton"></label>
            </button>
        </td>
        <td></td>
    </tr>
    <tr>
        <td class="label"><label for="report_name"></label></td>
        <td><input data-dojo-type="baf/dijit/form/TextBox" name="report_name" uppercase="true" trim="true"/></td>
        <td></td>
    </tr>
</table>
<script>
    function directedToAction(type){
        require(["baf/base/Util","baf/base/Env","dojo/request","baf/command/Command"],function(Util,Env,request,Command){
            var wso = Env.wso();
            var currentWso = Env.currentWso();
            var innderForm = currentWso.innerForm;

            var report_name = Util.dijit_byId("report_name").value;


            switch (type)
            {
                case "create":
                    innderForm.formValidate(
                        function(){
                            currentWso.directedTo(Util.url.safeurl("bc/report","create",{report_name : report_name}));
                        }
                    );
                    break;
                case "edit" :
                    innderForm.formValidate(null,
                        function(){
                            currentWso.directedTo(Util.url.safeurl("bc/report","edit",{report_name : report_name}));
                        },true
                    );
                    break;
                case "show" :
                    innderForm.formValidate(null,
                        function(){
                            currentWso.directedTo(Util.url.safeurl("bc/report","show",{report_name : report_name}));
                        },true
                    );
                    break;
                case "destroy" :
                    innderForm.formValidate(null,
                        function(){
                            //需要判断一下，程序是否为系统自带程序，系统自带程序不允许删除
                            if(confirm("确定删除此程序？")){
                                //删除程序逻辑
                                request.get(Util.url.safeurl("bc/program","destroy",{program_name : report_name}),
                                    {handleAs : "json"}).then(function(response){
                                        if(response){

                                        }
                                    });
                            }

                        },true
                    );
                    break;
                case "execute" :
                    innderForm.formValidate(null,
                        function(){
                            currentWso.directedTo(Util.url.safeurl("bc/program","execute",{program_name : report_name}));
                        },true
                    );
                    break;
                default:
                    break;
            }

        });
    }
</script>