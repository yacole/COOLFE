<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-5-20
 * Time: 上午9:22
 * To change this template use File | Settings | File Templates.
 */
class Validator_model extends CI_Model{

    function __construct(){
        parent::__construct();
    }

    function find($id){
        return $this->db->get_where('bc_validator_tl',array('validation_id'=>$id));
    }

    function find_by_name($name){
        return $this->db->get_where('bc_validator_tl',array('validation_code'=>$name));
    }

    //根据验证码获取id
    function get_id($name){
        $r = firstRow($this->db->get_where('bc_validator_tl',array('validation_code'=>$name)));
        if(!is_null($r)){
            return $r['validation_id'];
        }else{
            return null;
        }
    }
}