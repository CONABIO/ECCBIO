<?php
        include "../Panel/base.php";
        //header('Access-Control-Allow-Origin: http://www.wegp.unam.mx',false); 
	#$baseDatos = $_REQUEST['bd'];
	include "../Panel/host2.php";
        $base=new Base($DB_server,$DB_user,$DB_name);

	//$temperaturas = $_REQUEST['temperaturas']; 
	$idPais = 1;//$_REQUEST['idPais'];
	$idEstado = $_REQUEST['metadata'];
	$idVariable = $_REQUEST['variable'];
	$idTemporada = $_REQUEST['idTemporada'];
	$query = "SELECT climas,idsANP FROM climaPorEstado WHERE idEstado IN ($idEstado) and idVariable=$idVariable and idTemporada=$idTemporada order by idEstado";
        //die ($query);
	$resultado=$base->consulta($query);
	$result = [];
	header('Content-Type: application/json');
	header('Content-Encoding: gzip');
	$i=0;
	while($fila=$resultado->fetch_assoc()){
		array_push($result,$fila["climas"]);
	}
	if(isset($_GET['callback'])){ // Si es una petición cross-domain  
	        echo $_GET['callback'].'('.json_encode($result).')';
        }else{ // Si es una normal, respondemos de forma normal  
        	echo gzencode(json_encode($result));
        }
	//print_r($result);
?>
