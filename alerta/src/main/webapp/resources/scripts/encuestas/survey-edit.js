var EditAedesSurvey = function () {

    return {
        //main function to initiate the module
        init: function (parametros) {
            $(document).on('keypress','form input',function(event)
            {
                event.stopImmediatePropagation();
                if( event.which == 13 )
                {
                    event.preventDefault();
                    var $input = $('form input');
                    if( $(this).is( $input.last() ) )
                    {
                        //Time to submit the form!!!!
                        //alert( 'Hooray .....' );
                    }
                    else
                    {
                        $input.eq( $input.index(this) + 1 ).focus();
                    }
                }
            });

            // Se agrega m�todo de validaci�n 'greaterOrEqualThan', para validar que las cantidad de depositos insepec sea mayor o igual a la
            // cantidad de viviendas inspec, y que la cantidad de viviendas inspec sean mayor o igual a la cantidad de manzanas inspec
            jQuery.validator.addMethod("greaterOrEqualThan",
                function (value, element, param) {
                    var $min = $(param[0]);
                    if (this.settings.onfocusout) {
                        $min.off(".validate-greaterOrEqualThan").on("blur.validate-greaterOrEqualThan", function () {
                            $(element).valid();
                        });
                    }
                    return parseInt(value) >= parseInt($min.val());
                }, function (param){
                    var msg = parametros.msg_greaterOrEqualThan.replace(/\{0\}/,param[1]); //.replace(/\{1\}/,param[2]);
                    return msg;
                });

            //Se agrega m�todo de validaci�n 'lessOrEqualThan', para validar que las cantidades de viviendas, manzanas y dep�sitos positivos, sean menores
            // o igual a las cantidades de viviendas, manzanas y dep�sitos inspeccionados respesctivamente
            jQuery.validator.addMethod("lessOrEqualThan",
                function (value, element, param) {
                    var $min = $(param[0]);
                    if (this.settings.onfocusout) {
                        $min.off(".validate-lessOrEqualThan").on("blur.validate-lessOrEqualThan", function () {
                            $(element).valid();
                        });
                    }
                    return parseInt(value) <= parseInt($min.val());
                }, function (param){
                    var msg = parametros.msg_lessOrEqualThan.replace(/\{0\}/,param[1]); //.replace(/\{1\}/,param[2]);
                    return msg;
                });

            var responsiveHelper_dt_basic = undefined;
			var breakpointDefinition = {
				tablet : 1024,
				phone : 480
			};
			var table1 = $('#dtDetalle').dataTable({
				"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>"+
					"t"+
					"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
				"autoWidth" : true,
                "aoColumns" : [
                    {sClass: "aw-center" },null,{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },null,null,{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-center,editDetalle"}
                ],
				"preDrawCallback" : function() {
					// Initialize the responsive datatables helper once.
					if (!responsiveHelper_dt_basic) {
						responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dtDetalle'), breakpointDefinition);
					}
				},
				"rowCallback" : function(nRow) {
					responsiveHelper_dt_basic.createExpandIcon(nRow);
				},
				"drawCallback" : function(oSettings) {
					responsiveHelper_dt_basic.respond();
				}
			});

            function ocultarModalDetalle(){
                $('#myModal').modal('hide');
            }

            function mostrarModalDetalle(){
                var $valid = $("#frmPrincipal").valid();
                if (!$valid) {
                    $formPrincipal.focusInvalid();
                    return false;
                }else {
                    $("#myModal").modal({
                        show: true
                    });
                }
            }

            function mostrarMensajePop(msgHtml){
                $("#mensaje").html(msgHtml).show().focus();
            }

            function ocultarMensajePop(){
                $("#mensaje").hide("slow");
            }

            function mostrarMensaje(msgHtml){
                $("#msjMaestro").html(msgHtml).show().focus();
            }

            function ocultarMensaje(){
                $("#msjMaestro").hide("slow");
            }

            function blockUI(){
                var loc = window.location;
                var pathName = loc.pathname.substring(0,loc.pathname.indexOf('/', 1)+1);
                //var mess = $("#blockUI_message").val()+' <img src=' + pathName + 'resources/img/loading.gif>';
                var mess = '<img src=' + pathName + 'resources/img/ajax-loading.gif> ' + $("#blockUI_message").val();
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
                    baseZ: 1051});
            }

            function unBlockUI() {
                setTimeout($.unblockUI, 500);
            }

            function saveSurvey(){
                var maestro = {
                    encuestaId: $("#idMaestroEditado").val(), // se pasa el id del maestro que se esta editando,
                    codSilais: $('#codSilais option:selected').val(),
                    codMunicipio: $('#codMunicipioEncu option:selected').val(),
                    codDistrito: $('#codigoDistrito option:selected').val(),
                    codArea: $('#codigoArea option:selected').val(),
                    codUnidadSalud: $('#codUnidadSalud option:selected').val(),
                    codProcedencia: $('#codProcedencia option:selected').val(),
                    feInicioEncuesta: $('#fecInicioEncuesta').val(),
                    feFinEncuesta: $('#fecFinEncuesta').val(),
                    codOrdinalEncu: $('#codOrdinal option:selected').val(),
                    codModeloEncu: 1,
                    semanaEpi: $('#semanaEpi').val(),
                    mesEpi: $('#mesEpi').val(),
                    anioEpi: $('#anioEpi').val(),
                    usuarioRegistroId: 1
                };
                var detalle = {
                    detaEncuestaId: $("#idDetalleEditar").val(),
                    codLocalidad: $('#codigoLocalidad option:selected').val(),
                    viviendaInspeccionada: $('#viviendasInspec').val(),
                    viviendaPositiva: $('#viviendasPositivas').val(),
                    manzanaInspeccionada: $('#manzanasInspec').val(),
                    manzanaPositiva: $('#manzanasPositivas').val(),
                    depositoInspeccionado: $('#depositosInspec').val(),
                    depositoPositivo: $('#depositosPositovos').val(),
                    pupaPositiva: $('#pupasPositivas').val(),
                    noAbatizado: $('#noAbati').val(),
                    noEliminado: $('#noElimni').val(),
                    noNeutralizado: $('#noNeutr').val(),
                    feAbatizado: $('#fecAbat').val(),
                    feRepot: '',//$('#fecReport').val(),
                    feVEnt: $('#fecVent').val(),
                    usuarioRegistroId: 1
                };
                var esEdicion = ($("#idDetalleEditar").val()!=null && $("#idDetalleEditar").val().trim().length > 0);
                var encuestaObj = {};
                encuestaObj['idMaestro'] = $("#idMaestroEditado").val();
                encuestaObj['mensaje'] = '';
                encuestaObj['maestro'] = maestro;
                encuestaObj['detalle'] = detalle;
                var msg = null;
                blockUI();
                $.ajax(
                    {
                        url: parametros.sEditAedesUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(encuestaObj),
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.mensaje.length > 0){
                                $.smallBox({
                                    title: data.mensaje ,
                                    content: $("#smallBox_content").val(),
                                    color: "#C46A69",
                                    iconSmall: "fa fa-warning",
                                    timeout: 4000
                                });
                            }else{
                                getSurveyDetails(data.idMaestro);
                                limpiarCamposDetalle();
                                if (esEdicion) {
                                    msg = $("#msg_location_updated").val();
                                    setTimeout(function () {
                                        ocultarModalDetalle()
                                    }, 600);
                                } else {
                                    msg = $("#msg_location_added").val();
                                }
                                $.smallBox({
                                    title: msg ,
                                    content: $("#smallBox_content").val(),
                                    color: "#739E73",
                                    iconSmall: "fa fa-success",
                                    timeout: 4000
                                });
                            }
                            unBlockUI();
                        },
                        error: function (data, status, er) {
                            unBlockUI();
                            alert("error: " + data + " status: " + status + " er:" + er);
                        }
                    }
                )
            }

            function updateSurvey(){
                var maestro = {
                    encuestaId: $("#idMaestroEditado").val(), // se pasa el id del maestro que se esta editando,
                    codSilais: $('#codSilais option:selected').val(),
                    codMunicipio: $('#codMunicipioEncu option:selected').val(),
                    codDistrito: $('#codigoDistrito option:selected').val(),
                    codArea: $('#codigoArea option:selected').val(),
                    codUnidadSalud: $('#codUnidadSalud option:selected').val(),
                    codProcedencia: $('#codProcedencia option:selected').val(),
                    feInicioEncuesta: $('#fecInicioEncuesta').val(),
                    feFinEncuesta: $('#fecFinEncuesta').val(),
                    codOrdinalEncu: $('#codOrdinal option:selected').val(),
                    semanaEpi: $('#semanaEpi').val(),
                    mesEpi: $('#mesEpi').val(),
                    anioEpi: $('#anioEpi').val(),
                    usuarioRegistroId: 1
                };
                var encuestaObj = {};
                encuestaObj['mensaje'] = '';
                encuestaObj['maestro'] = maestro;
                blockUI();
                $.ajax(
                    {
                        url: parametros.sEditMaestroUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(encuestaObj),
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.mensaje.length > 0){
                                $.smallBox({
                                    title: data.mensaje ,
                                    content: $("#smallBox_content").val(),
                                    color: "#C46A69",
                                    iconSmall: "fa fa-warning",
                                    timeout: 4000
                                });
                            }else{
                                $.smallBox({
                                    title: $("#msg_header_updated").val() ,
                                    content: $("#smallBox_content").val(),
                                    color: "#739E73",
                                    iconSmall: "fa fa-success",
                                    timeout: 4000
                                });
                            }
                            unBlockUI();
                        },
                        error: function (data, status, er) {
                            unBlockUI();
                            alert("error: " + data + " status: " + status + " er:" + er);
                        }
                    }
                )
            }
            
            function getSurveyDetails(idMaestro) {
                var nTotalViviendasInspec    = 0;
                var nTotalViviendasPosit     = 0;
                var nTotalManzanasInspec     = 0;
                var nTotalManzanasPosit      = 0;
                var nTotalDepositosInspec    = 0;
                var nTotalDepositosPosit     = 0;
                var nTotalPupas              = 0;
    			$.getJSON(parametros.sSurveyDetailsUrl, {
                    idMaestroEncuesta: idMaestro,
    				ajax : 'true'
    			}, function(data) {
                    table1.fnClearTable();

                    var len = data.length;
    				for ( var i = 0; i < len; i++) {
                        nTotalViviendasInspec = nTotalViviendasInspec + data[i][0].viviendasInspec;
                        nTotalViviendasPosit     = nTotalViviendasPosit + data[i][0].viviendasPosit;
                        nTotalManzanasInspec     = nTotalManzanasInspec + data[i][0].manzanasInspec;
                        nTotalManzanasPosit      = nTotalManzanasPosit + data[i][0].manzanasPosit;
                        nTotalDepositosInspec    = nTotalDepositosInspec + data[i][0].depositosInspec;
                        nTotalDepositosPosit     = nTotalDepositosPosit + data[i][0].depositosPosit;
                        nTotalPupas              = nTotalPupas + data[i][0].pupasPosit;

						table1.fnAddData(
                                [i+1, data[i][0].localidad, data[i][0].manzanasInspec, data[i][0].manzanasPosit, data[i][0].indiceManzanas, data[i][0].viviendasInspec, data[i][0].viviendasPosit, data[i][0].indiceViviendas, data[i][0].depositosInspec, data[i][0].depositosPosit, data[i][0].indiceDepositos, data[i][0].indiceBrete, data[i][0].pupasPosit, data[i][0].indicePupas, data[i][0].fechaAbat, data[i][0].fechaVEnt, data[i][0].noAbati, data[i][0].noElimin,  data[i][0].noNeutr, '<a data-toggle="modal" class="btn btn-default btn-xs editDetalle" data-id='+data[i][0].detaEncuestaId+'><i class="fa fa-edit fa-fw"></i></a>']);
    							//[data[i].identificacion, data[i].primerNombre, data[i].segundoNombre, data[i].primerApellido, data[i].segundoApellido, data[i].fechaNacimiento,data[i].municipioResidencia.nombre,'<a href='+ personUrl + ' class="btn btn-default btn-xs"><i class="fa fa-search"></i></a>']);
                        var nTotalViviendasIndice    = parseFloat((nTotalViviendasPosit / nTotalViviendasInspec)*100).toFixed(1);
                        var nTotalManzanasIndice     = parseFloat((nTotalManzanasPosit / nTotalManzanasInspec)*100).toFixed(1);
                        var nTotalDepositosIndice    = parseFloat((nTotalDepositosPosit/nTotalDepositosInspec)*100).toFixed(1);
                        var nTotalIndiceIPupa        = parseFloat((nTotalPupas/nTotalViviendasInspec)*100).toFixed(1);
                        var nTotalIndiceBrete		 = parseFloat((nTotalDepositosPosit/nTotalViviendasInspec)*100).toFixed(1);
                    }

                    $("#totalViviendasInspec").text(nTotalViviendasInspec);
                    $("#totalViviendasPosit").text(nTotalViviendasPosit);
                    $("#totalViviendasIndice").text(nTotalViviendasIndice);
                    $("#totalManzanasInspec").text(nTotalManzanasInspec);
                    $("#totalManzanasPosit").text(nTotalManzanasPosit);
                    $("#totalManzanasIndice").text(nTotalManzanasIndice);
                    $("#totalDepositosInspec").text(nTotalDepositosInspec);
                    $("#totalDepositosPosit").text(nTotalDepositosPosit);
                    $("#totalDepositosIndice").text(nTotalDepositosIndice);
                    $("#totalPupas").text(nTotalPupas);
                    $("#totalIndiceBrete").text(nTotalIndiceBrete);
                    $("#totalIndiceIPupa").text(nTotalIndiceIPupa);

                    $(".editDetalle").on('click', function(){
                        limpiarCamposDetalle();
                        $('#idDetalleEditar').val($(this).data('id'));
                        getInfoModalDetail($(this).data('id'));
                        mostrarModalDetalle();
                    });

                    //al paginar se define nuevamente la funci�n de cargar el detalle//asi funcionaba bien antes.
                    $(".pagination").click(function() {
                        $(".editDetalle").on('click', function () {
                            limpiarCamposDetalle();
                            $('#idDetalleEditar').val($(this).data('id'));
                            getInfoModalDetail($(this).data('id'));
                            mostrarModalDetalle();
                        });
                    });

                    //al paginar se define nuevamente la funci�n de cargar el detalle
                    $(".dataTables_paginate").on('click', function() {
                        $(".editDetalle").on('click', function () {
                            limpiarCamposDetalle();
                            $('#idDetalleEditar').val($(this).data('id'));
                            getInfoModalDetail($(this).data('id'));
                            mostrarModalDetalle();
                        });
                    });


                })
    			.fail(function() {
				    alert( "error" );
				    
				});
            }

            function getInfoModalDetail(idDetalleEditar){
                $.ajax({
                    type: "GET",
                    url: parametros.sRecuperarDetalleUrl,
                    data: {idDetalleEncu: idDetalleEditar},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        blockUI();
                        $("#codigoSector").val(response.codSector).change();
                        $("#codLocalidadEdicion").val(response.codLocalidad);
                        $("#viviendasInspec").val(response.viviendasInspec);
                        $("#viviendasPositivas").val(response.viviendasPosit);
                        $("#manzanasInspec").val(response.manzanasInspec);
                        $("#manzanasPositivas").val(response.manzanasPosit);
                        $("#depositosInspec").val(response.depositosInspec);
                        $("#depositosPositovos").val(response.depositosPosit);
                        $("#pupasPositivas").val(response.pupasPosit);
                        $("#fecAbat").val(response.fechaAbat);
                        //$("#fecReport").val(response.fechaRepot);
                        $("#fecVent").val(response.fechaVEnt);
                        $("#noAbati").val(response.noAbati);
                        $("#noElimni").val(response.noElimin);
                        $("#noNeutr").val(response.noNeutr);
                        setTimeout(function(){unBlockUI();$("#codigoLocalidad").val($("#codLocalidadEdicion").val()).change();},500);
                    },
                    error: function (result) {

                    }
                });
            }
            //Se cargan las tablas de detalle
            getSurveyDetails($("#idMaestroEditado").val());

            $("#mensaje").hide();

            //mostrar modal detalle encuesta
            $("#openModal").click(function(){
                limpiarCamposDetalle();
                mostrarModalDetalle();
            });

            $("#btnActualizarMae").click(function(){
                var $valid = $("#frmPrincipal").valid();
                if (!$valid) {
                    $formPrincipal.focusInvalid();
                    return false;
                }else {
                    updateSurvey();
                }
            });
