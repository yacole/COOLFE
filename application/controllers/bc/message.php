<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-9
 * Time: 上午11:19
 * To change this template use File | Settings | File Templates.
 */
class Message extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->model('bc/message_model','message');
    }

    function show_detail(){
        $message_id = get_parameter('message_id');
        if(!is_null($message_id)){
            $data = firstRow($this->message->find_detail_by_id($message_id)) ;
            //来自客户端的信息
            $data['content'] = get_parameter('content');
            $data['code'] = get_parameter('code');

            $this->load->view("bc/message/show_detail",$data);
        }
    }

    /*
     * 外部取数接口
     */
    function find_by_class_and_code(){
        $class_code = get_parameter("class_code");
        $message_code = get_parameter("message_code");
        if(!is_null($class_code) && !is_null($message_code)){
            return json_encode($this->message->find_by_class_and_code($class_code,$message_code)) ;
        }
    }

}