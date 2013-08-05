<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Message_model extends CI_Model{

    function __construct(){
        parent::__construct();
    }

    function find_by_class_and_code($class,$code){
        $rs_message = null;
        $rs_class = firstRow($this->db->get_where('bc_message_class_tl',array('class_code'=>$class)));
        if(!is_null($rs_class)){
            $rs_message = firstRow($this->db->get_where('bc_messages_tl',array('class_id'=>$rs_class['class_id'],'message_code' =>$code)));
        }
        return $rs_message;
    }

    function find_detail_by_id($id){
        return $this->db->get_where('bc_message_details_tl',array('message_id'=>$id));
    }

}