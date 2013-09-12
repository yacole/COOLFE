<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report_model extends CI_Model{

    function __construct(){
        parent::__construct();
    }

    function  find($id){
        return $this->db->get_where('bc_reports_h_v',array('report_id' => $id));
    }

    function  find_last_version_source($id){
        return $this->db->get_where('bc_report_source_tl',array('report_id' => $id,'last_version_flag' => 1));
    }

    function find_by_name($report_name){
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

    function find_group($report_group_id){
        return $this->db->get_where('bc_report_groups_tl',array('report_group_id' => $report_group_id));
    }

    function create_group($data){
        $data = set_creation_date($data);
        return $this->db->insert('bc_report_groups_tl',$data);
    }

    function update_group($data){
        $data = set_last_update($data);
        $this->db->where('report_group_id', $data['report_group_id']);
        return $this->db->update('bc_report_groups_tl', $data);
    }

    function destroy_group($id){
        return $this->db->delete('bc_report_groups_tl', array('report_group_id' => $id));
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

    //根据报表组名查询报表组信息
    function find_group_by_name($group_name){
        return $this->db->get_where('bc_report_groups_tl',array('name' => $group_name));
    }

    function create_base_data($data){
        $data = set_creation_date($data);
        return $this->db->insert('bc_reports_tl',$data);
    }
    function update_base_data($data){
        $data = set_last_update($data);
        $this->db->where('report_id', $data['report_id']);
        return $this->db->update('bc_reports_tl', $data);
    }
    function create_source_data($data){
        $data = set_creation_date($data);
        $data['last_version_flag'] = 1;
        //先更新以前的最终版本标识
        $this->db->trans_start();
        $this->db->where(array('report_id'=> $data['report_id'],'last_version_flag' => 1));
        $this->db->update('bc_report_source_tl', array('last_version_flag'=> 0));
        //插入
        $this->db->insert('bc_report_source_tl',$data);
        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE)
        {
            // 生成一条错误信息... 或者使用 log_message() 函数来记录你的错误信息
            return false;
        }else{
            return true;
        }
    }

    function destroy_report($report_id){
        //事务：用于删除报表相关的数据
        $this->db->trans_start();
        $this->db->delete('bc_reports_tl', array('report_id' => $report_id));
        $this->db->delete('bc_report_parameters_tl', array('report_id' => $report_id));
        $this->db->delete('bc_report_source_tl', array('report_id' => $report_id));
        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE)
        {
            return false;
        }else{
            return true;
        }
    }

    //获取报表数据的准备状态
    function has_data($report_id,$type){
        $rt = false;
        $report = firstRow($this->find($report_id));
        switch($type){
            case 'base':
                if($report){
                    $rt = true;
                }
                break;
            case 'source':
                if(count($this->find_last_version_source($report_id)->result_array()) > 0){
                    $rt = true;
                }
                break;
            case 'parameter':
                if(count($this->find_parameters_by_id($report_id)->result_array()) > 0){
                    $rt = true;
                }
                break;
            case 'structure':
                if($report['structure']){
                    $rt = true;
                }
                break;
        }
        return $rt;
    }
    //根据数据源获取列信息，获取第一行
    function column_list_by_source_id($id){
        $row = firstRow($this->db->get_where('bc_report_source_tl',array('id'=>$id,'source_type'=>'01')));
        $sql = 'select t.* from (' . $row['source_text'] . ') as t limit 0';
//        return mysql_query($row['source_text']);
        return mysql_query($sql);
    }
    //获取现有参数列表
    function find_parameters_by_report_id($report_id){
        return $this->db->get_where('bc_report_parameters_v',array('report_id'=>$report_id));
    }
    //刷新参数
    function update_parameters($report_id,$rows){
        $this->db->trans_start();
        $this->db->delete('bc_report_parameters_tl', array('report_id' => $report_id));
        if(count($rows) > 0){
            for($i=0;$i<count($rows);$i++){
                $data['report_id'] = $report_id;
                $data['field'] = $rows[$i]['field'];
                $data['action'] = $rows[$i]['action'];
                $data['default_value'] = $rows[$i]['default_value'];
                $data['required_flag'] = $rows[$i]['required_flag'];
                $data['input_type'] = $rows[$i]['input_type'];
                if(isset($rows[$i]['valuelist_id'])){
                    $data['valuelist_id'] = $rows[$i]['valuelist_id'];
                }
                $data = set_creation_date($data);
                $this->db->insert('bc_report_parameters_tl',$data);
            }
        }
        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE)
        {
            return false;
        }else{
            return true;
        }
    }

}