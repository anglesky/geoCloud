<?php
/**
* @abstract PDO study: PDO操作MySQL增删查改类
* @date  2014/06/30
* @author Silov[bluebird237@gmail.com]
*/
	@ini_set("display_errors","on");//on off
	@error_reporting(E_ERROR|E_PARSE|E_WARNING);// 0
class mysqlPdoClass{
	private $db;
	private $db_name = 'big_screen';
	private $db_serv;
	private $db_user = 'root';
	private $db_pass = 'cpsjb';
	private $db_host = 'localhost';
	//构造函数以及连接数据库
	public function __construct(){
		$this->db_serv = "mysql:dbname=".$this->db_name.";host=".$this->db_host.";charset=utf8";
		$this->db_user = $this->db_user;
		$this->db_pass = $this->db_pass;
		$this->db = new PDO($this->db_serv, $this->db_user, $this->db_pass);
	}
	//管理数据库，析构函数
	public function __destruct(){
		$this->db = null;
	}

	public function run_query($sql){
		$this->db->query("set names utf8");	//设置PHP+MySQL连接的编码格式为UTF8
		$row = $this->db->query($sql);
		$row->setFetchMode(PDO::FETCH_ASSOC);	//设置查询结果显示为键值对数组模式
		return $row->fetchAll();
	}
	/**
	* @abstract 插入操作
	* @param 	$table:表名; $data:插入数据键值对数组; $return:是否返回值,为true时,返回插入字段的id; $debug:是否测试,true时返回sql语句,不执行
	* @return 	返回值:插入结果，boolean
	*/
	public function pdo_execute($sql, $vals){

		$this->db->query("set names utf8");    //设置PHP+MySQL连接的编码格式为UTF8
		$sth =$this->db->prepare($sql);
		$i = 1;
		foreach ($vals as $value) {
			if(gettype($value)==="string"){
				$sth->bingParam($i,$value,PDO::PARAM_STR);
			}elseif(gettype($value)==="integer"){
				$sth->bingParam($i,$value,PDO::PARAM_INT);
			}else{
				die('params error');
			}
			$i = $i+1;
		}
		$sth->execute();		
	}

	/**
	* @abstract 查询单条记录，多个字段
	* @param 	$sql:sql语句
	* @return 	返回值:键值对数组
	*/
	public function getRow($sql,$vals){
		$this->db->query("set names utf8");	//设置PHP+MySQL连接的编码格式为UTF8
		$sth =$this->db->prepare($sql);
		$i = 1;
		foreach ($vals as $value) {
			if(gettype($value)==="string"){
				$sth->bingParam($i,$value,PDO::PARAM_STR);
			}elseif(gettype($value)==="integer"){
				$sth->bingParam($i,$value,PDO::PARAM_INT);
			}else{
				die('params error');
			}
			$i = $i+1;
		}
		$result = $sth->execute();
		$data = $result->fetch();
		return $data;
	}
	/**
	* @abstract 查询多条记录
	* @param 	$sql:sql语句
	* @return 	返回值:以键值对数组为元素的数组
	*/
	public function getRows($sql){
		$this->db->query("set names utf8");	//设置PHP+MySQL连接的编码格式为UTF8
		$sth =$this->db->prepare($sql);
		$i = 1;
		foreach ($vals as $value) {
			if(gettype($value)==="string"){
				$sth->bingParam($i,$value,PDO::PARAM_STR);
			}elseif(gettype($value)==="integer"){
				$sth->bingParam($i,$value,PDO::PARAM_INT);
			}else{
				die('params error');
			}
			$i = $i+1;
		}
		$result = $sth->execute();
		$data = $result->fetch();
		return $data;
	}
}

