var counter = 0;
var wrapper = $("#accordion");

function testAccordion(id){
	console.log('llegue a acordion.js');
	//var nombre = $('#c'+id).attr('title');
	//agregaDiv(nombre, id);
}

function buscaTitulo(id){
	var elements = [];
	var titulos = [];
	var current = $('#c'+id).parent();
	while(true){
		 if(current.attr('id') == 'ulSidebar'){
		 	//console.log('si llegué hasta arriba');
		 	break;
		 }
		 if(current.children('a')[0] != undefined){
		 	elements.push(current.children('a')[0]);
		 	//console.log('lo encontrado: ', current.children('a')[0]);
		 }
		 current = current.parent();
	}
	for(var i = 0; i<elements.length; i++){
		var string = $(elements[i]).html();
		string = string.replace(/[\r\n\t]+/g,"");
		titulos.push(string);
	}
	return titulos;
	//console.log('titulos encontrados: ', titulos);
}

function agregaDiv(id){
	//var nombre = $('#c'+id).attr('title');
	var titulos = buscaTitulo(id);
	var nombre = titulos[0];
	for(var k=1; k<titulos.length; k++){
		if(k == 1){
			nombre = titulos[k] +' > \n'+nombre;	
		}
		else
			nombre = titulos[k] +' > '+nombre;
	}
	console.log('este sera el nombre: ', nombre);
	counter++;
	var ariaExpanded = false;
	var expandedClass = '';
	var collapsedClass = 'collapsed';
	if(counter==1 || counter > 1){
	  ariaExpanded = true;
	  expandedClass = 'in';
	  collapsedClass = '';
	}
	$(wrapper).append('<div class="col-sm-12" style="margin-bottom: 0;"><div class="panel panel-default" id="panel'+ counter +'">' + 
	    '<div class="panel-heading" role="tab" id="heading'+ counter +'"><h4 class="panel-title">' +
		'<a class="'+collapsedClass+'" id="panel-lebel'+ counter +'" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ counter +'" ' +
		'aria-expanded="'+ariaExpanded+'" aria-controls="collapse'+ counter +'"> '+nombre+' </a><div class="actions_div" style="position: relative; top: -26px;">' +
		'<a href="#" style="display: none;" accesskey="'+ counter +'" class="remove_ctg_panel exit-btn pull-right"><span class="glyphicon glyphicon-remove"></span></a>'+
		'</div></h4></div>' +
		'<div id="collapse'+ counter +'" class="panel-collapse collapse '+expandedClass+'"role="tabpanel" aria-labelledby="heading'+ counter +'">'+
		'<div class="panel-body"><div id="TextBoxDiv'+ counter +'"><ul id="liAccord'+counter+'" style="padding: unset;"></ul></div>' +
		'</div></div></div></div>');

	//pegar elemento padre
	//$('#liAccord'+counter).append($('#c'+id).clone());

	//viejoConabio
	/*
	var li = $('#c'+id).clone();
	li.appendTo($('#liAccord'+counter));
	*/

	//nuevoConabio
	
	var li = $('#c'+id+'Principal');
	li.appendTo($('#liAccord'+counter));
	li.show();

	//temporarily FIX for repeated items in ActiveLayers
	var repeated1 = $("a#capa"+id+".capaActiva")[1];
	var repeated2 = $("a#capa"+id+".capaActiva")[2];
	$(repeated1).hide();
	$(repeated2).hide();

	//revisar unidades!
	var unidad = li.find('.unidad').html();
	console.log("esta es la unidad de la capa: ", unidad);
	if(unidad.length){
		li.find('.leyenda').hide();
	}
	else{
		//li.find('.color-minmax').hide();
		li.find('.color-minmax').attr('style','color: white; display: inline; width: 29%;');
		li.find('.unidad').hide();
	}
	
	
}

function remueveDiv(id){
	//flag es false cuando se hizo click sobre la cruz
	var parent = $('#c'+id+'Principal').parents()[4];
	var cruzCerrar = $(parent).find('.remove_ctg_panel');
	console.log('padre del elemento: ', parent);
	console.log('cruz de borrar: ', $(parent).find('.remove_ctg_panel'));

	var li = $('#c'+id+'Principal');
	li.appendTo('#c'+id);
	li.hide();
	cruzCerrar.click();
	
	
	//var darleClick = $('#c'+id).find('a');
	//console.log(darleClick);

	/*
	var wrapper = $("#accordion");
	$(wrapper).on("click",".remove_ctg_panel", function(e){ 
		e.preventDefault(); 
		var accesskey = $(this).attr('accesskey');
	    $('#panel'+accesskey).remove();
	   	counter--;
		x--;
	});
	*/
}

