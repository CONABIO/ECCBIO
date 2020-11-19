/*function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/
var zIndex = 100;
var prioridadBase = 1000;
const numberWithCommas = function(x){
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/*const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}*/

function ocultaTablas(visible){
	for(j = 0; j < contCC; j++){
		i = capasCargadas[j];
		if(i == visible && tablas_[i] != null && types_[i].includes("filter")){
				tablas_[i].setMap(map);
		} else if(tablas_[i] != null && types_[i].includes("filter")) {
				tablas_[i].setMap(null);
		}
	}
}

function ocultaTiff(){
        for(j = 0; j < contCC; j++){
                i = capasCargadas[j];
                if(pos_[i] != null)
                        map.overlayMapTypes.getAt(pos_[i]).setOpacity(0);
        }
}

function ocultaCollection(){
	for(var j = 0; j < contCC; j++){
		var mapid = capasCargadas[j];
		for(var i=0; i<12;i++){
			map.overlayMapTypes.getAt(posCol_[mapid][i]).setOpacity(0);
		}
	}
}	

function findInputCheckS(i){					
	$("#capas").find("input:checkbox.table").removeClass("active");
	$("#capas").find("input:checkbox.table").prop("checked",false);
	$("#MenuPrincipal").find("input:checkbox.table").removeClass("active");
	$("#MenuPrincipal").find("input:checkbox.table").prop("checked",false);
	if(i != -1){				
		$("#capas").find("input[value='"+i+"']").addClass("active");
		$("#capas").find("input[value='"+i+"']").prop("checked",true);
		$("#MenuPrincipal").find("input[value='"+i+"']").addClass("active");
		$("#MenuPrincipal").find("input[value='"+i+"']").prop("checked",true);										
	}
}

function findInputCheckT(i){					
	$("#capas").find("input:checkbox.tiff").removeClass("active");
	$("#capas").find("input:checkbox.tiff").prop("checked",false);
	$("#MenuPrincipal").find("input:checkbox.tiff").removeClass("active");
	$("#MenuPrincipal").find("input:checkbox.tiff").prop("checked",false);
	if(i != -1){				
		$("#capas").find("input[value='"+i+"']").addClass("active");
		$("#capas").find("input[value='"+i+"']").prop("checked",true);
		$("#MenuPrincipal").find("input[value='"+i+"']").addClass("active");
		$("#MenuPrincipal").find("input[value='"+i+"']").prop("checked",true);										
	}
}

function iniciarCapas(){
	printLog("De dónde saco los ids?");
	printLog($("#grupos :input[value!='ALL']").not(':button'));
	$("#grupos :input[value!='ALL']").each(function(i){
		if(!$(this).hasClass("noSeleccionado"))
			printLog($(this).attr("id"));
	});
	$("#grupos").addClass("hidden");
}

function play(ids,tiempo){
	if(tiempo === undefined || isNaN(tiempo) || tiempo < 1000) tiempo = 1000;
	if(!playStop){
		printLog(ids);
		$("#playStopText").html("Stop");
		$("#playStop").removeClass("btn-info").addClass("btn-warning");
		$("#playStopIcon").removeClass("fa-play").addClass("fa-stop");		
		cont = 0;
		stopId = setInterval(playCapasGrupos,tiempo,ids);
	  printLog(stopId);
	} else {
		$("#playStopText").html("Play");
		$("#playStop").removeClass("btn-warning").addClass("btn-info");
		$("#playStopIcon").removeClass("fa-stop").addClass("fa-play");
		findInputCheckT(-1);
		findInputCheckS(-1);
		ocultaTablas(-1);
		ocultaTiff();
		printLog(stopId);
		clearInterval(stopId);
	}
	playStop = !playStop;
}

function uploadKML(){
	$("#file").trigger("click");
}

function exportarCapa(id){
	printLog("Exportando capa..."+id);
	$.getJSON('/exportdata',function(data) {printLog(data)});
}

function playCapasGrupos(ids){
	for(var j = 0; j < ids.length; j++){
		var i = parseInt(ids[j]);
		if(cont == j){
			$("#MenuPrincipal").find("input[value='"+i+"']").parent().parent().trigger("click");
			findInputCheckS(i);			
			findInputCheckT(i);
		} else {
			if(types_[i] == "image")
				map.overlayMapTypes.getAt(pos_[i]).setOpacity(0);
			else if(tablas_[i] != null){
				tablas_[i].setMap(null);
			}
		}
	}
	cont++;
	if(cont>=ids.length)
		cont = 0;
}

function startAnimationCol(mapid){
	ocultaCollection();
	if(timeOutCol != null){
		clearInterval(timeOutCol);
	}
	contCol = 0;
	timeOutCol = setInterval(showCollection,2000,mapid);
}

function showCollection(mapid){	
	for(var i = 0; i<12;i++){		
		if(i == contCol){
			$("#titleLegend_"+mapid).html(getMonth(i));
			map.overlayMapTypes.getAt(posCol_[mapid][i]).setOpacity(1);
		} else {
			map.overlayMapTypes.getAt(posCol_[mapid][i]).setOpacity(0);
		}
	}
	contCol++;
	if(contCol >= 12) contCol = 0;
}

function getMapOper(mapid1, mapid2, operation){
	$.getJSON(
    '/getmapoper', {
			'mapid1':mapid1,
			'mapid2':mapid2,
			'oper':operation,
			'bd':home
		},
    function(data) {
		agregarColores(mapid1,"");
		data.forEach(function(layer, i) {          
			var latLng = {lat: layer.lat, lng: layer.lng};
			if(operation == 1){
				id = mapid1+"_"+mapid2+"_D";
			} else {
				id = mapid1+"_"+mapid2+"_I";
			}
			printLog(id+".");
			nameOper_[id] = layer.name;
			latlngOper_[id] = latLng;
			zoomOper_[id] = layer.zoom;
			unidadOper_[id] = layer.unidad;
			typesOper_[id] = layer.type;
			mapidOper_[id] = layer.mapid;
    		tokenOper_[id] = layer.token;
		    posOper_[id] = addLayerOper(id);																
  		});
      //$("#loadingDiv").hide();
    });
}

function drawMultypolygon(polygons){
    for(var i = 0; i < polygons.length; i++){
        var coords = array2coords(polygons[i][0]);
	new google.maps.Polygon({
		map: map,
                paths: coords,
                strokeColor: 'red',
                strokeOpacity: 1,
                strokeWeight: 1,
                zIndex: 1
        });
    }
}

function drawMultypolygon2(polygons){
    multiPolygons = []
    for(var i = 0; i < polygons.length; i++){
        var coords = array2coords(polygons[i].coordinates[0]);
        var temp=new google.maps.Polygon({
                map: map,
                paths: coords,
                strokeColor: 'red',
                strokeOpacity: 1,
                strokeWeight: 1,
                zIndex: 1
        });
	multiPolygons.push(temp);
    }
}

function coords2String(coords){
	var coordsAux = "[";
		for(j=0;j<coords[0].length-1;j++){
			coordsAux += "["+coords[1][j]+","+coords[0][j]+"],"
		}
		coordsAux += "["+coords[1][coords[0].length-1]+","+coords[0][coords[0].length-1]+"]"
		coordsAux += "]";
	return coordsAux;
}

function coords2String2(coords){
	var coordsAux = "[";
	for(var j=coords.length-1;j>=1;j--){
		coordsAux += "["+coords[j][0]+","+coords[j][1]+"],"
	}
	coordsAux += "["+coords[0][0]+","+coords[0][1]+"]"
	coordsAux += "]";
	return coordsAux;
}

function coords2Array(coords){
	var coordsAux = [];
		for(j=0;j<coords[0].length-1;j++){
			coordsAux.push([coords[j].lat,coords[j].lng]);
		}
		coordsAux.push([coords[coords[0].length-1].lat,coords[coords[0].length-1].lng]);		
	return coordsAux;
}

