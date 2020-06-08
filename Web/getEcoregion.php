<?php
	//include "base.php";
	include "host.php"
	include $rootApp."/Panel/baseAcentos.php";
	header('Content-Type: text/html; charset=UTF-8');
	header('Access-Control-Allow-Origin: http://www.wegp.unam.mx',false); 
	$base=new Base("localhost","root","conabio3");

	
	$idANP = $_REQUEST['idANP'];
	//$level = $_REQUEST['level'];
	//$d = $_REQUEST['d'];
	//$query = "SELECT climas FROM climasANP WHERE idANP IN ($idANP) and idVariable=$idVariable and idTemporada=$idTemporada order by idANP asc";
	$query = "SELECT DISTINCT ecoregion, level FROM acentos WHERE idANP = $idANP ORDER BY level";
	//select  d, con, level from protConn2 where idANP = 1 order by d,level
	$resultado=$base->consulta($query);
	$result = [];
	header('Content-Type: application/json');
	while($fila=$resultado->fetch_assoc()){
		//array_push($result,$fila["d"]);
		array_push($result,$fila["ecoregion"]);
		//array_push($result,$fila["level"]);
		//array_push($result,$fila["prot"]);
		//array_push($result,$fila["unprot"]);
		//array_push($result,$fila["ecoregion"]);
	}
	if(isset($_GET['callback'])){ // Si es una petición cross-domain  
		echo $_GET['callback'].'('.json_encode($result).')';
	}else{ // Si es una normal, respondemos de forma normal  
		echo json_encode($result);
	}
?>
