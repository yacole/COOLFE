<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta charset="utf-8">
    <title><?= isset($title) ? $title : 'Coolfe ERP' ?></title>
    <!-- 设置图标 -->
    <link rel="shortcut icon" href="public/images/favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" href="public/images/57.png"/>
    <link rel="apple-touch-icon" sizes="72×72" href="public/images/72.png" />
    <link rel="apple-touch-icon" sizes="114×114" href="public/images/114.png" />

    <link rel="stylesheet" type="text/css" href="/dojo1.9.0/dojo/resources/dojo.css" />
    <link rel="stylesheet" type="text/css" href="/public/scripts/baf/obe.css"/>
    <!-- 设置渲染主题:tundra -->
    <link rel="stylesheet" type="text/css" href="/dojo1.9.0/dijit/themes/<?= $theme ?>/<?= $theme ?>.css" />
    <link rel="stylesheet" type="text/css" href="/dojo1.9.0/dijit/themes/<?= $theme ?>/document.css" />
    <link rel="stylesheet" type="text/css" href="/dojo1.9.0/dojox/grid/enhanced/resources/claro/EnhancedGrid.css" />
    <link rel="stylesheet" type="text/css" href="/dojo1.9.0/dojox/grid/enhanced/resources/EnhancedGrid_rtl.css" />
<!--    <link rel="stylesheet" type="text/css" href="/dojo/dojox/grid/enhanced/resources/--><?//= $theme ?><!--/EnhancedGrid.css" />-->
<!--    <link rel="stylesheet" type="text/css" href="/dojo1.9.0/dojox/grid/enhanced/resources/EnhancedGrid_rtl.css" />-->
<!--    <link rel="stylesheet" type="text/css" href="/dojo1.9.0/dojox/grid/resources/--><?//= $theme ?><!--Grid.css"/>-->



    <!-- 设置dojo参数 -->
    <script type="text/javascript">
        var dojoConfig = {
            packages: [
                {
                    name: "baf",
                    location: "/public/scripts/baf"
                }
//                ,{
//                    name: "gridx",
//                    location: "/gridx-1.2beta"
//                }
            ],
            parseOnLoad: true,
            baseUrl : "/dojo1.9.0/dojo/",
            async : true
        };

    </script>

    <!-- 加载dojo -->
    <script type="text/javascript" src="/dojo1.9.0/dojo/dojo.js"></script>

    <!-- 初始化框架 -->
    <script type="text/javascript" >

        require(["dojo/ready","baf/main","baf/command/Command","baf/command/Listener","dojo/domReady!"],
            function(ready,main,Command,Listener){

            //实例布局
            var appContainer = new main({username : '<?= $username ?>',host : '<?= $host ?>'});

            ready(function(){
                //展示各面板
                appContainer.startup();
                //告诉容器重新计算布局
                window.onresize = function(){
                    appContainer.startup();
                }

                //监听启动
                Listener.startup();

                //开启设置的个人默认打开程序
//                Command.show_workspace(2);
//                Command.show_workspace(1);

            });

        }); //end of require(["dojo/ready"

    </script>
</head>
<body class="<?= $theme ?>">
    <div id="bafLoading">正在加载...</div>
</body>
</html>