function getUsoSuelo(coords, type, tabla,llave1,llave2,valor1,valor2){
	printLog("Inside get uso suelo");
    printLog(type+"\n"+coordsAux+"\n"+tabla+"\n"+llave1+"\n"+llave2+"\n"+valor1+"\n"+valor2);
	var data = null;
	var coordsAux = null;
    if(type==0){
    	coordsAux = coords2String(coords);
		tabla = llave1 = llave2 = valor1 = valor2 = "";
		data = {'bd':home,'coords':coordsAux, 'pais':mapa,'type':type};
    } else if(type==1){	
		coordsAux = "";
		data = {'bd':home,'coords':'', 'pais':mapa,'type':type,'tabla':tabla,
			'llave1':llave1,'valor1':valor1,'llave2':llave2, 'valor2':valor2};
    }
	var url = '/getusosuelo';
    $.ajax({
        type:"POST",
		dataType:"json",
		url:url, 
		data:data,
		success: function(data){
			printLog(data);
			randomFeatures = null;
			if(gettingDemand){
				if(data[0].length == 1){
					randomFeatures = data[0];
				}
				listaCapas2(type,coordsAux,tabla,llave1,llave2,valor1,valor2);				
				return;
			}
			listaCapas(type,coordsAux,tabla,llave1,llave2,valor1,valor2);			
            $("#cortina").addClass("removeCortina");            
            usoSueloStr = '';
            anpStr = '';
            pendienteStr = '';
            if(data.length >= 1){
				if(data[4].length == 1 && data[4][0] != 'None'){
					anpStr = data[4][0];
				}
				if(data[3].length == 1 && data[3][0] != 'None'){
					pendienteStr = data[3][0];
				}
				if(data[0].length == 1){
					randomFeatures = data[0];
				}
				if(data[2].length == 1){
					usoSueloStr = data[2][0];
					printLog(usoSueloStr);
				}  
				if((data[1].length == 1 && data[1][0] == null) || data[1].length == 0){
					$("#suelo").html("<select id='usoSuelo'><option value='Ninguno'>Ninguno</option></select>");
				} else {
					printLog(data[1]);
					html = "<select id='usoSuelo'>";
					for(var i = 0; i<data[1].length;i++){
						var value = data[1][i];
						printLog(value)
						if(value != null)
							html+="<option value='"+value+"'>"+value+"</option>";
					}
					html+="</select>"
					$("#suelo").html(html);
				}
            }else{
				$("#suelo").html("<select id='usoSuelo'><option value='Ninguno'>Ninguno</option></select>");
            }
			
		}
    });
}

function getZoomByBounds( map, bounds ){
  	var MAX_ZOOM = 21 ;
  	var MIN_ZOOM = 0 ;
  	var ne= mapG.getProjection().fromLatLngToPoint( bounds.getNorthEast() );
  	var sw= mapG.getProjection().fromLatLngToPoint( bounds.getSouthWest() ); 
  	var worldCoordWidth = Math.abs(ne.x-sw.x);
  	var worldCoordHeight = Math.abs(ne.y-sw.y);
  	var FIT_PAD = 40;
  	for( var zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom ){ 
  		if( worldCoordWidth*(1<<zoom)+2*FIT_PAD < $(mapG.getDiv()).width() && 
                	worldCoordHeight*(1<<zoom)+2*FIT_PAD < $(mapG.getDiv()).height() )
                        return zoom;
	}
	return 0;
}

function getReport(){
	/*
	alert("La producción total usando el camino seleccionado es: "+valorFinal+" "+unidadFinal);
	alert("La demanda final es: "+demandaFinal+" "+unidadFinal);
	if(valorFinal < demandaFinal){
		alert("No se satisface la demanda! :( seleccione otra zona más pequeña de demanda o más grande de biomasa");
	} else {
		alert("Se satisface la demanda! :) todo bien");
	}*/
	var mapaCaptura2 = $('#cortina').find($('#mapaCaptura2')).attr('src')+'';
	var mapaCaptura22 = $('#cortina').find($('#mapaCaptura22')).attr('src')+'';
	//console.log(mapaCaptura2);
	$.ajax({
		// url: 'http://www.mofuss.unam.mx/Mapps/Cemie/reportesPDF/reporteCemie.php',
		url: 'http://www.mofuss.unam.mx/Mapps/Cemie/reportesPDF_LaTeX/creaPDF_Latex.php',
		type: 'POST',
		data: {
			total: valorFinal,
			demanda: demandaFinal,
			cadena: imgCadena,
			dataPadre: dataPadre,
			mapa2: mapaCaptura2,
			mapa22: mapaCaptura22,
			home: home},
		dataType: 'json',
		success: function(blob){
			var link = document.createElement('a');
			link.target="_blank";
			link.href = blob;
			link.download = "reporte.pdf";
			link.click();
				//showEstadisticas();
		}
	});
}

function getDemand(){
	alert("Choose a region that you want to supply.");
	$('#formula').hide();
	gettingDemand = true;
}

