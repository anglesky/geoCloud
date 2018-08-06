/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50505
Source Host           : 127.0.0.1:3306
Source Database       : big_screen

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-09-12 17:22:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cloud_desktop
-- ----------------------------
DROP TABLE IF EXISTS `cloud_desktop`;
CREATE TABLE `cloud_desktop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `software_type` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `percentage` varchar(255) DEFAULT NULL,
  `user_num` int(11) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cloud_desktop
-- ----------------------------
INSERT INTO `cloud_desktop` VALUES ('1', '应用类型', '335', '33.04%', '600', '2017-09-01 01:00:00');
INSERT INTO `cloud_desktop` VALUES ('2', '办公类', '310', '30.57%', '300', '2017-09-01 03:00:00');
INSERT INTO `cloud_desktop` VALUES ('3', '工具类', '234', '23.08%', '400', '2017-09-01 05:00:00');
INSERT INTO `cloud_desktop` VALUES ('4', '专业类', '135', '13.31%', '200', '2017-09-01 05:00:00');

-- ----------------------------
-- Table structure for cpu
-- ----------------------------
DROP TABLE IF EXISTS `cpu`;
CREATE TABLE `cpu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datetime` datetime DEFAULT NULL,
  `usage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cpu
-- ----------------------------
INSERT INTO `cpu` VALUES ('1', '2017-09-01 16:24:25', '6.1');

-- ----------------------------
-- Table structure for data_visit_monitor
-- ----------------------------
DROP TABLE IF EXISTS `data_visit_monitor`;
CREATE TABLE `data_visit_monitor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_name` varchar(255) DEFAULT NULL,
  `visit_num` int(11) DEFAULT NULL,
  `data_num` int(11) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of data_visit_monitor