/*
            <!-- al seleccionar municipio -->
            $('#codMunicipioEncu').change(function(){
                $('#codUnidadSalud').val('').change();
                $('#codigoDistrito').val('').change();
                $('#codigoArea').val('').change();
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sUnidadesUrl, {
                        codMunicipio: $(this).val(),
                        codSilais:$('#codSilais option:selected').val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codUnidadSalud').html(html);
                    });
                    $.getJSON(parametros.sSectoresUrl, {
                        codMunicipio: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codigoSector').html(html);
                    });
                    $.getJSON(parametros.sDistritosUrl, {
                        codMunicipio: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].valor
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codigoDistrito').html(html);
                    });
                    $.getJSON(parametros.sAreasUrl, {
                        codMunicipio: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].valor
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codigoArea').html(html);
                    })
                }
            });

            <!-- al seleccionar sector-->
            $('#codigoSector').change(function(){
                $('#codigoLocalidad').val('').change();
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sComunidadesUrl, {
                        codSector: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            //html += '</option>';
                        }
                        $('#codigoLocalidad').html(html);
                        console.log("terminsa sector");
                    });
                }
            });

            <!-- al seleccionar SILAIS -->
            $('#codSilais').change(function(){
                $('#codMunicipioEncu').val('').change();
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sMunicipiosUrl, {
                        idSilais: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigoNacional + '">'
                                + data[i].nombre
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codMunicipioEncu').html(html);
                    });
                }
            });
*/
            <!-- al seleccionar localidad -->
            $('#codigoLocalidad').click(function() {
                if ($(this).val() != $("#codLocalidadEdicion").val() && ($(this).val().length > 0 )){
                    var encuestaObj = {};
                    encuestaObj['idLocalidad'] = $(this).val();
                    encuestaObj['idMaestroEncuesta'] = $("#idMaestroEditado").val();
                    //encuestaObj['maestroEncuesta'] = maestro;
                    $.getJSON(parametros.sValidarLocalidadUrl, {
                        datosEncuesta: JSON.stringify(encuestaObj),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        if (len > 0) {
                            $.smallBox({
                                title: $("#msg_location_exist").val() ,
                                content: $("#smallBox_content").val(),
                                color: "#C46A69",
                                iconSmall: "fa fa-warning",
                                timeout: 4000
                            });
                            setTimeout(function(){$("#codigoLocalidad").val('').change();}, 2000);
                        } /*else {
                            ocultarMensajePop();
                        }*/
                    })
                }/*else {
                    setTimeout(function () {
                        ocultarMensajePop()
                    }, 2000);
                 }*/
            });

            var $formPrincipal = $("#frmPrincipal").validate({
                rules: {
                    codSilais: {
                        required: true
                    },
                    codMunicipioEncu: {
                        required: true
                    },
                    codUnidadSalud: {
                        required: true
                    },
                    fecInicioEncuesta: {
                        required: true/*,
                        dpDate: true,
                        dpCompareDate: ['before', '#fecFinEncuesta', 'notAfter', parametros.dFechaHoy ]*/
                    },
                    codOrdinal: {
                        required: true
                    },
                    codProcedencia: {
                        required: true
                    },
                    semanaEpi: {
                        digits: true,
                        maxlength: 2
                    },
                    mesEpi: {
                        digits: true,
                        maxlength: 2
                    },
                    anioEpi: {
                        digits: true,
                        maxlength: 4
                    }
                },
                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());

                }
            });

            var $formDetalleEncuesta = $("#frmDetalleEncuesta").validate({
                rules: {
                    codigoLocalidad:{
                        required: true
                    },
                    viviendasInspec:{
                        required: true,
                        digits: true,
                        greaterOrEqualThan: ['#manzanasInspec',parametros.sValBlock+' '+parametros.sValInspec]
                    },
                    viviendasPositivas:{
                        required: true,
                        digits: true,
                        lessOrEqualThan: ['#viviendasInspec',parametros.sValHomes+' '+parametros.sValInspec]
                    },
                    manzanasInspec:{
                        required: true,
                        digits: true
                    },
                    manzanasPositivas:{
                        required: true,
                        digits: true,
                        lessOrEqualThan: ['#manzanasInspec',parametros.sValBlock+' '+parametros.sValInspec]
                    },
                    depositosInspec:{
                        required: true,
                        digits: true,
                        greaterOrEqualThan: ['#viviendasInspec',parametros.sValHomes+' '+parametros.sValInspec]
                    },
                    depositosPositovos:{
                        required: true,
                        digits: true,
                        lessOrEqualThan: ['#depositosInspec',parametros.sValTanks+' '+parametros.sValInspec]
                    },
                    pupasPositivas:{
                        required: true,
                        digits: true,
                        lessOrEqualThan: ['#depositosInspec',parametros.sValTanks+' '+parametros.sValInspec]
                    },
                    noAbati:{
                        required: true,
                        digits: true,
                        lessOrEqualThan: ['#depositosInspec',parametros.sValTanks+' '+parametros.sValInspec]
                    },
                    noElimni:{
                        required: true,
                        digits: true,
                        lessOrEqualThan: ['#depositosInspec',parametros.sValTanks+' '+parametros.sValInspec]
                    },
                    noNeutr: {
                        required: true,
                        digits: true,
                        lessOrEqualThan: ['#depositosInspec',parametros.sValTanks+' '+parametros.sValInspec]
                    }
                },    // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());

                },
                submitHandler: function (form) {
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                    saveSurvey();
                }
            });

            $('#fecFinEncuesta').change(function () {
                var fecha = $('#fecFinEncuesta').val();
                var arr = fecha.split('/');
                $('#mesEpi').val(arr[1]);
                $('#anioEpi').val(arr[2]);
                $.ajax({
                    type: "GET",
                    url: parametros.sSemanaEpiUrl,
                    data: {fechaValidar: fecha},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        $('#semanaEpi').val(response.noSemana);
                    },
                    error: function (result) {
                        $('#semanaEpi').val("");
                    }
                });
            });

            function limpiarCamposMaestro(){
                $('#codSilais').val('').change();
                $('#codUnidadSalud').val('').change();
                $('#codMunicipioEncu').val('').change();
                $('#codigoDistrito').val('').change();
                $('#codigoArea').val('').change();
                $('#codProcedencia').val('').change();
                $('#codOrdinal').val('').change();
                $('#mesEpi').val('');
                $("#anioEpi").val('');
                $("#semanaEpi").val('');
                $("#fecInicioEncuesta").val('');
                $("#fecFinEncuesta").val('');
            }

            function limpiarCamposDetalle(){
                $('#codigoLocalidad option:first').prop("selected", true).change();
                $("#viviendasInspec").val('');
                $("#viviendasPositivas").val('');
                $("#manzanasInspec").val('');
                $("#manzanasPositivas").val('');
                $("#depositosInspec").val('');
                $("#depositosPositovos").val('');
                $("#pupasPositivas").val('');
                $("#noAbati").val('');
                $("#noElimni").val('');
                $("#noNeutr").val('');
                //$("#fecReport").val('');
                $("#fecVent").val('');
                $("#fecAbat").val('');
                $('#idDetalleEditar').val('');
                $("#codLocalidadEdicion").val('');
            }

            function limpiarTablaDetalle(){
                    table1.fnClearTable();
                    $("#totalViviendasInspec").text('0');
                    $("#totalViviendasPosit").text('0');
                    $("#totalViviendasIndice").text('0');
                    $("#totalManzanasInspec").text('0');
                    $("#totalManzanasPosit").text('0');
                    $("#totalManzanasIndice").text('0');
                    $("#totalDepositosInspec").text('0');
                    $("#totalDepositosPosit").text('0');
                    $("#totalDepositosIndice").text('0');
                    $("#totalPupas").text('0');
                    $("#totalIndiceBrete").text('0');
                    $("#totalIndiceIPupa").text('0');
            }

            $("#btnNuevoRegistro").click(function(){
                limpiarCamposMaestro();
                limpiarTablaDetalle();
            });
        }
    };

}();

