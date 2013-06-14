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

    function find_default($program_id){
        $this->db->from('bc_grid_layouts_v');
        $this->db->where(array('program_id' => $program_id,'default_flag' => 1));
        $this->db->order_by('pos');
        return $this->db->get();
    }

    function find($layout_id){
        return $this->db->get_where('bc_grid_layouts_v',array('layout_id' => $layout_id));
    }

    //新建
    function create($header,$lines){
        $return = false;
        $header = set_creation_date($header);
        //判断是否为默认，先去除其他默认，后插入
        if($header['default_flag'] == 1){
            if($this->clear_default($header['program_id'],$header['layout_type'])){
                if($this->db->insert('bc_grid_layouts_tl',$header)){
                    for($i = 0;$i < count($lines);$i++){
                        $lines[$i] = set_creation_date($lines[$i]);
                        $lines[$i]['layout_id'] = $this->db->insert_id();
                    }
                    if($this->db->insert_batch('bc_glayout_columns_tl',$lines)){
                        $return = true;
                    }
                }
            }
        }
        return $return;
    }

    function update($header,$lines){
        $return = false;
        $header = set_last_update($header);
        //判断是否为默认，先去除其他默认，后插入
        if($header['default_flag'] == 1){
            if($this->clear_default($header['program_id'],$header['layout_type'])){
                $this->db->where('layout_id',$header['layout_id']);
                //先更新头
                if($this->db->update('bc_grid_layouts_tl',$header)){
                    //删除行
                    if($this->db->delete('bc_glayout_columns_tl', array('layout_id' => $header['layout_id']))){
                        for($i = 0;$i < count($lines);$i++){
                            $lines[$i] = set_creation_date($lines[$i]);
                            $lines[$i]['layout_id'] = $header['layout_id'];
                        }
                        //插入行
                        if($this->db->insert_batch('bc_glayout_columns_tl',$lines)){
                            $return = true;
                        }
                    }

                }
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