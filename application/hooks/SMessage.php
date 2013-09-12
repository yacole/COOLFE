<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * 用于controller调用前和调用后的信息反馈
 */

class SMessage {
    //每次访问controller时都会初始化message信息
    function initial(){
        set_sess('message',[]);
    }

    //返回给客户端，如果没有message则不输出
    //返回结果可能存在多样，以后考虑
    function response(){
        if(_sess('message') != []){
            $response['handle'] = 'message';
            $response['messages'] = _sess('message');
            echo json_encode($response);
        }
    }
}