<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-5-30
 * Time: 上午9:01
 * To change this template use File | Settings | File Templates.
 */
class Grid_layout extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->model('bc/grid_layout_model','layout');
    }

    function index(){
        $this->load->view('bc/program/rpts/grid/layout_select');
    }

    function save(){
        $messages = [];
        //判断是否为POST
        if($_POST){
            $header['program_id'] = $_POST['program_id'];
            $header['layout_name'] = cftrim($_POST['layout_name']);
            $header['description'] = cftrim($_POST['description']);
            $header['default_flag'] = $_POST['default_flag'];
            $header['layout_type'] = cftrim($_POST['layout_type']);
            //返回ARRAY
            $structure = json_decode($_POST['structure'],true);
            $lines = [];
            $i = 0;
            foreach($structure as $e){
                $line['pos'] = $i;
                $line['field'] = $e['field'];
                $line['label'] = $e['name'];
                $line['size'] = $e['width'];
                $i = $i + 1;
                array_push($lines,$line);
            }
            //判断是否存在，存在则更新头部，删除行，并插入行
            $row = firstRow($this->layout->find_by_program_id_and_layout_name($header['program_id'],$header['layout_name']));
            if($row){
                $header['layout_id'] = $row['layout_id'];
                if($this->layout->update($header,$lines)){
                    array_push($messages,message('I','DATABASE','01'));
                }else{
                    array_push($messages,message('E','DATABASE','02'));
                }

            }else{
                //不存在则新建
                //存在则更新
                if($this->layout->create($header,$lines)){
                    array_push($messages,message('I','DATABASE','01'));
                }else{
                    array_push($messages,message('E','DATABASE','02'));
                }
            }

        }
        $response['messages'] = $messages;
        //输出消息
        echo json_encode($response);
    }

    //删除
    function destroy(){
        $messages = [];
        //判断是否为POST
        if($_POST){
            if($this->layout->destroy($_POST['layout_id'])){
                array_push($messages,message('I','DATABASE','01'));
            }else{
                array_push($messages,message('E','DATABASE','02'));
            }
        }
        $response['messages'] = $messages;
        //输出消息
        echo json_encode($response);
    }

    //设置默认
    function set_default(){
        $messages = [];
        //判断是否为POST
        if($_POST){
            if($this->layout->set_default($_POST['layout_id'])){
                array_push($messages,message('I','DATABASE','01'));
            }else{
                array_push($messages,message('E','DATABASE','02'));
            }
        }
        $response['messages'] = $messages;
        //输出消息
        echo json_encode($response);
    }

}