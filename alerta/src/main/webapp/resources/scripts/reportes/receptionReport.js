/**
 * Created by souyen-ics on 04-24-15.
 */


var ReceptionReport = function () {
    return {

        //main function to initiate the module
        init: function (parametros) {

            var codigos = "";


            var responsiveHelper_dt_basic = undefined;
            var breakpointDefinition = {
                tablet: 1024,
                phone: 480
            };


            var table1 = $('#received-samples').dataTable({
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'T>r>" +
                    "t" +
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",

                "oTableTools": {
                    "aButtons": [
                        {
                            "sExtends": "xls",
                            "sTitle": "Reporte de resultados"
                        }
                    ],
                    "sSwfPath": parametros.sTableToolsPath
                },

                "aaSorting": [],

                "autoWidth": true,

                "preDrawCallback": function () {
                    // Initialize the responsive datatables helper once.
                    if (!responsiveHelper_dt_basic) {
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#received-samples'), breakpointDefinition);
                    }
                },
                "rowCallback": function (nRow) {
                    responsiveHelper_dt_basic.createExpandIcon(nRow);
                },
                "drawCallback": function (oSettings) {
                    responsiveHelper_dt_basic.respond();
                }

            });

            <!-- filtro Mx -->
            $('#received-samples-form').validate({
                // Rules for form validation
                rules: {
                    fecInicioRecepcion: {required: function () {
                        return $('#fecInicioRecepcion').val().length > 0;
                    }},
                    fecFinRecepcion: {required: function () {
                        return $('#fecFinRecepcion').val().length > 0;
                    }}
                },
                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                },
                submitHandler: function (form) {
                    table1.fnClearTable();
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                    codigos = "";
                    getMxs(false)
                }
            });

            function blockUI() {
                var loc = window.location;
                var pathName = loc.pathname.substring(0, loc.pathname.indexOf('/', 1) + 1);
                //var mess = $("#blockUI_message").val()+' <img src=' + pathName + 'resources/img/loading.gif>';
                var mess = '<img src=' + pathName + 'resources/img/ajax-loading.gif> ' + parametros.blockMess;
                $.blockUI({ message: mess,
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }});
            }

            function unBlockUI() {
                setTimeout($.unblockUI, 500);
            }

            function getMxs(showAll) {
                var mxFiltros = {};
                if (showAll) {

                    mxFiltros['fechaInicio'] = '';
                    mxFiltros['fechaFin'] = '';
                    mxFiltros['codSilais'] = '';
                    mxFiltros['codUnidadSalud'] = '';
                    mxFiltros['nombreSolicitud'] = '';
                    mxFiltros['finalRes'] = '';

                } else {

                    mxFiltros['fechaInicio'] = $('#fecInicioRecepcion').val();
                    mxFiltros['fechaFin'] = $('#fecFinRecepcion').val();
                    mxFiltros['codSilais'] = $('#codSilais').find('option:selected').val();
                    mxFiltros['codUnidadSalud'] = $('#codUnidadSalud').find('option:selected').val();
                    mxFiltros['nombreSolicitud'] = encodeURI($('#nombreSoli').val());
                    mxFiltros['finalRes'] = $('#finalRes').find('option:selected').val();

                }
                blockUI();
                $.getJSON(parametros.searchUrl, {
                    strFilter: JSON.stringify(mxFiltros),
                    ajax: 'true'
                }, function (dataToLoad) {
                    table1.fnClearTable();
                    var len = Object.keys(dataToLoad).length;

                    if (len > 0) {
                        codigos = "";
                        for (var i = 0; i < len; i++) {

                            //   var actionUrl = parametros.sActionUrl+idLoad;
                            //'<a href='+ actionUrl + ' class="btn btn-default btn-xs"><i class="fa fa-mail-forward"></i></a>'
                            table1.fnAddData(
                                [dataToLoad[i].codigoUnicoMx , dataToLoad[i].tipoMuestra, dataToLoad[i].fechaRecepcion, dataToLoad[i].calidad, dataToLoad[i].codSilais, dataToLoad[i].codUnidadSalud, dataToLoad[i].persona, dataToLoad[i].solicitudes]);

                            if (i + 1 < len) {
                                codigos += dataToLoad[i].codigoUnicoMx + ",";

                            } else {
                                codigos += dataToLoad[i].codigoUnicoMx;

                            }
                        }

                        codigos = reemplazar(codigos, "-", "*");
                    } else {
                        $.smallBox({
                            title: $("#msg_no_results_found").val(),
                            content: $("#smallBox_content").val(),
                            color: "#C79121",
                            iconSmall: "fa fa-warning",
                            timeout: 4000
                        });
                    }
                    unBlockUI();
                })
                    .fail(function (jqXHR) {
                        setTimeout($.unblockUI, 10);
                        validateLogin(jqXHR);
                    });
            }


            $("#all-orders").click(function () {
                codigos = "";
                getMxs(true);
            });

            <!-- al seleccionar SILAIS -->
            $('#codSilais').change(function () {
                blockUI();
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sUnidadesUrl, {
                        codSilais: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            // html += '</option>';
                        }
                        $('#codUnidadSalud').html(html);
                    }).fail(function (jqXHR) {
                        setTimeout($.unblockUI, 10);
                        validateLogin(jqXHR);
                    });
                } else {
                    var html = '<option value="">' + $("#text_opt_select").val() + '...</option>';
                    $('#codUnidadSalud').html(html);
                }
                $('#codUnidadSalud').val('').change();
                unBlockUI();
            });


            function reemplazar(texto, buscar, nuevo) {
                var temp = '';
                var long = texto.length;
                for (j = 0; j < long; j++) {
                    if (texto[j] == buscar) {
                        temp += nuevo;
                    } else
                        temp += texto[j];
                }
                return temp;
            }


            function exportPDF1() {
                blockUI();
                $.ajax(
                    {
                        url: parametros.exportUrl,
                        type: 'GET',
                        dataType: 'text',
                        data: {codes: codigos, fromDate: $('#fecInicioRecepcion').val(), toDate: $('#fecFinRecepcion').val()},
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.length != 0) {
                                var blob = b64toBlob(data, 'application/pdf');
                                var blobUrl = URL.createObjectURL(blob);

                                window.open(blobUrl, '', 'width=600,height=400,left=50,top=50,toolbar=yes');
                            } else {
                                $.smallBox({
                                    title: $("#msg_select").val(),
                                    content: "<i class='fa fa-clock-o'></i> <i>" + $("#smallBox_content").val() + "</i>",
                                    color: "#C46A69",
                                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                                    timeout: 4000
                                });
                            }
                            unBlockUI();
                        },
                        error: function (jqXHR) {
                            unBlockUI();
                            validateLogin(jqXHR);
                        }
                    });
            }


            function b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = atob(b64Data);
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                var blob = new Blob(byteArrays, {type: contentType});
                return blob;
            }


            /********************************************************************************************
             Reporte Resultados Positivos
             ********************************************************************************************/

            var table2 = $('#positive_request').dataTable({
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'T>r>" +
                    "t" +
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",

                "oTableTools": {
                    "aButtons": [
                        {
                            "sExtends": "xls",
                            "sTitle": "Solicitudes con Resultado Positivo"
                        },
                        {
                            "sExtends": "pdf",
                            "fnClick": function () {
                                exportPDF2();
                            }
                        }

                    ],
                    "sSwfPath": parametros.sTableToolsPath
                },

                "aaSorting": [],


                "autoWidth": true,

                "preDrawCallback": function () {
                    // Initialize the responsive datatables helper once.
                    if (!responsiveHelper_dt_basic) {
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#positive_request'), breakpointDefinition);
                    }
                },
                "rowCallback": function (nRow) {
                    responsiveHelper_dt_basic.createExpandIcon(nRow);
                },
                "drawCallback": function (oSettings) {
                    responsiveHelper_dt_basic.respond();
                }

            });


            <!-- filtro Solicitudes -->
            $('#positive-request-form').validate({
                // Rules for form validation
                rules: {
                    fecInicioAprob: {required: function () {
                        return $('#fecInicioAprob').val().length > 0;
                    }},
                    fecFinAprob: {required: function () {
                        return $('#fecFinAprob').val().length > 0;
                    }}
                },
                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                },
                submitHandler: function (form) {
                    table2.fnClearTable();
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                    codigos = "";
                    getRequest(false)
                }
            });


            $("#all-request").click(function () {
                codigos = "";
                getRequest(true);
            });


            function getRequest(showAll) {
                var mxFiltros = {};
                if (showAll) {

                    mxFiltros['fechaInicioAprob'] = '';
                    mxFiltros['fechaFinAprob'] = '';
                    mxFiltros['codSilais'] = '';
                    mxFiltros['codUnidadSalud'] = '';
                    mxFiltros['codTipoSolicitud'] = '';
                    mxFiltros['nombreSolicitud'] = '';
                    mxFiltros['area'] = '';


                } else {

                    mxFiltros['fechaInicioAprob'] = $('#fecInicioAprob').val();
                    mxFiltros['fechaFinAprob'] = $('#fecFinAprob').val();
                    mxFiltros['codSilais'] = $('#codSilais').find('option:selected').val();
                    mxFiltros['codUnidadSalud'] = $('#codUnidadSalud').find('option:selected').val();
                    mxFiltros['codTipoSolicitud'] = $('#tipo').find('option:selected').val();
                    mxFiltros['nombreSolicitud'] = encodeURI($('#nombreSoli').val());
                    mxFiltros['area'] = $('#area').find('option:selected').val();

                }
                blockUI();
                $.getJSON(parametros.searchReqUrl, {
                    strFilter: JSON.stringify(mxFiltros),
                    ajax: 'true'
                }, function (dataToLoad) {
                    table2.fnClearTable();
                    var len = Object.keys(dataToLoad).length;

                    if (len > 0) {
                        for (var i = 0; i < len; i++) {

                            table2.fnAddData(
                                [dataToLoad[i].codigoUnicoMx , dataToLoad[i].fechaAprobacion, dataToLoad[i].codSilais, dataToLoad[i].codUnidadSalud, dataToLoad[i].persona, dataToLoad[i].solicitud]);

                            if (i + 1 < len) {
                                codigos += dataToLoad[i].idSolicitud + ",";

                            } else {
                                codigos += dataToLoad[i].idSolicitud;

                            }

                        }


                    } else {
                        $.smallBox({
                            title: $("#msg_no_results_found").val(),
                            content: $("#smallBox_content").val(),
                            color: "#C79121",
                            iconSmall: "fa fa-warning",
                            timeout: 4000
                        });
                    }
                    unBlockUI();
                })
                    .fail(function (jqXHR) {
                        setTimeout($.unblockUI, 10);
                        validateLogin(jqXHR);
                    });
            }


            function exportPDF2() {
                blockUI();
                $.ajax(
                    {
                        url: parametros.posReqExportUrl,
                        type: 'GET',
                        dataType: 'text',
                        data: {codes: codigos, fromDate: $('#fecInicioAprob').val(), toDate: $('#fecFinAprob').val()},
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.length != 0) {
                                var blob = b64toBlob(data, 'application/pdf');
                                var blobUrl = URL.createObjectURL(blob);

                                window.open(blobUrl, '', 'width=600,height=400,left=50,top=50,toolbar=yes');
                            } else {
                                $.smallBox({
                                    title: $("#msg_select").val(),
                                    content: "<i class='fa fa-clock-o'></i> <i>" + $("#smallBox_content").val() + "</i>",
                                    color: "#C46A69",
                                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                                    timeout: 4000
                                });
                            }

                            unBlockUI();
                        },
                        error: function (jqXHR) {
                            unBlockUI();
                            validateLogin(jqXHR);
                        }
                    });
            }

            /********************************************************************************************
             Reporte Resultados Positivos y Negativos
             ********************************************************************************************/


            var table3 = $('#pos_neg_request').dataTable({
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'T>r>" +
                    "t" +
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
                "aaSorting": [],

                "oTableTools": {
                    "aButtons": [
                        {
                            "sExtends": "xls",
                            "sTitle": "Solicitudes con Resultado Positivo o Negativo"
                        }

                    ],
                    "sSwfPath": parametros.sTableToolsPath
                },

                "autoWidth": true,

                "preDrawCallback": function () {
                    // Initialize the responsive datatables helper once.
                    if (!responsiveHelper_dt_basic) {
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#pos_neg_request'), breakpointDefinition);
                    }
                },
                "rowCallback": function (nRow) {
                    responsiveHelper_dt_basic.createExpandIcon(nRow);
                },
                "drawCallback": function (oSettings) {
                    responsiveHelper_dt_basic.respond();
                }

            });


            <!-- filtro Solicitudes -->
            $('#pos-neg-request-form').validate({
                // Rules for form validation
                rules: {
                    inicioAprob: {required: function () {
                        return $('#finAprob').val().length > 0;
                    }},
                    finAprob: {required: function () {
                        return $('#inicioAprob').val().length > 0;
                    }}
                },
                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                },
                submitHandler: function (form) {
                    table3.fnClearTable();
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                    codigos = "";
                    getReq(false)
                }
            });


            $("#all-req").click(function () {
                codigos = "";
                getReq(true);
            });


            function getReq(showAll) {
                var mxFiltros = {};
                if (showAll) {

                    mxFiltros['fechaInicioToma'] = '';
                    mxFiltros['fechaFinToma'] = '';
                    mxFiltros['codSilais'] = '';
                    mxFiltros['codUnidadSalud'] = '';
                    mxFiltros['codTipoSolicitud'] = '';
                    mxFiltros['nombreSolicitud'] = '';
                    mxFiltros['area'] = '';
                    mxFiltros['finalRes'] = '';
                } else {
                    mxFiltros['fechaInicioToma'] = $('#inicioAprob').val();
                    mxFiltros['fechaFinToma'] = $('#finAprob').val();

                    if ($("#porResidencia").val()==='true') {
                        mxFiltros['codSilais'] = $('#codSilaisRes').find('option:selected').val();
                    }else{
                        mxFiltros['codSilais'] = $('#codSilais').find('option:selected').val();
                    }
                    mxFiltros['codUnidadSalud'] = $('#codUnidadSalud').find('option:selected').val();
                    mxFiltros['codTipoSolicitud'] = $('#tipoSol').find('option:selected').val();
                    mxFiltros['nombreSolicitud'] = encodeURI($('#nombreSol').val());
                    mxFiltros['area'] = $('#areaSol').find('option:selected').val();
                    mxFiltros['finalRes'] = $('#finalRes').find('option:selected').val();
                }
                blockUI();
                $.getJSON(parametros.searchPosNegReqUrl, {
                    strFilter: JSON.stringify(mxFiltros),
                    ajax: 'true'
                }, function (dataToLoad) {
                    table3.fnClearTable();
                    var len = Object.keys(dataToLoad).length;

                    if (len > 0) {
                        for (var i = 0; i < len; i++) {

                            if ($("#porResidencia").val()==='true'){
                                table3.fnAddData(
                                    [dataToLoad[i].codigoUnicoMx , dataToLoad[i].fechaToma, dataToLoad[i].fechaAprobacion, dataToLoad[i].tipoNoti, dataToLoad[i].codSilais, dataToLoad[i].persona, dataToLoad[i].solicitud, dataToLoad[i].resultado]);
                            }else {
                                table3.fnAddData(
                                    [dataToLoad[i].codigoUnicoMx , dataToLoad[i].fechaToma, dataToLoad[i].fechaAprobacion, dataToLoad[i].tipoNoti, dataToLoad[i].codSilais, dataToLoad[i].codUnidadSalud, dataToLoad[i].persona, dataToLoad[i].direccion, dataToLoad[i].solicitud, dataToLoad[i].resultado]);
                            }
                            if (i + 1 < len) {
                                codigos += dataToLoad[i].idSolicitud + ",";

                            } else {
                                codigos += dataToLoad[i].idSolicitud;

                            }

                        }


                    } else {
                        $.smallBox({
                            title: $("#msg_no_results_found").val(),
                            content: $("#smallBox_content").val(),
                            color: "#C79121",
                            iconSmall: "fa fa-warning",
                            timeout: 4000
                        });
                    }
                    unBlockUI();
                })
                    .fail(function (jqXHR) {
                        setTimeout($.unblockUI, 10);
                        //validateLogin(jqXHR);
                    });
            }


            function exportPDF() {
                blockUI();
                $.ajax(
                    {
                        url: parametros.pdfUrl,
                        type: 'GET',
                        dataType: 'text',
                        data: {codes: codigos, fromDate: $('#inicioAprob').val(), toDate: $('#finAprob').val()},
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.length != 0) {
                                var blob = blobData(data, 'application/pdf');
                                showBlob(blob);

                            } else {
                                $.smallBox({
                                    title: $("#msg_select").val(),
                                    content: "<i class='fa fa-clock-o'></i> <i>" + $("#smallBox_content").val() + "</i>",
                                    color: "#C46A69",
                                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                                    timeout: 4000
                                });
                            }

                            unBlockUI();
                        },
                        error: function (jqXHR) {
                            unBlockUI();
                            validateLogin(jqXHR);
                        }
                    });


            }

            /********************************************************************************************
             Reporte General de Resultados
             ********************************************************************************************/


            var table4 = $('#generalRepTable').dataTable({
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'T>r>" +
                    "t" +
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
                "aaSorting": [],

                "oTableTools": {
                    "aButtons": [
                        {
                            "sExtends": "xls",
                            "sTitle": "Reporte General de Resultados"
                        },
                        {
                            "sExtends": "pdf",
                            "fnClick": function () {
                                exportGenReportPDF();
                            }
                        }

                    ],
                    "sSwfPath": parametros.sTableToolsPath
                },

                "autoWidth": true,

                "preDrawCallback": function () {
                    // Initialize the responsive datatables helper once.
                    if (!responsiveHelper_dt_basic) {
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#generalRepTable'), breakpointDefinition);
                    }
                },
                "rowCallback": function (nRow) {
                    responsiveHelper_dt_basic.createExpandIcon(nRow);
                },
                "drawCallback": function (oSettings) {
                    responsiveHelper_dt_basic.respond();
                }

            });


            <!-- filtro Solicitudes -->
            $('#general-report-form').validate({
                // Rules for form validation
                rules: {
                    inAprob: {required: function () {
                        return $('#inAprob').val().length > 0;
                    }},
                    fiAprob: {required: function () {
                        return $('#fiAprob').val().length > 0;
                    }}
                },
                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                },
                submitHandler: function (form) {
                    table4.fnClearTable();
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                    codigos = "";
                    getRequestGenRep(false)
                }
            });


            $("#all-requestGR").click(function () {
                codigos = "";
                getRequestGenRep(true);
            });


            function getRequestGenRep(showAll) {
                var mxFiltros = {};
                if (showAll) {

                    mxFiltros['fechaInicioAprob'] = '';
                    mxFiltros['fechaFinAprob'] = '';
                    mxFiltros['codSilais'] = '';
                    mxFiltros['codUnidadSalud'] = '';
                    mxFiltros['codTipoSolicitud'] = '';
                    mxFiltros['nombreSolicitud'] = '';
                    mxFiltros['area'] = '';


                } else {

                    mxFiltros['fechaInicioAprob'] = $('#inAprob').val();
                    mxFiltros['fechaFinAprob'] = $('#fiAprob').val();
                    mxFiltros['codSilais'] = $('#codSilaisGR').find('option:selected').val();
                    mxFiltros['codUnidadSalud'] = $('#codUnidadSaludGR').find('option:selected').val();
                    mxFiltros['codTipoSolicitud'] = $('#tipoGR').find('option:selected').val();
                    mxFiltros['nombreSolicitud'] = encodeURI($('#nombreSoliGR').val());
                    mxFiltros['area'] = $('#areaGR').find('option:selected').val();


                }
                blockUI();
                $.getJSON(parametros.searchReqGRUrl, {
                    strFilter: JSON.stringify(mxFiltros),
                    ajax: 'true'
                }, function (dataToLoad) {
                    table4.fnClearTable();
                    var len = Object.keys(dataToLoad).length;

                    if (len > 0) {
                        for (var i = 0; i < len; i++) {

                            table4.fnAddData(
                                [dataToLoad[i].codigoUnicoMx , dataToLoad[i].fechaAprobacion, dataToLoad[i].codSilais, dataToLoad[i].codUnidadSalud, dataToLoad[i].persona, dataToLoad[i].solicitud, dataToLoad[i].resultado]);

                            if (i + 1 < len) {
                                codigos += dataToLoad[i].idSolicitud + ",";

                            } else {
                                codigos += dataToLoad[i].idSolicitud;

                            }

                        }


                    } else {
                        $.smallBox({
                            title: $("#msg_no_results_foundGR").val(),
                            content: $("#dissapearGR").val(),
                            color: "#C79121",
                            iconSmall: "fa fa-warning",
                            timeout: 4000
                        });
                    }
                    unBlockUI();
                })
                    .fail(function (jqXHR) {
                        setTimeout($.unblockUI, 10);
                        validateLogin(jqXHR);
                    });
            }


            function exportGenReportPDF() {
                blockUI();
                $.ajax(
                    {
                        url: parametros.genRePdfUrl,
                        type: 'GET',
                        dataType: 'text',
                        data: {codes: codigos, fromDate: $('#inAprob').val(), toDate: $('#inAprob').val()},
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function (data) {
                            if (data.length != 0) {
                                var blob = blobData(data, 'application/pdf');
                                showBlob(blob);
                            } else {
                                $.smallBox({
                                    title: $("#msg_select").val(),
                                    content: "<i class='fa fa-clock-o'></i> <i>" + $("#dissapearGR").val() + "</i>",
                                    color: "#C46A69",
                                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                                    timeout: 4000
                                });
                            }

                            unBlockUI();
                        },
                        error: function (jqXHR) {
                            unBlockUI();
                            validateLogin(jqXHR);
                        }
                    });
            }


            <!-- al seleccionar SILAIS -->
            $('#codSilaisGR').change(function () {
                blockUI();
                if ($(this).val().length > 0) {
                    $.getJSON(parametros.sUnidadesUrl, {
                        codSilais: $(this).val(),
                        ajax: 'true'
                    }, function (data) {
                        var html = null;
                        var len = data.length;
                        html += '<option value="">' + $("#text_opt_select").val() + '...</option>';
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i].codigo + '">'
                                + data[i].nombre
                                + '</option>';
                            // html += '</option>';
                        }
                        $('#codUnidadSaludGR').html(html);
                    }).fail(function (jqXHR) {
                        setTimeout($.unblockUI, 10);
                        validateLogin(jqXHR);
                    });
                } else {
                    var html = '<option value="">' + $("#text_opt_select").val() + '...</option>';
                    $('#codUnidadSaludGR').html(html);
                }
                $('#codUnidadSaludGR').val('').change();
                unBlockUI();
            });


        }
    };

}();

