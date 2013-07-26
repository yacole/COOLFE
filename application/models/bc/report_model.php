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

    function builder(){
        //builder可以做license控制

    }

}