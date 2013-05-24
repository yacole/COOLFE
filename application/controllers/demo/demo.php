<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Demo extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
    }

    //程序入口
	function index()
	{
        //程序默认为创建
        $this->hello();
	}

    /*
     * CRUD操作
     */
    function create(){

    }

    function show(){

    }

    function edit(){

    }

    function update(){

    }

    function delete(){

    }

    /*
     * 其他相关action
     */
    function hello(){
        $this->load->view('demo/hello');
    }

}