<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * 摘要：
 * 由于前段布局无法保持，此控制器用于远程布局管理
 */
class Grid_layout extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->model('bc/grid_layout_model','layout');
    }
    //保持
    function save(){
        //判断是否为POST
        if($_POST){
            $data['program_id'] = $_POST['program_id'];
            $data['layout_name'] = cftrim($_POST['layout_name']);
            $data['description'] = cftrim($_POST['description']);
            $data['default_flag'] = $_POST['default_flag'];
            $data['layout_type'] = cftrim($_POST['layout_type']);
            //返回ARRAY
//            $structure = json_decode($_POST['structure'],true);
            $data['structure'] = cftrim($_POST['structure']);
            //判断是否存在，存在则更新头部，删除行，并插入行
            $row = firstRow($this->layout->find_by_program_id_and_layout_name($data['program_id'],$data['layout_name']));
            if($row){
                $data['layout_id'] = $row['layout_id'];
                if($this->layout->update($data)){
                    message('I','DATABASE','01');
                }else{
                    message('E','DATABASE','02');
                }

            }else{
                //不存在则新建
                //存在则更新
                if($this->layout->create($data)){
                    message('I','DATABASE','01');
                }else{
                    message('E','DATABASE','02');
                }
            }

        }
    }

    //删除
    function destroy(){
        //判断是否为POST
        if($_POST){
            if($this->layout->destroy($_POST['layout_id'])){
                message('I','DATABASE','01');
            }else{
                message('E','DATABASE','02');
            }
        }
    }

    //设置默认
    function set_default(){
        //判断是否为POST
        if($_POST){
            if($this->layout->set_default($_POST['layout_id'])){
                message('I','DATABASE','01');
            }else{
                message('E','DATABASE','02');
            }
        }
    }

}