var EditLarvariaSurvey = function () {

    return {
        //main function to initiate the module
        init: function (parametros) {
            $(document).on('keypress','form input',function(event)
            {
                event.stopImmediatePropagation();
                if( event.which == 13 )
                {
                    event.preventDefault();
                    var $input = $('form input');
                    if( $(this).is( $input.last() ) )
                    {
                        //Time to submit the form!!!!
                        //alert( 'Hooray .....' );
                    }
                    else
                    {
                        $input.eq( $input.index(this) + 1 ).focus();
                    }
                }
            });

            var responsiveHelper_dt_basic = undefined;
            var breakpointDefinition = {
                tablet : 1024,
                phone : 480
            };
            /*var table1 = $('#dtDetalleIndices').dataTable({
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>"+
                    "t"+
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
                "autoWidth" : true,
                "aoColumns" : [
                    {sClass: "aw-center" },null,{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-center" }
                ],
                "preDrawCallback" : function() {
                    // Initialize the responsive datatables helper once.
                    if (!responsiveHelper_dt_basic) {
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dtDetalleIndices'), breakpointDefinition);
                    }
                },
                "rowCallback" : function(nRow) {
                    responsiveHelper_dt_basic.createExpandIcon(nRow);
                },
                "drawCallback" : function(oSettings) {
                    responsiveHelper_dt_basic.respond();
                }
            });*/
            var table2 = $('#dtDetalleDistribucion').dataTable({
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>"+
                    "t"+
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
                "autoWidth" : true,
                "aoColumns" : [
                    {sClass: "aw-center" },null,{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-center" }
                ],
                "preDrawCallback" : function() {
                    // Initialize the responsive datatables helper once.
                    if (!responsiveHelper_dt_basic) {
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dtDetalleDistribucion'), breakpointDefinition);
                    }
                },
                "rowCallback" : function(nRow) {
                    responsiveHelper_dt_basic.createExpandIcon(nRow);
                },
                "drawCallback" : function(oSettings) {
                    responsiveHelper_dt_basic.respond();
                }
            });

            function blockUI(){
                var loc = window.location;
                var pathName = loc.pathname.substring(0,loc.pathname.indexOf('/', 1)+1);
                //var mess = $("#blockUI_message").val()+' <img src=' + pathName + 'resources/img/loading.gif>';
                var mess = '<img src=' + pathName + 'resources/img/ajax-loading.gif> ' + $("#blockUI_message").val();
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
                    baseZ: 1051});
            }

            function unBlockUI() {
                setTimeout($.unblockUI, 500);
            }

            function saveSurvey(){
                var maestro = {
                    encuestaId: $("#idMaestroEditado").val(), // se pasa el id del maestro que se esta editando,
                    codSilais: $('#codSilais option:selected').val(),
                    codMunicipio: $('#codMunicipioEncu option:selected').val(),
                    codDistrito: $('#codigoDistrito option:selected').val(),
                    codArea: $('#codigoArea option:selected').val(),
                    codUnidadSalud: $('#codUnidadSalud option:selected').val(),
                    codProcedencia: $('#codProcedencia option:selected').val(),
                    feInicioEncuesta: $('#fecInicioEncuesta').val(),
                    feFinEncuesta: $('#fecFinEncuesta').val(),
                    codOrdinalEncu: $('#codOrdinal option:selected').val(),
                    codModeloEncu: 1,
                    semanaEpi: $('#semanaEpi').val(),
                    mesEpi: $('#mesEpi').val(),
                    anioEpi: $('#anioEpi').val(),
                    usuarioRegistroId: 1
                };
                var detalle = {
                    detaEncuestaId: $("#idDetalleEditar").val(),
                    codLocalidad: $('#codigoLocalidad option:selected').val(),
                    /*pilaInfestado: $('#txtPila').val(),
                    llantaInfestado: $('#txtLlanta').val(),
                    barrilInfestado: $('#txtBarril').val(),
                    floreroInfestado: $('#txtFlorero').val(),
                    bebederoInfestado: $('#txtBebedero').val(),
                    artEspecialInfes: $('#txtArt_Esp').val(),
                    otrosDepositosInfes: $('#txtO_Dep').val(),
                    cisterInfestado: $('#txtCister').val(),
                    inodoroInfestado: $('#txtInodoro').val(),
                    barroInfestado: $('#txtBarro').val(),
                    plantaInfestado: $('#txtPlanta').val(),
                    arbolInfestado: $('#txtArbol').val(),
                    pozoInfestado: $('#txtPozo').val(),*/
                    especieAegypti: $('#txtAedesAegyti').val(),
                    especieAlbopic: $('#txtAedesAlbopic').val(),
                    especieCulexQuinque: $('#txtCulexQuinque').val(),
                    especieCulexNigrip: $('#txtCulexNigrip').val(),
                    especieCulexCoronat: $('#txtCulexCoronat').val(),
                    especieCulexErratico: $('#txtCulexErratico').val(),
                    especieCulexTarsalis: $('#txtCulexTarsalis').val(),
                    especieCulexFatigans: $('#txtCulexFatigans').val(),
                    especieCulexAlbim: $('#txtAnophAlbim').val(),
                    usuarioRegistroId: 1
                };

                var esEdicion = ($("#idDetalleEditar").val()!=null && $("#idDetalleEditar").val().trim().length > 0);
                var encuestaObj = {};
                encuestaObj['idMaestro'] = $("#idMaestroEditado").val();
                encuestaObj['mensaje'] = '';
                encuestaObj['maestro'] = maestro;
                encuestaObj['detalle'] = detalle;
                var msg = null;
                blockUI();
                $.ajax(
                    {
                        url: parametros.sEditLarvariaUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(encuestaObj),
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.mensaje.length > 0){
                                $.smallBox({
                                    title: data.mensaje ,
                                    content: $("#smallBox_content").val(),
                                    color: "#C46A69",
                                    iconSmall: "fa fa-warning",
                                    timeout: 4000
                                });
                            }else{
                                getSurveyDetails(data.idMaestro);
                                limpiarCamposDetalle();
                                if (esEdicion) {
                                    msg = $("#msg_location_updated").val();
                                    setTimeout(function () {
                                        ocultarModalDetalle()
                                    }, 600);
                                } else {
                                    msg = $("#msg_location_added").val();
                                }
                                $.smallBox({
                                    title: msg ,
                                    content: $("#smallBox_content").val(),
                                    color: "#739E73",
                                    iconSmall: "fa fa-success",
                                    timeout: 4000
                                });
                            }
                            unBlockUI();
                        },
                        error: function (data, status, er) {
                            unBlockUI();
                            alert("error: " + data + " status: " + status + " er:" + er);
                        }
                    }
                )
            }

            function updateSurvey(){
                var maestro = {
                    encuestaId: $("#idMaestroEditado").val(), // se pasa el id del maestro que se esta editando,
                    codSilais: $('#codSilais option:selected').val(),
                    codMunicipio: $('#codMunicipioEncu option:selected').val(),
                    codDistrito: $('#codigoDistrito option:selected').val(),
                    codArea: $('#codigoArea option:selected').val(),
                    codUnidadSalud: $('#codUnidadSalud option:selected').val(),
                    codProcedencia: $('#codProcedencia option:selected').val(),
                    feInicioEncuesta: $('#fecInicioEncuesta').val(),
                    feFinEncuesta: $('#fecFinEncuesta').val(),
                    codOrdinalEncu: $('#codOrdinal option:selected').val(),
                    semanaEpi: $('#semanaEpi').val(),
                    mesEpi: $('#mesEpi').val(),
                    anioEpi: $('#anioEpi').val(),
                    usuarioRegistroId: 1
                };
                var encuestaObj = {};
                encuestaObj['mensaje'] = '';
                encuestaObj['maestro'] = maestro;
                var html = null;
                blockUI();
                $.ajax(
                    {
                        url: parametros.sEditMaestroUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(encuestaObj),
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.mensaje.length > 0){
                                $.smallBox({
                                    title: data.mensaje ,
                                    content: $("#smallBox_content").val(),
                                    color: "#C46A69",
                                    iconSmall: "fa fa-warning",
                                    timeout: 4000
                                });
                            }else{
                                $.smallBox({
                                    title: $("#msg_header_updated").val() ,
                                    content: $("#smallBox_content").val(),
                                    color: "#739E73",
                                    iconSmall: "fa fa-success",
                                    timeout: 4000
                                });
                            }
                            unBlockUI();
                        },
                        error: function (data, status, er) {
                            unBlockUI();
                            alert("error: " + data + " status: " + status + " er:" + er);
                        }
                    }
                )
            }

            function getSurveyDetails(idMaestro) {
                $.getJSON(parametros.sSurveyDetailsUrl, {
                    idMaestroEncuesta: idMaestro,
                    ajax : 'true'
                }, function(response) {
                    //table1.fnClearTable();
                    table2.fnClearTable();

                    //var nIndicePilas    = 0, nIndiceLlanta   = 0, nIndiceBarril   = 0, nIndiceFlorero  = 0,nIndiceBebedero = 0, nIndiceArtEspec = 0, nIndiceODep     = 0, nIndiceCister   = 0, nIndiceInodo    = 0;
                    //var nIndicePlanta   = 0, nIndiceBarro    = 0, nIndiceArbol    = 0,nIndicePozo     = 0;
                    var nIndiceAegypti  = 0, nIndiceAlbopic  = 0, nIndiceQuinque  = 0, nIndiceNigrip   = 0, nIndiceCoronat  = 0, nIndiceErratico = 0, nIndiceTarsalis = 0, nIndiceFatigans = 0, nIndiceAlbim    = 0;
                    //var nTotalPilas    = 0, nTotalLlanta   = 0, nTotalBarril   = 0, nTotalFlorero  = 0, nTotalBebedero = 0, nTotalTotalIndice = 0;
                    //var nTotalArtEspec = 0, nTotalODep     = 0, nTotalCister   = 0, nTotalInodo    = 0, nTotalPlanta   = 0, nTotalBarro    = 0, nTotalArbol    = 0, nTotalPozo     = 0;
                    var nTotalAegypti  = 0, nTotalAlbopic  = 0, nTotalQuinque  = 0, nTotalNigrip   = 0, nTotalCoronat  = 0, nTotalErratico = 0, nTotalTarsalis = 0, nTotalFatigans = 0, nTotalAlbim    = 0, nTotalTotalDist=0;

                    var len = response.length;
                    for ( var i = 0; i < len; i++) {

                        //var nTotalIndice = response[i][0].pilaInfestado + response[i][0].llantaInfestado + response[i][0].barrilInfestado + response[i][0].floreroInfestado + response[i][0].bebederoInfestado + response[i][0].artEspecialInfes +
                        //    response[i][0].otrosDepositosInfes + response[i][0].cisterInfestado + response[i][0].inodoroInfestado + response[i][0].barroInfestado  +response[i][0].plantaInfestado + response[i][0].arbolInfestado +response[i][0].pozoInfestado;

                        /*nTotalTotalIndice = nTotalTotalIndice + nTotalIndice;
                        nTotalPilas    =    nTotalPilas    + response[i][0].pilaInfestado;
                        nTotalLlanta   =    nTotalLlanta   + response[i][0].llantaInfestado ;
                        nTotalBarril   =    nTotalBarril   + response[i][0].barrilInfestado ;
                        nTotalFlorero  =    nTotalFlorero  + response[i][0].floreroInfestado ;
                        nTotalBebedero =    nTotalBebedero + response[i][0].bebederoInfestado ;
                        nTotalArtEspec =    nTotalArtEspec + response[i][0].artEspecialInfes;
                        nTotalODep     =    nTotalODep     + response[i][0].otrosDepositosInfes;
                        nTotalCister   =    nTotalCister   + response[i][0].cisterInfestado ;
                        nTotalInodo    =    nTotalInodo    + response[i][0].inodoroInfestado;
                        nTotalBarro    =    nTotalBarro    + response[i][0].barroInfestado ;
                        nTotalPlanta   =    nTotalPlanta   + response[i][0].plantaInfestado;
                        nTotalArbol    =    nTotalArbol    + response[i][0].arbolInfestado;
                        nTotalPozo     =    nTotalPozo     + response[i][0].pozoInfestado;*/
                        nTotalAegypti  =    nTotalAegypti  + response[i][0].especieAegypti;
                        nTotalAlbopic  =    nTotalAlbopic  + response[i][0].especieAlbopic;
                        nTotalQuinque  =    nTotalQuinque  + response[i][0].especieCulexQuinque;
                        nTotalNigrip   =    nTotalNigrip   + response[i][0].especieCulexNigrip  ;
                        nTotalCoronat  =    nTotalCoronat  + response[i][0].especieCulexCoronat ;
                        nTotalErratico =    nTotalErratico + response[i][0].especieCulexErratico;
                        nTotalTarsalis =    nTotalTarsalis + response[i][0].especieCulexTarsalis;
                        nTotalFatigans =    nTotalFatigans + response[i][0].especieCulexFatigans;
                        nTotalAlbim    =    nTotalAlbim    + response[i][0].especieCulexAlbim;
                        var nTotalDistribucion = response[i][0].especieAegypti  +
                            response[i][0].especieAlbopic +
                            response[i][0].especieCulexQuinque +
                            response[i][0].especieCulexNigrip  +
                            response[i][0].especieCulexCoronat +
                            response[i][0].especieCulexErratico+
                            response[i][0].especieCulexTarsalis+
                            response[i][0].especieCulexFatigans+
                            response[i][0].especieCulexAlbim;
                        nTotalTotalDist = nTotalTotalDist + nTotalDistribucion;

                        //table1.fnAddData(
                        //    [i+1, response[i][0].localidad, response[i][0].pilaInfestado, response[i][0].llantaInfestado, response[i][0].barrilInfestado, response[i][0].floreroInfestado, response[i][0].bebederoInfestado, response[i][0].artEspecialInfes, response[i][0].otrosDepositosInfes, response[i][0].cisterInfestado, response[i][0].inodoroInfestado, response[i][0].barroInfestado, response[i][0].plantaInfestado, response[i][0].arbolInfestado, response[i][0].pozoInfestado, nTotalIndice, '<a data-toggle="modal" class="btn btn-default btn-xs editDetalle" data-id='+response[i][0].detaEncuestaId+'><i class="fa fa-edit fa-fw"></i></a>']);

                        table2.fnAddData(
                            [i+1, response[i][0].localidad, response[i][0].especieAegypti , response[i][0].especieAlbopic, response[i][0].especieCulexQuinque, response[i][0].especieCulexNigrip, response[i][0].especieCulexCoronat, response[i][0].especieCulexErratico, response[i][0].especieCulexTarsalis, response[i][0].especieCulexFatigans, response[i][0].especieCulexAlbim, nTotalDistribucion,'<a data-toggle="modal" class="btn btn-default btn-xs editDetalle" data-id='+response[i][0].detaEncuestaId+'><i class="fa fa-edit fa-fw"></i></a>']);
                    }

                    /*nIndicePilas = parseFloat((nTotalPilas / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceLlanta = parseFloat((nTotalLlanta / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceBarril = parseFloat((nTotalBarril / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceFlorero = parseFloat((nTotalFlorero / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceBebedero = parseFloat((nTotalBebedero / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceArtEspec = parseFloat((nTotalArtEspec / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceODep = parseFloat((nTotalODep / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceCister = parseFloat((nTotalCister / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceInodo = parseFloat((nTotalInodo / nTotalTotalIndice)*100).toFixed(1);
                    nIndicePlanta = parseFloat((nTotalPlanta / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceBarro = parseFloat((nTotalBarro / nTotalTotalIndice)*100).toFixed(1);
                    nIndiceArbol = parseFloat((nTotalArbol / nTotalTotalIndice)*100).toFixed(1);
                    nIndicePozo = parseFloat((nTotalPozo / nTotalTotalIndice)*100).toFixed(1);*/
                    if (nTotalTotalDist > 0){
                        nIndiceAegypti = parseFloat((nTotalAegypti / nTotalTotalDist)*100).toFixed(1);
                        nIndiceAlbopic = parseFloat((nTotalAlbopic / nTotalTotalDist)*100).toFixed(1);
                        nIndiceQuinque = parseFloat((nTotalQuinque / nTotalTotalDist)*100).toFixed(1);
                        nIndiceNigrip = parseFloat((nTotalNigrip / nTotalTotalDist)*100).toFixed(1);
                        nIndiceCoronat = parseFloat((nTotalCoronat / nTotalTotalDist)*100).toFixed(1);
                        nIndiceErratico = parseFloat((nTotalErratico / nTotalTotalDist)*100).toFixed(1);
                        nIndiceTarsalis = parseFloat((nTotalTarsalis / nTotalTotalDist)*100).toFixed(1);
                        nIndiceFatigans = parseFloat((nTotalFatigans / nTotalTotalDist)*100).toFixed(1);
                        nIndiceAlbim = parseFloat((nTotalAlbim / nTotalTotalDist)*100).toFixed(1);
                    }else{
                        nIndiceAegypti = 0;
                        nIndiceAlbopic = 0;
                        nIndiceQuinque = 0;
                        nIndiceNigrip = 0;
                        nIndiceCoronat = 0;
                        nIndiceErratico = 0;
                        nIndiceTarsalis = 0;
                        nIndiceFatigans = 0;
                        nIndiceAlbim = 0;
                    }
                    /*$("#indicePila").text(nIndicePilas);
                    $("#indiceLlanta").text(nIndiceLlanta);
                    $("#indiceBarril").text(nIndiceBarril);
                    $("#indiceFloreros").text(nIndiceFlorero);
                    $("#indiceBeberedos").text(nIndiceBebedero);
                    $("#indiceArtEspec").text(nIndiceArtEspec);
                    $("#indiceODep").text(nIndiceODep);
                    $("#indiceCister").text(nIndiceCister);
                    $("#indiceInodo").text(nIndiceInodo);
                    $("#indiceBarro").text(nIndiceBarro);
                    $("#indicePlanta").text(nIndicePlanta);
                    $("#indiceArbol").text(nIndiceArbol);
                    $("#indicePozo").text(nIndicePozo);*/

                    $("#indiceAegypti").text(nIndiceAegypti  );
                    $("#indiceAlbopic").text(nIndiceAlbopic  );
                    $("#indiceQuinque").text(nIndiceQuinque  );
                    $("#indiceNigrip").text( nIndiceNigrip  );
                    $("#indiceCoronat").text(nIndiceCoronat  );
                    $("#indiceErratico").text(nIndiceErratico );
                    $("#indiceTarsalis").text(nIndiceTarsalis );
                    $("#indiceFatigans").text(nIndiceFatigans );
                    $("#indiceAnophAlbim").text(nIndiceAlbim    );

                    /*$("#totalPila").text(nTotalPilas);
                    $("#totalLlanta").text(nTotalLlanta);
                    $("#totalBarril").text(nTotalBarril);
                    $("#totalFloreros").text(nTotalFlorero);
                    $("#totalBeberedos").text(nTotalBebedero);
                    $("#totalArtEspec").text(nTotalArtEspec);
                    $("#totalODep").text(nTotalODep);
                    $("#totalCister").text(nTotalCister);
                    $("#totalInodo").text(nTotalInodo);
                    $("#totalBarro").text(nTotalBarro);
                    $("#totalPlanta").text(nTotalPlanta);
                    $("#totalArbol").text(nTotalArbol);
                    $("#totalPozo").text(nTotalPozo);
                    $("#totalTotalI").text(nTotalTotalIndice);*/

                    $("#totalAegypti").text(nTotalAegypti  );
                    $("#totalAlbopic").text(nTotalAlbopic  );
                    $("#totalQuinque").text(nTotalQuinque  );
                    $("#totalNigrip").text( nTotalNigrip  );
                    $("#totalCoronat").text(nTotalCoronat  );
                    $("#totalErratico").text(nTotalErratico );
                    $("#totalTarsalis").text(nTotalTarsalis );
                    $("#totalFatigans").text(nTotalFatigans );
                    $("#totalAnophAlbim").text(nTotalAlbim    );
                    $("#totalTotalD").text(nTotalTotalDist);

                    $(".editDetalle").on('click', function(){
                        limpiarCamposDetalle();
                        $('#idDetalleEditar').val($(this).data('id'));
                        getInfoModalDetail($(this).data('id'));
                        mostrarModalDetalle();
                    });

                    //al paginar se define nuevamente la funci�n de cargar el detalle//asi funcionaba bien antes.
                    $(".pagination").click(function() {
                        $(".editDetalle").on('click', function () {
                            limpiarCamposDetalle();
                            $('#idDetalleEditar').val($(this).data('id'));
                            getInfoModalDetail($(this).data('id'));
                            mostrarModalDetalle();
                        });
                    });

                    //al paginar se define nuevamente la funci�n de cargar el detalle
                    $(".dataTables_paginate").on('click', function() {
                        $(".editDetalle").on('click', function () {
                            limpiarCamposDetalle();
                            $('#idDetalleEditar').val($(this).data('id'));
                            getInfoModalDetail($(this).data('id'));
                            mostrarModalDetalle();
                        });
                    });
                })
                    .fail(function() {
                        alert( "error" );

                    });
            }

            function getInfoModalDetail(idDetalleEditar){
                $.ajax({
                    type: "GET",
                    url:  parametros.sRecuperarDetalleUrl,
                    data: {idDetalleEncu: idDetalleEditar},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        blockUI();
                        $("#codigoSector").val(response.codSector).change();
                        $("#codLocalidadEdicion").val(response.codLocalidad);
                        /*$("#txtPila").val(response.pilaInfestado);
                        $("#txtLlanta").val(response.llantaInfestado);
                        $("#txtBarril").val(response.barrilInfestado);
                        $("#txtFlorero").val(response.floreroInfestado);
                        $("#txtBebedero").val(response.bebederoInfestado);
                        $("#txtArt_Esp").val(response.artEspecialInfes);
                        $("#txtO_Dep").val(response.otrosDepositosInfes);
                        $("#txtCister").val(response.cisterInfestado);
                        $("#txtInodoro").val(response.inodoroInfestado);
                        $("#txtBarro").val(response.barroInfestado);
                        $("#txtPlanta").val(response.plantaInfestado);
                        $("#txtArbol").val(response.arbolInfestado);
                        $("#txtPozo").val(response.pozoInfestado);*/
                        $("#txtAedesAegyti").val(response.especieAegypti);
                        $("#txtAedesAlbopic").val(response.especieAlbopic);
                        $("#txtCulexQuinque").val(response.especieCulexQuinque);
                        $("#txtCulexNigrip").val(response.especieCulexNigrip);
                        $("#txtCulexCoronat").val(response.especieCulexCoronat);
                        $("#txtCulexErratico").val(response.especieCulexErratico);
                        $("#txtCulexTarsalis").val(response.especieCulexTarsalis);
                        $("#txtCulexFatigans").val(response.especieCulexFatigans);
                        $("#txtAnophAlbim").val(response.especieCulexAlbim);
                        setTimeout(function(){unBlockUI();$("#codigoLocalidad").val($("#codLocalidadEdicion").val()).change();},500);

                    },
                    error: function (result) {

                    }
                });
            }

            //Se cargan las tablas de detalle
            getSurveyDetails($("#idMaestroEditado").val());

            $("#mensaje").hide();

            //mostrar modal detalle encuesta
            $("#openModal").click(function(){
                limpiarCamposDetalle();
                mostrarModalDetalle();

            });

            $("#btnActualizarMae").click(function(){
                var $valid = $("#frmPrincipal").valid();
                if (!$valid) {
                    $formPrincipal.focusInvalid();
                    return false;
                }else {
                    updateSurvey();
                }
            });

            <!-- al seleccionar municipio -->
  /*          $('#codMunicipioEncu').change(function(){
                $('#codUnidadSalud').val('').change();
                $('#codigoDistrito').val('').change();
                $('#codigoArea').val('').change();
                if ($(this).val().length > 0) {

                    $.getJSON(parametros.sUnidadesUrl, {
                        codMunicipio: $(this).val(),
                        codSilais:$('#codSilais option:selected').val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codUnidadSalud').html(html);
                    });
                    $.getJSON(parametros.sSectoresUrl, {
                        codMunicipio: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codigoSector').html(html);
                    });
                    $.getJSON(parametros.sDistritosUrl, {
                        codMunicipio: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].valor
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codigoDistrito').html(html);
                    });
                    $.getJSON(parametros.sAreasUrl, {
                        codMunicipio: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].valor
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codigoArea').html(html);
                    })
                }
            });

            <!-- al seleccionar sector-->
            $('#codigoSector').change(function(){
                $('#codigoLocalidad').val('').change();
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sComunidadesUrl, {
                        codSector: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            //html += '</option>';
                        }
                        $('#codigoLocalidad').html(html);
                        console.log("terminsa sector");
                    });
                }
            });

            <!-- al seleccionar SILAIS -->
            $('#codSilais').change(function(){
                $('#codMunicipioEncu').val('').change();
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sMunicipiosUrl, {
                        idSilais: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigoNacional + '">'
                                + data[i].nombre
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codMunicipioEncu').html(html);
                    });
                }
            });
*/
            <!-- al seleccionar localidad -->
            $('#codigoLocalidad').click(function() {
                if ($(this).val() != $("#codLocalidadEdicion").val() && ($(this).val().length > 0 )){
                    var encuestaObj = {};
                    encuestaObj['idLocalidad'] = $(this).val();
                    encuestaObj['idMaestroEncuesta'] = $("#idMaestroEditado").val();
                    $.getJSON(parametros.sValidarLocalidadUrl, {
                        datosEncuesta: JSON.stringify(encuestaObj),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        if (len > 0) {
                            $.smallBox({
                                title: $("#msg_location_exist").val(),
                                content: $("#smallBox_content").val(),
                                color: "#C46A69",
                                iconSmall: "fa fa-warning",
                                timeout: 4000
                            });
                        }/* else {
                            ocultarMensajePop();
                        }*/
                    })
                }/*else{
                    setTimeout(function () {
                        ocultarMensajePop()
                    }, 2000);
                }*/
            });

            var $formPrincipal = $("#frmPrincipal").validate({
                rules: {
                    codSilais: {
                        required: true
                    },
                    codMunicipioEncu: {
                        required: true
                    },
                    codUnidadSalud: {
                        required: true
                    },
                    fecInicioEncuesta: {
                        required: true/*,
                        dpDate: true,
                        dpCompareDate: ['before', '#fecFinEncuesta', 'notAfter', parametros.dFechahoy ]*/
                    },
                    codOrdinal: {
                        required: true
                    },
                    codProcedencia: {
                        required: true
                    },
                    semanaEpi: {
                        digits: true,
                        maxlength: 2
                    },
                    mesEpi: {
                        digits: true,
                        maxlength: 2
                    },
                    anioEpi: {
                        digits: true,
                        maxlength: 4
                    }
                },
                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());

                }
            });

            var $formDetalleEncuesta = $("#frmDetalleEncuesta").validate({
                rules: {
                    codigoLocalidad:{
                        required: true
                    },
                    txtAedesAegyti: {
                        required: true,
                        digits: true
                    },
                    txtAedesAlbopic: {
                        required: true,
                        digits: true
                    },
                    txtCulexQuinque: {
                        required: true,
                        digits: true
                    },
                    txtCulexNigrip: {
                        required: true,
                        digits: true
                    },
                    txtCulexCoronat: {
                        required: true,
                        digits: true
                    },
                    txtCulexErratico: {
                        required: true,
                        digits: true
                    },
                    txtCulexTarsalis: {
                        required: true,
                        digits: true
                    },
                    txtCulexFatigans: {
                        required: true,
                        digits: true
                    },
                    txtAnophAlbim: {
                        required: true,
                        digits: true
                    }
                },
                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());

                },
                submitHandler: function (form) {
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                    saveSurvey();
                }
            });

            $('#fecFinEncuesta').change(function () {
                var fecha = $('#fecFinEncuesta').val();
                var arr = fecha.split('/');
                $('#mesEpi').val(arr[1]);
                $('#anioEpi').val(arr[2]);
                $.ajax({
                    type: "GET",
                    url: parametros.sSemanaEpiUrl,
                    data: {fechaValidar: fecha},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        $('#semanaEpi').val(response.noSemana);
                    },
                    error: function (result) {
                        $('#semanaEpi').val("");
                    }
                });
            });

            function limpiarCamposMaestro(){
                $('#codSilais').val('').change();
                $('#codUnidadSalud').val('').change();
                $('#codMunicipioEncu').val('').change();
                $('#codigoDistrito').val('').change();
                $('#codigoArea').val('').change();
                $('#codProcedencia').val('').change();
                $('#codOrdinal').val('').change();
                $('#mesEpi').val('');
                $("#anioEpi").val('');
                $("#semanaEpi").val('');
                $("#fecInicioEncuesta").val('');
                $("#fecFinEncuesta").val('');
                $("#idMaestroAgregado").val('');
            }

            function limpiarCamposDetalle(){
                $("#idDetalleEditar").val('');
                $('#codigoLocalidad option:first').prop("selected", true).change();
                $("#codLocalidadEdicion").val('');
                /*$("#txtPila").val('');
                $("#txtLlanta").val('');
                $("#txtBarril").val('');
                $("#txtFlorero").val('');
                $("#txtBebedero").val('');
                $("#txtArt_Esp").val('');
                $("#txtO_Dep").val('');
                $("#txtCister").val('');
                $("#txtInodoro").val('');
                $("#txtBarro").val('');
                $("#txtPlanta").val('');
                $("#txtArbol").val('');
                $("#txtPozo").val('');*/
                $("#txtAedesAegyti").val('');
                $("#txtAedesAlbopic").val('');
                $("#txtCulexQuinque").val('');
                $("#txtCulexNigrip").val('');
                $("#txtCulexCoronat").val('');
                $("#txtCulexErratico").val('');
                $("#txtCulexTarsalis").val('');
                $("#txtCulexFatigans").val('');
                $("#txtAnophAlbim").val('');
            }

            function limpiarTablasDetalle(){
                //table1.fnClearTable();
                table2.fnClearTable();
                /*$("#indicePila").text('0');
                $("#indiceLlanta").text('0');
                $("#indiceBarril").text('0');
                $("#indiceFloreros").text('0');
                $("#indiceBeberedos").text('0');
                $("#indiceArtEspec").text('0');
                $("#indiceODep").text('0');
                $("#indiceCister").text('0');
                $("#indiceInodo").text('0');
                $("#indiceBarro").text('0');
                $("#indicePlanta").text('0');
                $("#indiceArbol").text('0');
                $("#indicePozo").text('0');*/

                $("#indiceAegypti").text('0');
                $("#indiceAlbopic").text('0');
                $("#indiceQuinque").text('0');
                $("#indiceNigrip").text('0');
                $("#indiceCoronat").text('0');
                $("#indiceErratico").text('0');
                $("#indiceTarsalis").text('0');
                $("#indiceFatigans").text('0');
                $("#indiceAnophAlbim").text('0');

                /*$("#totalPila").text('0');
                $("#totalLlanta").text('0');
                $("#totalBarril").text('0');
                $("#totalFloreros").text('0');
                $("#totalBeberedos").text('0');
                $("#totalArtEspec").text('0');
                $("#totalODep").text('0');
                $("#totalCister").text('0');
                $("#totalInodo").text('0');
                $("#totalBarro").text('0');
                $("#totalPlanta").text('0');
                $("#totalArbol").text('0');
                $("#totalPozo").text('0');
                $("#totalTotalI").text('0');*/

                $("#totalAegypti").text('0');
                $("#totalAlbopic").text('0');
                $("#totalQuinque").text('0');
                $("#totalNigrip").text('0');
                $("#totalCoronat").text('0');
                $("#totalErratico").text('0');
                $("#totalTarsalis").text('0');
                $("#totalFatigans").text('0');
                $("#totalAnophAlbim").text('0');
                $("#totalTotalD").text('0');

            }

            $("#btnNuevoRegistro").click(function(){
                limpiarCamposMaestro();
                limpiarTablasDetalle();
            });

            function mostrarMensajePop(msgHtml){
                $("#mensaje").html(msgHtml).show().focus();
            }

            function ocultarMensajePop() {
                $("#mensaje").hide("slow");
            }

            function mostrarMensaje(msgHtml){
                $("#msjMaestro").html(msgHtml).show().focus();
            }

            function ocultarMensaje() {
                $("#msjMaestro").hide("slow");
            }

            function ocultarModalDetalle(){
                $('#myModal').modal('hide');
            }

            function mostrarModalDetalle(){
                var $valid = $("#frmPrincipal").valid();
                if (!$valid) {
                    $formPrincipal.focusInvalid();
                    return false;
                }else {
                    $("#myModal").modal({
                        show: true
                    });
                }
            }
        }
    };

}();

