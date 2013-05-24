<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-21
 * Time: 下午7:56
 * 值集数据库操作
 */
class Valuelist_model extends CI_Model{

    function __construct(){
        parent::__construct();
    }

    function find($id){
        return $this->db->get_where('bc_valuelists_tl',array('valuelist_id'=>$id));
    }

    function find_qform($id){
        $header = $this->db->get_where('bc_valuelists_tl',array('valuelist_id'=>$id))->result_array()[0];
        if($header){
            return $header['qform'];
        }
    }

    function selectOptions($id){
        $header = $this->db->get_where('bc_valuelists_tl',array('valuelist_id'=>$id))->result_array()[0];
        $rs = null;
        if($header){

            if($header['from_obj'] == 1){
                //由对象创建
                $this->db->select($header['value_fieldname'].' as value,'.$header['label_fieldname'].' as label');
                $this->db->from($header['source_view']);
                //如果条件不为空
                if($header['condition'] != ""){
                    $this->db->where($header['condition']);
                }

                $rs = $this->db->get();

            }else{
                //由值列表创建
                $this->db->select('segment as value,description as label');
                $this->db->from('bc_valuelist_lines_tl');
                $this->db->where('valuelist_id',$header['valuelist_id']);
                $rs = $this->db->get();
            }
        }
        return $rs;
    }

    function  find_by_vlname($vlname,$inactive = 0){
        $this->db->select('*');
        $this->db->from('bc_valuelists_tl as h');
        $this->db->join('bc_valuelist_lines_tl as l', 'h.valuelist_id = l.valuelist_id');
        $this->db->where('l.inactive_flag = ',$inactive);
        $this->db->where('h.vlname = ',$vlname);

        $query = $this->db->get();

        return $query;
    }

    //根据值集名称获取id
    function get_id($name){
        $r = firstRow($this->db->get_where('bc_valuelists_tl',array('valuelist_name'=>$name)));
        if(!is_null($r)){
            return $r['valuelist_id'];
        }else{
            return null;
        }
    }

}