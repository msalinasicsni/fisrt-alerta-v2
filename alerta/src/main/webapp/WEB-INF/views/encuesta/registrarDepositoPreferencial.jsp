<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<!-- BEGIN HEAD -->
<head>
    <jsp:include page="../fragments/headTag.jsp" />
    <style>
        .modal .modal-dialog {
            width: 60%;
        }
        /* columns right and center aligned datatables */
        .aw-right {
            padding-left: 0;
            padding-right: 10px;
            text-align: right;
        }.aw-center {
             padding-left: 0;
             padding-right: 10px;
             text-align: center;
         }
    </style>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="">
<c:url var="unidadesURL" value="/api/v1/unidadesPrimarias"/>
<c:url var="municipiosURL" value="/api/v1/municipiosbysilais"/>
<c:url var="comunidadesURL" value="/api/v1/comunidadesSector"/>
<c:url var="distritosURL" value="/api/v1/distritosMng"/>
<c:url var="areasURL" value="/api/v1/areasMng"/>
<c:url value="/encuesta/guardarDepositoPreferencial" var="encuesta" />
<c:url var="recargarDetalleEncuestasURL" value="/encuesta/obtenerDepositoPrefeMae"/>
<c:url var="existeLocalidadURL" value="/encuesta/comunidadExisteDepositoPrefe"/>
<c:url var="existeMaestroURL" value="/encuesta/existeMaestroDepositoPrefe"/>
<c:url var="semanaEpidemiologicaURL" value="/api/v1/semanaEpidemiologica"/>
<c:url var="editarEncuestaURL" value="/encuesta/edit"/>
<c:url var="sectoresURL" value="/api/v1/sectoresMunicipio"/>

<!-- #HEADER -->
<jsp:include page="../fragments/bodyHeader.jsp" />
<!-- #NAVIGATION -->
<jsp:include page="../fragments/bodyNavigation.jsp" />
<!-- MAIN PANEL -->
<div id="main" data-role="main">
<!-- RIBBON -->
<div id="ribbon">
			<span class="ribbon-button-alignment">
				<span id="refresh" class="btn btn-ribbon" data-action="resetWidgets(fff)" data-placement="bottom" data-original-title="<i class='text-warning fa fa-warning'></i> <spring:message code="msg.reset" />" data-html="true">
					<i class="fa fa-refresh"></i>
				</span>
			</span>
    <!-- breadcrumb -->
    <ol class="breadcrumb">
        <li><a href="<spring:url value="/" htmlEscape="true "/>"><spring:message code="menu.home" /></a> <i class="fa fa-angle-right"></i> <a href="<spring:url value="/encuesta/create/dep" htmlEscape="true "/>"><spring:message code="lbl.breadcrumb.ento.adddep" /></a></li>
    </ol>
    <!-- end breadcrumb -->
    <jsp:include page="../fragments/layoutOptions.jsp" />
</div>
<!-- END RIBBON -->
<!-- MAIN CONTENT -->
<div id="content">
<!-- row -->
<div class="row">
    <!-- col -->
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-5">
        <h1 class="page-title txt-color-blueDark">
            <!-- PAGE HEADER -->
            <i class="fa-fw fa fa-bug"></i>
            <spring:message code="lbl.ento.add" />
						<span> <i class="fa fa-angle-right"></i>
							<spring:message code="lbl.ento.sub.adddeposito" />
						</span>
        </h1>
    </div>
    <!-- end col -->
    <!-- right side of the page with the sparkline graphs -->
    <!-- col -->
    <div class="col-xs-12 col-sm-5 col-md-5 col-lg-7">
        <!-- sparks -->
        <ul id="sparks">
            <li class="sparks-info">
                <h5> <spring:message code="sp.day" /> <span class="txt-color-greenDark"><i class="fa fa-arrow-circle-down"></i>17</span></h5>
                <div class="sparkline txt-color-blue hidden-mobile hidden-md hidden-sm">
                    0,1,3,4,11,12,11,13,10,11,15,14,20,17
                </div>
            </li>
            <li class="sparks-info">
                <h5> <spring:message code="sp.week" /> <span class="txt-color-red"><i class="fa fa-arrow-circle-up"></i>&nbsp;57</span></h5>
                <div class="sparkline txt-color-purple hidden-mobile hidden-md hidden-sm">
                    23,32,11,23,33,45,44,54,45,48,57
                </div>
            </li>
            <li class="sparks-info">
                <h5> <spring:message code="sp.month" /> <span class="txt-color-red"><i class="fa fa-arrow-circle-up"></i>&nbsp;783</span></h5>
                <div class="sparkline txt-color-purple hidden-mobile hidden-md hidden-sm">
                    235,323,114,231,333,451,444,541,451,483,783
                </div>
            </li>
        </ul>
        <!-- end sparks -->
    </div>
    <!-- end col -->
