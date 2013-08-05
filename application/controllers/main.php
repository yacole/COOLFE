<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
 * 摘要：
 *      系统入口
 */
class Main extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->helper(array('coolfe'));
    }

    //首页设置
    function index()
    {
        $data['theme'] = 'claro';
        $data['username'] = 'yacole';
        set_sess("uid",1);
        //设置标题
        $data['title'] = '';
        $data['host'] = $_SERVER['REMOTE_ADDR'];

        $this->load->view('layout_main',$data);
    }
     function php_info(){
         echo phpinfo();
     }
    /*
     * 首页界面配置 : 导航栏菜单栏
     */
    function menubar(){
        //到时候通过配置，设置首页菜单
        echo '{
            "items" : [
             {"name":"program","label":"程序","children":
            [
            { "id": "1","type": "program","do": "direct_to","url": "gogo" ,"label":"信息记录"},
            { "id": "2","type": "program","do": "direct_to","url": "","label":"货源清单" },
            { "id": "2","type": "MenuSeparator","do": "direct_to","url": "","label":"" },
            { "id": "3","type": "program","do": "direct_to","url": "","label":"更多","children" :
                [
                    {"id": "4","type": "program","do": "direct_to","url": "","label":"很多","children" :
                        [
                            {"id": "4","type": "program","do": "direct_to","url": "","label":"喜多多"}
                        ]
                    },
                    { "id": "2","type": "MenuSeparator","do": "direct_to","url": "","label":"" },
                    {"id": "4","type": "program","do": "direct_to","url": "","label":"多西多"}
                ]
            },
            { "id": "2","type": "program","do": "direct_to","url": "","label":"货源清单2" }
            ]
            },
            {"name":"edit","label":"编辑","children":
            [
            { "id": "1","type": "program","do": "direct_to","url": "gogo" ,"label":"粘贴"},
            { "id": "2","type": "program","do": "direct_to","url": "","label":"复制" },
            { "id": "3","type": "program","do": "direct_to","url": "","label":"保存","children" :
                [
                    {"id": "4","type": "program","do": "direct_to","url": "","label":"另存为CSV"},
                    {"id": "4","type": "program","do": "direct_to","url": "","label":"另存为TXT"},
                    {"id": "4","type": "program","do": "direct_to","url": "","label":"另存为PDF"}
                ]
            }
            ]
            }
            ]
            }';
    }

    //个人首页设定
    function board()
    {
        $this->load->view('bc/board');
    }

    function navigator(){
        echo '{
            "identifier": "Menu_id",
            "label":"Description",
            "items":
            [
                {"Menu_id": 1,"Description": "检查权限","F_TYPE":"program","program_id":4},
                {"Menu_id": 3,"Description": "超级管理员","children":
                [
                    {"Menu_id": 10,"Description": "角色管理","children":
                    [
                        {"Menu_id": 11,"Description": "角色创建","F_TYPE":"program","program_id":3},
                        {"Menu_id": 12,"Description": "角色修改","F_TYPE":"program","program_id":4}
                    ]
                    },
                    {"Menu_id": 16,"Description": "用户管理","children":
                    [
                        {"Menu_id": 13,"Description": "用户创建","F_TYPE":"program","program_id":5},
                        {"Menu_id": 14,"Description": "用户修改","F_TYPE":"program","program_id":6},
                        {"Menu_id": 15,"Description": "用户批量管理","F_TYPE":"batch","program_id":7}
                    ]
                    }
                ]
                },
                {"Menu_id": 4,"Description": "屏幕字段修改","F_TYPE":"program","program_id":3},
                {"Menu_id": 24,"Description": "程序管理","F_TYPE":"program","program_id":1},
                {"Menu_id": 25,"Description": "程序清单报表","F_TYPE":"report","program_id":5},
                {"Menu_id": 26,"Description": "报表设计器","F_TYPE":"program","program_id":6}
            ]
        }';



    }
}