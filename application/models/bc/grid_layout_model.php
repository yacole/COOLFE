<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Grid_layout_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }

    //根据programID查找布局，一般用于报表
    function find_by_program_id($program_id){
        return $this->db->get_where('bc_grid_layouts_tl',array('program_id' => $program_id));
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
}