<?php
	/*ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);*/
	include "../base.php";
	include '../host2.php';
	$conex=new Base($DB_server,$DB_user,$DB_name);
	$option = $_REQUEST['option'];
	$idSubmenu = "";
	switch($option){
		case 1: $data = json_decode($_REQUEST['data']);
				assingPriority($data[0],$conex,null);
				break;
		case 2: $name = $_REQUEST['name'];
				$idSubmenu = $_REQUEST['idSubmenu'];
				changeName($idSubmenu,$name,$conex);
				break;
		case 3: $description = $_REQUEST['name'];
				$idSubmenu = $_REQUEST['idSubmenu'];
				changeDescription($idSubmenu,$description,$conex);
				break;
		case 4: $name = $_REQUEST['name'];
				$description = $_REQUEST['description'];
				$idPadreSub = $_REQUEST['idPadreSub'];
				$idSubmenu=addSubmenu($name,$description,$idPadreSub,$conex);
				break;
		case 5: $idSubmenu = $_REQUEST['idSubmenu'];
				removeSubmenu($idSubmenu,$conex);
				break;				
	}
	
	$jsondata = array();
	$jsondata["success"] = true;
	$jsondata["idSubmenu"] = $idSubmenu;
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($jsondata, JSON_FORCE_OBJECT);
	function changeName($idSubmenu,$name,$conex){
		$query =  "UPDATE subMenus SET nombre = '".htmlentities($name)."' WHERE idSubmenu=$idSubmenu";
		$conex->consulta($query);
	}
	function changeDescription($idSubmenu,$description,$conex){
		$query = "UPDATE subMenus SET descripcion = '$description' WHERE idSubmenu=$idSubmenu";
		$conex->consulta($query);
	}
	function addSubmenu($name,$description,$idPadreSub,$conex){
		if($idPadreSub == null){
			$idPadreSub = "NULL";
		}
		$query = "SELECT MAX(prioridad) prioridad FROM subMenus";
		$result = $conex->consulta($query);
		$fila = $result->fetch_object();
		$max = $fila->prioridad;
		$query = "INSERT INTO subMenus 
					VALUES(NULL,'".htmlentities($name)."','$description',($max+1),$idPadreSub,$idPais);";
		$conex->consulta($query);
		return $conex->db->insert_id;
	}
	function removeSubmenu($idSubmenu,$conex){
		$query = "DELETE FROM subMenus WHERE idSubmenu=$idSubmenu";
		$conex->consulta($query);
	}
	function assingPriority($data,$conex,$parent){
		if($parent == null){
			$parent = "NULL";
		}
		for($i = 0; $i<count($data);$i++){
			$query = "";
			if(strpos($data[$i]->id."","sub") !== false){
				$idSubmenu = substr($data[$i]->id."",3);
				$prioridad = $data[$i]->prioridad;
				$query = "UPDATE subMenus SET prioridad = $prioridad, idPadreSub = $parent WHERE idSubmenu = $idSubmenu";
			} else {
				$idCapa = $data[$i]->id;
				$prioridad = $data[$i]->prioridad;
				$query = "UPDATE menus2 SET prioridad = $prioridad, idSubmenu = $parent WHERE id_Capa = $idCapa";
			}
			$conex->consulta($query);
			if(isset($data[$i]->children)){
				$idParent = substr($data[$i]->id."",3);
				assingPriority($data[$i]->children[0],$conex,$idParent);
			}
		}
	}	
?>
