<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-27
 * Time: 上午11:15
 * To change this template use File | Settings | File Templates.
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
        $messages = [];
        //判断是否为POST
        if($_POST){
            //如果不存在则创建
            if($this->uifield->find_field_by_program_id_and_name($_POST['program_id'],$_POST['field_name'])){
                $data['program_id'] = $_POST['program_id'];
                $data['field_name'] =  cftrim($_POST['field_name']);
                $data['label'] = $_POST['label'];
                $data['field_size'] = $_POST['field_size'];
                $data['required_flag'] = $_POST['required_flag'];
                $data['hidden_flag'] = $_POST['hidden_flag'];
                $data['disabled_flag'] = $_POST['disabled_flag'];
                $data['help_text'] = $_POST['help_text'];
                $data['default_value'] = $_POST['default_value'];
                //处理验证码，转成id
                $data['validation_id'] = $this->validator->get_id(cftrim($_POST['validation_code']));

                //处理值集，转成id
                $data['valuelist_id'] = $this->valuelist->get_id(cftrim($_POST['valuelist_name']));

                //                echo date("Y-m-d H:i:s",$_POST['last_update_date']);
                //                date_default_timezone_set("Asia/Shanghai");

                if($this->uifield->create($data)){
                    array_push($messages,message('I','DATABASE','01',[$data['field_name']]));
                }else{
                    array_push($messages,message('E','DATABASE','02'));
                }
            }else{
                array_push($messages,message('E','DATABASE','03'));
            }


        }else{
            array_push($messages,message('E','REQUEST','01'));
        }
        $response['messages'] = $messages;
        //输出消息
        echo json_encode($response);

    }

    function show(){



    }

    function update(){
        $messages = [];
        //判断是否为POST
        if($_POST){

            if($this->uifield->isexists($_POST['ui_field_id'])){

                $data['label'] = $_POST['label'];
                $data['ui_field_id'] = $_POST['ui_field_id'];
                $data['field_size'] = $_POST['field_size'];
                $data['required_flag'] = $_POST['required_flag'];
                $data['hidden_flag'] = $_POST['hidden_flag'];
                $data['disabled_flag'] = $_POST['disabled_flag'];
                $data['help_text'] = $_POST['help_text'];
                $data['default_value'] = $_POST['default_value'];

                //处理验证码，转成id
                $data['validation_id'] = $this->validator->get_id(cftrim($_POST['validation_code']));

                //处理值集，转成id
                $data['valuelist_id'] = $this->valuelist->get_id(cftrim($_POST['valuelist_name']));

                if($this->uifield->update($data)){
                    array_push($messages,message('I','DATABASE','01',[$_POST['field_name']]));
                }else{
                    array_push($messages,message('E','DATABASE','02'));
                }


            }else{
                array_push($messages,message('E','DATABASE','03'));
            }
        }else{
            array_push($messages,message('E','REQUEST','01'));
        }
        $response['messages'] = $messages;
        //输出消息
        echo json_encode($response);
    }

    function destroy(){
        $messages = [];
        //判断是否为POST
        if($_POST){

            if($this->uifield->destroy($_POST['ui_field_id'])) {
                //删除成功
//                       $data = array("message_id" => 1);
                array_push($messages,message('I','DATABASE','01'));
            }else{
                //删除失败
//                       $data = array("message_id" => 1);
                array_push($messages,message('E','DATABASE','02'));

            }
        }else{
            array_push($messages,message('E','REQUEST','01'));
        }

        $response['messages'] = $messages;
        //输出消息
        echo json_encode($response);
    }

    //编辑表单
    function formDialog(){
        $this->load->view("bc/uifield/_formDialog");
    }

    /*
     * 获取数据接口：给外部提供数据
     */

    function find_field_by_program_id_and_name(){
        if(isset($_GET['program_id']) && isset($_GET['field_name'])){
            $rs = $this->uifield->find_field_by_program_id_and_name($_GET['program_id'],$_GET['field_name']);
            echo rs_to_json($rs);
        }
    }

    function find_fields_by_program_name(){
        if(isset($_GET['program_name'])){
            $rs = $this->uifield->find_fields_by_program_name($_GET['program_name']);
            export_to_itemStore($rs,'field_name','label');
        }
    }

    function find_fields_by_program_id(){
        if(isset($_GET['program_id'])){
            $rs = $this->uifield->find_fields_by_program_id($_GET['program_id']);
            export_to_itemStore($rs,'field_name','label');
        }
    }

}