$pdo_sql = new mysqlPdoClass;
$act = $_REQUEST['act'];
if($act =='get_map'){
		$map = array();
		$sql = 'select node_name,node_coordinate from main';
		$result = $pdo_sql->run_query($sql);
		foreach ($result as $key => $value) {
			$map[urlencode($value['node_name'])] = explode(',', $value['node_coordinate']);
		}
		//echo json_encode($map,JSON_UNESCAPED_SLASHES);
		header('Content-Type:text/plain;charset=utf-8');
		echo urldecode(json_encode($map));
}elseif($act=='get_main_map_info'){
		$info = array();
		$sql = 'select node_name,node_coordinate,node_info from main';
		$result = $pdo_sql->run_query($sql);
		foreach ($result as $key => $value) {
			$info[] = array(0=>array('name'=>urlencode('国土资源部')),1=>array('name'=>urlencode($value['node_name']),'value'=>$value['node_info']));
		}
		//echo json_encode($info,JSON_UNESCAPED_SLASHES);
		header('Content-Type:text/plain;charset=utf-8');
		echo urldecode(json_encode($info));
}elseif ($act == 'get_main_bottom') {
		$info = array();
		$sql = 'select data_f,prod_f,app_f from main_bottom';
		$result = $pdo_sql->run_query($sql);
		foreach ($result as $key => $value) {
			$data_f = $value['data_f'] + rand(-50,40);
			$data_p = $data_f>=100?'100':$data_f;
			$prod_f = $value['prod_f'] + rand(-50,40);
			$prod_p = $prod_f>=100?'100':$prod_f;
			$app_f = $value['app_f'] + rand(-50,40);
			$app_p = $app_f>=100?'100':$app_f;
			$info = array('data_f'=>$data_f,'data_p'=>$data_p,'prod_f'=>$prod_f,'prod_p'=>$prod_p,'app_f'=>$app_f,'app_p'=>$app_p);
		}
		header('Content-Type:text/plain;charset=utf-8');
		echo urldecode(json_encode($info));		
}elseif ($act == 'get_accesses') {
		$rand = rand(5,20);
		$base = (time()-1504842179)*5+10000;
		$info = array('accesses'=>$base+$rand);

		header('Content-Type:text/plain;charset=utf-8');
		echo urldecode(json_encode($info));		
}elseif ($act == 'get_visits') {

		$total = (time()-1504842179)*10+10000+rand(10,30);
		$info = array('total'=>$total,'user1'=>rand(5,50),'user2'=>rand(1500,5500));

		header('Content-Type:text/plain;charset=utf-8');
		echo urldecode(json_encode($info));		
}elseif ($act == 'get_cloud_desktop_static') {

		$info = array();
		$sql = 'select software_type,percentage,number from cloud_desktop';
		$result = $pdo_sql->run_query($sql);
		$total = 0;
		foreach ($result as $key => $value) {
			$info[] = array(urlencode($value['software_type'])=>array($value['percentage'],$value['number']));
			$total = $total + $value['number'];
		}
		$info['total'] = $total;
		header('Content-Type:text/plain;charset=utf-8');
		echo urldecode(json_encode($info));		
}elseif ($act == 'get_cloud_desktop_online') {

		$info = array(array('name'=>urlencode('应用类型'),'value'=>rand(50,200)),
				array('name'=>urlencode('工具类'),'value'=>rand(50,200)),
				array('name'=>	urlencode('办公类'),'value'=>rand(50,200)),
				array('name'=>	urlencode('专业类'),'value'=>rand(50,200)));
		header('Content-Type:text/plain;charset=utf-8');
		echo urldecode(json_encode($info));		
}elseif ($act == 'get_data_visit_monitor') {

		$info = array();
		$sql = 'select node_name,visit_num,data_num from data_visit_monitor';
		$result = $pdo_sql->run_query($sql);
		foreach ($result as $key => $value) {
			$info[] = array(urlencode($value['node_name'])=>array('visit'=>$value['visit_num']+rand(-300,300),'data'=>$value['data_num']));
		}
		header('Content-Type:text/plain;charset=utf-8');
		echo urldecode(json_encode($info));		
}elseif ($act == 'get_prod_service_visit') {

		$info = array();
		$sql = 'select node_name,visit_num from prod_service_num';
		$result = $pdo_sql->run_query($sql);
		$total = 0;
		foreach ($result as $key => $value) {
			$info[] = array(urlencode($value['node_name'])=>array('visit'=>$value['visit_num']+rand(-300,300)));
			$total = $total + $value['visit_num'];
		}
		$info['total'] = $total;
		header('Content-Type:text/plain;charset=utf-8');
		echo urldecode(json_encode($info));		
}



// $sql = 'select * from cloud_desktop';
// var_dump($pdo_sql->run_query($sql));
?>