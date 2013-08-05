<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
 * 摘要：
 *      系统校验字段用
 */
class Validator extends CI_Controller {
    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->model('bc/validator_model','validator');
        $this->load->model('bc/uifield_model','uifield');
    }

    //验证函数：先验证正则表达式，后验证数据库查询
    function validate(){
        $data = [];
        $data['isValid'] = false;
        //不通过队列
        $data['inValid'] = array();
        //通过队列
        $data['valid'] = array();
        if($_POST){
            if(count($_POST) > 0){
                foreach ($_POST as $key => $value) {
                    $field = firstRow($this->uifield->find_field_by_program_id_and_name($_POST['program_id'],$key));
                    if(!is_null($field)){
                            $row = firstRow($this->uifield->find($field['ui_field_id']));
                            if(!is_null($row) && !is_null($row['validation_id'])){
                                //保证验证码存在
                                $validator = firstRow($this->validator->find($row['validation_id']));
                                if(!is_null($validator)){
                                    $flag = false;
                                    //正则表达式验证
                                    if($validator['regexp'] != ""){
                                        //转换正则表达式
                                        $regexp = '/'.$validator['regexp'].'/';
                                        if (preg_match($regexp,$value) == 1 ){
                                            $flag = true;
                                        }else{
                                            array_push($data['inValid'],$key);
                                        }
                                    }
                                    if($validator['sqltext'] != "" && $flag){
                                        //转换SQL，验证查询
                                        $sqltext = str_replace('?',$value,$validator['sqltext']);
                                        $query = $this->db->query($sqltext)->result_array();;

                                        //判断是否为反向验证
                                        if($validator['reverse_flag'] == 1){

                                            if(count($query) > 0){
                                                array_push($data['valid'],$key);
                                            }else{
                                                array_push($data['inValid'],$key);
                                            }
                                        }else{

                                            if(count($query) > 0){
                                                //如果找到结果，则不通过
                                                array_push($data['inValid'],$key);
                                            }else{
                                                //不存在则通过
                                                array_push($data['valid'],$key);
                                            }
                                        } //if

                                    }//if
                                }//if
                            }//if

                    }//if
                }//foreach
                if(count($data['inValid']) == 0){
                    $data['isValid'] = true;
                }

            }
        }
        //输出
        echo json_encode($data);
    }

    function find_by_uifield_id(){
        $rs = $this->uifield->find(get_parameter('field_id'))->result_array();
        if(count($rs) > 0){
            $row = $rs[0];
            if(!is_null($row['validation_id'])){
                //保证验证码存在
                $validator = $this->validator->find($row['validation_id']);
                echo rs_to_json($validator);
            }

        }
    }

    function find(){
        echo rs_to_json($this->validator->find(get_parameter('validation_id')));
    }

    function find_by_name(){
        echo rs_to_json($this->validator->find_by_name(get_parameter('validation_code')));
    }
}