function chequeoDeContenido(mapid,flag,type,coordsAux,tabla,llave1,llave2,valor1,valor2){
	printLog("Inside chequeoDeContenido");
	printLog(mapid+"\n"+flag+"\n"+type+"\n"+coordsAux+"\n"+tabla+"\n"+llave1+"\n"+llave2+"\n"+valor1+"\n"+valor2);
	var capa=$("#capa"+mapid).attr("title"); 
	printLog($("#capa"+mapid));
	var extra = "";
	if(gettingDemand){
		extra = "2";
	}
	if($("#datosOverlay"+extra).html()!=""){
		var mapProp= {
			center:new google.maps.LatLng(51.508742,-0.120850),
			zoom:5,
			center: {lat: 0, lng:0},
			draggable:true,
			disableDefaultUI: true,
			zoomControl: true
		};
		var mat2Energy = "<div id='mapa2"+extra+"' class=''></div><button onClick='datosOverlay"+extra+"()'>X</button>";
		mat2Energy+="<input type='button' value='Back' onClick='listaCapas"+extra+"(\""+type+"\",\""+coordsAux+"\",\""+tabla+"\",\""+llave1+"\",\""+llave2+"\",\""+valor1+"\",\""+valor2+"\")'/>";
		if(!gettingDemand){
			mat2Energy+="<input type='button' value='Convert resources into Heat&Power' onClick='crearDiagramaGoJS(\""+mapid+"\")'/>";
			mat2Energy+="<input type='button' value='Get facility location' onClick='getFacilityL(\""+mapid+"\",\""+type+"\",\""+coordsAux+"\",\""+tabla+"\",\""+llave1+"\",\""+llave2+"\",\""+valor1+"\",\""+valor2+"\")'/>";
			mat2Energy+="<input id='getDemand' type='button' value='Get demand' onClick='getDemand()' disabled='true' />";
		} else {
			mat2Energy+="<input id='getReport' type='button' value='Get report' onClick='getReport()'/>";
			gettingDemand = false;
		}
		$("#datosOverlay"+extra).append(mat2Energy);		
		var map2=new google.maps.Map(document.getElementById("mapa2"+extra),mapProp);
		google.maps.event.addListenerOnce(map2, 'idle', function(){
			if (typeof coordinates !== 'undefined') {
				for(var z=0;z<coordinates.length;z++){
					var coordenadas=coordinates[z][0];
					var triangleCoords = [];
					for(var i=0;i<coordenadas.length;i++)
						triangleCoords.push(new google.maps.LatLng(coordenadas[i][1], coordenadas[i][0]));
					var myPolygon = new google.maps.Polygon({
						paths: triangleCoords
					});
					myPolygon.setMap(map2);
				}
			}else{
				if(type==0){
					lastPolygon.setMap(map2);
				}else{
					printLog("Es type 1");
					printLog(lastPolygon);
					if(lastPolygon != null){
						lastPolygon.setMap(map2);
					}
					for(var i=0;i<multiPolygons.length;i++){
						var temp = multiPolygons[i];
						temp.setMap(map2);
					}
				}
				var zoom = getZoomByBounds(map2,bounds);
				map2.setZoom(zoom-1);
				map2.setCenter(new google.maps.LatLng(CentX,CentY));
			}
			$("#datosOverlay"+extra).append("<h2 onclick='captura()'>"+capa+"</h2>");
			$("#datosOverlay"+extra).removeClass("hidden");	                
			if(flag==0){
				var eeMapOptions={
					getTileUrl:buildGetTileUrl(mapidR,tokenR),
					tileSize:new google.maps.Size(256,256)
				};
				var overlay2=new google.maps.ImageMapType(eeMapOptions);
				//map2.overlayMapTypes.push(overlay2);
			}else{
				style = styles_[mapid];
				temp = (style).replaceAll("valFill","0.5");
				eval("style = "+temp);
				query = getQuery(mapid);
				layer = new google.maps.FusionTablesLayer({
					query: query,
					styles: style
				});
				layer.setMap(map2);
				console.log(valores_[mapid]);
				if(valores_[mapid] == undefined){
					google.maps.event.addListener(layer, 'click', function(e) {
						columnas = columnas_[mapid].split(",");
						texto = "<div class='googft-info-window'>";
						for(j = 0; j < columnas.length - 1; j++){
							texto+="<b>"+columnas[j]+": </b>"+e.row[columnas[j]].value+"<br>";
						}
						texto+="<b>"+columnas[columnas.length - 1]+": </b>"+e.row[columnas[columnas.length - 1]].value;
						texto+="</div>";
						e.infoWindowHtml = texto;
					});
				}
			}
			// if(window.chrome){
	
			// }
			setTimeout(function(){
				function onCaptured(imageUri) {
				  console.log(imageUri);
				}

				function onError(error) {
				  console.log(`Error: ${error}`);
				}

				console.log('esto trae home:esto trae home:  ', home);		
				var mapaID='';
				if($('#mapa22').length)
					mapaID = '22';
				else
					mapaID = '2';
			
				var str1 = 'mapaCaptura'
				//var str2 = 'mapaCaptura22'

				
				html2canvas($("#mapa"+mapaID).find('.gm-style'), {
				// html2canvas($(document.body), {
					useCORS: true,
					allowTaint: false,
					//x: 1500,
					//y: 0,
					//width: 500,
					//height: 500,
					onrendered: function( canvas ) {
						//var canvas2 = document.getElementById('canvas');
						//var context = canvas2.getContext("2d");
						//var imageT = new Image();
						console.log("Entre a html2canvas");
						var img = canvas.toDataURL("image/png");
						img = img.replace('data:image/png;base64,','');
						var finalImg = 'data:image/png;base64,'+img;
						//imageT.src = finalImg;
						//context.drawImage(imageT,0,0,2000,300,0,0,500,300);						
						//img = canvas2.toDataURL("image/png");
						//img = img.replace('data:image/png;base64,','');
						//finalImg = 'data:image/png;base64,'+img;
						if($('#'+str1+mapaID).length){
							console.log('Existe y lo borré');
							$('#'+str1+mapaID).remove();
						}
						$("#cortina").append("<img src='"+finalImg+"' id='"+str1+mapaID+"'>");
						$('#'+str1+mapaID).hide();
						
						//$('#'+str1+mapaID).css('position','absolute');
						//$('#'+str1+mapaID).css('clip','rect(1144px,500px,300px,0px)');
						//$('#'+str1+mapaID).css('display','none');
						if(flag==0){
							var eeMapOptions={
								getTileUrl:buildGetTileUrl(mapidR,tokenR),
								tileSize:new google.maps.Size(256,256)
							};
							var overlay2=new google.maps.ImageMapType(eeMapOptions);
							map2.overlayMapTypes.push(overlay2);
						}	
					}
				});//fim de html2canvas

				//var capturing = chrome.tabs.captureVisibleTab();
				//capturing.then(onCaptured, onError);
				
				// var transform = $('#mapa'+mapaID).find('.gm-style>div:first>div').css('transform');
				// var comp = transform.split(',');
				// var mapleft=parseFloat(comp[4]);
				// var maptop=parseFloat(comp[5]);
				// $('#mapa'+mapaID).find(".gm-style>div:first>div").css({
				// 	"transform":"none",
				// 	//"left":mapleft,
				// 	//"top":maptop,
				// 	});

				// //html2canvas($('#mapa'+mapaID).find('.gm-style>div:first>div'),
				// html2canvas($('#mapa'+mapaID).find(".gm-style"),
				// //html2canvas($('#datosOverlay'),
				// //html2canvas([$('#mapa2 > div.g-map-canvas > div > div > div:nth-child(1)')[0]],
				// {
				// 	//x: 0,
				// 	//y: 0,
				// 	width: 500,
				// 	height: 500,
  		// 			useCORS: true,
				// 	//allowTaint:true,
  		// 			onrendered: function(canvas)
  		// 			{
					
    // 					var img = canvas.toDataURL("image/png");
				// 		img = img.replace('data:image/png;base64,','');
				// 		var finalImg = 'data:image/png;base64,'+img;
				// 		$("#cortina").append("<img src='"+finalImg+"' id='"+str1+mapaID+"'>");
				// 		if(flag==0){
				// 			var eeMapOptions={
				// 				getTileUrl:buildGetTileUrl(mapidR,tokenR),
				// 				tileSize:new google.maps.Size(256,256)
				// 			};
				// 			var overlay2=new google.maps.ImageMapType(eeMapOptions);
				// 			map2.overlayMapTypes.push(overlay2);
    // 						//location.href=dataUrl //for testing I never get window.open to work
    // 						//$('#mapa'+mapaID).find(".gm-style>div:first>div").css({
    //   						//	left:0,
    //   						//	top:0,
    //   						//	"transform":transform
    // 						//});
				// 		}
				// 	}
				// });






					
			},2000); //fin de timeout

		});
	}
}

function getStadistics(mapid, isImage, categoria, type,coordsAux,tabla,llave1,llave2,valor1,valor2,usarANP,usarPen){	
	if(categoria == null) categoria = "";
	categoria = sinAcentos(categoria);
	printLog("Categoria: "+categoria)
	if(!$("#MenuPrincipal").find("input[value='"+mapid+"']:checked").length > 0){
		$("#MenuPrincipal").find("input[value='"+mapid+"']").parent().parent().trigger("click");		
		insideGetStadistics = true;
	}
	if(randomFeatures != null){
	  randomFeaturesArray = JSON.stringify(randomFeatures[0].features);
	} else {
	  randomFeaturesArray = null;
	}
	console.log(isImage);
	var data = {'mapid':mapid,'bd':home, 'coords':coordsAux, 'isImage':isImage, 'pais':mapa, 'categoria':categoria, 
		'randomFeatures':randomFeaturesArray,'usoSuelo':usoSueloStr,'typeP':type,'usarANP':usarANP,'usarPen':usarPen,
		'anp':anpStr,'pendiente':pendienteStr,'tabla':tabla,'llave1':llave1,'valor1':valor1,'llave2':llave2,'valor2':valor2}
	$.ajax({
        type:"POST",
		dataType:"json",
		url:'/getstadistics', 
		data:data,
		success: function(data){
			printLog(data[0]);
			var conversion = data[0].conversion;
			var sum = Math.round(data[0].sum*10)/10;
			var petaJules = "";
			if(conversion > 0){				
				petaJules=espaciosHTML(8)+"Energy: "+Math.round((sum*conversion/10000))/100+" PJ";
			}
			var area = numberWithCommas(Math.round(data[0].area));
			area = area<0?area*-1:area;
			var reArea = data[0].reArea<0?data[0].reArea*-1:data[0].reArea;
                        reArea = reArea == 0 ? "": espaciosHTML(8)+"Resampled area: "+numberWithCommas(Math.round(reArea))+" Km<sup>2</sup>";
			html = "<p>Area: "+area+" Km<sup>2</sup>"+reArea+"</p>";
			html += "<p>Sum: "+numberWithCommas(sum)+" "+unidades_[mapid]+numberWithCommas(petaJules)+"</p>";
			html += "<p>Mean: "+Math.round(data[0].mean)+" "+unidades_[mapid]+"</p>";
			html += "<p>Max: "+Math.round(data[0].max)+" "+unidades_[mapid]+"</p>";
			html += "<p>Min: "+Math.round(data[0].min)+" "+unidades_[mapid]+"</p>";
			html += "<p>Standard Deviation: "+Math.round(data[0].stdDev*100) / 100+"</p>";
			if(data[0].reArea != 0){
				html += "<p>The selected area is too big, random samples were taken.</p>";
			}
			mapidR=data[0].mapid;
			tokenR=data[0].token;
			var extra = "";
			printLog("Get demand: "+gettingDemand);
			if(gettingDemand){
				extra = "2";
				demandaFinal = sum;
			}else{
				totalSum = sum;
			}
		    $("#datosOverlay"+extra).html(html);
			$("#datosOverlay"+extra).removeClass("hidden");
			chequeoDeContenido(mapid,isImage,type,coordsAux,tabla,llave1,llave2,valor1,valor2);
			$("#cortina").addClass("removeCortina");
		}
    });
}

