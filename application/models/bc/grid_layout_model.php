<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Grid_layout_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }

    //根据programID查找布局，一般用于报表
    function find_by_program_id($program_id){
        return $this->db->get_where('bc_grid_layouts_tl',array('program_id' => $program_id));
    }

    function find_by_program_id_and_layout_name($program_id,$layout_name){
        return $this->db->get_where('bc_grid_layouts_tl',array('program_id' => $program_id,'layout_name' => $layout_name));
    }

    function find_default($program_id,$uid){
        //获取私有默认布局
        $this->db->from('bc_grid_layouts_tl');
        $this->db->where(array('program_id' => $program_id,'default_flag' => 1,'layout_type' => '02','created_by' => $uid));
        $rs = $this->db->get();
        if(is_null(firstRow($rs))){
            //获取全局
            $this->db->from('bc_grid_layouts_tl');
            $this->db->where(array('program_id' => $program_id,'default_flag' => 1,'layout_type' => '01'));
            $rs = $this->db->get();
        }
        return $rs;
    }

    function find($layout_id){
        return $this->db->get_where('bc_grid_layouts_tl',array('layout_id' => $layout_id));
    }

    //新建
    function create($data){
        $return = false;
        $data = set_creation_date($data);
        //判断是否为默认，先去除其他默认，后插入
        if($data['default_flag'] == 1){
            if($this->clear_default($data['program_id'],$data['layout_type'])){
                if($this->db->insert('bc_grid_layouts_tl',$data)){
                    $return = true;
                }
            }
        }else{
            if($this->db->insert('bc_grid_layouts_tl',$data)){
                $return = true;
            }
        }
        return $return;
    }

    function update($data){
        $return = false;
        $data = set_last_update($data);
        //判断是否为默认，先去除其他默认，后插入
        if($data['default_flag'] == 1){
            if($this->clear_default($data['program_id'],$data['layout_type'])){
                $this->db->where('layout_id',$data['layout_id']);
                //先更新头
                if($this->db->update('bc_grid_layouts_tl',$data)){
                    $return = true;
                }
            }
        }else{
            $this->db->where('layout_id',$data['layout_id']);
            if($this->db->update('bc_grid_layouts_tl',$data)){
                $return = true;
            }
        }
        return $return;
    }

    function destroy($id){
        $return = false;
        $row = firstRow($this->db->get_where('bc_grid_layouts_tl',array('layout_id' => $id)));
        if($row){
            if($this->db->delete('bc_grid_layouts_tl', array('layout_id' => $id))){
                $return = true;
            }
        }
        return $return;
    }

    function set_default($id){
        $return = false;
        $row = firstRow($this->db->get_where('bc_grid_layouts_tl',array('layout_id' => $id)));
        if($row){
            if($this->clear_default($row['program_id'],$row['layout_type'])){
                $this->db->where(array('layout_id' => $id));
                if($this->db->update('bc_grid_layouts_tl',array('default_flag' => 1))){
                    $return = true;
                }
            }
        }
        return $return;
    }
    //清除默认
    function clear_default($program_id,$layout_type){
        $this->db->where(array('program_id' => $program_id,'layout_type' => $layout_type));
        return $this->db->update('bc_grid_layouts_tl',array('default_flag' => 0));
    }
}