<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');
@date_default_timezone_set('Asia/Shanghai');

//获取对应的url
function url($controller,$action){
    return 'index.php'.'/' . $controller.'/' . $action ;
}
//渲染函数
function render($view = NULL){
    $CI =  &get_instance();
    //判断是否存在view同名模版
    if(is_null($view)){
        $CI->load->view($CI->router->fetch_directory().'/'.$CI->router->fetch_class().'/'.$CI->router->fetch_method());
    }else{
        $CI->load->view($view);
    }
}

//获取session值
function _sess($key)
{
    global $CI;
    $CI->load->library('session');
    return $CI->session->userdata($key);
}
//设置session
function set_sess($key,$value = NULL)
{
    global $CI;
    $CI->load->library('session');

    if(is_array($key))
    {
        $newdata = $key;
    }
    else
    {
        $newdata[$key] = $value;
    }
    $CI->session->set_userdata($newdata);
}

//返回信息操作
function initial_message(){
    set_sess('message',[]);
}

//是否登录
function is_login()
{
    return _sess('uid');
}
//检查登陆，如果用户未登录或失效则调到登陆界面
function check_login()
{
    if( !is_login() )
    {
        redirect_to_login();
        die();
    }
}

//重定向到登陆界面
function redirect_to_login(){
    redirect(url('bc/user','login'));
}


//将结果集装换成JSON
function rs_to_json($rs){
    $rows = cf_format($rs->result_array());
    if(count($rows) > 0){
        return json_encode($rows[0]);
    }else{
        return null;
    }
}
//直接输出json字符串
function export_to_json($rs){
    echo rs_to_json($rs);
}

//将结果集装换成JSON
function firstRow($rs){
    $row = $rs->result_array();
    if(count($row) > 0){
        return $row[0];
    }else{
        return null;
    }
}

function rs_to_itemStore($rs,$identifier = null,$label = null){
    $row = $rs->result_array();
    $data["identifier"] = $identifier;
    $data["label"] = $label;
    $data['items'] = $row;

    return json_encode($data);
}

//直接输出json到itemStore
function export_to_itemStore($rs,$identifier = null,$label = null){
    $rows = cf_format($rs->result_array());
    $data["identifier"] = $identifier;
    $data["label"] = $label;
    $data['items'] = $rows;
    echo json_encode($data);
}

//字符串转移删除HTML标签以及换行和空格
function cftrim( $str )
{
    $str = trim($str);
    $str = strip_tags($str);
    $str = str_replace("\t","",$str);
    $str = str_replace("\r\n","",$str);
    $str = str_replace("\r","",$str);
    $str = str_replace("\n","",$str);
    return trim($str);
}

//获取ui字段信息 from resault array
function field($rs,$field_name){
    $rt = null;
    foreach($rs->result_array() as $r){
        if($r['field_name'] == $field_name){
            $rt = $r;
            break;
        }
    }
    return $rt;
}

//处理checkbox的勾选返回结果
function xchecked($flag){
    if($flag){
        if($flag == "on"){
            return 1;
        }
    } else{
        return 0;
    }

}

//区别时间
//function related_time( $t, $o='' )
//{
//    $obj = array(
//        0=>array('5*60'=>'刚刚'),
//        1=>array('60*60'=>'%m分钟前'),
//        2=>array('24*60*60'=>'%h小时前'),
//        3=>array('7*24*60*60'=>'%d天前'),
//        4=>array('30*24*60*60'=>'%w周前'),
//        5=>array('365*24*60*60'=>'%F月前'),
//        6=>array('50*365*24*60*60'=>'%y年前'));
//
//    $timestamp = strtotime($t);
//    $nowstamp = time();
//    $passedTime = $nowstamp - $timestamp;
//    $m = ceil($passedTime / 60);
//    $h = ceil($passedTime / (60*60));
//    $d = ceil($passedTime / (24*60*60));
//    $w = ceil($passedTime / (7*24*60*60));
//    $f = ceil($passedTime / (30*24*60*60));
//    $y = ceil($passedTime / (365*24*60*60));
//
//    if ($o == '')
//    {
//        $o =  $obj;
//    }
//
//    for($i=0; $i<count($o); $i++)
//    {
//        $ret = '';
//        $max = key($o[$i]);
//        eval('$timeAge = '.$max.';');
//        $ret = current($o[$i]);
//
//        if ( $passedTime < $timeAge)
//        {
//            $ret = current($o[$i]);
//            $ret = str_replace("%m",$m, $ret);
//            $ret = str_replace("%h",$h, $ret);
//            $ret = str_replace("%d",$d, $ret);
//            $ret = str_replace("%w",$w, $ret);
//            $ret = str_replace("%F",$f, $ret);
//            $ret = str_replace("%y",$y, $ret);
//            break;
//        }
//
//    }
//    return $ret;
//}