var EditDepositoSurvey = function(){

    return {
        //main function to initiate the module
        init: function (parametros){
            $(document).on('keypress','form input',function(event)
            {
                event.stopImmediatePropagation();
                if( event.which == 13 )
                {
                    event.preventDefault();
                    var $input = $('form input');
                    if( $(this).is( $input.last() ) )
                    {
                        //Time to submit the form!!!!
                        //alert( 'Hooray .....' );
                    }
                    else
                    {
                        $input.eq( $input.index(this) + 1 ).focus();
                    }
                }
            });

            var responsiveHelper_dt_basic = undefined;
            var breakpointDefinition = {
                tablet : 1024,
                phone : 480
            };
            var table1 = $('#dtDetalleDepositos').dataTable({
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>"+
                    "t"+
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
                "autoWidth" : true,
                "aoColumns" : [
                    {sClass: "aw-center" },null,{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },{sClass: "aw-right" },null,null,null,{sClass: "aw-edit" }
                ],
                "preDrawCallback" : function() {
                    // Initialize the responsive datatables helper once.
                    if (!responsiveHelper_dt_basic) {
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dtDetalleDepositos'), breakpointDefinition);
                    }
                },
                "rowCallback" : function(nRow) {
                    responsiveHelper_dt_basic.createExpandIcon(nRow);
                },
                "drawCallback" : function(oSettings) {
                    responsiveHelper_dt_basic.respond();
                }
            });

            function blockUI(){
                var loc = window.location;
                var pathName = loc.pathname.substring(0,loc.pathname.indexOf('/', 1)+1);
                //var mess = $("#blockUI_message").val()+' <img src=' + pathName + 'resources/img/loading.gif>';
                var mess = '<img src=' + pathName + 'resources/img/ajax-loading.gif> ' + $("#blockUI_message").val();
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
                    baseZ: 1051});
            }

            function unBlockUI() {
                setTimeout($.unblockUI, 500);
            }

            function saveSurvey(){
                var maestro = {
                    encuestaId: $("#idMaestroEditado").val(), // se pasa el id del maestro que se esta trabajando, la primera vez es null
                    codSilais: $('#codSilais option:selected').val(),
                    codMunicipio: $('#codMunicipioEncu option:selected').val(),
                    codDistrito: $('#codigoDistrito option:selected').val(),
                    codArea: $('#codigoArea option:selected').val(),
                    codUnidadSalud: $('#codUnidadSalud option:selected').val(),
                    codProcedencia: $('#codProcedencia option:selected').val(),
                    feInicioEncuesta: $('#fecInicioEncuesta').val(),
                    feFinEncuesta: $('#fecFinEncuesta').val(),
                    codOrdinalEncu: $('#codOrdinal option:selected').val(),
                    codModeloEncu: 1,
                    semanaEpi: $('#semanaEpi').val(),
                    mesEpi: $('#mesEpi').val(),
                    anioEpi: $('#anioEpi').val(),
                    usuarioRegistroId: 1
                };
                var detalle = {
                    detaEncuestaId: $("#idDetalleEditar").val(),
                    codLocalidad: $('#codigoLocalidad option:selected').val(),
                    pilaInfestado: $('#txtPila').val(),
                    llantaInfestado: $('#txtLlanta').val(),
                    barrilInfestado: $('#txtBarril').val(),
                    floreroInfestado: $('#txtFlorero').val(),
                    bebederoInfestado: $('#txtBebedero').val(),
                    artEspecialInfes: $('#txtArt_Esp').val(),
                    otrosDepositosInfes: $('#txtO_Dep').val(),
                    cisterInfestado: $('#txtCister').val(),
                    inodoroInfestado: $('#txtInodoro').val(),
                    barroInfestado: $('#txtBarro').val(),
                    plantaInfestado: $('#txtPlanta').val(),
                    arbolInfestado: $('#txtArbol').val(),
                    pozoInfestado: $('#txtPozo').val(),
                    manzana: $('#txtManzanas').val(),
                    vivienda: $('#txtViviendas').val(),
                    nombre: $('#txtNombre').val(),
                    decripOtroDeposito: $('#txtDescOdep').val(),
                    decripcionCister: $('#txtDescCister').val(),
                    usuarioRegistroId: 1
                };

                var esEdicion = ($("#idDetalleEditar").val()!=null && $("#idDetalleEditar").val().trim().length > 0);
                var encuestaObj = {};
                encuestaObj['idMaestro'] = $("#idMaestroEditado").val();
                encuestaObj['mensaje'] = '';
                encuestaObj['maestro'] = maestro;
                encuestaObj['detalle'] = detalle;
                blockUI();
                $.ajax(
                    {
                        url: parametros.sEditDeposUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(encuestaObj),
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.mensaje.length > 0){
                                $.smallBox({
                                    title: data.mensaje ,
                                    content: $("#smallBox_content").val(),
                                    color: "#C46A69",
                                    iconSmall: "fa fa-warning",
                                    timeout: 4000
                                });
                            }else {
                                var msg;
                                getSurveyDetails(data.idMaestro);
                                limpiarCamposDetalle();
                                if (esEdicion) {
                                    msg = $("#msg_location_updated").val();
                                    setTimeout(function () {
                                        ocultarModalDetalle()
                                    }, 600);
                                }else{
                                    msg = $("#msg_location_added").val();
                                }
                                $.smallBox({
                                    title: msg,
                                    content: $("#smallBox_content").val(),
                                    color: "#739E73",
                                    iconSmall: "fa fa-success",
                                    timeout: 4000
                                });
                            }
                            unBlockUI();
                        },
                        error: function (data, status, er) {
                            unBlockUI();
                            alert("error: " + data + " status: " + status + " er:" + er);
                        }
                    }
                )
            }

            function updateSurvey(){
                var maestro = {
                    encuestaId: $("#idMaestroEditado").val(), // se pasa el id del maestro que se esta editando,
                    codSilais: $('#codSilais option:selected').val(),
                    codMunicipio: $('#codMunicipioEncu option:selected').val(),
                    codDistrito: $('#codigoDistrito option:selected').val(),
                    codArea: $('#codigoArea option:selected').val(),
                    codUnidadSalud: $('#codUnidadSalud option:selected').val(),
                    codProcedencia: $('#codProcedencia option:selected').val(),
                    feInicioEncuesta: $('#fecInicioEncuesta').val(),
                    feFinEncuesta: $('#fecFinEncuesta').val(),
                    codOrdinalEncu: $('#codOrdinal option:selected').val(),
                    semanaEpi: $('#semanaEpi').val(),
                    mesEpi: $('#mesEpi').val(),
                    anioEpi: $('#anioEpi').val(),
                    usuarioRegistroId: 1
                };
                var encuestaObj = {};
                encuestaObj['mensaje'] = '';
                encuestaObj['maestro'] = maestro;
                blockUI();
                $.ajax(
                    {
                        url: parametros.sEditMaestroUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(encuestaObj),
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.mensaje.length > 0){
                                $.smallBox({
                                    title: data.mensaje ,
                                    content: $("#smallBox_content").val(),
                                    color: "#C46A69",
                                    iconSmall: "fa fa-warning",
                                    timeout: 4000
                                });
                            }else{
                                $.smallBox({
                                    title: $("#msg_header_updated").val() ,
                                    content: $("#smallBox_content").val(),
                                    color: "#739E73",
                                    iconSmall: "fa fa-success",
                                    timeout: 4000
                                });
                            }
                            unBlockUI();
                        },
                        error: function (data, status, er) {
                            unBlockUI();
                            alert("error: " + data + " status: " + status + " er:" + er);
                        }
                    }
                )
            }

            function getSurveyDetails(idMaestro){
                $.getJSON(parametros.sSurveyDetailsUrl, {
                    idMaestroEncuesta: idMaestro, edicion:1,
                    ajax : 'true'
                }, function(response) {
                    table1.fnClearTable();

                    var nIndicePilas, nIndiceLlanta, nIndiceBarril, nIndiceFlorero,nIndiceBebedero, nIndiceArtEspec, nIndiceODep, nIndiceCister, nIndiceInodo;
                    var nIndicePlanta   = 0, nIndiceBarro    = 0, nIndiceArbol    = 0,nIndicePozo     = 0, nTotalPilas    = 0, nTotalLlanta   = 0, nTotalBarril   = 0, nTotalFlorero  = 0, nTotalBebedero = 0;
                    var nTotalArtEspec = 0, nTotalODep     = 0, nTotalCister   = 0, nTotalInodo    = 0, nTotalPlanta   = 0, nTotalBarro    = 0, nTotalArbol    = 0, nTotalPozo     = 0, nTotalTotalIndice = 0;

                    var len = response.length;
                    for (var i = 0; i < len; i++) {
                        var nTotalIndice = response[i][0].pilaInfestado + response[i][0].llantaInfestado + response[i][0].barrilInfestado + response[i][0].floreroInfestado + response[i][0].bebederoInfestado + response[i][0].artEspecialInfes +
                            response[i][0].otrosDepositosInfes + response[i][0].cisterInfestado + response[i][0].inodoroInfestado + response[i][0].barroInfestado  +response[i][0].plantaInfestado + response[i][0].arbolInfestado +response[i][0].pozoInfestado;
                        nTotalTotalIndice = nTotalTotalIndice + nTotalIndice;
                        nTotalPilas    =    nTotalPilas    + response[i][0].pilaInfestado;
                        nTotalLlanta   =    nTotalLlanta   + response[i][0].llantaInfestado ;
                        nTotalBarril   =    nTotalBarril   + response[i][0].barrilInfestado ;
                        nTotalFlorero  =    nTotalFlorero  + response[i][0].floreroInfestado ;
                        nTotalBebedero =    nTotalBebedero + response[i][0].bebederoInfestado ;
                        nTotalArtEspec =    nTotalArtEspec + response[i][0].artEspecialInfes;
                        nTotalODep     =    nTotalODep     + response[i][0].otrosDepositosInfes;
                        nTotalCister   =    nTotalCister   + response[i][0].cisterInfestado ;
                        nTotalInodo    =    nTotalInodo    + response[i][0].inodoroInfestado;
                        nTotalBarro    =    nTotalBarro    + response[i][0].barroInfestado ;
                        nTotalPlanta   =    nTotalPlanta   + response[i][0].plantaInfestado;
                        nTotalArbol    =    nTotalArbol    + response[i][0].arbolInfestado;
                        nTotalPozo     =    nTotalPozo     + response[i][0].pozoInfestado;

                        table1.fnAddData(
                            [i+1, response[i][0].localidad, response[i][0].manzana, response[i][0].vivienda, response[i][0].pilaInfestado, response[i][0].llantaInfestado, response[i][0].barrilInfestado, response[i][0].floreroInfestado, response[i][0].bebederoInfestado, response[i][0].artEspecialInfes, response[i][0].otrosDepositosInfes, response[i][0].cisterInfestado, response[i][0].inodoroInfestado, response[i][0].barroInfestado, response[i][0].plantaInfestado, response[i][0].arbolInfestado, response[i][0].pozoInfestado, nTotalIndice, response[i][0].nombre , response[i][0].decripOtroDeposito, response[i][0].decripcionCister,
                                    '<a data-toggle="modal" class="btn btn-default btn-xs editDetalle" data-id='+response[i][0].detaEncuestaId+'><i class="fa fa-edit fa-fw"></i></a>']);

                    }
                    if (nTotalTotalIndice > 0) {
                        nIndicePilas = parseFloat((nTotalPilas / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceLlanta = parseFloat((nTotalLlanta / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceBarril = parseFloat((nTotalBarril / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceFlorero = parseFloat((nTotalFlorero / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceBebedero = parseFloat((nTotalBebedero / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceArtEspec = parseFloat((nTotalArtEspec / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceODep = parseFloat((nTotalODep / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceCister = parseFloat((nTotalCister / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceInodo = parseFloat((nTotalInodo / nTotalTotalIndice) * 100).toFixed(1);
                        nIndicePlanta = parseFloat((nTotalPlanta / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceBarro = parseFloat((nTotalBarro / nTotalTotalIndice) * 100).toFixed(1);
                        nIndiceArbol = parseFloat((nTotalArbol / nTotalTotalIndice) * 100).toFixed(1);
                        nIndicePozo = parseFloat((nTotalPozo / nTotalTotalIndice) * 100).toFixed(1);
                    }else{
                        nIndicePilas = 0;
                        nIndiceLlanta = 0;
                        nIndiceBarril = 0;
                        nIndiceFlorero = 0;
                        nIndiceBebedero = 0;
                        nIndiceArtEspec = 0;
                        nIndiceODep = 0;
                        nIndiceCister = 0;
                        nIndiceInodo = 0;
                        nIndicePlanta = 0;
                        nIndiceBarro = 0;
                        nIndiceArbol = 0;
                        nIndicePozo = 0;
                    }
                    $(".editDetalle").on("click", function(){
                        limpiarCamposDetalle();
                        $('#idDetalleEditar').val($(this).data('id'));
                        getInfoModalDetail($(this).data('id'));
                        mostrarModalDetalle();
                    });

                                        //al paginar se define nuevamente la funci�n de cargar el detalle//asi funcionaba bien antes.
                    $(".pagination").click(function() {
                        $(".editDetalle").on('click', function () {
                            limpiarCamposDetalle();
                            $('#idDetalleEditar').val($(this).data('id'));
                            getInfoModalDetail($(this).data('id'));
                            mostrarModalDetalle();
                        });
                    });

                    //al paginar se define nuevamente la funci�n de cargar el detalle
                    $(".dataTables_paginate").on('click', function() {
                        $(".editDetalle").on('click', function () {
                            limpiarCamposDetalle();
                            $('#idDetalleEditar').val($(this).data('id'));
                            getInfoModalDetail($(this).data('id'));
                            mostrarModalDetalle();
                        });
                    });


                    $("#indicePila").text(nIndicePilas);
                    $("#indiceLlanta").text(nIndiceLlanta);
                    $("#indiceBarril").text(nIndiceBarril);
                    $("#indiceFloreros").text(nIndiceFlorero);
                    $("#indiceBeberedos").text(nIndiceBebedero);
                    $("#indiceArtEspec").text(nIndiceArtEspec);
                    $("#indiceODep").text(nIndiceODep);
                    $("#indiceCister").text(nIndiceCister);
                    $("#indiceInodo").text(nIndiceInodo);
                    $("#indiceBarro").text(nIndiceBarro);
                    $("#indicePlanta").text(nIndicePlanta);
                    $("#indiceArbol").text(nIndiceArbol);
                    $("#indicePozo").text(nIndicePozo);

                    $("#totalPila").text(nTotalPilas);
                    $("#totalLlanta").text(nTotalLlanta);
                    $("#totalBarril").text(nTotalBarril);
                    $("#totalFloreros").text(nTotalFlorero);
                    $("#totalBeberedos").text(nTotalBebedero);
                    $("#totalArtEspec").text(nTotalArtEspec);
                    $("#totalODep").text(nTotalODep);
                    $("#totalCister").text(nTotalCister);
                    $("#totalInodo").text(nTotalInodo);
                    $("#totalBarro").text(nTotalBarro);
                    $("#totalPlanta").text(nTotalPlanta);
                    $("#totalArbol").text(nTotalArbol);
                    $("#totalPozo").text(nTotalPozo);
                    $("#totalTotalI").text(nTotalTotalIndice);
                });
            }

            function getInfoModalDetail(idDetalleEditar){
                $.ajax({
                    type: "GET",
                    url: parametros.sRecuperarDetalleUrl,
                    data: {idDetalleEncu: idDetalleEditar},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        blockUI();
                        $("#codigoSector").val(response.codSector).change();
                        $("#codLocalidadEdicion").val(response.codLocalidad);
                        $("#txtPila").val(response.pilaInfestado);
                        $("#txtLlanta").val(response.llantaInfestado);
                        $("#txtBarril").val(response.barrilInfestado);
                        $("#txtFlorero").val(response.floreroInfestado);
                        $("#txtBebedero").val(response.bebederoInfestado);
                        $("#txtArt_Esp").val(response.artEspecialInfes);
                        $("#txtO_Dep").val(response.otrosDepositosInfes);
                        $("#txtCister").val(response.cisterInfestado);
                        $("#txtInodoro").val(response.inodoroInfestado);
                        $("#txtBarro").val(response.barroInfestado);
                        $("#txtPlanta").val(response.plantaInfestado);
                        $("#txtArbol").val(response.arbolInfestado);
                        $("#txtPozo").val(response.pozoInfestado);
                        $("#txtManzanas").val(response.manzana);
                        $("#txtViviendas").val(response.vivienda);
                        $("#txtNombre").val(response.nombre);
                        $("#txtDescOdep").val(response.decripOtroDeposito);
                        $("#txtDescCister").val(response.decripcionCister);
                        setTimeout(function(){unBlockUI();$("#codigoLocalidad").val($("#codLocalidadEdicion").val()).change();},500);
                    },
                    error: function (result) {

                    }
                });
            }

            function limpiarCamposDetalle(){
                $("#idDetalleEditar").val('');
                $("#codLocalidadEdicion").val('');
                $('#codigoLocalidad option:first').prop("selected", true).change();
                $("#txtPila").val('');
                $("#txtLlanta").val('');
                $("#txtBarril").val('');
                $("#txtFlorero").val('');
                $("#txtBebedero").val('');
                $("#txtArt_Esp").val('');
                $("#txtO_Dep").val('');
                $("#txtCister").val('');
                $("#txtInodoro").val('');
                $("#txtBarro").val('');
                $("#txtPlanta").val('');
                $("#txtArbol").val('');
                $("#txtPozo").val('');
                $("#txtManzanas").val('');
                $("#txtViviendas").val('');
                $("#txtNombre").val('');
                $("#txtDescOdep").val('');
                $("#txtDescCister").val('');
            }

            function limpiarCamposMaestro(){
                $('#codSilais').val('').change();
                $('#codUnidadSalud').val('').change();
                $('#codMunicipioEncu').val('').change();
                $('#codigoDistrito').val('').change();
                $('#codigoArea').val('').change();
                $('#codProcedencia').val('').change();
                $('#codOrdinal').val('').change();
                $('#mesEpi').val('');
                $("#anioEpi").val('');
                $("#semanaEpi").val('');
                $("#fecInicioEncuesta").val('');
                $("#fecFinEncuesta").val('');
                $("#idMaestroAgregado").val('');
            }

            function limpiarTablasDetalle(){
                table1.fnClearTable();
                $("#indicePila").text('0');
                $("#indiceLlanta").text('0');
                $("#indiceBarril").text('0');
                $("#indiceFloreros").text('0');
                $("#indiceBeberedos").text('0');
                $("#indiceArtEspec").text('0');
                $("#indiceODep").text('0');
                $("#indiceCister").text('0');
                $("#indiceInodo").text('0');
                $("#indiceBarro").text('0');
                $("#indicePlanta").text('0');
                $("#indiceArbol").text('0');
                $("#indicePozo").text('0');

                $("#totalPila").text('0');
                $("#totalLlanta").text('0');
                $("#totalBarril").text('0');
                $("#totalFloreros").text('0');
                $("#totalBeberedos").text('0');
                $("#totalArtEspec").text('0');
                $("#totalODep").text('0');
                $("#totalCister").text('0');
                $("#totalInodo").text('0');
                $("#totalBarro").text('0');
                $("#totalPlanta").text('0');
                $("#totalArbol").text('0');
                $("#totalPozo").text('0');
                $("#totalTotalI").text('0');

            }

            function ocultarModalDetalle(){
                $('#myModal').modal('hide');
            }

            function mostrarModalDetalle(){
                var $valid = $("#frmPrincipal").valid();
                if (!$valid) {
                    $formPrincipal.focusInvalid();
                    return false;
                }else {
                    $("#myModal").modal({
                        show: true
                    });
                }
            }

            function mostrarMensajePop(msgHtml){
                $("#mensaje").html(msgHtml).show().focus();
            }

            function ocultarMensajePop(){
                $("#mensaje").hide("slow");
            }

            function mostrarMensaje(msgHtml){
                $("#msjMaestro").html(msgHtml).show().focus();
            }

            function ocultarMensaje(){
                $("#msjMaestro").hide("slow");
            }

            var $formPrincipal = $("#frmPrincipal").validate({
                rules: {
                    codSilais: {
                        required: true
                    },
                    codMunicipioEncu: {
                        required: true
                    },
                    codUnidadSalud: {
                        required: true
                    },
                    fecInicioEncuesta: {
                        required: true/*,
                        dpDate: true,
                        dpCompareDate: ['before', '#fecFinEncuesta', 'notAfter', parametros.dFechaHoy ]*/
                    },
                    codOrdinal: {
                        required: true
                    },
                    codProcedencia: {
                        required: true
                    },
                    semanaEpi: {
                        digits: true,
                        maxlength: 2
                    },
                    mesEpi: {
                        digits: true,
                        maxlength: 2
                    },
                    anioEpi: {
                        digits: true,
                        maxlength: 4
                    }
                },
                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());

                }
            });

            var $formDetalleEncuesta = $("#frmDetalleEncuesta").validate({
                rules: {
                    codigoLocalidad:{
                        required: true
                    },
                    txtPila:{
                        required: true,
                        digits: true
                    },
                    txtLlanta:{
                        required: true,
                        digits: true
                    },
                    txtBarril:{
                        required: true,
                        digits: true
                    },
                    txtFlorero:{
                        required: true,
                        digits: true
                    },
                    txtBebedero:{
                        required: true,
                        digits: true
                    },
                    txtArt_Esp:{
                        required: true,
                        digits: true
                    },
                    txtO_Dep:{
                        required: true,
                        digits: true
                    },
                    txtCister:{
                        required: true,
                        digits: true
                    },
                    txtInodoro:{
                        required: true,
                        digits: true
                    },
                    txtBarro: {
                        required: true,
                        digits: true
                    },
                    txtPlanta: {
                        required: true,
                        digits: true
                    },
                    txtArbol: {
                        required: true,
                        digits: true
                    },
                    txtPozo: {
                        required: true,
                        digits: true
                    },
                    txtManzanas: {
                        required: true,
                        digits: true
                    },
                    txtViviendas: {
                        required: true,
                        digits: true
                    }
                },
                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());

                },
                submitHandler: function (form) {
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                    saveSurvey();
                }
            });

            getSurveyDetails($("#idMaestroEditado").val());

            $("#btnNuevoRegistro").click(function(){
                limpiarCamposMaestro();
                limpiarTablasDetalle();
            });

            $("#btnActualizarMae").click(function(){
                var $valid = $("#frmPrincipal").valid();
                if (!$valid) {
                    $formPrincipal.focusInvalid();
                    return false;
                }else {
                    updateSurvey();
                }
            });

            $("#mensaje").hide();

            //mostrar modal detalle encuesta
            $("#openModal").click(function(){
                limpiarCamposDetalle();
                mostrarModalDetalle();
            });
/*
            <!-- al seleccionar municipio -->
            $('#codMunicipioEncu').change(function(){
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sUnidadesUrl, {
                        codMunicipio: $(this).val(),
                        codSilais:$('#codSilais option:selected').val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codUnidadSalud').html(html);
                    });
                    $.getJSON(parametros.sSectoresUrl, {
                        codMunicipio: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codigoSector').html(html);
                    });
                    $.getJSON(parametros.sDistritosUrl, {
                        codMunicipio: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].valor
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codigoDistrito').html(html);
                    });
                    $.getJSON(parametros.sAreasUrl, {
                        codMunicipio: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].valor
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codigoArea').html(html);
                    })
                }else{
                    var html = '<option value="">' + $("#text_opt_select").val() + '...</option>';
                    $('#codUnidadSalud').html(html);
                    $('#codigoSector').html(html);
                    $('#codigoDistrito').html(html);
                    $('#codigoArea').html(html);
                }
                $('#codUnidadSalud').val('').change();
                $('#codigoArea').val('').change();
                $('#codigoDistrito').val('').change();
                $('#codigoSector').val('').change();
            });

            <!-- al seleccionar sector-->
            $('#codigoSector').change(function(){
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sComunidadesUrl, {
                        codSector: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            //html += '</option>';
                        }
                        $('#codigoLocalidad').html(html);
                    });
                }else{
                    var html = '<option value="">' + $("#text_opt_select").val() + '...</option>';
                    $('#codigoLocalidad').html(html);
                }
                $('#codigoLocalidad').val('').change();
            });

            <!-- al seleccionar SILAIS -->
            $('#codSilais').change(function(){
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sMunicipiosUrl, {
                        idSilais: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigoNacional + '">'
                                + data[i].nombre
                                + '</option>';
                            html += '</option>';
                        }
                        $('#codMunicipioEncu').html(html);
                    });
                }else{
                    var html = '<option value="">' + $("#text_opt_select").val() + '...</option>';
                    $('#codMunicipioEncu').html(html);
                }
                $('#codMunicipioEncu').val('').change();
            });*/

            <!-- al seleccionar localidad -->
            $('#codigoLocalidad').click(function() {
                /*
                if ($(this).val() != $("#codLocalidadEdicion").val() && ($(this).val().length > 0 )){

                    var encuestaObj = {};
                    encuestaObj['idLocalidad'] = $(this).val();
                    encuestaObj['idMaestroEncuesta'] = $("#idMaestroEditado").val();
                    //encuestaObj['maestroEncuesta'] = maestro;
                    $.getJSON(parametros.sValidarLocalidadUrl, {
                        datosEncuesta: JSON.stringify(encuestaObj),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        if (len > 0) {
                            html = '<div class="alert alert-block alert-warning"> ' +
                                '<a class="close" data-dismiss="alert" href="#">�</a> ' +
                                '<h4 class="alert-heading"><i class="fa fa-check-square-o"></i> Aviso!</h4>' +
                                '<p> ' + $("#msg_location_exist").val() +
                                '</p> ' +
                                '</div>';
                            mostrarMensajePop(html);
                            setTimeout(function(){$("#codigoLocalidad").val('').change();}, 2000);
                        } else {
                            ocultarMensajePop();
                        }
                    })
                }else {
                    setTimeout(function () {
                        ocultarMensajePop()
                    }, 2000);
                }
                */
            });

            <!-- al ingresar fecha de inicio de encuesta-->
            $('#fecFinEncuesta').change(function () {
                var fecha = $('#fecFinEncuesta').val();
                var arr = fecha.split('/');
                $('#mesEpi').val(arr[1]);
                $('#anioEpi').val(arr[2]);
                $.ajax({
                    type: "GET",
                    url: parametros.sSemanaEpiUrl,
                    data: {fechaValidar: fecha},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        $('#semanaEpi').val(response.noSemana);
                    },
                    error: function (result) {
                        $('#semanaEpi').val("");
                    }
                });
            });

        }
    };
}();