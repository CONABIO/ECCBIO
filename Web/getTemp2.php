<?php
	include "../Panel/base.php";
	header('Access-Control-Allow-Origin: http://www.wegp.unam.mx',false); 
	include "../Panel/host2.php";
        $base=new Base($DB_server,$DB_user,$DB_name);	
	$idPais = 1;
	$idANP = $_REQUEST['metadata'];
	$idVariable = $_REQUEST['variable'];
	$idTemporada = $_REQUEST['idTemporada'];
	$query = "SELECT climas FROM climasANP WHERE idANP IN ($idANP) and idVariable=$idVariable and idTemporada=$idTemporada order by idANP asc";
	$resultado=$base->consulta($query);
	$result = [];
	header('Content-Type: application/json');
	header('Content-Encoding: gzip');
	while($fila=$resultado->fetch_assoc()){
		array_push($result,$fila["climas"]);
	}
	if(isset($_GET['callback'])){ // Si es una petición cross-domain  
		echo $_GET['callback'].'('.json_encode($result).')';
	}else{ // Si es una normal, respondemos de forma normal  
		echo gzencode(json_encode($result));
	}
?>
