var colorBase = "#E2BE4F";
var colorBaseEnt = "#FFFFFF";
var contornoEnt = "#000000";
var colorEncima = "#00FF00";
var colorClick = "#00FFFF";
var cdGlobal = [];
var tempCD = [];
var lastPolygonD = null;
var lastPath = null;
var nextId = 300;
var graficadosIds = [-1, -1, -1, -1];
var graficadosTypes = ["", "", "", ""];
var infoANP = [];
var infoEnt = [];
var infoMun = [];
var ANPS = [];
var minPdf = [];
var maxPdf = [];
var images = [];
var divs = [];
var scroll = 0;
var imgData = [];
var chartData = [];
var t_max = [];
var t_mean = [];
var t_min = [];
var t_prec = [];
var anpDatos = -1;
var single = false;
var positions = [null, ['-500px','500px'],['-500px'],['-1000px','500px']];
var num_anps = 0;
var storeP = [[],[]];
var storeData = [];
var nombresMun = [];
var bioTempP = [[],[]];
var bioPrecT = [[],[]];
var bioTempPMean = [[],[]];
var bioTempPMedian = [[],[]];
var bioTempPMax = [[],[]];
var bioTempPMin = [[],[]];
var bioTempMaxInfo = [[],[]];
var bioTempMinInfo = [[],[]];
var bioTempMaxInfo2 = [[],[]];
var bioTempMinInfo2 = [[],[]];
var bioTempMedInfo2 = [[],[]];
var bioTempPreInfo2 = [[],[]];
var bioTempMaxInfo2E = [[],[]];
var bioTempMinInfo2E = [[],[]];
var bioTempMedInfo2E = [[],[]];
var bioTempPreInfo2E = [[],[]];
var bioTempMaxMunInfo = [[],[]];
var bioTempMinMunInfo = [[],[]];
var bioTempMedMunInfo = [[],[]];
var bioTempPreMunInfo = [[],[]];
var contadorAsync = 0;


var chart = null, data = null, dataView = null;
var lastEra = 0;
var polsEnt = null;
var polsEnt1 = null;
var polsMun = [];
var entCargadas = false;
var anpCargadas = true;
var munCargadas = false;
var drawingManagerZoom,drawingManagerLine;
var zooming = false;
var VARIABLE_DEFAULT = 4;
var TEMPORADA_DEFAULT = 1;
var categoriasANP = ["RB","APFyF","PN","MN","APRN","SANT"];
var descCatANP = ["Reserva de la Biosfera","Área de Protección de Flora y Fauna","Parque Nacional","Monumento Natural","Área de Protección de Recursos Naturales","Santuario"];
var labels = ['1910-1949', '1950-1979','1980-2009',
				'2015-2039','2015-2039','2045-2069','2045-2069','2075-2099','2075-2099',
				'2015-2039','2015-2039','2045-2069','2045-2069','2075-2099','2075-2099',
				'2015-2039','2015-2039','2045-2069','2045-2069','2075-2099','2075-2099',
				'2015-2039','2015-2039','2045-2069','2045-2069','2075-2099','2075-2099'];

var models = ['Historico','Historico','Histórico',
					'CNRMCM5','CNRMCM5','CNRMCM5','CNRMCM5','CNRMCM5','CNRMCM5',
					'MPI_ESM_LR','MPI_ESM_LR','MPI_ESM_LR','MPI_ESM_LR','MPI_ESM_LR','MPI_ESM_LR',
					'HADGEM2_ES','HADGEM2_ES','HADGEM2_ES','HADGEM2_ES','HADGEM2_ES','HADGEM2_ES',
					'GFDL_CM3','GFDL_CM3','GFDL_CM3','GFDL_CM3','GFDL_CM3','GFDL_CM3'];
var indHist = [0,1,2];
var indCNR = [3,4,5,6,7,8];
var indCNR45 = [3,5,7];
var indCNR85 = [4,6,8];
var indMPI = [9,10,11,12,13,14];
var indMPI45 = [9,11,13];
var indMPI85 = [10,12,14];
var indHAD = [15,16,17,18,19,20];
var indHAD45 = [15,17,19];
var indHAD85 = [16,18,20];
var indGFD = [21,22,23,24,25,26];
var indGFD45 = [21,23,25];
var indGFD85 = [22,24,26];
var legends45 = [2, 3, 9, 15, 21];
var legends85 = [2, 4, 10, 16, 22];
//variables para el reporte
var infoWindowReporte = [];
var arrInfoTable = [];
var yearsExporta = [];
var yearsStatics = [];
//
var UNIQUE = true;
var infoWindowRoute = null;
var lastFigure = null;
var lastPanel = null;
var dictIndex = {};
var dictNames = {};
var currentP;
var nombresANPJSON = [];
var nombresMUNJSON = [];
var nombresMunicipios = [];
var estadosNames = ['01_Aguascalientes', '02_Baja-California', '03_Baja-California-Sur', '04_Campeche',
					'05_Coahuila-de-Zaragoza', '06_Colima', '07_Chiapas',
					'08_Chihuahua', '09_CDMX', '10_Durango',
					'11_Guanajuato', '12_Guerrero', '13_Hidalgo',
					'14_Jalisco', '15_Mexico', '16_Michoacan',
					'17_Morelos', '18_Nayarit', '19_Nuevo-Leon',
					'20_Oaxaca', '21_Puebla', '22_Queretaro',
					'23_Quintana-Roo', '24_San-Luis-Potosi', '25_Sinaloa',
					'26_Sonora', '27_Tabasco', '28_Tamaulipas',
					'29_Tlaxcala', '30_Veracruz', '31_Yucatan',
					'32_Zacatecas'];
var estadosByMunCargados = [false, false, false, false, false, false, false, false, false, false,
							false, false, false, false, false, false, false, false, false, false,
							false, false, false, false, false, false, false, false, false, false,
							false, false];
//comment to test GIT
function toKML(figure, name){
	var xw = new XMLWriter('UTF-8');
	xw.formatting = 'indented'; //add indentation and newlines
	xw.indentChar = ' '; //indent with spaces
	xw.indentation = 2; //add 2 spaces per level	
	xw.writeStartDocument(); //Start
	xw.writeStartElement('kml'); //Kml
	xw.writeAttributeString("xmlns", "http://www.opengis.net/kml/2.2");
	xw.writeStartElement('Document'); //Document
	xw.writeStartElement('Placemark'); //Placemark
    xw.writeStartElement('name'); //Name
    xw.writeCDATA(name);
    xw.writeEndElement(); //Name end
    xw.writeStartElement('description'); //Description
    xw.writeCDATA('');
    xw.writeEndElement(); //Description end
	xw.writeStartElement('Polygon'); //Polygon
	xw.writeElementString('extrude', '1');
	xw.writeElementString('altitudeMode', 'relativeToGround');
	xw.writeStartElement('outerBoundaryIs'); //outerBoundaryIs
	xw.writeStartElement('LinearRing'); //LinearRing
	xw.writeStartElement("coordinates"); //coordinates
	var path = figure.getPath().getArray();
	for (var k = 0; k < path.length; k++) {
		xw.writeString(path[k].lng() + "," + path[k].lat() + ",0");
	}
	xw.writeEndElement(); //coordinates end
	xw.writeEndElement(); //LinearRing end
	xw.writeEndElement(); //outerBoundaryIs end
	xw.writeEndElement(); //Polygon end
	xw.writeEndElement(); //Placemark end
	xw.writeEndElement(); //Document end
	xw.writeEndElement(); //kml end
	xw.writeEndDocument(); //End
	xml = xw.flush(); //generate the xml string
	xw.close(); //clean the writer
	xw = undefined; //don't let visitors use it, it's closed
	//document.open('data:Application/octet-stream,' + encodeURIComponent(xml));
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml));
	element.setAttribute('download', 'poligono.kml');
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();	
	document.body.removeChild(element);
}

function callbackAsync(){
	contadorAsync++;
	if(contadorAsync == 5){
		$('#mensajePrecarga').remove();
	}
}

function fillData(variables){
	//poner indices!
	getIndexes();
	var i = 250;
	var idsANP = "";
	for(var j = 1; j < 165; j++){
		idsANP += j+",";
	}
	idsANP += "165";
	for(var j = 0; j < variables.length; j++){
		var k = variables[j];
		setTimeout(fillDataAux,i,k,idsANP);
	}
}

function fillDataEstados(variables){
	//poner indices!
	//getIndexes();
	var i = 250;
	var idsANP = "";
	for(var j = 1; j < 32; j++){
		idsANP += j+",";
	}
	idsANP += "32";
	for(var j = 0; j < variables.length; j++){
		var k = variables[j];
		setTimeout(fillDataAuxEstados,i,k,idsANP);
	}
}

function fillDataAux(variable,idsANP){
	$.getJSON('Web/getTemp2.php',{metadata:idsANP,variable:variable,idTemporada:1},function(data){		
		for(var j = 0; j < data.length; j++){
			eval("var dataT = "+data[j]);			
			if(variable == 6){				
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempP[pos] === undefined) bioTempP[pos] = [];
					bioTempP[pos][i]=dataT[i];
				}
			}else if(variable == 9){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioPrecT[pos] === undefined) bioPrecT[pos] = [];
					bioPrecT[pos][i]=dataT[i];
				}
			}else if(variable == 8){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempPMean[pos] === undefined) bioTempPMean[pos] = [];
					bioTempPMean[pos][i]=dataT[i];
				}
			}else if(variable == 10){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempPMedian[pos] === undefined) bioTempPMedian[pos] = [];
					bioTempPMedian[pos][i]=dataT[i];
				}
			}else if(variable == 12){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempPMax[pos] === undefined) bioTempPMax[pos] = [];
					bioTempPMax[pos][i]=dataT[i];
					//console.log(bioTempPMax);
				}
			}else if(variable == 13){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempPMin[pos] === undefined) bioTempPMin[pos] = [];
					bioTempPMin[pos][i]=dataT[i];
					//console.log(bioTempPMin);
				}
			}else if(variable == 14){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempMaxInfo[pos] === undefined) bioTempMaxInfo[pos] = [];
					bioTempMaxInfo[pos][i]=dataT[i];
					//console.log(bioTempPMax);
				}
			}else if(variable == 15){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempMinInfo[pos] === undefined) bioTempMinInfo[pos] = [];
					bioTempMinInfo[pos][i]=dataT[i];
					//console.log(bioTempPMax);
				}
			}else if(variable == 2){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempPreInfo2[pos] === undefined) bioTempPreInfo2[pos] = [];
					bioTempPreInfo2[pos][i]=getDataFromH(dataT[i]);					
				}
			}else if(variable == 3){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempMaxInfo2[pos] === undefined) bioTempMaxInfo2[pos] = [];
					bioTempMaxInfo2[pos][i]=getDataFromH(dataT[i]);										
				}				
			}else if(variable == 4){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempMinInfo2[pos] === undefined) bioTempMinInfo2[pos] = [];
					bioTempMinInfo2[pos][i]=getDataFromH(dataT[i]);					
				}				
			}else if(variable == 5){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempMedInfo2[pos] === undefined) bioTempMedInfo2[pos] = [];
					bioTempMedInfo2[pos][i]=getDataFromH(dataT[i]);					
				}
			}
		}
		callbackAsync();
	});
}

function fillDataAuxEstados(variable,idsANP){
	console.log('fillData Estados: ', variable, " idsANP: ", idsANP);
	$.getJSON('Web/getTempEstadoFill.php',{metadata:idsANP,variable:variable,idTemporada:1},function(data){		
		for(var j = 0; j < data.length; j++){
			eval("var dataT = "+data[j]);			
			if(variable == 2){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempPreInfo2E[pos] === undefined) bioTempPreInfo2E[pos] = [];
					bioTempPreInfo2E[pos][i]=getDataFromH(dataT[i]);					
				}
			}else if(variable == 3){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempMaxInfo2E[pos] === undefined) bioTempMaxInfo2E[pos] = [];
					bioTempMaxInfo2E[pos][i]=getDataFromH(dataT[i]);										
				}				
			}else if(variable == 4){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempMinInfo2E[pos] === undefined) bioTempMinInfo2E[pos] = [];
					bioTempMinInfo2E[pos][i]=getDataFromH(dataT[i]);					
				}				
			}else if(variable == 5){
				for(var i = 0; i < dataT.length; i++){					
					var pos = parseInt(j+1);
					if(bioTempMedInfo2E[pos] === undefined) bioTempMedInfo2E[pos] = [];
					bioTempMedInfo2E[pos][i]=getDataFromH(dataT[i]);					
				}
			}
		}
		//callbackAsync();
	});
}

function getDataFromH(datos,variable){
	//console.log(datos);
	var years = [];
	n = datos.length;
	for(var l=0; l<n; l++){
		if(datos[l].includes("x")){
			var datosR = datos[l].split("x");
			var contAux = 0;
			while(contAux<datosR[1]){
				years.push(parseFloat(datosR[0]));
				contAux++;
			}
		}else{
			years.push(parseFloat(datos[l]));
		}
	}
	if(years.length == 0) return 0;
	//console.log(years,datos);
	if(variable !== undefined){
		datosProcess = Math.round(getSum(years)*100)/100;
	} else {
		datosProcess = Math.round(getAvg(years)*100)/100;
	}
	return datosProcess;
}
function getBlankSpaces(){
	var s = 0;
	for(var i = 0; i < 4; i++){
		if(graficadosIds[i] == -1){
			s++;
		}
	}
	return s;
}
function getBlankPos(id, type){
	if(type == 3){
		graficadosTypes[0] = type;
		return 0;
	}
	for(var i = 0; i < 4; i++){
		if(graficadosIds[i] == id && graficadosTypes[i] == type)
			return i;
		if(graficadosIds[i] == -1){
			graficadosIds[i] = id;
			graficadosTypes[i] = type;
			return i;
		}
	}
	return -1;
}
function checkSelects(flag,posGrafica){
	if(flag){
		var v = $("#variable"+posGrafica).val();
		var t = $("#tiempo"+posGrafica).val();
		var f = $("#forzamiento"+posGrafica).val();
		var m = $("#modelo"+posGrafica).val();
		return v!=null&&t!=null&&f!=null&&m!=null;
	} else {
		var v = $("#variableG"+posGrafica).val();
		var t = $("#tiempoG"+posGrafica).val();
		var f = $("#forzamientoG"+posGrafica).val();
		return v!=null&&t!=null&&f!=null;
	}
}
function envia(t,anp,p,temporada,forzamiento,modelo,flag){
	console.log('ESTO eSTA LLEGANDO de P');
	if(anp=="") return;	
	$("#showHide").addClass("menuT");
	setTimeout(function(){
		$("#showHide").removeClass("menuT");
	},2000);
	if(getBlankSpaces()==0 && getBlankPos(anp, p)==-1){
		alert("Debes desmarcar primero! El límite es de 4");
		return;
	}
	if(p != 3 && anp.includes(",")){
		anp = anp.split(",");
		anp.sort(function(a, b) {
			return a - b;
		});
		anp = anp.join(",");
	}
	varMeta = (p!==3)?anp:'Poligono';
	ANPS = anp+"";
	var url = (p==3)?'https://www.wegp.unam.mx/getclimatedata':(p==1)?'Web/getTempE2.php':'Web/getTemp2.php';
	//var url = (p==3)?'https://servicios.conabio.gob.mx/assets_conabio8080/getclimatedata':(p==1)?'Web/getTempE2.php':'Web/getTemp2.php';	
	if(p == 5){
		var url = 'Web/getTempMun.php';
	}
	images = [];
	if(p == 3){
		lastPath = anp;
	}
	var posGrafica = getBlankPos(anp, p);
	// if(flag !== undefined && !checkSelects(flag,posGrafica)){ 
	// 	return;
	// }

	$("#mensajeInicial").hide();
	if($("#mensajePol").length > 0){
		$("#mensajePol").remove();
	}
	$("#cortina").append("<div id='mensajePol' style='line-height: 0.8;'>Espera un momento por favor.<br><br><b>Calculando datos...</b><br><small style='font-size: 55%;'>Esto puede tardar un par de minutos dependiendo del tamaño del area seleccionada. El motor algebraico toma una muestra de pixeles para áreas grandes.</small></div>");
	$("#cortina").show();

	
	
	//console.log("anp: ", anp);
	currentP = p;
	if(p == 3){showCambioClimatico();}
	$.ajax({
		type:"GET",
		dataType:"json",
		url:url, 
		data:{pol: p, variable: t, metadata: anp,idTemporada:temporada},
		success: function(data){
			k = data.length;
			//console.log('data length: ', data[0].length);
			var years=[];
			for (var m=0; m<k; m++){		
				years[m] = [];				
				if(p == 0 || p ==5)
					eval("var datosT = "+data[m]);
				else if (p == 3){
					var datosT = data[0];					
					var idsANP = '['+data[0][7].idsANP+']';
					idsANP = idsANP.substring(1,idsANP.length-1);
				}else{
					eval("var datosT = "+data[m][0]);
				}
				for(var i=0;i<27;i++){
					years[m][i] = [];
					var datos = datosT[i];
					n = datos.length;
					if(n == 0){
						years[m][i] = [];
					}
					for(var l=0; l<n; l++){
						if(datos[l].includes("x")){
							var datosR = datos[l].split("x");
							var contAux = 0;
							while(contAux<datosR[1]){
								years[m][i].push(datosR[0]);
								contAux++;
							}
						}else{
							years[m][i].push(datos[l]);
						}
					}
				}
			}			
			setTimeout(function(){
				if(p == 0){
					// t_prec = bioPrecT[anp];
					// t_max = bioTempPMax[anp];
					// t_mean = bioTempPMean[anp];
					// t_min = bioTempPMin[anp];
					t_prec = bioTempPreInfo2[anp];
					t_max = bioTempMaxInfo2[anp];
					t_mean = bioTempMedInfo2[anp];
					t_min = bioTempMinInfo2[anp];
					//console.log('tmean: ', t_mean);
				}
				else if(p == 1){
					t_prec = bioTempPreInfo2E[anp];
					t_max = bioTempMaxInfo2E[anp];
					t_mean = bioTempMedInfo2E[anp];
					t_min = bioTempMinInfo2E[anp];
				}
				fillTableInfo(posGrafica,anp,p);
			},10);
			
			//$("#graficasC"+posGrafica).show();
			if(flag === undefined){
				var pos = getBlankPos(anp, p);
				var forz = $("#forzamiento"+pos).val();
				var forzG = $("#forzamientoG"+pos).val();
				var mod = $("#modelo"+pos).val();
				$("#variable"+pos).val(t);
				$("#temporada"+pos).val(temporada);
				$("#variableG"+pos).val(t);
				$("#temporadaG"+pos).val(temporada);

				// if(p == 5){
				// 	$("#mensajePrecarga4").hide();
				// 	$.unblockUI;
				// }
				setTimeout(function(){
					graphicBoxPlot(years,k,varMeta,p,t,forz,mod,temporada);
					graphicModels(years,k,varMeta,p,t,forzG,temporada);
				},100);
				//graphicBoxPlot(years,k,varMeta,p,t,forz,mod,temporada);
				//graphicModels(years,k,varMeta,p,t,forzG,temporada);
			 } 
			else if(flag) {
				graphicBoxPlot(years,k,varMeta,p,t,forzamiento,modelo,temporada);
			} else {
				graphicModels(years,k,varMeta,p,t,forzamiento,temporada);
			}
			$("#mensajeInicial").show();
			$("#cortina").hide();
			$("#mensajePol").remove();
			// if(yearsExporta[anp] == undefined){
			// 	yearsExporta[anp] = years;
			// }
			if(p==3){
				anp = 0;
			}
			yearsExporta[anp] = years;
			

			//Ocultar informacion dependiendo si es Estado o poligono
			if(p == 3){
				$('#graficasC0').show();
			}
			else if(p == 1){
				$('#infoANP'+pos).addClass('hidden');
				$('#graficasC'+pos).show();
				console.log('llegue a poner clase hidden');
			}
			else if(p == 0){
				$('#infoANP'+pos).removeClass('hidden');	
			}
		}
	});

	//Si es poligono graficar MannKendall
	if(p == 3){
		//pass
	}

	//Solo si es un ANP o entidad
	/*if(p == 1 || p == 0){
		graphicEstabilidad(posGrafica, anp, false, p);
		graphicFrag(posGrafica, anp, p);
		graphicProtConn(posGrafica, anp, false);
		//graphicTendencia(posGrafica, anp, false);
		if(p==1){
			console.log('Ente a estado a quitar cosas');
			$('#mannKendall'+posGrafica).hide();
			$('#titmannKendall'+posGrafica).attr('style','display: none !important');
		}
		else{
			$('#mannKendall'+posGrafica).show();
			$('#titmannKendall'+posGrafica).attr('style','display: inherit !important')
			graphicMannKendall(posGrafica, anp, false);
			graphicTendencia(posGrafica, anp, false);
		}
	}*/
	if (p == 0){
		graphicProtConn(posGrafica, anp, false);
		graphicFrag(posGrafica, anp);
		graphicTendencia(posGrafica, anp, false);
		graphicEstabilidad(posGrafica, anp, false, p);
		graphicMannKendall(posGrafica, anp, false);
	}
	
}

function graphicEstabilidad(posGrafica, anp, flag, p){
	//console.log("llegue a graphicEstabilidadd: ", posGrafica, " anp: ", anp, "p: ", p);
	//Revisar valores de los selects
	if(flag){
		var rcp = $('#estabilidadRCP'+posGrafica).val();
		var per = $('#estabilidadPER'+posGrafica).val();
	}
	else{
		//por default RCP=4.5 y Periodo = 2015-2039
		var rcp = 1;
		var per = 1;
	}
	/*
	//Establecer titulo de la grafica
	if(p == 0){
		var str = 'Porcentaje de la superficie del ANP con clima estable';
	}
	else if(p == 1){
		var str = 'Porcentaje de clima estable en la entidad federativa';
	}
	//Poner titulo en el div que le corresponde
	$('#estabilidadTit'+posGrafica).html(str);
	$('#estabilidadTit'+posGrafica).css({display: 'block !important'});*/

	//Saber si es estado o anp
	if(p == 0)
		var url = "Web/getEstabilidad.php";
	else if(p == 1)
		var url = "Web/getEstabilidadEstados.php";

	$.ajax({
		type:"GET",
		dataType:"json",
		url:url, 
		data:{idANP: anp, per:per, rcp:rcp},
		success: function(data){
			//console.log("anp: ", anp, " per: ", per, "rcp: ", rcp);
			//console.log("estabilidad data: ", data);
			//console.log("viene vacio: ", data[0] == undefined);
			if(data[0] != undefined){
				
				if(rcp == 1)
					var color = 'rgb(46,187,204)';
				else
					var color = 'rgb(10,149,206)';


				var est = data[0]*100;
				est = parseInt(est.toFixed(2));
				var unEst = 100 - est;
				var datos = [{
					values: [parseInt(est), parseInt(unEst)],
					//colors: ['rgb(89,152,172)','rgb(179,179,179)'],
					marker: {colors: [color,'rgb(179,179,179)']},
					//labels: ['Fragmentado', 'Sin Fragmentar'],
					hole: 0.7,
					pull: [0.0, 0.01],
					type: 'pie',
					textinfo: 'none',
					showlegend: false,
					hoverinfo: 'none'
					//sort: false
				}];

				var tit = est+'%';
				var layout = {
					/*title: {
						text:'<b>Porcentaje de clima estable en el ANP</b>',
						font:{color: 'black'}},*/
					annotations: [{showarrow: false, text: tit, font: {color: color, size: 50}, align: 'center'}],
					height: 400,
					width: 400
				};
			}
			else{
				var unEst = 100;
				var datos = [{
				values: [parseInt(unEst)],
				//colors: ['rgb(89,152,172)','rgb(179,179,179)'],
				marker: {colors: ['rgb(179,179,179)']},
				//labels: ['Fragmentado', 'Sin Fragmentar'],
				hole: 0.7,
				pull: [0.0],
				type: 'pie',
				textinfo: 'none',
				showlegend: false,
				hoverinfo: 'none'
				//sort: false
			}];

			var tit = 0+'%';
			var layout = {
				/*title: {
					text:'<b>Porcentaje de Estabilidad del ANP</b>',
					font:{color: 'rgb(179,179,179)'}},*/
				annotations: [{showarrow: false, text: tit, font: {color: 'rgb(179,179,179)', size: 50}, align: 'center'}],
				height: 450,
				width: 450
			};
			}
			console.log('Est: ', parseInt(est), ' unEst: ', unEst);
			
			setTimeout(function(){
				Plot6('estabilidad'+posGrafica, datos, layout, posGrafica);
			},10);
		}
	});
}

