<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->model('bc/report_model','report');
    }

    //报表数据的统一出口
    function read_data(){
        $report_id = get_parameter("report_id");
        $row = firstRow($this->report->find_last_version($report_id));
        if(!is_null($row)){
            //判断数据来源
            switch($row['source_type']){
                //如果为function提取，则转至
                case '02' :
                    redirect($row['source_text']);
                    break;
                case '01' :
                    //如果为SQL语句提取，则直接查询
                    export_to_itemStore($this->db->query($row['source_text']));
                    break;
            }
        }
    }
    //报表设计器
    function builder(){
        $this->load->view('bc/report/index');
    }

    function create(){
        $this->load->view('bc/report/create');
    }

    function save_base_data(){
        //do save
        //sturcture

    }
    function column_list(){
        $sql = get_parameter("sql");
        $sql = "select * from ("+$sql+") limit 1";
        echo json_encode(firstRow($this->db->query($sql)));
    }
}