function successFT(totalAdded,offset){
	if(offset == 0 && totalRowsInt == null){
		$("#cortina").addClass("removeCortina");
	}else if(totalAdded == totalRowsInt){
		totalRowsInt = null;
		$("#cortina").addClass("removeCortina");
	}
}

function errorC(ec,ed,params){
	callbackF = function(data){
		totalRowsInt = data["rows"][0][0];
		totalRows(data,params);
	};
	var nombreT = params[0].tabla.nombre;
	var where = params[0].tabla.where;	
	printLog(ec+"-"+ed);
	var script = document.createElement('script');
	var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
	url.push('sql=');
	var query = 'SELECT COUNT( ) FROM '+
		nombreT + ((where === undefined || where == null)?'':' WHERE '+where);
	var encodedQuery = encodeURIComponent(query);
	url.push(encodedQuery);
	url.push('&callback=callbackF');
	url.push('&key='+params[0].key);
	script.src = url.join('');
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);	
}

function totalRows(data,params){
	var total = parseInt(data["rows"][0][0]/limitQuery)*limitQuery;
	var offset;
	for(offset = 0; offset <= total; offset+=limitQuery){		
		createFusionTM(params,offset,limitQuery);
	}
}

function getMap(mapid, prioridad){	
	$.getJSON(
		//wegpBaseURL+'/getmapdata', {'mapid':mapid,'bd':home},
		'https://www.wegp.unam.mx/getmapdata', {'mapid':mapid,'bd':home},
		function(data) {
			added = 0;
			lastType = "";
			data.forEach(function(layer, i) {
				var latLng = {lat: layer.lat, lng: layer.lng};
				var temp;
				if (layer.type == "image"){
					temp = (layer.style).replaceAll("valFill","1");
					$("#points"+mapid).val("100");
					$("output[name='temp"+mapid+"']").html("100");
				} else{
					temp = (layer.style).replaceAll("valFill","0.5");
					$("#points"+mapid).val("50");
					$("output[name='temp"+mapid+"']").html("50");
				}				
				eval("var style = "+temp);
				latlng_[mapid] = latLng;
				zoom_[mapid] = layer.zoom;
				types_[mapid] = layer.type;
				unidades_[mapid] = layer.unidad;
				styles_[mapid] = layer.style;				
				columnas_[mapid] = layer.columna;
				if(layer.type == "collection" && added == 0){
					agregarColores(mapid, "");
					added=1;
					lastType="collection";
				}
				//} else if(layer.type != "collection" && (home != "conabio" || home != "conabio2")){
					//agregarColores(mapid, "");
				//}
				if(layer.type == "collection"){
					if(nameCol_[mapid] === undefined){
						nameCol_[mapid] = [];
						mapidCol_[mapid]=[];
						tokenCol_[mapid]=[];
						posCol_[mapid]=[];
					}
					nameCol_[mapid][i]=layer.name;
					mapidCol_[mapid][i]=layer.mapid;
					tokenCol_[mapid][i]=layer.token;
					posCol_[mapid][i]=addLayerToCollection(mapid,i);
					return;
				}
				name_[mapid] = layer.name;
				if(layer.type == "image"){
					mapid_[mapid] = layer.mapid;
					token_[mapid] = layer.token;
					pos_[mapid] = addLayer(mapid, style);
					if(home == "conabio" || home == "conabio2"){
						//opacidadConabio("capa"+mapid,mapid);
					}
				} else if(layer.type == "no_filter"){
					name2_[mapid] = layer.nameZoom;		
					valores_[mapid] = layer.valor;					
					tablas_[mapid] = new FTStore("polygon");
					var columns = getColumns(layer.columna);
					var columnWhere = getWhereColumn(style[0].where.split("AND")[0].trim());
					console.log('columnWhere: ', columnWhere);
					console.log('layer.columna: ', layer.columna);
					console.log('cols: ', columns);				
					if(columnWhere!=""&&!layer.columna.includes(columnWhere)){
						layer.columna+=","+columnWhere;
					}					
					var campos = layer.columna.split(',');
					console.log('mapid: ', mapid);
					var template;
					if(mapid == 393){
						console.log("SI es");
						template = {caja: {
								//mouseover: showWindowANP,
								//mouseout: hideWindowANP,
								mouseclick: clickRoute
							},					
							clase: 'cajita',
							claseTabla: 'table route',
							cols: 2,
							rows: 5,
							showOnlyClick: true,
							cuerpo:[
								{ style:'negritas tituloTablaRoute',tipo:"span",pos:'a0',texto:"Campo"},
								{ style:'negritas tituloTablaRoute',tipo:"span",pos:'b0',texto:"Valor"},
								{ style:'centrado',tipo:"span",pos:'a1',texto:campos[0]},
								{ style:'centrado',tipo:"span",pos:'b1',texto:'|0'},
								{ style:'centrado',tipo:"span",pos:'a2',texto:campos[1]},
								{ style:'centrado',tipo:"span",pos:'b2',texto:'|1'},
								{ style:'centrado',tipo:"span",pos:'a3',texto:campos[2]},
								{ style:'centrado',tipo:"span",pos:'b3',texto:'|2'},
								{ style:'centrado',tipo:"span",pos:'a4',texto:campos[3]},
								{ style:'centrado',tipo:"span",pos:'b4',texto:'|3'}
							],
							hasCloseButton: false
						};
					}else if(mapid == 377){
						console.log("SI es");
						template = {caja: {
								//mouseover: showWindowANP,
								//mouseout: hideWindowANP,
								mouseclick: clickRoute
							},					
							clase: 'cajita',
							claseTabla: 'table veg',
							cols: 2,
							rows: 3,
							showOnlyClick: true,
							cuerpo:[
								{ style:'negritas tituloTablaVeg',tipo:"span",pos:'a0',texto:"Campo"},
								{ style:'negritas tituloTablaVeg',tipo:"span",pos:'b0',texto:"Valor"},
								{ style:'centrado',tipo:"span",pos:'a1',texto:campos[0]},
								{ style:'centrado',tipo:"span",pos:'b1',texto:'|0'},
								{ style:'centrado',tipo:"span",pos:'a2',texto:campos[1]},
								{ style:'centrado',tipo:"span",pos:'b2',texto:'|1'}
							],
							hasCloseButton: false
						};
					}else{
						template = {						
							clase: 'cajita colorFT',
							claseTabla: 'table',
							cols: 2,
							rows: 1,
							cuerpo:[
								{ style:'negritas th td tituloTabla colorFT',tipo:"span",pos:'a0',texto:columns}
							]
						}
					}
					var plantilla = [{
						maxWidth: "200",
						tabla:{
							nombre: layer.name,
							columns: layer.columna,							
							where: null, columnaGeometria: "geometry", 
							style: style
						},
						key: key,
						map: map,
						storePol: "tablas_["+mapid+"]",
						data: "elements",
						idData: "ids",
						error: errorC,
						success: successFT,
						zIndex: zIndex - prioridad
					},template
					// {						
					// 	clase: 'cajita colorFT',
					// 	claseTabla: 'table',
					// 	cols: 2,
					// 	rows: 1,
					// 	cuerpo:[
					// 		{ style:'negritas th td tituloTabla colorFT',tipo:"span",pos:'a0',texto:columns}
					// 	]
					// }
					// {
					// 	caja: {
					// 		//mouseover: showWindowANP,
					// 		//mouseout: hideWindowANP,
					// 		mouseclick: clickRoute
					// 	},					
					// 	clase: 'cajita',
					// 	claseTabla: 'table',
					// 	cols: 2,
					// 	rows: 5,
					// 	showOnlyClick: true,
					// 	cuerpo:[
					// 		{ style:'negritas tituloTabla',tipo:"span",pos:'a0',texto:"Campo"},
					// 		{ style:'negritas tituloTabla',tipo:"span",pos:'b0',texto:"Valor"},
					// 		{ style:'centrado',tipo:"span",pos:'a1',texto:campos[0]},
					// 		{ style:'centrado',tipo:"span",pos:'b1',texto:'|0'},
					// 		{ style:'centrado',tipo:"span",pos:'a2',texto:campos[1]},
					// 		{ style:'centrado',tipo:"span",pos:'b2',texto:'|1'},
					// 		{ style:'centrado',tipo:"span",pos:'a3',texto:campos[2]},
					// 		{ style:'centrado',tipo:"span",pos:'b3',texto:'|2'},
					// 		{ style:'centrado',tipo:"span",pos:'a4',texto:campos[3]},
					// 		{ style:'centrado',tipo:"span",pos:'b4',texto:'|3'}
					// 	]
					// }
					];					
					createFusionTM(plantilla);
					insideGetStadistics = true;
				} else {
					name2_[mapid] = layer.nameZoom;
					valores_[mapid] = layer.valor;
					tablas_[mapid] = addFT(mapid,style);
					//ocultaTablas(mapid);
					//findInputCheckS(mapid);
				}
			});
			if(lastType=="collection"){
				startAnimationCol(mapid);
			}
			if(insideGetStadistics){
				insideGetStadistics = false;
			}else{
				$("#cortina").addClass("removeCortina");
			}
		}
    );
	//quitar bordes
	if(mapid == 376 || mapid == 377){
		console.log('quitar formato');
		$('gm-style-iw').attr('background-color','transparent');
	}
	
}