function graphicFrag(posGrafica, anp){
	//console.log("llegue a graphicFrag: ", posGrafica, " anp: ", anp);
	
	//Los indices para fragmentacion en ANP estan cambiados, para estados siguen igual
	/*if(p == 0){
		var realIndex = parseInt(dictIndex[anp+'']);
		var url = "Web/getFrag2.php";
	}
	else{
		var realIndex = anp;
		var url = "Web/getFragEstados.php";
	}

	//Establecer titulo de la grafica
	if(p == 0){
		var str = 'Porcentaje de Fragmentación del ANP';
	}
	else if(p == 1){
		var str = 'Porcentaje de Fragmentación de la Entidad';
	}*/

	var realIndex = parseInt(dictIndex[anp+'']);
	//var realIndex = anp;


	var url = "Web/getFrag2.php";
	var str = 'Porcentaje de fragmentación de la vegetación en el área protegida';
	//Poner titulo en el div que le corresponde
	$('#fragTitle'+posGrafica).html(str);
	$('#fragTitle'+posGrafica).css({display: 'block !important'});

	$.ajax({
		type:"GET",
		dataType:"json",
		url:url, 
		//data:{idANP: anp},
		data:{idANP: realIndex},
		success: function(data){
			console.log("frag data: ", data);
			//graphicProtConn(data, posGrafica);
			var frag = data[0]*100;
			var zona = data[1]*100;
			var datos = [{
				x: ['Área protegida', 'Zona de influencia'],
				y: [frag, zona],
				type: 'bar',
				marker:{
					color: ['rgb(89,152,172)','rgb(89,152,172)']
				},
				width: [0.65, 0.65],
				//offset: [0.05,0.05],
				//labels: ['ANP', 'Zona de influencia'],
				//showlegend: true
				//bargap: 0.15
			}];
			/*
			var unFrag = 100 - frag;
			frag = parseFloat(frag).toFixed(2);
			unFrag = parseFloat(unFrag).toFixed(2);
			// solo enteros
			frag = parseInt(frag);
			unFrag = parseInt(unFrag);
			var datos = [{
				values: [frag, unFrag],
				//colors: ['rgb(89,152,172)','rgb(179,179,179)'],
				marker: {colors: ['rgb(89,152,172)','rgb(179,179,179)']},
				//labels: ['Fragmentado', 'Sin Fragmentar'],
				hole: 0.7,
				pull: [0.0, 0.01],
				type: 'pie',
				textinfo: 'none',
				showlegend: false,
				hoverinfo: 'none'
				//sort: false
			}];
			*/

			//var tit = frag+'%';
			var tit = '';
			var layout = {
				//title: '<b>Porcentaje de Fragmentación del ANP</b>',
				yaxis: {title: 'Índice de fragmentación (%)'},
				//bargroupgap: 0.25,
				//offset: [0.1, 0.1],
				//annotations: [{showarrow: false, text: tit, font: {color: 'rgb(89,152,172)', size: 70}, align: 'center'}],
				height: 450,
				width: 450
			};
			setTimeout(function(){
				Plot4('frag'+posGrafica, datos, layout, posGrafica);
			},10);
			// setTimeout(plot3, 'protConn'+posGrafica, data, layout, posGrafica);
		}
	});
}

function graphicTendencia(posGrafica, anp, flag){
	var realIndex = parseInt(dictIndex[anp+'']);
	//var realIndex = anp;
	/*flag es verdadero cuando hubo un cambio en la variable seleccionada
	y es falso cuando se grafican los valores default*/
	//console.log("llegue a graphicTendencia ");
	if (flag){
		var distance = $('#distanceT'+posGrafica).val(); 
	}
	else{
		var distance = 10;
	}
	$.ajax({
		type:"GET",
		dataType:"json",
		url:"Web/getTendencia.php", 
		//data:{idANP: anp, d:distance},
		data:{idANP: realIndex, d:distance},
		success: function(data){
			if(data.length == 2){
				data = data[0];
			}
			console.log('dataTendencia: ', data);
			eval("var res = "+data);
			//console.log("tendencia data: ", res);
			
			xAxis = ['2014', '2015-2039', '2045-2069', '2075-2099'];
			var trace1 = {
				x: xAxis,
				y: res[0],
				mode: 'lines+markers',
				name: 'RCP 4.5',
				marker:{
					color: 'rgb(0, 113, 188)',
					symbol: 'square'
				}
			};
			var trace2 = {
				x: xAxis,
				y: res[1],
				mode: 'lines+markers',
				name: 'RCP 8.5',
				marker:{
					color: 'rgb(173, 57, 68)',
					symbol: 'diamond'
				}
			};

			var datos = [trace1, trace2];

			var layout = {
				//title: '<b>Tendencias de conectividad</b>',
				xaxis: {title: ''},
				yaxis: {title: 'Superficie conectada (%)'},
				height: 450,
				width: 450
			};
			setTimeout(function(){
				Plot5('tendencia'+posGrafica, datos, layout, posGrafica);
			},10);
			// setTimeout(plot3, 'protConn'+posGrafica, data, layout, posGrafica);
		}
	});
}

function getIndexes(){
	//var dict = {};
	$.ajax({
		type:"GET",
		dataType:"json",
		url:"Web/getCSV_Conabio.php", 
		data:{file: 'indicesConabio.csv'},
		success: function(data){
			//console.log('indices: ',data);
			n = data.length;
			for(var i=1; i<n; i++){
				var id1 = data[i][0];
				var id2 = data[i][1];
				var name = data[i][2];
				dictIndex[id1] = id2;
				dictNames[id1] = name;
			}
		}
	});
}

function graphicMannKendall(posGrafica, anp, flag){
	var realIndex = parseInt(dictIndex[anp+'']);
	anp = realIndex;
	if (flag){
		var rcp = $('#mann'+posGrafica).val();
	}
	else{
		var rcp = 1;
	}
	$.ajax({
		type:"GET",
		dataType:"json",
		url:"Web/getMannKendall.php", 
		//data:{idANP: anp, level: level, d:distance},
		data:{idANP: anp, rcp: rcp},
		success: function(data){
			var mann = data[0]*100;
			mann = parseInt(mann);
			var resto = 100-mann;

			var trace1 = {
				x: ['Prueba de Mann-Kendall'],
				y: [mann],
				type: 'bar',
				name: 'Proporción de área expuesta',
				width: [0.3],
				marker:{
					color: ['rgb(166, 28, 0)']
				}
			};
			var trace2 = {
				x: ['Prueba de Mann-Kendall'],
				y: [resto],
				type: 'bar',
				name: '',
				width: [0.3],
				marker:{
					color: ['rgb(127, 127, 127)']
				}
			};

			var datos = [trace1, trace2];
			var layout = {barmode: 'stack',
				//title: '<b>Proporción de área expuesta</b>',
				showlegend: false,
				height: 400,
				width: 400
			};
			setTimeout(function(){
				Plot7('mannKendall'+posGrafica, datos, layout, posGrafica);
			},10);
		}

	});
}

function graphicProtConn(posGrafica, anp, flag){
	/*flag es verdadero cuando hubo un cambio en la variable seleccionada
	y es falso cuando se grafican los valores default*/
	/*
	if(p == 0){
		var realIndex = parseInt(dictIndex[anp+'']);
		var url = "Web/getProtConn.php";
	}
	else{
		var realIndex = anp;
		var url = "Web/getProtConnEstados.php";
	}*/
	
	//console.log("llegue a graphicProtConn \n anp: ", anp, " p: ", p);
	var realIndex = parseInt(dictIndex[anp+'']);
	//var realIndex = anp;

	var url = "Web/getProtConn.php";
	if (flag){
		var level = $('#level'+posGrafica).val();
		var distance = $('#distance'+posGrafica).val(); 
	}
	else{
		var level = 1;
		var distance = 2;
	}
	//console.log('llegó: ', anp, ' y es: ',dictIndex[anp+''], ' name: ',dictNames[anp+'']);
	//var realIndex = parseInt(dictIndex[anp+'']);
	$.ajax({
		type:"GET",
		dataType:"json",
		url:url, 
		//data:{idANP: anp, level: level, d:distance},
		data:{idANP: realIndex, level: level, d:distance},
		success: function(data){
			console.log("protConn data: ", data);
			//graphicProtConn(data, posGrafica);
			// var prot = data[0]*100;
			// var con = data[1]*100;
			// var unprot = data[2]*100;
			var con = parseFloat(data[0]).toFixed(2);
			var prot = parseFloat(data[1]).toFixed(2);
			var unprot = parseFloat(data[2]).toFixed(2);
			var ecoregion = data[3]+'';
			//ecoregion = decodeURIComponent(JSON.parse('"'+ecoregion+'"'));
			prot = (prot - con).toFixed(2);

			//Set title
			$('#titEcoregion'+posGrafica).html(ecoregion);

			console.log('con: ', con);
			console.log('prot: ', prot);
			console.log('unprot: ', unprot);

			/*
			var datos = [{
				//values: [prot, con, unprot, 100],
				values: [con, prot, unprot, con+prot+unprot],
				//text: ['Protegido', 'Protegido-Conectado', 'No Protegido', ''],
				text: ['Protegido-Conectado', 'Protegido', 'No Protegido','test'],
				//direction: 'counterclockwise',
				direction: 'clockwise',
				labels: ['Protegido-Conectado '+con+'%',
						'Protegido '+prot+'%',
						'No Protegido '+unprot+'%',
						'test'],
				type: 'pie',
				hole: 0.4,
				//rotation: 90,
				rotation: 270,
				textposition: 'inside',
				marker: {
					// colors: ['rgb(26,152,80)','rgb(145,207,96)','rgb(252,141,89)','white']
					colors: ['rgb(26,152,80)','rgb(145,207,96)','rgb(252,141,89)','white']
				},
				hoverinfo: "label",
				showlegend: true
			}];*/
			/*
			var datos = [{
				//values: [prot, con, unprot, 100],
				values: [con, prot, unprot],
				//text: ['Protegido', 'Protegido-Conectado', 'No Protegido', ''],
				text: ['Protegido-Conectado', 'Protegido', 'No Protegido'],
				direction: 'counterclockwise',
				//direction: 'clockwise',
				labels: ['Protegido-Conectado '+con+'%', 'Protegido '+prot+'%',
					 'No Protegido '+unprot+'%'],
				type: 'pie',
				hole: 0.4,
				//rotation: 90,
				rotation: 270,
				//textposition: 'inside',
				marker: {
					// colors: ['rgb(26,152,80)','rgb(145,207,96)','rgb(252,141,89)','white']
					colors: ['rgb(26,152,80)','rgb(145,207,96)','rgb(252,141,89)']
				},
				hoverinfo: "label",
				showlegend: true
			}];*/

			/*
			var layout = {
				/*
				shapes:[{
			      type: 'path',
			      path: path,
			      fillcolor: '850000',
			      line: {
			        color: '850000'
			      }}],*/
				//title: 'Grado de conectividad de la ecorregión',
				/*title: ecoregion,
				xaxis: {visible: false, range: [-1, 1]},
				yaxis: {visible: false, range: [-1, 1]},
				height: 550,
				width: 550
			};
			*/
			/*
			// Enter a speed between 0 and 180
			var level = 30.6;

			// Trig to calc meter point
			var degrees = 180 - level,
			     radius = .5;
			var radians = degrees * Math.PI / 180;
			var x = radius * Math.cos(radians);
			var y = radius * Math.sin(radians);

			// Path: may have to change to create a better triangle
			var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
			     pathX = String(x),
			     space = ' ',
			     pathY = String(y),
			     pathEnd = ' Z';
			var path = mainPath.concat(pathX,space,pathY,pathEnd);

			var data = [{ type: 'scatter',
			   x: [0], y:[0],
			    marker: {size: 28, color:'000000'},
			    showlegend: false,
			    name: '17% Meta Aichi',
			    text: level,
			    hoverinfo: 'name'},
			  { //values: [50/3, 50/3, 50/3, 50],
			  	values: [unprot, prot, con, 100],
			  rotation: 90,
			  //text: ['No Protegido', 'Protegido', 'Protegido-Conectado', ''],
			  text: [unprot+'%', prot+'%', con+'%', ''],
			  textinfo: 'text',
			  textposition:'inside',
			  marker: {colors:['rgba(252,141,89, .8)', 'rgba(145,207,96, .8)',
			                         'rgba(26,152,80, .8)',
			                         'rgba(255, 255, 255, 0)']},
			  labels: ['No Protegido', 'Conectado', 'Protegido-Conectado', ''],
			  hoverinfo: 'label',
			  hole: .35,
			  type: 'pie',
			  showlegend: true
			}];

			var layout = {
			  shapes:[{
			      type: 'path',
			      path: path,
			      name: '17% Meta Aichi',
			      fillcolor: '000000',
			      line: {
			        color: '000000'
			      }
			    }],
			  title: '<b>'+ecoregion+'</b>',
			  height: 500,
			  width: 500,
			  xaxis: {zeroline:false, showticklabels:false,
			             showgrid: false, range: [-1, 1]},
			  yaxis: {zeroline:false, showticklabels:false,
			             showgrid: false, range: [-1, 1]}
			};

			//Plotly.newPlot('myDiv', data, layout);

			setTimeout(function(){
				Plot3('protConn'+posGrafica, data, layout, posGrafica);
			},10);*/

			
			//Magia
			// var labels = ['Total','No-protegido','Protegido', 'Conectado'];
			// var parents = ['','Total','Total','Protegido'];
			// var values = [100, unprot, 100-unprot, con];
			// var colores = ['orange','green'];
			
			if(unprot>prot){
				var labels = ['Total', 'Protegido', 'Conectado', 'No-protegido'];
				var parents = ['','Total','Protegido','Total'];
				var values = [100, 100-unprot, con, unprot];
				//var colores = ['orange','green'];
				var colores = ['rgb(255, 204, 115)','rgb(151, 188, 188)'];
			}
			else{
				var labels = ['Total', 'Protegido', 'Conectado', 'No-protegido'];
				var parents = ['','Total','Protegido','Total'];
				var values = [100, 100-unprot, con, unprot];
				//var colores = ['green','orange'];
				var colores = ['rgb(151, 188, 188)','rgb(255, 204, 115)'];
			}
			//console.log("prot<unprot: ", prot<unprot);
			var data = [{
				'type':'sunburst',
				'labels':labels,
				'parents':parents,
				//values = [prot, cot, unprot],
				'values':values,
				'marker':{line: {width: 2}},
				'branchvalues':'total',
				hovertemplate: ['100%',100-unprot+'%',con+'%',unprot+'%']

				//rotation: 270,
				//direction: 'counterclockwise',
			}];
			var layout = {
			  margin: {l: 0, r: 0, b: 0, t: 0},
			  width: 450,
			  height: 450,
			  sunburstcolorway:colores,
			  extendsunburstcolorway: false,
			  showlegend: true,
			  hoverformat: ".2f"
			};
			setTimeout(function(){
				Plot3('protConn'+posGrafica, data, layout, posGrafica);
			},10);
			// setTimeout(plot3, 'protConn'+posGrafica, data, layout, posGrafica);
		}
	});
}

function getValue(array, variable){
	variable=parseInt(variable);
	return getAvg(array);
	/*switch (variable){
		case 2: return getSum(array);
		case 5: return getAvg(array);
		case 3: return getMax(array);
		case 4: return getMin(array);
	}*/
}
function getMax(array){
	//console.log("entré a maxima");
	return Math.max.apply(Math, array);
}
function getMin(array){
	return Math.min.apply(Math, array);
}
function getSum(array) {
  return array.reduce(function (p, c) {
	return p + c;
  });
}
function getAvg(array) {
  return array.reduce(function (p, c) {
    return p + c;
  }) / array.length;
}
function getMedian(data){
	//hacer sort de data
	data.sort(function(a, b){return a - b});
	var n = data.length;
	if(n % 2 == 1){
		return data[Math.floor(n/2)+1];
	}
	else{
		var sum = data[Math.floor(n/2)] + data[(Math.floor(n/2)+1)];
		return sum/2;
	}
}
function getTitle(variable, idTemporada, forzamiento,anp){
	var titVar = '';
	var titVarU = '(°C)';
	var titForz = '';
	if(variable == 2){
		titVar = 'Precipitación Total';
		titVarU = '(mm)';
	} else if(variable == 3){
		titVar = 'Temperatura máxima';		
	} else if(variable == 4){
		titVar = 'Temperatura mínima';
	} else {
		titVar = 'Temperatura promedio';
	}
	var titTemp = '';
	if(idTemporada == 1){
		titTemp = 'anual';
	}
	else if(idTemporada == 2){
		titTemp = 'Ene-Feb-Mar';
	}
	else if(idTemporada == 3){
		titTemp = 'Abr-May-Jun';
	}
	else if(idTemporada == 4){
		titTemp = 'Jul-Ago-Sep';
	}
	else {
		titTemp = 'Oct-Nov-Dic';
	}
	if(forzamiento == 1){		
		titForz = 'RCP 4.5';
	}else{		
		titForz = 'RCP 8.5';
	}
	return [titVar, titVarU, titTemp, titForz];
}
function graphicModels(years,n,anp,p,variable,forzamiento,idTemporada){
	var temp = 0;
	if(variable == 2){
		arregloDatos = bioPrecT[anp];
	} else if(variable == 3){
		arregloDatos = bioTempPMax[anp];
	} else if(variable == 4){
		arregloDatos = bioTempPMin[anp];
	} else {
		arregloDatos = bioTempPMean[anp];
	}
	// console.log('years length: ', years[0].length);
	// console.log('n: ', n);
	// console.log('anp: ', anp);
	// console.log('p: ', p);
	// console.log('variable: ', variable);
	var arregloDatos;	
	var tT=getTitle(variable,idTemporada,forzamiento,anp);
	var titVar=tT[0],titVarU=tT[1],titTemp=tT[2],titForz=tT[3];
	/////Indices	
	//////
	var indAct;
	if(forzamiento == 1){
		indAct = indHist.concat(indCNR45, indMPI45, indHAD45, indGFD45);		
	}else{
		indAct = indHist.concat(indCNR85, indMPI85, indHAD85, indGFD85);		
	}
	//var indAct = indHist.concat(indCNR, indMPI, indHAD);
	//var indAct = indHist.concat(indCNR, indMPI);
	//var indAct = indHist.concat(indCNR);

	var data=[];	
	
	

	var symbols = ['circle','circle-open','circle-open-dot',
					'square','square-open-dot','square-open','square','square-open-dot','square-open',
					'diamond','diamond-open-dot','diamond-open','diamond','diamond-open-dot','diamond-open',
					'star','star-open-dot','star','star-open','star-open-dot','star-open',
					'triangle','triangle-open-dot','triangle-open','triangle','triangle-open-dot','triangle-open'];

	var symbolsN = ['circle','circle','circle',
					'square','square','square','square','square','square',
					'diamond','diamond','diamond','diamond','diamond','diamond',
					'star','star','star','star','star','star',
					'triangle','triangle','triangle','triangle','triangle','triangle'];
	
	/*var colors = ['rgba(0, 0, 0, 1.0)','rgba(0, 0, 0, 1.0)','rgba(0, 0, 0, 1.0)',
					'rgba(0, 113, 188, 0.80)','rgba(0, 113, 188, 0.80)','rgba(0, 113, 188, 0.80)','rgba(0, 113, 188, 0.80)','rgba(0, 113, 188, 0.80)','rgba(0, 113, 188, 0.80)',
					'rgba(173, 57, 68, 0.80)','rgba(173, 57, 68, 0.80)','rgba(173, 57, 68, 0.80)','rgba(173, 57, 68, 0.80)','rgba(173, 57, 68, 0.80)','rgba(173, 57, 68, 0.80)',
					'rgba(193, 153, 121, 0.80)','rgba(193, 153, 121, 0.80)','rgba(193, 153, 121, 0.80)','rgba(193, 153, 121, 0.80)','rgba(193, 153, 121, 0.80)','rgba(193, 153, 121, 0.80)',
					'rgba(209, 199, 3, 1.0)','rgba(209, 199, 3, 1.0)','rgba(209, 199, 3, 1.0)','rgba(209, 199, 3, 1.0)','rgba(209, 199, 3, 1.0)','rgba(209, 199, 3, 1.0)'];*/
	var colors = ['rgba(0, 0, 0, 1.0)','rgba(0, 0, 0, 1.0)','rgba(0, 0, 0, 1.0)',
				'rgba(0, 113, 188, 1.00)','rgba(0, 113, 188, 1.00)','rgba(0, 113, 188, 1.00)','rgba(0, 113, 188, 1.00)','rgba(0, 113, 188, 1.00)','rgba(0, 113, 188, 1.00)',
				'rgba(173, 57, 68, 1.0)','rgba(173, 57, 68, 1.0)','rgba(173, 57, 68, 1.0)','rgba(173, 57, 68, 1.0)','rgba(173, 57, 68, 1.0)','rgba(173, 57, 68, 1.0)',
				'rgba(193, 153, 121, 1.0)','rgba(193, 153, 121, 1.0)','rgba(193, 153, 121, 1.0)','rgba(193, 153, 121, 1.0)','rgba(193, 153, 121, 1.0)','rgba(193, 153, 121, 1.0)',
				'rgba(193, 109, 68, 1.0)','rgba(193, 109, 68, 1.0)','rgba(193, 109, 68, 1.0)','rgba(193, 109, 68, 1.0)','rgba(193, 109, 68, 1.0)','rgba(193, 109, 68, 1.0)'];
	
	var nn = indAct.length;
	var promedio = [0,0,0];
	var legends = forzamiento==1?legends45:legends85;
	for(var t=1;t<nn;t++){
		var ind = indAct[t];
		//para la MEDIANA
		//getAvg(years[0][ind].map(Number))],
		//console.log(getMedian(years[0][ind].map(Number)));
		///////
		//para ocultar legendas:
		var flag = false;
		if(legends.indexOf(ind) != -1){
			flag = true;
		}
		//para calcular promedios por eras:
		//console.log('modelsIND: ', models[ind]);
		if(labels[ind] == '2015-2039')
			promedio[0]+= getValue(years[0][ind].map(Number),variable);//arregloDatos[ind];//getAvg(years[0][ind].map(Number));
		else if(labels[ind] == '2045-2069')
			promedio[1]+= getValue(years[0][ind].map(Number),variable);//arregloDatos[ind];//getAvg(years[0][ind].map(Number));
		else if(labels[ind] == '2075-2099')
			promedio[2]+= getValue(years[0][ind].map(Number),variable);//arregloDatos[ind];//getAvg(years[0][ind].map(Number));

		//console.log('average: ', getAvg(years[0][t].map(Number)));
		//promedio += getAvg(years[0][ind].map(Number));
		//console.log(ind,arregloDatos[ind][0]);
		data[t-1] = {
			x: [labels[ind]],
			y: [getValue(years[0][ind].map(Number),variable)],//arregloDatos[ind]],//getAvg(years[0][ind].map(Number))],
			//name: labels[t-1],
			type: 'scatter',
  			mode: 'markers',
			name: models[ind],
			showlegend: flag,
			//legendgroup: labels[ind],
			marker:{ 
				color: colors[ind],
				symbol: symbolsN[ind],
				size: 10,
			    //line: {
			      //color: 'rgb(231, 99, 250)',
			      //color: getColor(ind,parseInt(variable),false),
			      //width: 2
			    //}
			},

		};
	}
	for(var i=0; i<3; i++){
		var flag = false;
		var labelProm = ['2015-2039','2045-2069','2075-2099'];
		if(i == 0)
			flag = true;
		//console.log('data pal promedio: ', labels[(i+1)+4]);
		data[data.length] = {
			x: [labelProm[i]],
			y: [promedio[i]/4],
			//name: labels[t-1],
			type: 'scatter',
  			mode: 'markers',
			name: 'Promedio',
			showlegend: flag,
			//legendgroup: 'Promedio',
			marker:{ 
				color: 'rgb(0,0,0)',
				symbol: 'circle-open',
				size: 10,
			    line: {
			      //color: 'rgb(231, 99, 250)',
			      color: getColor(ind,parseInt(variable),false),
			      width: 2
			    }
			},

		};	
	}
	var layout = {
		title: '<b>'+titForz+'</b>',
		yaxis: {title: '<b>'+titVar+' '+titTemp+' '+titVarU+'</b>', hoverformat: '.2f', titlefont:{color: getColor(ind,parseInt(variable),false)}},
		legend: {"orientation": "h"},
		width: 550,
		height: 550,
		font: {
				//color: getColor(ind,parseInt(variable),false),
				color: 'rgb(0,0,0)',
				//family: 'freight-sans-pro',
				family: 'Open Sans',
				size: '14'
			}
   		//xaxis: { type: 'category' }
	};
	var idNext = p==3?(nextId++):anp;
	var posGrafica = getBlankPos(idNext,p);

	setTimeout(function(){
		Plot2('newPlot'+posGrafica, data, layout,posGrafica);
	},10);
	
	
}
function getMin(arr){
	var min = arr[0];
	for(var i = i; i < arr.length; i++){
		if(arr[i] < min){
			min = arr[i];
		}
	}
	return min;
}
function getMax(arr){
	var max = arr[0];
	for(var i = i; i < arr.length; i++){
		if(arr[i] > max){
			max = arr[i];
		}
	}
	return max;
}
function graphicBoxPlot(years, n, anp, p, variable,forzamiento,modelo,idTemporada){
	var tT=getTitle(variable,idTemporada,forzamiento,anp);
	var titVar=tT[0],titVarU=tT[1],titTemp=tT[2],titForz=tT[3];
	var modeloStr;
	var forzStr = forzamiento == 1?'RCP 4.5':'RCP 8.5';
	if(modelo == 1){
		modeloStr = "indCNR";
	}else if(modelo == 2){
		modeloStr = "indGFD";
	}else if(modelo == 3){
		modeloStr = "indHAD";
	}else{
		modeloStr = "indMPI";
	}
	if(p != 3){
		anp=anp.split(',');
	}
	divs = [];
	var indAct;
	if(forzamiento == 1){
		eval("indAct=indHist.concat("+modeloStr+"45)");
	}else{
		eval("indAct=indHist.concat("+modeloStr+"85)");
	}
	var idNext = p==3?(nextId++):anp;
	var posGrafica = getBlankPos(idNext,p);	
	var mins = [];
	var maxs = [];
	var data = [];
	var str = '';
	var statics = [];
	switch(parseInt(variable)){
		case 2: str = 'Precipitacion total anual (mm)'; break;
		case 3: str = 'Temperatura máxima anual (°C)'; break;
		case 4: str = 'Temperatura mínima anual (°C)'; break;
		case 5: str = 'Temperatura media anual (°C)'; break;			
	}
	//console.log("");
	//console.log("");
	//t comienza en 1 para saltar el periodo 1910
	for(var t=1;t<indAct.length;t++){
		var ind = indAct[t];
		mins.push(getMin(years[0][ind]));
		maxs.push(getMax(years[0][ind]));
		//t se reduce en uno para comenzar en cero en la estructura DATA
		statics.push(years[0][ind]);
		data[t-1] = {
			y: years[0][ind], 
			type: 'box',
			name: labels[ind],
			marker: { 
				color: getColor(ind,parseInt(variable),false),
			  },
			fillcolor: getColor(ind,parseInt(variable),false),
			boxpoints: false,
			stadisticForce: [0,0,0,0,0,0,0,0]
		};
	}
	var layout={
		showlegend: false,
		title: '<b>'+models[ind]+' '+forzStr+'</b>',
		yaxis: {title: '<b>'+titVar+' '+titTemp+' '+titVarU+'</b>', hoverformat: '.2f', titlefont:{color: getColor(ind,parseInt(variable),false)}},//{title: '<b>'+str+'</b>',titlefont:{color: getColor(6,parseInt(variable),true)}},
		//paper_bgcolor: '#F5F6F4',
		paper_bgcolor: '#FFFFFF',
		width: 550,
		height: 550,
		staticPlot: true,
		font: {
			color: 'rgb(0,0,0)',
			//color: getColor(ind,parseInt(variable),false),
			//family: 'freight-sans-pro',
			family: 'Open Sans',
			
			size: '14'
		}
	};

	//Linea de tendencia
	/*var primero = statics[0];
	var segundo = statics[4];
	
	primero = primero[parseInt(primero.length/2)];
	segundo = segundo[parseInt(segundo.length/2)];

	data[5] = {
		y : [parseFloat(primero).toFixed(2), parseFloat(segundo).toFixed(2)],
		x : [labels[1], labels[7]],
		mode: 'lines+markers',
		type: 'scatter'
	};*/
	//console.log('labels: ', labels);
	//console.log('primero: ', parseFloat(primero).toFixed(2));
	//console.log('segundo: ', parseFloat(segundo).toFixed(2));

	//

	var strDiv = "plot"+posGrafica;
	divs[i] = strDiv;
	setTimeout(function(){
		Plot(strDiv, data, layout, posGrafica);
	},10);
	minPdf[posGrafica] = mins;
	maxPdf[posGrafica] = maxs;
	if(p == 3) anp = 0;
	yearsStatics[anp] = statics;
	
	
}

