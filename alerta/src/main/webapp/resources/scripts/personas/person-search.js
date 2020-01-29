var SearchPerson = function () {
	
	var bloquearUI = function(mensaje){
		var loc = window.location;
	    var pathName = loc.pathname.substring(0,loc.pathname.indexOf('/', 1)+1);
	    var mess = '<img src=' + pathName + 'resources/img/ajax-loading.gif>' + mensaje;
	    $.blockUI({ message: mess,
	    	css: { 
	            border: 'none', 
	            padding: '15px', 
	            backgroundColor: '#000', 
	            '-webkit-border-radius': '10px', 
	            '-moz-border-radius': '10px', 
	            opacity: .5, 
	            color: '#fff' 
	            	},
            baseZ: 1051 // para que se muestre bien en los modales
	    }); 
	};

    return {
        //main function to initiate the module
        init: function (parametros) {
            var page=0;
            var rowsPage=50;
            $("#prev").prop('disabled',true);
            $("#next").prop('disabled',true);
			var responsiveHelper_dt_basic = undefined;
			var breakpointDefinition = {
				tablet : 1024,
				phone : 480
			};
			var table1 = $('#persons_result').dataTable({
				"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>"+
					"t"+
					"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
				"autoWidth" : true,
				"preDrawCallback" : function() {
					// Initialize the responsive datatables helper once.
					if (!responsiveHelper_dt_basic) {
						responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#persons_result'), breakpointDefinition);
					}
				},
                "paging": false,
                "info": false,
				"rowCallback" : function(nRow) {
					responsiveHelper_dt_basic.createExpandIcon(nRow);
				},
				"drawCallback" : function(oSettings) {
					responsiveHelper_dt_basic.respond();
				}
			});

            $('#search-form').validate({
    			// Rules for form validation
    				rules : {
    					filtro : {
    						required : true,
    						minlength: 3
    					}
    				},
    				// Do not change code below
    				errorPlacement : function(error, element) {
    					error.insertAfter(element.parent());
    				},
    				submitHandler: function (form) {
                        page=0;
                        getPersons(page*rowsPage);
                    }
            });

            $("#prev").on('click', function (event) {
                if (page>0) {
                    page = page - 1;
                    getPersons(page*rowsPage);
                }
            });
            $("#next").on('click', function (event) {
                page = page+1;
                getPersons(page*rowsPage);

            });

            function getPersons(pagina) {
                if (page>0) {
                    $("#prev").prop('disabled',false);
                }else{
                    $("#prev").prop('disabled',true);
                }
                table1.fnClearTable();
            	bloquearUI(parametros.blockMess); 
    			$.getJSON(parametros.sPersonUrl, {
    				strFilter : encodeURI($('#filtro').val()),
                    pPaginaActual: pagina,
    				ajax : 'true'
    			}, function(data) {
                    var mensaje="";
                    try{
                        mensaje = data.mensaje;
                    }catch (err){
                        mensaje="";
                    }
                    if (mensaje!=undefined && mensaje!="") {
                        setTimeout($.unblockUI, 500);
                        $.smallBox({
                            title: mensaje,
                            content: $("#smallBox_content").val(),
                            color: "#C46A69",
                            iconSmall: "fa fa-warning",
                            timeout: 4000
                        });
                    } else {
                        var len = 0;
                        if (data != null)
                            len = data.length;

                        if (len < rowsPage) {
                            $("#next").prop('disabled', true);
                        } else {
                            $("#next").prop('disabled', false);
                        }
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                var nombreMuniRes = "";

                                if (data[i].municipioResidencia != null) {
                                    nombreMuniRes = data[i].municipioResidencia.nombre;
                                }
                                var actionUrl = parametros.sActionUrl + '/' + data[i].personaId;
                                var actionNotiPacienteUrl = parametros.sActionNotiPacienteUrl + '/' + data[i].personaId;
                                var edad = getAge(data[i].fechaNacimiento).split(",");
                                table1.fnAddData(
                                    [(data[i].identificacion!=null?data[i].identificacion:""), data[i].primerNombre, (data[i].segundoNombre != null ? data[i].segundoNombre : ""), data[i].primerApellido,
                                        (data[i].segundoApellido != null ? data[i].segundoApellido : ""), data[i].fechaNacimiento, edad[0], nombreMuniRes,
                                            '<a title="Ver" href=' + actionUrl + ' class="btn btn-success btn-xs"><i class="fa fa-mail-forward"></i></a>',
                                            '<a title="Eventos Previos" href=' + actionNotiPacienteUrl + ' class="btn btn-primary btn-xs"><i class="fa fa-list"></i></a>']);
                            }
                            setTimeout($.unblockUI, 500);
                        } else {
                            setTimeout($.unblockUI, 500);
                            $.smallBox({
                                title: $("#msg_no_results_found").val(),
                                content: $("#smallBox_content").val(),
                                color: "#C79121",
                                iconSmall: "fa fa-warning",
                                timeout: 4000
                            });
                        }
                    }
    			})
    			.fail(function(jqXHR) {
				    setTimeout($.unblockUI, 5);
                        if (jqXHR.status=="200") {
                            $.smallBox({
                                title: $("#msg_no_results_found").val(),
                                content: $("#smallBox_content").val(),
                                color: "#C79121",
                                iconSmall: "fa fa-warning",
                                timeout: 4000
                            });
                        }else{
                            alert(" status: " + jqXHR.status + " - " + jqXHR.statusText);
                        }
				});
            };

            $("#create-person").click(function(){
                window.location.href = parametros.sCreatePersonUrl;
            });
        }
    };

}();