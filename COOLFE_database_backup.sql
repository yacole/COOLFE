-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.27


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema coolfe
--

CREATE DATABASE IF NOT EXISTS coolfe;
USE coolfe;

--
-- Temporary table structure for view `bc_grid_layouts_v`
--
DROP TABLE IF EXISTS `bc_grid_layouts_v`;
DROP VIEW IF EXISTS `bc_grid_layouts_v`;
CREATE TABLE `bc_grid_layouts_v` (
  `layout_id` int(10) unsigned,
  `program_id` int(10) unsigned,
  `layout_name` varchar(45),
  `description` varchar(100),
  `creation_date` int(10) unsigned,
  `created_by` int(10) unsigned,
  `last_update_date` int(10) unsigned,
  `last_updated_by` int(10) unsigned,
  `default_flag` tinyint(1),
  `field` varchar(45),
  `label` varchar(45),
  `pos` int(10) unsigned,
  `size` int(10) unsigned
);

--
-- Temporary table structure for view `bc_uifields_v`
--
DROP TABLE IF EXISTS `bc_uifields_v`;
DROP VIEW IF EXISTS `bc_uifields_v`;
CREATE TABLE `bc_uifields_v` (
  `ui_field_id` int(10) unsigned,
  `program_id` int(10) unsigned,
  `field_name` varchar(45),
  `field_size` varchar(4),
  `addfield_flag` tinyint(1),
  `label` varchar(45),
  `help_text` longtext,
  `required_flag` tinyint(1),
  `disabled_flag` tinyint(1),
  `hidden_flag` tinyint(1),
  `default_value` varchar(255),
  `valuelist_id` int(10) unsigned,
  `validation_id` int(10) unsigned,
  `creation_date` int(10) unsigned,
  `created_by` int(10) unsigned,
  `last_update_date` int(10) unsigned,
  `last_updated_by` int(10) unsigned,
  `validation_code` varchar(45),
  `valuelist_name` varchar(45),
  `valuelist_desc` varchar(45),
  `validation_desc` varchar(100)
);

--
-- Definition of table `bc_addfields_tl`
--

DROP TABLE IF EXISTS `bc_addfields_tl`;
CREATE TABLE `bc_addfields_tl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ui_field_id` int(10) unsigned NOT NULL COMMENT '字段ID',
  `key_flag` tinyint(1) NOT NULL COMMENT '键弹性域标识',
  `valuelist_id` int(10) unsigned DEFAULT NULL COMMENT '值集ID',
  `size` int(10) unsigned zerofill DEFAULT NULL COMMENT '文本框长度',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='弹性域信息表';

--
-- Dumping data for table `bc_addfields_tl`
--

/*!40000 ALTER TABLE `bc_addfields_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_addfields_tl` ENABLE KEYS */;


--
-- Definition of table `bc_auth_fields_tl`
--