function fillTableInfoExporta(anp, p){
	if(p == 0){
		var preci = bioTempPreInfo2[anp];
		var maxima = bioTempMaxInfo2[anp];
		var media = bioTempMedInfo2[anp];
		var minima = bioTempMinInfo2[anp];
	}
	else if(p == 1){
		var preci = bioTempPreInfo2E[anp];
		var maxima = bioTempMaxInfo2E[anp];
		var media = bioTempMedInfo2E[anp];
		var minima = bioTempMinInfo2E[anp];
	}

	var tmin145t = [minima[3],minima[9],minima[15],minima[21]];
	var tmin185t = [minima[4],minima[10],minima[16],minima[22]];
	var tmin245t = [minima[5],minima[11],minima[17],minima[23]];
	var tmin285t = [minima[6],minima[12],minima[18],minima[24]];
	var tmin345t = [minima[7],minima[13],minima[19],minima[25]];
	var tmin385t = [minima[8],minima[14],minima[20],minima[26]];
	var tmean145t = [media[3],media[9],media[15],media[21]];
	var tmean185t = [media[4],media[10],media[16],media[22]];
	var tmean245t = [media[5],media[11],media[17],media[23]];
	var tmean285t = [media[6],media[12],media[18],media[24]];
	var tmean345t = [media[7],media[13],media[19],media[25]];
	var tmean385t = [media[8],media[14],media[20],media[26]];
	var tmax145t = [maxima[3],maxima[9],maxima[15],maxima[21]];
	var tmax185t = [maxima[4],maxima[10],maxima[16],maxima[22]];
	var tmax245t = [maxima[5],maxima[11],maxima[17],maxima[23]];
	var tmax285t = [maxima[6],maxima[12],maxima[18],maxima[24]];
	var tmax345t = [maxima[7],maxima[13],maxima[19],maxima[25]];
	var tmax385t = [maxima[8],maxima[14],maxima[20],maxima[26]];		
	var precp145t = [preci[3],preci[9],preci[15],preci[21]];
	var precp185t = [preci[4],preci[10],preci[16],preci[22]];
	var precp245t = [preci[5],preci[11],preci[17],preci[23]];
	var precp285t = [preci[6],preci[12],preci[18],preci[24]];
	var precp345t = [preci[7],preci[13],preci[19],preci[25]];
	var precp385t = [preci[8],preci[14],preci[20],preci[26]];		
	var minp1145 = Math.round((Math.min.apply(Math,tmin145t)-minima[2])*100, 2)/100;
	var minp1245 = Math.round((Math.max.apply(Math,tmin145t)-minima[2])*100, 2)/100;
	var minp2145 = Math.round((Math.min.apply(Math,tmin245t)-minima[2])*100, 2)/100;
	var minp2245 = Math.round((Math.max.apply(Math,tmin245t)-minima[2])*100, 2)/100;
	var minp3145 = Math.round((Math.min.apply(Math,tmin345t)-minima[2])*100, 2)/100;
	var minp3245 = Math.round((Math.max.apply(Math,tmin345t)-minima[2])*100, 2)/100;		
	var meanp1145 = Math.round((Math.min.apply(Math,tmean145t)-media[2])*100, 2)/100;
	var meanp1245 = Math.round((Math.max.apply(Math,tmean145t)-media[2])*100, 2)/100;
	var meanp2145 = Math.round((Math.min.apply(Math,tmean245t)-media[2])*100, 2)/100;
	var meanp2245 = Math.round((Math.max.apply(Math,tmean245t)-media[2])*100, 2)/100;
	var meanp3145 = Math.round((Math.min.apply(Math,tmean345t)-media[2])*100, 2)/100;
	var meanp3245 = Math.round((Math.max.apply(Math,tmean345t)-media[2])*100, 2)/100;		
	var maxp1145 = Math.round((Math.min.apply(Math,tmax145t)-maxima[2])*100, 2)/100;
	var maxp1245 = Math.round((Math.max.apply(Math,tmax145t)-maxima[2])*100, 2)/100;
	var maxp2145 = Math.round((Math.min.apply(Math,tmax245t)-maxima[2])*100, 2)/100;
	var maxp2245 = Math.round((Math.max.apply(Math,tmax245t)-maxima[2])*100, 2)/100;
	var maxp3145 = Math.round((Math.min.apply(Math,tmax345t)-maxima[2])*100, 2)/100;
	var maxp3245 = Math.round((Math.max.apply(Math,tmax345t)-maxima[2])*100, 2)/100;
	var precp1145 = Math.round((Math.min.apply(Math,precp145t)-preci[2])*100, 2)/100;
	var precp1245 = Math.round((Math.max.apply(Math,precp145t)-preci[2])*100, 2)/100;
	var precp2145 = Math.round((Math.min.apply(Math,precp245t)-preci[2])*100, 2)/100;
	var precp2245 = Math.round((Math.max.apply(Math,precp245t)-preci[2])*100, 2)/100;
	var precp3145 = Math.round((Math.min.apply(Math,precp345t)-preci[2])*100, 2)/100;
	var precp3245 = Math.round((Math.max.apply(Math,precp345t)-preci[2])*100, 2)/100;		
	var pprecp1145 = Math.round((precp1145/preci[2])*100, 2);
	var pprecp1245 = Math.round((precp1245/preci[2])*100, 2);
	var pprecp2145 = Math.round((precp2145/preci[2])*100, 2);
	var pprecp2245 = Math.round((precp2245/preci[2])*100, 2);
	var pprecp3145 = Math.round((precp3145/preci[2])*100, 2);
	var pprecp3245 = Math.round((precp3245/preci[2])*100, 2);
	var minp1185 = Math.round((Math.min.apply(Math,tmin185t)-minima[2])*100, 2)/100;
	var minp1285 = Math.round((Math.max.apply(Math,tmin185t)-minima[2])*100, 2)/100;
	var minp2185 = Math.round((Math.min.apply(Math,tmin285t)-minima[2])*100, 2)/100;
	var minp2285 = Math.round((Math.max.apply(Math,tmin285t)-minima[2])*100, 2)/100;
	var minp3185 = Math.round((Math.min.apply(Math,tmin385t)-minima[2])*100, 2)/100;
	var minp3285 = Math.round((Math.max.apply(Math,tmin385t)-minima[2])*100, 2)/100;		
	var meanp1185 = Math.round((Math.min.apply(Math,tmean185t)-media[2])*100, 2)/100;
	var meanp1285 = Math.round((Math.max.apply(Math,tmean185t)-media[2])*100, 2)/100;
	var meanp2185 = Math.round((Math.min.apply(Math,tmean285t)-media[2])*100, 2)/100;
	var meanp2285 = Math.round((Math.max.apply(Math,tmean285t)-media[2])*100, 2)/100;
	var meanp3185 = Math.round((Math.min.apply(Math,tmean385t)-media[2])*100, 2)/100;
	var meanp3285 = Math.round((Math.max.apply(Math,tmean385t)-media[2])*100, 2)/100;		
	var maxp1185 = Math.round((Math.min.apply(Math,tmax185t)-maxima[2])*100, 2)/100;
	var maxp1285 = Math.round((Math.max.apply(Math,tmax185t)-maxima[2])*100, 2)/100;
	var maxp2185 = Math.round((Math.min.apply(Math,tmax285t)-maxima[2])*100, 2)/100;
	var maxp2285 = Math.round((Math.max.apply(Math,tmax285t)-maxima[2])*100, 2)/100;
	var maxp3185 = Math.round((Math.min.apply(Math,tmax385t)-maxima[2])*100, 2)/100;
	var maxp3285 = Math.round((Math.max.apply(Math,tmax385t)-maxima[2])*100, 2)/100;
	var precp1185 = Math.round((Math.min.apply(Math,precp185t)-preci[2])*100, 2)/100;
	var precp1285 = Math.round((Math.max.apply(Math,precp185t)-preci[2])*100, 2)/100;
	var precp2185 = Math.round((Math.min.apply(Math,precp285t)-preci[2])*100, 2)/100;
	var precp2285 = Math.round((Math.max.apply(Math,precp285t)-preci[2])*100, 2)/100;
	var precp3185 = Math.round((Math.min.apply(Math,precp385t)-preci[2])*100, 2)/100;
	var precp3285 = Math.round((Math.max.apply(Math,precp385t)-preci[2])*100, 2)/100;
	var pprecp1185 = Math.round((precp1185/preci[2])*100, 2);
	var pprecp1285 = Math.round((precp1285/preci[2])*100, 2);
	var pprecp2185 = Math.round((precp2185/preci[2])*100, 2);
	var pprecp2285 = Math.round((precp2285/preci[2])*100, 2);
	var pprecp3185 = Math.round((precp3185/preci[2])*100, 2);
	var pprecp3285 = Math.round((precp3285/preci[2])*100, 2);

	// arrInfoTable.push([minp1145, minp1245, minp2145, minp2245, minp3145, minp3245, minp1185, minp1285, minp2185, minp2285, minp3185, minp3285, meanp1145, meanp1245,
	// meanp2145, meanp2245, meanp3145, meanp3245, meanp1185, meanp1285, meanp2185, meanp2285, meanp3185, meanp3285, maxp1145, maxp1245, maxp2145, maxp2245, maxp3145, 
	// maxp3245, maxp1185, maxp1285, maxp2185, maxp2285, maxp3185, maxp3285, precp1145, precp1245, precp2145, precp2245, precp3145, precp3245, precp1185, precp1285, 
	// precp2185, precp2285, precp3185, precp3285, pprecp1145, pprecp1245, pprecp2145, pprecp2245, pprecp3145, pprecp3245, pprecp1185, pprecp1285, pprecp2185, pprecp2285, 
	// pprecp3185, pprecp3285]);

	//arrInfoTable = [];
	arrInfoTable.push([minp1145, minp1245, minp1185, minp1285, minp2145, minp2245, minp2185, minp2285, minp3145, minp3245, minp3185, minp3285,
	meanp1145, meanp1245, meanp1185, meanp1285, meanp2145, meanp2245, meanp2185, meanp2285, meanp3145, meanp3245, meanp3185, meanp3285,
	maxp1145, maxp1245, maxp1185, maxp1285, maxp2145, maxp2245, maxp2185, maxp2285, maxp3145, maxp3245, maxp3185, maxp3285,
	precp1145, precp1245, precp1185, precp1285, pprecp1145, pprecp1245, pprecp1185, pprecp1285, precp2145, precp2245, precp2185, precp2285, 
	pprecp2145, pprecp2245, pprecp2185, pprecp2285, precp3145, precp3245, precp3185, precp3285, pprecp3145, pprecp3245, pprecp3185, pprecp3285]);

	//console.log("arreglo: ", arrInfoTable[0]);


		 
}