function clickRoute(id){
	// setTimeout(function(){$('.gm-style-iw').attr('background-color','transparent !important');},500);
	// setTimeout(function(){$('.gm-style-iw').removeClass('gm-style-iw');},500);
	$('.gm-style-iw').removeClass('gm-style-iw');
	//$('.gm-style-iw').attr('background-color','transparent');
	console.log(id);
}

function getWhereColumn(where){
	var whereColumn = '';
	for(var i=0;i<where.length-1;i++){
		whereColumn+=where[i];
		if(where[i+1] == "<" || where[i+1] == ">" || where[i+1] == "!" || where[i+1] == "=") break;
	}
	whereColumn = whereColumn.trim();
	if(whereColumn == "<" || whereColumn == ">" || whereColumn == "!" || whereColumn == "=" || !isNaN(whereColumn)) return '';
	return whereColumn;
}

function getColumns(columnas){
	var temp = columnas.split(",");
	var columns = "|0";
	for(var i = 1; i < temp.length; i++){
		if(temp[i] == temp[i-1]){
			continue;
		} else  {
			columns+="<hr>|"+i;
		}
	}
	return columns;
}

function array2coords(array){
	coords = [];
	for(i=0;i<array.length;i++){
		coords.push(new google.maps.LatLng(array[i][1],array[i][0]));
	}
	return coords;
}

function getActiveLayer(){
	for(j = 0; j < contCC; j++){
		i = capasCargadas[j];
		if(types_[i] != "image"){
				tempmap = tablas_[i] == null?null:tablas_[i].getMap();
				if(tempmap != null){
					return i;
				}
		} 
	}
  return -1;
}

function getPolygonFF(tabla, cveEnt, cveMun){
	var fusionTableId = tabla;
	var queryStr = [];
	queryStr.push("SELECT geometry ");
	queryStr.push(" FROM "+fusionTableId);
	var valor1="-1",valor2="-1";
	if(cveEnt == "-1" && cveMun == "-1"){
		llave1 = "-1";
		llave2 = "-1";
	}
	else if(cveEnt != "-1" && cveMun == "-1"){
		llave1 = colesId;
		llave2 = "-1";
		if(cveEntMarked.length==0){
			queryStr.push(" WHERE "+llave1+"="+cveEnt);
			valor1 = cveEnt;
		}
		else{
			var claves = getClaves(cveEntMarked);
			valor1 = claves;
			queryStr.push(" WHERE "+llave1+" IN "+claves);
		}
	}else{
		llave1 = colmunId
		llave2 = colmunNom;
		valor1 = cveEnt;
		if(cveMunMarked.length==0){
			valor2 = "["+cveMun+"]";
			queryStr.push(" WHERE "+llave1+"="+cveMun);
		}
		else{
			var claves = getClaves(cveMunMarked);
			valor2 = claves;
			queryStr.push(" WHERE "+llave1+" IN "+claves);
		}
	}
	$("#cortina").removeClass("removeCortina");
	var sql = encodeURIComponent(queryStr.join(" "));
	$.ajax({
		url: "https://www.googleapis.com/fusiontables/v2/query?sql="+sql+"&key="+key,
		dataType: "json"
	}).done(function (response) {
		if(response.rows.length==1){
			if(response.rows[0][0].type!="GeometryCollection"){
				var coords = array2coords(response.rows[0][0].geometry.coordinates[0]);
				printLog(coords);
				quitarCapa();
				lastPolygon = new google.maps.Polygon({
			                        map: map,
									paths: coords,
		        	                strokeColor: 'red',
									strokeOpacity: 1,
									strokeWeight: 1,
									zIndex: 1
				});
				figura(coords,map,"municipio",0,tabla,llave1,llave2,valor1,valor2);
			} else {
				var coords = response.rows[0][0].geometries;
				drawMultypolygon2(coords);
				quitarCapa();
				figura(coords,map,"municipio",1,tabla,llave1,llave2,valor1,valor2);
			}
		}else{
			var coords = [];
			var rows = response.rows;
			for(var i = 0; i<rows.length;i++){
				if(rows[i][0].type!="GeometryCollection"){
					coords.push(rows[i][0].geometry);
				}else{
					for(var j=0;j<rows[i][0].geometries.length; j++){
						coords.push(rows[i][0].geometries[j]);
					}
				}
			}
			drawMultypolygon2(coords);
			quitarCapa();
			figura(coords,map,"municipio",1,tabla,llave1,llave2,valor1,valor2);
		}
	});
}

function getEnt(flag){
    quitarCapa();
	printLog("Flag:"+ flag);
	if(flag === undefined && paisT == "None"){
		if(home == "conabio"){
			polsANP.setMap(null);
		}
		updateLayerQuery(layerEnt,estadosT,true);
	    layerEnt.setMap(map);
	}else if(flag){
		if(home == "conabio"){
			polsANP.setMap(null);
		}
		updateLayerQuery(layerEnt,estadosT,true);
	    layerEnt.setMap(map);
	}else{
		updateLayerQuery(layerPai,paisT,false);
        layerPai.setMap(map);
	}
}

function getMun(idEnt){
        quitarCapa();	
        updateLayerQueryMun(layerMun, idEnt);
        layerMun.setMap(map);
}

function updateLayerQuery(layer,tabla,hasStyle) {
	var query = {
        	select: 'geometry',
	        from: tabla
        };
	layer.setOptions({
 	       query: query,
	       styles: styleLayers
        });
}

function updateLayerQueryMun(layer, idEnt) {
       	var where = colesId + " = '" +idEnt + "'";
        layer.setOptions({
        	query: {
                	select: 'geometry',
                        from: municipiosT,
                        where: where
                },styles:[{polygonOptions: {
                                fillColor: '#000000',
                                fillOpacity:0.3,
                                strokeColor: '#FF0000',
                                strokeWeight: 1
			  }
                }]
        });
}       

