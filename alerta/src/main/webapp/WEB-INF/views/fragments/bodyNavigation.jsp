<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- Left panel : Navigation area -->
<!-- Note: This width of the aside area can be adjusted through LESS variables -->
<%@ page import="ni.gob.minsa.alerta.service.SeguridadService" %>
<%
    SeguridadService seguridadService = new SeguridadService();
    boolean seguridadHabilitada = seguridadService.seguridadHabilitada();
%>
<aside id="left-panel">
    <!-- User info -->
    <div class="login-info">
	<span> <!-- User image size is adjusted inside CSS, it should stay as it -->
		<spring:url value="/resources/img/user.png" var="user" />
		<a href="javascript:void(0);" id="show-shortcut" data-action="toggleShortcut">
            <img src="${user}" alt="<spring:message code="lbl.user" />" class="online" />
			<span>
            <%if (seguridadHabilitada) {%>
				<%=seguridadService.obtenerNombreUsuario(request)%>
            <% } else { %>
                <spring:message code="lbl.user" />
            <% } %>
			</span>
            <i class="fa fa-angle-down"></i>
        </a>

	</span>
    </div>
    <!-- end user info -->
    <!-- NAVIGATION : This navigation is also responsive
    To make this navigation dynamic please make sure to link the node
    (the reference to the nav > ul) after page load. Or the navigation
    will not initialize.
    -->
    <nav>
        <!-- NOTE: Notice the gaps after each icon usage <i></i>..
        Please note that these links work a bit different than
        traditional href="" links. See documentation for details.
        -->

        <ul>
            <%if (seguridadHabilitada) {%>
            <%=seguridadService.obtenerMenu(request)%>
            <% } else { %>
            <li class="home">
                <a href="<spring:url value="/" htmlEscape="true "/>" title="<spring:message code="menu.home" />"><i class="fa fa-lg fa-fw fa-home"></i> <span class="menu-item-parent"><spring:message code="menu.home" /></span></a>
            </li>
            <li class="mantenimiento">
                <a href="#" title="<spring:message code="menu.admon" />"><i class="fa fa-lg fa-fw fa-cogs"></i> <span class="menu-item-parent"><spring:message code="menu.admon" /></span></a>
                <ul>
                    <li class="personas">
                        <a href="<spring:url value="/personas/search" htmlEscape="true "/>" title="<spring:message code="menu.persons" />"><i class="fa fa-lg fa-fw fa-group"></i> <spring:message code="menu.persons" /></a>
                    </li>
                    <li class="studiesUS">
                        <a href="<spring:url value="/administracion/studiesUS/init" htmlEscape="true "/>" title="<spring:message code="lbl.studiesbyUS" />"><i class="fa fa-lg fa-fw fa-link"></i> <spring:message code="lbl.studiesbyUS" /></a>
                    </li>
                    <li class="patoGroup">
                        <a href="<spring:url value="/administracion/patogroup/init" htmlEscape="true "/>" title="<spring:message code="lbl.pathologies.grouped" />"><i class="fa fa-lg fa-fw fa-link"></i> <spring:message code="lbl.pathologies.grouped" /></a>
                    </li>
                </ul>
            </li>
            <li class="notificacion">
                <a href="#" title="<spring:message code="menu.notif" />"><i class="fa fa-lg fa-fw fa-rss"></i> <span class="menu-item-parent"><spring:message code="menu.notif" /></span></a>
                <ul>
                    <li class="sindfeb">
                        <a href="<spring:url value="/febriles/create" htmlEscape="true "/>" title="<spring:message code="menu.sindfeb" />"><i class="fa fa-lg fa-fw fa-fire"></i> <spring:message code="menu.sindfeb" /></a>
                    </li>
                    <li class="irageti">
                        <a href="<spring:url value="/irag/create" htmlEscape="true "/>" title="<spring:message code="menu.irageti" />"><i class="fa fa-lg fa-fw fa-stethoscope"></i> <spring:message code="menu.irageti" /></a>
                    </li>
                    <li class="vih">
                        <a href="<spring:url value="/vih/search" htmlEscape="true "/>" title="<spring:message code="menu.vih" />"><i class="fa fa-lg fa-fw fa-flask"></i> <spring:message code="menu.vih" /></a>
                    </li>
                    <li class="paciente">
                        <a href="<spring:url value="/paciente/create" htmlEscape="true "/>" title="<spring:message code="menu.paciente" />"><i class="fa fa-lg fa-fw fa-user"></i> <spring:message code="menu.paciente" /></a>
                    </li>
		            <li class="rotavirus">
                        <a href="<spring:url value="/rotavirus/create" htmlEscape="true "/>" title="<spring:message code="menu.rotavirus" />"><i class="fa fa-lg fa-fw fa-stethoscope"></i> <spring:message code="menu.rotavirus" /></a>
                    </li>
                    <li class="buscar">
                        <a href="<spring:url value="/reportes/generalnoti" htmlEscape="true "/>" title="<spring:message code="menu.reports.general" />"><i class="fa fa-lg fa-fw fa-search"></i> <spring:message code="menu.reports.general" /></a>
                    </li>
                </ul>
            </li>
            <li class="notificacionD">
                <a href="#" title="<spring:message code="menu.daily.reporting" />"><i class="fa fa-lg fa-fw fa-file"></i> <span class="menu-item-parent"><spring:message code="menu.daily.reporting" /></span></a>
                <ul>
                    <li class="createNotiD">
                        <a href="<spring:url value="/notificacionDiaria/init" htmlEscape="true "/>" title="<spring:message code="menu.create.edit.notiD" />"><i class="fa fa-lg fa-fw fa-edit"></i> <spring:message code="menu.create.edit.notiD" /></a>
                    </li>
                    <li class="buscarNotiD">
                        <a href="<spring:url value="/notificacionDiaria/initSearch" htmlEscape="true "/>" title="<spring:message code="menu.search.notiD" />"><i class="fa fa-lg fa-fw fa-search"></i> <spring:message code="menu.search.notiD" /></a>
                    </li>
                </ul>
            </li>

            <li class="samples">
                <a href="#" title="<spring:message code="menu.samples" />"><i class="fa fa-lg fa-fw fa-flask"></i> <span class="menu-item-parent"><spring:message code="menu.samples" /></span></a>
                <ul>
                    <li class="tomaMx">
                        <a href="<spring:url value="/tomaMx/search" htmlEscape="true "/>" title="<spring:message code="menu.taking.sample" />"><i class="fa fa-lg fa-fw fa-eyedropper"></i> <spring:message code="menu.taking.sample" /></a>
                    </li>
                    <li class="tomaMxEstu">
                        <a href="<spring:url value="/tomaMx/searchStudy" htmlEscape="true "/>" title="<spring:message code="menu.taking.sample.study" />"><i class="fa fa-lg fa-fw fa-eyedropper"></i> <spring:message code="menu.taking.sample.study" /></a>
                    </li>
                    <li class="envioMx">
                        <a href="<spring:url value="/envioMx/create" htmlEscape="true "/>" title="<spring:message code="menu.send.dx.orders" />"><i class="fa fa-lg fa-fw fa-send-o"></i> <spring:message code="menu.send.dx.orders" /></a>
                    </li>
                    <li class="searchMx">
                        <a href="<spring:url value="/tomaMx/searchMx/init" htmlEscape="true "/>" title="<spring:message code="menu.search.mx" />"><i class="fa fa-lg fa-fw fa-search"></i> <spring:message code="menu.search.mx" /></a>
                    </li>
                </ul>
            </li>
            <li class="entomologia">
                <a href="#" title="<spring:message code="menu.ento" />"><i class="fa fa-lg fa-fw fa-bug"></i> <span class="menu-item-parent"><spring:message code="menu.ento" /></span></a>
                <ul>
                    <li class="entoadd">
                        <a href="#" title="<spring:message code="menu.ento.add" />"><i class="fa fa-lg fa-fw fa-pencil"></i> <spring:message code="menu.ento.add" /></a>
                        <ul>
                            <li class="entoaddaedes">
                                <a href="<spring:url value="/encuesta/create/aedes" htmlEscape="true "/>" title="<spring:message code="menu.ento.add.aedes" />"><i class="fa fa-lg fa-fw fa-bug"></i> <spring:message code="menu.ento.add.aedes" /></a>
                            </li>
                            <li class="entoaddlarvae">
                                <a href="<spring:url value="/encuesta/create/larvae" htmlEscape="true "/>" title="<spring:message code="menu.ento.add.larvae" />"><i class="fa fa-lg fa-fw fa-vine"></i> <spring:message code="menu.ento.add.larvae" /></a>
                            </li>
                            <li class="entoadddep">
                                <a href="<spring:url value="/encuesta/create/dep" htmlEscape="true "/>" title="<spring:message code="menu.ento.add.dep" />"><i class="fa fa-lg fa-fw fa-archive"></i> <spring:message code="menu.ento.add.dep" /></a>
                            </li>
                        </ul>
                    </li>
                    <li class="entosearch">
                        <a href="<spring:url value="/encuesta/search" htmlEscape="true "/>" title="<spring:message code="menu.ento.search" />"><i class="fa fa-lg fa-fw fa-search"></i> <spring:message code="menu.ento.search" /></a>
                    </li>
                </ul>
            </li>
            <li class="analisis"><a href="#"> <i class="fa fa-lg fa-fw fa-bar-chart-o"></i> <span class="menu-item-parent"><fmt:message key="analysis" /></span></a>
				<ul>
					<li><a href="#"> <i class=""></i> <span
							class="menu-item-parent"><fmt:message key="descriptive" /></span>
                    </a>
						<ul>
							<li class = "agesex"><a href="<spring:url value="/analisis/agesex/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="agesex" /></span></a>
							<li class = "anasex"><a href="<spring:url value="/analisis/anasex/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="sex" /></span></a>
							<li class = "anapato"><a href="<spring:url value="/analisis/anapato/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="pato" /></span></a>
						</ul>
                    </li>
					<li><a href="#"> <i class="obsesp"></i> <span
							class="menu-item-parent"><fmt:message key="obsexp" /></span>
					</a>
						<ul>
							<li class = "casostasas"><a href="<spring:url value="/analisis/casostasas/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="numandrate" /></span></a>
                            <li class = "casostasasarea"><a href="<spring:url value="/analisis/casostasasarea/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="numandratebyarea" /></span></a>
                            <li class = "razones"><a href="<spring:url value="/analisis/razones/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="ratioandindex" /></span></a>
							<li class = "corredores"><a href="<spring:url value="/analisis/corredores/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="endemic" /></span></a>
							<li class = "indice"><a href="<spring:url value="/analisis/indice/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="epiindex" /></span></a>
						</ul>
                    </li>
					<li class="boletin" ><a href="<spring:url value="/boletin/init/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="bol" /></span></a></li>
					<li class = "series"><a href="<spring:url value="/analisis/series/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="series" /></span></a></li>
					<li class= "mapas"><a href="<spring:url value="/analisis/mapas/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="maps" /></span></a></li>
					<li class = "piramides"><a href="<spring:url value="/analisis/piramides/" htmlEscape="true" />"> <i class=""></i> <span class=""><fmt:message key="pyram" /></span></a></li>
				</ul>
			</li>

            <li class="reportes">
                <a href="#" title="<spring:message code="menu.reports" />"><i class="fa fa-lg fa-fw fa fa-line-chart"></i> <span class="menu-item-parent"><spring:message code="menu.reports" /></span></a>
                <ul>
                    <li>
                        <a href="#" title="<spring:message code="menu.reports.notification" />"><spring:message code="menu.reports.notification" /></a>
                        <ul>
                            <li class="area">
                                <a href="<spring:url value="/reportes/area" htmlEscape="true "/>" title="<spring:message code="menu.report.by.area" />"><i class=""></i> <spring:message code="menu.report.by.area" /></a>
                            </li>
                            <li class="week">
                                <a href="<spring:url value="/reportes/porSemana" htmlEscape="true "/>" title="<spring:message code="menu.weekly.report" />"> <spring:message code="menu.weekly.report" /></a>
                            </li>
                            <li class="day">
                                <a href="<spring:url value="/reportes/porDia" htmlEscape="true "/>" title="<spring:message code="menu.report.per.day" />"> <spring:message code="menu.report.per.day" /></a>
                            </li>
                            <li class="withoutRes">
                                <a href="<spring:url value="/reportes/sinResultado" htmlEscape="true "/>" title="<spring:message code="menu.notifications.without.result" />"> <spring:message code="menu.notifications.without.result" /></a>
                            </li>
                            <li class="result">
                                <a href="<spring:url value="/reportes/reportResult" htmlEscape="true "/>" title="<spring:message code="menu.report.result" />"><i class=""></i> <spring:message code="menu.report.result" /></a>
                            </li>
                            <li class="resultDx">
                                <a href="<spring:url value="/reportes/reportResultDx" htmlEscape="true "/>" title="<spring:message code="menu.report.result.dx" />"><i class=""></i> <spring:message code="menu.report.result.dx" /></a>
                            </li>
                            <li class="posNegResultsReport">
                                <a href="<spring:url value="/reportes/posNegResults/init" htmlEscape="true "/>" title="<spring:message code="lbl.posNegReport" />"><spring:message code="lbl.posNegReport" /></a>
                            </li>
                            <li class="sex">
                                <a href="<spring:url value="/reportes/genderReport" htmlEscape="true "/>" title="<spring:message code="menu.report.sex" />"><i class=""></i> <spring:message code="menu.report.sex" /></a>
                            </li>
                            <li class="resultDxVig">
                                <a href="<spring:url value="/reports/reportResultDxVig/init" htmlEscape="true "/>" title="<spring:message code="menu.report.result.dx.vig" />"> <spring:message code="menu.report.result.dx.vig" /></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" title="<spring:message code="menu.reports.home" />"><spring:message code="menu.reports.home" /></a>
                        <ul>
                            <li class="homearea">
                                <a href="<spring:url value="/reportesPorResidencia/area" htmlEscape="true "/>" title="<spring:message code="menu.report.by.area" />"><i class=""></i> <spring:message code="menu.report.by.area" /></a>
                            </li>
                            <li class="homeweek">
                                <a href="<spring:url value="/reportesPorResidencia/porSemana" htmlEscape="true "/>" title="<spring:message code="menu.weekly.report" />"> <spring:message code="menu.weekly.report" /></a>
                            </li>
                            <li class="homeday">
                                <a href="<spring:url value="/reportesPorResidencia/porDia" htmlEscape="true "/>" title="<spring:message code="menu.report.per.day" />"> <spring:message code="menu.report.per.day" /></a>
                            </li>
                            <li class="homewithoutRes">
                                <a href="<spring:url value="/reportesPorResidencia/sinResultado" htmlEscape="true "/>" title="<spring:message code="menu.notifications.without.result" />"> <spring:message code="menu.notifications.without.result" /></a>
                            </li>
                            <li class="homeresult">
                                <a href="<spring:url value="/reportesPorResidencia/reportResult" htmlEscape="true "/>" title="<spring:message code="menu.report.result" />"><i class=""></i> <spring:message code="menu.report.result" /></a>
                            </li>
                            <li class="homeResultDx">
                                <a href="<spring:url value="/reportesPorResidencia/reportResultDx" htmlEscape="true "/>" title="<spring:message code="menu.report.result.dx" />"><i class=""></i> <spring:message code="menu.report.result.dx" /></a>
                            </li>
                            <li class="homeposnegresults">
                                <a href="<spring:url value="/reportesPorResidencia/posNegResults/init" htmlEscape="true "/>" title="<spring:message code="lbl.posNegReport" />"><spring:message code="lbl.posNegReport" /></a>
                            </li>
                            <li class="homesex">
                                <a href="<spring:url value="/reportesPorResidencia/genderReport" htmlEscape="true "/>" title="<spring:message code="menu.report.sex" />"><i class=""></i> <spring:message code="menu.report.sex" /></a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>

            <li>
                <a href="<spring:url value="/logout" htmlEscape="true "/>"> <i class="fa fa-lg fa-fw fa-sign-out"></i> <span class="menu-item-parent"><spring:message code="menu.logout" /></span></a>
            </li>
            <% } %>
        </ul>

    </nav>

<span class="minifyme" data-action="minifyMenu">
	<i class="fa fa-arrow-circle-left hit"></i>
</span>
</aside>
<!-- END NAVIGATION -->