<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Uifield_model extends CI_Model{

    function __construct(){
        parent::__construct();
    }

    function  find($id){
        return $this->db->get_where('bc_ui_fields_tl',array('ui_field_id' => $id));
    }

    //根据程序名称查找UI字段列表
    function  find_fields_by_program_name($program_name){
        //获取program_id
        $this->load->model('bc/program_model','program');
        $row = $this->program->find_by_name($program_name)->result_array();

        return $this->find_fields_by_program_id($row[0]['program_id']);

    }

    function  find_fields_by_program_id($program_id){

        return $this->db->get_where('bc_uifields_v',array('program_id' => $program_id));

    }

    function  find_field_by_program_id_and_name($program_id,$field_name){

        return $this->db->get_where('bc_ui_fields_tl',array('program_id' => $program_id,'field_name' => $field_name));

    }

    //删除
    function destroy($id){
        if($this->isexists($id)){
            return $this->db->delete('bc_ui_fields_tl', array('ui_field_id' => $id));
        }
    }
    //先判断是否存在
    function isexists($id){
        if($this->find($id)){
            return true;
        }else{
            false;
        }
    }

    //新建
    function create($data){
        $data = set_creation_date($data);
        return $this->db->insert('bc_ui_fields_tl',$data);
    }

    function update($data){
        $data = set_last_update($data);
        $this->db->where('ui_field_id', $data['ui_field_id']);
        return $this->db->update('bc_ui_fields_tl', $data);
    }

}