function sendEnt(cveEnt){
	var tabla = "";
	if(cveEnt == "-1"){
		tabla = paisT;
	} else {
		tabla = estadosT;
		cveEnt = cveEntMarked.length>0?JSON.stringify(cveEntMarked):cveEnt;
		if(cveEntMarked.length>0){
			cveEnt = cveEnt.substring(1,cveEnt.length-1);
		}
	}
	if(home!="conabio"){
	        getPolygonFF(tabla, cveEnt,"-1");
	}else{
		$("#variable").val('2').change();
		cveEntG = cveEnt;
		polG = 1;
		temporadaG = 1;
		envia(2,cveEnt, 1, 1);
	}	
}

function sendMun(cveMun){
	cveMun = cveMunMarked.length>0?JSON.stringify(cveMunMarked):cveMun;
	if(home!="conabio"){
		getPolygonFF(municipiosT, "-1", cveMun);
	}else{
		//envia
	}
}

function markEnt(cveEnt){
	cveEnt = parseInt(cveEnt);
	var index = isEntMarked(cveEnt);
	if(index>-1){
		cveEntMarked.splice(index,1);
	} else {
		cveEntMarked.push(cveEnt);
		console.log("hizo push o algo así");
	}	
	if(cveEntMarked.length>0){
        	claves = getClaves(cveEntMarked);
                var styles=[{
			polygonOptions: {
                                fillColor: '#000000',
                                fillOpacity:0.3,
                                strokeColor: '#AA0000',
                                strokeWeight: 1
			}
                      },{
                	where: colesId+' IN '+claves,
                        polygonOptions:{
                        	fillColor: '#00FF00'
                        }
               	}];
		printLog(styles);
        	layerEnt.set('styles',styles);
        }
}

function markMun(cveMun){
        var index = isMunMarked(cveMun);
        if(index>-1){
                cveMunMarked.splice(index,1);
        } else {
                cveMunMarked.push(cveMun);
        }
        if(cveMunMarked.length>0){
        	claves = getClaves(cveMunMarked);
                styles=[{			
	                polygonOptions: {
                        	fillColor: '#000000',
	                        fillOpacity:0.3,
	                        strokeColor: '#AA0000',
	                        strokeWeight: 1
			}
        	      },{
        	        where: colmunId+' IN '+claves,
                        polygonOptions:{
        	                fillColor: '#00FF00'
                        }
                }];
        	layerMun.set('styles',styles);
        }
}

function getClaves(array){
        var claves = "(";
        for(var i=0;i<array.length-1;i++){
                claves+=array[i]+",";
        }
        claves+=array[array.length-1]+")";
        return claves;
}

function getClaves2(array){
	var claves = "('";
	for(var i=0;i<array.length-1;i++){
		claves+=array[i]+"','";
	}
	claves+=array[array.length-1]+"')";
	return claves;
}

function quitarCapa(){
	setLayersNull();
	if ($('#quitarCapa').length) {
                $('#quitarCapa').remove();
        }
}

function setLayersNull(){
	cveEntMarked = [];
	cveMunMarked = [];	
	if(home=="conabio"){
		polsANP.setMap(map); 
	}
	if(layerPai != null && layerPai.getMap()!=null){
		layerPai.setMap(null);
	}
	if(layerEnt != null && layerEnt.getMap()!=null){
			layerEnt.setMap(null);
	layerEnt.set("styles",styleLayers);
	}
	if(layerMun != null && layerMun.getMap()!=null){
			layerMun.setMap(null);
	layerEnt.set("styles",styleLayers);
	}
	if(lastPolygon != null){
			lastPolygon.setMap(null);
			lastPolygon = null;
	}
	for(var i=0;i<multiPolygons.length;i++){
		var temp = multiPolygons[i];
		temp.setMap(null);
	}
	if(layerANP != null){
		layerANP.setMap(map);
		layerANP.set('styles',styleLayersANP);
		cveANPMarked = [];
	}
}

function isEntMarked(cveEnt){
	var index = cveEntMarked.indexOf(cveEnt);
	var textBoton = index>-1?"Marcar Estado":"Desmarcar Estado";	
	console.log("inside is ent marked! "+textBoton);
        $("#markEnt"+cveEnt).html(textBoton);
	return index;
}

function isMunMarked(cveMun){
        var index = cveMunMarked.indexOf(cveMun);
        var textBoton = index>-1?"Marcar Municipio":"Desmarcar Municipio";
        console.log("inside is ent marked! "+textBoton);
        $("#markMun"+cveMun).html(textBoton);
        return index;
}

function initialize() {
	var input = document.getElementById('buscar');
	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);
	var marker = new google.maps.Marker({
		map: map
	});
	autocomplete.addListener('place_changed', function() {
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			return;
		}
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}
		marker.setPlace({
			placeId: place.place_id,
			location: place.geometry.location
		});
		marker.setVisible(true);	  
	});
	marker.addListener('click', function() {
		marker.setVisible(false);
	});
}