function fillTableInfo(graficaPos, anp, pol){
	console.log('P en fillTableInfo: ', pol);
	console.log('mun: ', anp);
	console.log('lugar en las graficas: ', graficaPos);
	var titulo;
	$("#graficasC"+graficaPos).find(".data-item").show();
	$("#graficasC"+graficaPos).find(".data-subtitle").show();
	//copiar titulo para anp o estados en el modulo de conectividad
	if(pol == 0 || pol == 1){
		//si es anp buscar subitutlo del anp
		//si es entidad, no hacer nada
		if(pol == 0)
			titulo = tituloANPF(anp,"#FFF");
		else
			titulo = nombresEstados[anp];
		
		$("#graficasC"+graficaPos).find(".data-title").html(titulo);
		//Aniadir titulo al modulo de conectividad
		if($("#conectividadC"+graficaPos).find(".data-title").length > 0){
			$("#conectividadC"+graficaPos).find(".data-title").remove();
			$("#conectividadC"+graficaPos).find(".graph-data").prepend(
			$("#graficasC"+graficaPos).find(".data-title").clone());
		}
		else{
			$("#conectividadC"+graficaPos).find(".graph-data").prepend(
			$("#graficasC"+graficaPos).find(".data-title").clone());
		}
		
		// console.log("graficasC: ", $("#graficasC"+graficaPos).find(".graph-data").length);
		// console.log("conectividadC: ", $("#conectividadC"+graficaPos).find(".graph-data").length);
		// console.log("madeUp shit: ", $("#conectividadC"+graficaPos).find(".graph-dataaaa").length);
		//$( ".hello" ).clone().appendTo( ".goodbye" );
		//$("#conectividadC"+graficaPos).find(".data-title").html(titulo);
		
		var tmin145t = [t_min[3],t_min[9],t_min[15],t_min[21]];
		var tmin185t = [t_min[4],t_min[10],t_min[16],t_min[22]];
		var tmin245t = [t_min[5],t_min[11],t_min[17],t_min[23]];
		var tmin285t = [t_min[6],t_min[12],t_min[18],t_min[24]];
		var tmin345t = [t_min[7],t_min[13],t_min[19],t_min[25]];
		var tmin385t = [t_min[8],t_min[14],t_min[20],t_min[26]];
		var tmean145t = [t_mean[3],t_mean[9],t_mean[15],t_mean[21]];
		var tmean185t = [t_mean[4],t_mean[10],t_mean[16],t_mean[22]];
		var tmean245t = [t_mean[5],t_mean[11],t_mean[17],t_mean[23]];
		var tmean285t = [t_mean[6],t_mean[12],t_mean[18],t_mean[24]];
		var tmean345t = [t_mean[7],t_mean[13],t_mean[19],t_mean[25]];
		var tmean385t = [t_mean[8],t_mean[14],t_mean[20],t_mean[26]];
		var tmax145t = [t_max[3],t_max[9],t_max[15],t_max[21]];
		var tmax185t = [t_max[4],t_max[10],t_max[16],t_max[22]];
		var tmax245t = [t_max[5],t_max[11],t_max[17],t_max[23]];
		var tmax285t = [t_max[6],t_max[12],t_max[18],t_max[24]];
		var tmax345t = [t_max[7],t_max[13],t_max[19],t_max[25]];
		var tmax385t = [t_max[8],t_max[14],t_max[20],t_max[26]];		
		var precp145t = [t_prec[3],t_prec[9],t_prec[15],t_prec[21]];
		var precp185t = [t_prec[4],t_prec[10],t_prec[16],t_prec[22]];
		var precp245t = [t_prec[5],t_prec[11],t_prec[17],t_prec[23]];
		var precp285t = [t_prec[6],t_prec[12],t_prec[18],t_prec[24]];
		var precp345t = [t_prec[7],t_prec[13],t_prec[19],t_prec[25]];
		var precp385t = [t_prec[8],t_prec[14],t_prec[20],t_prec[26]];		
		var minp1145 = Math.round((Math.min.apply(Math,tmin145t)-t_min[2])*100, 2)/100;
		var minp1245 = Math.round((Math.max.apply(Math,tmin145t)-t_min[2])*100, 2)/100;
		var minp2145 = Math.round((Math.min.apply(Math,tmin245t)-t_min[2])*100, 2)/100;
		var minp2245 = Math.round((Math.max.apply(Math,tmin245t)-t_min[2])*100, 2)/100;
		var minp3145 = Math.round((Math.min.apply(Math,tmin345t)-t_min[2])*100, 2)/100;
		var minp3245 = Math.round((Math.max.apply(Math,tmin345t)-t_min[2])*100, 2)/100;		
		var meanp1145 = Math.round((Math.min.apply(Math,tmean145t)-t_mean[2])*100, 2)/100;
		var meanp1245 = Math.round((Math.max.apply(Math,tmean145t)-t_mean[2])*100, 2)/100;
		var meanp2145 = Math.round((Math.min.apply(Math,tmean245t)-t_mean[2])*100, 2)/100;
		var meanp2245 = Math.round((Math.max.apply(Math,tmean245t)-t_mean[2])*100, 2)/100;
		var meanp3145 = Math.round((Math.min.apply(Math,tmean345t)-t_mean[2])*100, 2)/100;
		var meanp3245 = Math.round((Math.max.apply(Math,tmean345t)-t_mean[2])*100, 2)/100;		
		var maxp1145 = Math.round((Math.min.apply(Math,tmax145t)-t_max[2])*100, 2)/100;
		var maxp1245 = Math.round((Math.max.apply(Math,tmax145t)-t_max[2])*100, 2)/100;
		var maxp2145 = Math.round((Math.min.apply(Math,tmax245t)-t_max[2])*100, 2)/100;
		var maxp2245 = Math.round((Math.max.apply(Math,tmax245t)-t_max[2])*100, 2)/100;
		var maxp3145 = Math.round((Math.min.apply(Math,tmax345t)-t_max[2])*100, 2)/100;
		var maxp3245 = Math.round((Math.max.apply(Math,tmax345t)-t_max[2])*100, 2)/100;
		var precp1145 = Math.round((Math.min.apply(Math,precp145t)-t_prec[2])*100, 2)/100;
		var precp1245 = Math.round((Math.max.apply(Math,precp145t)-t_prec[2])*100, 2)/100;
		var precp2145 = Math.round((Math.min.apply(Math,precp245t)-t_prec[2])*100, 2)/100;
		var precp2245 = Math.round((Math.max.apply(Math,precp245t)-t_prec[2])*100, 2)/100;
		var precp3145 = Math.round((Math.min.apply(Math,precp345t)-t_prec[2])*100, 2)/100;
		var precp3245 = Math.round((Math.max.apply(Math,precp345t)-t_prec[2])*100, 2)/100;		
		var pprecp1145 = Math.round((precp1145/t_prec[2])*100, 2);
		var pprecp1245 = Math.round((precp1245/t_prec[2])*100, 2);
		var pprecp2145 = Math.round((precp2145/t_prec[2])*100, 2);
		var pprecp2245 = Math.round((precp2245/t_prec[2])*100, 2);
		var pprecp3145 = Math.round((precp3145/t_prec[2])*100, 2);
		var pprecp3245 = Math.round((precp3245/t_prec[2])*100, 2);
		var minp1185 = Math.round((Math.min.apply(Math,tmin185t)-t_min[2])*100, 2)/100;
		var minp1285 = Math.round((Math.max.apply(Math,tmin185t)-t_min[2])*100, 2)/100;
		var minp2185 = Math.round((Math.min.apply(Math,tmin285t)-t_min[2])*100, 2)/100;
		var minp2285 = Math.round((Math.max.apply(Math,tmin285t)-t_min[2])*100, 2)/100;
		var minp3185 = Math.round((Math.min.apply(Math,tmin385t)-t_min[2])*100, 2)/100;
		var minp3285 = Math.round((Math.max.apply(Math,tmin385t)-t_min[2])*100, 2)/100;		
		var meanp1185 = Math.round((Math.min.apply(Math,tmean185t)-t_mean[2])*100, 2)/100;
		var meanp1285 = Math.round((Math.max.apply(Math,tmean185t)-t_mean[2])*100, 2)/100;
		var meanp2185 = Math.round((Math.min.apply(Math,tmean285t)-t_mean[2])*100, 2)/100;
		var meanp2285 = Math.round((Math.max.apply(Math,tmean285t)-t_mean[2])*100, 2)/100;
		var meanp3185 = Math.round((Math.min.apply(Math,tmean385t)-t_mean[2])*100, 2)/100;
		var meanp3285 = Math.round((Math.max.apply(Math,tmean385t)-t_mean[2])*100, 2)/100;		
		var maxp1185 = Math.round((Math.min.apply(Math,tmax185t)-t_max[2])*100, 2)/100;
		var maxp1285 = Math.round((Math.max.apply(Math,tmax185t)-t_max[2])*100, 2)/100;
		var maxp2185 = Math.round((Math.min.apply(Math,tmax285t)-t_max[2])*100, 2)/100;
		var maxp2285 = Math.round((Math.max.apply(Math,tmax285t)-t_max[2])*100, 2)/100;
		var maxp3185 = Math.round((Math.min.apply(Math,tmax385t)-t_max[2])*100, 2)/100;
		var maxp3285 = Math.round((Math.max.apply(Math,tmax385t)-t_max[2])*100, 2)/100;
		var precp1185 = Math.round((Math.min.apply(Math,precp185t)-t_prec[2])*100, 2)/100;
		var precp1285 = Math.round((Math.max.apply(Math,precp185t)-t_prec[2])*100, 2)/100;
		var precp2185 = Math.round((Math.min.apply(Math,precp285t)-t_prec[2])*100, 2)/100;
		var precp2285 = Math.round((Math.max.apply(Math,precp285t)-t_prec[2])*100, 2)/100;
		var precp3185 = Math.round((Math.min.apply(Math,precp385t)-t_prec[2])*100, 2)/100;
		var precp3285 = Math.round((Math.max.apply(Math,precp385t)-t_prec[2])*100, 2)/100;
		var pprecp1185 = Math.round((precp1185/t_prec[2])*100, 2);
		var pprecp1285 = Math.round((precp1285/t_prec[2])*100, 2);
		var pprecp2185 = Math.round((precp2185/t_prec[2])*100, 2);
		var pprecp2285 = Math.round((precp2285/t_prec[2])*100, 2);
		var pprecp3185 = Math.round((precp3185/t_prec[2])*100, 2);
		var pprecp3285 = Math.round((precp3285/t_prec[2])*100, 2);		
		$("#graficasC"+graficaPos).find(".minp1145").html(minp1145);
		$("#graficasC"+graficaPos).find(".minp1245").html(minp1245);
		$("#graficasC"+graficaPos).find(".minp2145").html(minp2145);
		$("#graficasC"+graficaPos).find(".minp2245").html(minp2245);
		$("#graficasC"+graficaPos).find(".minp3145").html(minp3145);
		$("#graficasC"+graficaPos).find(".minp3245").html(minp3245);
		$("#graficasC"+graficaPos).find(".minp1185").html(minp1185);
		$("#graficasC"+graficaPos).find(".minp1285").html(minp1285);
		$("#graficasC"+graficaPos).find(".minp2185").html(minp2185);
		$("#graficasC"+graficaPos).find(".minp2285").html(minp2285);
		$("#graficasC"+graficaPos).find(".minp3185").html(minp3185);
		$("#graficasC"+graficaPos).find(".minp3285").html(minp3285);
		$("#graficasC"+graficaPos).find(".meanp1145").html(meanp1145);
		$("#graficasC"+graficaPos).find(".meanp1245").html(meanp1245);
		$("#graficasC"+graficaPos).find(".meanp2145").html(meanp2145);
		$("#graficasC"+graficaPos).find(".meanp2245").html(meanp2245);
		$("#graficasC"+graficaPos).find(".meanp3145").html(meanp3145);
		$("#graficasC"+graficaPos).find(".meanp3245").html(meanp3245);
		$("#graficasC"+graficaPos).find(".meanp1185").html(meanp1185);
		$("#graficasC"+graficaPos).find(".meanp1285").html(meanp1285);
		$("#graficasC"+graficaPos).find(".meanp2185").html(meanp2185);
		$("#graficasC"+graficaPos).find(".meanp2285").html(meanp2285);
		$("#graficasC"+graficaPos).find(".meanp3185").html(meanp3185);
		$("#graficasC"+graficaPos).find(".meanp3285").html(meanp3285);
		$("#graficasC"+graficaPos).find(".maxp1145").html(maxp1145);
		$("#graficasC"+graficaPos).find(".maxp1245").html(maxp1245);
		$("#graficasC"+graficaPos).find(".maxp2145").html(maxp2145);
		$("#graficasC"+graficaPos).find(".maxp2245").html(maxp2245);
		$("#graficasC"+graficaPos).find(".maxp3145").html(maxp3145);
		$("#graficasC"+graficaPos).find(".maxp3245").html(maxp3245);
		$("#graficasC"+graficaPos).find(".maxp1185").html(maxp1185);
		$("#graficasC"+graficaPos).find(".maxp1285").html(maxp1285);
		$("#graficasC"+graficaPos).find(".maxp2185").html(maxp2185);
		$("#graficasC"+graficaPos).find(".maxp2285").html(maxp2285);
		$("#graficasC"+graficaPos).find(".maxp3185").html(maxp3185);
		$("#graficasC"+graficaPos).find(".maxp3285").html(maxp3285);
		$("#graficasC"+graficaPos).find(".precp1145").html(precp1145);
		$("#graficasC"+graficaPos).find(".precp1245").html(precp1245);
		$("#graficasC"+graficaPos).find(".precp2145").html(precp2145);
		$("#graficasC"+graficaPos).find(".precp2245").html(precp2245);
		$("#graficasC"+graficaPos).find(".precp3145").html(precp3145);
		$("#graficasC"+graficaPos).find(".precp3245").html(precp3245);
		$("#graficasC"+graficaPos).find(".precp1185").html(precp1185);
		$("#graficasC"+graficaPos).find(".precp1285").html(precp1285);
		$("#graficasC"+graficaPos).find(".precp2185").html(precp2185);
		$("#graficasC"+graficaPos).find(".precp2285").html(precp2285);
		$("#graficasC"+graficaPos).find(".precp3185").html(precp3185);
		$("#graficasC"+graficaPos).find(".precp3285").html(precp3285);
		$("#graficasC"+graficaPos).find(".pprecp1145").html(pprecp1145);
		$("#graficasC"+graficaPos).find(".pprecp1245").html(pprecp1245);
		$("#graficasC"+graficaPos).find(".pprecp2145").html(pprecp2145);
		$("#graficasC"+graficaPos).find(".pprecp2245").html(pprecp2245);
		$("#graficasC"+graficaPos).find(".pprecp3145").html(pprecp3145);
		$("#graficasC"+graficaPos).find(".pprecp3245").html(pprecp3245);
		$("#graficasC"+graficaPos).find(".pprecp1185").html(pprecp1185);
		$("#graficasC"+graficaPos).find(".pprecp1285").html(pprecp1285);
		$("#graficasC"+graficaPos).find(".pprecp2185").html(pprecp2185);
		$("#graficasC"+graficaPos).find(".pprecp2285").html(pprecp2285);
		$("#graficasC"+graficaPos).find(".pprecp3185").html(pprecp3185);
		$("#graficasC"+graficaPos).find(".pprecp3285").html(pprecp3285);
	}
	else if(pol == 1){
		titulo = nombresEstados[anp];
		$("#graficasC"+graficaPos).find(".data-title").html(titulo);
		$("#graficasC"+graficaPos).find(".data-item").not('.infoG').hide();
		//$("#graficasC"+graficaPos).find(".data-subtitle").hide();
		$("#graficasC"+graficaPos).find(".data-subsubtitle").hide();
	}
	else if(pol == 5){
		console.log('entre a cambiar titulo!');
		//titulo = nombresMunicipios[anp];
		var tit = getNombreMun(anp);
		//console.log('esto quiero poner: ', tit);
		$("#graficasC"+graficaPos).find(".data-title").html(tit);
		$("#graficasC"+graficaPos).find(".data-item").not('.infoG').hide();
		$("#graficasC"+graficaPos).find(".data-subtitle").hide();
		$("#graficasC"+graficaPos).find(".data-subsubtitle").hide();
		$("#infoANP"+graficaPos).hide();
		$("#graficasC"+graficaPos).show();
	}
	else{
		$("#graficasC"+graficaPos).find(".data-title").html("Polígono");
		$("#graficasC"+graficaPos).find(".data-item").not('.infoG').hide();
		$("#graficasC"+graficaPos).find(".data-subtitle").hide();
		$("#graficasC"+graficaPos).find(".data-subsubtitle").hide();
		$("#infoANP"+graficaPos).hide();
	}	
}
function getNombreMun(newIdMun){
	/*var str = newIdMun+'';
	var idEnt, idMun;
	if(str.length == 4){
		idEnt =  parseInt(str[0]);
		idMun = parseInt(str[1]+str[2]+str[3]);
	}
	else{
		idEnt =  parseInt(str[0]+str[1]);
		idMun = parseInt(str[2]+str[3]+str[4]);	
	}return infoMun[idMun][1];*/
	//console.log("newIdMun at getNombreMun: ", newIdMun);
	return infoMun[newIdMun][1];
}
function Plot(div, data, layout, i){
	//console.log("Apunto de graficar!");
	var d3 = Plotly.d3;
	var img_jpg = d3.select('#jpg-export'+i);
	Plotly.newPlot(div, data, layout, {displayModeBar: false}).then(function(gd){
		Plotly.toImage(gd,{height:550,width:550,margin:"auto"}).then(function(url){
			$(".svg-container").css("margin","auto");
			img_jpg.attr("src", url);
			//console.log("Ya nada más regreso la imagen y a la reata");
			//return Plotly.toImage(gd,{format:'jpeg',height:500,width:500});
		})
	});
}
function Plot2(div, data, layout,i){
	var d3 = Plotly.d3;
	var img_jpg = d3.select('#jpg-exportN'+i);
	Plotly.newPlot(div, data, layout, {displayModeBar: false}).then(function(gd){
		gd.on('plotly_legendclick', () => false);
		Plotly.toImage(gd,{height:550,width:550,margin:"auto"}).then(function(url){
			$(".svg-container").css("margin","auto");
			//console.log(url);
			img_jpg.attr("src", url);
			//return Plotly.toImage(gd,{format:'jpeg',height:500,width:500});
		})
	});
	
}

function Plot3(div, data, layout, i){
	var d3 = Plotly.d3;
	var img_jpg = d3.select('#jpg-exportP'+i);
	Plotly.newPlot(div, data, layout, {displayModeBar: false}).then(function(gd){
		gd.on('plotly_legendclick', () => false);
		Plotly.toImage(gd,{height:550,width:550,margin:"auto"}).then(function(url){
			$(".svg-container").css("margin","auto");
			//console.log(url);
			img_jpg.attr("src", url);
			//return Plotly.toImage(gd,{format:'jpeg',height:500,width:500});
		})
	});
}

function Plot4(div, data, layout, i){
	var d3 = Plotly.d3;
	var img_jpg = d3.select('#jpg-exportF'+i);
	Plotly.newPlot(div, data, layout, {displayModeBar: false}).then(function(gd){
		gd.on('plotly_legendclick', () => false);
		Plotly.toImage(gd,{height:550,width:550,margin:"auto"}).then(function(url){
			$(".svg-container").css("margin","auto");
			//console.log(url);
			img_jpg.attr("src", url);
			//return Plotly.toImage(gd,{format:'jpeg',height:500,width:500});
		})
	});
}

function Plot5(div, data, layout, i){
	var d3 = Plotly.d3;
	var img_jpg = d3.select('#jpg-exportT'+i);
	Plotly.newPlot(div, data, layout, {displayModeBar: false}).then(function(gd){
		gd.on('plotly_legendclick', () => false);
		Plotly.toImage(gd,{height:550,width:550,margin:"auto"}).then(function(url){
			$(".svg-container").css("margin","auto");
			//console.log(url);
			img_jpg.attr("src", url);
			//return Plotly.toImage(gd,{format:'jpeg',height:500,width:500});
		})
	});
}

function Plot6(div, data, layout, i){
	var d3 = Plotly.d3;
	var img_jpg = d3.select('#jpg-exportE'+i);
	Plotly.newPlot(div, data, layout, {displayModeBar: false}).then(function(gd){
		gd.on('plotly_legendclick', () => false);
		Plotly.toImage(gd,{height:550,width:550,margin:"auto"}).then(function(url){
			$(".svg-container").css("margin","auto");
			//console.log(url);
			img_jpg.attr("src", url);
			//return Plotly.toImage(gd,{format:'jpeg',height:500,width:500});
		})
	});
}

function Plot7(div, data, layout, i){
	var d3 = Plotly.d3;
	var img_jpg = d3.select('#jpg-exportMann'+i);
	Plotly.newPlot(div, data, layout, {displayModeBar: false}).then(function(gd){
		gd.on('plotly_legendclick', () => false);
		Plotly.toImage(gd,{height:550,width:550,margin:"auto"}).then(function(url){
			$(".svg-container").css("margin","auto");
			//console.log(url);
			img_jpg.attr("src", url);
			//return Plotly.toImage(gd,{format:'jpeg',height:500,width:500});
		})
	});
}

function yearsTransform(anp){
	var orig;
	if(anp == -1){
		orig = yearsExporta[0];
	}else {
		orig = yearsExporta[anp];
	}
	var mapped = [];
	for (var i = 1; i < 27; i++) {
		var result = orig[0][i].map(Number);
		mapped.push(getAvg(result));
	}
	return fixIndex(mapped);
}

function arrayStr2Num(orig){
	var n = orig.length;
	var mapped = [];
	for (var i = 0; i < n; i++) {
		//console.log('tipo orig[i]: ', typeof(orig[i]));
		var result = Number(orig[i]);
		mapped.push(result);
	}
	return mapped;
}

function fixIndex(arr){
	var prom1 = getAvg([arr[2],arr[8],arr[14],arr[20]]);
	var prom2 = getAvg([arr[3],arr[9],arr[15],arr[21]]);
	var prom3 = getAvg([arr[4],arr[10],arr[16],arr[22]]);
	var prom4 = getAvg([arr[5],arr[11],arr[17],arr[23]]);
	var prom5 = getAvg([arr[6],arr[12],arr[18],arr[24]]);
	var prom6 = getAvg([arr[7],arr[13],arr[19],arr[25]]);

	// return [Math.round(arr[0]*100)/100, arr[1],
	// arr[2], arr[8], arr[14], arr[20], prom1,
	// arr[3], arr[9], arr[15], arr[21], prom2,
	// arr[4], arr[10], arr[16], arr[22], prom3,
	// arr[5], arr[11], arr[17], arr[23], prom4,
	// arr[6], arr[12], arr[18], arr[24], prom5,
	// arr[7], arr[13], arr[19], arr[25], prom6];

	return [Math.round(arr[0]*100)/100, Math.round(arr[1]*100)/100,
	Math.round(arr[2]*100)/100, Math.round(arr[8]*100)/100, Math.round(arr[14]*100)/100, Math.round(arr[20]*100)/100, Math.round(prom1*100)/100,
	Math.round(arr[3]*100)/100, Math.round(arr[9]*100)/100, Math.round(arr[15]*100)/100, Math.round(arr[21]*100)/100, Math.round(prom2*100)/100,
	Math.round(arr[4]*100)/100, Math.round(arr[10]*100)/100, Math.round(arr[16]*100)/100, Math.round(arr[22]*100)/100, Math.round(prom3*100)/100,
	Math.round(arr[5]*100)/100, Math.round(arr[11]*100)/100, Math.round(arr[17]*100)/100, Math.round(arr[23]*100)/100, Math.round(prom4*100)/100,
	Math.round(arr[6]*100)/100, Math.round(arr[12]*100)/100, Math.round(arr[18]*100)/100, Math.round(arr[24]*100)/100, Math.round(prom5*100)/100,
	Math.round(arr[7]*100)/100, Math.round(arr[13]*100)/100, Math.round(arr[19]*100)/100, Math.round(arr[25]*100)/100, Math.round(prom6*100)/100];

	// return [Math.round(arr[0]*100)/100, Math.round(arr[1]*100)/100,
	// Math.round(Math.round(arr[8]*100)/100, Math.round(arr[20]*100)/100, arr[2]*100)/100, Math.round(arr[14]*100)/100, Math.round(prom1*100)/100,
	// Math.round(Math.round(arr[9]*100)/100, Math.round(arr[21]*100)/100, arr[3]*100)/100, Math.round(arr[15]*100)/100, Math.round(prom2*100)/100,
	// Math.round(Math.round(arr[10]*100)/100, Math.round(arr[22]*100)/100, arr[4]*100)/100, Math.round(arr[16]*100)/100, Math.round(prom3*100)/100,
	// Math.round(Math.round(arr[11]*100)/100, Math.round(arr[23]*100)/100, arr[5]*100)/100, Math.round(arr[17]*100)/100, Math.round(prom4*100)/100,
	// Math.round(Math.round(arr[12]*100)/100, Math.round(arr[24]*100)/100, arr[6]*100)/100, Math.round(arr[18]*100)/100, Math.round(prom5*100)/100,
	// Math.round(Math.round(arr[13]*100)/100, Math.round(arr[25]*100)/100, arr[7]*100)/100, Math.round(arr[19]*100)/100, Math.round(prom6*100)/100];

}

function findIndex(idANP,type){
	console.log("idANP: ", idANP);
	//console.log("nombre: ", type==0?nombresANP[idANP]:nombresEstados[idANP]);
	var nombre = '';
	if(type == 0){
		nombre = nombresANP[idANP];
	}
	else if(type == 1){
		nombre = nombresEstados[idANP];
	}
	else if(type == 5){
		nombre = nombresMunicipios[idANP];
	}
	//var nombre = type==0?nombresANP[idANP]:nombresEstados[idANP];
	else if(type == 3){
		nombre = "Polígono";
	}
	// console.log('jqueryFIND: ', $('#graficasC'+i).find('.data-title').html());
	// console.log('nombre: ', nombre);
	for(var i=0; i<4; i++){
		if($('#graficasC'+i).find('.data-title').html().split('<br>')[0] == nombre){
			console.log('Lo encontré, está en graficasC', i);
			return i;
		}
	}
	console.log('No encontré nada :(');
}

function getTitulo(index){
	var title = $('#graficasC'+index).find('.data-title').html();
	title = title.split('<br>');
	//console.log('titleCOmpleto: ', title);
	return title[0];
}

function getTituloCategoria(index){
	var title = $('#graficasC'+index).find('.data-title').html();
	title = title.split('<br>')[1];
	title = title.replace('<p style="font-size: 0.65em; margin:0; color: #FFF !important;">','');
	title = title.replace('</p>','');
	//console.log('titleCOmpleto: ', title);
	return title;
}

function getCaption(index){
	var variable = $('#graficasC'+index).find('#variableG'+index).val()
	var periodo = $('#graficasC'+index).find('#tiempoG'+index).val();
	var forzamiento = $('#graficasC'+index).find('#forzamientoG'+index).val();

	var tt = '';
	var pp = '';

	switch(variable){
		case '4': tt = 'Temperatura mínima'; break;
		case '5': tt = 'Temperatura media'; break;
		case '3': tt = 'Temperatura máxima'; break;
		case '2': tt = 'Precipitación total'; break;
	}
	switch(periodo){
		case '1': pp = 'Anual'; break;
		case '2': pp = 'Ene-Feb-Mar'; break;
		case '3': pp = 'Abr-May-Jun'; break;
		case '4': pp = 'Jul-Ago-Sep'; break;
		case '5': pp = 'Oct-Nov-Dic'; break;
	}
	switch(forzamiento){
		case '1': forzamiento = 'RCP 4.5';
		case '2': forzamiento = 'RCP 8.5';
	}

	//console.log('index del Caption: ', index);
	return [tt, pp];
}

function getCaption2(index){
	var variable = $('#graficasC'+index).find('#variable'+index).val()
	var periodo = $('#graficasC'+index).find('#tiempo'+index).val();
	var forzamiento = $('#graficasC'+index).find('#forzamiento'+index).val();
	var modelo = $('#graficasC'+index).find('#modelo'+index).val();

	var tt = '';
	var pp = '';
	var ff = '';
	var mm = '';

	switch(variable){
		case '4': tt = 'Temperatura mínima'; break;
		case '5': tt = 'Temperatura media'; break;
		case '3': tt = 'Temperatura máxima'; break;
		case '2': tt = 'Precipitación Total'; break;
	}
	switch(periodo){
		case '1': pp = 'Anual'; break;
		case '2': pp = 'Ene-Feb-Mar'; break;
		case '3': pp = 'Abr-May-Jun'; break;
		case '4': pp = 'Jul-Ago-Sep'; break;
		case '5': pp = 'Oct-Nov-Dic'; break;
	}
	switch(forzamiento){
		case '1': ff = '4.5'; break;
		case '2': ff = '8.5'; break;
	}
	switch(modelo){
		case '1': mm = 'CNRMCM5'; break;
		case '2': mm = 'GFDL-CM3'; break;
		case '3': mm = 'HADGEM2-ES'; break;
		case '4': mm = 'MPI-ESM-LR'; break;
	}
	console.log('modelo: ', mm);
	console.log('forzamiento: ', ff);
	return [tt, pp, mm, ff];
}

function getCaptionProt(index){
	//var level = $('#graficasC'+index).find('#level'+index).val();
	//var distance = $('#graficasC'+index).find('#distance'+index).val();
	var level = $('#level'+index).val();
	var distance = $('#distance'+index).val();
	var ll = '';
	var dd = '';
	switch(level){
		case '1': ll = 'Nivel I'; break;
		case '2': ll = 'Nivel II'; break;
		case '3': ll = 'Nivel III'; break;
	}
	switch(distance){
		case '2': dd = '2 Km'; break;
		case '10': dd = '10 Km'; break;
		case '30': dd = '30 Km'; break;
		case '100': dd = '100 Km'; break;
	}
	//console.log('Level: ', ll);
	//console.log('Distance: ', dd);
	return [ll, dd];
}

function getStatics(orig){
	//console.log('orig in statics: ', orig);
	
	// var mediana = [];
	// var q1 = [];
	// var q3 = [];
	// var vmin = [];
	// var vmax = [];
	var result = [];

	for(var i=0; i<5; i++){
		console.log('otig[i]: ', typeof(orig[i]));
		var mapped = arrayStr2Num(orig[i]);
		//mediana
		//result.push(getMedian(mapped));
		result.push(Quartile(mapped, 0.5));
		//q1
		result.push(Quartile(mapped, 0.25));
		//q3
		result.push(Quartile(mapped, 0.75));
		//minimo
		result.push(Math.min.apply(null, mapped));
		//maximo
		result.push(Math.max.apply(null, mapped));
	}
	//console.log('statics computed: ', result);
	return result;


}