</div>
<!-- end row -->
<!--
    The ID "widget-grid" will start to initialize all widgets below
    You do not need to use widgets if you dont want to. Simply remove
    the <section></section> and you can use wells or panels instead
    -->
<!-- widget grid -->
<section id="widget-grid" class="">
<!-- row -->
<div class="row">
<!-- NEW WIDGET START -->
<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
<!-- Widget ID (each widget will need unique ID)-->
<div class="jarviswidget jarviswidget-color-darken" id="wid-id-0">
<!-- widget options:
    usage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">
    data-widget-colorbutton="false"
    data-widget-editbutton="false"
    data-widget-togglebutton="false"
    data-widget-deletebutton="false"
    data-widget-fullscreenbutton="false"
    data-widget-custombutton="false"
    data-widget-collapsed="true"
    data-widget-sortable="false"
-->
<header>
    <span class="widget-icon"> <i class="fa fa-list"></i> </span>
    <h2><spring:message code="lbl.widgettitle.ento.add.mae" /> </h2>
</header>
<!-- widget div-->
<div>
<!-- widget edit box -->
<div class="jarviswidget-editbox">
    <!-- This area used as dropdown edit box -->
    <input class="form-control" type="text">
</div>
<!-- end widget edit box -->
<!-- widget content -->
<div class="widget-body">
<!-- this is what the user will see -->
<form class="smart-form" id="frmPrincipal" novalidate="novalidate">
<!--<header>
    Maestro de Encuesta
