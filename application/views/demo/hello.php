<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Coolfe ERP</title>
    <!-- 设置图标 -->
    <link rel="shortcut icon" href="public/images/favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" href="public/images/57.png"/>
    <link rel="apple-touch-icon" sizes="72×72" href="public/images/72.png" />
    <link rel="apple-touch-icon" sizes="114×114" href="public/images/114.png" />

    <!-- 设置渲染主题 -->
    <link id="dojo" rel="stylesheet" type="text/css" href="/dojo/dojo/resources/dojo.css" />
    <link id="tundra" rel="stylesheet" type="text/css" href="/dojo/dijit/themes/tundra/tundra.css" />
    <link id="tundra" rel="stylesheet" type="text/css" href="/dojo/dojox/grid/resources/tundraGrid.css" />
    <link id="obe" rel="stylesheet" type="text/css" href="/public/scripts/baf/obe.css"/>
    <link id="nihilo" rel="stylesheet" type="text/css" href="/dojo/dijit/themes/nihilo/nihilo.css" disabled="true"/>
    <link id="soria" rel="stylesheet" type="text/css" href="/dojo/dijit/themes/soria/soria.css" disabled="true"/>
    <link id="claro" rel="stylesheet" type="text/css" href="/dojo/dijit/themes/claro/claro.css" disabled="true"/>

    <!-- 设置dojo参数 -->
    <script type="text/javascript">
        var dojoConfig = {
            packages: [
                {
                    name: "baf",
                    location: "/public/scripts/baf"
                }],
            parseOnLoad: true,
            baseUrl : "/dojo/dojo/",
            async : true
        };

    </script>

    <!-- 加载dojo -->
    <script type="text/javascript" src="/dojo/dojo/dojo.js"></script>


</head>
<body class="tundra">
<div id="mygrid">正在加载...</div>
<script>
    var grid, store, dataStore;
    require(["dojox/grid/DataGrid",'dojo/data/ItemFileWriteStore',"dojo/request","dojo/store/Memory","dojo/data/ObjectStore","dojo/domReady!"],
        function(DataGrid,ItemFileWriteStore,request,Memory, ObjectStore){
            request.get("//localhost/index.php/bc/program/ui_fieldlist?program_name=BC_PROGRAM_C",{handleAs: "json"}).then(function(data){
                console.info(data);
                store = new Memory({ data: data.items });
                dataStore = new ObjectStore({ objectStore: store });

                grid = new DataGrid({
                    store : dataStore,
                    structure:[
                        {name : "字段名",field : "field_name"}
                    ]
                },"mygrid");
                grid.startup();
            });
        });
</script>
</body>
</html>