function Quartile(data, q) {
  data=Array_Sort_Numbers(data);
  var pos = ((data.length) - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  if( (data[base+1]!==undefined) ) {
    return data[base] + rest * (data[base+1] - data[base]);
  } else {
    return data[base];
  }
}

function Array_Sort_Numbers(inputarray){
  return inputarray.sort(function(a, b) {
    return a - b;
  });
}

function Array_Sum(t){
   return t.reduce(function(a, b) { return a + b; }, 0); 
}

function Array_Average(data) {
  return Array_Sum(data) / data.length;
}

function Array_Stdev(tab){
   var i,j,total = 0, mean = 0, diffSqredArr = [];
   for(i=0;i<tab.length;i+=1){
       total+=tab[i];
   }
   mean = total/tab.length;
   for(j=0;j<tab.length;j+=1){
       diffSqredArr.push(Math.pow((tab[j]-mean),2));
   }
   return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
            return firstEl + nextEl;
          })/tab.length));  
}

function showConectividad(flag){
	if(entCargadas || munCargadas){
		alert('Este panel sólo está disponible para Áreas protegidas (ANP)');
		return;
	}
	
	var panelAbierto = $('#wegp_conabio').hasClass('drawer-open');
	var libres = getBlankSpaces();


	console.log('entré a mostrar Conectividad');
	/*console.log('libres: ', libres);
	console.log('panelAbierto: ', panelAbierto);
	console.log('lastPanel: ', lastPanel);*/


	if(lastPanel == null && !panelAbierto && libres == 4){
		if(flag == undefined){
			$('#wegp_conabio').removeClass('drawer-close');
			$('#wegp_conabio').addClass('drawer-open');
			return;	
		}
		else{
			//abrir panel
			$('#wegp_conabio').removeClass('drawer-close');
			$('#wegp_conabio').addClass('drawer-open');
			$("#conectividadC0").show();
			lastPanel = 'conectividad';
			return;
		}
	}
	else if(lastPanel == null && panelAbierto && libres == 4){
		$('#wegp_conabio').removeClass('drawer-open');
		$('#wegp_conabio').addClass('drawer-close');
		return;
	}
	else if(lastPanel == 'conectividad' && panelAbierto && libres < 4){
		//$('#wegp_conabio').removeClass('drawer-close');
		lastPanel = null;
		$('#wegp_conabio').removeClass('drawer-open');
		$('#wegp_conabio').addClass('drawer-close');
		return;
	}
	else if(lastPanel == null && !panelAbierto && libres < 4){
		console.log("Mostrar Conectividad");
		lastPanel = 'conectividad';
		for(var i=0; i< 4 - libres; i++){
			$("#conectividadC"+i).show();
		}
		//test del primer caso
		for(var j = 4 - libres; j < 4; j++){
			$("#conectividadC"+j).hide();
		}
		//
		$("#graficasC0").hide(); $("#graficasC1").hide(); $("#graficasC2").hide(); $("#graficasC3").hide();
		$('#wegp_conabio').removeClass('drawer-close');
		$('#wegp_conabio').addClass('drawer-open');
	}
	else if(lastPanel == 'cambioClimatico' && panelAbierto && libres < 4){
		console.log("Mostrar Conectividad");
		lastPanel = 'conectividad';
		for(var i=0; i< 4 - libres; i++){
			$("#conectividadC"+i).show();
		}
		$("#graficasC0").hide(); $("#graficasC1").hide(); $("#graficasC2").hide(); $("#graficasC3").hide();
		//$('#wegp_conabio').removeClass('drawer-close');
		//$('#wegp_conabio').addClass('drawer-open');
	}

	else if(!panelAbierto && libres < 4){
		$('#wegp_conabio').removeClass('drawer-close');
		$('#wegp_conabio').addClass('drawer-open');
		return;
	}
	else if(!panelAbierto && lastPanel == 'cambioClimatico' && libres < 4){
		console.log("Mostrar Conectividad");
		lastPanel = 'conectividad';
		for(var i=0; i< 4 - libres; i++){
			$("#conectividadC"+i).show();
		}
		$("#graficasC0").hide(); $("#graficasC1").hide(); $("#graficasC2").hide(); $("#graficasC3").hide();
		$('#wegp_conabio').removeClass('drawer-close');
		$('#wegp_conabio').addClass('drawer-open');
	}
	
}

function showCambioClimatico(flag){
	var panelAbierto = $('#wegp_conabio').hasClass('drawer-open');
	var libres = getBlankSpaces();

	/*
	console.log('entré a mostrar Cambio Climático');
	console.log('libres: ', libres);
	console.log('panelAbierto: ', panelAbierto);
	console.log('lastPanel: ', lastPanel);
	*/

	//flag es TRUE si se dio click en el graficado rápido
	if(lastPanel == null && !panelAbierto && libres == 4){
		if(flag == undefined){
			$('#wegp_conabio').removeClass('drawer-close');
			$('#wegp_conabio').addClass('drawer-open');
			return;	
		}
		else{
			//abrir panel
			$('#wegp_conabio').removeClass('drawer-close');
			$('#wegp_conabio').addClass('drawer-open');
			$("#graficasC0").show();
			lastPanel = 'cambioClimatico';
			return;
		}
		
	}
	else if(lastPanel == null && panelAbierto && libres == 4){
		$('#wegp_conabio').removeClass('drawer-open');
		$('#wegp_conabio').addClass('drawer-close');
		return;
	}
	else if(lastPanel == 'cambioClimatico' && panelAbierto && libres < 4){
		lastPanel = null;
		$('#wegp_conabio').removeClass('drawer-open');
		$('#wegp_conabio').addClass('drawer-close');
		return;
	}
	else if(lastPanel == null && !panelAbierto && libres < 4){
		console.log("Mostrar Cambio Climatico");
		lastPanel = 'cambioClimatico';
		for(var i=0; i< 4 - getBlankSpaces(); i++){
			$("#graficasC"+i).show();
		}
		$("#conectividadC0").hide(); $("#conectividadC1").hide(); $("#conectividadC2").hide(); $("#conectividadC3").hide();
		$('#wegp_conabio').removeClass('drawer-close');
		$('#wegp_conabio').addClass('drawer-open');
	}
	else if(lastPanel == 'conectividad' && panelAbierto && libres < 4){
		console.log("Mostrar Cambio Climatico");
		lastPanel = 'cambioClimatico';
		for(var i=0; i< 4 - getBlankSpaces(); i++){
			$("#graficasC"+i).show();
		}
		$("#conectividadC0").hide(); $("#conectividadC1").hide(); $("#conectividadC2").hide(); $("#conectividadC3").hide();
		//$('#wegp_conabio').removeClass('drawer-close');
		//$('#wegp_conabio').addClass('drawer-open');
	}
	else if(!panelAbierto && libres < 4){
		$('#wegp_conabio').removeClass('drawer-close');
		$('#wegp_conabio').addClass('drawer-open');
		return;
	}
	else if(!panelAbierto && lastPanel == 'conectividad' && libres < 4){
		console.log("Mostrar Cambio Climatico");
		lastPanel = 'cambioClimatico';
		for(var i=0; i< 4 - getBlankSpaces(); i++){
			$("#graficasC"+i).show();
		}
		$("#conectividadC0").hide(); $("#conectividadC1").hide(); $("#conectividadC2").hide(); $("#conectividadC3").hide();
		$('#wegp_conabio').removeClass('drawer-close');
		$('#wegp_conabio').addClass('drawer-open');
	}

	//else if(lastPanel == 'conectividad' && panelAbierto && libres < 4){}
}