</header>-->
<div class="row" id="msjMaestro">
</div>
<fieldset>
    <div class="row">
        <section class="col col-sm-12 col-md-6 col-lg-3">
            <!--<label class="input">
                <input type="text" placeholder="2/12">
            </label>-->
            <label class="text-left txt-color-blue font-md">
                <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.silais" /> </label>
            <div class="input-group">
                                                    <span class="input-group-addon">
                                                         <i class="fa fa-location-arrow fa-fw"></i>
                                                    </span>
                <select id="codSilais" name="codSilais" class="select2">
                    <option value=""><spring:message code="lbl.select" />...</option>
                    <c:forEach items="${entidades}" var="entidad">
                        <option value="${entidad.codigo}">${entidad.nombre}</option>
                    </c:forEach>
                </select>
            </div>
        </section>
        <section class="col col-sm-6 col-md-4 col-lg-3">
            <label class="text-left txt-color-blue font-md">
                <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="muni" /> </label>
            <div class="input-group">
	    					<span class="input-group-addon">
                                <i class="fa fa-location-arrow fa-fw"></i>
		    				</span>
                <select  class="select2" name="codMunicipioEncu" id="codMunicipioEncu">
                    <option value=""><spring:message code="lbl.select" />...</option>
                </select>
            </div>
        </section>
        <section class="col col-sm-12 col-md-6 col-lg-6">
            <label class="text-left txt-color-blue font-md">
                <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.health.unit" />
            </label>
            <div class="input-group">
	    					<span class="input-group-addon">
                                <i class="fa fa-location-arrow fa-fw"></i>
		    				</span>
                <select class="select2" id="codUnidadSalud" name="codUnidadSalud">
                    <option value=""><spring:message code="lbl.select" />...</option>
                </select>
            </div>
        </section>
    </div>
    <!-- primera fila -->
    <div class="row">
        <section class="col col-sm-6 col-md-4 col-lg-3">
            <label class="text-left txt-color-blue font-md">
                <spring:message code="lbl.district" />
            </label>
            <div class="input-group">
	    					<span class="input-group-addon">
                                <i class="fa fa-location-arrow fa-fw"></i>
		    				</span>
                <select class="select2" id="codigoDistrito" name="codigoDistrito" >
                    <option value=""><spring:message code="lbl.select" />...</option>

                </select>
            </div>
        </section>
        <section class="col col-sm-6 col-md-4 col-lg-3">
            <label class="text-left txt-color-blue font-md">
                <spring:message code="lbl.area" />
            </label>
            <div class="input-group">
	    					<span class="input-group-addon">
                                <i class="fa fa-location-arrow fa-fw"></i>
		    				</span>
                <select class="select2" id="codigoArea" name="codigoArea" >
                    <option value=""><spring:message code="lbl.select" />...</option>
                </select>
            </div>
        </section>
        <section class="col col-sm-6 col-md-4 col-lg-3">
            <label class="text-left txt-color-blue font-md">
                <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.ordinal" />
            </label>
            <div class="input-group">
	    					<span class="input-group-addon">
                                <i class="fa fa-location-arrow fa-fw"></i>
		    				</span>
                <select class="select2" id="codOrdinal" name="codOrdinal" >
                    <option value=""><spring:message code="lbl.select" />...</option>
                    <c:forEach items="${ordinales}" var="ordinales">
                        <option value="${ordinales.codigo}">${ordinales.valor}</option>
                    </c:forEach>
                </select>
            </div>
        </section>
        <section class="col col-sm-6 col-md-4 col-lg-3">
            <label class="text-left txt-color-blue font-md">
                <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.provenance" />
            </label>
            <div class="input-group">
	    					<span class="input-group-addon">
                                <i class="fa fa-location-arrow fa-fw"></i>
		    				</span>
                <select class="select2" id="codProcedencia" name="codProcedencia" >
                    <option value=""><spring:message code="lbl.select" />...</option>
                    <c:forEach items="${procedencias}" var="procedencias">
                        <option value="${procedencias.codigo}">${procedencias.valor}</option>
                    </c:forEach>
                </select>
            </div>
        </section>
    </div>
    <div class="row">
        <section class="col col-sm-6 col-md-4 col-lg-2">
            <label class="text-left txt-color-blue font-md">
                <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.start.date" />
            </label>
            <div class="">
                <!--<span class="input-group-addon">
                    <i class="fa fa-pencil fa-fw"></i>
		        </span>-->
                <label class="input">
                <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-calendar fa-fw"></i>
                <input type="text" name="fecInicioEncuesta" id="fecInicioEncuesta"
                       placeholder="<spring:message code="lbl.date.format"/>"
                       class="form-control from_date" data-date-end-date="+0d" />
                    <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.startdate.survey"/></b>
                </label>
                                               <!-- <span class="input-group-addon"> <i    class="fa fa-calendar fa-fw"></i>
                                                </span>-->
            </div>
        </section>
        <section class="col col-sm-6 col-md-4 col-lg-2">
            <label class="text-left txt-color-blue font-md">
                <spring:message code="lbl.ento.end.date" />
            </label>
            <div class="">
                <!--<span class="input-group-addon">
                    <i class="fa fa-pencil fa-fw"></i>
		        </span>-->
                <label class="input">
                    <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-calendar fa-fw"></i>
                <input type="text" name="fecFinEncuesta" id="fecFinEncuesta"
                       placeholder="<spring:message code="lbl.date.format"/>"
                       class="form-control to_date" data-date-end-date="+0d"/>
                    <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enddate.survey"/></b>
                    </label>
                            <!--<span class="input-group-addon"> <i class="fa fa-calendar fa-fw"></i>
                            </span>-->
            </div>
        </section>
        <section class="col col-sm-12 col-md-6 col-lg-6">
            <!--<div class="col col-12">-->
            <section class="col col-3">
                <label class="text-left txt-color-blue font-md">
                    <spring:message code="lbl.month" />
                </label>
                <div class="">
                        <!--<span class="input-group-addon">
                            <i class="fa fa-pencil fa-fw"></i>
                        </span>-->
                    <label class="input">
                        <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                    <input type="text" id="mesEpi" name="mesEpi" readonly placeholder="<spring:message code="lbl.month"/>" class="form-control">
                        <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.month.survey"/></b>
                </label>
                            <!--        <span class="input-group-addon">
                            <i class="fa fa-sort-numeric-asc fa-fw"></i>
                        </span>-->
                </div>
            </section>
            <section class="col col-3">
                <label class="text-left txt-color-blue font-md">
                    <spring:message code="lbl.year" />
                </label>
                <div class="">
                        <!--<span class="input-group-addon">
                            <i class="fa fa-pencil fa-fw"></i>
                        </span>-->
                    <label class="input">
                        <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                    <input type="text" id="anioEpi" name="anioEpi" readonly placeholder="<spring:message code="lbl.year"/>" class="form-control">
                        <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.year.survey"/></b>
                </label>
                                  <!--  <span class="input-group-addon">
                            <i class="fa fa-sort-numeric-asc fa-fw"></i>
                        </span>-->
                </div>
            </section>
            <section class="col col-4">
                <label class="text-left txt-color-blue font-md">
                    <spring:message code="lbl.ew" />
                </label>
                <div class="">
                        <!--<span class="input-group-addon">
                            <i class="fa fa-pencil fa-fw"></i>
                        </span>-->
                    <label class="input" >
                        <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                    <input type="text" id="semanaEpi" name="semanaEpi" readonly placeholder="<spring:message code="lbl.ew"/>" class="form-control">
                        <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.ew"/></b>
                </label>
                                  <!--  <span class="input-group-addon">
                            <i class="fa fa-sort-numeric-asc fa-fw"></i>
                        </span>-->
                </div>
            </section>
            <!--</div>-->
        </section>
    </div>