DROP TABLE IF EXISTS `bc_auth_fields_tl`;
CREATE TABLE `bc_auth_fields_tl` (
  `field_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `authobj_id` int(10) unsigned NOT NULL,
  `field_name` varchar(45) NOT NULL COMMENT '字段名称',
  `description` varchar(45) NOT NULL COMMENT '字段描述',
  `profile_org` varchar(45) DEFAULT NULL COMMENT '组织结构参数',
  `valuelist_id` int(10) unsigned NOT NULL COMMENT '值集ID',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE KEY `bc_AUTH_FIELDS_U01` (`authobj_id`,`field_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限对象字段表';

--
-- Dumping data for table `bc_auth_fields_tl`
--

/*!40000 ALTER TABLE `bc_auth_fields_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_auth_fields_tl` ENABLE KEYS */;


--
-- Definition of table `bc_auth_objects_tl`
--

DROP TABLE IF EXISTS `bc_auth_objects_tl`;
CREATE TABLE `bc_auth_objects_tl` (
  `authobj_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `authobj_name` varchar(45) NOT NULL COMMENT '权限对象代码',
  `description` varchar(45) NOT NULL COMMENT '权限对象描述',
  `class_id` int(10) unsigned NOT NULL COMMENT '类ID',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  `structure` text NOT NULL,
  PRIMARY KEY (`authobj_id`),
  UNIQUE KEY `BC_AUTH_OBJECTS_U01` (`authobj_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限对象表';

--
-- Dumping data for table `bc_auth_objects_tl`
--

/*!40000 ALTER TABLE `bc_auth_objects_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_auth_objects_tl` ENABLE KEYS */;


--
-- Definition of table `bc_authobj_class_tl`
--

DROP TABLE IF EXISTS `bc_authobj_class_tl`;
CREATE TABLE `bc_authobj_class_tl` (
  `class_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `class_name` varchar(45) NOT NULL COMMENT '权限对象类代码',
  `description` varchar(45) NOT NULL COMMENT '权限对象类描述',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  UNIQUE KEY `BC_AUTHOBJ_CLASS_U01` (`class_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限对象类表';

--
-- Dumping data for table `bc_authobj_class_tl`
--

/*!40000 ALTER TABLE `bc_authobj_class_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_authobj_class_tl` ENABLE KEYS */;


--
-- Definition of table `bc_glayout_columns_tl`
--

DROP TABLE IF EXISTS `bc_glayout_columns_tl`;
CREATE TABLE `bc_glayout_columns_tl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `layout_id` int(10) unsigned NOT NULL COMMENT '布局ID',
  `field` varchar(45) NOT NULL COMMENT '字段名',
  `label` varchar(45) NOT NULL COMMENT '标题',
  `pos` int(10) unsigned NOT NULL COMMENT '位置',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  `size` int(10) unsigned NOT NULL COMMENT '长度',
  PRIMARY KEY (`id`),
  KEY `bc_glayout_columns_n01` (`layout_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='布局列信息表';

--
-- Dumping data for table `bc_glayout_columns_tl`
--

/*!40000 ALTER TABLE `bc_glayout_columns_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_glayout_columns_tl` ENABLE KEYS */;


--
-- Definition of table `bc_grid_layouts_tl`
--

DROP TABLE IF EXISTS `bc_grid_layouts_tl`;
CREATE TABLE `bc_grid_layouts_tl` (
  `layout_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `program_id` int(10) unsigned NOT NULL,
  `layout_name` varchar(45) NOT NULL COMMENT '布局名称',
  `description` varchar(100) NOT NULL COMMENT '说明',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL COMMENT '创建人',
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  `default_flag` tinyint(1) DEFAULT NULL COMMENT '默认标识',
  `layout_type` varchar(45) NOT NULL COMMENT '全局或个人',
  `structure` text NOT NULL,
  PRIMARY KEY (`layout_id`) USING BTREE,
  UNIQUE KEY `bc_grid_layouts_U01` (`program_id`,`layout_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='报表布局信息表';

--
-- Dumping data for table `bc_grid_layouts_tl`
--

/*!40000 ALTER TABLE `bc_grid_layouts_tl` DISABLE KEYS */;
INSERT INTO `bc_grid_layouts_tl` (`layout_id`,`program_id`,`layout_name`,`description`,`creation_date`,`created_by`,`last_update_date`,`last_updated_by`,`default_flag`,`layout_type`,`structure`) VALUES 
 (2,5,'my','陈杨阳专属',1371794462,1,1371797834,1,0,'02','[{\"name\":\"program_id\",\"field\":\"program_id\",\"width\":8},{\"name\":\"program_type\",\"field\":\"program_type\",\"width\":8},{\"name\":\"程序名\",\"field\":\"program_name\",\"width\":\"20\"},{\"name\":\"title\",\"field\":\"title\",\"width\":8},{\"name\":\"help_text\",\"field\":\"help_text\",\"width\":8},{\"name\":\"appliction_code\",\"field\":\"appliction_code\",\"width\":8},{\"name\":\"controller\",\"field\":\"controller\",\"width\":8},{\"name\":\"action\",\"field\":\"action\",\"width\":8},{\"name\":\"menu_bar_id\",\"field\":\"menu_bar_id\",\"width\":8},{\"name\":\"system_flag\",\"field\":\"system_flag\",\"width\":8},{\"name\":\"creation_date\",\"field\":\"creation_date\",\"width\":8},{\"name\":\"created_by\",\"field\":\"created_by\",\"width\":8},{\"name\":\"last_update_date\",\"field\":\"last_update_date\",\"width\":8},{\"name\":\"last_updated_by\",\"field\":\"last_updated_by\",\"width\":8},{\"name\":\"qform_flag\",\"field\":\"qform_flag\",\"width\":8},{\"name\":\"directed_to\",\"field\":\"directed_to\",\"width\":8},{\"name\":\"home_page\",\"field\":\"home_page\",\"width\":8}]'),
 (3,5,'my2','陈杨阳专属',1371796598,1,1371804844,1,1,'02','[{\"cells\":[[{\"width\":\"8\",\"field\":\"program_type\",\"name\":\"program_type\"},{\"width\":\"20\",\"field\":\"program_name\",\"name\":\"程序名\"},{\"width\":\"8\",\"field\":\"appliction_code\",\"name\":\"appliction_code\"}]],\"noscroll\":false},{\"cells\":[[{\"width\":\"8\",\"field\":\"action\",\"name\":\"action\"},{\"width\":\"8\",\"field\":\"menu_bar_id\",\"name\":\"menu_bar_id\"},{\"width\":\"8\",\"field\":\"system_flag\",\"name\":\"system_flag\"},{\"width\":\"8\",\"field\":\"created_by\",\"name\":\"created_by\"},{\"width\":\"8\",\"field\":\"last_update_date\",\"name\":\"last_update_date\"},{\"width\":\"8\",\"field\":\"last_updated_by\",\"name\":\"last_updated_by\"},{\"width\":\"8\",\"field\":\"qform_flag\",\"name\":\"qform_flag\"},{\"width\":\"8\",\"field\":\"directed_to\",\"name\":\"directed_to\"},{\"width\":\"8\",\"field\":\"home_page\",\"name\":\"home_page\"}]]}]'),
 (4,5,'all','全局',1371804944,1,1371804944,1,1,'01','[{\"cells\":[[{\"width\":\"20\",\"field\":\"program_name\",\"name\":\"程序名\"},{\"width\":\"8\",\"field\":\"appliction_code\",\"name\":\"appliction_code\"}]],\"noscroll\":false},{\"cells\":[[{\"width\":\"8\",\"field\":\"action\",\"name\":\"action\"},{\"width\":\"8\",\"field\":\"menu_bar_id\",\"name\":\"menu_bar_id\"},{\"width\":\"8\",\"field\":\"system_flag\",\"name\":\"system_flag\"},{\"width\":\"8\",\"field\":\"created_by\",\"name\":\"created_by\"},{\"width\":\"8\",\"field\":\"last_update_date\",\"name\":\"last_update_date\"},{\"width\":\"8\",\"field\":\"last_updated_by\",\"name\":\"last_updated_by\"},{\"width\":\"8\",\"field\":\"qform_flag\",\"name\":\"qform_flag\"},{\"width\":\"8\",\"field\":\"directed_to\",\"name\":\"directed_to\"},{\"width\":\"8\",\"field\":\"home_page\",\"name\":\"home_page\"}]]}]');
/*!40000 ALTER TABLE `bc_grid_layouts_tl` ENABLE KEYS */;


--
-- Definition of table `bc_job_histories_tl`
--

DROP TABLE IF EXISTS `bc_job_histories_tl`;
CREATE TABLE `bc_job_histories_tl` (
  `history_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL COMMENT '后台作业ID',
  `status` varchar(45) NOT NULL COMMENT '状态',
  `experience_date` int(10) unsigned DEFAULT NULL COMMENT '持续时间 单位秒',
  `start_date` int(10) unsigned DEFAULT NULL COMMENT '开始日期',
  `end_date` int(10) unsigned DEFAULT NULL COMMENT '结束日期',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`history_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台作业历史表';

--
-- Dumping data for table `bc_job_histories_tl`
--

/*!40000 ALTER TABLE `bc_job_histories_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_job_histories_tl` ENABLE KEYS */;


--
-- Definition of table `bc_job_output_tl`
--

DROP TABLE IF EXISTS `bc_job_output_tl`;
CREATE TABLE `bc_job_output_tl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `history_id` int(10) unsigned NOT NULL,
  `log` longtext NOT NULL,
  `output` longtext NOT NULL,
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bc_job_output_N01` (`history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台作业输出表';

--
-- Dumping data for table `bc_job_output_tl`
--

/*!40000 ALTER TABLE `bc_job_output_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_job_output_tl` ENABLE KEYS */;


--
-- Definition of table `bc_job_steps_tl`
--

DROP TABLE IF EXISTS `bc_job_steps_tl`;
CREATE TABLE `bc_job_steps_tl` (
  `step_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL COMMENT '后台作业',
  `step` varchar(45) NOT NULL COMMENT '步骤',
  `program_id` int(10) unsigned NOT NULL COMMENT '程序',
  `variant_id` int(10) unsigned NOT NULL COMMENT '变式',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`step_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台作业步骤表';

--
-- Dumping data for table `bc_job_steps_tl`
--

/*!40000 ALTER TABLE `bc_job_steps_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_job_steps_tl` ENABLE KEYS */;


--
-- Definition of table `bc_jobs_tl`
--

DROP TABLE IF EXISTS `bc_jobs_tl`;
CREATE TABLE `bc_jobs_tl` (
  `job_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_name` varchar(45) NOT NULL COMMENT '作业名称',
  `description` varchar(45) NOT NULL COMMENT '作业描述',
  `output_type` varchar(45) NOT NULL COMMENT '输出类型',
  `period_flag` int(10) unsigned NOT NULL COMMENT '周期标识',
  `period_value` varchar(45) NOT NULL COMMENT '周期值',
  `period_type` varchar(45) NOT NULL COMMENT '周期类型',
  `first_exec_date` int(10) unsigned NOT NULL COMMENT '第一次运行日期',
  `inactive_date` int(10) unsigned DEFAULT NULL COMMENT '失效日期',
  `next_exec_date` int(10) unsigned DEFAULT NULL COMMENT '下一次运行时间',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  `sendto_list` text COMMENT '邮件发送的用户ID列表',
  PRIMARY KEY (`job_id`),
  UNIQUE KEY `BC_JOBS_U01` (`job_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台作业表';

--
-- Dumping data for table `bc_jobs_tl`
--

/*!40000 ALTER TABLE `bc_jobs_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_jobs_tl` ENABLE KEYS */;


--
-- Definition of table `bc_menu_bars_tl`
--

DROP TABLE IF EXISTS `bc_menu_bars_tl`;
CREATE TABLE `bc_menu_bars_tl` (
  `menu_bar_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bar_code` varchar(45) NOT NULL COMMENT '工具栏编号',
  `description` varchar(100) NOT NULL COMMENT '工具栏说明',
  `program_menu` tinyint(1) NOT NULL COMMENT '菜单类型为“程序”，启用标识',
  `goto_menu` tinyint(1) NOT NULL COMMENT '菜单类型为“转到”，启用标识',
  `utility_menu` tinyint(1) NOT NULL COMMENT '菜单类型为“实用工具”，启用标识',
  `environment_menu` tinyint(1) NOT NULL COMMENT '菜单类型为“环境”，启用标识',
  `other_menu` tinyint(1) NOT NULL COMMENT '菜单类型为“其他”，启用标识',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`menu_bar_id`),
  UNIQUE KEY `bc_ menu_bars_U01` (`bar_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单栏表';

--
-- Dumping data for table `bc_menu_bars_tl`
--

/*!40000 ALTER TABLE `bc_menu_bars_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_menu_bars_tl` ENABLE KEYS */;


--
-- Definition of table `bc_menus_tl`
--

DROP TABLE IF EXISTS `bc_menus_tl`;
CREATE TABLE `bc_menus_tl` (
  `menu_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menu_bar_id` int(10) unsigned NOT NULL,
  `menu_type` varchar(45) NOT NULL COMMENT '菜单类型',
  `sort_code` varchar(45) NOT NULL COMMENT '排序码',
  `description` varchar(45) NOT NULL COMMENT '描述',
  `father_menu_id` int(10) unsigned DEFAULT NULL COMMENT '所属文件夹',
  `line_type` varchar(45) NOT NULL COMMENT '文件夹或程序',
  `program_id` int(10) unsigned DEFAULT NULL COMMENT '程序ID',
  `variant_id` int(10) unsigned DEFAULT NULL COMMENT '变式',
  `creation_date` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `last_update_date` int(10) unsigned NOT NULL,
  `last_updated_by` int(10) unsigned NOT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';

--
-- Dumping data for table `bc_menus_tl`
--

/*!40000 ALTER TABLE `bc_menus_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_menus_tl` ENABLE KEYS */;


--
-- Definition of table `bc_message_class_tl`
--

DROP TABLE IF EXISTS `bc_message_class_tl`;
CREATE TABLE `bc_message_class_tl` (
  `class_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `class_code` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='消息类表';

--
-- Dumping data for table `bc_message_class_tl`
--

/*!40000 ALTER TABLE `bc_message_class_tl` DISABLE KEYS */;
INSERT INTO `bc_message_class_tl` (`class_id`,`class_code`,`description`,`creation_date`,`created_by`,`last_update_date`,`last_updated_by`) VALUES 
 (1,'DATABASE','数据库相关',NULL,NULL,NULL,NULL),
 (2,'REQUEST','网络请求相关',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `bc_message_class_tl` ENABLE KEYS */;


--
-- Definition of table `bc_message_details_tl`
--

DROP TABLE IF EXISTS `bc_message_details_tl`;
CREATE TABLE `bc_message_details_tl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message_id` int(10) unsigned NOT NULL,
  `cause` text NOT NULL,
  `resolution` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bc_message_details_n01` (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='消息诊断信息';

--
-- Dumping data for table `bc_message_details_tl`
--

/*!40000 ALTER TABLE `bc_message_details_tl` DISABLE KEYS */;
INSERT INTO `bc_message_details_tl` (`id`,`message_id`,`cause`,`resolution`) VALUES 
 (1,1,'就是成功了','没什么可做的');
/*!40000 ALTER TABLE `bc_message_details_tl` ENABLE KEYS */;


--
-- Definition of table `bc_messages_tl`
--

DROP TABLE IF EXISTS `bc_messages_tl`;
CREATE TABLE `bc_messages_tl` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `class_id` int(10) unsigned NOT NULL COMMENT '消息类ID',
  `message_code` char(3) NOT NULL COMMENT '消息类编码，3位数字，开始为“000”',
  `content` varchar(400) NOT NULL COMMENT '消息内容',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  UNIQUE KEY `BC_MESSAGES_U01` (`class_id`,`message_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='消息表';

--
-- Dumping data for table `bc_messages_tl`
--

/*!40000 ALTER TABLE `bc_messages_tl` DISABLE KEYS */;
INSERT INTO `bc_messages_tl` (`message_id`,`class_id`,`message_code`,`content`,`creation_date`,`created_by`,`last_update_date`,`last_updated_by`) VALUES 
 (1,1,'01','字段[&]保存成功&',NULL,NULL,NULL,NULL),
 (2,1,'02','为止错误,保存失败',NULL,NULL,NULL,NULL),
 (3,2,'01','非法请求',NULL,NULL,NULL,NULL),
 (4,1,'03','对象已存在',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `bc_messages_tl` ENABLE KEYS */;


--
-- Definition of table `bc_proauthobj_default_tl`
--

DROP TABLE IF EXISTS `bc_proauthobj_default_tl`;
CREATE TABLE `bc_proauthobj_default_tl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `proauthobj_id` int(10) unsigned NOT NULL,
  `authobjkey` varchar(45) NOT NULL COMMENT '权限对象键',
  `authobjvalue` varchar(200) NOT NULL COMMENT '权限对象值',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BC_authobj_default_U01` (`proauthobj_id`,`authobjkey`),
  CONSTRAINT `FK_BC_authobj_default_TL_1` FOREIGN KEY (`proauthobj_id`) REFERENCES `bc_program_authobj_tl` (`proauthobj_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限对象默认值表';

--
-- Dumping data for table `bc_proauthobj_default_tl`
--

/*!40000 ALTER TABLE `bc_proauthobj_default_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_proauthobj_default_tl` ENABLE KEYS */;


--
-- Definition of table `bc_program_authobj_tl`
--

DROP TABLE IF EXISTS `bc_program_authobj_tl`;
CREATE TABLE `bc_program_authobj_tl` (
  `proauthobj_id` int(10) unsigned NOT NULL,
  `program_id` int(10) unsigned NOT NULL COMMENT '程序ID',
  `authobj_id` int(10) unsigned NOT NULL COMMENT '权限对象ID',
  `check_flag` tinyint(1) NOT NULL COMMENT '是否检查，默认为空，即不检查，反正’X’',
  `creation_date` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`proauthobj_id`),
  UNIQUE KEY `BC_program_authob_U01` (`program_id`,`authobj_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='程序权限对象对应表';

--
-- Dumping data for table `bc_program_authobj_tl`
--

/*!40000 ALTER TABLE `bc_program_authobj_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_program_authobj_tl` ENABLE KEYS */;


--
-- Definition of table `bc_program_variants_tl`
--

DROP TABLE IF EXISTS `bc_program_variants_tl`;
CREATE TABLE `bc_program_variants_tl` (
  `variant_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `program_id` int(10) unsigned NOT NULL,
  `params` varchar(500) NOT NULL COMMENT '参数字符串',
  `variant_name` varchar(45) NOT NULL COMMENT '变式名',
  `description` varchar(100) NOT NULL COMMENT '描述',
  `backgroud_flag` tinyint(1) DEFAULT NULL COMMENT '只用于后台',
  `share_flag` tinyint(1) DEFAULT NULL COMMENT '共享标识',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`variant_id`),
  UNIQUE KEY `bc_program_variants_U01` (`program_id`,`variant_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='程序变式表';

--
-- Dumping data for table `bc_program_variants_tl`
--

/*!40000 ALTER TABLE `bc_program_variants_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_program_variants_tl` ENABLE KEYS */;


--
-- Definition of table `bc_programs_tl`
--

DROP TABLE IF EXISTS `bc_programs_tl`;
CREATE TABLE `bc_programs_tl` (
  `program_id` int(10) unsigned NOT NULL COMMENT '程序ID',
  `program_type` varchar(10) NOT NULL COMMENT '程序类型',
  `program_name` varchar(20) NOT NULL COMMENT '程序名称',
  `title` varchar(100) NOT NULL COMMENT '程序标题',
  `help_text` longtext COMMENT '程序帮助',
  `appliction_code` varchar(10) NOT NULL COMMENT '对应应用模块',
  `controller` varchar(45) NOT NULL COMMENT '控制器',
  `action` varchar(45) NOT NULL COMMENT '动作',
  `menu_bar_id` int(10) unsigned DEFAULT NULL COMMENT '菜单栏ID\r\n',
  `system_flag` tinyint(1) NOT NULL COMMENT '系统标识',
  `creation_date` int(10) unsigned DEFAULT NULL COMMENT '创建时间\r\n',
  `created_by` int(10) unsigned DEFAULT NULL COMMENT '创建者',
  `last_update_date` int(10) unsigned DEFAULT NULL COMMENT '最后更新时间',
  `last_updated_by` int(10) unsigned DEFAULT NULL COMMENT '最后更新者',
  `qform_flag` tinyint(1) NOT NULL COMMENT '查询界面标识，如果是QFORM无需填写directed_to',
  `directed_to` varchar(45) CHARACTER SET latin1 DEFAULT NULL COMMENT '数据提交到',
  `home_page` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`program_id`) USING BTREE,
  UNIQUE KEY `BC_PROGRAMS_N01` (`program_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统程序表';

--
-- Dumping data for table `bc_programs_tl`
--

/*!40000 ALTER TABLE `bc_programs_tl` DISABLE KEYS */;
INSERT INTO `bc_programs_tl` (`program_id`,`program_type`,`program_name`,`title`,`help_text`,`appliction_code`,`controller`,`action`,`menu_bar_id`,`system_flag`,`creation_date`,`created_by`,`last_update_date`,`last_updated_by`,`qform_flag`,`directed_to`,`home_page`) VALUES 
 (1,'01','BC_PROGRAM_H','PROGRAM CREATE',NULL,'01','BC/PROGRAM','index',NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL),
 (2,'01','BC_PROGRAM_C','AA',NULL,'01','bc/program','create',NULL,0,NULL,NULL,NULL,NULL,0,NULL,1),
 (3,'01','BC_UI_FIELD_M','BC_UI_FIELD_M',NULL,'01','bc/uifield','index',NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL),
 (4,'01','BC_PROGRAM_R','程序显示',NULL,'01','bc/program','index',NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL),
 (5,'02','RPT_PROGRAM_LIST','程序清单报表',NULL,'01','bc/program','rpt_program_list',NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `bc_programs_tl` ENABLE KEYS */;


--
-- Definition of table `bc_role_menus_tl`
--

DROP TABLE IF EXISTS `bc_role_menus_tl`;
CREATE TABLE `bc_role_menus_tl` (
  `menu_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(10) unsigned NOT NULL,
  `sort_code` varchar(45) NOT NULL COMMENT '顺序编号',
  `line_type` varchar(45) NOT NULL COMMENT '菜单行类型',
  `description` varchar(100) NOT NULL COMMENT '菜单行描述',
  `father_menu_id` int(10) unsigned DEFAULT NULL COMMENT '父项ID',
  `program_id` int(10) unsigned NOT NULL COMMENT '程序ID',
  `variant_id` int(10) unsigned DEFAULT NULL COMMENT '参数字符串',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`menu_id`),
  KEY `bc_role_menus_N01` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色菜单表';

--
-- Dumping data for table `bc_role_menus_tl`
--

/*!40000 ALTER TABLE `bc_role_menus_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_role_menus_tl` ENABLE KEYS */;


--
-- Definition of table `bc_role_profile_tl`
--

DROP TABLE IF EXISTS `bc_role_profile_tl`;
CREATE TABLE `bc_role_profile_tl` (
  `line_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(10) unsigned NOT NULL COMMENT '角色ID',
  `authobj_id` int(10) unsigned NOT NULL COMMENT '权限对象ID',
  `field_name` varchar(45) NOT NULL COMMENT '权限对象字段',
  `field_value` varchar(200) NOT NULL COMMENT '字段值',
  `status` varchar(45) NOT NULL COMMENT '行状态',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`line_id`),
  KEY `BC_role_profile_N01` (`authobj_id`,`field_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色权限配置文件';

--
-- Dumping data for table `bc_role_profile_tl`
--

/*!40000 ALTER TABLE `bc_role_profile_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_role_profile_tl` ENABLE KEYS */;


--
-- Definition of table `bc_status_header_tl`
--

DROP TABLE IF EXISTS `bc_status_header_tl`;
CREATE TABLE `bc_status_header_tl` (
  `status_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status_code` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE KEY `BC_status_header_u01` (`status_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='状态头表';

--
-- Dumping data for table `bc_status_header_tl`
--

/*!40000 ALTER TABLE `bc_status_header_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_status_header_tl` ENABLE KEYS */;


--
-- Definition of table `bc_status_lines_tl`
--

DROP TABLE IF EXISTS `bc_status_lines_tl`;
CREATE TABLE `bc_status_lines_tl` (
  `line_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status_id` int(10) unsigned NOT NULL,
  `lineno` varchar(45) NOT NULL COMMENT '行号',
  `line_name` varchar(45) NOT NULL COMMENT '状态码',
  `description` varchar(45) NOT NULL COMMENT '描述',
  `default_flag` tinyint(1) DEFAULT NULL COMMENT '默认标识',
  `next_status` varchar(200) DEFAULT NULL COMMENT '下一步',
  `back_status` varchar(200) DEFAULT NULL COMMENT '退一步',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  `menu_bar_id` int(10) unsigned DEFAULT NULL COMMENT '菜单栏',
  PRIMARY KEY (`line_id`),
  UNIQUE KEY `BC_STATUS_LINES_U01` (`status_id`,`line_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='状态行表';

--
-- Dumping data for table `bc_status_lines_tl`
--

/*!40000 ALTER TABLE `bc_status_lines_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_status_lines_tl` ENABLE KEYS */;


--
-- Definition of table `bc_status_uifield_tl`
--

DROP TABLE IF EXISTS `bc_status_uifield_tl`;
CREATE TABLE `bc_status_uifield_tl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `line_id` int(10) unsigned NOT NULL COMMENT '状态行id',
  `ui_field_id` int(10) unsigned NOT NULL COMMENT 'UI字段ID',
  `required_flag` tinyint(1) DEFAULT NULL COMMENT '必输',
  `disabled_flag` tinyint(1) DEFAULT NULL COMMENT '只读',
  `hidden_flag` tinyint(1) DEFAULT NULL COMMENT '隐藏',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BC_status_uiFIELD_u01` (`line_id`,`ui_field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='状态控制界面字段表';

--
-- Dumping data for table `bc_status_uifield_tl`
--

/*!40000 ALTER TABLE `bc_status_uifield_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_status_uifield_tl` ENABLE KEYS */;


--
-- Definition of table `bc_ui_fields_tl`
--

DROP TABLE IF EXISTS `bc_ui_fields_tl`;
CREATE TABLE `bc_ui_fields_tl` (
  `ui_field_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `program_id` int(10) unsigned NOT NULL COMMENT '程序ID',
  `field_name` varchar(45) NOT NULL COMMENT '字段名',
  `field_size` varchar(4) DEFAULT NULL COMMENT '长度',
  `addfield_flag` tinyint(1) NOT NULL COMMENT '默认为空，”X”为弹性域',
  `label` varchar(45) NOT NULL COMMENT '字段短文本描述',
  `help_text` longtext COMMENT '字段长文本描述，即帮助',
  `required_flag` tinyint(1) NOT NULL COMMENT '是否必须输入',
  `disabled_flag` tinyint(1) NOT NULL COMMENT '是否只读',
  `hidden_flag` tinyint(1) NOT NULL COMMENT '是否隐藏',
  `default_value` varchar(255) DEFAULT NULL COMMENT '默认值',
  `valuelist_id` int(10) unsigned DEFAULT NULL COMMENT '对应值列表ID',
  `validation_id` int(10) unsigned DEFAULT NULL COMMENT '字段验证码',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`ui_field_id`),
  UNIQUE KEY `BC_ui_fields_U01` (`program_id`,`field_name`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COMMENT='界面字段信息表';

--
-- Dumping data for table `bc_ui_fields_tl`
--

/*!40000 ALTER TABLE `bc_ui_fields_tl` DISABLE KEYS */;
INSERT INTO `bc_ui_fields_tl` (`ui_field_id`,`program_id`,`field_name`,`field_size`,`addfield_flag`,`label`,`help_text`,`required_flag`,`disabled_flag`,`hidden_flag`,`default_value`,`valuelist_id`,`validation_id`,`creation_date`,`created_by`,`last_update_date`,`last_updated_by`) VALUES 
 (13,3,'field_name','10',0,'字段','',1,0,0,'',NULL,NULL,1367368310,1,1369297668,1),
 (14,3,'label','20',0,'描述','',0,0,0,'',NULL,NULL,1367370176,1,1369896857,1),
 (15,3,'field_size','4',0,'尺寸','尺寸用于控制字段长短 ，影响界面的展示，比如FORM中、GRID列',1,0,0,'',NULL,NULL,1367370253,1,1369378013,1),
 (16,3,'required_flag','2',0,'必输','112',0,0,0,'',NULL,NULL,1367370309,1,1369297569,1),
 (17,3,'disabled_flag','2',0,'只读','',0,0,0,'',NULL,NULL,1367370330,1,1369297542,1),
 (18,3,'hidden_flag','2',0,'隐藏','',0,0,0,'',NULL,NULL,1367370343,1,1369297685,1),
 (19,3,'addfield_flag','3',0,'弹性域',NULL,0,0,0,NULL,NULL,NULL,1367370362,1,1367376382,1),
 (20,3,'valuelist_name','10',0,'值集','',0,0,0,'',5,NULL,1367370382,1,1369641850,1),
 (21,3,'default_value','10',0,'默认值',NULL,0,0,0,NULL,NULL,NULL,1367370402,1,1367370402,1),
 (22,3,'validation_code','10',0,'验证代码','',0,0,0,'',4,3,1367370424,1,1369644509,1),
 (34,1,'program_name','20',0,'程序','',1,0,0,'',2,1,1367385231,1,1369212910,1),
 (38,3,'program_name','20',0,'程序','',0,0,0,'',2,NULL,1369628409,1,1369903491,1),
 (39,3,'new_bt','10',0,'新建','',0,0,0,'',NULL,NULL,1369628443,1,1369809481,1),
 (40,2,'program_name','20',0,'程序','',1,0,0,'',NULL,NULL,1369628759,1,1369632846,1),
 (41,2,'appliction_code','',0,'应用','',1,0,0,'15',1,NULL,1369628794,1,1369632916,1),
 (42,5,'program_name','20',0,'程序名','',0,0,0,'',NULL,NULL,1370309951,1,1370311595,1),
 (43,5,'layout_type','10',0,'布局类型','',0,0,0,'',6,NULL,1370416097,1,1370416097,1),
 (44,5,'layout_name','10',0,'布局','',1,0,0,'',NULL,NULL,1370503706,1,1370503769,1),
 (45,5,'description','20',0,'说明','',1,0,0,'',NULL,NULL,1370503739,1,1371194348,1);
/*!40000 ALTER TABLE `bc_ui_fields_tl` ENABLE KEYS */;


--
-- Definition of table `bc_ui_menus_tl`
--

DROP TABLE IF EXISTS `bc_ui_menus_tl`;
CREATE TABLE `bc_ui_menus_tl` (
  `menu_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menu_bar_id` int(10) unsigned NOT NULL COMMENT '菜单栏ID',
  `menu_type` varchar(10) NOT NULL COMMENT '菜单类型',
  `sort_no` varchar(45) NOT NULL COMMENT '顺序编号，用于菜单对象排序',
  `line_type` varchar(10) NOT NULL COMMENT '菜单类型：P为程序；M为文件夹;S为分割线',
  `label` varchar(100) NOT NULL COMMENT '菜单描述，显示在登陆后界面',
  `father_menu_id` int(10) unsigned DEFAULT NULL COMMENT '所属文件夹ID',
  `program_id` varchar(45) NOT NULL COMMENT '程序ID',
  `inactive_flag` tinyint(1) NOT NULL COMMENT '失效标识',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单项表';

--
-- Dumping data for table `bc_ui_menus_tl`
--

/*!40000 ALTER TABLE `bc_ui_menus_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_ui_menus_tl` ENABLE KEYS */;


--
-- Definition of table `bc_unit_conversions_tl`
--

DROP TABLE IF EXISTS `bc_unit_conversions_tl`;
CREATE TABLE `bc_unit_conversions_tl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `source_size` decimal(10,2) NOT NULL COMMENT '源数量',
  `source_unit` varchar(5) NOT NULL COMMENT '源单位代码',
  `destination_size` decimal(10,2) NOT NULL COMMENT '目标数量',
  `destination_unit` varchar(5) NOT NULL COMMENT '目标单位',
  PRIMARY KEY (`id`),
  UNIQUE KEY `bc_unit_conversions_U01` (`source_unit`,`destination_unit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='单位转换关系表';

--
-- Dumping data for table `bc_unit_conversions_tl`
--

/*!40000 ALTER TABLE `bc_unit_conversions_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_unit_conversions_tl` ENABLE KEYS */;


--
-- Definition of table `bc_units_tl`
--

DROP TABLE IF EXISTS `bc_units_tl`;
CREATE TABLE `bc_units_tl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `unit_code` varchar(5) NOT NULL COMMENT '单位代码',
  `description` varchar(45) NOT NULL COMMENT '单位描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `BC_UNITS_U01` (`unit_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='计量单位表';

--
-- Dumping data for table `bc_units_tl`
--

/*!40000 ALTER TABLE `bc_units_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_units_tl` ENABLE KEYS */;


--
-- Definition of table `bc_user_assign_tl`
--

DROP TABLE IF EXISTS `bc_user_assign_tl`;
CREATE TABLE `bc_user_assign_tl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '用户ID',
  `role_id` int(10) unsigned NOT NULL COMMENT '角色ID',
  `start_date` int(10) unsigned DEFAULT NULL COMMENT '开始日期',
  `end_date` int(10) unsigned DEFAULT NULL COMMENT '结束日期',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BC_USER_ASSIGN_U01` (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色对应表';

--
-- Dumping data for table `bc_user_assign_tl`
--

/*!40000 ALTER TABLE `bc_user_assign_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_user_assign_tl` ENABLE KEYS */;


--
-- Definition of table `bc_user_roles_tl`
--

DROP TABLE IF EXISTS `bc_user_roles_tl`;
CREATE TABLE `bc_user_roles_tl` (
  `role_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL COMMENT '角色名称',
  `description` varchar(100) NOT NULL COMMENT '角色描述',
  `system_flag` tinyint(1) NOT NULL COMMENT '系统自带标识',
  `long_text` text NOT NULL COMMENT '长文本描述',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `bc_user_roles_u01` (`role_name`) USING BTREE,
  KEY `bc_user_roles_N01` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色表';

--
-- Dumping data for table `bc_user_roles_tl`
--

/*!40000 ALTER TABLE `bc_user_roles_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_user_roles_tl` ENABLE KEYS */;


--
-- Definition of table `bc_users_tl`
--

DROP TABLE IF EXISTS `bc_users_tl`;
CREATE TABLE `bc_users_tl` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sex` varchar(45) NOT NULL COMMENT '性别',
  `username` varchar(45) NOT NULL COMMENT '用户名',
  `fullname` varchar(45) NOT NULL COMMENT '姓名',
  `department_code` varchar(45) DEFAULT NULL COMMENT '部门',
  `position_code` varchar(45) DEFAULT NULL COMMENT '职务',
  `phone` varchar(45) DEFAULT NULL COMMENT '联系电话',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱地址',
  `password` varchar(400) NOT NULL COMMENT '密码',
  `intial_flag` tinyint(1) DEFAULT NULL COMMENT '密码初始化状态',
  `start_date` int(10) unsigned DEFAULT NULL COMMENT '有效从',
  `end_date` int(10) unsigned DEFAULT NULL COMMENT '有效至',
  `last_logon_date` int(10) unsigned DEFAULT NULL COMMENT '最后登录',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `BC_USERS_U01` (`username`),
  KEY `BC_USERS_N01` (`fullname`,`department_code`,`position_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';

--
-- Dumping data for table `bc_users_tl`
--

/*!40000 ALTER TABLE `bc_users_tl` DISABLE KEYS */;
/*!40000 ALTER TABLE `bc_users_tl` ENABLE KEYS */;


--
-- Definition of table `bc_validator_tl`
--

DROP TABLE IF EXISTS `bc_validator_tl`;
CREATE TABLE `bc_validator_tl` (
  `validation_id` int(10) unsigned NOT NULL,
  `validation_code` varchar(45) NOT NULL COMMENT '验证码',
  `description` varchar(100) NOT NULL COMMENT '描述',
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_date` int(10) unsigned DEFAULT NULL,
  `regexp` varchar(500) DEFAULT NULL,
  `invalidmessage` varchar(100) NOT NULL COMMENT '匹配后提示',
  `sqltext` text COMMENT 'SQL语句',
  `reverse_flag` tinyint(1) DEFAULT NULL COMMENT '反向标识',
  PRIMARY KEY (`validation_id`),
  UNIQUE KEY `BC_VALIDATOR_U01` (`validation_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字段验证码信息表';

--
-- Dumping data for table `bc_validator_tl`
--

/*!40000 ALTER TABLE `bc_validator_tl` DISABLE KEYS */;
INSERT INTO `bc_validator_tl` (`validation_id`,`validation_code`,`description`,`last_update_date`,`last_updated_by`,`creation_date`,`created_date`,`regexp`,`invalidmessage`,`sqltext`,`reverse_flag`) VALUES 
 (1,'PROGRAM_NAME','验证程序名',NULL,NULL,NULL,NULL,'^(?!_)(?!.*?_$)\\w+$','程序名已存在','SELECT * FROM bc_programs_tl b where b.program_name = \'?\'',0),
 (2,'VALUELIST_NAME','值集名称',NULL,NULL,NULL,NULL,'^(?!_)(?!.*?_$)\\w+$','值集已存在','select * from bc_valuelists_tl where valuelist_name = \'?\'',0),
 (3,'VALIDATION_CODE_R','验证码',NULL,NULL,NULL,NULL,'^(?!_)(?!.*?_$)\\w+$','验证码不存在','select * from bc_validator_tl where validation_code = \'?\'',1);
/*!40000 ALTER TABLE `bc_validator_tl` ENABLE KEYS */;


--
-- Definition of table `bc_valuelist_lines_tl`
--

DROP TABLE IF EXISTS `bc_valuelist_lines_tl`;
CREATE TABLE `bc_valuelist_lines_tl` (
  `line_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '行ID',
  `valuelist_id` int(10) unsigned NOT NULL COMMENT '值集ID',
  `segment` varchar(10) NOT NULL COMMENT '段编码',
  `description` varchar(45) NOT NULL COMMENT '段描述',
  `inactive_flag` tinyint(1) unsigned NOT NULL COMMENT '失效标识',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  `segment_name` varchar(45) NOT NULL,
  PRIMARY KEY (`line_id`) USING BTREE,
  UNIQUE KEY `BC_VALUELIST_LINES _N01` (`valuelist_id`,`segment`) USING BTREE,
  CONSTRAINT `FK_BC_VALUELIST_LINES_TL_1` FOREIGN KEY (`VALUELIST_ID`) REFERENCES `bc_valuelists_tl` (`VALUELIST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='值列表行表';

--
-- Dumping data for table `bc_valuelist_lines_tl`
--

/*!40000 ALTER TABLE `bc_valuelist_lines_tl` DISABLE KEYS */;
INSERT INTO `bc_valuelist_lines_tl` (`line_id`,`valuelist_id`,`segment`,`description`,`inactive_flag`,`creation_date`,`created_by`,`last_update_date`,`last_updated_by`,`segment_name`) VALUES 
 (1,1,'01','系统基础模块',0,NULL,NULL,NULL,NULL,''),
 (2,3,'01','表单',0,NULL,NULL,NULL,NULL,''),
 (3,3,'02','报表',0,NULL,NULL,NULL,NULL,''),
 (4,3,'03','批处理',0,NULL,NULL,NULL,NULL,''),
 (5,3,'04','接口',0,NULL,NULL,NULL,NULL,''),
 (6,1,'02','销售分销模块',0,NULL,NULL,NULL,NULL,''),
 (7,1,'03','库存管理模块',0,NULL,NULL,NULL,NULL,''),
 (8,1,'04','采购管理模块',0,NULL,NULL,NULL,NULL,''),
 (9,1,'05','应收管理模块',0,NULL,NULL,NULL,NULL,''),
 (10,1,'06','应付管理模块',0,NULL,NULL,NULL,NULL,''),
 (11,1,'07','资产管理模块',0,NULL,NULL,NULL,NULL,''),
 (12,1,'08','成本控制模块',0,NULL,NULL,NULL,NULL,''),
 (13,1,'09','总账管理模块',0,NULL,NULL,NULL,NULL,''),
 (14,1,'10','物料清单管理模块',0,NULL,NULL,NULL,NULL,''),
 (15,1,'11','制造执行管理模块',0,NULL,NULL,NULL,NULL,''),
 (16,1,'12','需求计划管理模块',0,NULL,NULL,NULL,NULL,''),
 (17,1,'13','供应商平台',0,NULL,NULL,NULL,NULL,''),
 (18,1,'14','经销商平台',0,NULL,NULL,NULL,NULL,''),
 (20,1,'15','标准',0,NULL,NULL,NULL,NULL,''),
 (21,6,'01','全局',0,NULL,NULL,NULL,NULL,''),
 (22,6,'02','私人',0,NULL,NULL,NULL,NULL,'');
/*!40000 ALTER TABLE `bc_valuelist_lines_tl` ENABLE KEYS */;


--
-- Definition of table `bc_valuelists_tl`
--

DROP TABLE IF EXISTS `bc_valuelists_tl`;
CREATE TABLE `bc_valuelists_tl` (
  `valuelist_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `valuelist_name` varchar(45) NOT NULL COMMENT '值集名称',
  `description` varchar(45) NOT NULL COMMENT '值集描述',
  `from_obj` tinyint(1) DEFAULT NULL COMMENT '如果是基于表/视图对象的此标识为“X”',
  `label_fieldname` varchar(45) DEFAULT NULL COMMENT '值集KEY对应的字段',
  `value_fieldname` varchar(45) DEFAULT NULL COMMENT '值集VALUE对应的字段',
  `source_view` varchar(45) DEFAULT NULL COMMENT '来源视图或表对象名',
  `qform` int(10) unsigned DEFAULT NULL COMMENT '选择屏幕程序PROGRAM_ID',
  `qform_m` int(10) unsigned DEFAULT NULL COMMENT '多选屏幕程序PROGRAM_ID',
  `father_id` int(10) unsigned DEFAULT NULL COMMENT '从属值集ID，基于值列表',
  `father_segment` varchar(10) DEFAULT NULL COMMENT '从属段编码，基于值列表',
  `creation_date` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `last_update_date` int(10) unsigned DEFAULT NULL,
  `last_updated_by` int(10) unsigned DEFAULT NULL,
  `condition` text,
  PRIMARY KEY (`valuelist_id`) USING BTREE,
  UNIQUE KEY `BC_VALUELIST_N02` (`valuelist_name`) USING BTREE,
  KEY `BC_VALUELIST_N01` (`valuelist_name`,`description`,`source_view`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='值集表';

--
-- Dumping data for table `bc_valuelists_tl`
--

/*!40000 ALTER TABLE `bc_valuelists_tl` DISABLE KEYS */;
INSERT INTO `bc_valuelists_tl` (`valuelist_id`,`valuelist_name`,`description`,`from_obj`,`label_fieldname`,`value_fieldname`,`source_view`,`qform`,`qform_m`,`father_id`,`father_segment`,`creation_date`,`created_by`,`last_update_date`,`last_updated_by`,`condition`) VALUES 
 (1,'BC_APPLICATION','applicaitons',0,'','','',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 (2,'BC_PROGRAM','程序清单',1,'title','program_name','bc_programs_tl',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 (3,'BC_PROGRAM_TYPE','program types',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 (4,'BC_VALIDATOR','验证码',1,'description','validation_code','bc_validator_tl',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 (5,'BC_VALUELIST','值集',1,'description','valuelist_name','bc_valuelists_tl',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 (6,'BC_GRID_LAYOUT_TYPE','布局类型',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `bc_valuelists_tl` ENABLE KEYS */;


--
-- Definition of view `bc_grid_layouts_v`
--

DROP TABLE IF EXISTS `bc_grid_layouts_v`;
DROP VIEW IF EXISTS `bc_grid_layouts_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bc_grid_layouts_v` AS select `h`.`layout_id` AS `layout_id`,`h`.`program_id` AS `program_id`,`h`.`layout_name` AS `layout_name`,`h`.`description` AS `description`,`h`.`creation_date` AS `creation_date`,`h`.`created_by` AS `created_by`,`h`.`last_update_date` AS `last_update_date`,`h`.`last_updated_by` AS `last_updated_by`,`h`.`default_flag` AS `default_flag`,`l`.`field` AS `field`,`l`.`label` AS `label`,`l`.`pos` AS `pos`,`l`.`size` AS `size` from (`bc_grid_layouts_tl` `h` join `bc_glayout_columns_tl` `l`) where (`h`.`layout_id` = `l`.`layout_id`);

--
-- Definition of view `bc_uifields_v`
--

DROP TABLE IF EXISTS `bc_uifields_v`;
DROP VIEW IF EXISTS `bc_uifields_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bc_uifields_v` AS select `buf`.`ui_field_id` AS `ui_field_id`,`buf`.`program_id` AS `program_id`,`buf`.`field_name` AS `field_name`,`buf`.`field_size` AS `field_size`,`buf`.`addfield_flag` AS `addfield_flag`,`buf`.`label` AS `label`,`buf`.`help_text` AS `help_text`,`buf`.`required_flag` AS `required_flag`,`buf`.`disabled_flag` AS `disabled_flag`,`buf`.`hidden_flag` AS `hidden_flag`,`buf`.`default_value` AS `default_value`,`buf`.`valuelist_id` AS `valuelist_id`,`buf`.`validation_id` AS `validation_id`,`buf`.`creation_date` AS `creation_date`,`buf`.`created_by` AS `created_by`,`buf`.`last_update_date` AS `last_update_date`,`buf`.`last_updated_by` AS `last_updated_by`,`bv`.`validation_code` AS `validation_code`,`bva`.`valuelist_name` AS `valuelist_name`,`bva`.`description` AS `valuelist_desc`,`bv`.`description` AS `validation_desc` from ((`bc_ui_fields_tl` `buf` left join `bc_validator_tl` `bv` on((`bv`.`validation_id` = `buf`.`validation_id`))) left join `bc_valuelists_tl` `bva` on((`bva`.`valuelist_id` = `buf`.`valuelist_id`)));



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
