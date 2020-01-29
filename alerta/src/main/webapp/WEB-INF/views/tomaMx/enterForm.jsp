<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<!-- BEGIN HEAD -->
<head>
	<jsp:include page="../fragments/headTag.jsp" />
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="">
	<!-- #HEADER -->
	<jsp:include page="../fragments/bodyHeader.jsp" />
	<!-- #NAVIGATION -->
	<jsp:include page="../fragments/bodyNavigation.jsp" />
	<!-- MAIN PANEL -->
	<div id="main" data-role="main">
		<!-- RIBBON -->
		<div id="ribbon">
			<span class="ribbon-button-alignment"> 
				<span id="refresh" class="btn btn-ribbon" data-action="resetWidgets" data-placement="bottom" data-original-title="<i class='text-warning fa fa-warning'></i> <spring:message code="msg.reset" />" data-html="true">
					<i class="fa fa-refresh"></i>
				</span> 
			</span>
			<!-- breadcrumb -->
			<ol class="breadcrumb">
				<li><a href="<spring:url value="/" htmlEscape="true "/>"><spring:message code="menu.home" /></a> <i class="fa fa-angle-right"></i> <a href="<spring:url value="/tomaMx/create" htmlEscape="true "/>"><spring:message code="menu.taking.sample" /></a></li>
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
				<div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
					<h1 class="page-title txt-color-blueDark">
						<!-- PAGE HEADER -->
						<i class="fa-fw fa fa-eyedropper"></i>
							<spring:message code="lbl.sampling.register" />
					</h1>
				</div>
				<!-- end col -->
				<!-- right side of the page with the sparkline graphs -->
				<!-- col -->
				<div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
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
			<!-- widget grid -->
			<section id="widget-grid" class="">
				<!-- row -->
				<div class="row">
					<!-- a blank row to get started -->
				</div>
				<!-- end row -->
				<!-- row -->
				<div class="row">
					<!-- NEW WIDGET START -->
					<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<!-- Widget ID (each widget will need unique ID)-->
						<div class="jarviswidget jarviswidget-color-darken" id="wid-id-0" data-widget-editbutton="false" data-widget-deletebutton="false">
							<header>
								<span class="widget-icon"> <i class="fa fa-eyedropper"></i> </span>
								<h2><spring:message code="lbl.sampling.register" /> </h2>
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
								<div class="widget-body fuelux">

                                <form:form modelAttribute="noti" id="noti" class="smart-form" >
                                <fieldset >
                                    <legend class="text-left txt-color-blue font-md"> <spring:message code="lbl.notification.data"/>
                                        ${noti.codTipoNotificacion.valor}
                                   </legend>


                                    <div class="row">

                                        <section class="col col-md-4">
                                            <label class="text-left txt-color-blue font-md">
                                                <spring:message code="sindfeb.silais" />
                                                <input value="${noti.codTipoNotificacion.codigo}" hidden="hidden" type="text" id="tipoNoti" name="tipoNoti"/>

                                            </label>


                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-location-arrow"></i></span>
                                                <label class="input">
                                                    <input style="background-color: #f0fff0" disabled class="form-control" value="${noti.codSilaisAtencion.nombre}" type="text"   />
                                                </label>
                                                <span class="input-group-addon"><i class="fa fa-chevron-down fa-fw"></i></span>
                                            </div>
                                        </section>

                                        <section class="col col-md-8">
                                            <label class="text-left txt-color-blue font-md">
                                                <spring:message code="lbl.health.unit" />
                                            </label>

                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-location-arrow"></i></span>
                                                <label class="input">
                                                    <input style="background-color: #f0fff0" disabled class="form-control" type="text" value="${noti.codUnidadAtencion.nombre}"   />
                                                </label>
                                                <span class="input-group-addon"><i class="fa fa-chevron-down fa-fw"></i></span>
                                            </div>
                                        </section>

                                    </div>

                                        <div class="row">
                                            <section class="col col-md-3">
                                                <label class="text-left txt-color-blue font-md">
                                                    <spring:message code="person.name1" />
                                                </label>

                                                <div class="input-group">
                                                    <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                    <label class="input">
                                                        <form:input style="background-color: #f0fff0" disabled="true" class="form-control" type="text" path="persona.primerNombre"   />
                                                    </label>
                                                    <span class="input-group-addon"><i class="fa fa-sort-alpha-asc"></i></span>
                                                </div>
                                            </section>

                                            <section class="col col-md-3">
                                                <label class="text-left txt-color-blue font-md">
                                                    <spring:message code="person.name2" />
                                                </label>

                                                <div class="input-group">
                                                    <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                    <label class="input">
                                                        <form:input style="background-color: #f0fff0" disabled="true" class="form-control" type="text" path="persona.segundoNombre"   />
                                                    </label>
                                                    <span class="input-group-addon"><i class="fa fa-sort-alpha-asc"></i></span>
                                                </div>
                                            </section>


                                            <section class="col col-md-3">
                                                <label class="text-left txt-color-blue font-md">
                                                    <spring:message code="person.lastname1" />
                                                </label>

                                                <div class="input-group">
                                                    <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                    <label class="input">
                                                        <form:input style="background-color: #f0fff0" disabled="true" class="form-control" type="text" path="persona.primerApellido"   />
                                                    </label>
                                                    <span class="input-group-addon"><i class="fa fa-sort-alpha-asc"></i></span>
                                                </div>
                                            </section>

                                            <section class="col col-md-3">
                                                <label class="text-left txt-color-blue font-md">
                                                    <spring:message code="person.lastname2" />
                                                </label>

                                                <div class="input-group">
                                                    <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                    <label class="input">
                                                        <form:input style="background-color: #f0fff0" disabled="true" class="form-control" type="text" path="persona.segundoApellido"   />
                                                    </label>
                                                    <span class="input-group-addon"><i class="fa fa-sort-alpha-asc"></i></span>
                                                </div>
                                            </section>
                                        </div>



                                    <div class="row">
                                        <section class="col col-md-3">
                                            <label class="text-left txt-color-blue font-md">
                                                <spring:message code="person.sexo" />
                                            </label>

                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                <label class="input">
                                                    <form:input style="background-color: #f0fff0" disabled="true" class="form-control" type="text" path="persona.sexo.valor"   />
                                                </label>
                                                <span class="input-group-addon"><i class="fa fa-chevron-down fa-fw"></i></span>
                                            </div>
                                        </section>

                                        <section class="col col-md-3">
                                            <label class="text-left txt-color-blue font-md">
                                                <spring:message code="person.fecnac" />
                                            </label>

                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                <label class="input">
                                                    <input style="background-color: #f0fff0" class="form-control" readonly
                                                           type="text" value="<fmt:formatDate value="${noti.persona.fechaNacimiento}" pattern="dd/MM/yyyy" />"
                                                           placeholder=" <spring:message code="person.fecnac" />">
                                                </label>
                                                <span class="input-group-addon"><i class="fa fa-calendar fa-fw"></i></span>
                                            </div>
                                        </section>

                                        <section class="col col-md-3">
                                            <label class="text-left txt-color-blue font-md">
                                                <spring:message code="lbl.register.date" />
                                            </label>

                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                <label class="input">
                                                    <input style="background-color: #f0fff0" class="form-control" readonly
                                                           type="text" value="<fmt:formatDate value="${noti.fechaRegistro}" pattern="dd/MM/yyyy" />">
                                                </label>
                                                <span class="input-group-addon"><i class="fa fa-calendar fa-fw"></i></span>
                                            </div>
                                        </section>

                                        <section class="col col-3">
                                            <label class="text-left txt-color-blue font-md hidden-xs">
                                                <spring:message code="sindfeb.urgent" />
                                            </label>
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-exclamation-triangle"></i></span>
                                                <label class="input">
                                                    <input style="background-color: #f0fff0" disabled class="form-control" value="${noti.urgente}" type="text"/>
                                                </label>
                                                <span class="input-group-addon"><i class="fa fa-chevron-down fa-fw"></i></span>
                                            </div>
                                        </section>


                                    </div>
                                    <div class="row">
                                        <section class="col col-md-3">
                                            <label class="text-left txt-color-blue font-md">
                                                <spring:message code="lbl.symptoms.start.date" />
                                            </label>

                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                <label class="input">
                                                    <input style="background-color: #f0fff0" class="form-control" readonly id="fechaInicioSintomas" name="fechaInicioSintomas"
                                                           type="text" value="<fmt:formatDate value="${noti.fechaInicioSintomas}" pattern="dd/MM/yyyy" />"
                                                           placeholder=" <spring:message code="lbl.symptoms.start.date" />">
                                                </label>
                                                <span class="input-group-addon"><i class="fa fa-calendar fa-fw"></i></span>
                                            </div>
                                        </section>
                                    </div>



                                </fieldset>
                                </form:form>

                                <form:form  modelAttribute="tomaMx" id="registroMx" class="smart-form">
                                <fieldset>
                                    <legend class="text-left txt-color-blue font-md"> <spring:message
                                            code="lbl.taking.sample.data"/></legend>
                                    <div class="row">
                                        <section class="col col-sm-4 col-md-3 col-lg-3">
                                            <label class="text-left txt-color-blue font-md"><spring:message code="lbl.changeUs"/></label>

                                        </section>
                                        <section class="col col-sm-4 col-md-3 col-lg-2">
                                            <label class="checkbox">
                                                <input type="checkbox" name="ckChangeUS" id="ckChangeUS">
                                                <i></i>
                                            </label>
                                        </section>

                                    </div>

                                    <div id="dSilais" hidden="hidden"  class="row">
                                        <section class="col col-sm-12 col-md-6 col-lg-3">
                                            <i class="fa fa-fw fa-asterisk txt-color-red font-sm hidden-xs"></i>
                                            <label class="text-left txt-color-blue font-md hidden-xs">
                                                <spring:message code="sindfeb.silais" />
                                            </label>

                                            <div class="input-group">
                                                <span class="input-group-addon"> <i class="fa fa-list fa-fw"></i></span>

                                                <spring:message var="selectSilais" code="msg.select.silais" />

                                                <form:select name="codSilaisAtencion" id="codSilaisAtencion" data-placeholder="${selectSilais} " cssClass="select2" path="codSilaisAtencion">
                                                    <option value=""></option>
                                                    <form:options items="${entidades}" itemValue="codigo" itemLabel="nombre"/>
                                                </form:select>

                                            </div>
                                             </section>

                                            <%--<div class="input-group">
                                                <span class="input-group-addon"> <i class="fa fa-location-arrow"></i></span>
                                                <select data-placeholder="<spring:message code="act.select" /> <spring:message code="sindfeb.silais" />" name="codSilaisAtencion" id="codSilaisAtencion" class="select2">
                                                    <option value=""></option>
                                                    <c:forEach items="${entidades}" var="entidad">
                                                        <c:choose>
                                                            <c:when test="${entidad.codigo eq tomaMx.codSilaisAtencion.codigo}">
                                                                <option selected value="${entidad.codigo}">${entidad.nombre}</option>
                                                            </c:when>
                                                            <c:otherwise>
                                                                <option value="${entidad.codigo}">${entidad.nombre}</option>
                                                            </c:otherwise>
                                                        </c:choose>
                                                    </c:forEach>
                                                </select>
                                            </div>--%>

                                       <section class="col col-sm-12 col-md-6 col-lg-4">
                                            <i class="fa fa-fw fa-asterisk txt-color-red font-sm hidden-xs"></i>
                                            <label class="text-left txt-color-blue font-md hidden-xs">
                                                <spring:message code="sindfeb.muni" />
                                            </label>
                                            <div class="input-group">
                                                <span class="input-group-addon"> <i class="fa fa-location-arrow"></i></span>
                                                <select data-placeholder="<spring:message code="act.select" /> <spring:message code="sindfeb.muni" />" name="codMunicipio" id="codMunicipio" class="select2">
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </section>
                                        <section class="col col-sm-12 col-md-6 col-lg-5">
                                            <i class="fa fa-fw fa-asterisk txt-color-red font-sm hidden-xs"></i>
                                            <label class="text-left txt-color-blue font-md hidden-xs">
                                                <spring:message code="sindfeb.unidad" />
                                            </label>

                                            <div class="input-group">
                                                <span class="input-group-addon"> <i class="fa fa-list fa-fw"></i></span>

                                                <spring:message var="selectUS" code="msg.select.hu" />

                                                <form:select name="codUnidadAtencion" id="codUnidadAtencion" data-placeholder="${selectUS} " cssClass="select2" path="codUnidadAtencion">
                                                    <option value=""></option>

                                                </form:select>

                                            </div>

                                        </section>
                                       <%--     <div class="input-group">
                                                <span class="input-group-addon"> <i class="fa fa-location-arrow"></i></span>
                                                <select data-placeholder="<spring:message code="act.select" /> <spring:message code="sindfeb.unidad" />" name="codUnidadAtencion" id="codUnidadAtencion" class="select2">
                                                    <option value=""></option>
                                                    <c:forEach items="${uni}" var="us">
                                                        <c:choose>
                                                            <c:when test="${us.codigo eq  tomaMx.codUnidadAtencion.codigo}">
                                                                <option selected value="${us.codigo}">${us.nombre}</option>
                                                            </c:when>
                                                            <c:otherwise>
                                                                <option value="${us.codigo}">${us.nombre}</option>
                                                            </c:otherwise>
                                                        </c:choose>
                                                    </c:forEach>
                                                </select>
                                            </div>--%>

                                    </div>

                                    <div class="row">
                                        <input value="${noti.idNotificacion}" hidden="hidden" type="text" id="idNotificacion" name="idNotificacion"/>


                                        <section class="col col-3">
                                            <spring:message var="datet" code="lbl.sampling.date" />
                                            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i>
                                            <label  class="text-left txt-color-blue font-md">
                                                ${datet}
                                            </label>
                                            <div class="form-group">
                                                <div class='input-group'>
                                                    <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                    <label class="input">
                                                        <form:input name="fechaHTomaMx" id="fechaHTomaMx" path="fechaHTomaMx" type='text'
                                                                    class="form-control date-picker"
                                                                    placeholder="${datet}" data-date-end-date="+0d"/>
                                                    </label>
                                             <span class="input-group-addon"><span
                                                     class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                                </div>
                                            </div>
                                        </section>
                                        <section class="col col-3">
                                            <spring:message var="timeMx" code="lbl.sampling.time" />
                                            <label class="text-left txt-color-blue font-md">
                                                    ${timeMx}
                                            </label>
                                            <div class="form-group">
                                                <div class='input-group'>
                                                    <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                <label class="input">
                                                    <form:input id="horaTomaMx" name="horaTomaMx" path="horaTomaMx" type='text'
                                                           class="form-control"
                                                           placeholder="${timeMx}"/>
                                                </label>
                                                    <span class="input-group-addon"><i class="fa fa-clock-o fa-fw"></i></span>
                                                </div>
                                            </div>
                                        </section>
                                        <section class="col col-4">
                                            <spring:message var="sampleType" code="lbl.sample.type"/>
                                            <spring:message code="msj.select.type.sample" var="selectTMx" />
                                            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i>
                                            <label class="text-left txt-color-blue font-md">
                                            ${sampleType}
                                            </label>

                                            <div class="input-group">
                                                <span class="input-group-addon"> <i class="fa fa-list fa-fw"></i></span>

                                                <form:select name="codTipoMx" id="codTipoMx" data-placeholder="${selectTMx} " cssClass="select2" path="codTipoMx">
                                                    <option value=""></option>
                                                    <form:options items="${catTipoMx}" itemValue="tipoMx.idTipoMx" itemLabel="tipoMx.nombre"/>
                                                </form:select>

                                            </div>


                                        </section>

                                        <section class="col col-6">
                                            <spring:message var="testSampleType" code="lbl.dx.sample.type"/>
                                            <i class="fa fa-fw fa-asterisk txt-color-red font-sm"></i>
                                            <label class="text-left txt-color-blue font-md">
                                            ${testSampleType}

                                            </label>



                                            <div class="input-group">
                                                <spring:message code="msj.select.dx" var="selectDx" />
                                                <span class="input-group-addon"> <i class="fa fa-file-text-o"></i></span>
                                                <select name="dx" data-placeholder="${selectDx}" id="dx" multiple style="width:100%" class="select2">
                                                </select>
                                            </div>
                                        </section>
                                    </div>
                                    <div class="row">
                                        <section class="col col-3">
                                            <spring:message var="nTubes" code="lbl.number.tubes" />

                                            <label class="text-left txt-color-blue font-md">
                                                ${nTubes}
                                            </label>


                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-pencil fa-fw"></i></span>
                                                <label class="input">

                                                    <form:input name="canTubos" id="canTubos" path="canTubos" class="form-control entero" type="text"
                                                           placeholder="${nTubes} "/>

                                                </label>
                                                <span class="input-group-addon"><i class="fa fa-sort-numeric-asc fa-fw"></i></span>
                                            </div>
                                        </section>
                                        <section class="col col-3">
                                            <spring:message var="volume" code="lbl.volume" />
                                            <label class="text-left txt-color-blue font-md">
                                            ${volume}
                                            </label>

                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-pencil fa-fw"></i></span>
                                                <label class="input">
                                                    <form:input path="volumen" id="volumen" name="volumen" class="decimal"  type="text"
                                                           placeholder="${volume}" />

                                                </label>
                                                <span class="input-group-addon"><i class="fa fa-sort-numeric-asc fa-fw"></i></span>
                                            </div>


                                        </section>
                                        <section class="col col-3">
                                            <spring:message var="coolingTime" code="cooling.time" />
                                            <label class="text-left txt-color-blue font-md">
                                            ${coolingTime}
                                            </label>


                                            <div class="form-group">

                                                <div class='input-group date'>
                                                    <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                    <label class="input">
                                                        <form:input id="horaRefrigeracion" name="horaRefrigeracion" path="horaRefrigeracion" type='text'
                                                                    class="form-control"
                                                                    placeholder="${coolingTime} "/>
                                                        <b class="tooltip tooltip-bottom-right"> <i class="fa fa-warning txt-color-pink"></i> <spring:message code="msg.enter.cooling.time"/></b>

                                                    </label>
                                             <span class="input-group-addon"><span
                                                     class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                                </div>
                                            </div>
                                        </section>

                                        <section class="col col-3">
                                            <label class="text-left txt-color-blue font-md">
                                             <spring:message code="sample.separation" />
                                            </label>

                                            <div class="inline-group">
                                                <label class="radio"> <form:radiobutton path="mxSeparada" value="1" name="mxSeparada"/>
                                                    <i></i><spring:message code="lbl.yes"/></label>
                                                <label class="radio"> <form:radiobutton path="mxSeparada" value="0" name="mxSeparada"/>
                                                    <i></i><spring:message code="lbl.no"/></label>

                                            </div>
                                        </section>
                                    </div>
                                       <footer style="background-color:white;">

                                      <button type="button" id="submit" class="btn btn-success fc-header-center">
                                            <spring:message code="act.save"  />

                                        </button>
                                           <button type="button" id="back" class="btn btn-danger fc-header-center">
                                               <spring:message code="act.cancel"  />
                                           </button>
                                    </footer>
                                </fieldset>

                                    <input type="hidden" id="disappear"  value="<spring:message code="lbl.messagebox.disappear"/>"/>
                                    <input type="hidden" id="msjError"  value="<spring:message code="lbl.messagebox.error.completing"/>"/>
                                    <input type="hidden" id="msjErrorSaving"  value="<spring:message code="lbl.messagebox.error.saving"/>"/>
                                    <input type="hidden" id="msjSuccessful"  value="<spring:message code="lbl.messagebox.successful.saved"/>"/>
                                </form:form>


								</div>
								<!-- end widget content -->
							</div>
							<!-- end widget div -->
						</div>
						<!-- end widget -->
					</article>
					<!-- WIDGET END -->
				</div>
				<!-- end row -->
			</section>
			<!-- end widget grid -->
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
	<!-- JQUERY BOOTSTRAP WIZARD -->
	<spring:url value="/resources/js/plugin/bootstrap-wizard/jquery.bootstrap.wizard.min.js" var="jqueryBootstrap" />
	<script src="${jqueryBootstrap}"></script>
	<!-- JQUERY FUELUX WIZARD -->
	<spring:url value="/resources/js/plugin/fuelux/wizard/wizard.min.js" var="jQueryFueWiz" />
	<script src="${jQueryFueWiz}"></script>
	<!-- JQUERY VALIDATE -->
	<spring:url value="/resources/js/plugin/jquery-validate/jquery.validate.min.js" var="jqueryValidate" />
	<script src="${jqueryValidate}"></script>
	<spring:url value="/resources/js/plugin/jquery-validate/messages_{language}.js" var="jQValidationLoc">
	<spring:param name="language" value="${pageContext.request.locale.language}" /></spring:url>				
	<script src="${jQValidationLoc}"></script>
	<!-- jQuery Select2 Input -->
	<spring:url value="/resources/js/plugin/select2/select2.min.js" var="selectPlugin"/>
	<script src="${selectPlugin}"></script>
	<!-- jQuery Select2 Locale -->
	<spring:url value="/resources/js/plugin/select2/select2_locale_{language}.js" var="selectPluginLocale">
	<spring:param name="language" value="${pageContext.request.locale.language}" /></spring:url>
	<script src="${selectPluginLocale}"></script>
	<!-- JQUERY BLOCK UI -->
	<spring:url value="/resources/js/plugin/jquery-blockui/jquery.blockUI.js" var="jqueryBlockUi" />
	<script src="${jqueryBlockUi}"></script>
	<!-- bootstrap datepicker -->
	<spring:url value="/resources/js/plugin/bootstrap-datepicker/bootstrap-datepicker.js" var="datepickerPlugin" />
	<script src="${datepickerPlugin}"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<spring:url value="/resources/scripts/utilidades/seleccionUnidad.js" var="selecUnidad" />
	<script src="${selecUnidad}"></script>
	<spring:url value="/resources/scripts/muestras/enter-form.js" var="enterFormTomaMx" />
	<script src="${enterFormTomaMx}"></script>
	<spring:url value="/resources/scripts/utilidades/handleDatePickers.js" var="handleDatePickers" />
	<script src="${handleDatePickers}"></script>
    <!-- bootstrap datetimepicker -->
    <!-- bootstrap datetimepicker -->
    <spring:url value="/resources/js/plugin/bootstrap-datetimepicker-4/moment-with-locales.js" var="moment" />
    <script src="${moment}"></script>
    <spring:url value="/resources/js/plugin/bootstrap-datetimepicker-4/bootstrap-datetimepicker.js" var="datetimepicker" />
    <script src="${datetimepicker}"></script>
    <!-- JQUERY INPUT MASK -->
    <spring:url value="/resources/js/plugin/jquery-inputmask/jquery.inputmask.bundle.min.js" var="jqueryInputMask" />
    <script src="${jqueryInputMask}"></script>
    <spring:url value="/resources/scripts/utilidades/handleInputMask.js" var="handleInputMask" />
    <script src="${handleInputMask}"></script>

	<!-- END PAGE LEVEL SCRIPTS -->
	<!-- PARAMETROS LENGUAJE -->
	<c:set var="blockMess"><spring:message code="blockUI.message" /></c:set>
    <spring:url value="/tomaMx/dxByMx" var="dxUrl"/>
    <spring:url value="/tomaMx/saveToma" var="saveTomaUrl"/>
    <spring:url value="/tomaMx/search" var="searchUrl"/>
    <spring:url var="municipiosURL" value="/api/v1/municipiosbysilais"/>
    <spring:url var="unidadesUrl"   value="/api/v1/unidadesPrimHosp"  />
    <spring:url value="/tomaMx/validateTomaMx" var="validateUrl"/>

    <script type="text/javascript">
        $(document).ready(function() {
            pageSetUp();
            var parametros = {blockMess: "${blockMess}",
                             dxUrl: "${dxUrl}",
                              saveTomaUrl: "${saveTomaUrl}",
                              searchUrl: "${searchUrl}",
                              municipiosUrl:"${municipiosURL}",
                              unidadesUrl: "${unidadesUrl}",
                validateUrl: "${validateUrl}"
            };
            EnterFormTomaMx.init(parametros);
            SeleccionUnidad.init(parametros);
            handleInputMasks();
            handleDatePickers("${pageContext.request.locale.language}");
            $("li.samples").addClass("open");
            $("li.tomaMx").addClass("active");
            if("top"!=localStorage.getItem("sm-setmenu")){
                $("li.tomaMx").parents("ul").slideDown(200);
            }
        });
    </script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>