</fieldset>
<fieldset>
    <div class="row">
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <a class="btn btn-primary btn-lg pull-left header-btn hidden-mobile" id="btnNuevoRegistro"><i class="fa fa-circle-arrow-up fa-lg"></i><spring:message code="act.ento.new.survey" /></a>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <input id="msg_header_exist" type="hidden" value="<spring:message code="msg.ento.header.already.exist"/>"/>
            <input id="msg_location_added" type="hidden" value="<spring:message code="msg.ento.location.added.successfully"/>"/>
            <input id="msg_location_exist" type="hidden" value="<spring:message code="msg.ento.location.alreadey.exist"/>"/>
            <input id="text_opt_select" type="hidden" value="<spring:message code="lbl.select"/>"/>
            <input id="txt_act_edit" type="hidden" value="<spring:message code="act.edit"/>"/>
            <input id="smallBox_content" type="hidden" value="<spring:message code="smallBox.content.4s"/>"/>
            <input id="blockUI_message" type="hidden" value="<spring:message code="blockUI.message"/>"/>

            <input id="idMaestroAgregado" type="hidden"/>
            <!-- Button trigger modal -->
            <a data-toggle="modal" href="#" class="btn btn-success btn-lg pull-right header-btn hidden-mobile" id="openModal"><i class="fa fa-circle-arrow-up fa-lg"></i><spring:message code="act.ento.add.locality" /></a>
        </div>
    </div>
