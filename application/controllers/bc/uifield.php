<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
 * 摘要：
 *      UI界面的字段属性配置，包括：名称，大小，值集，以及验证信息
 */
class Uifield extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->model('bc/valuelist_model','valuelist');
        $this->load->model('bc/program_model','program');
        $this->load->model('bc/uifield_model','uifield');
        $this->load->model('bc/validator_model','validator');
        $this->load->model('bc/valuelist_model','valuelist');
    }

    //程序入口
    function index()
    {
        $this->load->view("bc/uifield/index");
    }

    /*
     * CRUD操作
     */
    function create(){
        //判断是否为POST
        if($_POST){
            //如果不存在则创建
            if($this->uifield->find_field_by_program_id_and_name($_POST['program_id'],cftrim($_POST['field_name']))){
                $data = $this->_post_data($_POST);
                $data['program_id'] = $_POST['program_id'];

                if($this->uifield->create($data)){
                    message('I','DATABASE','01',[$data['field_name']]);
                }else{
                    message('E','DATABASE','02');
                }
            }else{
                message('E','DATABASE','03');
            }
        }else{
            message('E','REQUEST','01');
        }
    }

    //显示
    function show(){}

    //更新
    function update(){
        if($_POST){
            if($this->uifield->isexists($_POST['ui_field_id'])){
                $data = $this->_post_data($_POST);
                $data['ui_field_id'] = $_POST['ui_field_id'];
                if($this->uifield->update($data)){
                    message('I','DATABASE','01',[$data['field_name']]);
                }else{
                    message('E','DATABASE','02');
                }
            }else{
                message('E','DATABASE','03');
            }
        }else{
            message('E','REQUEST','01');
        }
    }
    //销毁
    function destroy(){
        if($_POST){
            if($this->uifield->destroy($_POST['ui_field_id'])) {
                //删除成功
                message('I','DATABASE','01');
            }else{
                //删除失败
                message('E','DATABASE','02');
            }
        }else{
            message('E','REQUEST','01');
        }
    }

    //编辑表单
    function formDialog(){
        $this->load->view("bc/uifield/_formDialog");
    }


    /*
     * 获取数据接口：给外部提供数据
     */

    function find_field_by_program_id_and_name(){
        if(get_parameter('program_id') && get_parameter('field_name')){
            $rs = $this->uifield->find_field_by_program_id_and_name(get_parameter('program_id'),cftrim(get_parameter('field_name')));
            export_to_json($rs);
        }
    }

    function find_fields_by_program_name(){
        if(get_parameter('program_name')){
            $rs = $this->uifield->find_fields_by_program_name(cftrim(get_parameter('program_name')));
            export_to_itemStore($rs,'field_name','label');
        }
    }

    function find_fields_by_program_id(){
        if(isset($_GET['program_id'])){
            $rs = $this->uifield->find_fields_by_program_id(get_parameter('program_id'));
            export_to_itemStore($rs,'field_name','label');
        }
    }

    //内部函数
    protected function _post_data($post){
        //数据处理
        $data['field_name'] =  cftrim($post['field_name']);
        $data['label'] = $post['label'];
        $data['field_size'] = $post['field_size'];
        $data['required_flag'] = $post['required_flag'];
        $data['hidden_flag'] = $post['hidden_flag'];
        $data['disabled_flag'] = $post['disabled_flag'];
        $data['help_text'] = $post['help_text'];
        $data['default_value'] = $post['default_value'];
        //处理验证码，转成id
        $data['validation_id'] = $this->validator->get_id(cftrim($post['validation_code']));
        //处理值集，转成id
        $data['valuelist_id'] = $this->valuelist->get_id(cftrim($post['valuelist_name']));

        //                echo date("Y-m-d H:i:s",$_POST['last_update_date']);
        //                date_default_timezone_set("Asia/Shanghai");
        return $data;
    }

}
