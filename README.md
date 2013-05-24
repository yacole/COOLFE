COOLFE
======

web ERP Project by yacole

框架搭配 ：CI + DOJO + MYSQL

服务器环境 : xampp

开发环境 : JetBrains PhpStorm 6.0

仓库中存放的是项目的主体部分：
1. application 文件夹是服务器端的核心：主要是存放php脚本编写的业务逻辑，给客户端提供接口
2. public 文件夹是客户端的核心：主要存放js脚本，包括客制化的baf框架(public/scripts/baf)和配合UI的js脚本(public/scripts/)

项目详细目录：
 application
 dojo1.8.3
 dojo1.9.0
 index.php
 license.txt
 public
 system
 user_guide

环境搭建：CodeIgniter 2.1.3 | DOJO 1.9 | XAMPP 1.8.1
1. 将CI覆盖htdocs文件夹内容
2. 解压dojo到htdocs目录，命名为dojo
3. 系统主页: application/views/layout_main.php ，如果要调试不同版本的dojo可以在此页面中修改baseUrl