</fieldset>
<!--<fieldset>
</fieldset>
<footer>
</footer>-->
</form>
</div>
<!-- end widget content -->
</div>
<!-- end widget div -->
</div>
<!-- end widget -->
<div class="jarviswidget jarviswidget-color-darken" id="wid-id-2" data-widget-editbutton="false" data-widget-deletebutton="false">
    <header>
        <span class="widget-icon"> <i class="fa fa-table"></i> </span>
        <h2><spring:message code="lbl.widgettitle.ento.add.det" /> </h2>
    </header>
    <!-- widget div-->
    <div>
        <!-- widget edit box -->
        <div class="jarviswidget-editbox">
            <!-- This area used as dropdown edit box -->
        </div>
        <!-- end widget edit box -->
        <!-- widget content -->
        <div class="widget-body no-padding">
            <table id="dtDetalleDepositos" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                <tr><th colspan="1"><p class="text-center font-sm "><spring:message code="lbl.ento.no" /></p></th>
                    <th colspan="1" data-class="expand"><p class="text-center font-sm "><spring:message code="lbl.ento.locality" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm ">#<spring:message code="lbl.ento.dep.block" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm ">#<spring:message code="lbl.ento.dep.homes" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.pila" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.tire" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.barrel" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.vase" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.sprue" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.special.items" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.oDep" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.cistern" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.toilet" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.barro" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.plant" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.tree" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.well" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.total" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.dep.name" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.dep.desc.odep" /></p></th>
                    <th colspan="1" data-hide="phone,tablet"><p class="text-center font-sm "><spring:message code="lbl.ento.dep.desc.cistern" /></p></th>
                </tr>
                </thead>
                <tfoot>
                <tr><th style="text-align: right; background-color: #86b4dd"></th>
                    <th class="font-sm" colspan="3" style="text-align: center; background-color: #86b4dd"><spring:message code="lbl.ento.totals" /></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalPila" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalLlanta"  style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalBarril" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalFloreros" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalBeberedos" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalArtEspec" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalODep" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalCister" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalInodo" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalBarro" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalPlanta" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalArbol" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalPozo" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="totalTotalI" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="3" rowspan="1" style="text-align: right; background-color: #86b4dd"></th>
                </tr>
                <tr><th colspan="1" style="text-align: right; background-color: #86b4dd"></th>
                    <th class="font-sm" colspan="3" style="text-align: center; background-color: #86b4dd"><spring:message code="lbl.ento.indexs" /></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indicePila" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceLlanta"  style="font-weight: bold"><strong>0</strong></label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceBarril" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceFloreros" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceBeberedos" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceArtEspec" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceODep" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceCister" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceInodo" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceBarro" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indicePlanta" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indiceArbol" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="1" rowspan="1" style="text-align: right; background-color: #86b4dd"><label id="indicePozo" style="font-weight: bold">0</label></th>
                    <th class="font-sm" colspan="4" rowspan="1" style="text-align: right; background-color: #86b4dd"></th>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <!-- end widget div -->
</div>
</article>
<!-- WIDGET END -->
</div>
<!-- end row -->
<!-- row -->
<div class="row">
    <!-- a blank row to get started -->
    <div class="col-sm-12">
        <!-- your contents here -->
    </div>
</div>
<!-- end row -->
</section>
<!-- Modal -->
<div class="modal fade" id="myModal" aria-hidden="true" data-backdrop="static"> <!--tabindex="-1" role="dialog" -->
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
    <h4 class="modal-title">
        <spring:message code="lbl.ento.modal.title" />
    </h4>
</div>
<div class="modal-body"> <!--  no-padding -->
<form id="frmDetalleEncuesta" class="smart-form" novalidate="novalidate">
<fieldset>
<!-- NOTIFICACI�N -->
<div id="mensaje">
</div>
<!-- NOTIFICACI�N -->
<!-- SECTOR y LOCALIDAD -->
<div class="row">
    <section class="col col-sm-12 col-md-5 col-lg-5">
        <label class="text-left txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.sector" />
        </label>
        <div class="input-group">
	    					        <span class="input-group-addon">
                                        <i class="fa fa-location-arrow fa-fw"></i>
		    				        </span>
            <select class="select2" id="codigoSector" name="codigoSector">
                <option value=""><spring:message code="lbl.select" />...</option>
            </select>
        </div>
    </section>
    <section class="col col-sm-12 col-md-7 col-lg-7">
        <label class="text-left txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.locality" />
        </label>
        <div class="input-group">
	    					        <span class="input-group-addon">
                                        <i class="fa fa-location-arrow fa-fw"></i>
		    				        </span>
            <select class="select2" id="codigoLocalidad" name="codigoLocalidad">
                <option value=""><spring:message code="lbl.select" />...</option>
            </select>
        </div>
    </section>
    <section class="col col-sm-6 col-md-6 col-lg-3">
        <label class=" txt-color-blue font-md"><!--col col-4-->
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.modal.depo.block" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtManzanas" id="txtManzanas" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.dep.block"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-6 col-lg-3">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.modal.depo.home" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtViviendas" id="txtViviendas" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.dep.home"/></b>
            </label>
        </div>
    </section>