function exportaDatos(i){
	//console.log('cveANP: ', cveANPMarked);
	//console.log('cveEnt: ', cveEntMarked);
	if(cveANPMarked.length == 0 && cveEntMarked == 0 && cveMunMarked == 0 && graficadosTypes.length == 0){
		alert('No hay ningún área seleccionada');
		return;
	}

	$("#mensajeInicial").hide();
	$('#cortina').attr('style','display: flex;');
	if(!($('#alertaReporte').length))
		$('#cortina').append("<div id='alertaReporte'><b>Generando reporte</b> <br><br> Espera un momento</div>");
	var n; 
	if(graficadosTypes[0] == 0)
		n = cveANPMarked.length;
	else if(graficadosTypes[0] == 1)
		n = cveEntMarked.length;
	else
		n = 1;
	if(n == 0){
		if(graficadosTypes[0] == 1){
			for(var x = 0; x < graficadosIds.length; x++){
				if(graficadosIds[x] != -1)
					n++;
			}
		}
	}
	if(n == 0){
		return;
	}
	var type = 0;
	var precc = [];
	var tmax = [];
	var tmin = [];
	var t = [], t1 = [], t2 = [], imgs = [], imgsN = [], imgsProt = [], idTitulos = [];
	var imgsTend = [], imgsFrag = [], imgsMann = [], imgsEst = [];
	var yearsPDF = [];
	var captionPDF = [];
	var captionPDF2 = [];
	var captionProt = [];
	var statics = [];
	var titulosCompletos = [];
	var titulosCompletosCategoria = [];
	var protConnReporte = [];
	var protConnEcoregiones = [];
	//globales
	// infoWindowReporte = [];
	// arrInfoTable = [];
	// statics = [];
	// yearsExporta = [];
	if(i == -1){
		for(var j = 0; j < n; j++){
			var idANP = graficadosIds[j];
			if(graficadosTypes[j]==3) idANP =0;

			yearsPDF.push(yearsTransform(idANP));
			var indGraph = findIndex(idANP,graficadosTypes[j]);
			captionPDF.push(getCaption(indGraph));
			captionPDF2.push(getCaption2(indGraph));
			//captionProt.push(getCaptionProt(indGraph));
			statics.push(getStatics(yearsStatics[idANP]));
			//titulosCompletos.push(getTitulo(indGraph));
			//titulosCompletosCategoria.push(getTituloCategoria(indGraph));
			//console.log('STATICS: ', statics);
			
			imgs[j] = $('#jpg-export'+indGraph).attr('src');
			imgsN[j] = $('#jpg-exportN'+indGraph).attr('src');
			//imgsProt[j] = $('#jpg-exportP'+indGraph).attr('src');
			//imgsFrag[j] = $('#jpg-exportF'+indGraph).attr('src');
			//imgsMann[j] = $('#jpg-exportMann'+indGraph).attr('src');
			//imgsTend[j] = $('#jpg-exportT'+indGraph).attr('src');
			//imgsEst[j] = $('#jpg-exportE'+indGraph).attr('src');

			if(graficadosTypes[j] == 0){
				//Para ANPS
				captionProt.push(getCaptionProt(indGraph));
				titulosCompletos.push(getTitulo(indGraph));
				titulosCompletosCategoria.push(getTituloCategoria(indGraph));
				imgsProt[j] = $('#jpg-exportP'+indGraph).attr('src');
				imgsFrag[j] = $('#jpg-exportF'+indGraph).attr('src');
				imgsMann[j] = $('#jpg-exportMann'+indGraph).attr('src');
				imgsTend[j] = $('#jpg-exportT'+indGraph).attr('src');
				imgsEst[j] = $('#jpg-exportE'+indGraph).attr('src');
				infoWindowReporte.push([media(idANP), maxima(idANP), minima(idANP), prec(idANP)]);
				fillTableInfoExporta(idANP, 0);
				precc[j] = bioTempPreInfo2[idANP];
				tmax[j] = bioTempMaxInfo2[idANP];
				tmin[j] = bioTempMinInfo2[idANP];

				//console.log('tmin Size: ', tmin.length);
				// t[j] = nombresANP[idANP];
				t[j] = $("#expanpANP").find("[data-target='"+idANP+"']").html().replace("<span>","").replace("</span>","");
			} else {
				infoWindowReporte = [];
				//arrInfoTable = [];
				//precc[j] = [];
				//tmax[j] = [];
				//tmin[j] = [];
				if(graficadosTypes[j]==1){
					t[j] = nombresEstados[idANP];
					type = 1;
					fillTableInfoExporta(idANP, 1);
					precc[j] = bioTempPreInfo2E[idANP];
					tmax[j] = bioTempMaxInfo2E[idANP];
					tmin[j] = bioTempMinInfo2E[idANP];

				}
				else if(graficadosTypes[j]==5){
					t[j] = nombresMunicipios[idANP];
					type = 5;
				}
				else{
					t[j] = 'Polígono';
					type = 3;
				}
				//t[j] = graficadosTypes[j]==1?nombresEstados[idANP]:'Polígono';
				if(graficadosTypes[j] == 3){
					toKML(lastFigure, "poligono consultado");
				}
				//type = 1;
			}
			t1[j] = maxPdf[j];
			t2[j] = minPdf[j];
			idTitulos[j] = idANP;

			//tabla protConn
			if(graficadosTypes[j] == 0){
				var realIndex = parseInt(dictIndex[idANP+'']);
				//valores de la tabla
				$.ajax({
					url:'Web/getProtConnReporte.php',
					type:'POST',
					data:{idANP: realIndex},
					dataType: 'json',
					success: function(data){
						//console.log('esto es protConn pa el reporte: ', data);
						if(data.length == 12){
							protConnReporte.push(data);
						}
						else{
							data = [data[1], data[3], data[5],
									data[7], data[9], data[11],
									data[13], data[15], data[17],
									data[19], data[21], data[23]];
							protConnReporte.push(data);
						}
					}
				});
				//nombre de ecoregiones
				$.ajax({
					url:'Web/getEcoregion.php',
					type:'POST',
					data:{idANP: realIndex},
					dataType: 'json',
					success: function(data){
						//console.log('Ecoregion: ', data);
						if(data.length == 3){
							protConnEcoregiones.push(data);
						}
						else{
							data = [data[1], data[3], data[5]];
							protConnEcoregiones.push(data);
						}
					}
				});
			}


		}		
		//for DEBUGGING
		//return;
	} else {
		var idANP = graficadosIds[i];
		imgs[0] = $('#jpg-export'+i).attr('src');
		imgsN[0] = $('#jpg-exportN'+i).attr('src');
		if(graficadosTypes[i] == 0){
			precc[0] = bioPrecT[idANP];
			tmax[0] = bioTempPMax[idANP];
			tmin[0] = bioTempPMin[idANP];
			console.log('tmin Size: ', tmin.length);
			// t[0] = nombresANP[idANP];
			t[0] = $("#expanpANP").find("[data-target='"+idANP+"']").html().replace("<span>","").replace("</span>","");
		} else {
			precc[0] = [];
			tmax[0] = [];
			tmin[0] = [];
			if(graficadosTypes[j]==1){
					t[0] = nombresEstados[idANP];
					type = 1;
					//fillTableInfoExporta(idANP, 1);
					precc[0] = bioTempPreInfo2E[idANP];
					tmax[0] = bioTempMaxInfo2E[idANP];
					tmin[0] = bioTempMinInfo2E[idANP];
				}
				else if(graficadosTypes[j]==5){
					t[0] = nombresMunicipios[idANP];
					type = 5;
				}
				else{
					t[0] = 'Polígono';
					type = 3;
				}
			//t[0] = graficadosTypes[i]==1?nombresEstados[idANP]:'Polígono';
			//type = 1;
		}
		t1[0] = maxPdf[i];
		t2[0] = minPdf[i];
		idTitulos[0] = idANP;
	}
	/* Sacar la FECHA */
	var fecha = new Date();
	//fecha = fecha.toUTCString();
	fecha = dateToSpanish(fecha);

	// setTimeout(function(){
	// 	console.log("datos protConn: ", protConnReporte);
	// 	console.log("ecoregiones: ", protConnEcoregiones);
	// }, 200);

	console.log('t: ',t);
	console.log('t1: ',t1);
	console.log('t2: ',t2);
	console.log('prec: ',precc);
	console.log('tmax: ',tmax);
	console.log('tmin: ',tmin);
	console.log('type: ',type);
	console.log('idTituylos: ',idTitulos);
	console.log('fecha: ',fecha);
	console.log('infoWndow',infoWindowReporte);
	console.log('arrInfoTable: ', arrInfoTable);
	console.log('yearspdf: ',yearsPDF);
	console.log('captiondf: ',captionPDF);
	console.log('captionpdf2: ',captionPDF2);
	console.log('statics: ',statics);
	console.log('captionProt: ',captionProt);
	console.log('titulosCompletos: ',titulosCompletos);
	console.log('titulosCompletosCategoria: ',titulosCompletosCategoria);
	console.log('protConnReporte: ',protConnReporte);
	console.log('protConnEcoregiones: ',protConnEcoregiones)

	//$infoWindow = $_REQUEST['infoWindow'];
	//$arrInfoTable = $_REQUEST['arrInfoTable'];
	//$statics = $_REQUEST['statics'];
	
	if(type == 0){
		setTimeout(function(){$.ajax({
			url: 'https://www.wegp.unam.mx/assets_conabio2/reportesPDF/creaPDF_Latex.php',
			type: 'POST',
			data: {img: imgs,imgN: imgsN, titulos: t, max: t1, min: t2, prec: precc, tmax: tmax,
					tmin: tmin, type: type, idTitulos: idTitulos, fecha: fecha, 
					yearsPDF: yearsPDF, caption: captionPDF, caption2: captionPDF2,
					imgProt: imgsProt, captionProt: captionProt,
					imgsMann:imgsMann, imgsFrag:imgsFrag, imgsTend:imgsTend, imgsEst:imgsEst,
					titulosCompletos: titulosCompletos, titulosCompletosCategoria: titulosCompletosCategoria,
					protConnReporte: protConnReporte, protConnEcoregiones: protConnEcoregiones,
					infoWindow: infoWindowReporte, arrInfoTable: arrInfoTable, tablaStadistics: statics},
			dataType: 'json',
			success: function(blob){
				var link = document.createElement('a');
				link.target="_blank";
				link.href = blob;
				link.download = "reporte.pdf";
				link.click();
				$('#cortina').attr('style','display: none;');
				$("#mensajeInicial").show();
				$("#alertaReporte").remove();
				arrInfoTable = [];
				infoWindowReporte = [];
			}
	})},1000);
	}
	else if(type == 1){
		setTimeout(function(){$.ajax({
			url: 'https://www.wegp.unam.mx/assets_conabio2/reportesPDF/creaPDF_LatexEnt.php',
			type: 'POST',
			data: {img: imgs,imgN: imgsN, titulos: t, max: t1, min: t2, prec: precc, tmax: tmax,
					tmin: tmin, type: type, idTitulos: idTitulos, fecha: fecha, 
					yearsPDF: yearsPDF, caption: captionPDF, caption2: captionPDF2,
					arrInfoTable: arrInfoTable, statics: statics},
			dataType: 'json',
			success: function(blob){
				var link = document.createElement('a');
				link.target="_blank";
				link.href = blob;
				link.download = "reporte.pdf";
				link.click();
				$('#cortina').attr('style','display: none;');
				$("#mensajeInicial").show();
				$("#alertaReporte").remove();
				arrInfoTable = [];
			}
		})},1000);
	}
	else if(type == 5){
		setTimeout(function(){$.ajax({
			url: 'https://www.wegp.unam.mx/assets_conabio2/reportesPDF/creaPDF_LatexMun.php',
			type: 'POST',
			data: {img: imgs,imgN: imgsN, titulos: t, max: t1, min: t2,
					type: type, idTitulos: idTitulos, fecha: fecha, 
					yearsPDF: yearsPDF, caption: captionPDF, caption2: captionPDF2,
					statics: statics},
			dataType: 'json',
			success: function(blob){
				var link = document.createElement('a');
				link.target="_blank";
				link.href = blob;
				link.download = "reporte.pdf";
				link.click();
				$('#cortina').attr('style','display: none;');
				$("#mensajeInicial").show();
				$("#alertaReporte").remove();
			}
	})},1000);
	}
	else if(type == 3){
		setTimeout(function(){$.ajax({
			url: 'https://www.wegp.unam.mx/assets_conabio2/reportesPDF/creaPDF_LatexMun.php',
			type: 'POST',
			data: {img: imgs,imgN: imgsN, titulos: t, max: t1, min: t2,
					type: type, idTitulos: idTitulos, fecha: fecha, 
					yearsPDF: yearsPDF, caption: captionPDF, caption2: captionPDF2,
					statics: statics},
			dataType: 'json',
			success: function(blob){
				var link = document.createElement('a');
				link.target="_blank";
				link.href = blob;
				link.download = "reporte.pdf";
				link.click();
				$('#cortina').attr('style','display: none;');
				$("#mensajeInicial").show();
				$("#alertaReporte").remove();
			}
	})},1000);
	}
	
	//infoWindowReporte = [];
	//arrInfoTable = [];
	//statics = [];
	//yearsExporta = []
	
}
function dateToSpanish(d){
	var dias = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
	var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre",
				"Octubre","Noviembre","Diciembre"];
	return dias[d.getDay()]+" "+d.getDate()+" de "+meses[d.getMonth()]+" de "+d.getFullYear();

}
function getColor(t, color, flag){
	if(flag){
		//Old Colors
		// switch(t){
		// 	case 0: return  'rgb(188, 129, 71)';
		// 	case 1: return  'rgb(240, 178, 103)';
		// 	case 2: return  'rgb(239, 177, 102)';
		// 	case 3: return  'rgb(271, 241, 177)';
		// 	case 4: return  'rgb(107, 200, 192)';
		// 	case 5: return  'rgb(61, 151, 142)';
		// 	case 6: return  'rgb(53, 109, 126)';
			
		// 	default: return 'rgb(131, 96, 58)';
		// }
		//Tonos de AZUL
		// case 2: str = 'Precipitacion total anual (mm)'; break;
		// case 3: str = 'Temperatura máxima anual (°C)'; break;
		// case 4: str = 'Temperatura mínima anual (°C)'; break;
		// case 5: str = 'Temperatura media anual (°C)'; break;

		//Precipitacion = AZUL
		if(color == 2){
			switch(t){
				//case 0: return  'rgba(188, 129, 71, 1.0)';
				// case 1: return  'rgba(204, 227, 242, 1.0)';
				// case 2: return  'rgba(178, 212, 235, 1.0)';
				// case 3: return  'rgba(153, 198, 228, 1.0)';
				// case 4: return  'rgba(102, 170, 215, 1.0)';
				// case 5: return  'rgba(51, 141, 201, 1.0)';
				case 1: return  'rgba(0, 113, 188, 1.00)';
				case 2: return  'rgba(0, 113, 188, 1.00)';
				case 3: return  'rgba(0, 113, 188, 1.00)';
				case 4: return  'rgba(0, 113, 188, 1.00)';
				case 5: return  'rgba(0, 113, 188, 1.00)';
				case 6: return  'rgba(0, 113, 188, 1.00)';
				default: return  'rgba(0, 113, 188, 1.00)';
			}
		}
		//Temp Max = ROJO
		else if(color == 3){
			switch(t){
				//case 0: return  'rgba(173, 57, 68, 0.15)';
				case 1: return  'rgba(173, 57, 68, 1.0)';
				case 2: return  'rgba(173, 57, 68, 1.0)';
				case 3: return  'rgba(173, 57, 68, 1.0)';
				case 4: return  'rgba(173, 57, 68, 1.0)';
				case 5: return  'rgba(173, 57, 68, 1.0)';
				case 6: return  'rgba(173, 57, 68, 1.0)';
				default: return  'rgba(173, 57, 68, 1.0)';
			}
		}
		//Temp Min = MARRON
		else if(color == 4){
			switch(t){
				//case 0: return  'rgba(173, 57, 68, 0.15)';
				case 1: return  'rgba(193, 153, 121, 1.0)';
				case 2: return  'rgba(193, 153, 121, 1.0)';
				case 3: return  'rgba(193, 153, 121, 1.0)';
				case 4: return  'rgba(193, 153, 121, 1.0)';
				case 5: return  'rgba(193, 153, 121, 1.0)';
				case 6: return  'rgba(193, 153, 121, 1.0)';
				default: return  'rgba(193, 153, 121, 1.0)';
			}
		}
		//Temp Med = NARANJA
		else if(color == 5){
			switch(t){
				//case 0: return  'rgba(173, 57, 68, 0.15)';
				case 1: return  'rgba(193, 109, 68, 1.0)';
				case 2: return  'rgba(193, 109, 68, 1.0)';
				case 3: return  'rgba(193, 109, 68, 1.0)';
				case 4: return  'rgba(193, 109, 68, 1.0)';
				case 5: return  'rgba(193, 109, 68, 1.0)';
				case 6: return  'rgba(193, 109, 68, 1.0)';
				default: return  'rgba(193, 109, 68, 1.0)';
			}
		}
	}else{
		if(color == 2)
		{
			switch(t){
				//case 0: return  'rgba(188, 129, 71, 1.0)';
				// case 1: return  'rgba(204, 227, 242, 1.0)';
				// case 2: return  'rgba(178, 212, 235, 1.0)';
				// case 3: return  'rgba(153, 198, 228, 1.0)';
				// case 4: return  'rgba(102, 170, 215, 1.0)';
				// case 5: return  'rgba(51, 141, 201, 1.0)';
				case 1: return  'rgba(0, 113, 188, 0.80)';
				case 2: return  'rgba(0, 113, 188, 0.80)';
				case 3: return  'rgba(0, 113, 188, 0.80)';
				case 4: return  'rgba(0, 113, 188, 0.80)';
				case 5: return  'rgba(0, 113, 188, 0.80)';
				case 6: return  'rgba(0, 113, 188, 0.80)';
				default: return  'rgba(0, 113, 188, 0.80)';
			}
		}
		//Temp Max = ROJO
		else if(color == 3)
		{
			switch(t){
				//case 0: return  'rgba(173, 57, 68, 0.15)';
				case 1: return  'rgba(173, 57, 68, 0.80)';
				case 2: return  'rgba(173, 57, 68, 0.80)';
				case 3: return  'rgba(173, 57, 68, 0.80)';
				case 4: return  'rgba(173, 57, 68, 0.80)';
				case 5: return  'rgba(173, 57, 68, 0.80)';
				case 6: return  'rgba(173, 57, 68, 0.80)';
				default: return  'rgba(173, 57, 68, 0.80)';
			}
		}
		//Temp Min = MARRON
		else if(color == 4)
		{
			switch(t){
				//case 0: return  'rgba(173, 57, 68, 0.15)';
				case 1: return  'rgba(193, 153, 121, 0.80)';
				case 2: return  'rgba(193, 153, 121, 0.80)';
				case 3: return  'rgba(193, 153, 121, 0.80)';
				case 4: return  'rgba(193, 153, 121, 0.80)';
				case 5: return  'rgba(193, 153, 121, 0.80)';
				case 6: return  'rgba(193, 153, 121, 0.80)';
				default: return  'rgba(193, 153, 121, 0.80)';
			}
		}
		//Temp Med = NARANJA
		else if(color == 5){
			switch(t){
				//case 0: return  'rgba(173, 57, 68, 0.15)';
				case 1: return  'rgba(193, 109, 68, 0.80)';
				case 2: return  'rgba(193, 109, 68, 0.80)';
				case 3: return  'rgba(193, 109, 68, 0.80)';
				case 4: return  'rgba(193, 109, 68, 0.80)';
				case 5: return  'rgba(193, 109, 68, 0.80)';
				case 6: return  'rgba(193, 109, 68, 0.80)';
				default: return  'rgba(193, 109, 68, 0.80)';
			}
		}
	}

}
function clearMap(){
	if(lastPolygonD!==undefined&&lastPolygonD!=null){
		lastPolygonD.setMap(null);
	}
	for(var i = 0; i < cveANPMarked.length; i++){
		polsANP.elements[cveANPMarked[i]].setOptions({fillOpacity:$("#anpOpacityV").val()/100, fillColor:colorBase});
	}
	for(var i = 0; i < cveEntMarked.length; i++){
		polsEnt.elements[cveEntMarked[i]].setOptions({fillOpacity:$("#entOpacityV").val()/100, fillColor:colorBase});
	}
	for(var i = 0; i < cveMunMarked.length; i++){
		polsMun.elements[cveMunMarked[i]].setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorBase});
	}

	/*for(var j = 0; j < cveMunMarked.length; j++)
		for(var i = 0; i < cveEntMarked.length; i++){
			polsMun[j].elements[cveMunMarked[i]].setOptions({fillOpacity:$("#entOpacityV").val()/100, fillColor:colorBaseEnt});
		}*/
	cveANPMarked = [];
	cveEntMarked = [];
	cveMunMarked = [];
	graficadosIds = [-1, -1, -1, -1];
	graficadosTypes = ["", "", "", ""];
	for(var j=0;j<4;j++){
		$("#graficasC"+j).hide();
		$("#conectividadC"+j).hide();
		$("#tiempo"+j).val("1");
		$("#variable"+j).val("2");
	}
}
function clearDraws(){
	drawingManager.setDrawingMode(null);
	drawingManagerLine.setDrawingMode(null);
	if(zooming){
		zoomPoligono();
	}
}
function fillMissSpelling(cadena){
	var temp = cadena.replaceAll("A3","ó");
	temp = temp.replaceAll("RAo","Río");
	temp = temp.replaceAll("A!","á");
	temp = temp.replaceAll("A(c)","é");
	temp = temp.replaceAll("A+-","ñ");
	temp = temp.replaceAll("An","ín");
	temp = temp.replaceAll("Aa","ía");
	temp = temp.replaceAll("sA","sí");
	temp = temp.replaceAll("lA","lí");
	temp = temp.replaceAll("Ao","ú");
	return temp;
}
function storeDataFQ(data){
	console.log('esto le llega de getNames: ', data);
	var rows = data["rows"];
	var out = "<li><a class=\"opcionesANP\" onclick=\"selANP(this)\" data-target=\"";
	var out2="\"><span>";
	var out3="</span></a></li>";
	for(var i = 0; i < rows.length;i++){
		var idANP = parseInt(rows[i][0]);
		var titleANP = /*fillMissSpelling(*/rows[i][1]/*)*/;
		var catManejo = rows[i][2];
		nombresANP[idANP]=titleANP;
		$("#expanpANP").append(out+idANP+out2+catManejo+" "+titleANP+out3);
	}	
}
function storeDataFQ2(data){
	//console.log(data);
	var rows = data["features"];
	var out = "<li><a class=\"opcionesMun\" onclick=\"selMun(this)\" data-target=\"";
	var outMun = "\" data-target2=\"";
	var out2="\"><span>";
	var out3="</span></a></li>";
	for(var i = 0; i < rows.length;i++){
		//for(var i = 0; i < 10;i++){
		//var idMun = parseInt(rows[i][0]);
		//var titleMun = fillMissSpelling(rows[i][1]);		
		var row = rows[i]['properties'];
		var idMun = parseInt(row['CVE_MUN']);
		var idEst = parseInt(row['CVE_ENT']);
		var titleMun = fillMissSpelling(row['NOM_MUN']);
		//console.log('dentro: ', idMun, ' ', idEst, ' ', titleMun);
		nombresMun[idMun]=titleMun;
		//$("#expEsMun").append(out+idEst+out2+titleMun+out3);
		$("#expEsMun").append(out+idEst+outMun+idMun+out2+titleMun+out3);
	}
}
function getNames(nombreT,columns,ordenar,key,storeFunction){
	//Leer json en lugar de las FT
	$.getJSON(
		"Web/getGeoJson.php", {file: 'anpNames.json'},                
		function(data){
			var json = JSON.parse(data);
			nombresANPJSON.push(json['rows']);	
			storeDataFQ(json);
		}
	);

	$.getJSON(
		//"Web/getGeoJson.php", {file: 'json/municipiosSimplificados.geojson'},
		"Web/getGeoJson.php", {file: 'munAcentos.geojson'},
		function(data){
			var json = JSON.parse(data);
			console.log('datos municipios: ', json['features']);
			nombresMUNJSON.push(json['features']);	
			storeDataFQ2(json);
		}
	);
	
	// var ordenarStr = ordenar !== undefined?" ORDER BY "+ordenar:"";	
	// var script = document.createElement('script');
	// var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
	// url.push('sql=');
	// var query = 'SELECT '+columns+' FROM '+nombreT+ordenarStr;
	// var encodedQuery = encodeURIComponent(query);
	// url.push(encodedQuery);
	// url.push('&callback='+storeFunction);
	// url.push('&key='+key);
	// script.src = url.join('');
	// var body = document.getElementsByTagName('body')[0];
	// body.appendChild(script);
}
function loadConabioStuffs(){
	drawingManager.setMap(mapG);
	setTimeout(function(){
		console.log("Getting names");
		getNames("14iTp4T1f2Jio_hVx0zNY4aHjkiSIWVPNew81u1fN","OBJECTID,NOMBRE,CAT_MANEJO","OBJECTID","AIzaSyBzOS2gRQAuzmKXtkGGQWBIURi21-Nm2Lg","storeDataFQ");
		//getNames("14XJD1bdZ5FOCj18yxxYGBq2uO37vJFdZpSZdpI0-","CVEGEO,NOMGEO","CVEGEO","AIzaSyBzOS2gRQAuzmKXtkGGQWBIURi21-Nm2Lg","storeDataFQ2");
	},100);
	drawingManagerZoom = new google.maps.drawing.DrawingManager({		
		drawingControl: false,
		map: map
	});
	drawingManagerLine = new google.maps.drawing.DrawingManager({		
		drawingControl: false,
		map: map
	});	
	google.maps.event.addListener(drawingManagerZoom, 'rectanglecomplete', function(rectangle) {
		var candb = getCenterAndBoundsFromPol(rectangle,true);
		var zoom = getZoomByBounds(map,candb[1]);
		map.setZoom(zoom);
		map.setCenter(candb[0],zoom);
		rectangle.setMap(null);
	});
	google.maps.event.addListener(drawingManagerLine, 'polylinecomplete', function(polyline) {
		var distance = getDistance(polyline.getPath());
		distance = Math.round(distance*100)/100;
		if(distance > 1000){
			distance /= 1000;
			distance = Math.round(distance*100)/100;
			alert("Distancia: "+distance+" km");
			polyline.setMap(null);
		} else if(distance != 0){
			alert("Distancia: "+distance+" m");
			polyline.setMap(null);
		}
		/*google.maps.event.addListener(polyline, 'click', function(event) {
			polyline.setMap(null);
		});*/
		drawingManagerLine.setDrawingMode(null);
	});
	google.maps.event.addDomListener(document,'keyup',function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 27) {
			$("#dibujar").find(".bmaps-item").removeClass("active");
			clearDraws();
			clearMap();
			if(pDQG.length>=1){
				pDQG[0].setMap(null);
				pDQG.pop();
			}
		}
	});
	google.maps.event.addListener(drawingManager,'overlaycomplete',function(event){			
		if($("#cortina").length==0);
		else
			$("#cortina").removeClass("removeCortina");
		overlayP=event.overlay;
		if(event.type == "rectangle"){
			f = rectangle2polygon(overlayP);
		} else if(event.type == "circle"){
			f = circle2polygon(overlayP);
		} else {
			f = new google.maps.Polygon({
				path: overlayP.getPath(),
				fillOpacity: 0.01,
				strokeColor: '#000000'
			});
		}
		lastFigure = f;
		overlayP.addListener('rightclick', function(){
			overlayP.setMap(null);
		});
		if(pDQG.length>=1){
			pDQG[0].setMap(null);
			pDQG.pop();
		}
		pDQG.push(overlayP);		
		var arreglo=f.getPath().getArray();
		var arrayN=f.getPath().getArray().length;
		var coordenadas=new Array(2);
		var lats=new Array(arrayN);
		var lngs=new Array(arrayN);
		var lats2=new Array(arrayN);
		var lngs2=new Array(arrayN);
		for(var x=0;arrayN>x;x++){
			lats[x]=arreglo[x].lat();
			lngs[x]=arreglo[x].lng();
		}
		var Nindex=obtenNorte(lats);
		lats=ajusteCoordenadas(lats, Nindex,arrayN);
		lngs=ajusteCoordenadas(lngs, Nindex,arrayN);
		if(esSentidoH(lats,lngs,arrayN)){
			lats.reverse();
			lngs.reverse();
		}
		coordenadas[0]=lats;
		coordenadas[1]=lngs;
		var x1=Math.min.apply(Math, lats);
		var x2=Math.max.apply(Math, lats);
		var y1=Math.min.apply(Math, lngs);
		var y2=Math.max.apply(Math, lngs);
		bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(x1,y1),
			new google.maps.LatLng(x2, y2)
		);
		CentX=x1+((x2-x1)/2);
		CentY=y1+((y2-y1)/2);
		coorde=coordenadas;
		drawingManager.setMap(null);
		$("#cortina").removeClass("removeCortina");
		$("#dibujar").find(".bmaps-item").removeClass("active");
		temporadaG = 1;
		variableG = 2;
		polG = 3;
		anpG = coords2String(coorde);
		envia(variableG,anpG,polG,temporadaG);
		$("#showHide").click();
	});
	$.extend($.expr[":"], {"containsNC": function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").replace(/[ãáàäâÃÁÄÂ]/g,'a').replace(/[éèêÉÈÊ]/g,'e').replace(/[íìÍÌ]/g,'i').replace(/[óòôõÓÒÔÕ]/g,'o').replace(/[úùûÚÙÛ]/g,'u').replace(/[ç]/g,'c').toLowerCase().indexOf((match[3] || "").replace(/[ãáàäâÃÁÄÂ]/g,'a').replace(/[éèêÉÈÊ]/g,'e').replace(/[íìÍÌ]/g,'i').replace(/[óòôõÓÒÔÕ]/g,'o').replace(/[úùûÚÙÛ]/g,'u').replace(/[çÇ]/g,'c').toLowerCase()) >= 0;
	}});
	map.addListener('click', function() {
		clearMap();		
		$("#cortina").show();
	});
	map.addListener('rightclick', function() {
		$("#dibujar").find(".bmaps-item").removeClass("active");
		clearDraws();
		$("#cortina").show();
	});	
	$("#buscarEstado").keyup(function(){
		$(".opcionesEstados").addClass("hidden");
		$(".opcionesEstados span:containsNC("+$("#buscarEstado").val()+")").parent().removeClass("hidden");
	});
	$("#buscarEstado2").keyup(function(){
		$(".opcionesEstados2").addClass("hidden");
		$(".opcionesEstados2 span:containsNC("+$("#buscarEstado2").val().toUpperCase()+")").parent().removeClass("hidden");
	});
	$("#buscarXANP").keyup(function(){
		$(".opcionesANP").addClass("hidden");
		$(".opcionesANP span:containsNC("+$("#buscarXANP").val().toUpperCase()+")").parent().removeClass("hidden");
	});
	$("#buscarMunicipio").keyup(function(){
		$(".opcionesMun").addClass("hidden");
		$(".opcionesMun span:containsNC("+$("#buscarMunicipio").val().toUpperCase()+")").parent().removeClass("hidden");
	});
	// fillData([8,9,12,13,14,15,3,4,5,2]);
	fillData([3,4,5,2]);
	fillDataEstados([3,4,5,2]);
	//fillData([8,9,12,13,14,15]);
	//fillData([8,9,14,15]);

	//para inicializar graficas
	// var trace1 = {
	//   x: [1, 2, 3, 4],
	//   y: [10, 15, 13, 17],
	//   mode: 'markers'
	// };
	// trace1 = [trace1];
	// setTimeout(function(){Plotly.newPlot('plot0', trace1, {title:'Line and Scatter Plot'});},0);
	// setTimeout(function(){Plotly.newPlot('newPlot0', trace1, {title:'Line and Scatter Plot'});},10);
	// setTimeout(function(){Plotly.newPlot('plot1', trace1, {title:'Line and Scatter Plot'});},20);
	// setTimeout(function(){Plotly.newPlot('newPlot1', trace1, {title:'Line and Scatter Plot'});},30);
	// setTimeout(function(){Plotly.newPlot('plot2', trace1, {title:'Line and Scatter Plot'});},40);
	// setTimeout(function(){Plotly.newPlot('newPlot2', trace1, {title:'Line and Scatter Plot'});},50);
	// setTimeout(function(){Plotly.newPlot('plot3', trace1, {title:'Line and Scatter Plot'});},60);
	// setTimeout(function(){Plotly.newPlot('newPlot3', trace1, {title:'Line and Scatter Plot'});},70);

	polsANP = new FTStore("polygon");
	polsEnt = new FTStore("polygon");
	polsMun = new FTStore("polygon");
	/*
	for(var i = 0; i < 32; i++){
		polsMun.push(new FTStore("polygon"));
		infoMun.push([]);
	}*/

	var plantillaANP = [{
		//maxWidth: 360,
		maxWidth: 370,
		test: true,
		tabla:{
			nombre: "14iTp4T1f2Jio_hVx0zNY4aHjkiSIWVPNew81u1fN",
			columns: "OBJECTID,NOMBRE",
			where: null, 
			columnaGeometria: "geometry", 
			style:[{
				polygonOptions:{
					fillColor: colorBase, strokeColor: "#FFFFFF",fillOpacity:0.5,
					strokeWeight:0.8,strokeOpacity: 1
				}
			}]
		},
		key: key,
		map: map,
		storePol: "polsANP",
		storeData: "infoANP",
		data: "elements",
		idData: "ids",
		hasId: true,
		zIndex:20,
		error: errorC,
		success: successC
	},{
		caja: {
			mouseover: showWindowANP,
			mouseout: hideWindowANP,
			mouseclick: markANP
		},
		clase: 'gmBox-box-base',
		claseTabla: 'gmBox-box-table',
		
		cols: 11,
		rows: 7,
		widths:[40,40,40,5,40,40,40,5,40,40,40],
		cuerpo:[
			{ style:'gmBox-table-title',tipo:"span",pos:'a0',texto:"|0",colspan:11, getExtra:tituloANPF},
			{ style:'gmBox-table-head',tipo:"span",pos:'a1',texto:"Clima actual", colspan:3},
			{ style:'gmBox-table-head',tipo:"span",pos:'d1',texto:"Clima a futuro", colspan:4},
			{ style:'gmBox-table-head',tipo:"span",pos:'h1',texto:"Conectividad", colspan:4},
			{ style:'halign-center inverted',tipo:"img",pos:'e2',src:'Web/icons/noun_climafuturo_gris_alpha.png',width:"80px",rowspan:4,colspan:3,onclick:"usar",parametros:'0',cursor:"pointer",title:"Clima al futuro"},
			{ style:'halign-center inverted',tipo:"img",pos:'i2',src:'Web/icons/noun_conectividad_gris_alpha.png',width:"80px",rowspan:4,colspan:3,onclick:"usar2",parametros:'0',cursor:"pointer",title:"Conectividad"},
			{ style:'halign-center valign-middle',tipo:"img",pos:'a2',src:'Web/icons/icon-thermometer.svg',rowspan:3,width:"30px"},
			{ style:'halign-center valign-middle',tipo:"img",pos:'a5',src:'Web/icons/icon-drop.svg',width:"30px",rowspan:1},
			{ style:'valign-middle',tipo:'span',pos:'b2',texto:"media: |0 °C",getExtra:media2, colspan:2},
			{ style:'valign-middle',tipo:'span',pos:'b3',texto:"máxima: |0 °C",getExtra:maxima2, colspan:2},
			{ style:'valign-middle',tipo:'span',pos:'b4',texto:"mínima: |0 °C",getExtra: minima2, colspan:2},
			{ style:'valign-middle',tipo:'span',pos:'b5',texto:"|0 mm",getExtra:prec},
			{ style:'cellBorder-lf',tipo:"div",pos:'d2',texto:"",rowspan:4,width:"3px"},
			{ style:'cellBorder-lf',tipo:"div",pos:'h2',texto:"",rowspan:4,width:"3px"},
		]
		/*
		cols: 9,
		rows: 7,
		widths:[40,40,40,40,40,40,40,40,40],
		cuerpo:[
			{ style:'gmBox-table-title',tipo:"span",pos:'a0',texto:"|0",colspan:5, getExtra:tituloANPF},
			{ style:'gmBox-table-head',tipo:"span",pos:'a1',texto:"Clima al presente", colspan:3},
			{ style:'gmBox-table-head',tipo:"span",pos:'d1',texto:"Clima al futuro", colspan:3},
			{ style:'gmBox-table-head',tipo:"span",pos:'g1',texto:"Conectividad", colspan:3},
			{ style:'halign-center grayscale',tipo:"img",pos:'d2',src:'Web/icons/noun_climafuturo_color.png',width:"80px",rowspan:4,colspan:3,onclick:"usar",parametros:'0',cursor:"pointer",title:"Clima al futuro"},
			{ style:'halign-center grayscale',tipo:"img",pos:'g2',src:'Web/icons/noun_conectividad_gris.png',width:"80px",rowspan:4,colspan:3,onclick:"usar2",parametros:'0',cursor:"pointer",title:"Conectividad"},
			{ style:'halign-center valign-middle',tipo:"img",pos:'a2',src:'/assets_conabio/icons/icon-thermometer.svg',rowspan:3,width:"30px"},
			{ style:'halign-center valign-middle',tipo:"img",pos:'a5',src:'/assets_conabio/icons/icon-drop.svg',width:"30px",rowspan:1},
			{ style:'valign-middle',tipo:'span',pos:'b2',texto:"media: |0 °C",getExtra:media, colspan:2},
			{ style:'valign-middle',tipo:'span',pos:'b3',texto:"máxima: |0 °C",getExtra:maxima, colspan:2},
			{ style:'valign-middle',tipo:'span',pos:'b4',texto:"mínima: |0 °C",getExtra: minima, colspan:2},
			{ style:'valign-middle',tipo:'span',pos:'b5',texto:"|0 mm",getExtra:prec}
		]			
		*/

	}];

	createFusionTM(plantillaANP);
}
function buscarANPXEstado(element,band){
	if(anpCargadas || munCargadas){
		if(anpCargadas)
			alert('Debes desmarcar la capa de ANP');
		else if(munCargadas)
			alert('Debes desmarcar Municipios');
		return;
	}

	var idEst=parseInt($(element).attr("data-target"));	
	if(!entCargadas){
		nombresEstados[parseInt(idEst)] = $(element).find("span").html();
		cargarEntidades();
		entCargadas=true;
		setTimeout(function(){			
			if(band === undefined){
				polsEnt.setVisible(false);
				polT.setVisible(true);
			}
			var polT = polsEnt.elements[idEst];
			polT.setOptions({fillOpacity:1, fillColor:colorEncima});
			setTimeout(function(){
				polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
			},500);
			setTimeout(function(){
				polT.setOptions({fillOpacity:1, fillColor:colorEncima});
			},1000);
			setTimeout(function(){
				polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
			},1500);
			if(band === undefined){
				setTimeout(function(){
					polT.setVisible(false);
				},2000);
			}
			var candb = getCenterAndBoundsFromPol(polT);
			var zoom = getZoomByBounds(map,candb[1]);
			map.setZoom(zoom);
			map.setCenter(candb[0],zoom);
		},
		4500);
	} else {		
		var polT = polsEnt.elements[idEst];
		if(band === undefined){
			polsEnt.setVisible(false);
			polT.setVisible(true);
		}
		polT.setOptions({fillOpacity:1, fillColor:colorEncima});		
		setTimeout(function(){
			polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
		},500);
		setTimeout(function(){
			polT.setOptions({fillOpacity:1, fillColor:colorEncima});
		},1000);
		setTimeout(function(){
			polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
		},1500);
		if(band === undefined){
			setTimeout(function(){
				polT.setVisible(false);
			},2000);
		}
		var candb = getCenterAndBoundsFromPol(polT);
		var zoom = getZoomByBounds(map,candb[1]);
		map.setZoom(zoom);
		map.setCenter(candb[0],zoom);
	}
}
// function buscarANPXMunicipios(element,band){
	// var idMun=parseInt($(elemmun).attr("data-target"));	
	// if(!munCargadas){
		// nombresEstados[parseInt(idMun)] = $(elemmun).find("span").html();
		// cargarmunidades();
		// munCargadas=true;
		// setTimeout(function(){			
			// if(band === undefined){
				// polsmun.setVisible(false);
				// polT.setVisible(true);
			// }
			// var polT = polsmun.elemmuns[idMun];
			// polT.setOptions({fillOpacity:1, fillColor:colorEncima});
			// setTimeout(function(){
				// polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
			// },500);
			// setTimeout(function(){
				// polT.setOptions({fillOpacity:1, fillColor:colorEncima});
			// },1000);
			// setTimeout(function(){
				// polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
			// },1500);
			// if(band === undefined){
				// setTimeout(function(){
					// polT.setVisible(false);
				// },2000);
			// }
			// var candb = getCmunerAndBoundsFromPol(polT);
			// var zoom = getZoomByBounds(map,candb[1]);
			// map.setZoom(zoom);
			// map.setCmuner(candb[0],zoom);
		// },
		// 4500);
	// } else {		
		// var polT = polsmun.elemmuns[idMun];
		// if(band === undefined){
			// polsmun.setVisible(false);
			// polT.setVisible(true);
		// }
		// polT.setOptions({fillOpacity:1, fillColor:colorEncima});		
		// setTimeout(function(){
			// polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
		// },500);
		// setTimeout(function(){
			// polT.setOptions({fillOpacity:1, fillColor:colorEncima});
		// },1000);
		// setTimeout(function(){
			// polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
		// },1500);
		// if(band === undefined){
			// setTimeout(function(){
				// polT.setVisible(false);
			// },2000);
		// }
		// var candb = getCmunerAndBoundsFromPol(polT);
		// var zoom = getZoomByBounds(map,candb[1]);
		// map.setZoom(zoom);
		// map.setCmuner(candb[0],zoom);
	// }
