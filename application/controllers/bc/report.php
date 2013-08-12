<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
 * 摘要：
 *      报表管理
 */
class Report extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->model('bc/report_model','report');
    }

    /*
    *   程序入口，用于渲染展示界面
    */
    //报表设计器
    function builder(){
        render();
    }

    /*
    *   给外部程序提供的接口
    */

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

    //创建报表组
    function create_group(){
        if($_POST){
            //如果不存在则创建
            if(!firstRow($this->report->find_group_by_group_name(cftrim($_POST['name'])))){
                $data['name'] =  cftrim($_POST['name']);
                $data['description'] =  cftrim($_POST['description']);

                if($this->report->create_group($data)){
                    message('I','DATABASE','01',[$data['name']]);
                }else{
                    message('E','DATABASE','02');
                }
            }else{
                message('E','DATABASE','03');
            }


        }else{
            message('E','REQUEST','01');
        }
    }

    function rename_group(){
        if($_POST){
            $row = firstRow($this->report->find_group_by_group_name(cftrim($_POST['name'])));
            //如果不存在则创建
            if(!is_null($row)){
                $data['description'] =  cftrim($_POST['description']);
                $data['report_group_id'] =  $row['report_group_id'];

                if($this->report->update_group($data)){
                    message('I','DATABASE','01',[$_POST['name']]);
                }else{
                    message('E','DATABASE','02');
                }
            }else{
                message('E','DATABASE','03');
            }


        }else{
            message('E','REQUEST','01');
        }
    }

    function create(){
        $data['type'] = 'create';
        $data['report_name'] = get_parameter('report_name');
        $this->load->view('bc/report/builder',$data);
    }

    function edit(){
        $data = $this->_hasData(get_parameter('report_name'));
        $data['type'] = 'edit';
        $data['report_name'] = get_parameter('report_name');;
        $this->load->view('bc/report/builder',$data);
    }

    function show(){
        $data = $this->_hasData(get_parameter('report_name'));
        $data['type'] = 'show';
        $data['report_name'] = get_parameter('report_name');;
        $this->load->view('bc/report/builder',$data);
    }

    //保存基础数据
    function create_base_data(){
        $messages = [];
        //判断是否为POST
        if($_POST){
            //如果不存在则创建
            if(!$this->report->isexists(cftrim($_POST['report_name']))){
                $data['name'] =  cftrim($_POST['report_name']);
                $data['description'] =  cftrim($_POST['description']);
                $data['report_group_id'] = firstRow($this->report->find_group_by_name(cftrim($_POST['report_group'])))['report_group_id'] ;

                if($this->report->create_base_data($data)){
                    message('I','DATABASE','01',[$data['name']]);
                }else{
                    message('E','DATABASE','02');
                }
            }else{
                message('E','DATABASE','03');
            }
        }else{
            message('E','REQUEST','01');
        }
    }
    //保存数据来源
    function create_source_data(){
        if($_POST){

        }
    }

    //根据报表名获取rs
    function find_base_by_name(){
        export_to_json($this->report->find_base_by_name(get_parameter('report_name')));
    }

    //根据sql获取列的list
    function column_list(){
        $sql = get_parameter("sql");
        $sql = "select * from ("+$sql+") limit 1";
        echo json_encode(firstRow($this->db->query($sql)));
    }

    //报表管理器，树状结构
    function find_all(){
        $rows = [];
        $groups = $this->report->find_groups()->result_array();
        $cnt = count($groups);
        $id = 1;
        if($cnt > 0){
            for($i = 0 ; $i < $cnt ; $i++){
                $row = null;
                $row['description'] =  $groups[$i]['description'] ;
                $row['name'] = $groups[$i]['name'] ;
                $row['report_group_id'] = $groups[$i]['report_group_id'] ;
                //唯一性标识
                $row['id'] = strval($id);
                $id ++;
                $reports = $this->report->find_all_by_group_id($groups[$i]['report_group_id'])->result_array();
                //插入子节点
                $row['reports'] = [];
                for($y = 0 ; $y < count($reports) ; $y++){
                    $row_r = null;
                    $row_r['description'] = $reports[$y]['description'];
                    $row_r['name'] = $reports[$y]['name'];
                    $row_r['report_id'] = $reports[$y]['report_id'];
                    $row_r['report_group_id'] = $reports[$y]['report_group_id'];
                    //唯一性标识
                    $row_r['id'] = strval($id);
                    $id ++;
                    array_push($row['reports'],$row_r);
                }
                array_push($rows,$row);
            }
        }
        $data["identifier"] = 'id';
        $data["label"] = 'description';
        $data['items'] = $rows;
        echo json_encode($data);
    }

    function find_group(){
        export_to_json($this->report->find_group(get_parameter('report_group_id')));
    }

    //报表状态
    protected function _hasData($report_name){
        $data['hasBase'] = $this->report->has_data($report_name,'base');
        $data['hasParameter'] = $this->report->has_data($report_name,'parameter');
        $data['hasSource'] = $this->report->has_data($report_name,'source');
        $data['hasStructure'] = $this->report->has_data($report_name,'structure');
        return $data;
    }
}