function loadMap(){	
	if(home != "conabio"){
		layerPai = new google.maps.FusionTablesLayer();
		layerEnt = new google.maps.FusionTablesLayer();
		layerMun = new google.maps.FusionTablesLayer();
	}
	center = new google.maps.LatLng(lat,lng);
	var mapOptions = {
		center: center,
		zoom: zoom,
		maxZoom: maxZoom,
		minZoom: 3,
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
		zoomControl: false,
		//mapTypeId: 'terrain'
		mapTypeId: 'satellite'
	};					
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	drawingManager = new google.maps.drawing.DrawingManager({
		drawingControl: false		
	});
	drawingManager.setMap(map);
	initialize();
	/*google.maps.event.addListener(map, 'zoom_changed', function() {
	var zoomLevel = map.getZoom();
	mapid = getActiveLayer();
    if(mapid != -1 && name2_[mapid] != ''){
			if (zoomLevel <= 4) {
				query = getQuery2(mapid);
				printLog(query);
				tablas_[mapid].setOptions({
					query: query,
				});
				changeAgain = true;
			} else {
				if(changeAgain){
					query = getQuery(mapid);
					opacity = $("#points"+mapid).val() / 100;
					temp = (styles_[mapid]).replaceAll("valFill",opacity);
					eval("style = "+temp);
					tablas_[mapid].setOptions({
						query: query,
						styles: style
					});
					changeAgain = false;			
				}				
			}
		}
	});*/
	mapG=map;
	infoWindowCL = new google.maps.InfoWindow({map: map});
	initialBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(-65,-180),
		new google.maps.LatLng(65,180)
	);
	google.maps.event.addListener(map, 'bounds_changed', function() {
		if (initialBounds.contains(map.getCenter())) return;
 		var c = map.getCenter(),
			 x = c.lng(),
			 y = c.lat(),
			 maxX = initialBounds.getNorthEast().lng(),
			 maxY = initialBounds.getNorthEast().lat(),
			 minX = initialBounds.getSouthWest().lng(),
			 minY = initialBounds.getSouthWest().lat();
	 	if (x < minX) x = minX;
	 	if (x > maxX) x = maxX;
		if (y < minY) y = minY;
		if (y > maxY) y = maxY;
		map.setCenter(new google.maps.LatLng(y, x));
		printLog(initialBounds);
	});
	//if(home=="conabio" || home=="conabio2"|| home=="conabio3"){
		$("#playStop").remove();
		google.charts.load('current', {'packages':['table']});
        loadConabioStuffs();		
	//}
	if(paisT != "None" && home != "conabio"){
		google.maps.event.addListener(layerPai, 'click', function(e) {
		var c = parseInt(e.row[colpaiId].value);
		var nom_pa = e.row[colpaiNom].value;
		e.infoWindowHtml = '<p class="high">'+nom_pa+'<br><button onclick="sendEnt(\'-1\')">Usar pa&iacute;s</button>';		
		if(estadosT != "None"){
			e.infoWindowHtml+='<br><button onclick="getEnt(true)">Ver estados</button>';
		}
		e.infoWindowHtml+='<br><button onclick="quitarCapa()">Cancelar</button>';
		e.infoWindowHtml+="</p>";
	       });	
	}
	if(estadosT != "None" && home != "conabio"){
		google.maps.event.addListener(layerEnt, 'click', function(e) {
			var textUsar = cveEntMarked.length>0?"Usar marcado(s)":"Usar";
			var cve_ent = parseInt(e.row[colesId].value);
			var index = cveEntMarked.indexOf(cve_ent);
			var textBoton = index>=0?"Desmarcar Estado":"Marcar Estado";
			console.log(index+"-"+textBoton+"-"+(index>=0)+"-"+cveEntMarked);
		  	var nom_ent = e.row[colesNom].value;
			nombresEstados[cve_ent] = nom_ent;
			e.infoWindowHtml = '<p class="high">'+cve_ent+'-'+nom_ent+'<br><button onclick="sendEnt(\''+cve_ent+'\')">'+textUsar+'</button><br><button id="markEnt'+cve_ent+'" onclick="markEnt(\''+cve_ent+'\')">'+textBoton+'</button>';
			if(municipiosT != "None" && home != "conabio")
				e.infoWindowHtml+='<br><button onclick="getMun(\''+cve_ent+'\')">Ver municipios</button>';
			e.infoWindowHtml+='<br><button onclick="quitarCapa()">Cancelar</button>';
			e.infoWindowHtml+="</p>";
	   });		
	}
	if(municipiosT != "None" && home != "conabio"){
                google.maps.event.addListener(layerMun, 'click', function(e) {
			var textUsar = cveMunMarked.length>0?"Usar marcado(s)":"Usar";
                        var cve_mun = e.row[colmunId].value;
                        var nom_mun = e.row[colmunNom].value;
			var index = cveMunMarked.indexOf(nom_mun);
			var textBoton = index>=0?"Desmarcar Municipio":"Marcar Municipio";
                        e.infoWindowHtml = '<p class="high">'+nom_mun+'<br><button onclick="sendMun(\''+cve_mun+'\')">'+textUsar+'</button></p><br><button id="markMun'+cve_mun+'" onclick="markMun(\''+cve_mun+'\')">Marcar Municipio</button>';
			e.infoWindowHtml+='<br><button onclick="quitarCapa()">Cancelar</button>';
                });

        }
	google.maps.event.addDomListener(window, 'load', initialize);
	if(!(!!window.chrome && !!window.chrome.webstore)){
			$('#banner').after('<div id="Pass"><div><label>Hemos detectado que no usas Chrome, para una mejor experiencia te recomendamos descargarlo. <a href="https://www.google.com/chrome/browser/desktop/index.html">Descargar</a></label><button onClick="hideWP()">OK</button></div></div>');
	}
	
}
function processCoords(coords){
	var arrayN = coords.length;
	var coordenadas=new Array(2);
	var lats=new Array(arrayN);
	var lngs=new Array(arrayN);
	var lats2=new Array(arrayN);
	var lngs2=new Array(arrayN);
	for(var x=0;arrayN>x;x++){
		lats[x]=coords[x].lat();
		lngs[x]=coords[x].lng();
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
	return coordenadas;
}
function addMyPolygon(placemark){
	var polygon = geoxml3.createPolygon(placemark);
	polygon.setOptions({fillColor:'#0A0A0A',fillOpacity:0.5});
	$("#cortina").removeClass("removeCortina");
	setTimeout(function(){
		lastPolygonD = polygon;
		var coords = processCoords(polygon.getPath().getArray());
		if(home == "conabio" || home == "conabio2"){
			temporadaG = 1;
			variableG = 2;
			polG = 3;
			anpG = coords2String(coords);
			envia(variableG,anpG,polG,temporadaG);
			$("#showHide").click();
		}else{
			getUsoSuelo(coords,0);
		}
	},100);
    google.maps.event.addListener(polygon, 'click', function(event) {
        polygon.setMap(null);
		polygon = null;
    });
	lastPolygon = polygon;
    return polygon;
}

function getQuery(i){
	if(valores_[i] == undefined){
		query = {
			select: 'geometry',
			from: name_[i]
		};
	} else {
		where = columnas_[i]+"='"+valores_[i]+"'";
		query = {
			select: 'geometry',
			from: name_[i],
			where: where
		};
	}
	return query;
}

function getQuery2(i){
	if(valores_[i] == undefined){
		query = {
			select: 'geometry',
			from: name2_[i]
		};
	} else {
		where = columnas_[i]+"='"+valores_[i]+"'";
		query = {
			select: 'geometry',
			from: name2_[i],
			where: where
		};
	}
	return query;
}

function createLegend(style, mapid) {
  var legendWrapper = document.createElement('div');
  legendWrapper.id = 'legendWrapper';
  legendWrapper.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      legendWrapper);
  legendContent(legendWrapper, style, mapid);
}

function legendContent(legendWrapper, style, mapid) {
	columnas = columnas_[mapid].split(",");
  var legend = document.createElement('div');
  legend.id = 'legend';
  var title = document.createElement('p');
  title.innerHTML = columnas[1]+"<br>"+unidades_[mapid];
  legend.appendChild(title);
	columnas = columnas_[mapid].split(",");
        maxAnt = -1;
	for(i=0;i<style.length;i++){
		var legendItem = document.createElement('div');
    var color = document.createElement('div');
		limits = style[i].where.replaceAll(" ","").replaceAll("<","").replaceAll(">","").replaceAll("=","");
		limits = limits.split("AND");
		limits[0] = limits[0].replaceAll(columnas[1],"");
		limits[1] = limits[1].replaceAll(columnas[1],"");
    color.setAttribute('class', 'color');
    color.style.backgroundColor = style[i].polygonOptions.fillColor;
    legendItem.appendChild(color);
		var minMax = document.createElement('span');
		var min = Math.round(limits[0]);//.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
		var max = Math.round(limits[1]);//.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
                if(maxAnt == max){
                   
                }else if(min == max){
                    minMax.innerHTML = min;
                } else {
                    minMax.innerHTML = min + ' - ' + max;
                }
                maxAnt = max;
    legendItem.appendChild(minMax);
    legend.appendChild(legendItem);
  }
  legendWrapper.appendChild(legend);
}

function removeLegend() {
  var legendWrapper = document.getElementById('legendWrapper');
  var legend = document.getElementById('legend');
  legendWrapper.removeChild(legend);
}

function updateLegend(style, mapid) {
  var legendWrapper = document.getElementById('legendWrapper');
  var legend = document.getElementById('legend');
	if(legend != null)
    legendWrapper.removeChild(legend);
  legendContent(legendWrapper, style, mapid);
}

function addFT(i,style){
	printLog("Entró al addFT");
	for(var j = 0; j < style.length; j++)
		if(style[j].polygonOptions !== undefined)
			style[j].polygonOptions["strokeColor"] = "#FF0000";
	//printLog(style[0].polygonOptions);
	if(name2_[i] == ''){
		query = getQuery(i);
		layer = new google.maps.FusionTablesLayer({
			query: query,
			styles: style
		});
	} else {
                var zoomLevel = map.getZoom();
		if(zoomLevel<=4){
			creaAdvertencia();
			query = getQuery2(i);
			layer = new google.maps.FusionTablesLayer({
				query: query,
				styles: style
			});
		} else {
			query = getQuery(i);
	                layer = new google.maps.FusionTablesLayer({
        	                query: query,
                	        styles: style
  	      	        });
		}
	}
	layer.setMap(map);
	if(valores_[i] == undefined){		
		google.maps.event.addListener(layer, 'click', function(e) {
                        printLog(e);
			columnas = columnas_[i].split(",");
			texto = "<div class='googft-info-window'>";
			for(j = 0; j < columnas.length - 1; j++){
       				val = e.row[columnas[j]].value;
                                if(!isNaN(val))
                                   val = parseInt(val)		                           
				texto+="<b>"+columnas[j]+": </b>"+val+"<br>";
			}
                        val = e.row[columnas[columnas.length - 1]].value;
                        if(!isNaN(val))
	  	              val = parseInt(val)                        
			texto+="<b>"+columnas[columnas.length - 1]+": </b>"+val;
			texto+="</div>";
      e.infoWindowHtml = texto;
    });
	}
	//if(tablas_.length == 0 && mapid_.length == 0)
	//	createLegend(style, i);
	//else
	//	updateLegend(style, i);
  return layer;
}

