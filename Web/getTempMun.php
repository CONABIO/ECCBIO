<?php
	include "../Panel/base.php";
	header('Access-Control-Allow-Origin: http://www.wegp.unam.mx',false); 
	$base=new Base("localhost","root","conabio3");
	$idPais = 1;
	$idMun = $_REQUEST['metadata'];
	$idVariable = $_REQUEST['variable'];
	$idTemporada = $_REQUEST['idTemporada'];
	$query = "SELECT climas FROM climasMun WHERE idMun IN ($idMun) and idVariable=$idVariable and idTemporada=$idTemporada order by idMun asc";
	$resultado=$base->consulta($query);
	$result = [];
	header('Content-Type: application/json');
	while($fila=$resultado->fetch_assoc()){
		array_push($result,$fila["climas"]);
	}
	if(isset($_GET['callback'])){ // Si es una petición cross-domain  
		echo $_GET['callback'].'('.json_encode($result).')';
	}else{ // Si es una normal, respondemos de forma normal  
		echo json_encode($result);
	}
?>
