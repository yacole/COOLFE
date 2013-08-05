<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report_model extends CI_Model{

    function __construct(){
        parent::__construct();
    }

    function  find($id){
        return $this->db->get_where('bc_reports_tl',array('report_id' => $id));
    }

    function  find_last_version($id){
        return $this->db->get_where('bc_reports_v',array('report_id' => $id,'release_flag' => 1,'last_version_flag' => 1));
    }

    function find_base_by_name($report_name){
        return $this->db->get_where('bc_reports_tl',array('name' => $report_name));
    }

    function find_parameters_by_id($id){
        return $this->db->get_where('bc_report_parameters_tl',array('report_id' => $id));
    }

    function find_all_by_group_id($group_id){
        return $this->db->get_where('bc_reports_tl',array('report_group_id' => $group_id));
    }

    function find_groups(){
        return $this->db->get('bc_report_groups_tl');
    }
    //根据报表组名查询报表组
    function find_group_by_group_name($name){
        return $this->db->get_where('bc_report_groups_tl',array('name' => $name));
    }

    function builder(){
        //builder可以做license控制

    }

    function isexists($report_name){
        $this->db->from('bc_reports_tl');
        $this->db->where('name' ,$report_name);
        $cnt = $this->db->count_all_results();
        if($cnt > 0){
            return true;
        }else{
            return false;
        }
    }

    function find_group_by_name($group_name){
        return $this->db->get_where('bc_report_groups_tl',array('name' => $group_name));
    }

    function create_base_data($data){
        $data = set_creation_date($data);
        return $this->db->insert('bc_reports_tl',$data);
    }

    //获取报表数据的准备状态
    function has_data($report_name,$type){
        $rt = false;
        $report = firstRow($this->find_base_by_name($report_name));
        switch($type){
            case 'base':
                if($report){
                    $rs = true;
                }
                break;
            case 'source':
                if($this->find_last_version($report['report_id'])){
                    $rs = true;
                }
                break;
            case 'parameter':
                if($this->find_parameters_by_id($report['report_id'])){
                    $rs = true;
                }
                break;
            case 'structure':
                if($report['structure']){
                    $rs = true;
                }
                break;
        }
        return $rt;
    }
}