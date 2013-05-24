<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-21
 * Time: 下午7:35
 * To change this template use File | Settings | File Templates.
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
    function selectOptions(){
        $rs = $this->vl->selectOptions($_GET['valuelist_id']);
        echo rs_to_itemStore($rs);
    }

    function find(){
        $rs = $this->vl->find($_GET['valuelist_id']);
        echo rs_to_json($rs);
    }

}