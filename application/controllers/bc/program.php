<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-9
 * Time: 上午11:19
 * To change this template use File | Settings | File Templates.
 */
class Program extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->model('bc/valuelist_model','vl');
        $this->load->model('bc/program_model','program');
        $this->load->model('bc/uifield_model','uifield');
        $this->load->model('bc/grid_layout_model','grid');
    }

    //程序入口
    function index()
    {
        $this->load->view('bc/program/index');
    }

    /*
     * CRUD操作
     */
    function create(){
        //判断是否为POST
        if($_POST){

            if($this->program->isexists($_POST['program_name'])){

                echo "程序名已存在";

            }else{
                $data['program_name'] = cftrim($_POST['program_name']) ;
                $data['title'] = cftrim($_POST['title']) ;
                $data['appliction_code'] = cftrim($_POST['appliction_code']) ;
                $data['program_type'] = cftrim($_POST['program_type']) ;
                $data['controller'] = cftrim($_POST['controller']) ;
                $data['action'] = cftrim($_POST['action']) ;
                $data['help_text'] = $_POST['help_text'] ;
                $data['qform_flag'] = xchecked($_POST['qform_flag']) ;

                if($this->program->create($data)){
                    echo "成功";
                }else{
                    echo "失败";
                }
            }

        }else{
            $this->load->view('bc/program/create');
        }

    }

    function show(){

        $this->load->view('bc/valuelist/show');

    }

    function edit(){
        //判断是否为POST
        if($_POST){

            if($this->program->isexists($_POST['program_name'])){

                $data['program_name'] = cftrim($_POST['program_name']) ;
                $data['title'] = cftrim($_POST['title']) ;
                $data['appliction_code'] = cftrim($_POST['appliction_code']) ;
                $data['program_type'] = cftrim($_POST['program_type']) ;
                $data['controller'] = cftrim($_POST['controller']) ;
                $data['action'] = cftrim($_POST['action']) ;
                $data['help_text'] = $_POST['help_text'] ;

                if($this->program->create($data)){
                    echo "成功";
                }else{
                    echo "失败";
                }

            }else{
                echo "程序名不存在";
            }

        }else{
            $this->load->view('bc/program/edit');
        }
    }

    function destory(){

    }

    //执行
    function excute(){

    }

    //报表测试
   function rpt_program_list(){
       $rs = $this->uifield->find_all();
       $rows = cf_format($rs->result_array());
       export_to_itemStore($rows,"ui_field_id","label");
   }

    //获取报表布局
    function rpt_find_layout(){
        $rs = $this->grid->find(get_parameter('layout_id'));
        echo rs_to_json($rs);
    }

    function rpt_default_layout(){
       echo rs_to_json($this->grid->find_default(get_parameter('program_id'),_sess('uid')));
    }

    function rpt_layouts(){
        echo rs_to_itemStore($this->grid->find_by_program_id(get_parameter('program_id')));
    }

    /*
     * 界面配置 : 获取菜单栏,工作区
     */
    function menubar()
    {
        if($_GET['id'] == '1'){
            echo '{
                "items" : [
                 {"name":"program","label":"程序","children":
                [
                { "id": "1","type": "program","do": "direct_to","url": "gogo" ,"label":"信息记录"},
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
        }else{
            echo '{
                "items" : [
                 {"name":"program","label":"程序","children":
                [
                { "id": "1","type": "program","do": "direct_to","url": "gogo" ,"label":"信息记录"},
                { "id": "2","type": "program","do": "direct_to","url": "","label":"货源清单2" }
                ]
                }
                ]
                }';
        }
    }

    function workspace()
    {
        if(isset($_GET['id'])){
            $rs = $this->program->find($_GET['id']);
            echo rs_to_json($rs);
        }
    }

    /*
     * 获取数据接口：给外部提供数据
     */
    function find_by_name()
    {
        if(isset($_GET['program_name'])){
            $rs = $this->program->find_by_name($_GET['program_name']);
            echo rs_to_json($rs);
        }
    }

    function find()
    {
        if(isset($_GET['program_id'])){
            $rs = $this->program->find($_GET['program_id']);
            echo rs_to_json($rs);
        }
    }

}