function addLayerToCollection(i, j){
  //printLog(map.getBounds());
  var eeMapOptions = {
    getTileUrl: buildGetTileUrl(mapidCol_[i][j], tokenCol_[i][j]),
    tileSize: new google.maps.Size(256, 256)
  };
  var overlay = new google.maps.ImageMapType(eeMapOptions);
  var pos = map.overlayMapTypes.push(overlay) - 1;
  /*if(zoom != zoom_[i]){  
 *         map.setCenter(latlng_[i]);
 *                   map.setZoom(zoom_[i]);
 *                     }*/
  return pos;
}

function addLayerOper(i){    
  var eeMapOptions = {
    getTileUrl: buildGetTileUrl(mapidOper_[i], tokenOper_[i]),
    tileSize: new google.maps.Size(256, 256)
  };
  var overlay = new google.maps.ImageMapType(eeMapOptions);
  var pos = map.overlayMapTypes.push(overlay) - 1; 
  //map.setCenter(latlngOper_[i]);
  //map.setZoom(zoomOper_[i]);
	return pos;          
}

function addLayer(i,style){	
	var eeMapOptions = new ee.layers.ImageOverlay(buildGetTileUrl(mapid_[i], token_[i]));
	//var overlay = map.overlayMapTypes.push(eeMapOptions);
	var pos = map.overlayMapTypes.push(eeMapOptions) - 1;
	if(zoom != zoom_[i]){  
		map.setCenter(latlng_[i]);
		map.setZoom(zoom_[i]);
	}
	return pos;
}

/*
function addLayer(i,style){
  printLog(map.getBounds());
  var eeMapOptions = {
    getTileUrl: buildGetTileUrl(mapid_[i], token_[i]),
    tileSize: new google.maps.Size(256, 256)
  };
  var overlay = new google.maps.ImageMapType(eeMapOptions);
  var pos = prioridadBase-$("#capa"+i).attr("data-priority");
  map.overlayMapTypes.setAt(pos,overlay);
  //var pos = map.overlayMapTypes.push(overlay) - 1;
  console.log("Add layer ",countryZoom, zoom_[i],pos);
  if(countryZoom != zoom_[i]){  
  	map.setCenter(latlng_[i]);
	map.setZoom(zoom_[i]);
  }
  return pos;          
}
*/

/*function buildGetTileUrl(mapid, token) {
  return function(tile, zoom) {
		var baseUrl = 'https://earthengine.googleapis.com/map';
    var url = [baseUrl, mapid, zoom, tile.x, tile.y].join('/');
    url += '?token=' + token;
    return url;
	};
}*/

function buildGetTileUrl(mapid, token) {
	return new ee.layers.EarthEngineTileSource({
		mapid,
		token,
		formatTileUrl: (x, y, z) => `${EE_MAP_PATH}/${mapid}/tiles/${z}/${x}/${y}`
	});
}

function opacidad(element){
	var target = event.target;
	var name = target.name;
	var id = name.substring(6);
	opacity = target.value;
	opacity = opacity / 100;
	var capa = capas[id];
	if(!capa) return;
	if(mapid_[id] != null || tablas_[id] != null){
		if(types_[id] == "image"){
			printLog(map.overlayMapTypes.getAt(pos_[id]));
			map.overlayMapTypes.getAt(pos_[id]).setOpacity(opacity);  
		}else{
			//temp = styles_[id].replaceAll("valFill",opacity);
			//eval("style = "+temp);
			//tablas_[id].set('styles', style);
			tablas_[id].setOpacity(opacity);
		}
	} else {
		printLog(posOper_[id]+".");
		map.overlayMapTypes.getAt(posOper_[id]).setOpacity(opacity);
	}
}

function eventoChange(check, i, opacity,prioridad){
	if(i.includes("_")){
		printLog(posOper_[i]+".");
		if(check){
			map.overlayMapTypes.getAt(posOper_[i]).setOpacity(1);
		}else{
			map.overlayMapTypes.getAt(posOper_[i]).setOpacity(0);
		}
	}else{
		opacity = opacity === undefined?100:opacity;
		opacity = opacity / 100;
		var capa = capas[i];
		if(check){            
			if(!capa){
				$("#cortina").removeClass("removeCortina");
				//$("#loadingDiv").show();
				capas[i] = true;
				getMap(i,prioridad);								
				capasCargadas[contCC] = i;
				contCC++;				
			}else{
				if(types_[i] == "collection"){
					startAnimationCol(i);
					map.overlayMapTypes.getAt(posCol_[i][0]).setOpacity(opacity);
				}else if(types_[i] == "image"){
					map.overlayMapTypes.getAt(pos_[i]).setOpacity(opacity);
				} else {
					//temp = (styles_[i]).replaceAll("valFill","0.5");
					//eval("style = "+temp);
					//updateLegend(style, i);
					//findInputCheckS(i);
					//ocultaTablas(i);
					tablas_[i].setMap(map);
				}
				agregarColores(i, "");
			}
		}else{
			if(capa){
				if(types_[i] == "collection"){
					if(timeOutCol != null){
						ocultaCollection();
						clearInterval(timeOutCol);
					}
				}else if(types_[i] == "image"){
					map.overlayMapTypes.getAt(pos_[i]).setOpacity(0);
				} else {
					//removeLegend();
					//tablas_[i].setMap(null);
					tablas_[i].setMap(null);
					//findInputCheckS(-1);
				}
			}
		}
	}
}

function getMonth(i){
	switch(i){
		case 0: return "Enero";
		case 1: return "Febrero";
		case 2: return "Marzo";
		case 3: return "Abril";
		case 4: return "Mayo";
		case 5: return "Junio";
		case 6: return "Julio";
		case 7: return "Agosto";
		case 8: return "Septiembre";
		case 9: return "Octubre";
		case 10: return "Noviembre";
		case 11: return "Diciembre";
	}
}

function sinAcentos(str){
	str=str.replaceAll("Á","A").replaceAll("É","E").replaceAll("Í","I").replaceAll("Ó","O").replaceAll("Ú","U");
	return str.replaceAll("á","a").replaceAll("é","e").replaceAll("í","i").replaceAll("ó","o").replaceAll("ú","u");
}

function getFacilityL(mapid,type,coordsAux,tabla,llave1,llave2,valor1,valor2){
	data = {'mapid':mapid,'bd':home,'coords':coordsAux, 'pais':mapa,'type':type,'tabla':tabla,
			'llave1':llave1,'valor1':valor1,'llave2':llave2, 'valor2':valor2};
	$.getJSON('/getfacilityl',data,function(response){
		printLog(response);
	});
}

function espaciosHTML(n){
	var espacios = "";
	for(var i = 0; i < n; i++){
		espacios+="&nbsp;";
	}
	return espacios;
}
function putMarker(position){
	var latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
	map.setCenter(latLng);
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		title: 'Posición actual'
	});
	marker.addListener('click', function(){
		marker.setMap(null);
	});
}
var apiGeolocationSuccess = function(position) {
    putMarker(position);
};

var tryAPIGeolocation = function() {
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key="+key, function(success) {
        apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
  });
};

var browserGeolocationSuccess = function(position) {
	putMarker(position);
};

var browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
      alert("Browser geolocation error !\n\nTimeout.");
      break;
    case error.PERMISSION_DENIED:
      if(error.message.indexOf("Only secure origins are allowed") == 0) {
        tryAPIGeolocation();
      }
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Browser geolocation error !\n\nPosition unavailable.");
      break;
  }
};

var tryGeolocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        browserGeolocationSuccess,
      browserGeolocationFail,
      {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
  }
};
function getLocation(){
	tryGeolocation();
}