</div>
<!-- FIN LOCALIDAD -->
<header><spring:message code="lbl.ento.modal.subtitle.dep" /></header>
<!-- VIVIENDAS -->
<div class="row">
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class=" txt-color-blue font-md"><!--col col-4-->
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.pila" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtPila" id="txtPila" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.pila"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.tire" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtLlanta" id="txtLlanta" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.tire"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.barrel" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtBarril" id="txtBarril" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.barrel"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.vase" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtFlorero" id="txtFlorero" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.vase"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.sprue.full" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtBebedero" id="txtBebedero" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.sprue.full"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.special.items" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtArt_Esp" id="txtArt_Esp" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.special.items.full"/></b>
            </label>
        </div>
    </section>
</div>
<div class="row">
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.oDep" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtO_Dep" id="txtO_Dep" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.oDep.full"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.cistern" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtCister" id="txtCister" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.cistern.full"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class=" txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.toilet" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtInodoro" id="txtInodoro" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.toilet"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.barro" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtBarro" id="txtBarro" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.barro"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.plant" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtPlanta" id="txtPlanta" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.plant"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.tree" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtArbol" id="txtArbol" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.tree"/></b>
            </label>
        </div>
    </section>
</div>
<!--FIN MANZANAS -->
<!-- FECHAS-->
<div class="row">
    <section class="col col-sm-6 col-md-4 col-lg-2">
        <label class="txt-color-blue font-md">
            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i><spring:message code="lbl.ento.well" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-numeric-asc fa-fw"></i>
                <input type="text" name="txtPozo" id="txtPozo" class="entero">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.enter.quantity"/> <spring:message code="lbl.ento.well"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-4">
        <label class="txt-color-blue font-md">
            <spring:message code="lbl.ento.dep.name" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-alpha-asc fa-fw"></i>
                <input type="text" name="txtNombre" id="txtNombre">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.dep.name"/></b>
            </label>
        </div>
    </section>
    <section class="col col-sm-6 col-md-4 col-lg-6">
        <label class="txt-color-blue font-md">
            <spring:message code="lbl.ento.dep.desc.odep.modal" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-alpha-asc fa-fw"></i>
                <input type="text" name="txtDescOdep" id="txtDescOdep">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.dep.descodep"/></b>
            </label>
        </div>
    </section>
</div>
<div class="row">
    <section class="col col-sm-6 col-md-4 col-lg-6">
        <label class="txt-color-blue font-md">
            <spring:message code="lbl.ento.dep.desc.cistern.modal" />
        </label>
        <div class="">
            <label class="input"> <i class="icon-prepend fa fa-pencil fa-fw"></i> <i class="icon-append fa fa-sort-alpha-asc fa-fw"></i>
                <input type="text" name="txtDescCister" id="txtDescCister">
                <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="tooltip.ento.dep.desccister"/></b>
            </label>
        </div>
    </section>
</div>
<!--FIN VIVIENDAS -->
<!-- MANZANAS -->
<div class="row">

</div>
<!-- FIN DEPOSITO Y PUPAS-->
</fieldset>
<footer>
    <button type="submit" class="btn btn-primary" id="btnGuardarDetalle">
        <spring:message code="act.save" />
    </button>
    <button type="button" class="btn btn-default" data-dismiss="modal">
        <spring:message code="act.end" />
    </button>

</footer>

