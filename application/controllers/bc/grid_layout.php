<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-5-30
 * Time: 上午9:01
 * To change this template use File | Settings | File Templates.
 */
class Grid_layout extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
    }

    function index(){
        $this->load->view('bc/program/rpts/grid/layout_select');
    }

    function create(){

    }

}