// }
function selANP(element){
	if(munCargadas || entCargadas){
		if(munCargadas)
			alert('Debes desmarcar Municipios');
		else if(entCargadas)
			alert('Debes desmarcar Estados');
		return;
	}

	var idANP=$(element).attr("data-target");
	var polT = polsANP.elements[parseInt(idANP)];	
	polT.setOptions({fillOpacity:1, fillColor:colorEncima});
	setTimeout(function(){
		polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
	},500);
	setTimeout(function(){
		polT.setOptions({fillOpacity:1, fillColor:colorEncima});
	},1000);
	setTimeout(function(){
		polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
	},1500);
	var candb = getCenterAndBoundsFromPol(polT);
	var zoom = getZoomByBounds(map,candb[1]);
	map.setZoom(zoom);
	map.setCenter(candb[0],zoom);
	//enviaAux(2,idANP,0);
}
function selMun(element){

	if(anpCargadas || entCargadas){
		if(anpCargadas)
			alert('Debes desmarcar la capa de ANP');
		else if(entCargadas)
			alert('Debes desmarcar Estados');
		return;
	}

	var idEst = $(element).attr("data-target");
	var idMun = $(element).attr("data-target2");
	if(idMun.length == 1){
		idMun = '00'+idMun;
	}
	else if(idMun.length == 2){
		idMun = '0'+idMun;
	}
	var newIdMun = parseInt(idEst+idMun);
	console.log('newidMun en selMun()', newIdMun);

	if(munCargadas == false){
	//	estadosByMunCargados[idEst-1] = true;
		//cargarMunicipios(idEst);
		//cargarMunicipios();
		mostrarOcultarMun();
		setTimeout(function(){
			//var polT = polsMun[idEst-1].elements[parseInt(idMun)];
			var polT = polsMun.elements[newIdMun];
			polT.setOptions({fillOpacity:1, fillColor:colorEncima});
			setTimeout(function(){
				polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
			},500);
			setTimeout(function(){
				polT.setOptions({fillOpacity:1, fillColor:colorEncima});
			},1000);
			setTimeout(function(){
				polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
			},1500);
			var candb = getCenterAndBoundsFromPol(polT);
			var zoom = getZoomByBounds(map,candb[1]);
			map.setZoom(zoom);
			map.setCenter(candb[0],zoom);
		}, 2000);
	}
	else{
		//var polT = polsMun[idEst-1].elements[parseInt(idMun)];
		var polT = polsMun.elements[newIdMun];
		polT.setOptions({fillOpacity:1, fillColor:colorEncima});
		setTimeout(function(){
			polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
		},500);
		setTimeout(function(){
			polT.setOptions({fillOpacity:1, fillColor:colorEncima});
		},1000);
		setTimeout(function(){
			polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
		},1500);
		var candb = getCenterAndBoundsFromPol(polT);
		var zoom = getZoomByBounds(map,candb[1]);
		map.setZoom(zoom);
		map.setCenter(candb[0],zoom);
	}

	// var polT = polsMun[idEst-1].elements[parseInt(idMun)];
	// polT.setOptions({fillOpacity:1, fillColor:colorEncima});
	// setTimeout(function(){
	// 	polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
	// },500);
	// setTimeout(function(){
	// 	polT.setOptions({fillOpacity:1, fillColor:colorEncima});
	// },1000);
	// setTimeout(function(){
	// 	polT.setOptions({fillOpacity:0.8, fillColor:colorBase});
	// },1500);
	// var candb = getCenterAndBoundsFromPol(polT);
	// var zoom = getZoomByBounds(map,candb[1]);
	// map.setZoom(zoom);
	// map.setCenter(candb[0],zoom);
}

//function markANPAux(boton,idANP){
function markANPAux(idANP){
	idANP = parseInt(idANP);
	markANP(idANP);
	// var index = isANPMarked(idANP);
	// if(index==-1){
		// $(boton).css("transform","rotate(0deg)");
		// $(boton).attr("title","Seleccionar");
	// }else{
		// $(boton).css("transform","rotate(45deg)");
		// $(boton).attr("title","Deseleccionar");
	// }
}
function usar(boton,idANP){	
	enviaAux(2,idANP,0, true);
	//console.log('boton en usar: ', boton);
}
function usar2(boton,idANP){	
	enviaAux(2,idANP,0, false);
	//console.log('boton en usar: ', boton);
}
function usarEnt(boton,idEst){	
	enviaAuxEnt(2,idEst,0);
}
function usarMun(boton,idMun,idEst){	
	newIdMun = parseInt(idEst+idMun);
	//console.log('enviar el municipio: ', idMun);
	//console.log('idEst: ', idEst);
	//console.log('idMun: ', idMun);
	//console.log('NEWidMun: ', newIdMun);
	console.log('en usarMun');
	console.log('idEst: ', idEst);
	console.log('idMun: ', idMun);
	console.log('NEWidMun: ', newIdMun);
	enviaAuxMun(2,newIdMun,idMun, idEst,5);
}
function tituloANPF(idANP,color){
	if(color === undefined){
		color = "#999";
	}
	var t = $("#expanpANP").find("[data-target='"+idANP+"']").html().replace("<span>","").replace("</span>","");
	t = t.trim();
	var temp = t.split(" ");
	var catANP = temp[0].trim();
	temp.splice(0,1);
	var tituloANP = temp.join(" ");
	var dcANP = descCatANP[categoriasANP.indexOf(catANP)];
	tituloANP+="<br><p style='font-size: 0.65em; margin:0; color: "+color+" !important;'>"+dcANP+"</p>";
	return tituloANP;
}
function maxima(idANP){
	//return Math.round(bioTempPMax[idANP][2]*100)/100;
	console.log("bioTempMaxInfo: ", Math.round(bioTempMaxInfo2[idANP][2]*100).toFixed(1));
	return Math.round(bioTempMaxInfo2[idANP][2]*100)/100;
	//return Math.round(bioTempPMax[idANP][0]*100)/100;
}
function media(idANP){
	return Math.round(bioTempMedInfo2[idANP][2]*100)/100;
}
function minima(idANP){
	//return Math.round(bioTempPMin[idANP][2]*100)/100;
	return Math.round(bioTempMinInfo2[idANP][2]*100)/100;
	//return Math.round(bioTempPMin[idANP][0]*100)/100;
}
//Maxima2, media2, minima2 --> para mostrar solo 1 digito en la infoWindow
function maxima2(idANP){ return bioTempMaxInfo2[idANP][2].toFixed(1); }
function media2(idANP){return bioTempMedInfo2[idANP][2].toFixed(1); }
function minima2(idANP){ return bioTempMinInfo2[idANP][2].toFixed(1); }

function prec(idANP){
	return Math.round(bioTempPreInfo2[idANP][2]);
}
function hideWindowANP(e,columns,p){
	var idANP = parseInt(columns[0]);
	var index = isANPMarked(idANP);
	if(index == -1){
		p.setOptions({fillOpacity:$("#anpOpacityV").val()/100, fillColor:colorBase});
	}
}
function showWindowANP(e,columns,p,ventana){
	var idANP = parseInt(columns[0]);    
	var index = isANPMarked(idANP);
	if(index == -1){
		p.setOptions({fillOpacity:$("#anpOpacityV").val()/100, fillColor:colorEncima});
	}else{
		p.setOptions({fillOpacity:$("#anpOpacityV").val()/100, fillColor:colorClick});
	}
}
function hideWindowEnt(e,columns,p){
	var idEst = parseInt(columns[0]);
	var index = isEstMarked(idEst);
	if(index == -1){
		p.setOptions({fillOpacity:$("#entOpacityV").val()/100, fillColor:colorBase});
	}
}
function showWindowEnt(e,columns,p,ventana){
	var idEst = parseInt(columns[0]);    
	var index = isEstMarked(idEst);
	if(index == -1){
		p.setOptions({fillOpacity:$("#entOpacityV").val()/100, fillColor:colorEncima});
	}else{
		p.setOptions({fillOpacity:$("#entOpacityV").val()/100, fillColor:colorClick});
	}
}
/*
function hideWindowMun(e,columns,p){
	var newIdMun = parseInt(columns[0]+columns[2]);
	//var idMun = parseInt(columns[0]);
	//var index = isMunMarked(idMun);
	var index = isMunMarked(newIdMun);
	if(index == -1){
		p.setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorBase});
	}
}
function showWindowMun(e,columns,p,ventana){
	var newIdMun = parseInt(columns[0]+columns[2]);
	//var idMun = parseInt(columns[0]);    
	//var index = isMunMarked(idMun);
	var index = isMunMarked(newIdMun);
	if(index == -1){
		p.setOptions({fillOpacity:1, fillColor:colorEncima});
	}else{
		p.setOptions({fillOpacity:1, fillColor:colorClick});
	}
}
*/
/////////////
function hideWindowMun(e,columns,p){
	//console.log('mouse ouut');
	var newIdMun = parseInt(columns[2]+columns[0]);
	var index = isMunMarked(newIdMun);
	/*console.log('columns mouseout: ', columns);
	console.log('newIdMun mouseout: ', newIdMun);
	console.log("cveMunMarked en mouseout: ", cveMunMarked);
	console.log("index en mouseout: ", index);*/
	if(index == -1){
		p.setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorBase});
	}
}
function showWindowMun(e,columns,p,ventana){
	//console.log('mouse over');
	//console.log(ventana);
	var newIdMun = parseInt(columns[2]+columns[0]);
	var index = isMunMarked(newIdMun);
	if(index == -1){
		p.setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorEncima});
	}else{
		p.setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorClick});
	}
}
/////////////


function successC(totalAdded,offset){
	if(offset == 0 && totalRowsInt == null){		
		zoomMexico();	
	}else if(totalAdded == totalRowsInt){
		totalRowsInt = null;		
		zoomMexico();
		callbackAsync();
	/*	setTimeout(function(){
			console.log("termino de cargar!!! cortina eliminada");
			$('#mensajePrecarga').remove();
		}, 22000);*/
	}

}
function successEnt(){
	for(var index in infoEnt){
		nombresEstados[index] = infoEnt[index][1];
	}
	$('#mensajePrecarga3').hide();
}
function successMun(){
	console.log("Done munucipios");
	nombresMunicipios = [];
	for(var index in infoMun){
		nombresMunicipios[index] = infoMun[index][1];
	}
	$('#mensajePrecarga2').hide();
}
function cambioGrafica(e,flag){
	var extra = flag?"":"G";	
	var id = e.target.id;
	var pos = id.substr(id.length - 1);
	var pol = graficadosTypes[pos];
	var metadata = graficadosIds[pos];
	printLog(pos+" "+pol+" "+metadata);
	if(pol == 3){
		metadata = lastPath;
	}
	var temporada=$("#tiempo"+extra+pos).val();
	var variable=$("#variable"+extra+pos).val();
	var forzamiento=$("#forzamiento"+extra+pos).val();
	var modelo;
	if(flag){
		modelo=$("#modelo"+extra+pos).val();
	}
	envia(variable,metadata,pol,temporada,forzamiento,modelo,flag);
}

function cambioProtConn(e){
	var id = e.target.id;
	var posGrafica = id.substr(id.length - 1);
	var anp = graficadosIds[posGrafica];
	//graphicProtConn
	console.log("Evento en changePRotCOnn: ", anp," ",posGrafica);
	graphicProtConn(posGrafica, anp, true);
}

function cambioMannKendall(e){
	var id = e.target.id;
	var posGrafica = id.substr(id.length - 1);
	var anp = graficadosIds[posGrafica];
	//graphicProtConn
	console.log("Evento en changeMannKendall: ", anp," ",posGrafica);
	graphicMannKendall(posGrafica, anp, true);
}

function cambioEstabilidad(e){
	//console.log('Evento Est: ', e);
	var id = e.target.id;
	var posGrafica = id.substr(id.length - 1);
	var anp = graficadosIds[posGrafica];
	
	//graphicEstabilidad
	console.log("Evento en Estabilidad: ", anp," ",posGrafica);
	graphicEstabilidad(posGrafica, anp, true, currentP);
}

function cambioTendencia(e){
	//console.log('Evento tend: ', e);
	var id = e.target.id;
	var posGrafica = id.substr(id.length - 1);
	var anp = graficadosIds[posGrafica];
	//console.log("id tendencia: ", id);
	//graphicTendencia
	//console.log("Evento en Tendencia: ", anp," ",posGrafica);
	graphicTendencia(posGrafica, anp, true);
}

