<?php
	include "base.php";
	include "host2.php";
	$baseDatos = $_REQUEST['bd'];
	$base=new Base($DB_server,$DB_user,"$baseDatos");	
	$idCapa = $_REQUEST['idCapa'];	
	$query = "SELECT nombreEE, latitud, longitud, zoom, columna, valorFiltro, estilos,nombreEE2,unidad,tipo,escalaLog, id_Pais, password  
		FROM menus2 m LEFT join columnas c
		ON m.id_Columna = c.idColumna 
		WHERE id_Capa=$idCapa";
	//die($query);
	$res =$base->consulta($query);
	$row = $res->fetch_array(MYSQLI_NUM);
	$response[0] = $row[0];
	$response[1] = $row[1];
	$response[2] = $row[2];
	$response[3] = $row[3];
	$response[4] = $row[4];
	$response[5] = $row[5]=='NULL'?NULL:$row[5];
	$response[6] = $row[6];
	$response[7] = $row[7]==NULL?"":$row[7];
	$response[8] = $row[8]==NULL?"":$row[8];
	$response[9] = $row[9]==NULL?"":$row[9];
	$response[10] = $row[10];
	$response[11] = $row[11];
	$response[12] = $row[12]==NULL?"":$row[12];
	
	$response[13] = "";
	$response[14] = "";
	$response[15] = "";
	$response[16] = "";
	$response[17] = "";
	
	$query = "SELECT numRows,numCols,textoColumnas,varColumna,plantillaId,columnas   
		FROM $baseDatos.styleIW 
		WHERE idCapa=$idCapa";
	// die($query);
	$res =$base->consulta($query);
	if($res){
		if($res->num_rows>0){
			$row = $res->fetch_array(MYSQLI_NUM);
			$response[13] = $row[0];
			$response[14] = $row[1];
			$response[15] = $row[2];
			$response[16] = $row[3];
			$response[17] = htmlentities($row[4]);
			$response[4] = $row[5];
		}
	}
	// echo print_r($response);
	header('Content-Type: application/json');
	echo json_encode($response);	
?>