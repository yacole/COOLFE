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
        $row = firstRow($this->report->find_last_version_source($report_id));
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

    function destroy_group(){
        if($_POST){
            //是否拥有报表
            $rpts = $this->report->find_all_by_group_id($_POST['report_group_id'])->result_array();
            if(count($rpts) > 0){
                message('E','DATABASE','02');
            }else{
                //报表已被清空时
                if($this->report->destroy_group($_POST['report_group_id'])){
                    message('I','DATABASE','01');
                }else{
                    message('E','DATABASE','02');
                }
            }
        }else{
            message('E','DATABASE','03');
        }
    }

    //保存基础数据
    function create_base_data(){
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

    //保存基础数据
    function update_base_data(){
        //判断是否为POST
        if($_POST){
            //如果不存在则创建
            if($this->report->isexists(cftrim($_POST['report_name']))){
                $data['report_id'] =  $_POST['report_id'];
                $data['description'] =  cftrim($_POST['description']);
                $data['report_group_id'] = firstRow($this->report->find_group_by_name(cftrim($_POST['report_group'])))['report_group_id'] ;

                if($this->report->update_base_data($data)){
                    message('I','DATABASE','01');
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
            //需检测输入源是否合法
            if(isset($_POST['source_type']) and isset($_POST['source_text'])){
                $flag = true;
                //判断数据来源
                switch($_POST['source_type']){
                    case '02' :
                        $url = $_POST['source_text'];
                        $ch = curl_init();
                        $timeout = 10;
                        curl_setopt($ch, CURLOPT_URL, $url);
                        curl_setopt($ch, CURLOPT_HEADER, 1);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
                        if(curl_getinfo($ch, CURLINFO_HTTP_CODE) <> 200){
                            custz_message('E','无法访问此数据接口');
                            $flag = false;
                        }
                        break;
                    case '01' :
                        if(!mysql_query($_POST['source_text']) ){
                            custz_message('E','SQL语句非法');
                            $flag = false;
                        }
                        break;
                }
                //数据库操作
                if($flag){
                    $data['source_type'] = $_POST['source_type'];
                    $data['source_text'] = $_POST['source_text'];
                    $data['report_id'] = $_POST['report_id'];
                    if($this->report->create_source_data($data)){
                        message('I','DATABASE','01');
                    }else{
                        message('E','DATABASE','02');
                    }
                }
            }
       }
    }

    //删除报表
    function destroy_report(){
        if($_POST && isset($_POST['report_id'])){
            if(count($this->report->find($_POST['report_id'])) > 0){
                if($this->report->destroy_report($_POST['report_id'])){
                    message('I','DATABASE','01');
                }else{
                    message('E','DATABASE','02');
                }
            }
        }
    }
    //获取最新版本数据源
    function find_last_version_source(){
        export_to_json($this->report->find_last_version_source(get_parameter('report_id')));
    }

    //根据报表名获取rs
    function find_base(){
        export_to_json($this->report->find(get_parameter('report_id')));
    }

    function find_by_name(){
        export_to_json($this->report->find_by_name(get_parameter('report_name')));
    }

    //根据sql获取列的list
    function column_list(){
        $id = get_parameter("id");
        $rs = $this->report->column_list_by_source_id($id);
        $num = mysql_num_fields($rs);
        $rows =  [];
        if($num > 0){
            for($i=0;$i<$num;$i++){
                $rows[$i]['field'] = mysql_field_name($rs,$i);
            }
        }
        $data['items'] = $rows;
        echo json_encode($data);
    }

    //现有的参数列表
    function parameter_list(){
        $report_id = get_parameter("report_id");
        $rs = $this->report->find_parameters_by_report_id($report_id);
        export_to_itemStore($rs);
    }

    //更新参数
    function update_parameters(){
        //判断是否为POST
        if($_POST && isset($_POST['data']) && isset($_POST['report_id'])){
            $rows = json_decode($_POST['data'],true);
            $valuelist_flag = false;
            if(count($rows) > 0){
                for($i=0;$i<count($rows);$i++){
                    if($rows[$i]['valuelist_name'] != ""){
                        $r = firstRow($this->db->get_where('bc_valuelists_tl',array('valuelist_name'=>$rows[$i]['valuelist_name'])));
                        if(is_null($r)){
                            $valuelist_flag = true;
                            custz_message("E","字段". $rows[$i]['field']."值集无效！");
                        }else{
                            $rows[$i]['valuelist_id'] = $r['valuelist_id'];
                        }
                    }
                }
            }
            if(!$valuelist_flag){
                if($this->report->update_parameters($_POST['report_id'],$rows)){
                    custz_message("I","参数更新成功");
                }else{
                    custz_message("E","参数更新失败");
                }
            }
        }else{
            message('E','REQUEST','01');
        }
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
                $row['children'] = [];
                for($y = 0 ; $y < count($reports) ; $y++){
                    $row_r = null;
                    $row_r['description'] = $reports[$y]['description'];
                    $row_r['name'] = $reports[$y]['name'];
                    $row_r['report_id'] = $reports[$y]['report_id'];
                    $row_r['report_group_id'] = $reports[$y]['report_group_id'];
                    //唯一性标识
                    $row_r['id'] = strval($id);
                    $id ++;
                    array_push($row['children'],$row_r);
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
    function hasData(){
        $data['hasBase'] = $this->report->has_data(get_parameter('report_id'),'base');
        $data['hasParameter'] = $this->report->has_data(get_parameter('report_id'),'parameter');
        $data['hasSource'] = $this->report->has_data(get_parameter('report_id'),'source');
        $data['hasStructure'] = $this->report->has_data(get_parameter('report_id'),'structure');
        echo json_encode($data);
    }
}