-- ----------------------------
INSERT INTO `data_visit_monitor` VALUES ('1', '国土资源部', '1000', '100', null);
INSERT INTO `data_visit_monitor` VALUES ('2', '中国地质调查局', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('3', '地科院', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('4', '发展研究中心', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('5', '天津地调中心', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('6', '沈阳地调中心', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('7', '南京地调中心', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('8', '武汉地调中心', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('9', '成都地调中心', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('10', '西安地调中心', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('11', '广州海洋局', '800', '80', null);
INSERT INTO `data_visit_monitor` VALUES ('12', '青岛海洋所', '800', '80', null);
INSERT INTO `data_visit_monitor` VALUES ('13', '航空物探遥感中心', '800', '80', null);
INSERT INTO `data_visit_monitor` VALUES ('14', '物化探所', '700', '70', null);
INSERT INTO `data_visit_monitor` VALUES ('15', '油气调查中心', '700', '70', null);
INSERT INTO `data_visit_monitor` VALUES ('16', '地质所', '700', '70', null);
INSERT INTO `data_visit_monitor` VALUES ('17', '资源所', '700', '70', null);
INSERT INTO `data_visit_monitor` VALUES ('18', '地质力学所', '600', '60', null);
INSERT INTO `data_visit_monitor` VALUES ('19', '环境监测院', '600', '60', null);
INSERT INTO `data_visit_monitor` VALUES ('20', '水环中心', '600', '60', null);
INSERT INTO `data_visit_monitor` VALUES ('21', '岩溶所', '600', '60', null);
INSERT INTO `data_visit_monitor` VALUES ('22', '实物资料中心', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('23', '地质图书馆', '900', '90', null);
INSERT INTO `data_visit_monitor` VALUES ('24', '矿业报社', '500', '50', null);
INSERT INTO `data_visit_monitor` VALUES ('25', '实验测试中心', '500', '50', null);
INSERT INTO `data_visit_monitor` VALUES ('26', '勘探技术所', '500', '50', null);
INSERT INTO `data_visit_monitor` VALUES ('27', '探矿工程所', '500', '50', null);
INSERT INTO `data_visit_monitor` VALUES ('28', '探矿工艺所', '500', '50', null);
INSERT INTO `data_visit_monitor` VALUES ('29', '郑州综合利用所', '400', '40', null);
INSERT INTO `data_visit_monitor` VALUES ('30', '成都综合利用所', '400', '40', null);

-- ----------------------------
-- Table structure for geo_databases
-- ----------------------------
DROP TABLE IF EXISTS `geo_databases`;
CREATE TABLE `geo_databases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `db_name` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of geo_databases
-- ----------------------------
INSERT INTO `geo_databases` VALUES ('1', '区域地质与基础地质数据库', '1200');
INSERT INTO `geo_databases` VALUES ('2', '矿产地质数据库', '1000');
INSERT INTO `geo_databases` VALUES ('3', '物化遥数据库', '1500');
INSERT INTO `geo_databases` VALUES ('4', '水工环地质数据库', '900');
INSERT INTO `geo_databases` VALUES ('5', '海洋地质数据库', '800');
INSERT INTO `geo_databases` VALUES ('6', '钻孔数据库', '1000');
INSERT INTO `geo_databases` VALUES ('7', '地质文献与资料数据库', '1000');
INSERT INTO `geo_databases` VALUES ('8', '能源矿产数据库', '700');
INSERT INTO `geo_databases` VALUES ('9', '管理支撑数据库', '1400');
INSERT INTO `geo_databases` VALUES ('10', '综合成果数据库', '2000');

-- ----------------------------
-- Table structure for geo_info_prod
-- ----------------------------
DROP TABLE IF EXISTS `geo_info_prod`;
CREATE TABLE `geo_info_prod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `geo_info_prod_id` int(11) DEFAULT NULL,
  `geo_info_prod_name` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of geo_info_prod
-- ----------------------------
INSERT INTO `geo_info_prod` VALUES ('1', '1', '数据', '-1', null);
INSERT INTO `geo_info_prod` VALUES ('2', '2', '地质图', '-1', null);
INSERT INTO `geo_info_prod` VALUES ('3', '3', '地学科普', '-1', null);
INSERT INTO `geo_info_prod` VALUES ('4', '4', '软件', '-1', null);
INSERT INTO `geo_info_prod` VALUES ('5', '5', '仪器设备', '-1', null);
INSERT INTO `geo_info_prod` VALUES ('6', '6', '出版物', '-1', null);
INSERT INTO `geo_info_prod` VALUES ('7', '7', '技术方法与标准', '-1', null);
INSERT INTO `geo_info_prod` VALUES ('8', '101', '基础地质', '1', '213');
INSERT INTO `geo_info_prod` VALUES ('9', '102', '能源', '1', '35');
INSERT INTO `geo_info_prod` VALUES ('10', '103', '矿产', '1', '56');
INSERT INTO `geo_info_prod` VALUES ('11', '104', '水资源', '1', '235');
INSERT INTO `geo_info_prod` VALUES ('12', '105', '地质灾害', '1', '86');
INSERT INTO `geo_info_prod` VALUES ('13', '106', '地质环境', '1', '156');
INSERT INTO `geo_info_prod` VALUES ('14', '107', '海洋', '1', '45');
INSERT INTO `geo_info_prod` VALUES ('15', '108', '物探/化探/遥感', '1', '166');
INSERT INTO `geo_info_prod` VALUES ('16', '109', '地质资料', '1', '69');
INSERT INTO `geo_info_prod` VALUES ('17', '110', '地学文献', '1', '276');
INSERT INTO `geo_info_prod` VALUES ('18', '111', '实时数据', '1', '368');
INSERT INTO `geo_info_prod` VALUES ('19', '112', '境外地质', '1', '186');
INSERT INTO `geo_info_prod` VALUES ('20', '113', '其他', '1', '68');
INSERT INTO `geo_info_prod` VALUES ('21', '201', '基础地质', '2', '287');
INSERT INTO `geo_info_prod` VALUES ('22', '202', '能源', '2', '456');
INSERT INTO `geo_info_prod` VALUES ('23', '203', '矿产', '2', '132');
INSERT INTO `geo_info_prod` VALUES ('24', '204', '水资源', '2', '176');
INSERT INTO `geo_info_prod` VALUES ('25', '205', '地质灾害', '2', '87');
INSERT INTO `geo_info_prod` VALUES ('26', '206', '地质环境', '2', '345');
INSERT INTO `geo_info_prod` VALUES ('27', '207', '海洋', '2', '285');
INSERT INTO `geo_info_prod` VALUES ('28', '208', '物探/化探/遥感', '2', '354');
INSERT INTO `geo_info_prod` VALUES ('29', '209', '境外地质', '2', '156');
INSERT INTO `geo_info_prod` VALUES ('30', '210', '其他', '2', '287');
INSERT INTO `geo_info_prod` VALUES ('31', '301', '科普图书', '3', '396');
INSERT INTO `geo_info_prod` VALUES ('32', '302', '科普文章', '3', '445');
INSERT INTO `geo_info_prod` VALUES ('33', '303', '科普多媒体', '3', '13');
INSERT INTO `geo_info_prod` VALUES ('34', '304', '科普模型模具', '3', '123');
INSERT INTO `geo_info_prod` VALUES ('35', '305', '其他科普形式', '3', '465');
INSERT INTO `geo_info_prod` VALUES ('36', '401', '地球物理', '4', '132');
INSERT INTO `geo_info_prod` VALUES ('37', '402', '地球化学', '4', '312');
INSERT INTO `geo_info_prod` VALUES ('38', '403', '不工环', '4', '136');
INSERT INTO `geo_info_prod` VALUES ('39', '404', '油气', '4', '125');
INSERT INTO `geo_info_prod` VALUES ('40', '405', '遥感', '4', '158');
INSERT INTO `geo_info_prod` VALUES ('41', '406', '海洋', '4', '169');
INSERT INTO `geo_info_prod` VALUES ('42', '407', '地质钻探', '4', '157');
INSERT INTO `geo_info_prod` VALUES ('43', '408', '实验测试', '4', '145');
INSERT INTO `geo_info_prod` VALUES ('44', '409', '矿产资源利用', '4', '135');
INSERT INTO `geo_info_prod` VALUES ('45', '410', '地质信息', '4', '546');
INSERT INTO `geo_info_prod` VALUES ('46', '411', '综合调查', '4', '78');
INSERT INTO `geo_info_prod` VALUES ('47', '412', '其他', '4', '546');
INSERT INTO `geo_info_prod` VALUES ('48', '501', '地球物理', '5', '45');
INSERT INTO `geo_info_prod` VALUES ('49', '502', '地球化学', '5', '96');
INSERT INTO `geo_info_prod` VALUES ('50', '503', '不工环', '5', '312');
INSERT INTO `geo_info_prod` VALUES ('51', '504', '油气', '5', '345');
INSERT INTO `geo_info_prod` VALUES ('52', '505', '遥感', '5', '455');
INSERT INTO `geo_info_prod` VALUES ('53', '506', '海洋', '5', '136');
INSERT INTO `geo_info_prod` VALUES ('54', '507', '地质钻探', '5', '145');
INSERT INTO `geo_info_prod` VALUES ('55', '508', '实验测试', '5', '198');
INSERT INTO `geo_info_prod` VALUES ('56', '509', '矿产资源利用', '5', '123');
INSERT INTO `geo_info_prod` VALUES ('57', '510', '地质信息', '5', '156');
INSERT INTO `geo_info_prod` VALUES ('58', '511', '综合调查', '5', '365');
INSERT INTO `geo_info_prod` VALUES ('59', '512', '标准物质', '5', '256');
INSERT INTO `geo_info_prod` VALUES ('60', '513', '其他', '5', '278');
INSERT INTO `geo_info_prod` VALUES ('61', '601', '地学专著', '6', '112');
INSERT INTO `geo_info_prod` VALUES ('62', '602', '科技论文', '6', '133');
INSERT INTO `geo_info_prod` VALUES ('63', '603', '专业报告', '6', '45');
INSERT INTO `geo_info_prod` VALUES ('64', '604', '出版刊物', '6', '145');
INSERT INTO `geo_info_prod` VALUES ('65', '605', '其他', '6', '378');
INSERT INTO `geo_info_prod` VALUES ('66', '701', '技术方法', '7', '65');
INSERT INTO `geo_info_prod` VALUES ('67', '702', '标准规范', '7', '286');
INSERT INTO `geo_info_prod` VALUES ('68', '703', '专利技术', '7', '78');
INSERT INTO `geo_info_prod` VALUES ('69', '704', '其他', '7', '14');

-- ----------------------------
-- Table structure for main
-- ----------------------------
DROP TABLE IF EXISTS `main`;
CREATE TABLE `main` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_name` varchar(255) DEFAULT NULL,
  `node_coordinate` varchar(255) DEFAULT NULL,
  `node_info` varchar(255) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of main
-- ----------------------------
INSERT INTO `main` VALUES ('1', '国土资源部', '116.377028,39.929777', '', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('2', '中国地质调查局', '116.343165,39.92899', '10', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('3', '地科院', '116.343196,39.933796', '20', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('4', '发展研究中心', '116.343165,39.92899', '30', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('5', '天津地调中心', '117.249978,39.116134', '40', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('6', '沈阳地调中心', '123.408987,41.910475', '50', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('7', '南京地调中心', '118.831177,32.044777', '60', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('8', '武汉地调中心', '114.426555,30.456324', '70', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('9', '成都地调中心', '104.082141,30.690319', '80', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('10', '西安地调中心', '108.955011,34.247059', '90', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('11', '广州海洋局', '113.324663,23.101892', '10', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('12', '青岛海洋所', '120.40475,36.081436', '20', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('13', '航空物探遥感中心', '116.354081,39.994898', '30', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('14', '物化探所', '116.739236,39.529416', '40', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('15', '油气调查中心', '116.739218,39.529369', '50', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('16', '地质所', '116.342407,39.933477', '60', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('17', '资源所', '116.342407,39.933477', '70', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('18', '地质力学所', '116.322746,39.952045', '80', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('19', '环境监测院', '116.338389,39.9609', '90', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('20', '水环中心', '115.494505,38.888381', '10', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('21', '岩溶所', '110.330263,25.262583', '20', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('22', '实物资料中心', '116.806278,39.956326', '30', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('23', '地质图书馆', '116.356384,39.99725', '40', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('24', '矿业报社', '116.35441,39.889', '50', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('25', '实验测试中心', '116.343196,39.933796', '60', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('26', '勘探技术所', '116.739274,39.52901', '70', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('27', '探矿工程所', '116.356384,39.99725', '80', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('28', '探矿工艺所', '103.942234,30.789608', '90', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('29', '郑州综合利用所', '113.614842,34.741829', '10', '0000-00-00 00:00:00');
INSERT INTO `main` VALUES ('30', '成都综合利用所', '104.068274,30.626756', '20', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for main_bottom
-- ----------------------------
DROP TABLE IF EXISTS `main_bottom`;
CREATE TABLE `main_bottom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_f` int(11) DEFAULT NULL,
  `data_p` varchar(255) DEFAULT NULL,
  `prod_f` int(11) DEFAULT NULL,
  `prod_p` varchar(255) DEFAULT NULL,
  `app_f` int(11) DEFAULT NULL,
  `app_p` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of main_bottom
-- ----------------------------
INSERT INTO `main_bottom` VALUES ('1', '80', '80%', '70', '70%', '60', '60%');

-- ----------------------------
-- Table structure for mem
-- ----------------------------
DROP TABLE IF EXISTS `mem`;
CREATE TABLE `mem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datetime` datetime DEFAULT NULL,
  `usage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mem
-- ----------------------------
INSERT INTO `mem` VALUES ('1', '2017-09-01 17:29:18', '5.4');

-- ----------------------------
-- Table structure for node_server_relationship
-- ----------------------------
DROP TABLE IF EXISTS `node_server_relationship`;
CREATE TABLE `node_server_relationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_name` varchar(255) DEFAULT NULL,
  `volumn` varchar(255) DEFAULT NULL,
  `usage` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node_server_relationship
-- ----------------------------
INSERT INTO `node_server_relationship` VALUES ('1', '国土资源部', '100', '60', '1');
INSERT INTO `node_server_relationship` VALUES ('2', '中国地质调查局', '100', '70', '2');
INSERT INTO `node_server_relationship` VALUES ('3', '地科院', '100', '80', '2');
INSERT INTO `node_server_relationship` VALUES ('4', '发展研究中心', '100', '90', '2');
INSERT INTO `node_server_relationship` VALUES ('5', '天津地调中心', '100', '50', '2');
INSERT INTO `node_server_relationship` VALUES ('6', '沈阳地调中心', '100', '35', '2');
INSERT INTO `node_server_relationship` VALUES ('7', '南京地调中心', '100', '97', '2');
INSERT INTO `node_server_relationship` VALUES ('8', '武汉地调中心', '100', '12', '2');
INSERT INTO `node_server_relationship` VALUES ('9', '成都地调中心', '100', '34', '3');
INSERT INTO `node_server_relationship` VALUES ('10', '西安地调中心', '100', '56', '3');
INSERT INTO `node_server_relationship` VALUES ('11', '广州海洋局', '100', '78', '3');
INSERT INTO `node_server_relationship` VALUES ('12', '青岛海洋所', '100', '67', '3');
INSERT INTO `node_server_relationship` VALUES ('13', '航空物探遥感中心', '100', '90', '3');
INSERT INTO `node_server_relationship` VALUES ('14', '物化探所', '100', '98', '3');
INSERT INTO `node_server_relationship` VALUES ('15', '油气调查中心', '100', '76', '3');
INSERT INTO `node_server_relationship` VALUES ('16', '地质所', '100', '36', '3');
INSERT INTO `node_server_relationship` VALUES ('17', '资源所', '100', '85', '3');
INSERT INTO `node_server_relationship` VALUES ('18', '地质力学所', '100', '14', '3');
INSERT INTO `node_server_relationship` VALUES ('19', '环境监测院', '100', '36', '3');
INSERT INTO `node_server_relationship` VALUES ('20', '水环中心', '100', '48', '3');
INSERT INTO `node_server_relationship` VALUES ('21', '岩溶所', '100', '95', '4');
INSERT INTO `node_server_relationship` VALUES ('22', '实物资料中心', '100', '74', '4');
INSERT INTO `node_server_relationship` VALUES ('23', '地质图书馆', '100', '43', '4');
INSERT INTO `node_server_relationship` VALUES ('24', '矿业报社', '100', '25', '4');
INSERT INTO `node_server_relationship` VALUES ('25', '实验测试中心', '100', '36', '4');
INSERT INTO `node_server_relationship` VALUES ('26', '勘探技术所', '100', '27', '4');
INSERT INTO `node_server_relationship` VALUES ('27', '探矿工程所', '100', '24', '4');
INSERT INTO `node_server_relationship` VALUES ('28', '探矿工艺所', '100', '22', '4');
INSERT INTO `node_server_relationship` VALUES ('29', '郑州综合利用所', '100', '11', '4');
INSERT INTO `node_server_relationship` VALUES ('30', '成都综合利用所', '100', '33', '4');

-- ----------------------------
-- Table structure for prod_service_num
-- ----------------------------
DROP TABLE IF EXISTS `prod_service_num`;
CREATE TABLE `prod_service_num` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_name` varchar(255) DEFAULT NULL,
  `visit_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prod_service_num
-- ----------------------------
INSERT INTO `prod_service_num` VALUES ('1', '国土资源部', '1000');
INSERT INTO `prod_service_num` VALUES ('2', '中国地质调查局', '900');
INSERT INTO `prod_service_num` VALUES ('3', '地科院', '900');
INSERT INTO `prod_service_num` VALUES ('4', '发展研究中心', '900');
INSERT INTO `prod_service_num` VALUES ('5', '天津地调中心', '900');
INSERT INTO `prod_service_num` VALUES ('6', '沈阳地调中心', '900');
INSERT INTO `prod_service_num` VALUES ('7', '南京地调中心', '900');
INSERT INTO `prod_service_num` VALUES ('8', '武汉地调中心', '900');
INSERT INTO `prod_service_num` VALUES ('9', '成都地调中心', '900');
INSERT INTO `prod_service_num` VALUES ('10', '西安地调中心', '900');
INSERT INTO `prod_service_num` VALUES ('11', '广州海洋局', '800');
INSERT INTO `prod_service_num` VALUES ('12', '青岛海洋所', '800');
INSERT INTO `prod_service_num` VALUES ('13', '航空物探遥感中心', '800');
INSERT INTO `prod_service_num` VALUES ('14', '物化探所', '800');
INSERT INTO `prod_service_num` VALUES ('15', '油气调查中心', '800');
INSERT INTO `prod_service_num` VALUES ('16', '地质所', '700');
INSERT INTO `prod_service_num` VALUES ('17', '资源所', '700');
INSERT INTO `prod_service_num` VALUES ('18', '地质力学所', '700');
INSERT INTO `prod_service_num` VALUES ('19', '环境监测院', '700');
INSERT INTO `prod_service_num` VALUES ('20', '水环中心', '600');
INSERT INTO `prod_service_num` VALUES ('21', '岩溶所', '600');
INSERT INTO `prod_service_num` VALUES ('22', '实物资料中心', '900');
INSERT INTO `prod_service_num` VALUES ('23', '地质图书馆', '900');
INSERT INTO `prod_service_num` VALUES ('24', '矿业报社', '500');
INSERT INTO `prod_service_num` VALUES ('25', '实验测试中心', '500');
INSERT INTO `prod_service_num` VALUES ('26', '勘探技术所', '500');
INSERT INTO `prod_service_num` VALUES ('27', '探矿工程所', '500');
INSERT INTO `prod_service_num` VALUES ('28', '探矿工艺所', '500');
INSERT INTO `prod_service_num` VALUES ('29', '郑州综合利用所', '500');
INSERT INTO `prod_service_num` VALUES ('30', '成都综合利用所', '500');

-- ----------------------------
-- Table structure for prod_update
-- ----------------------------
DROP TABLE IF EXISTS `prod_update`;
CREATE TABLE `prod_update` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_name` varchar(255) DEFAULT NULL,
  `node_coordinate` varchar(255) DEFAULT NULL,
  `node_info` varchar(255) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prod_update
-- ----------------------------
INSERT INTO `prod_update` VALUES ('1', '国土资源部', '116.377028,39.929777', '{\"出版物\":28,\"地学科普\":72,\"地质图\":74,\"技术方法及标准\":55,\"软件\":52,\"数据\":94,\"仪器设备\":13,\"应用系统\":82}', null);
INSERT INTO `prod_update` VALUES ('2', '中国地质调查局', '116.343165,39.92899', '{\"出版物\":71,\"地学科普\":8,\"地质图\":26,\"技术方法及标准\":4,\"软件\":44,\"数据\":7,\"仪器设备\":4,\"应用系统\":96}', null);
INSERT INTO `prod_update` VALUES ('3', '地科院', '116.343196,39.933796', '{\"出版物\":68,\"地学科普\":50,\"地质图\":48,\"技术方法及标准\":89,\"软件\":99,\"数据\":27,\"仪器设备\":40,\"应用系统\":17}', null);
INSERT INTO `prod_update` VALUES ('4', '发展研究中心', '116.343165,39.92899', '{\"出版物\":65,\"地学科普\":75,\"地质图\":78,\"技术方法及标准\":65,\"软件\":88,\"数据\":47,\"仪器设备\":69,\"应用系统\":6}', null);
INSERT INTO `prod_update` VALUES ('5', '天津地调中心', '117.249978,39.116134', '{\"出版物\":20,\"地学科普\":81,\"地质图\":45,\"技术方法及标准\":83,\"软件\":77,\"数据\":37,\"仪器设备\":54,\"应用系统\":58}', null);
INSERT INTO `prod_update` VALUES ('6', '沈阳地调中心', '123.408987,41.910475', '{\"出版物\":28,\"地学科普\":66,\"地质图\":45,\"技术方法及标准\":25,\"软件\":92,\"数据\":82,\"仪器设备\":33,\"应用系统\":20}', null);
INSERT INTO `prod_update` VALUES ('7', '南京地调中心', '118.831177,32.044777', '{\"出版物\":2,\"地学科普\":48,\"地质图\":33,\"技术方法及标准\":22,\"软件\":8,\"数据\":74,\"仪器设备\":48,\"应用系统\":15}', null);
INSERT INTO `prod_update` VALUES ('8', '武汉地调中心', '114.426555,30.456324', '{\"出版物\":29,\"地学科普\":3,\"地质图\":24,\"技术方法及标准\":13,\"软件\":90,\"数据\":12,\"仪器设备\":89,\"应用系统\":8}', null);
INSERT INTO `prod_update` VALUES ('9', '成都地调中心', '104.082141,30.690319', '{\"出版物\":73,\"地学科普\":40,\"地质图\":81,\"技术方法及标准\":86,\"软件\":85,\"数据\":68,\"仪器设备\":84,\"应用系统\":15}', null);
INSERT INTO `prod_update` VALUES ('10', '西安地调中心', '108.955011,34.247059', '{\"出版物\":22,\"地学科普\":63,\"地质图\":50,\"技术方法及标准\":60,\"软件\":51,\"数据\":72,\"仪器设备\":7,\"应用系统\":17}', null);
INSERT INTO `prod_update` VALUES ('11', '广州海洋局', '113.324663,23.101892', '{\"出版物\":66,\"地学科普\":79,\"地质图\":94,\"技术方法及标准\":34,\"软件\":88,\"数据\":37,\"仪器设备\":20,\"应用系统\":87}', null);
INSERT INTO `prod_update` VALUES ('12', '青岛海洋所', '120.40475,36.081436', '{\"出版物\":76,\"地学科普\":18,\"地质图\":64,\"技术方法及标准\":63,\"软件\":22,\"数据\":20,\"仪器设备\":34,\"应用系统\":11}', null);
INSERT INTO `prod_update` VALUES ('13', '航空物探遥感中心', '116.354081,39.994898', '{\"出版物\":50,\"地学科普\":17,\"地质图\":33,\"技术方法及标准\":17,\"软件\":84,\"数据\":68,\"仪器设备\":90,\"应用系统\":43}', null);
INSERT INTO `prod_update` VALUES ('14', '物化探所', '116.739236,39.529416', '{\"出版物\":45,\"地学科普\":94,\"地质图\":34,\"技术方法及标准\":88,\"软件\":38,\"数据\":28,\"仪器设备\":22,\"应用系统\":26}', null);
INSERT INTO `prod_update` VALUES ('15', '油气调查中心', '116.739218,39.529369', '{\"出版物\":62,\"地学科普\":34,\"地质图\":83,\"技术方法及标准\":10,\"软件\":3,\"数据\":85,\"仪器设备\":14,\"应用系统\":15}', null);
INSERT INTO `prod_update` VALUES ('16', '地质所', '116.342407,39.933477', '{\"出版物\":32,\"地学科普\":16,\"地质图\":81,\"技术方法及标准\":59,\"软件\":49,\"数据\":68,\"仪器设备\":94,\"应用系统\":67}', null);
INSERT INTO `prod_update` VALUES ('17', '资源所', '116.342407,39.933477', '{\"出版物\":50,\"地学科普\":48,\"地质图\":89,\"技术方法及标准\":2,\"软件\":43,\"数据\":8,\"仪器设备\":8,\"应用系统\":19}', null);
INSERT INTO `prod_update` VALUES ('18', '地质力学所', '116.322746,39.952045', '{\"出版物\":69,\"地学科普\":88,\"地质图\":32,\"技术方法及标准\":97,\"软件\":89,\"数据\":53,\"仪器设备\":98,\"应用系统\":28}', null);
INSERT INTO `prod_update` VALUES ('19', '环境监测院', '116.338389,39.9609', '{\"出版物\":47,\"地学科普\":52,\"地质图\":16,\"技术方法及标准\":22,\"软件\":65,\"数据\":55,\"仪器设备\":83,\"应用系统\":47}', null);
INSERT INTO `prod_update` VALUES ('20', '水环中心', '115.494505,38.888381', '{\"出版物\":88,\"地学科普\":97,\"地质图\":20,\"技术方法及标准\":7,\"软件\":77,\"数据\":65,\"仪器设备\":90,\"应用系统\":58}', null);
INSERT INTO `prod_update` VALUES ('21', '岩溶所', '110.330263,25.262583', '{\"出版物\":18,\"地学科普\":14,\"地质图\":16,\"技术方法及标准\":39,\"软件\":46,\"数据\":14,\"仪器设备\":29,\"应用系统\":5}', null);
INSERT INTO `prod_update` VALUES ('22', '实物资料中心', '116.806278,39.956326', '{\"出版物\":36,\"地学科普\":63,\"地质图\":6,\"技术方法及标准\":43,\"软件\":96,\"数据\":49,\"仪器设备\":56,\"应用系统\":34}', null);
INSERT INTO `prod_update` VALUES ('23', '地质图书馆', '116.356384,39.99725', '{\"出版物\":99,\"地学科普\":94,\"地质图\":74,\"技术方法及标准\":85,\"软件\":3,\"数据\":58,\"仪器设备\":83,\"应用系统\":40}', null);
INSERT INTO `prod_update` VALUES ('24', '矿业报社', '116.35441,39.889', '{\"出版物\":52,\"地学科普\":38,\"地质图\":35,\"技术方法及标准\":61,\"软件\":97,\"数据\":2,\"仪器设备\":19,\"应用系统\":89}', null);
INSERT INTO `prod_update` VALUES ('25', '实验测试中心', '116.343196,39.933796', '{\"出版物\":87,\"地学科普\":66,\"地质图\":70,\"技术方法及标准\":49,\"软件\":38,\"数据\":40,\"仪器设备\":88,\"应用系统\":19}', null);
INSERT INTO `prod_update` VALUES ('26', '勘探技术所', '116.739274,39.52901', '{\"出版物\":28,\"地学科普\":86,\"地质图\":43,\"技术方法及标准\":59,\"软件\":65,\"数据\":46,\"仪器设备\":34,\"应用系统\":31}', null);
INSERT INTO `prod_update` VALUES ('27', '探矿工程所', '116.356384,39.99725', '{\"出版物\":52,\"地学科普\":68,\"地质图\":85,\"技术方法及标准\":19,\"软件\":40,\"数据\":43,\"仪器设备\":92,\"应用系统\":32}', null);
INSERT INTO `prod_update` VALUES ('28', '探矿工艺所', '103.942234,30.789608', '{\"出版物\":82,\"地学科普\":14,\"地质图\":23,\"技术方法及标准\":75,\"软件\":3,\"数据\":89,\"仪器设备\":38,\"应用系统\":23}', null);
INSERT INTO `prod_update` VALUES ('29', '郑州综合利用所', '113.614842,34.741829', '{\"出版物\":2,\"地学科普\":37,\"地质图\":78,\"技术方法及标准\":78,\"软件\":58,\"数据\":54,\"仪器设备\":95,\"应用系统\":13}', null);
INSERT INTO `prod_update` VALUES ('30', '成都综合利用所', '104.068274,30.626756', '{\"出版物\":78,\"地学科普\":52,\"地质图\":23,\"技术方法及标准\":62,\"软件\":39,\"数据\":9,\"仪器设备\":28,\"应用系统\":13}', null);
