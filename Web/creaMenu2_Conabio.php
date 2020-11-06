<?php
	//ini_set('display_errors', 1);
	//ini_set('display_startup_errors', 1);
	//error_reporting(E_ALL);
header('Content-Type: text/html; charset=UTF-8');
	include "../Panel/base.php";
	include "funciones.php";
	include "../Panel/host2.php";
        $conex=new Base($DB_server,$DB_user,$DB_name);
	$baseDatos = $DB_name;
	echo capas($conex,$baseDatos);
	
	function capas($conex,$parent){
		$tablaSubmenus = "subMenus2";
		$idPais=$_REQUEST['idPais'];
		//$cond = " AND s.idPais = $idPais ";
		//if(strcmp($parent,"conabio2")===0 || strcmp($parent,"conabio3")===0){
		//	$tablaSubmenus = "subMenus";
		//	$cond = "";
		//}
		$paises = '';
		$scriptT='<script>';
		$scriptT.="var capasIds=[], unidades=[], leyendas=[];
			function callbackF(){
		";
		$query = "select idSubmenu,nombre,descripcion,idPadreSub from subMenus s WHERE idPadreSub IS NULL order by prioridad";		
		$Subsresult =$conex->consulta($query);
		while($fila = $Subsresult->fetch_object()){
			$idSub="sub".$fila->idSubmenu;
			$sub='id="'.$idSub.'"';
			$claseS=$fila->idSubmenu;
			$paises.='<li '.$sub.'>
						<a href="#exp'.$idSub.'" data-toggle="collapse" aria-expanded="false">
							'.htmlentities($fila->nombre, ENT_QUOTES, "ISO-8859-1").'
						</a>						
						<ul id="exp'.$idSub.'" class="collapse list-unstyled _'.limpia($claseS).'">                          
						</ul>
					</li>';			
		}
		$query = "select s.idSubmenu,s.nombre,s.descripcion,s.idPadreSub,s.prioridad from subMenus s,subMenus p WHERE s.idPadreSub IS NOT NULL AND s.idPadreSub=p.idSubmenu order by p.prioridad, s.prioridad;";		
		$Subsresult =$conex->consulta($query);
		while($fila = $Subsresult->fetch_object()){
			$idSub="sub".$fila->idSubmenu;
			$sub='id="'.$idSub.'"';
			$claseS=$fila->idSubmenu;
			$paises.='<li '.$sub.'>
						<a href="#exp'.$idSub.'" data-toggle="collapse" aria-expanded="false">
							'.htmlentities($fila->nombre, ENT_QUOTES, "ISO-8859-1").'
						</a>						
						<ul id="exp'.$idSub.'" class="collapse list-unstyled _'.limpia($claseS).'">                          
						</ul>
					</li>';	
			$scriptT.='$( \'#'.$idSub.'\' ).appendTo( "._'.$fila->idPadreSub.'" );';		
		}
	    $Subsresult3 =$conex->consulta("select nombre,id_Capa,descripcion,unidad,idSubmenu,tipo,prioridad,leyendaStrech from menus2 m,columnas c where id_Pais = $idPais and m.id_Columna=c.idColumna order by prioridad ASC");
	    $Subsnumfilas3 = $Subsresult3->num_rows;
	    for ($x=0;$x<$Subsnumfilas3;$x++) {
	        $fila = $Subsresult3->fetch_object();			
			$clase=$fila->tipo;
			if(strcmp($parent,"conabio4")===0){
				$opacidad = 'changeOpacity(';
			}
			else{
				$opacidad = 'opacidadConabio(';				
			}		
			$paises.='
				<li class="padre " title="'.$fila->nombre.'" id="c'.$fila->id_Capa.'">
					<form onsubmit="return false" oninput="temp'.$fila->id_Capa.'.value = points'.$fila->id_Capa.'.valueAsNumber">
						<a data-priority="" id="capa'.$fila->id_Capa.'" tabindex="0" onclick="agregarCapa(\'capa'.$fila->id_Capa.'\',\'\',\''.$fila->id_Capa.'\',\''.$clase.'\',\'\','.$fila->prioridad.')">
							<i class="fas fa-toggle-off" style="margin-right: 3px;"></i>'.$fila->nombre.'</a>
					</form>
					<div class="capaActiva" style="display: none;" id="c'.$fila->id_Capa.'Principal">
					<form onsubmit="return false" oninput="temp'.$fila->id_Capa.'.value = points'.$fila->id_Capa.'.valueAsNumber">
						<a class= "capaActiva" data-priority="" id="capa'.$fila->id_Capa.'" tabindex="0" onclick="agregarCapa(\'capa'.$fila->id_Capa.'\',\'\',\''.$fila->id_Capa.'\',\''.$clase.'\',\'\','.$fila->prioridad.')">
							<i class="fas fa-toggle-on" style="margin-right: 3px;"></i>'.$fila->nombre.'</a>
					<form onsubmit="return false" oninput="temp'.$fila->id_Capa.'.value = points'.$fila->id_Capa.'.valueAsNumber">
						<a class= "capaActiva" data-priority="" id="capa'.$fila->id_Capa.'" tabindex="0" onclick="agregarCapa(\'capa'.$fila->id_Capa.'\',\'\',\''.$fila->id_Capa.'\',\''.$clase.'\',\'\','.$fila->prioridad.')">
							<i class="fas fa-toggle-on" style="margin-right: 3px;"></i>'.$fila->nombre.'</a>
					<form onsubmit="return false" oninput="temp'.$fila->id_Capa.'.value = points'.$fila->id_Capa.'.valueAsNumber">
						<a class= "capaActiva" data-priority="" id="capa'.$fila->id_Capa.'" tabindex="0" onclick="agregarCapa(\'capa'.$fila->id_Capa.'\',\'\',\''.$fila->id_Capa.'\',\''.$clase.'\',\'\','.$fila->prioridad.')">
							<i class="fas fa-toggle-on" style="margin-right: 3px;"></i>'.$fila->nombre.'</a>
						<input id="points'.$fila->id_Capa.'" class="sliderRange" onchange="'.$opacidad.'\'capa'.$fila->id_Capa.'\',\''.$fila->id_Capa.'\',\''.$fila->tipo.'\')" name="points'.$fila->id_Capa.'" type="range" min="0" max="100" default="100" value="100">
						<output for="points'.$fila->id_Capa.'" default="100" name="temp'.$fila->id_Capa.'">100</output>
					</form>
					<form onsubmit="return false">											
						<a class="capaActiva" style="width: 100%;text-align: center;">
							<div id="datos'.$fila->id_Capa.'">
								<div class="color-gradient" style="border-radius:4px; width:140px;"></div>								
								<div class="color-minmax" style="display:inline; width:29%;"></div> <div class="unidad" style="display:inline; width:5%;"></div>
								<div class="listaColores"></div>
							</div>
							<!--div id="leyenda'.$fila->id_Capa.'">
								<div class="leyenda" style="width:140px;"></div>								
								<div style="display:inline; width:45%;"></div>
								<div style="display:inline; width:5%;"></div>								
							</div-->
						</a>
						<span onclick="actualizaDatos(\''.$fila->nombre.'\',\''.$fila->unidad.'\','.$fila->id_Capa.')">
							<i class="fas fa-info" data-toggle="modal" style="color: black;"  data-target="#infoOfLayer"></i></span>
					</form>
					<div id="leyenda'.$fila->id_Capa.'" style="color: black;">
								<div class="leyenda" style="width:140px;"></div>								
								<div style="display:inline; width:45%;"></div>
								<div style="display:inline; width:5%;"></div>								
							</div>
					</div>
				</li>
			';
			if($fila->idSubmenu!=NULL){
				$scriptT.= '$( "#c'.$fila->id_Capa.'"  ).appendTo( "._'.$fila->idSubmenu.'" );';								
			}
			$scriptT.= 'capasIds.push('.$fila->id_Capa.');';
			$scriptT.= 'unidades.push("'.$fila->unidad.'");';
			$scriptT.= 'leyendas.push("'.$fila->leyendaStrech.'");';
	    }
		$scriptT.="					
					for(var i=0;i<capasIds.length;i++){
						actualizaDatos2(unidades[i],capasIds[i],leyendas[i]);
					}
					$('#sub').remove();
				}
				callbackF();
				var capass=$('a[id^=capa]');
				capass.each(function(index){
					$(this).attr('data-priority',index);
				});
			</script>";
		$conex->db->close();
        return $paises.$scriptT;
	}
?>