</form>
</div>
</div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</div>
<!-- END MAIN CONTENT -->
</div>
<!-- END MAIN PANEL -->
<!-- BEGIN FOOTER -->
<jsp:include page="../fragments/footer.jsp" />
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<jsp:include page="../fragments/corePlugins.jsp" />
<!-- BEGIN PAGE LEVEL PLUGINS -->
<!-- Data table -->
<spring:url value="/resources/js/plugin/datatables/jquery.dataTables.min.js" var="dataTables" />
<script src="${dataTables}"></script>
<spring:url value="/resources/js/plugin/datatables/dataTables.colVis.min.js" var="dataTablesColVis" />
<script src="${dataTablesColVis}"></script>
<spring:url value="/resources/js/plugin/datatables/dataTables.tableTools.min.js" var="dataTablesTableTools" />
<script src="${dataTablesTableTools}"></script>
<spring:url value="/resources/js/plugin/datatables/dataTables.bootstrap.min.js" var="dataTablesBootstrap" />
<script src="${dataTablesBootstrap}"></script>
<spring:url value="/resources/js/plugin/datatable-responsive/datatables.responsive.min.js" var="dataTablesResponsive" />
<script src="${dataTablesResponsive}"></script>

<!-- JQUERY VALIDATE -->
<spring:url value="/resources/js/plugin/jquery-validate/jquery.validate.min.js" var="validate" />
<script src="${validate}"></script>
<spring:url value="/resources/js/plugin/jquery-validate/messages_{language}.js" var="jQValidationLoc">
    <spring:param name="language" value="${pageContext.request.locale.language}" /></spring:url>
<script src="${jQValidationLoc}"></script>

<!-- bootstrap datepicker -->
<spring:url value="/resources/js/plugin/bootstrap-datepicker/bootstrap-datepicker.js" var="datepickerPlugin" />
<script src="${datepickerPlugin}"></script>

<!-- jQuery Selecte2 Input -->
<spring:url value="/resources/js/plugin/select2/select2.min.js" var="selectPlugin"/>
<script src="${selectPlugin}"></script>

<!-- JQUERY BLOCK UI -->
<spring:url value="/resources/js/plugin/jquery-blockui/jquery.blockUI.js" var="jqueryBlockUi" />
<script src="${jqueryBlockUi}"></script>

<!-- JQUERY INPUT MASK -->
<spring:url value="/resources/js/plugin/jquery-inputmask/jquery.inputmask.bundle.min.js" var="jqueryInputMask" />
<script src="${jqueryInputMask}"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<spring:url value="/resources/scripts/utilidades/seleccionUnidad.js" var="selecUnidad" />
<script src="${selecUnidad}"></script>
<spring:url value="/resources/scripts/encuestas/survey-add.js" var="surveyAddDepo" />
<script src="${surveyAddDepo}"></script>
<spring:url value="/resources/scripts/utilidades/handleDatePickers.js" var="handleDatePickers" />
<script src="${handleDatePickers}"></script>
<spring:url value="/resources/scripts/utilidades/handleInputMask.js" var="handleInputMask" />
<script src="${handleInputMask}"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script>
    $(function () {
        $("li.entoadddep").addClass("active");
    });
</script>
<script type="text/javascript">
    $(document).ready(function(){
        pageSetUp();

        var parametros = {sAddSurvey: "${encuesta}",
            sSurveyDetailsUrl : "${recargarDetalleEncuestasURL}",
            sSurveyHeaderUrl : "${existeMaestroURL}",
            sMunicipiosUrl : "${municipiosURL}",
            sComunidadesUrl : "${comunidadesURL}",
            sDistritosUrl : "${distritosURL}",
            sAreasUrl : "${areasURL}",
            sUnidadesUrl: "${unidadesURL}",
            sValidarLocalidadUrl : "${existeLocalidadURL}",
            sSemanaEpiUrl : "${semanaEpidemiologicaURL}",
            sSectoresUrl : "${sectoresURL}",
            dFechaHoy: "${fechaHoy}",
            sEditSurveyUrl : "${editarEncuestaURL}",
            blockMess : $("#blockUI_message").val()
        };
        AddDepositoSurvey.init(parametros);
        SeleccionUnidad.init(parametros);
        handleDatePickers("${pageContext.request.locale.language}");
        handleInputMasks();
        $("li.entomologia").addClass("open");
        $("li.entoadddep").addClass("active");
        if("top"!=localStorage.getItem("sm-setmenu")){
            $("li.entoadddep").parents("ul").slideDown(200);
        }
    });
</script>	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>