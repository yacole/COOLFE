<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
 * 摘要：
 *       值集管理
 */
class Valuelist extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
        $this->load->model('bc/valuelist_model','vl');
    }

    //程序入口
    function index()
    {
        //程序默认为创建
        $this->create();
    }

    /*
     * CRUD操作
     */
    function create(){

        $this->load->view('bc/valuelist/create');
    }

    function show(){

    }

    function edit(){

    }

    function update(){

    }

    function destroy(){

    }

    /*
     * 获取数据接口：给外部提供数据
     */
    function select_options(){
        $rs = $this->vl->selectOptions(get_parameter('valuelist_id'));
        echo rs_to_itemStore($rs);
    }

    function find(){
        $rs = $this->vl->find(get_parameter('valuelist_id'));
        echo rs_to_json($rs);
    }

    function find_by_name(){
        echo rs_to_json($this->vl->find_by_name(get_parameter('valuelist_name')));
    }

}