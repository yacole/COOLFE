<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-21
 * Time: 下午7:56
 * 程序数据库操作
 */
class Program_model extends CI_Model{

    function __construct(){
        parent::__construct();
    }

    function  find($id){
        return $this->db->get_where('bc_programs_tl',array('program_id' => $id));
//        return $this->db->get('bc_programs_tl');
    }

    function find_all(){
        return $this->db->get('bc_programs_tl');
    }

    function  find_by_name($program_name){
        return $this->db->get_where('bc_programs_tl',array('program_name' => $program_name));
    }

    //判断是否存在
    function isexists($program_name){
        $this->db->from('bc_programs_tl');
        $this->db->where('program_name' ,$program_name);
        $cnt = $this->db->count_all_results();
        if($cnt > 0){
            return true;
        }else{
            return false;
        }
    }

    //新建
    function create($data){
        $data = set_creation_date($data);
        return $this->db->insert('bc_programs_tl',$data);
    }

    function update($data){
        $data = set_last_update($data);
        $this->db->where('program_id', $data['program_id']);
        return $this->db->update('bc_programs_tl', $data);
    }
}