function enviaAuxEnt(variable, anp, pol){
	//$("#showHide").click();
	showCambioClimatico();
	for(var j=0;j<4;j++){
		$("#tiempo"+j).val("1");
		$("#variable"+j).val("4");
		$("#modelo"+j).val("1");
		$("#forzamiento"+j).val("1");
		$("#tiempoG"+j).val("1");
		$("#variableG"+j).val("4");
		$("#forzamientoG"+j).val("1");				
	}
	if(cveEntMarked.length==1){
		if(anp!=cveEntMarked[0]){
			//polsEnt.elements[cveEntMarked[0]].setOptions({fillOpacity:$("#entOpacityV").val()/100, fillColor:colorBaseEnt});
			polsEnt.elements[cveEntMarked[0]].setOptions({fillOpacity:$("#entOpacityV").val()/100, fillColor:colorBase});
			cveEntMarked = [];			
			graficadosIds = [-1, -1, -1, -1];
			graficadosTypes = ["", "", "", ""];			
			markEnt(anp);
		}		
	} else if(cveEntMarked.length==0){
		markEnt(anp);
	}
}
function enviaAuxMun(variable, newIdMun, idMun, idEst, pol){
	//$("#showHide").click();
	console.log('en enviaAuxMun');
	console.log('idEst: ', idEst);
	console.log('idMun: ', idMun);
	console.log('NEWidMun: ', newIdMun);
	
	showCambioClimatico();
	for(var j=0;j<4;j++){
		$("#tiempo"+j).val("1");
		$("#variable"+j).val("4");
		$("#modelo"+j).val("1");
		$("#forzamiento"+j).val("1");
		$("#tiempoG"+j).val("1");
		$("#variableG"+j).val("4");
		$("#forzamientoG"+j).val("1");				
	}
	if(cveMunMarked.length==1){
		if(newIdMun!=cveMunMarked[0]){
			//polsMun[idEst-1].elements[cveMunMarked[0]].setOptions({fillOpacity:$("#anpOpacityV").val()/100, fillColor:colorBase});
			polsMun.elements[cveMunMarked[0]].setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorBase});
			cveMunMarked = [];			
			graficadosIds = [-1, -1, -1, -1];
			graficadosTypes = ["", "", "", ""];			
			markMun(idMun, idEst);
		}		
	} else if(cveMunMarked.length==0){
		markMun(idMun, idEst);
	}
}
function enviaAux(variable, anp, pol, flag){
	//$("#showHide").click();
	//graphicEstabilidad(0, anp, false);
	if(flag){
		lastPanel = null;
		showCambioClimatico(true);	
	}
	else{
		lastPanel = null;
		showConectividad(true);
	}

	for(var j=0;j<4;j++){
		$("#tiempo"+j).val("1");
		$("#variable"+j).val("4");
		$("#modelo"+j).val("1");
		$("#forzamiento"+j).val("1");
		$("#tiempoG"+j).val("1");
		$("#variableG"+j).val("4");
		$("#forzamientoG"+j).val("1");	
	}	
	if(cveANPMarked.length==1){
		if(anp!=cveANPMarked[0]){
			polsANP.elements[cveANPMarked[0]].setOptions({fillOpacity:$("#anpOpacityV").val()/100, fillColor:colorBase});
			cveANPMarked = [];			
			graficadosIds = [-1, -1, -1, -1];
			graficadosTypes = ["", "", "", ""];
			markANP(anp);
		}		
	} else if(cveANPMarked.length==0){
		markANP(anp);
	}
}
function markANP(cveANP){	
	clearDraws();
	cveANP = parseInt(cveANP);
	var index = isANPMarked(cveANP);
	if(index>-1){
		var it = graficadosIds.indexOf(cveANP+"");
		polsANP.elements[cveANP].setOptions({fillOpacity:$("#anpOpacityV").val()/100, fillColor:colorBase});
		cveANPMarked.splice(index,1);
		if(it != -1){
			if(graficadosTypes[it] == 0){
				graficadosIds[it]=-1;
				graficadosTypes[it]="";
				$("#graficasC"+it).hide();
			}
		}
	} else {		
		if(cveANPMarked.length == 4){
			alert("Lo sentimos, solo puede fijar 4 ANPs");
			return 0;
		}
		if(cveEntMarked.length>0){
			clearMap();
			$("#graficasC1").hide();
			$("#graficasC2").hide();
			$("#graficasC3").hide();
		}
		if(cveMunMarked.length>0){
			clearMap();
			$("#graficasC1").hide();
			$("#graficasC2").hide();
			$("#graficasC3").hide();
		}
		polsANP.elements[cveANP].setOptions({fillOpacity:1, fillColor:colorClick});
		cveANPMarked.push(cveANP);		
		variableG = VARIABLE_DEFAULT;
		anpG = cveANP+"";
		polG = 0;
		temporadaG=TEMPORADA_DEFAULT;
		envia(variableG, anpG, polG,temporadaG);
	}
	if(cveANPMarked.length==0){
		$("#cortina").show();
		$("#graficasC0").hide();
	}
	//para el reporte
	//infoWindowReporte.push([media(cveANP), maxima(cveANP), minima(cveANP), prec(cveANP)]);
	//console.log("infowWIndowReporte: ", infoWindowReporte);
}
function markEnt(idEst){
	clearDraws();
	idEst = parseInt(idEst);
	var index = isEstMarked(idEst);
	if(index>-1){
		var it = graficadosIds.indexOf(idEst+"");
		polsEnt.elements[idEst].setOptions({fillOpacity:$("#entOpacityV").val()/100, fillColor:colorBase});
		cveEntMarked.splice(index,1);
		if(it != -1){
			if(graficadosTypes[it] == 1){
				graficadosIds[it]=-1;
				graficadosTypes[it]="";				
				$("#graficasC"+it).hide();
			}
		}
	} else {
		if(cveEntMarked.length == 4){
			alert("Lo sentimos, solo puede fijar 4 Estados");
			return 0;
		}
		if(cveANPMarked.length>0){
			clearMap();
			$("#graficasC1").hide();
			$("#graficasC2").hide();
			$("#graficasC3").hide();
		}
		if(cveMunMarked.length>0){
			clearMap();
			$("#graficasC1").hide();
			$("#graficasC2").hide();
			$("#graficasC3").hide();
		}
		polsEnt.elements[idEst].setOptions({fillOpacity:$("#entOpacityV").val()/100, fillColor:colorClick});
		cveEntMarked.push(idEst);		
		variableG = VARIABLE_DEFAULT;
		anpG = idEst+"";
		polG = 1;
		temporadaG=TEMPORADA_DEFAULT;
		envia(variableG, anpG, polG,temporadaG);
	}
	if(cveEntMarked.length==0){
		$("#cortina").show();
		$("#graficasC0").hide();
	}
	return 1;
}
function markMun(idMun, idEst){
	clearDraws();
	var newIdMun = parseInt(idEst+idMun);
	idEst = parseInt(idEst);
	idMun = parseInt(idMun);
	console.log('en markMun: ');
	console.log('idEst: ', idEst);
	console.log('idMun: ', idMun);
	console.log('NEWidMun: ', newIdMun);
	var index = isMunMarked(newIdMun);
	if(index>-1){
		var it = graficadosIds.indexOf(newIdMun+"");
		//polsMun[idEst-1].elements[idMun].setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorBase});
		polsMun.elements[newIdMun].setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorBase});
		cveMunMarked.splice(index,1);
		if(it != -1){
			if(graficadosTypes[it] == 5){
				graficadosIds[it]=-1;
				graficadosTypes[it]="";				
				$("#graficasC"+it).hide();
			}
		}
	} else {
		if(cveMunMarked.length == 4){
			alert("Lo sentimos, solo puede fijar 4 Municipios");
			return 0;
		}
		if(cveANPMarked.length>0){
			clearMap();
			$("#graficasC1").hide();
			$("#graficasC2").hide();
			$("#graficasC3").hide();
		}
		if(cveEntMarked.length>0){
			clearMap();
			$("#graficasC1").hide();
			$("#graficasC2").hide();
			$("#graficasC3").hide();
		}
		//polsMun[idEst-1].elements[idMun].setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorClick});
		polsMun.elements[newIdMun].setOptions({fillOpacity:$("#munOpacityV").val()/100, fillColor:colorClick});
		//cveMunMarked.push(newIdMun);
		cveMunMarked.push(newIdMun);		
		variableG = VARIABLE_DEFAULT;
		anpG = newIdMun+"";
		polG = 5;
		temporadaG=TEMPORADA_DEFAULT;
		console.log("marcados longitud mun: ", cveMunMarked.length);

		// //$("#mensajeInicial").hide();
		// if($('#mensajePol').length == 0){
		// 	$("#cortina").append("<div id='mensajePol' style='line-height: 0.8;'>Espera un momento por favor.<br><br><b>Calculando datos...</b><br><small style='font-size: 55%;'>Esto puede tardar varios minutos dependiendo del tamaño del area seleccionada (aproximadamente cinco minutos para todo el país), porque el motor algebraico debe calcular las estadísticas para todas las celdas. <br>Estamos trabajando en una versión por muestreos mucho más rápida.</small></div>");
		// 	$("#cortina").show();
		// }
		
		//$("#mensajePrecarga4").show();
		//$.blockUI;
		setTimeout(function(){
			envia(variableG, anpG, polG,temporadaG);
		},100);
		//envia(variableG, anpG, polG,temporadaG);
	}
	if(cveMunMarked.length==0){
		$("#cortina").show();
		$("#graficasC0").hide();
	}
	return 1;
}
function actualizaDatos(nombre, unidad, idCapa){
	$("#contenidoBox").find('.nombre').html(nombre);
	$("#contenidoBox").find('.unidad').html(unidad);
	$.ajax({
		url : 'Web/obtenEstilos.php',
		dataType : 'json',
		data: {
			idCapa: idCapa,
			bd: home
		},
		type:"POST",
		success: function(style2) {			
			if(style2==null || style2.trim()=="") return;
			style2=style2.split('\'').join('"');
			style2=style2.split('where').join('"where"');
			style2=style2.split('iconName').join('"iconName"');
			style2=style2.split('fillColor').join('"fillColor"');
			style2=style2.split('fillOpacity').join('"fillOpacity"');
			style2=style2.split('strokeColor').join('"strokeColor"');
			style2=style2.split('strokeWeight').join('"strokeWeight"');
			if(style2.indexOf('polygonOptions')>=0)
				style2=style2.split('polygonOptions').join('"polygonOptions"');
			if(style2.indexOf('polylineOptions')>=0){
				style2=style2.split('polylineOptions').join('"polylineOptions"');
			}
			if(style2.indexOf('markerOptions')>=0)
				style2=style2.split('markerOptions').join('"markerOptions"');
			style2=style2.split('},]').join('}]');
			if(style2.indexOf('valFill')>=0)
				style=JSON.parse(style2.split('valFill').join('1'));
			else
				style=JSON.parse(style2);
			var minMaxColores = getMinMaxColors(style);
			var minimos = minMaxColores.min;
			var maximos = minMaxColores.max;
			var colores = minMaxColores.color;
			var tipo = getTipo(minimos, maximos);
			$("#contenidoBox").find(".listaColores").empty();
			if(tipo == 'strech'){
				$("#contenidoBox").find(".listaColores").hide();
				$("#contenidoBox").find('.color-gradient').show();
				$("#contenidoBox").find('.color-minmax').show();
				$("#contenidoBox").find('.unidad').show();
				minimos.sort(function(a, b){return a-b});
				maximos.sort(function(a, b){return a-b});
				var min = minimos[0];
				var max = maximos[maximos.length-1];
				var colores = getCodes(colores);
				$("#contenidoBox").find('.color-gradient').css('background','linear-gradient(to right,'+colores+')');
				$("#contenidoBox").find('.color-minmax').html("["+min+" , "+max+"]");
			} else if(style.length > 1){
				$("#contenidoBox").find(".listaColores").show();
				$("#contenidoBox").find('.color-gradient').hide();
				$("#contenidoBox").find('.color-minmax').hide();
				$("#contenidoBox").find('.unidad').hide();				
				for(i=style.length-1;i>=0;i--){
					var legendItem = document.createElement('div');
					legendItem.style.height=30;
					legendItem.style.display="flex";
					var color = document.createElement('div');
					if(style[i].polygonOptions!= undefined)
						color.style.backgroundColor = style[i].polygonOptions.fillColor;
					if(style[i].markerOptions!=undefined)
						color.style.backgroundImage = "url('"+pathIcons+style[i].markerOptions.iconName+".png')";
					legendItem.appendChild(color);
					var minMax = document.createElement('span');
					minMax.style.width="90%";
					var min = minimos[i];
					if(min == "0" && unidad == ""){
						minMax.innerHTML = "";
					}else{
						if(isNaN(maximos[i])&&maximos[i]!=0){
							min = maximos[i];
							minMax.innerHTML = min+' '+unidad;
						}else{
							minMax.innerHTML = min+' '+unidad;
						}
					}
					legendItem.appendChild(minMax);
					$("#contenidoBox").find(".listaColores").append(legendItem);
				}
			}
		}
	});
	$.ajax({
		url : 'Web/obtenDescripcion.php',
		dataType : 'json',
		data: {			
			idCapa: idCapa,
			bd: home
		},
		type:"POST",
		success: function(json) {
			$("#contenidoBox").find('.descripcion').html(json);
		}
	});
}
function actualizaDatos2(unidad, idCapa,leyenda){	
	$("#datos"+idCapa).find('.unidad').html(unidad);
	$("#leyenda"+idCapa).find('.leyenda').html(leyenda.replaceAll(" ","&nbsp;"));	
	$.ajax({
		url : 'Web/obtenEstilos.php',
		dataType : 'json',
		data: {			
			idCapa: idCapa,
			bd: home
		},
		type:"POST",
		success: function(style2) {			
			if(style2 == "") return;
			style2=style2.split('\'').join('"');
			style2=style2.split('where').join('"where"');
			style2=style2.split('iconName').join('"iconName"');
			style2=style2.split('fillColor').join('"fillColor"');
			style2=style2.split('fillOpacity').join('"fillOpacity"');
			style2=style2.split('strokeColor').join('"strokeColor"');
			style2=style2.split('strokeWeight').join('"strokeWeight"');
			if(style2.indexOf('polygonOptions')>=0)
				style2=style2.split('polygonOptions').join('"polygonOptions"');
			if(style2.indexOf('polylineOptions')>=0){
				style2=style2.split('polylineOptions').join('"polylineOptions"');
			}
			if(style2.indexOf('markerOptions')>=0)
				style2=style2.split('markerOptions').join('"markerOptions"');
			style2=style2.split('},]').join('}]');
			if(style2.indexOf('valFill')>=0)
				style=JSON.parse(style2.split('valFill').join('1'));
			else
				style=JSON.parse(style2);
			var minMaxColores = getMinMaxColors(style);
			var minimos = minMaxColores.min;
			var maximos = minMaxColores.max;
			var colores = minMaxColores.color;
			var tipo = getTipo(minimos, maximos);
			if(tipo == 'strech'){
				$("#datos"+idCapa).find(".listaColores").attr("style","display:none !important;");
				minimos.sort(function(a, b){return a-b});
				maximos.sort(function(a, b){return a-b});
				var min = minimos[0];
				var max = maximos[maximos.length-1];
				var colores = getCodes(colores);
				$("#datos"+idCapa).find('.color-gradient').css('background','linear-gradient(to right,'+colores+')');
				$("#datos"+idCapa).find('.color-minmax').html("["+min+" , "+max+"]");
			} else if(style.length >= 1){
				if(style.length == 1 && style[0].markerOptions === undefined){
					$("#points"+idCapa).val("1");
					$("#capa"+idCapa).find("output").html("1");
				}
				$("#datos"+idCapa).find('.color-gradient').hide();
				$("#datos"+idCapa).find('.color-minmax').hide();
				$("#datos"+idCapa).find('.unidad').hide();
				for(i=0;i<style.length;i++){
					var legendItem = document.createElement('div');
					legendItem.style.height=30;
					var color = document.createElement('div');					
					if(style[i].polygonOptions !== undefined)
						color.style.backgroundColor = style[i].polygonOptions.fillColor;
					if(style[i].polylineOptions !== undefined)
						color.style.backgroundColor = style[i].polylineOptions.strokeColor;
					if(style[i].markerOptions !== undefined){
						color.style.backgroundImage = "url('"+pathIcons+style[i].markerOptions.iconName+".png')";
						color.style.backgroundRepeat = "no-repeat";
						color.style.backgroundPosition = "center";
						color.style.backgroundSize = "cover";
					}
					legendItem.appendChild(color);
					var minMax = document.createElement('span');
					var min = minimos[i];
					if(min == "0" && unidad == ""){
						minMax.innerHTML = "";
					}else{
						if(isNaN(maximos[i])&&maximos[i]!=0){
							min = maximos[i];
							minMax.innerHTML = min+' '+unidad;
						}else{
							minMax.innerHTML = min+' '+unidad;
						}
					}
					legendItem.appendChild(minMax);
					$("#datos"+idCapa).find(".listaColores").append(legendItem);
				}
			}
		}
	});
}
function getCodes(colores){
	var temp = "";
	for(i = 0; i < colores.length;i++){
		var r = parseInt(colores[i].substr(1,2), 16);
		var g = parseInt(colores[i].substr(3,2), 16);
		var b = parseInt(colores[i].substr(5,2), 16);
		temp += 'rgb('+r+','+g+','+b+'),';
	}
	return temp.substring(0,temp.length-1);
}
function getMinMaxColors(style){
	var columnWhere;
	if(style[0].where.indexOf(" AND ")>0){
		columnWhere = getWhereColumn(style[0].where.split(" AND ")[0].trim());
	} else if(style[0].where.indexOf(" OR ")>0){
		columnWhere = getWhereColumn(style[0].where.split(" OR ")[0].trim());
	} else if(style[0].where.indexOf("$")>0){
		columnWhere = getWhereColumn(style[0].where.split("$")[0].trim());
	}
	var colores = [];
	var minimos = [];
	var maximos = [];
	for(i=0;i<style.length;i++){
		limits = style[i].where.replaceAll("<","").replaceAll(">","").replaceAll("=","");
		if(limits.indexOf(" AND ")>0){
			limits = limits.split(" AND ");
		}else if(limits.indexOf(" OR ")>0){
			limits = limits.split(" OR ");
		}else if(limits.indexOf("$")>0){
			limits = limits.split("$");
		}
		var temp1 = limits[0].replace(columnWhere,"");
		var temp2 = limits[1].replace(columnWhere,"");
		limits[0] = isNaN(parseInt(temp1))?temp1.trim():Math.round(temp1);
		limits[1] = isNaN(parseInt(temp2))?temp2.trim():Math.round(temp2);
		minimos.push(limits[0]);
		maximos.push(limits[1]);
		if(style[i].polygonOptions!= undefined)
			colores.push(style[i].polygonOptions.fillColor);
	}
	return {min: minimos, max: maximos, color: colores};
}
function getTipo(minimos, maximos){
	var band = true;
	if(minimos.length>1){
		for(var i = 0; i < minimos.length; i++){
			if(minimos[i] != maximos[i]){
				if(maximos[i]!=0&&!isNaN(maximos[i])){
					band = false;
					break;
				}
			}
		}
	}
	return band?'categorias':'strech';
}
function panelColor(){	
	$("#panelDesign").toggle();

	if($("#panelDesign").attr("style") == "display: block;" && $("#dibujar").attr("style") == "display: block;"){
		console.log("entre");
		$("#dibujar").toggle();
	}
	else if($("#panelDesign").attr("style") == "display: block;" && $("#panelBasemaps").attr("style") == "display: block;"){
		console.log("entre");
		$("#panelBasemaps").toggle();
	}
}
function baseMaps(){	
	$("#panelBasemaps").toggle();

	if($("#panelBasemaps").attr("style") == "display: block;" && $("#dibujar").attr("style") == "display: block;"){
		console.log("entre");
		$("#dibujar").toggle();
	}
	else if($("#panelBasemaps").attr("style") == "display: block;" && $("#panelDesign").attr("style") == "display: block;"){
		console.log("entre");
		$("#panelDesign").toggle();
	}
	//console.log("dibujar: ", $("#dibujar").attr("style"));
	//console.log("basempas:", $("#panelBasemaps").attr("style"));
}
function dibujar(){
	$("#dibujar").toggle();

	if($("#dibujar").attr("style") == "display: block;" && $("#panelBasemaps").attr("style") == "display: block;"){
		console.log("entre");
		$("#panelBasemaps").toggle();
	}
	else if($("#dibujar").attr("style") == "display: block;" && $("#panelDesign").attr("style") == "display: block;"){
		console.log("entre");
		$("#panelDesign").toggle();
	}
	//console.log("dibujar: ", $("#dibujar").attr("style"));
	//console.log("basempas:", $("#panelBasemaps").attr("style"));
}
function setMap(tipo){
	$(".fa-circle").removeClass("fas").removeClass("far").addClass("far");
	$("#panel0"+tipo).find(".fa-circle").removeClass("far").addClass("fas");
	switch(tipo){
		case 1:
			map.setMapTypeId(google.maps.MapTypeId.SATELLITE);			
			break;
		case 2:
			map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
			break;
		case 3:
			map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			break;			
		case 4:
			map.setMapTypeId(google.maps.MapTypeId.HYBRID);
			break;		
	}
}
function isANPMarked(cveANP){
	var index = cveANPMarked.indexOf(cveANP);
	return index;
}
function isEstMarked(idEst){
	var index = cveEntMarked.indexOf(idEst);
	return index;
}
function isMunMarked(idMun){
	var index = cveMunMarked.indexOf(idMun);
	return index;
}
function getCenterAndBoundsFromPol(pol,type){
	var x1, x2, y1, y2, bounds;
	if(type === undefined){
		var lats =[], lngs = [];
		var vertices = pol.getPaths();	
		for(var j = 0; j < vertices.getLength(); j++){
			for(var i = 0; i < vertices.getAt(j).getLength(); i++){
				lats[i]=vertices.getAt(j).getAt(i).lat();
				lngs[i]=vertices.getAt(j).getAt(i).lng();
			}
		}
		x1=Math.min.apply(Math, lats);
		x2=Math.max.apply(Math, lats);
		y1=Math.min.apply(Math, lngs);
		y2=Math.max.apply(Math, lngs);
		bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(x1,y1),
			new google.maps.LatLng(x2,y2)
		);		
	} else {
		bounds = pol.getBounds();
		var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();
		x1 = sw.lat();
		y1 = sw.lng();
		x2 = ne.lat();
		y2 = ne.lng();
	}
	centX=x1+((x2-x1)/2);
	centY=y1+((y2-y1)/2);
	return [new google.maps.LatLng(centX,centY),bounds];
}
function mostrarOcultar(){
	if(entCargadas || munCargadas){
		if(entCargadas)
			alert('Debes desmarcar Entidades');
		else if(munCargadas)
			alert('Debes desmarcar Municipios');
		return;
	}

	var check = $(".hSANP").find("svg").hasClass("fa-toggle-on");
	var add = check?"off":"on";
	var remove = check?"on":"off";
	//var label = check?"Mostrar":"Ocultar";	
	$(".hSANP").find("svg").addClass("fa-toggle-"+add);
	$(".hSANP").find("svg").removeClass("fa-toggle-"+remove);
	if($("#anpLeaf").hasClass("active")){
		$("#anpLeaf").removeClass("active");
	} else {
		$("#anpLeaf").addClass("active")
	}
	//$("#hSANP").find("label").html(label);
	polsANP.setVisible(!check);
	anpCargadas = !check;
}
function mostrarOcultarEnt(){
	if(anpCargadas || munCargadas){
		if(anpCargadas)
			alert('Debes desmarcar la capa de ANP');
		else if(munCargadas)
			alert('Debes desmarcar Municipios');
		return;
	}
	var check = $(".hSEnt").find("svg").hasClass("fa-toggle-on");
	var add = check?"off":"on";
	var remove = check?"on":"off";
	// var label = check?"Mostrar estados":"Ocultar estados";	
	$(".hSEnt").find("svg").addClass("fa-toggle-"+add);
	$(".hSEnt").find("svg").removeClass("fa-toggle-"+remove);
	// $(".hSEnt").find("label").html(label);
	if($("#entLeaf").hasClass("active")){
		$("#entLeaf").removeClass("active");
	} else {
		$("#entLeaf").addClass("active")
	}
	if(!entCargadas){
		$('#mensajePrecarga3').show();
		cargarEntidades();
		entCargadas=true;
		return;
	}	
	polsEnt.setVisible(!check);
	entCargadas = !check;
}
function mostrarOcultarMun(){
	if(anpCargadas || entCargadas){
		if(anpCargadas)
			alert('Debes desmarcar la capa de ANP');
		else if(entCargadas)
			alert('Debes desmarcar Estados');
		return;
	}
	var check = $(".hSMun").find("svg").hasClass("fa-toggle-on");
	var add = check?"off":"on";
	var remove = check?"on":"off";
	// var label = check?"Mostrar estados":"Ocultar estados";	
	$(".hSMun").find("svg").addClass("fa-toggle-"+add);
	$(".hSMun").find("svg").removeClass("fa-toggle-"+remove);
	// $(".hSMun").find("label").html(label);
	if(!munCargadas){
		$('#mensajePrecarga2').show();
		/*
		for(var i = 0; i < 32; i++){
			setTimeout(cargarMunicipios, i*1500, i+1);
		}*/
		cargarMunicipios();
		munCargadas=true;
		return;
	}
	//$('#mensajePrecarga2').hide();
	/*
	for(var i = 0; i < 32; i++)
		polsMun[i].setVisible(!check);
	*/
	polsMun.setVisible(!check);
	munCargadas = !check;
}
function cargarEntidades(){
	var entOpacityV = $("#entOpacityV").val()/100;
	var plantillaEnt = [{
		maxWidth: "180",
		test: true,
		tabla:{
			nombre: "1CHafYvXodZoBmN-eDN74OBHZ5sQZfc2JfZwGDdYf",
			columns: "CVE_ENT,NOM_ENT",
			where: null, columnaGeometria: "geometry", 
			style:[{
				polygonOptions:{
					//fillColor: colorBaseEnt, strokeColor: contornoEnt,fillOpacity:entOpacityV,
					fillColor: colorBase, strokeColor: "#FFFFFF",fillOpacity:entOpacityV,
					strokeWeight:0.8,strokeOpacity: 1
				}
			}]
		},
		key: key,map: map,storePol: "polsEnt",storeData: "infoEnt",data: "elements",idData: "ids",hasId: true,visible:true,zIndex:10,
		error: errorC,
		success: successEnt
	},{
		caja: {
			mouseover: showWindowEnt,mouseout: hideWindowEnt,mouseclick: markEnt
		},
		clase: 'gmBox-box-base',claseTabla: 'gmBox-box-table',cols:1,rows:3,widths:[150],
		cuerpo:[
			{ style:'gmBox-table-title',tipo:"span",pos:'a0',texto:"|1"},
			{ style:'gmBox-table-head',tipo:"span",pos:'a1',texto:"Clima a futuro",onclick:"usarEnt",parametros:'0',cursor:"pointer"},
			//{ style:'halign-center grayscale',tipo:"img",pos:'a2',src:'Web/icons/noun_climafuturo_gris_alpha.png',width:"120px",onclick:"usarEnt",parametros:'0',cursor:"pointer",title:"Graficar"},
			{ style:'halign-center inverted',tipo:"img",pos:'a2',src:'Web/icons/noun_climafuturo_gris_alpha.png',width:"80px",rowspan:1,colspan:1,onclick:"usarEnt",parametros:'0',cursor:"pointer",title:"Clima al futuro"},
		]
	}];
	createFusionTM(plantillaEnt);
}

function cargarMunicipios(){
	if(!munCargadas)
		munCargadas = true;

	//idEnt = idEnt-1;
	//var estado = estadosNames[idEnt];
	//console.log('estado elegido por municpio: ', estado);
	var munOpacityV = $("#munOpacityV").val()/100;
	var plantillaMun = [{
		maxWidth: "150",
		municipios: true,
		tabla:{
			//nombre: "1wVP9Qc9WqJKcoreFe9aCpJPIpzzaTaMciFwTZT8r",
			nombre: 'otBqmmCvA4',
			//columns: "COV_ID,NOMBRE_MUN",
			columns: "CVE_MUN,NOM_MUN,CVE_ENT",
			where: null, columnaGeometria: "geometry", 
			style:[{
				polygonOptions:{
					fillColor: colorBase, strokeColor: "#FFFFFF",fillOpacity:0.5,
					strokeWeight:0.8,strokeOpacity: 1
				}
			}]
		},
		//key: key,map: map,storePol: "polsMun"+"["+idEnt+"]",storeData: "infoMun"+"["+idEnt+"]",data: "elements",idData: "ids",hasId: true,visible:true,zIndex:10,
		key: key,map: map,storePol: "polsMun",storeData: "infoMun",data: "elements",idData: "ids",hasId: true,visible:true,zIndex:10,
		error: errorC,
		success: successMun
	},{
		caja: {
			mouseover: showWindowMun,
			mouseout: hideWindowMun,
			mouseclick: markMun
		},
		clase: 'gmBox-box-base',claseTabla: 'gmBox-box-table',cols:1,rows:3,widths:[140],
		cuerpo:[
			{ style:'gmBox-table-title2',tipo:"span",pos:'a0',texto:"|1"},
			{ style:'gmBox-table-head2',tipo:"span",pos:'a1',texto:"Clima a futuro",onclick:"usarMun",parametros:'0,2',cursor:"pointer"},
			{ style:'halign-center grayscale',tipo:"img",pos:'a2',src:'Web/icons/noun_climafuturo_gris_alpha.png',width:"80px",onclick:"usarMun",parametros:'0,2',cursor:"pointer",title:"Graficar"},
		]
	}];
	createFusionTM(plantillaMun);

	//contorno de estados
	//var polsEnt1 = [];
	var infoEnt1 = [];
	
	//setTimeout(createFusionTM, 2000, plantillaEnt2);

	/////
}
function changeOpacity(el,type){
	if(type=="anp"){
		polsANP.setOpacity($("#anpOpacityV").val()/100);
	} else if(type=="ent"){
		polsEnt.setOpacity($("#entOpacityV").val()/100);
	} else {
		polsMun.setOpacity($("#munOpacityV").val()/100);
	}
}
function hideActiveLayers(){
	$('#activeLayers').toggle();
}
function hidegmControl(){
	$('#gmControl').toggle();
}
function opacidadConabio(idLi,id,type){
	var check = $("#"+idLi).find("svg").hasClass("fa-toggle-on");
	var opacity = $("#points"+id).val();
	opacity = opacity / 100;
	var capa = capas[id];
	if(!capa || !check) return;
	if(type=="raster"){
		map.overlayMapTypes.getAt(pos_[id]).setOpacity(opacity);
	}else{
		tablas_[id].setOpacity(opacity);
	}
}
function reloadPage(){
	location.reload(false);
}
function computeDistance(){
	drawingManagerLine.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
}
function zoomPoligono(){
	zooming = !zooming;
	if(zooming){
		drawingManagerZoom.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
	}else{
		drawingManagerZoom.setDrawingMode(null);
	}
}
function zoomMexico(){
	var polygon = [
		{lng:-86.43546874999998,lat:32.99822135867046},
		{lng:-117.46085937499998,lat:32.99822135867046},
		{lng:-117.46085937499998,lat:14.188417231578843},
		{lng:-86.43546874999998,lat:14.188417231578843}
	];
	var polT = new google.maps.Polygon({               
		paths: polygon,
		map: map,
		visible: false
	});	
	var candb = getCenterAndBoundsFromPol(polT);
	var zoom = getZoomByBounds(map,candb[1]);
	map.setZoom(zoom);
	map.setCenter(candb[0],zoom);
}
function getDistance(path){
	var distance = 0;
	var p1 = path.getAt(0);
	for(var i = 1; i < path.getLength(); i++){
		var p2 = path.getAt(i);
		distance += google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
		p1 = p2;
	}
	return distance;
}
function rectangle2polygon(rectangle){	
	var ne=rectangle.getBounds().getNorthEast();
	var sw=rectangle.getBounds().getSouthWest();
	var path = [
		{lat: ne.lat(), lng: ne.lng()},
		{lat: ne.lat(), lng: sw.lng()},
		{lat: sw.lat(), lng: sw.lng()},
		{lat: sw.lat(), lng: ne.lng()}		
	];
	return new google.maps.Polygon({
		path: path,
		fillOpacity: 0.01,
		strokeColor: '#000000'
	});
}
function circle2polygon(circle){
	var pathP = [];
	var d2r = Math.PI / 180, r2d = 180 / Math.PI, earthsradius = 6378137, dir = 1, points = 64;
	var rlat = (circle.getRadius() / earthsradius) * r2d;
	var rlng = rlat / Math.cos(circle.getCenter().lat() * d2r);
	var extp = new Array();
	var start = 0;
	var end = points + 1;
	for (var j = start; j < end; j = j + dir) {
		var theta = Math.PI * (j / (points / 2));
		ey = circle.getCenter().lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
		ex = circle.getCenter().lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
		pathP.push({lat: ex, lng: ey});
	}
	return new google.maps.Polygon({
		path: pathP,
		fillOpacity: 0.01,
		strokeColor: '#000000'
	});
}
function circle2polygon(circle){
	var pathP = [];
	var d2r = Math.PI / 180, r2d = 180 / Math.PI, earthsradius = 6378137, dir = 1, points = 64;
	var rlat = (circle.getRadius() / earthsradius) * r2d;
	var rlng = rlat / Math.cos(circle.getCenter().lat() * d2r);
	var extp = new Array();
	var start = 0;
	var end = points + 1;
	for (var j = start; j < end; j = j + dir) {
		var theta = Math.PI * (j / (points / 2));
		ey = circle.getCenter().lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
		ex = circle.getCenter().lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
		pathP.push({lat: ex, lng: ey});
	}
	return new google.maps.Polygon({
		path: pathP,
		fillOpacity: 0.01,
		strokeColor: '#000000'
	});
}
var callbackF = null;
