<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * 摘要：
 *     用于存放一些基础函数
 */
class Base extends CI_Controller {

    function __construct(){
        parent::__construct();
        header('Content-Type: text/html; charset=utf-8');
    }

    function exportCsv(){
        $this->load->view('bc/base/exportCsv.php');
    }
}