//设置时间戳
function set_last_update($data){
    $data['last_update_date'] = time();
    $data['last_updated_by'] = _sess('uid');
    return $data;
}

function set_creation_date($data){
    $data['last_update_date'] = time();
    $data['last_updated_by'] = _sess('uid');
    $data['creation_date'] = time();;
    $data['created_by'] = _sess('uid');
    return $data;
}
//转换数据库的时间和操作者为系统使用格式
function cf_format($rows,$is_rs_array = true){
    if($is_rs_array){
        for($i = 0; $i < count($rows);$i++){
            $rows[$i] = _format_row($rows[$i]);
        }
    }else{
        $rows = _format_row($rows);
    }
    return $rows;
}
//格式化函数
function _format_row($row){
    foreach ($row as $key => $value) {
        if(strpos($key,'_flag') > 0 && !strpos($key,'_flag_')) {
            $row[$key] = ( $row[$key] == 1 ? "X" : "" );
        }
        if(strpos($key,'_date') > 0 && !strpos($key,'_date_')) {
            $row[$key] = date('Y-m-d H:i:s',$row[$key]);
        }
        //处理null
        if(is_null($row[$key])){
            $row[$key] = "";
        }
    }
    return $row;
}
//判断是否被设置
function set_value($name){
    if(isset($name)){
        return $name;
    }else{
        return null;
    }
}
//获取参数，如果不存在则为空
function get_parameter($index){
    $return = "";
    if($_GET){
        if(count($_GET) > 0){
            foreach ($_GET as $key => $value) {
                if($key == $index){
                    $return = $value;
                    break;
                }
            }
        }
    }
    return $return;
}

//获取message
function message($type,$class,$line,$args = []){
    global $CI;
    $CI->load->model('bc/message_model','message');
    $message = $CI->message->find_by_class_and_code($class,$line);
    if(!is_null($message)){
        $message['type'] = $type;
        $message['code'] = $class.'('.$line.')';

        //处理内容
        if(count($args) > 0){
            $content = $message['content'];
            foreach ($args as $p){
                $index = stripos($content,'&');
                if($index >= 0){
                    $content = substr_replace($content,$p,$index,1);
                }
            }
            $message['content'] = $content;
        }

    }
    $message['content'] = str_replace("&","",$message['content']);
    //刷新message会话数据
    $messages = _sess('message');
    array_push($messages,$message);
    set_sess('message',$messages);
}
//临时使用的输出
function custz_message($type,$content){
    $message['type'] = $type;
    $message['content'] = $content;
    //刷新message会话数据
    $messages = _sess('message');
    array_push($messages,$message);
    set_sess('message',$messages);
}

//获取值集对应的值
function get_value($valuelist_name,$label){
    $options = get_options($valuelist_name);
    $value = null;
    if(count($options) > 0){
        for($i=0;$i<count($options);$i++){
            if($options[$i]["label"] == $label){
                $value = $options[$i]["label"];
                break;
            }
        }
    }
    return $value;
}

function get_label($valuelist_name,$value){
    $options = get_options($valuelist_name);
    $label = null;
    if(count($options) > 0){
        for($i=0;$i<count($options);$i++){
            if($options[$i]["value"] == $value){
                $label = $options[$i]["label"];
                break;
            }
        }
    }
    return $label;
}

function get_options($valuelist_name){
    global $CI;
    $CI->load->model('bc/valuelist_model','valuelist');
    return $CI->valuelist->select_options_by_name($valuelist_name)->result_array();
}