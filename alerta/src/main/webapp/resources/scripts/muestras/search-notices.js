var SearchNotices = function () {

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
	            	}
	    });
	};


    var desbloquearUI = function () {
        setTimeout($.unblockUI, 500);
    };

    return {
        //main function to initiate the module
        init: function (parametros) {
			var responsiveHelper_dt_basic = undefined;
			var breakpointDefinition = {
				tablet : 1024,
				phone : 480
			};
			var table1 = $('#notices_result').dataTable({
				"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>"+
					"t"+
					"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
				"autoWidth" : true,
				"preDrawCallback" : function() {
					// Initialize the responsive datatables helper once.
					if (!responsiveHelper_dt_basic) {
						responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#notices_result'), breakpointDefinition);
					}
				},
				"rowCallback" : function(nRow) {
					responsiveHelper_dt_basic.createExpandIcon(nRow);
				},
				"drawCallback" : function(oSettings) {
					responsiveHelper_dt_basic.respond();
				}
                /*"stateSave": true,
                "stateSaveCallback": function(settings,data) {
                    console.log('DataTables_' + settings.sInstance);
                    console.log(JSON.stringify(data));
                    localStorage.setItem( 'DataTables_' + settings.sInstance, JSON.stringify(data) )
                },
                "stateLoadCallback": function(settings) {
                    console.log(JSON.parse( localStorage.getItem( 'DataTables_' + settings.sInstance )));
                    return JSON.parse( localStorage.getItem( 'DataTables_' + settings.sInstance ) )
                }*/
			});

            $('#search-notices').validate({
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
                        table1.fnClearTable();
                        //table1.state.clear();
                        //localStorage.removeItem('filtroDataTables_notices_result');
                        getNotices();

                    }
            });


            function getNotices() {
            	bloquearUI(parametros.blockMess);
    			$.getJSON(parametros.noticesUrl, {
    				strFilter : encodeURI($('#filtro').val()),
    				ajax : 'true'
    			}, function(data) {
                    //localStorage.setItem('filtroDataTables_notices_result',encodeURI($('#filtro').val()));
    				var len = data.length;
    				for ( var i = 0; i < len; i++) {
                        var nombreMuniRes = "";
                        if (data[i].persona.municipioResidencia!=null){
                            nombreMuniRes = data[i].persona.municipioResidencia.nombre;
                        }

                        var date = new Date(data[i].fechaRegistro);
                        var dia = function (date){ if (date.getDate() >= 10) return date.getDate(); else return "0"+date.getDate() };
                        var mes = function (date){ if ((date.getMonth() + 1) >= 10) return (date.getMonth() + 1); else return "0"+(date.getMonth() + 1) };
                        var dateFormat = dia(date) + "/" + mes(date) + "/" + date.getFullYear();

                        table1.fnAddData(
    							[data[i].persona.primerNombre, data[i].persona.segundoNombre, data[i].persona.primerApellido, data[i].persona.segundoApellido, data[i].persona.fechaNacimiento, nombreMuniRes, data[i].codTipoNotificacion.valor, dateFormat, '<a data-toggle="modal" title="Tomar Mx" class="btn btn-primary btn-xs search" data-id='+data[i].idNotificacion+'><i class="fa fa-eyedropper fa-fw"></i></a>']);
    				}

                    $(".search").on('click', function(){
                          getTomaMx($(this).data('id'));
                    });

                    $(".dataTables_paginate").on('click', function() {
                        $(".search").on('click', function () {
                            getTomaMx($(this).data('id'));
                        });
                    });


    				setTimeout($.unblockUI, 500);

    			})
    			.fail(function() {
				    alert( "error" );
				    setTimeout($.unblockUI, 5);
				});
            }


            function getTomaMx (idNotificacion){
                bloquearUI(parametros.blockMess);
                $.getJSON(parametros.tomaMxUrl, {
                    idNotificacion: idNotificacion,
                    ajax: 'true'
                }, function (data) {
                    var actionUrl;
                    if ($("#esEstudio").val()=='true'){
                        actionUrl = parametros.createStudyUrl + '/' + idNotificacion;
                    }else {
                        actionUrl = parametros.actionUrl + '/' + idNotificacion;
                    }
                    desbloquearUI();
                    if(data.length > 0){
                        var opcSi = $("#inYes").val();
                        var opcNo = $("#inNo").val();
                        $.SmartMessageBox({

                            title: $('#titleC').val(),
                            content: $('#contentC').val(),
                            buttons: '['+opcSi+']['+opcNo+']'
                        }, function (ButtonPressed) {
                            if (ButtonPressed === opcSi) {
                                window.location.href = actionUrl;

                            }
                            if (ButtonPressed === opcNo) {
                                $.smallBox({
                                    title: $('#titleCancel').val(),
                                    content: "<i class='fa fa-clock-o'></i> <i>"+$("#smallBox_content").val()+"</i>",
                                    color: "#C46A69",
                                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                                    timeout: 4000
                                });
                            }

                        });
                    }else{
                        window.location.href =  actionUrl;
                    }

                });
            }

            /*
            function validarState() {
                console.log('validate');
                if (localStorage.getItem('filtroDataTables_notices_result')!=undefined){
                    $('#filtro').val(decodeURIComponent(localStorage.getItem('filtroDataTables_notices_result')));
                    getNotices();
                }
            }

            validarState();*/

        }
    };

}();