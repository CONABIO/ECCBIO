<?php
	include "jsvars.php";
?>
<!DOCTYPE html>
<!--html class="wf-freightsanspro-n4-active wf-freightsanspro-i4-active wf-freightsanspro-n7-active wf-freightsanspro-i7-active wf-freightsanspro-n9-active wf-freightsanspro-i9-active wf-acuminproextracondensed-n7-active wf-acuminproextracondensed-i7-active wf-acuminproextracondensed-n4-active wf-acuminproextracondensed-i4-active wf-active fa-events-icons-ready" style="height: 100%;"-->
<html style="height: 100%;">
	<head>
		<style>			
			:root{
				--bar-color: rgba(123, 163, 180, 0.90);
				--right-button-color: rgba(123, 163, 180, 1.0);				
				--main-font-color: white;
			}
		</style>		
		<script>
			var versionScripts = "debug";
			var home="<?php echo($home); ?>";
			var idPaisGlobal=1;
			var idPais=<?php echo($idPais); ?>;
			var mapa="Mexico";
			var paisT = "None";
			var colpaiId = "None";
			var colpaiNom = "None";
			var estadosT = "1CHafYvXodZoBmN-eDN74OBHZ5sQZfc2JfZwGDdYf";
			var colesId = "CVE_ENT";
			var colesNom = "NOM_ENT";
			var municipiosT = "1wVP9Qc9WqJKcoreFe9aCpJPIpzzaTaMciFwTZT8r";
			var colmunId = "COV_ID";
			var colmunNom = "NOMBRE_MUN";
			var zoom=6;
			var countryZoom  = zoom;
			var maxZoom=15;
			var lat=23.24;
			var lng=-102.08;
			var key="<?php echo($key); ?>";
			var layerPai = null;
			var layerEnt = null;
			var layerMun = null;
			var layerANP = null;			
		</script>
		
		<meta charset="utf-8">
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge">-->
		<!--<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">-->
		<meta name="description" content="CONABIO: Explorador de Cambio Climático y biodiversidad">
		<meta name="author" content="UNAM: Wood-Energy Geospatial Portal">
		<title>CONABIO: Explorador de Cambio Climático y biodiversidad</title>
		<!-- ICONS -->
		<!--<link rel="icon" href="favicon.ico">-->
		<!--link rel="stylesheet" href="https://fonts.googleapis.com/css?familiy=Open Sans Condensed:light&v1:300,400,600"-->
		<link rel="shortcut icon" href="Web/unam.png">
		<link rel="shortcut icon" href="Web/unam.png">
		<link rel="apple-touch-icon-precomposed" sizes="144x144" href="Web/unam.png">
		<link rel="apple-touch-icon-precomposed" sizes="114x114" href="Web/unam.png">
		<link rel="apple-touch-icon-precomposed" sizes="72x72" href="Web/unam.png">
		<link rel="apple-touch-icon-precomposed" href="Web/unam.png">
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<link rel="stylesheet" href="Web/lightbox.css">
		<link rel="stylesheet" href="Web/estiloTabla.css">
		<link rel="stylesheet" href="Web/conabio.css">
		<!-- <link rel="stylesheet" href="Web/zz_conabio3_files/table.css"> -->
		<!-- <script src="Web/js/jquery-3.2.1.min.js"></script> -->
		<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
		<script src="Web/funcionesMapa.js"></script>
		<script src="Web/menuPlay.js"></script>
		<script src="Web/estilos.js"></script>
		<script async defer src="https://maps.google.com/maps/api/js?v=3.34&key=<?php echo($key); ?>&libraries=drawing,places,geometry&callback=loadMap"></script>
		<!-- <script src="/static/{{ version }}/shortcut.js"></script> -->
		<!-- <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> -->
		<!-- -------------------- -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" href="Web/conabio_custom-add.css">
		<link href="Web/drawer-3.2.2.min.css" rel="stylesheet">
		<link rel="stylesheet" href="Web/conabio_custom.css">
		<link rel="stylesheet" href="Web/accordion.css">
		<link rel="stylesheet" href="https://use.typekit.net/shb5zji.css">
		<script defer src="Web/fontawesome-all.min.js"></script>
		<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css"> -->
		<!-- Para el menu de la izquierda!! -->
		<!--link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"-->
		<!--script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script-->
	</head>
	<body id="wegp_conabio" class="drawer drawer--right">
		<header id="gmHeader"> 		
			<div class="sitename">
				<button type="button" id="sidebarCollapse" class="btn2" type="button">
					<span class="fa-stack fa-rotate-90">
						<i class="fa fa-stop fa-layers fa-stack-1x" style="left: 0.3em;color:#fff;"></i>
						<i class="fa fa-stop fa-layers fa-stack-1x" style="left: 0;"></i>
						<i class="fa fa-stop fa-layers fa-stack-1x" style="left: -.6em;color:#fff;"></i>
						<i class="fa fa-stop fa-layers fa-stack-1x" style="left: -.9em;"></i>
					</span>
				</button>
				<h1>Explorador de cambio climático y biodiversidad</h1>				
				<div class="gmVersion">
				<a href="http://www.biodiversidad.gob.mx/pais/cambio_climatico.html" target="_blank">
					<!--img src="Web/img/conabioHome.png" style="height:100%"/></a-->
					<img src="Web/logoConabioNew.png" style="height:100%" title="Página de inicio" /></a>
					<!-- <object data="Web/img/logo_biodiversidad.svg" type="image/svg+xml">
					</object> -->
				</div>
				<button type="button" class="btn4" data-toggle="modal" data-target="#infoPage"><i data-toggle="tooltip" data-placement="top"class="fas fa-info"></i></button>
			</div>
		</header>
		<div id="mensajePrecarga" class="mensajePrecarga" style="display: table;">
			<div class="">
				<h1 style="color: white;">Bienvenido <br>Espera mientras carga la plataforma</h1>
				<br><h3>Estamos optimizando el sistema para acelerar significativamente la velocidad a la que cargan las capas</h3>
				<!--h1 style="color: white;">Espera mientras cargar la plataforma</h1-->
			</div>
			<div class="fa-3x" style="color: white;"><i class="fas fa-sync fa-spin"></i></div>
		</div>
		<div id="mensajePrecarga2" class="mensajePrecarga" style="display: none;">
			<div class="">
				<h1 style="color: white;">Espera un momento que estamos cargando la capa de municipios</h1>
				<!--h1 style="color: white;">Espera mientras cargar la plataforma</h1-->
			</div>
			<div class="fa-3x" style="color: white;"><i class="fas fa-sync fa-spin"></i></div>
		</div>
		<div id="mensajePrecarga3" class="mensajePrecarga" style="display: none;">
			<div class="">
				<h1 style="color: white;">Espera un momento que estamos cargando la capa de estados</h1>
				<!--h1 style="color: white;">Espera mientras cargar la plataforma</h1-->
			</div>
			<div class="fa-3x" style="color: white;"><i class="fas fa-sync fa-spin"></i></div>
		</div>
		<div id="mensajePrecarga4" class="mensajePrecarga" style="display: none;">
			<div class="">
				<h1 style="color: white;">Graficando municipio, espera un momento</h1>
				<!--h1 style="color: white;">Espera mientras cargar la plataforma</h1-->
			</div>
			<div class="fa-3x" style="color: white;"><i class="fas fa-sync fa-spin"></i></div>
		</div>
		<div id="cajabuscar" class="lightbox">
			<input id='buscar' type='text' class='findPlace' placeholder='Escribe un lugar' autocomplete='on'>
			<input id='go' type='button' onClick='closebox("cajabuscar")' value='Cerrar' class='goPlace'>
			<div class="pac-container pac-logo" style="width: 198px; position: absolute; left: 79px; top: 118px; display: none;"></div>
		</div>
		<div id="uploadKML" class="lightbox">
			<input id='file' type='file' name="kmlkmz" class='findPlace' accept=".kml, .kmz">
			<button id='upload' class="goPlace">Cargar</button>
			<button id='close' class="goPlace" onClick='closebox("uploadKML")'>Cancel</button>
			<div class="pac-container pac-logo" style="width: 198px; position: absolute; left: 79px; top: 118px; display: none;"></div>
		</div>
		<div class="wrapper">
			<nav id="sidebar" style="max-height: 80%;">
				<ul class="list-unstyled components" id="ulSidebar">
					<li id="listaANP" style="background-color: rgba(220, 180, 68, 0.8);">
						<a href="#expanp" data-toggle="collapse" aria-expanded="false">
							Explorar por ANP
						</a>
						<ul class="collapse list-unstyled" id="expanp">
							<li id="anpLayer">
								<form onsubmit="return false" oninput="anpOpacity.value = anpOpacityV.valueAsNumber">
									<a class="hSANP" tabindex="0" onclick="mostrarOcultar()">
										<i class="fas fa-toggle-on"></i>ANP</a>
									<input id="anpOpacityV" class="sliderRange" onchange="changeOpacity(this,'anp')" name="anpOpacityV" type="range" min="0" max="100" default="50" value="50">
									<output for="anpOpacityV" default="50" name="anpOpacity">50</output>
								</form>
							</li>
							<li>
								<a href="#expanpANP" data-toggle="collapse" aria-expanded="false">									
									Buscar por nombre
								</a>
								<ul class="collapse list-unstyled" id="expanpANP">
									<li class="dropdown-input">
										<a href="#"><div tabindex="0" class="dropdown-input">
											<input id="buscarXANP" type="text" style="color:black; width:90%;">
											<i class="fas fa-search search" style="position: relative; left:-25px;"></i>
										</div></a>
									</li>									
								</ul>
							</li>
							<!--li>
								<a href="#expanpEs" data-toggle="collapse" aria-expanded="false">									
									Buscar por estado
								</a>
								<ul class="collapse list-unstyled" id="expanpEs">
									<li class="dropdown-input">
										<a href="#"><div tabindex="0" class="dropdown-input">
											<input id="buscarEstado" type="text" style="color:black; width:90%;">
											<i class="fas fa-search search" style="position: relative; left:-25px;"></i>
										</div></a>
									</li> 
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="1"  class="opcionesEstados"><span>Aguascalientes</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="2"  class="opcionesEstados"><span>Baja California</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="3"  class="opcionesEstados"><span>Baja California Sur</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="4"  class="opcionesEstados"><span>Campeche</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="5"  class="opcionesEstados"><span>Coahuila de Zaragoza</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="6"  class="opcionesEstados"><span>Colima</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="7"  class="opcionesEstados"><span>Chiapas</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="8"  class="opcionesEstados"><span>Chihuahua</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="9"  class="opcionesEstados"><span>Ciudad de México</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="10" class="opcionesEstados"><span>Durango</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="11" class="opcionesEstados"><span>Guanajuato</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="12" class="opcionesEstados"><span>Guerrero</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="13" class="opcionesEstados"><span>Hidalgo</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="14" class="opcionesEstados"><span>Jalisco</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="15" class="opcionesEstados"><span>México</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="16" class="opcionesEstados"><span>Michoacán de Ocampo</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="17" class="opcionesEstados"><span>Morelos</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="18" class="opcionesEstados"><span>Nayarit</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="19" class="opcionesEstados"><span>Nuevo León</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="20" class="opcionesEstados"><span>Oaxaca</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="21" class="opcionesEstados"><span>Puebla</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="22" class="opcionesEstados"><span>Querétaro</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="23" class="opcionesEstados"><span>Quintana Roo</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="24" class="opcionesEstados"><span>San Luis Potosí</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="25" class="opcionesEstados"><span>Sinaloa</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="26" class="opcionesEstados"><span>Sonora</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="27" class="opcionesEstados"><span>Tabasco</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="28" class="opcionesEstados"><span>Tamaulipas</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="29" class="opcionesEstados"><span>Tlaxcala</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="30" class="opcionesEstados"><span>Veracruz de Ignacio de la Llave</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="31" class="opcionesEstados"><span>Yucatán</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this)" data-target="32" class="opcionesEstados"><span>Zacatecas</span></a></li>
								</ul>
							</li-->						
						</ul>
					</li>
					<li id="listaEstados" style="background-color: rgba(220, 180, 68, 0.8);">
						<a href="#expEs" data-toggle="collapse" aria-expanded="false">
							Explorar por estado
						</a>
						<ul class="collapse list-unstyled" id="expEs">
							<li id="estadosLayer">
								<form onsubmit="return false" oninput="entOpacity.value = entOpacityV.valueAsNumber">
									<a class="hSEnt" tabindex="0" onclick="mostrarOcultarEnt()">
										<i class="fas fa-toggle-off"></i>Estados</a>
									<input id="entOpacityV" class="sliderRange" onchange="changeOpacity(this,'ent')" name="entOpacityV" type="range" min="0" max="100" default="50" value="50">
									<output for="entOpacityV" default="50" name="entOpacity">50</output>
								</form>
							</li>
							<li>
								<a href="#expEsEs" data-toggle="collapse" aria-expanded="false">									
									Buscar por estado
								</a>
								<ul class="collapse list-unstyled" id="expEsEs">
									<li class="dropdown-input">
										<a href="#"><div tabindex="0" class="dropdown-input">
											<input id="buscarEstado2" type="text" style="color:black; width:90%;">
											<i class="fas fa-search search" style="position: relative; left:-25px;"></i>
										</div></a>
									</li> 
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="1"  class="opcionesEstados2"><span>Aguascalientes</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="2"  class="opcionesEstados2"><span>Baja California</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="3"  class="opcionesEstados2"><span>Baja California Sur</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="4"  class="opcionesEstados2"><span>Campeche</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="5"  class="opcionesEstados2"><span>Coahuila de Zaragoza</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="6"  class="opcionesEstados2"><span>Colima</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="7"  class="opcionesEstados2"><span>Chiapas</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="8"  class="opcionesEstados2"><span>Chihuahua</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="9"  class="opcionesEstados2"><span>Ciudad de México</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="10" class="opcionesEstados2"><span>Durango</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="11" class="opcionesEstados2"><span>Guanajuato</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="12" class="opcionesEstados2"><span>Guerrero</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="13" class="opcionesEstados2"><span>Hidalgo</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="14" class="opcionesEstados2"><span>Jalisco</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="15" class="opcionesEstados2"><span>México</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="16" class="opcionesEstados2"><span>Michoacán de Ocampo</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="17" class="opcionesEstados2"><span>Morelos</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="18" class="opcionesEstados2"><span>Nayarit</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="19" class="opcionesEstados2"><span>Nuevo León</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="20" class="opcionesEstados2"><span>Oaxaca</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="21" class="opcionesEstados2"><span>Puebla</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="22" class="opcionesEstados2"><span>Querétaro</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="23" class="opcionesEstados2"><span>Quintana Roo</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="24" class="opcionesEstados2"><span>San Luis Potosí</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="25" class="opcionesEstados2"><span>Sinaloa</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="26" class="opcionesEstados2"><span>Sonora</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="27" class="opcionesEstados2"><span>Tabasco</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="28" class="opcionesEstados2"><span>Tamaulipas</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="29" class="opcionesEstados2"><span>Tlaxcala</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="30" class="opcionesEstados2"><span>Veracruz de Ignacio de la Llave</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="31" class="opcionesEstados2"><span>Yucatán</span></a></li>
									<li><a tabindex="0" onclick="buscarANPXEstado(this,true)" data-target="32" class="opcionesEstados2"><span>Zacatecas</span></a></li>
								</ul>
							</li>
							<!--li>
								<form onsubmit="return false" oninput="munOpacity.value = munOpacityV.valueAsNumber">
									<a class="hSMun" tabindex="0" onclick="mostrarOcultarMun();">
										<i class="fas fa-toggle-off"></i>Municipios</a>
									<input id="munOpacityV" class="sliderRange" onchange="changeOpacity(this,'mun')" name="munOpacityV" type="range" min="0" max="100" default="80" value="80">
									<output for="munOpacityV" default="80" name="munOpacity">80</output>
								</form>
							</li>
							<li>
								<a href="#expEsMun" data-toggle="collapse" aria-expanded="false">									
									Buscar por municipio
								</a>
								<ul class="collapse list-unstyled" id="expEsMun">
									<li class="dropdown-input">
										<a href="#"><div tabindex="0" class="dropdown-input">
											<input id="buscarMunicipio" type="text" style="color:black; width:90%;">
											<i class="fas fa-search search" style="position: relative; left:-25px;"></i>
										</div></a>
									</li> 
								</ul>
							</li-->							
						</ul>
					</li>
					<li id="listaMunicipios" style="background-color: rgba(220, 180, 68, 0.8);">
						<a href="#expMun" data-toggle="collapse" aria-expanded="false">
							Explorar por municipio
						</a>
						<ul class="collapse list-unstyled" id="expMun">
							<li>
								<form onsubmit="return false" oninput="munOpacity.value = munOpacityV.valueAsNumber">
									<a class="hSMun" tabindex="0" onclick="mostrarOcultarMun();">
										<i class="fas fa-toggle-off"></i>Municipios</a>
									<input id="munOpacityV" class="sliderRange" onchange="changeOpacity(this,'mun')" name="munOpacityV" type="range" min="0" max="100" default="50" value="50">
									<output for="munOpacityV" default="50" name="munOpacity">50</output>
								</form>
							</li>
							<li>
								<a href="#expEsMun" data-toggle="collapse" aria-expanded="false">									
									Buscar por municipio
								</a>
								<ul class="collapse list-unstyled" id="expEsMun">
									<li class="dropdown-input">
										<a href="#"><div tabindex="0" class="dropdown-input">
											<input id="buscarMunicipio" type="text" style="color:black; width:90%;">
											<i class="fas fa-search search" style="position: relative; left:-25px;"></i>
										</div></a>
									</li> 
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</nav>			
		</div>
		<div class="wrapper">
			<nav id="sidebar2" style="max-height: 80%;">
				Capas activas
			<!--ul class="list-unstyled components">Capas activas</ul-->
			<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"></div>
			</nav>
		</div>
		<div id="map"></div>
		<div id="gmControl">
			<div class="gmPanel abrir">
				<div id="anpLeaf" class="gmPanel-item active" onclick="mostrarOcultar()" data-toggle="tooltip" data-placement="top" title="ANP"> <i class="fa fa-leaf"></i></div>
				<div id="entLeaf" class="gmPanel-item mexico" onclick="mostrarOcultarEnt()" data-toggle="tooltip" data-placement="top" title="Mostrar Estados"></div>
				<div class="gmPanel-item" onclick="dibujar()" data-toggle="tooltip" data-placement="top" title="Dibujar"> <i class="fa fa-edit"></i></div>
				<div class="gmPanel-item" onclick="uploadKML()" data-toggle="tooltip" data-placement="top" title="Subir KML"> <i class="fas fa-upload"></i></div>
				<div class="gmPanel-item regla" onclick="computeDistance()" data-toggle="tooltip" data-placement="top" title="Medir distancia"> <!--i class="fas fa-arrows-alt"></i--></div>
				<div class="gmPanel-item" onclick="reloadPage()" data-toggle="tooltip" data-placement="top" title="Reestablecer todo"> <i class="fa fa-home"></i></div>
				<div class="gmPanel-item2"></div>
				<div id="panel13" class="gmPanel-item mexicoLupa" onclick="zoomMexico()" data-toggle="tooltip" data-placement="top" title="Zoom México"> <!--i class="fas fa-search-plus"></i--></div>		
				<div id="panel1" class="gmPanel-item cuadroLupa" onclick="zoomPoligono()" data-toggle="tooltip" data-placement="top" title="Zoom con polígono"> <!--i class="fas fa-retweet"></i--></div>
				<div id="panel13" class="gmPanel-item" onclick="zoomMas(1)" data-toggle="tooltip" data-placement="top" title="Acercar"> <i id="submenu13" class="fa fa-search-plus"></i></div>		
				<div id="panel1" class="gmPanel-item" onclick="zoomMas(-1)" data-toggle="tooltip" data-placement="top" title="Alejar"> <i id="submenu1" class="fa fa-search-minus"></i></div>
				<div id="panel14" class="gmPanel-item" onclick="openFind()" data-toggle="tooltip" data-placement="top" title="Buscar lugar"> <i id="submenu14" class="fa fa-search"></i></div>
				<div id="panel26" class="gmPanel-item" onclick="getLocation()" data-toggle="tooltip" data-placement="top" title="Ubicación actual"> <i id="submenu26" class="fas fa-map-marker-alt"></i></div>
				<div id="panel24" class="gmPanel-item cuadros" onclick="baseMaps()" data-toggle="tooltip" data-placement="top" title="Mapas base"> <!-- i id="submenu24" class="fas fa-images"></i--></div>
				<div id="panel20" class="gmPanel-item engrane" onclick="panelColor()" data-toggle="tooltip" data-placement="top" title="Cambiar colores del mapa"> <!-- i id="submenu20" class="far fa-sun"></i--></div>
			</div>
		</div>
		<div id="panelDesign">
			<div id="brightness">
				<p>Brillo</p>
				<form onsubmit="return false" oninput="Outputbrightness.value = pointsbrightness.valueAsNumber">
					<input id="pointsbrightness" class="sliderRange" onchange="efectoMap()" name="pointsbrightness" type="range" min="0" max="200" default="100" value="100">
					<output for="pointsbrightness" default="100" name="Outputbrightness">100</output>
				</form>
			</div>
			<div id="contrast">
				<p>Contraste</p>
				<form onsubmit="return false" oninput="Outputcontrast.value = pointscontrast.valueAsNumber">
					<input id="pointscontrast" class="sliderRange" onchange="efectoMap()" name="pointscontrast" type="range" min="0" max="200" default="100" value="100">
					<output for="pointscontrast" default="100" name="Outputcontrast">100</output>
				</form>
			</div>
			<div id="saturate">
				<p>Saturación</p>
				<form onsubmit="return false" oninput="Outputsaturate.value = pointssaturate.valueAsNumber">
					<input id="pointssaturate" class="sliderRange" onchange="efectoMap()" name="pointssaturate" type="range" min="0" max="6" default="1" value="1">
					<output for="pointssaturate" default="1" name="Outputsaturate">1</output>
				</form>
			</div>
			<div id="grayscale">
				<p>Escala de grises</p>
				<form onsubmit="return false" oninput="Outputgrayscale.value = pointsgrayscale.valueAsNumber">			
					<input type="button" class="btn btn-secondary" default="Desactivado" value="Desactivado" id="checkgrayscale" style="visibility:visible">					
					<output class="hidden" for="pointsgrayscale" id="Outputgrayscale" default="0" name="Outputgrayscale">0</output>
				</form>
			</div>
			<div id="invert">
				<p>Invertir</p>
				<form onsubmit="return false" oninput="Outputinvert.value = pointsinvert.valueAsNumber">
					<input type="button" class="btn btn-secondary" default="Desactivado" value="Desactivado" id="checkinvert" style="visibility:visible">					
					<output class="hidden" for="pointsinvert" id="Outputinvert" default="0" name="Outputinvert">0</output>
				</form>
			</div>	
			<div id="reset"> 
				<!--<p></p>-->
				<input type="button" class="btn btn-primary" onclick="defaultMapa()" value="Reestablecer" id="checkreset" style="visibility:visible">
			</div>
		</div>
		<div id="panelBasemaps">
			<div class="basemaps-items">
				<div id="panel01" class="bmaps-item" onclick="setMap(1)"><i class="far fa-circle"></i><span>Satélite</span></div>
				<div id="panel02" class="bmaps-item" onclick="setMap(2)"><i class="fas fa-circle"></i><span>Terreno</span></div>		
				<div id="panel04" class="bmaps-item" onclick="setMap(4)"><i class="far fa-circle"></i><span>Híbrido</span></div>
				<div id="panel03" class="bmaps-item" onclick="setMap(3)"><i class="far fa-circle"></i><span>Carreteras</span></div>
			</div>
		</div>
		<div id="dibujar">
			<div class="basemaps-items">				
				<div class="bmaps-item __7" onclick="setMapa(7)"><i class="far fa-square" data-toggle="tooltip" data-placement="top" title="Rectangulo"></i><span>Rectángulo</span></div>
				<div class="bmaps-item __6" onclick="setMapa(6)"><i class="far fa-bookmark" data-toggle="tooltip" data-placement="top" title="Polígono"></i><span>Polígono</span></div>
				<div class="bmaps-item __5" onclick="setMapa(5);"><i class="far fa-circle" data-toggle="tooltip" data-placement="top" title="Polígono"></i><span>Círculo</span></div>
			</div>
		</div>
		<div id="gmFooter">
			<!-- <div class="activeLayersSH"> -->
				<!-- <a onClick="hideActiveLayers();" data-toggle="tooltip" data-placement="top" title="Mostrar/Ocultar capas"><i class="fas fa-ellipsis-v"></i></a> -->
			<!-- </div> -->
			<div class="gmControlSH">
				<a onClick="hidegmControl();" data-toggle="tooltip" data-placement="top" title="Mostrar/Ocultar herramientas"><i class="fas fa-ellipsis-v"></i></a>
			</div>
			<div class="list-logos">
				<div class="list-logo">
					<a href="https://www.gob.mx/conabio" target="_blank" class="img-logo-thumb"><img src="Web/conabio_ver2_alpha_m.png" class="img-logo-thumb" alt=""></a>
					<img src="Web/conabio_ver2_m.jpg" style="height: 150px !important;" class="img-logo-normal" alt="">
				</div>		
				<div class="list-logo">
					<!--a href="http://www.ib.unam.mx/" target="_blank" class="img-logo-thumb"><img src="/assets_conabio/logos/IB_alpha.png" class="img-logo-thumb" alt=""></a-->
					<a href="http://www.ib.unam.mx/" target="_blank" class="img-logo-thumb"><img src="Web/IB_alpha_m.png" class="img-logo-thumb" alt=""></a>
					<!--img src="/assets_conabio/logos/umam_instituto-biologia.png" class="img-logo-normal" alt=""-->
					<img src="Web/umam_instituto-biologia_m.png" class="img-logo-normal" alt="">
				</div>
				<div class="list-logo">
					<a href="https://www.gob.mx/semarnat" class="img-logo-thumb" target="_blank"><img src="Web/semarnat_ver2_alpha.png" class="img-logo-thumb" alt=""></a>
					<img src="Web/semarnat_ver2.jpg" style="height: 150px !important;" class="img-logo-normal" alt="">
				</div>
				<div class="list-logo">
					<!--a href="https://www.gob.mx/conanp" target="_blank" class="img-logo-thumb"><img src="Web/logos/conanp_ver2_alpha.png" class="img-logo-thumb" alt=""></a-->
					<a href="https://www.gob.mx/conanp" target="_blank" class="img-logo-thumb"><img src="Web/conanp_ver2_alpha_m.png" class="img-logo-thumb" alt=""></a>
					<!--img src="Web/logos/conanp_ver2.jpg" style="height: 150px !important;" class="img-logo-normal" alt=""-->
					<img src="Web/conanp_ver2.jpg" style="height: 150px !important;" class="img-logo-normal" alt="">
				</div>
				<div class="list-logo">
					<a href="https://www.thegef.org" target="_blank" class="img-logo-thumb"><img src="Web/gef_thumb.png" class="img-logo-thumb" alt=""></a>
					<img src="Web/gef.png" class="img-logo-normal" alt="">
				</div>
				<div class="list-logo">
					<a href="https://www.mx.undp.org/content/mexico/es/home/projects/resiliencia---proteger-la-biodiversidad-amenazada-por-el-cambio-.html?fbclid=IwAR1mfBcvpKlV7yFbMFXEBC9FbbBPWcyNkVOlRzgE3mxkK8Xb4KtgOoP3Fic" target="_blank" class="img-logo-thumb"><img src="Web/resiliencia_thumb.png" class="img-logo-thumb" alt=""></a>
					<img src="Web/resiliencia.png" class="img-logo-normal" alt="">
				</div>
				<div class="list-logo">
					<a href="http://www.mx.undp.org" target="_blank" class="img-logo-thumb"><img src="Web/pnud_thumb.png" class="img-logo-thumb" alt=""></a>
					<img src="Web/pnud.png" class="img-logo-normal" alt="">
				</div>
				<div class="list-logo">
					<a href="https://www.gob.mx/inecc" target="_blank" class="img-logo-thumb"><img src="Web/inecc_ver2_alpha.png" class="img-logo-thumb" alt=""></a>
					<img src="Web/inecc_ver2.jpg" style="height: 150px !important;" class="img-logo-normal" alt="">
				</div>
			</div>
		</div>
		<div id="drawer-nav" class="drawer-nav" role="navigation">
			<div class="drawer-wrapper">
				<div class="drawer-sidebar">
					<!--button id="showHide" class="btn drawer-toggle" type="button"><i class="fas fa-bars" data-toggle="tooltip" data-placement="top" title="Mostrar gráficas" onclick="showCambioClimatico();"></i></button-->
					<!--button id="showHide" class="btn" type="button"><i class="fas fa-bars" data-placement="top" onclick="showCambioClimatico();"></i><span>Mostrar Cambio Climático</span></button-->
					<button id="showHide" class="btn" type="button" onclick="showCambioClimatico();"><img src="Web/IW_Clima_futuro_blanco.png" style="width: 25px;"><span>Mostrar Cambio Climático</span></button>
					<!--button id="showHideConectividad" class="btn" type="button" onclick="showConectividad();"><i class="fas fa-adjust" data-placement="top" title="Mostrar conectividad"></i></button-->
					<button id="showHideConectividad" class="btn" type="button" onclick="showConectividad();"><img src="Web/PI_7_IW_conectividad_blanco.svg" style="width: 25px;"><span>Mostrar Conectividad</span></button>
					
					<button type="button" class="btn data-download" onclick="exportaDatos(-1);" data-toggle="tooltip" data-placement="top"><i class="fas fa-download"></i><span>Descargar</span></button>
					<!--button type="button" class="btn" data-toggle="modal" data-target="#infoPage"><i data-toggle="tooltip" data-placement="top"class="fas fa-info"></i><span>Acerca de...</span></button-->
				</div>
				<div class="drawer-main">
					<div class="drawer-content"> 
						<div id="graficasC0" class="gmGraph">
							<div class="graph-data">
								<div class="data-title">Huatulco</div>
								<div id="infoANP0">
								<div class="menuTabla">
									<div class="data-subtitle" id="estabilidadTit0">Exposición al cambio climático</div>
								</div>
								<div class="menuTabla" style="font-size: 15px; text-align: center;">
									<div class="data-sub-sub-title">Proporción de la superficie del área de interés que mantiene las condiciones climáticas actuales (zonas de vida estables) </div>
								</div>
								<div class="menuTabla">
									<div class="sel">
										<select id="estabilidadPER0">
											<option disabled=""  value="-1">Periodo</option>
											<option value="1" selected>2015-2039</option>
											<option value="2">2045-2069</option>
											<option value="3">2075-2099</option>
										</select>
									</div>
									<div class="sel">
										<select  id="estabilidadRCP0">
											<option disabled=""  value="-1">RCP</option>
											<option value="1" selected>RCP 4.5</option>
											<option value="2">RCP 8.5</option>
										</select>
									</div>
								</div>
								<div id="estabilidad0"></div>
								<div class="menuTabla" style="padding-left: 80%; border-bottom: 1px dashed lightgray;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoEst"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
								</div>
								<div class="data-item infoG" id="titmannKendall0" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla" style="font-size: 15px; text-align: center;">
										<div class="data-sub-sub-title">Proporción de superficie terrestre del  área de interés con incremento constante de la temperatura media (rojo)</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
										<!--p style="">RCP</p-->
											<select id="mann0">
												<option disabled=""  value="-1">RCP</option>
												<option value="1" selected>RCP 4.5</option>
												<option value="2">RCP 8.5</option>
											</select>
										</div>
									</div>
									<div id="mannKendall0"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoMann"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
							</div>
								
								<div class="data-subtitle">Cambios proyectados respecto al promedio histórico</div>
								<div class="data-subsubtitle">(intervalo de variación entre los cuatro modelos de circulación global)</div>
								<!--button type="button" class="btn data-download" onclick="exportaDatos(0);" data-toggle="tooltip" data-placement="top" title="Descargar"><i class="fas fa-download"></i></button-->
								<div class="data-item" style="border-bottom: 1px dashed lightgray;">
									<table style="width:100%;">
										<tr>
											<th></th>
											<th style="text-align:center;"><strong>Periodo</strong></th>
											<th style="text-align:center;"><strong>RCP 4.5</strong></th>
											<th style="text-align:center;"><strong>RCP 8.5</strong></th>
										</tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(193, 153, 121);">Temperatura mínima (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="minp1145">xxx</span> , <span class="minp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp1185">xxx</span> , <span class="minp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="minp2145">xxx</span> , <span class="minp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp2185">xxx</span> , <span class="minp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="minp3145">xxx</span> , <span class="minp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp3185">xxx</span> , <span class="minp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(200, 99, 29);">Temperatura media (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="meanp1145">xxx</span> , <span class="meanp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp1185">xxx</span> , <span class="meanp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="meanp2145">xxx</span> , <span class="meanp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp2185">xxx</span> , <span class="meanp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="meanp3145">xxx</span> , <span class="meanp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp3185">xxx</span> , <span class="meanp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(159, 22, 35);">Temperatura máxima (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="maxp1145">xxx</span> , <span class="maxp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp1185">xxx</span> , <span class="maxp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="maxp2145">xxx</span> , <span class="maxp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp2185">xxx</span> , <span class="maxp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="maxp3145">xxx</span> , <span class="maxp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp3185">xxx</span> , <span class="maxp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(11, 119, 190);">Precipitación total(mm)</span><br><span style="color:gray;">(%)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">
												(<span class="precp1145">xxx</span> , <span class="precp1245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp1145">xxx</span> , <span style="color:gray;" class="pprecp1245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp1185">xxx</span> , <span class="precp1285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp1185">xxx</span> , <span style="color:gray;" class="pprecp1285">xxx</span>)
											</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">
												(<span class="precp2145">xxx</span> , <span class="precp2245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp2145">xxx</span> , <span style="color:gray;" class="pprecp2245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp2185">xxx</span> , <span class="precp2285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp2185">xxx</span> , <span style="color:gray;" class="pprecp2285">xxx</span>)
											</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">
												(<span class="precp3145">xxx</span> , <span class="precp3245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp3145">xxx</span> , <span style="color:gray;" class="pprecp3245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp3185">xxx</span> , <span class="precp3285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp3185">xxx</span> , <span style="color:gray;" class="pprecp3285">xxx</span>)
											</td>
										</tr>
									</table>
								</div>
								<div class="data-item infoG" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle">Valores promedio de variables climáticas en el área de interés</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="variableG0">
												<option disabled=""  value="-1">Variable</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(153,8,22); ">Temperatura</option>
												<option value="4" selected="" data-imagesrc="background-image: url('/static/conabio/icons/p3.png');">Mínima (°C)</option>
												<option value="5" data-imagesrc="background-image: url('/static/conabio/icons/p1.png');">Media (°C)</option>
												<option value="3" data-imagesrc="background-image: url('/static/conabio/icons/p2.png');">Máxima (°C)</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(0,113,188); ">Precipitación</option>
												<option value="2" data-imagesrc="background-image: url('/static/conabio/icons/p4.png');">Total (mm)</option>
											</select>
										</div>
										<div class="sel">
											<select id="tiempoG0">
												<option disabled=""  value="-1">Temporada</option>
												<option value="1" selected>Anual</option>
												<option value="2">Ene-feb-mar</option>
												<option value="3">Abr-may-jun</option>
												<option value="4">Jul-ago-sep</option>
												<option value="5">Oct-nov-dic</option>										
											</select>
										</div>
										<div class="sel">
											<select id="forzamientoG0">
												<option disabled=""  value="-1">RCP</option>
												<option value="1" selected>RCP 4.5</option>
												<option value="2">RCP 8.5</option>											
											</select>
										</div>
										<!-- <div class="sel">
											<select id="esta0">
												<option disabled="" style="">Estadística</option>
												<option value="1" selected="">Cambio</option>
												<option value="2">Promedio</option>											
											</select>
										</div> -->
									</div>									
									<div id="newPlot0"></div>
								</div>
								<div class="data-item infoG">
									<div class="menuTabla">
										<div class="data-subtitle">Variación de las variables climáticas en el área de interés</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="variable0" name="variable0">
												<option disabled=""  value="-1">Variable</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(153,8,22); ">Temperatura</option>
												<option value="4" selected data-imagesrc="background-image: url('/static/conabio/icons/p3.png');">Mínima (°C)</option>
												<option value="5" data-imagesrc="background-image: url('/static/conabio/icons/p1.png');">Media (°C)</option>
												<option value="3" data-imagesrc="background-image: url('/static/conabio/icons/p2.png');">Máxima (°C)</option>
												<option disabled=""></option>
												<option disabled=""  style="color:rgb(0,113,188); ">Precipitación</option>
												<option value="2" data-imagesrc="background-image: url('/static/conabio/icons/p4.png');">Total (mm)</option>
											</select>
										</div>
										<div class="sel">
											<select id="tiempo0">
												<option disabled=""  value="-1">Temporada</option>
												<option value="1" selected>Anual</option>
												<option value="2">Ene-feb-mar</option>
												<option value="3">Abr-may-jun</option>
												<option value="4">Jul-ago-sep</option>
												<option value="5">Oct-nov-dic</option>
											</select>
										</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="modelo0">
												<option disabled=""  value="-1">Modelos de circulación global</option>
												<option value="1" selected>CNRMCM5</option>
												<option value="2">GFDL_CM3</option>
												<option value="3">HADGEM2_ES</option>
												<option value="4">MPI_ESM_LR</option>												
											</select>
										</div>										
										<div class="sel">
											<select id="forzamiento0">
												<option disabled=""  value="-1">RCP</option>
												<option value="1" selected>RCP 4.5</option>
												<option value="2">RCP 8.5</option>											
											</select>
										</div>
									</div>								
									<div id="plot0"></div>
								</div>
								<div id="image0" style="display:none;"><img id="jpg-export0" src=""></div>
								<div id="imageN0" style="display:none;"><img id="jpg-exportN0" src=""></div>
								<div id="imageP0" style="display:none;"><img id="jpg-exportP0" src=""></div>
								<div id="imageF0" style="display:none;"><img id="jpg-exportF0" src=""></div>
								<div id="imageT0" style="display:none;"><img id="jpg-exportT0" src=""></div>
								<div id="imageE0" style="display:none;"><img id="jpg-exportE0" src=""></div>
								<div id="imageM0" style="display:none;"><img id="jpg-exportMann0" src=""></div>
							</div>						
						</div>
						<div id="conectividadC0" class="gmGraph">
							<div class="graph-data">
								<!--div class="data-title">Huatulco</div-->
								<div class="data-item infoG " style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle" id="fragTitle0"></div>
									</div>
									<div id="frag0"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoFrag"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								<!--div class="data-item infoG" id="titmannKendall0" style="border-bottom: 1px dashed gray;">
									<div class="menuTabla">
										<div class="data-subtitle">Proporción de la superficie del ANP con <br> incremento constante de la temperatura</div>
									</div>
									<div class="menuTabla" style="display: inherit !important;">
										<div class="sel">
										<p style="">RCP</p>
											<select id="mann0">
												<option value="1" selected>4.5</option>
												<option value="2">8.5</option>
											</select>
										</div>
									</div>
									<div id="mannKendall0"></div>
								</div-->
								<div class="data-item infoG" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle">Tendencia temporal de la conectividad de la vegetación en el área protegida  ante el cambio climático</div>
									</div>
									<!--div class="menuTabla" style="display: inherit !important;"-->
									<div class="menuTabla">
										<div class="sel">
											<!--p style="">Distancia (Km)</p-->
											<select id="distanceT0">
												<option disabled=""  value="-1">Dispersión (Km)</option>
												<option value="2">2</option>
												<option value="10" selected>10</option>
												<option value="30">30</option>
												<option value="100">100</option>
											</select>
										</div>
										
									</div>
									<div id="tendencia0"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoTend"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								<div class="data-item infoG">
									<div class="menuTabla">
										<div class="data-subtitle">Valores de conectividad y cobertura de las áreas <br> protegidas en las ecorregiones terrestres</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<!--p style="">Nivel de Ecorregión</p-->
											<select id="level0">
												<option disabled=""  value="-1">Nivel de ecorregión</option>
												<option value="1" selected>Nivel I</option>
												<option value="2">Nivel II</option>
												<option value="3">Nivel III</option>					
											</select>
										</div>
										
										<div class="sel">
											<!--p style="">Distancia (Km)</p-->
											<select id="distance0">
												<option disabled=""  value="-1">Distancia (Km)</option>
												<option value="2" selected>2</option>
												<option value="10">10</option>
												<option value="30">30</option>
												<option value="100">100</option>	
											</select>
										</div>
										
									</div>
									<div class="menuTabla">
										<div class="data-sub-sub-title" id="titEcoregion0">
											
										</div>
									</div>
									<div id="protConn0"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoProt"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
							</div>
						</div>
						<div id="graficasC1" class="gmGraph">
							<div class="graph-data">
								<div class="data-title">Huatulco</div>
								<div id="infoANP1">
								<div class="menuTabla">
									<div class="data-subtitle">Exposición al cambio climático</div>
								</div>
								<div class="menuTabla" style="font-size: 15px; text-align: center;">
									<div class="data-sub-sub-title">Proporción de la superficie del área de interés que mantiene las condiciones climáticas actuales (zonas de vida estables) </div>
								</div>
								<div class="menuTabla">
									
									<div class="sel">
										<select id="estabilidadPER1">
											<option disabled=""  value="-1">Periodo</option>
											<option value="1" selected>2015-2039</option>
											<option value="2">2045-2069</option>
											<option value="3"="">2075-2099</option>
										</select>
									</div>
									<div class="sel">
										<select id="estabilidadRCP1">
											<option disabled=""  value="-1">RCP</option>
											<option value="1" selected>RCP 4.5</option>
											<option value="2">RCP 8.5</option>
										</select>
									</div>
								</div>
								<div id="estabilidad1"></div>
								<div class="menuTabla" style="padding-left: 80%; border-bottom: 1px dashed lightgray;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoEst"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
								</div>
								<div class="data-item infoG" id="titmannKendall1" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla" style="font-size: 15px; text-align: center;">
										<div class="data-sub-sub-title">Proporción de superficie terrestre del  área de interés con incremento constante de la temperatura media (rojo)</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
										<!--p style="">RCP</p-->
											<select id="mann1">
												<option disabled=""  value="-1">RCP</option>
												<option value="1" selected>RCP 4.5</option>
												<option value="2">RCP 8.5</option>
											</select>
										</div>
									</div>
									<div id="mannKendall1"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoMann"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								</div>
								<div class="data-subtitle">Cambios proyectados respecto al promedio histórico</div>
								<div class="data-subsubtitle">(intervalo de variación entre los cuatro modelos de circulación global)</div>
								<!--button type="button" class="btn data-download" onclick="exportaDatos(0);" data-toggle="tooltip" data-placement="top" title="Descargar"><i class="fas fa-download"></i></button-->
								<div class="data-item" style="border-bottom: 1px dashed lightgray;">
									<table style="width:100%;">
										<tr>
											<th></th>
											<th style="text-align:center;"><strong>Periodo</strong></th>
											<th style="text-align:center;"><strong>RCP 4.5</strong></th>
											<th style="text-align:center;"><strong>RCP 8.5</strong></th>
										</tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(193, 153, 121);">Temperatura mínima (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="minp1145">xxx</span> , <span class="minp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp1185">xxx</span> , <span class="minp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="minp2145">xxx</span> , <span class="minp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp2185">xxx</span> , <span class="minp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="minp3145">xxx</span> , <span class="minp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp3185">xxx</span> , <span class="minp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(200, 99, 29);">Temperatura media (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="meanp1145">xxx</span> , <span class="meanp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp1185">xxx</span> , <span class="meanp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="meanp2145">xxx</span> , <span class="meanp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp2185">xxx</span> , <span class="meanp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="meanp3145">xxx</span> , <span class="meanp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp3185">xxx</span> , <span class="meanp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(159, 22, 35);">Temperatura máxima (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="maxp1145">xxx</span> , <span class="maxp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp1185">xxx</span> , <span class="maxp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="maxp2145">xxx</span> , <span class="maxp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp2185">xxx</span> , <span class="maxp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="maxp3145">xxx</span> , <span class="maxp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp3185">xxx</span> , <span class="maxp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(11, 119, 190);">Precipitación total(mm)</span><br><span style="color:gray;">(%)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">
												(<span class="precp1145">xxx</span> , <span class="precp1245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp1145">xxx</span> , <span style="color:gray;" class="pprecp1245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp1185">xxx</span> , <span class="precp1285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp1185">xxx</span> , <span style="color:gray;" class="pprecp1285">xxx</span>)
											</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">
												(<span class="precp2145">xxx</span> , <span class="precp2245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp2145">xxx</span> , <span style="color:gray;" class="pprecp2245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp2185">xxx</span> , <span class="precp2285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp2185">xxx</span> , <span style="color:gray;" class="pprecp2285">xxx</span>)
											</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">
												(<span class="precp3145">xxx</span> , <span class="precp3245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp3145">xxx</span> , <span style="color:gray;" class="pprecp3245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp3185">xxx</span> , <span class="precp3285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp3185">xxx</span> , <span style="color:gray;" class="pprecp3285">xxx</span>)
											</td>
										</tr>
									</table>
								</div>
								<div class="data-item infoG" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle">Valores promedio de variables climáticas en el área de interés</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="variableG1">
												<option disabled="" style="">Variable</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(153,8,22); ">Temperatura</option>
												<option value="4" selected="" data-imagesrc="background-image: url('/static/conabio/icons/p3.png');">Mínima (°C)</option>
												<option value="5" data-imagesrc="background-image: url('/static/conabio/icons/p1.png');">Media (°C)</option>
												<option value="3" data-imagesrc="background-image: url('/static/conabio/icons/p2.png');">Máxima (°C)</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(0,113,188); ">Precipitación</option>
												<option value="2" data-imagesrc="background-image: url('/static/conabio/icons/p4.png');">Total (mm)</option>
											</select>
										</div>
										<div class="sel">
											<select id="tiempoG1">
												<option disabled="" style="">Temporada</option>
												<option value="1" selected="">Anual</option>
												<option value="2">Ene-feb-mar</option>
												<option value="3">Abr-may-jun</option>
												<option value="4">Jul-ago-sep</option>
												<option value="5">Oct-nov-dic</option>										
											</select>
										</div>
										<div class="sel">
											<select id="forzamientoG1">
												<option disabled="" style="">RCP</option>
												<option value="1" selected="">RCP 4.5</option>
												<option value="2">RCP 8.5</option>											
											</select>
										</div>
										<!-- <div class="sel">
											<select id="esta1">
												<option disabled="" style="">Estadística</option>
												<option value="1" selected="">Cambio</option>
												<option value="2">Promedio</option>											
											</select>
										</div> -->
									</div>									
									<div id="newPlot1"></div>
								</div>
								<div class="data-item infoG">
									<div class="menuTabla">
										<div class="data-subtitle">Variación de las variables climáticas en el área de interés</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="variable1" name="variable1">
												<option disabled="" style="">Variable</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(153,8,22); ">Temperatura</option>
												<option value="4" data-imagesrc="background-image: url('/static/conabio/icons/p3.png');">Mínima (°C)</option>
												<option value="5" data-imagesrc="background-image: url('/static/conabio/icons/p1.png');">Media (°C)</option>
												<option value="3" data-imagesrc="background-image: url('/static/conabio/icons/p2.png');">Máxima (°C)</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(0,113,188); ">Precipitación</option>
												<option value="2" selected="" data-imagesrc="background-image: url('/static/conabio/icons/p4.png');">Total (mm)</option>
											</select>
										</div>
										<div class="sel">
											<select id="tiempo1">
												<option disabled="" style="">Temporada</option>
												<option value="1" selected="">Anual</option>
												<option value="2">Ene-feb-mar</option>
												<option value="3">Abr-may-jun</option>
												<option value="4">Jul-ago-sep</option>
												<option value="5">Oct-nov-dic</option>
											</select>
										</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="modelo1">
												<option disabled="" style="">Modelos de circulación global</option>
												<option value="1" selected="">CNRMCM5</option>
												<option value="2">GFDL_CM3</option>
												<option value="3">HADGEM2_ES</option>
												<option value="4">MPI_ESM_LR</option>												
											</select>
										</div>										
										<div class="sel">
											<select id="forzamiento1">
												<option disabled="" style="">RCP</option>
												<option value="1" selected="">RCP 4.5</option>
												<option value="2">RCP 8.5</option>											
											</select>
										</div>
									</div>								
									<div id="plot1"></div>
								</div>
								<div id="image1" style="display:none;"><img id="jpg-export1" src=""></div>
								<div id="imageN1" style="display:none;"><img id="jpg-exportN1" src=""></div>
								<div id="imageP1" style="display:none;"><img id="jpg-exportP1" src=""></div>
								<div id="imageF1" style="display:none;"><img id="jpg-exportF1" src=""></div>
								<div id="imageT1" style="display:none;"><img id="jpg-exportT1" src=""></div>
								<div id="imageE1" style="display:none;"><img id="jpg-exportE1" src=""></div>
								<div id="imageM1" style="display:none;"><img id="jpg-exportMann1" src=""></div>
							</div>						
						</div>
						<div id="conectividadC1" class="gmGraph">
							<div class="graph-data">
								<div class="data-item infoG" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle" id="fragTitle1"></div>
									</div>
									<div id="frag1"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoFrag"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								<!--div class="data-item infoG" id="titmannKendall1" style="border-bottom: 1px dashed gray;">
									<div class="menuTabla">
										<div class="data-subtitle">Proporción de la superficie del ANP con <br> incremento constante de la temperatura</div>
									</div>
									<div class="menuTabla" style="display: inherit !important;">
										<div class="sel">
										<p style="">RCP</p>
											<select id="mann1">
												<option value="1" selected>4.5</option>
												<option value="2">8.5</option>
											</select>
										</div>
									</div>
									<div id="mannKendall1"></div>
								</div-->
								<div class="data-item infoG" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle">Tendencia temporal de conectividad de la vegetación en el área protegida  ante el cambio climático</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<!--p style="">Distancia (Km)</p-->
											<select id="distanceT1">
												<option disabled=""  value="-1">Distancia (Km)</option>
												<option value="2">2</option>
												<option value="10" selected>10</option>
												<option value="30">30</option>
												<option value="100">100</option>
											</select>
										</div>
										
									</div>
									<div id="tendencia1"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoTend"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								<div class="data-item infoG">
									<div class="menuTabla">
										<div class="data-subtitle">Valores de conectividad y cobertura de las áreas <br> protegidas en las ecorregiones terrestres</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<!--p style="">Nivel de Ecorregión</p-->
											<select id="level1">
												<option disabled=""  value="-1">Nivel de ecorregión</option>
												<option value="1" selected>Nivel I</option>
												<option value="2">Nivel II</option>
												<option value="3">Nivel III</option>												
											</select>
										</div>
										<div class="sel">
											<!--p style="">Distancia (Km)</p-->
											<select id="distance1">
												<option disabled=""  value="-1">Distancia (Km)</option>
												<option value="2" selected>2</option>
												<option value="10">10</option>
												<option value="30">30</option>
												<option value="100">100</option>									
											</select>
										</div>
									</div>
									<div class="menuTabla">
										<div class="data-sub-sub-title" id="titEcoregion1">
											
										</div>
									</div>
									<div id="protConn1"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoProt"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
							</div>
						</div>
						<div id="graficasC2" class="gmGraph">
							<div class="graph-data">
								<div class="data-title">Huatulco</div>
								<div id="infoANP2">
								<div class="menuTabla">
									<div class="data-subtitle">Exposición al cambio climático</div>
								</div>
								<div class="menuTabla" style="font-size: 15px; text-align: center;">
									<div class="data-sub-sub-title">Proporción de la superficie del área de interés que mantiene las condiciones climáticas actuales (zonas de vida estables) </div>
								</div>
								<div class="menuTabla">
									
									<div class="sel">
										<select id="estabilidadPER2">
											<option disabled=""  value="-1">Periodo</option>
											<option value="1" selected>2015-2039</option>
											<option value="2">2045-2069</option>
											<option value="3"="">2075-2099</option>
										</select>
									</div>
									<div class="sel">
										<select id="estabilidadRCP2">
											<option disabled=""  value="-1">RCP</option>
											<option value="1" selected>RCP 4.5</option>
											<option value="2">RCP 8.5</option>
										</select>
									</div>
								</div>
								<div id="estabilidad2"></div>
								<div class="menuTabla" style="padding-left: 80%; border-bottom: 1px dashed lightgray;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoEst"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
								</div>
								<div class="data-item infoG" id="titmannKendall2" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla" style="font-size: 15px; text-align: center;">
										<div class="data-sub-sub-title">Proporción de superficie terrestre del  área de interés con incremento constante de la temperatura media (rojo)</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
										<!--p style="">RCP</p-->
											<select id="mann2">
												<option disabled=""  value="-1">RCP</option>
												<option value="1" selected>RCP 4.5</option>
												<option value="2">RCP 8.5</option>
											</select>
										</div>
									</div>
									<div id="mannKendall2"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoMann"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								</div>
								<div class="data-subtitle">Cambios proyectados respecto al promedio histórico</div>
								<div class="data-subsubtitle">(intervalo de variación entre los cuatro modelos de circulación global)</div>
								<!--button type="button" class="btn data-download" onclick="exportaDatos(0);" data-toggle="tooltip" data-placement="top" title="Descargar"><i class="fas fa-download"></i></button-->
								<div class="data-item"  style="border-bottom: 1px dashed lightgray;">
									<table style="width:100%;">
										<tr>
											<th></th>
											<th style="text-align:center;"><strong>Periodo</strong></th>
											<th style="text-align:center;"><strong>RCP 4.5</strong></th>
											<th style="text-align:center;"><strong>RCP 8.5</strong></th>
										</tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(193, 153, 121);">Temperatura mínima (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="minp1145">xxx</span> , <span class="minp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp1185">xxx</span> , <span class="minp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="minp2145">xxx</span> , <span class="minp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp2185">xxx</span> , <span class="minp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="minp3145">xxx</span> , <span class="minp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp3185">xxx</span> , <span class="minp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(200, 99, 29);">Temperatura media (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="meanp1145">xxx</span> , <span class="meanp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp1185">xxx</span> , <span class="meanp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="meanp2145">xxx</span> , <span class="meanp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp2185">xxx</span> , <span class="meanp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="meanp3145">xxx</span> , <span class="meanp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp3185">xxx</span> , <span class="meanp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(159, 22, 35);">Temperatura máxima (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="maxp1145">xxx</span> , <span class="maxp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp1185">xxx</span> , <span class="maxp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="maxp2145">xxx</span> , <span class="maxp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp2185">xxx</span> , <span class="maxp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="maxp3145">xxx</span> , <span class="maxp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp3185">xxx</span> , <span class="maxp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(11, 119, 190);">Precipitación total(mm)</span><br><span style="color:gray;">(%)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">
												(<span class="precp1145">xxx</span> , <span class="precp1245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp1145">xxx</span> , <span style="color:gray;" class="pprecp1245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp1185">xxx</span> , <span class="precp1285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp1185">xxx</span> , <span style="color:gray;" class="pprecp1285">xxx</span>)
											</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">
												(<span class="precp2145">xxx</span> , <span class="precp2245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp2145">xxx</span> , <span style="color:gray;" class="pprecp2245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp2185">xxx</span> , <span class="precp2285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp2185">xxx</span> , <span style="color:gray;" class="pprecp2285">xxx</span>)
											</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">
												(<span class="precp3145">xxx</span> , <span class="precp3245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp3145">xxx</span> , <span style="color:gray;" class="pprecp3245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp3185">xxx</span> , <span class="precp3285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp3185">xxx</span> , <span style="color:gray;" class="pprecp3285">xxx</span>)
											</td>
										</tr>
									</table>
								</div>
								<div class="data-item infoG"  style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle">Valores promedio de variables climáticas en el área de interés</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="variableG2">
												<option disabled="" style="">Variable</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(153,8,22); ">Temperatura</option>
												<option value="4" selected="" data-imagesrc="background-image: url('/static/conabio/icons/p3.png');">Mínima (°C)</option>
												<option value="5" data-imagesrc="background-image: url('/static/conabio/icons/p1.png');">Media (°C)</option>
												<option value="3" data-imagesrc="background-image: url('/static/conabio/icons/p2.png');">Máxima (°C)</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(0,113,188); ">Precipitación</option>
												<option value="2" data-imagesrc="background-image: url('/static/conabio/icons/p4.png');">Total (mm)</option>
											</select>
										</div>
										<div class="sel">
											<select id="tiempoG2">
												<option disabled="" style="">Temporada</option>
												<option value="1" selected="">Anual</option>
												<option value="2">Ene-feb-mar</option>
												<option value="3">Abr-may-jun</option>
												<option value="4">Jul-ago-sep</option>
												<option value="5">Oct-nov-dic</option>										
											</select>
										</div>
										<div class="sel">
											<select id="forzamientoG2">
												<option disabled="" style="">RCP</option>
												<option value="1" selected="">RCP 4.5</option>
												<option value="2">RCP 8.5</option>											
											</select>
										</div>
										<!-- <div class="sel">
											<select id="esta2">
												<option disabled="" style="">Estadística</option>
												<option value="1" selected="">Cambio</option>
												<option value="2">Promedio</option>											
											</select>
										</div> -->
									</div>									
									<div id="newPlot2"></div>
								</div>
								<div class="data-item infoG">
									<div class="menuTabla">
										<div class="data-subtitle">Variación de las variables climáticas en el área de interés</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="variable2" name="variable2">
												<option disabled="" style="">Variable</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(153,8,22); ">Temperatura</option>
												<option value="4" data-imagesrc="background-image: url('/static/conabio/icons/p3.png');">Mínima (°C)</option>
												<option value="5" data-imagesrc="background-image: url('/static/conabio/icons/p1.png');">Media (°C)</option>
												<option value="3" data-imagesrc="background-image: url('/static/conabio/icons/p2.png');">Máxima (°C)</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(0,113,188); ">Precipitación</option>
												<option value="2" selected="" data-imagesrc="background-image: url('/static/conabio/icons/p4.png');">Total (mm)</option>
											</select>
										</div>
										<div class="sel">
											<select id="tiempo2">
												<option disabled="" style="">Temporada</option>
												<option value="1" selected="">Anual</option>
												<option value="2">Ene-feb-mar</option>
												<option value="3">Abr-may-jun</option>
												<option value="4">Jul-ago-sep</option>
												<option value="5">Oct-nov-dic</option>
											</select>
										</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="modelo2">
												<option disabled="" style="">Modelos de circulación global</option>
												<option value="1" selected="">CNRMCM5</option>
												<option value="2">GFDL_CM3</option>
												<option value="3">HADGEM2_ES</option>
												<option value="4">MPI_ESM_LR</option>												
											</select>
										</div>										
										<div class="sel">
											<select id="forzamiento2">
												<option disabled="" style="">RCP</option>
												<option value="1" selected="">RCP 4.5</option>
												<option value="2">RCP 8.5</option>											
											</select>
										</div>
									</div>								
									<div id="plot2"></div>
								</div>
																								
								<div id="image2" style="display:none;"><img id="jpg-export2" src=""></div>
								<div id="imageN2" style="display:none;"><img id="jpg-exportN2" src=""></div>
								<div id="imageP2" style="display:none;"><img id="jpg-exportP2" src=""></div>
								<div id="imageF2" style="display:none;"><img id="jpg-exportF2" src=""></div>
								<div id="imageT2" style="display:none;"><img id="jpg-exportT2" src=""></div>
								<div id="imageE2" style="display:none;"><img id="jpg-exportE2" src=""></div>
								<div id="imageM2" style="display:none;"><img id="jpg-exportMann2" src=""></div>
							</div>						
						</div>
						<div id="conectividadC2" class="gmGraph">
							<div class="graph-data">
								<div class="data-item infoG" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle" id="fragTitle2"></div>
									</div>
									<div id="frag2"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoFrag"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								<!--div class="data-item infoG" id="titmannKendall2" style="border-bottom: 1px dashed gray;">
									<div class="menuTabla">
										<div class="data-subtitle">Proporción de la superficie del ANP con <br> incremento constante de la temperatura</div>
									</div>
									<div class="menuTabla" style="display: inherit !important;">
										<div class="sel">
										<p style="">RCP</p>
											<select id="mann2">
												<option value="1" selected>4.5</option>
												<option value="2">8.5</option>
											</select>
										</div>
									</div>
									<div id="mannKendall2"></div>
								</div-->
								<div class="data-item infoG" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle">Tendencia temporal de conectividad de la vegetación en el área protegida  ante el cambio climático</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<!--p style="">Distancia (Km)</p-->
											<select id="distanceT2">
												<option disabled=""  value="-1">Distancia (Km)</option>
												<option value="2">2</option>
												<option value="10" selected>10</option>
												<option value="30">30</option>
												<option value="100">100</option>
											</select>
										</div>
										
									</div>
									<div id="tendencia2"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoTend"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								<div class="data-item infoG">
									<div class="menuTabla">
										<div class="data-subtitle">Valores de conectividad y cobertura de las áreas <br> protegidas en las ecorregiones terrestres</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<!--p style="">Nivel de Ecorregión</p-->
											<select id="level2">
												<option disabled=""  value="-1">Nivel de ecorregión</option>
												<option value="1" selected>Nivel I</option>
												<option value="2">Nivel II</option>
												<option value="3">Nivel III</option>												
											</select>
										</div>
										<div class="sel">
											<!--p style="">Distancia (Km)</p-->
											<select id="distance2">
												<option disabled=""  value="-1">Distancia (Km)</option>
												<option value="2" selected>2</option>
												<option value="10">10</option>
												<option value="30">30</option>
												<option value="100">100</option>								
											</select>
										</div>
									</div>
									<div class="menuTabla">
										<div class="data-sub-sub-title" id="titEcoregion2">
											
										</div>
									</div>
									<div id="protConn2"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoProt"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
							</div>
						</div>
						<div id="graficasC3" class="gmGraph">
							<div class="graph-data">
								<div class="data-title">Huatulco</div>
								<div id="infoANP3">
								<div class="menuTabla">
									<div class="data-subtitle">Exposición al cambio climático</div>
								</div>
								<div class="menuTabla" style="font-size: 15px; text-align: center;">
									<div class="data-sub-sub-title">Proporción de la superficie del área de interés que mantiene las condiciones climáticas actuales (zonas de vida estables) </div>
								</div>
								<div class="menuTabla">
									
									<div class="sel">
										<select  id="estabilidadPER3">
											<option disabled=""  value="-1">Periodo</option>
											<option value="1" selected>2015-2039</option>
											<option value="2">2045-2069</option>
											<option value="3">2075-2099</option>
										</select>
									</div>
									<div class="sel">
										<select id="estabilidadRCP3">
											<option disabled=""  value="-1">RCP</option>
											<option value="1" selected>RCP 4.5</option>
											<option value="2">RCP 8.5</option>
										</select>
									</div>
								</div>
								<div id="estabilidad3"></div>
								<div class="menuTabla" style="padding-left: 80%; border-bottom: 1px dashed lightgray;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoEst"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
								</div>
								<div class="data-item infoG" id="titmannKendall3" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla" style="font-size: 15px; text-align: center;">
										<div class="data-sub-sub-title">Proporción de superficie terrestre del  área de interés con incremento constante de la temperatura media (rojo)</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
										<!--p style="">RCP</p-->
											<select id="mann3">
												<option disabled=""  value="-1">RCP</option>
												<option value="1" selected>RCP 4.5</option>
												<option value="2">RCP 8.5</option>
											</select>
										</div>
									</div>
									<div id="mannKendall3"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoMann"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								</div>
								<div class="data-subtitle">Cambios proyectados respecto al promedio histórico</div>
								<div class="data-subsubtitle">(intervalo de variación entre los cuatro modelos de circulación global)</div>
								<!--button type="button" class="btn data-download" onclick="exportaDatos(0);" data-toggle="tooltip" data-placement="top" title="Descargar"><i class="fas fa-download"></i></button-->
								<div class="data-item" style="border-bottom: 1px dashed lightgray;">
									<table style="width:100%;">
										<tr>
											<th></th>
											<th style="text-align:center;"><strong>Periodo</strong></th>
											<th style="text-align:center;"><strong>RCP 4.5</strong></th>
											<th style="text-align:center;"><strong>RCP 8.5</strong></th>
										</tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(193, 153, 121);">Temperatura mínima (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="minp1145">xxx</span> , <span class="minp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp1185">xxx</span> , <span class="minp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="minp2145">xxx</span> , <span class="minp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp2185">xxx</span> , <span class="minp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="minp3145">xxx</span> , <span class="minp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="minp3185">xxx</span> , <span class="minp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(200, 99, 29);">Temperatura media (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="meanp1145">xxx</span> , <span class="meanp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp1185">xxx</span> , <span class="meanp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="meanp2145">xxx</span> , <span class="meanp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp2185">xxx</span> , <span class="meanp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="meanp3145">xxx</span> , <span class="meanp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="meanp3185">xxx</span> , <span class="meanp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(159, 22, 35);">Temperatura máxima (&deg;C)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">(<span class="maxp1145">xxx</span> , <span class="maxp1245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp1185">xxx</span> , <span class="maxp1285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">(<span class="maxp2145">xxx</span> , <span class="maxp2245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp2185">xxx</span> , <span class="maxp2285">xxx</span>)</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">(<span class="maxp3145">xxx</span> , <span class="maxp3245">xxx</span>)</td>
											<td class="border-left-table">(<span class="maxp3185">xxx</span> , <span class="maxp3285">xxx</span>)</td>
										</tr>
										<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
										<tr>
											<td rowspan="3" style="vertical-align:middle; text-align:right;"><span style="color:rgb(11, 119, 190);">Precipitación total(mm)</span><br><span style="color:gray;">(%)</span></td>
											<td class="border-left-table">2015 - 2039</td>
											<td class="border-left-table">
												(<span class="precp1145">xxx</span> , <span class="precp1245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp1145">xxx</span> , <span style="color:gray;" class="pprecp1245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp1185">xxx</span> , <span class="precp1285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp1185">xxx</span> , <span style="color:gray;" class="pprecp1285">xxx</span>)
											</td>
										</tr>
										<tr>											
											<td class="border-left-table">2045 - 2069</td>
											<td class="border-left-table">
												(<span class="precp2145">xxx</span> , <span class="precp2245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp2145">xxx</span> , <span style="color:gray;" class="pprecp2245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp2185">xxx</span> , <span class="precp2285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp2185">xxx</span> , <span style="color:gray;" class="pprecp2285">xxx</span>)
											</td>
										</tr>
										<tr>											
											<td class="border-left-table">2075 - 2099</td>
											<td class="border-left-table">
												(<span class="precp3145">xxx</span> , <span class="precp3245">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp3145">xxx</span> , <span style="color:gray;" class="pprecp3245">xxx</span>)
											</td>
											<td class="border-left-table">
												(<span class="precp3185">xxx</span> , <span class="precp3285">xxx</span>)<br>
												(<span style="color:gray;" class="pprecp3185">xxx</span> , <span style="color:gray;" class="pprecp3285">xxx</span>)
											</td>
										</tr>
									</table>
								</div>
								<div class="data-item infoG"  style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle">Valores promedio de variables climáticas en el área de interés</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="variableG3">
												<option disabled="" style="">Variable</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(153,8,22); ">Temperatura</option>
												<option value="4" selected="" data-imagesrc="background-image: url('/static/conabio/icons/p3.png');">Mínima (°C)</option>
												<option value="5" data-imagesrc="background-image: url('/static/conabio/icons/p1.png');">Media (°C)</option>
												<option value="3" data-imagesrc="background-image: url('/static/conabio/icons/p2.png');">Máxima (°C)</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(0,113,188); ">Precipitación</option>
												<option value="2" data-imagesrc="background-image: url('/static/conabio/icons/p4.png');">Total (mm)</option>
											</select>
										</div>
										<div class="sel">
											<select id="tiempoG3">
												<option disabled="" style="">Temporada</option>
												<option value="1" selected="">Anual</option>
												<option value="2">Ene-feb-mar</option>
												<option value="3">Abr-may-jun</option>
												<option value="4">Jul-ago-sep</option>
												<option value="5">Oct-nov-dic</option>										
											</select>
										</div>
										<div class="sel">
											<select id="forzamientoG3">
												<option disabled="" style="">RCP</option>
												<option value="1" selected="">RCP 4.5</option>
												<option value="2">RCP 8.5</option>											
											</select>
										</div>
										<!-- <div class="sel">
											<select id="esta3">
												<option disabled="" style="">Estadística</option>
												<option value="1" selected="">Cambio</option>
												<option value="2">Promedio</option>											
											</select>
										</div> -->
									</div>									
									<div id="newPlot3"></div>
								</div>
								<div class="data-item infoG">
									<div class="menuTabla">
										<div class="data-subtitle">Variación de las variables climáticas en el área de interés</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="variable3" name="variable3">
												<option disabled="" style="">Variable</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(153,8,22); ">Temperatura</option>
												<option value="4" data-imagesrc="background-image: url('/static/conabio/icons/p3.png');">Mínima (°C)</option>
												<option value="5" data-imagesrc="background-image: url('/static/conabio/icons/p1.png');">Media (°C)</option>
												<option value="3" data-imagesrc="background-image: url('/static/conabio/icons/p2.png');">Máxima (°C)</option>
												<option disabled=""></option>
												<option disabled="" style="color:rgb(0,113,188); ">Precipitación</option>
												<option value="2" selected="" data-imagesrc="background-image: url('/static/conabio/icons/p4.png');">Total (mm)</option>
											</select>
										</div>
										<div class="sel">
											<select id="tiempo3">
												<option disabled="" style="">Temporada</option>
												<option value="1" selected="">Anual</option>
												<option value="2">Ene-feb-mar</option>
												<option value="3">Abr-may-jun</option>
												<option value="4">Jul-ago-sep</option>
												<option value="5">Oct-nov-dic</option>
											</select>
										</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<select id="modelo3">
												<option disabled="" style="">Modelos de circulación global</option>
												<option value="1" selected="">CNRMCM5</option>
												<option value="2">GFDL_CM3</option>
												<option value="3">HADGEM2_ES</option>
												<option value="4">MPI_ESM_LR</option>												
											</select>
										</div>										
										<div class="sel">
											<select id="forzamiento3">
												<option disabled="" style="">RCP</option>
												<option value="1" selected="">RCP 4.5</option>
												<option value="2">RCP 8.5</option>											
											</select>
										</div>
									</div>								
									<div id="plot3"></div>
								</div>
															
								<div id="image3" style="display:none;"><img id="jpg-export3" src=""></div>
								<div id="imageN3" style="display:none;"><img id="jpg-exportN3" src=""></div>
								<div id="imageP3" style="display:none;"><img id="jpg-exportP3" src=""></div>
								<div id="imageF3" style="display:none;"><img id="jpg-exportF3" src=""></div>
								<div id="imageT3" style="display:none;"><img id="jpg-exportT3" src=""></div>
								<div id="imageE3" style="display:none;"><img id="jpg-exportE3" src=""></div>
								<div id="imageM3" style="display:none;"><img id="jpg-exportMann3" src=""></div>
							</div>						
						</div>
						<div id="conectividadC3" class="gmGraph">
							<div class="graph-data">
								<div class="data-item infoG" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle" id="fragTitle3"></div>
									</div>
									<div id="frag3"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoFrag"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								<!--div class="data-item infoG" id="titmannKendall3" style="border-bottom: 1px dashed gray;">
									<div class="menuTabla">
										<div class="data-subtitle">Proporción de la superficie del ANP con <br> incremento constante de la temperatura</div>
									</div>
									<div class="menuTabla" style="display: inherit !important;">
										<div class="sel">
										<p style="">RCP</p>
											<select id="mann3">
												<option value="1" selected>4.5</option>
												<option value="2">8.5</option>
											</select>
										</div>
									</div>
									<div id="mannKendall3"></div>
								</div-->
								<div class="data-item infoG" style="border-bottom: 1px dashed lightgray;">
									<div class="menuTabla">
										<div class="data-subtitle">Tendencia temporal de conectividad de la vegetación en el área protegida  ante el cambio climático</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<!--p style="">Distancia (Km)</p-->
											<select id="distanceT3">
												<option disabled=""  value="-1">Distancia (Km)</option>
												<option value="2">2</option>
												<option value="10" selected>10</option>
												<option value="30">30</option>
												<option value="100">100</option>
											</select>
										</div>
										
									</div>
									<div id="tendencia3"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoTend"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
								<div class="data-item infoG">
									<div class="menuTabla">
										<div class="data-subtitle">Valores de conectividad y cobertura de las áreas <br> protegidas en las ecorregiones terrestres</div>
									</div>
									<div class="menuTabla">
										<div class="sel">
											<!--p style="">Nivel de Ecorregión</p-->
											<select id="level3">
												<option disabled=""  value="-1">Nivel de ecorregión</option>
												<option value="1" selected>Nivel I</option>
												<option value="2">Nivel II</option>
												<option value="3">Nivel III</option>

											</select>
										</div>
										<div class="sel">
											<!--p style="">Distancia (Km)</p-->
											<select id="distance3">
												<option disabled=""  value="-1">Distancia (Km)</option>
												<option value="2" selected>2</option>
												<option value="10">10</option>
												<option value="30">30</option>
												<option value="100">100</option>								
											</select>
										</div>
									</div>
									<div class="menuTabla">
										<div class="data-sub-sub-title" id="titEcoregion3">
											
										</div>
									</div>
									<div id="protConn3"></div>
									<div class="menuTabla" style="padding-left: 80%;">
										<button type="button" class="btn3" data-toggle="modal" data-target="#infoProt"><i data-toggle="tooltip" data-placement="top" title="Información adicional" class="fas fa-info"></i></button>	
									</div>
								</div>
							</div>
						</div>						
					</div>
					
					<div class="xtc-overlay fa-3x" id="cortina">
						<div id="mensajeInicial" style="line-height:0.8;">
							<small style="font-size:55%;">Este panel despliega los resultados para el área de interés seleccionada por el usuario (ANP, estados, polígonos propios o archivos de Google Earth). Debe seleccionar primero un área de interés.<small>
						</div>
						<i class="fas fa-sync fa-spin"></i>
					</div>
				</div>
			</div>		
		</div>
		<div id="infoOfLayer" class="xtc-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true" style="display: none;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">Explorador de Cambio Climático y Biodiversidad</h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-window-close"></i></button>
					</div>
					<div id="contenidoBox" class="modal-body">
						<table>
							<tbody>
								<!-- <tr>
									<td>Nombre</td>
									<td><div class="nombre"></div></td>
								</tr> -->
								<tr>
									<td>Descripción</td>
									<td><div class="descripcion"></div></td>
								</tr>
								<tr>
									<td>Unidades</td>
									<td>
										<div>
											<div>										
												<div>
													<div class="color-gradient"></div>
													<div class="color-minmax" style="display:inline;"></div> <div class="unidad" style="display:inline;"></div>
												</div>
											</div>
										</div>
										<div class="listaColores">
											
										</div>
									</td>
								</tr>
							</tbody>
						</table>				
					</div>
				</div>
			</div>
		</div>
		<div id="infoFrag" class="xtc-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true" style="display: none;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">Explorador de Cambio Climático y Biodiversidad</h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-window-close"></i></button>
					</div>
					<div id="" class="modal-body">
						<div style="width: 95%;"><img src="Web/zonaFragmentacion2.png">
							<br><br><br><p class="data-sub-sub-title" style="text-align: justify; font-size: initial; color: black;">
										El índice mide el grado de fragmentación de la vegetación primaria y secundaria arbórea y considera el impacto generado por el cambio de uso del suelo. La fragmentación se expresa en porcentaje y su valor será mayor si existen más barreras como carreteras, áreas urbanas o tierras agrícolas, que puedan dificultar el movimiento de organismos entre fragmentos de vegetación. El índice se calculó para los polígonos de cada una de las  área protegidas y para sus zonas de influencia de hasta 10 km (dependiendo de su límite con las costas). La figura inicial, sirve para ejemplificar como se ve un paisaje con un valor bajo o alto del índice de fragmentación. Así, por ejemplo, si algún área protegida  tiene un valor del índice igual a 0%, su vegetación no estaría fragmentada (i.e. se trata de un solo polígono), mientras que un área protegida con un valor superior a 90% indica un gran número de fragmentos de vegetación, pequeños y distantes entre sí, producto principalmente del cambio de uso del suelo.
						</p></div>				
					</div>
				</div>
			</div>
		</div>
		<div id="infoEst" class="xtc-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true" style="display: none;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">Explorador de Cambio Climático y Biodiversidad</h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-window-close"></i></button>
					</div>
					<div id="" class="modal-body">
						<p class="data-sub-sub-title" style="text-align: justify; font-size: initial; color: black;">
						La exposición al cambio climático se refiere al grado en que las variaciones climáticas afectan a los ecosistemas; una mayor exposición podría incrementar la vulnerabilidad de los mismos.<br>

						Para el área de interés (p.ej., área protegida, estado, municipio, polígono) se reporta la proporción de superficie en la que coinciden los cuatro modelos de circulación global (MCG): MPI-ESM-LR (Alemania), GFDL-CM3 (Estados Unidos), HADGEM2-ES (Reino Unido) y CNRMCM5 (Francia). <br>

						Las dos gráficas son complementarias; la gráfica de barras muestra la proporción de la superficie del área de interés que potencialmente presentará un incremento significativo y constante de la temperatura media del periodo más antiguo  (1950-1979) al periodo futuro más lejano (2075-2099) con base en los escenarios de cambio climático. La gráfica circular corresponde a la proporción de la superficie que se estima permanecerá con condiciones climáticas estables,  lo  que fue identificado a partir de la delimitación de las  zonas de vida de Holdridge, utilizando variables bioclimáticas (biotemperatura, precipitación y el potencial de evapotranspiración) para el segundo periodo histórico (1980 a 2009) y los tres horizontes futuros bajo los cuatro MCG con escenarios de emisiones RCP 4.5 y 8.5 (moderado y muy alto, respectivamente). Las zonas de vida que no cambian son consideradas estables. Note que cuando elige un periodo futuro más alejado o un escenario de emisiones más alto, el  porcentaje de área disminuye.
						</p>			
					</div>
				</div>
			</div>
		</div>
		<div id="infoMann" class="xtc-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true" style="display: none;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">Explorador de Cambio Climático y Biodiversidad</h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-window-close"></i></button>
					</div>
					<div id="" class="modal-body">
						<p class="data-sub-sub-title" style="text-align: justify; font-size: initial; color: black;">
						La exposición al cambio climático se refiere al grado en que las variaciones climáticas afectan a los ecosistemas; una mayor exposición podría incrementar la vulnerabilidad de los mismos. <br>

						Para el área de interés (p.ej., área protegida, estado, municipio, polígono) se reporta la proporción de superficie en la que coinciden los cuatro modelos de circulación global (MCG): MPI-ESM-LR (Alemania), GFDL-CM3 (Estados Unidos), HADGEM2-ES (Reino Unido) y CNRMCM5 (Francia). <br>

						Las dos gráficas son complementarias; la gráfica de barras muestra la proporción de la superficie del área de interés que potencialmente presentará un incremento significativo y constante de la temperatura media del periodo más antiguo  (1950-1979) al periodo futuro más lejano (2075-2099) con base en los escenarios de cambio climático. La gráfica circular corresponde a la proporción de la superficie que se estima permanecerá con condiciones climáticas estables,  lo  que fue identificado a partir de la delimitación de las  zonas de vida de Holdridge, utilizando variables bioclimáticas (biotemperatura, precipitación y el potencial de evapotranspiración) para el segundo periodo histórico (1980 a 2009) y los tres horizontes futuros bajo los cuatro MCG con escenarios de emisiones RCP 4.5 y 8.5 (moderado y muy alto, respectivamente). Las zonas de vida que no cambian son consideradas estables. Note que cuando elige un periodo futuro más alejado o un escenario de emisiones más alto, el  porcentaje de área disminuye.
						</p>			
					</div>
				</div>
			</div>
		</div>
		<div id="infoProt" class="xtc-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true" style="display: none;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">Explorador de Cambio Climático y Biodiversidad</h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-window-close"></i></button>
					</div>
					<div id="" class="modal-body">
						<p class="data-sub-sub-title" style="text-align: justify; font-size: initial; color: black;">
						La gráfica muestra los valores del indicador de área protegida y conectada (ProtConn, por sus siglas en inglés) para la ecorregión terrestre con la que el polígono del área protegida comparte una mayor superficie. El indicador ProtConn fue diseñado para evaluar metas de conservación tales como la meta 11 de Aichi y cuantifica la conectividad de la red de áreas protegidas. El índice incorpora la superficie y distancia entre las áreas protegidas. Las distancias entre las áreas protegidas corresponden a las rutas con menor impacto humano. Las distancias se estimaron usando un índice de impacto humano que incorpora tres de los factores de presión antropogénicos más importantes: cambio de uso del suelo, desarrollo de infraestructura y fragmentación de hábitats (véase la información en el  módulo de conectividad del  panel izquierdo). El indicador ProtConn se compone de tres valores que representan una proporción  respecto al área total de la ecorregión: 1) porcentaje de la ecorregión que no está protegida, ii) porcentaje de la ecorregión que está protegida y iii) porcentaje de la ecorregión que está protegida y conectada. El indicador ProtConn se calculó para la red de áreas protegidas de jurisdicción federal y se puede visualizar para tres de los niveles de las ecorregiones terrestres bajo cuatro distancias que se relacionan con la capacidad de dispersión diferenciada de varios grupos taxonómicos como  anfibios, reptiles, aves y grandes mamíferos (2, 10, 30 y 100 km).
						</p>		
					</div>
				</div>
			</div>
		</div>
		<div id="infoTend" class="xtc-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true" style="display: none;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">Explorador de Cambio Climático y Biodiversidad</h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-window-close"></i></button>
					</div>
					<div id="" class="modal-body">
						<p class="data-sub-sub-title" style="text-align: justify; font-size: initial; color: black;">
						El análisis de tendencias temporales brinda una estimación sobre los cambios en la conectividad de los fragmentos de vegetación por cambio climático. Se usó el índice conexa equivalente que incorpora la distancia entre cada par de fragmentos de vegetación primaria y un atributo que describe su calidad. El índice se calculó para los fragmentos de vegetación primaria de la carta de uso del suelo y vegetación serie VI (INEGI, 2014) presentes en las áreas protegidas y sus zonas de influencia de hasta 10 km (dependiendo de su cercanía a la costa). El atributo de calidad de cada fragmento corresponde a su área multiplicada por su grado de estabilidad climática en tres periodos futuros (2015-2039, 2045-2069 y 2075-2099) para dos escenarios de trayectorias de concentraciones representativas (RCP 4.5 y 8.5). Las distancias entre fragmentos de vegetación corresponden a las rutas con menor impacto humano; se estimaron usando un índice de impacto humano que incorpora tres de los factores de presión antropogénicos más importantes: cambio de uso del suelo, desarrollo de infraestructura y fragmentación de hábitats (véase la información en el módulo de conectividad del panel izquierdo). La conectividad se expresa en porcentaje y su valor será mayor en el área protegida y su zona de influencia si tiene más fragmentos en donde la mayor parte de su área es estable climáticamente y si la distancia entre sus fragmentos es menor a la establecida como la distancia máxima de dispersión. El análisis de tendencias de la conectividad en el área protegida  y su zona de influencia se puede visualizar bajo cuatro distancias que se relacionan con la  capacidad de dispersión diferenciada de varios grupos taxonómicos como anfibios, reptiles, aves y grandes mamíferos (2, 10, 30 y 100 km).
						</p>	
					</div>
				</div>
			</div>
		</div>
		<!-- <div id="infoPage" class="xtc-modal modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true" style="display: none;"> -->
		<div id="infoPage" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true" style="display: none;">
			<div class="modal-dialog modal-lg"  role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">Explorador de Cambio Climático y Biodiversidad</h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-window-close"></i></button>
					</div>
					<div class="modal-body">
						<blockquote>
							   	<h3>Sobre el ECCBio</h3>
							   
							   	El <a href="https://www.biodiversidad.gob.mx/pais/cambio_climatico.html" target="_blank">Explorador de cambio climático y biodiversidad</a> es una herramienta de consulta para analizar los posibles efectos del cambio climático en diversos elementos de la diversidad biológica de México.
									
								<h3>Forma sugerida de citar: </h3>
								Conabio, IB-UNAM, Conanp-Semarnat, PNUD, INECC. Explorador de cambio climático y biodiversidad, versión 1.0. Comisión Nacional para el Conocimiento y Uso de la Biodiversidad, México. Disponible en http://www.biodiversidad.gob.mx/pais/explorador_cambio_climatico.html (consultada el “indicar fecha”).

								<h3>Agradecimientos</h3>
								Esta primera versión del <strong>ECCBio</strong> es resultado de la colaboración financiada por el proyecto 00087099 “Fortalecimiento de la efectividad del manejo y la resiliencia de las Áreas Protegidas para proteger la biodiversidad amenazada por el Cambio Climático”, el cual es apoyado por un donativo del Fondo para el Medio Ambiente Mundial (GEF por sus siglas en inglés), ejecutado por la Comisión Nacional de Áreas Naturales Protegidas (CONANP) y con el apoyo del Programa de las Naciones Unidas para el Desarrollo (PNUD) como agencia implementadora”.

								Las opiniones, análisis y recomendaciones aquí expresadas son de exclusiva responsabilidad de los autores y no reflejan necesariamente los puntos de vista de la Comisión Nacional de Áreas Naturales Protegidas (CONANP), del Programa de las Naciones Unidas para el Desarrollo (PNUD), o agencias socias del proyecto 00087099 “Fortalecimiento de la efectividad del manejo y la resiliencia de las Áreas Protegidas para proteger la biodiversidad amenazada por el Cambio Climático”.
								
							    <h3>Contacto</h3>
								see@conabio.gob.mx<br>
								Desarrollo del sitio

								<h3>Contenidos</h3>
								Diana Ramírez Mejía, 
								Angela P. Cuervo-Robayo, 
								Wolke Tobón Niedfeldt, 
								Oscar Godínez Gómez 

								<h3>Coordinación</h3>
								Tania Urquiza Haas, 
								Patricia Koleff

								<h3>Colaboradores</h3>
								Enrique Martínez-Meyer,  
								Fernando Camacho Rico, 
								Sofía García, 
								Pilar Jacobo Enciso, 
								Daniel Iura, 
								Margarita Caso Chávez

								<h3>Programación</h3>
								Ranyart R. Suárez Ponce de León,
								Adrián Ghilardi,
								Roberto Rangel Heras,
								Gerardo Alberto González Bautista

								<h3>Diseño</h3>
								Fabiola López Saldaña
						</blockquote>	   
					</div>
				</div>
			</div>
		</div>
	</body>
	<!--script src="/static/{{ version }}/mapFunctions.js"></script-->
	<script src="Web/mapFunctions.js"></script>
	<script src="Web/lightbox.js"></script>
	<script src="Web/mapa.js"></script>
	<!--script src="/static/{{ version }}/constants.js"></script-->
	<script src="Web/constants.js"></script>
	<script src="Web/script.js"></script>
	<script src="Web/conabio.js"></script>
	<script src="Web/variables.js"></script>
	<script src="Web/ee_api_js.js"></script>
	<script src="Web/accordion.js"></script>	
	<!--script src="/static/{{ version }}/utils.js"></script-->
	<script src="Web/utils.js"></script>
	<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
	<!-- <script src="Web/js/plotly.js"></script> -->
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<!-- <script src="Web/js/bootstrap.min.js"></script> 
	<script src="Web/js/bootstrap-submenu.min.js"></script>  -->
	<!--script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script> -->
	<!--script src="/static/{{ version }}/ZipFile.complete.js"></script-->
	<script src="Web/ZipFile.complete.js"></script>
	<!--script src="/static/{{ version }}/geoxml3.js"></script-->

	<script src="Web/geoxml3.js"></script>
	<script src="Web/iscroll-5.2.0.min.js"></script>
	<script src="Web/drawer-3.2.2.min.js"></script>
	<script src="Web/xmlwriter.js"></script>
	<script src="Web/togeojson.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script>
		$(document).ready(function () {
			//$("#gmControl").draggable();
			$.ajax({
				//url:"/utilities/creaMenu2.php",
				url:"Web/creaMenu2_Conabio.php",
				data:{"idPais": idPais, "bd": home},
				dataType:'text',
				complete:function(data){
					$("#ulSidebar").append(data.responseText);
					//console.log();
					$('#sidebarCollapse').on('click', function () {
						$('#sidebar').toggleClass('active');
						$('#sidebar2').toggleClass('active');				
					});
				}
			});			
			$('[data-toggle="tooltip"]').tooltip();
			$("#file").change(function(evt){
				$("#upload").click();
			});
			$('#upload').on('click', function() {
				if($("#file").val()==""){
					alert("Select file first");
					return;
				}
				closebox("uploadKML");
				var file_data = $('#file').prop('files')[0];   
				var form_data = new FormData();                  
				form_data.append('file', file_data);
				$("#file").val("");
				$.ajax({
					url: 'http://www.mofuss.unam.mx/Mapps/uploads/uploadKML.php',
					dataType: 'text',  
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,                         
					type: 'post',
					success: function(response){				
						eval("response="+response);
						if(response[0]){
							geoxml3 = new geoXML3.parser({
								map: map,
								createPolygon: addMyPolygon,
								zoom: true,
								suppressInfoWindows: true
							});
							geoxml3.parse(response[1]);
						}
					}
				});
			});
		});
		$('.drawer').drawer({
			class: {
				nav: 'drawer-nav',
					toggle: 'drawer-toggle',
					overlay: 'drawer-overlay',
					open: 'drawer-open',
					close: 'drawer-close',
					dropdown: 'drawer-dropdown'
			},
			iscroll: {
				mouseWheel: false,
				preventDefault: false
			},
			showOverlay: true
		});
		for(var i = 0; i < 4; i++){
			$("#variable"+i).change(function(e){cambioGrafica(e,true);});
			$("#tiempo"+i).change(function(e){cambioGrafica(e,true);});
			$("#modelo"+i).change(function(e){cambioGrafica(e,true);});
			$("#forzamiento"+i).change(function(e){cambioGrafica(e,true);});
			$("#variableG"+i).change(function(e){cambioGrafica(e,false);});
			$("#tiempoG"+i).change(function(e){cambioGrafica(e,false);});
			$("#forzamientoG"+i).change(function(e){cambioGrafica(e,false);});
			$("#level"+i).change(function(e){cambioProtConn(e);});
			$("#distance"+i).change(function(e){cambioProtConn(e);});
			$("#distanceT"+i).change(function(e){cambioTendencia(e);});
			$("#estabilidadRCP"+i).change(function(e){cambioEstabilidad(e);});
			$("#estabilidadPER"+i).change(function(e){cambioEstabilidad(e);});
			$("#mann"+i).change(function(e){cambioMannKendall(e);});
			
		}
		//
		$('.drawer-overlay').on('click', function(){
			console.log('click en overlay');
			var panelAbierto = $('#wegp_conabio').hasClass('drawer-open');
			if(panelAbierto){
				$('#wegp_conabio').removeClass('drawer-open');
				$('#wegp_conabio').addClass('drawer-close');	
			}
			
		});
		//
		$("#graficasC0").hide();
		$("#graficasC1").hide();
		$("#graficasC2").hide();
		$("#graficasC3").hide();
		$("#conectividadC0").hide();
		$("#conectividadC1").hide();
		$("#conectividadC2").hide();
		$("#conectividadC3").hide();
		$('#checkinvert').on('click',function(){
			if($(this).val()=='Desactivado'){
				$(this).val('Activado');
				$('#Outputinvert').text('100');
				efectoMap();
			}else{
				$(this).val('Desactivado');
				$('#Outputinvert').text('0');
				efectoMap();
			}
		});
		$('#checkgrayscale').on('click',function(){
			if($(this).val()=='Desactivado'){
				$(this).val('Activado');
				$('#Outputgrayscale').text('100');
				efectoMap();
			}else{
				$(this).val('Desactivado');
				$('#Outputgrayscale').text('0');
				efectoMap();
			}
		});
		
		//PAra ocultar los menús
		/*$('#ulSidebar').find('[data-toggle="collapse"]').on('click', function(){
			console.log('di click: ');
		});
		*/
		//console.log('di click: ', $('#ulSidebar li').find('[data-toggle="collapse"]'));
		setTimeout(function(){
			var hijos = $('#ulSidebar').children().each(function(){
				$(this).on('click', function(){
					console.log('di click: ', this);
					revisarAbiertos(this, $('#ulSidebar').children());
					//revisar si los demas hijos estan abiertos y cerrarlos
				})
			});
			//console.log('hijos de sideBar: ', hijos);
			/*$('#ulSidebar').find('li').on('click', function(){
				console.log('Di click en elemento a', this);
			});*/
			
		},1000);

		function revisarAbiertos(hijo, hermanos){
			//var hijos2 = $('ulSidebar').children();
			//console.log('hijos: ', hijo);
			//console.log('hermanos: ', hermanos);
			for(var i = 0; i < hermanos.length-1; i++){
				//console.log('hijo: ', hijo);
				//console.log('hermano: ', hermanos[i]);
				//console.log('iguales?: ', hijo==hermanos[i]);
				if(hijo != hermanos[i]){
					var id = $(hermanos[i]).attr('id');
					var flag = $('#'+id+'>a').attr('aria-expanded');
					//console.log('idHermano: ', id);
					//console.log('abierto??: ', flag);

					if(flag){
						$('#'+id+'>a').attr('aria-expanded','false');
						$('#'+id+'>a').addClass('collapsed');
						$('#'+id+'>ul').attr('aria-expanded','false');
						$('#'+id+'>ul').removeClass('in');
					}
				}
			}
		}

		

		//Table.php 
	</script>
</html>