$(document).ready(function(){
	    var counter = 1;
	    var wrapper = $("#accordion");
	
		 $("#addButton").on("click", function(e){ 
	    	e.preventDefault();
	    	var catgName = prompt("Please Add your category name");
			if(catgName == ''){
				catgName = 'Catg#'+counter;
			}
			if(catgName != null){
				var ariaExpanded = false;
				var expandedClass = '';
				var collapsedClass = 'collapsed';
				if(counter==1){
					  ariaExpanded = true;
					  expandedClass = 'in';
					  collapsedClass = '';
				}
				  $(wrapper).append('<div class="col-sm-12" style="margin-bottom: 0;"><div class="panel panel-default" id="panel'+ counter +'">' + 
				     '<div class="panel-heading" role="tab" id="heading'+ counter +'"><h4 class="panel-title">' +
					 '<a class="'+collapsedClass+'" id="panel-lebel'+ counter +'" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ counter +'" ' +
					 'aria-expanded="'+ariaExpanded+'" aria-controls="collapse'+ counter +'"> '+catgName+' </a><div class="actions_div" style="position: relative; top: -26px;">' +
					 '<a href="#" accesskey="'+ counter +'" class="remove_ctg_panel exit-btn pull-right"><span class="glyphicon glyphicon-remove"></span></a>' +
					 '<a href="#" accesskey="'+ counter +'" class="edit_ctg_label pull-right"><span class="glyphicon glyphicon-edit "></span> Edit</a>' +
					 '<a href="#" accesskey="'+ counter +'" class="pull-right" id="addButton2"> <span class="glyphicon glyphicon-plus"></span> Add child category</a></div></h4></div>' +
					 '<div id="collapse'+ counter +'" class="panel-collapse collapse '+expandedClass+'"role="tabpanel" aria-labelledby="heading'+ counter +'">'+
					 '<div class="panel-body"><div id="TextBoxDiv'+ counter +'"></div><a class="btn btn-xs btn-primary" accesskey="'+ counter +'" id="addButton3" ><span class="glyphicon glyphicon-plus"></span> Add New Attributes</a>' +
					 '<a class="btn btn-xs btn-success" accesskey="'+ counter +'" id="ajax_submit_button" >Done</a></div></div></div></div>');
				counter++;
			}
			
	     });
		 
		var x = 1; 
	     $(wrapper).on("click","#addButton2", function(e){
	         e.preventDefault();
			 var parentId = $(this).attr('accesskey');
			 var parentPanel = '#panel'+ parentId;
			 var catgName = prompt("Please Add your category name");
			 if(catgName == ''){
				catgName = ' P#'+parentId+' Catg#'+counter;
			 }
			if(catgName != null){
				var ariaExpanded = false;
				var expandedClass = '';
				var collapsedClass = 'collapsed';
			
				  $(wrapper).find(parentPanel).append('<div class="col-sm-12" style="margin-bottom: 0;"><div class="panel panel-default" id="panel'+counter+'">' + 
				     '<div class="panel-heading" role="tab" id="heading'+counter+'"><h4 class="panel-title">' +
					 '<a class="'+collapsedClass+'" id="panel-lebel'+ counter +'" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ counter+'" ' +
					 'aria-expanded="'+ariaExpanded+'" aria-controls="collapse'+ counter+'"> '+catgName+' </a><div class="actions_div" style="position: relative; top: -26px;">' +
					 '<a href="#" accesskey="'+counter +'" class="remove_ctg_panel exit-btn pull-right"><span class="glyphicon glyphicon-remove"></span></a>' +
					 '<a href="#" accesskey="'+ counter +'" class="edit_ctg_label pull-right"><span class="glyphicon glyphicon-edit"></span> Edit</a>' +
					 '<a href="#" accesskey="'+ counter +'" class="pull-right" id="addButton2"> <span class="glyphicon glyphicon-plus"></span> Add child category</a></h4></div>' +
					 '<div id="collapse'+ counter+'" class="panel-collapse collapse '+expandedClass+'"role="tabpanel" aria-labelledby="heading'+counter+'">'+
					 '<div class="panel-body"><div id="TextBoxDiv'+ counter +'"></div><a class="btn btn-xs btn-primary" accesskey="'+ counter +'" id="addButton3" ><span class="glyphicon glyphicon-plus"></span> Add New Attributes</a>' +
					 '<a class="btn btn-xs btn-success" accesskey="'+ counter +'" id="ajax_submit_button" >Done</a></div></div></div></div>');
				
				x++;
				counter++;
			}
			
	     });
		 
	     $(wrapper).on("click",".remove_ctg_panel", function(e){
	 		 e.preventDefault(); 
	 		 //desligar el div de la capa del panel
			var parent = $(this).parents()[3];
			var div = $(parent).find('.capaActiva');
			var boton = $(div).find('a');
			//console.log("quiero la a: ", boton);
			//boton[0].click();

			var id = $(div).attr('id')+'';
			var id2 = id.replace('Principal','');
			div.appendTo('#'+id2);
			div.hide();
			//var boton = $('#'+id2).find('.svg-inline--fa');
			//boton.click();

			//console.log("padres del boton: ", parent);
			//console.log("div a mover: ", id);

	 		 var accesskey = $(this).attr('accesskey');
		     $('#panel'+accesskey).remove();
			 counter--;
			 x--;


	     });
	     
		 
		 
		 
	     var y = 1; 
	     $(wrapper).on("click","#addButton3", function(e){
	         e.preventDefault();
			 var accesskey = $(this).attr('accesskey');
			 y++; 
			 $('#panel'+accesskey).find('#TextBoxDiv'+accesskey).append('<div class="col-md-12 form-group"><input type="text" name="ctgtext[]" class="form-control" style="width: 40%;float: left;"/><a href="#" class="remove_field exit-btn"><span class="glyphicon glyphicon-remove"></a></div>');
	        
	     });
	     
	     $(wrapper).on("click",".remove_field", function(e){
	         e.preventDefault(); 
	     	$(this).parent('div').remove();y--;
	     })
	  	
	     $(wrapper).on("click",".edit_ctg_label", function(e){ 
	    	 var panelId = $(this).attr('accesskey');
			 var catgName = prompt("Please Change your category name");
			 if(catgName == ''){
				   return false;
			 }
			 if(catgName != null){
				 $('#panel'+panelId).find("#panel-lebel"+panelId).html('').html(catgName);
			 }
				
			
     });
  });