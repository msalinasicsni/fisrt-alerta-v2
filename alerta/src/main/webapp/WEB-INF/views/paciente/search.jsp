<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
				<li><a href="<spring:url value="/" htmlEscape="true "/>"><spring:message code="menu.home" /></a> <i class="fa fa-angle-right"></i> <a href="<spring:url value="/paciente/create" htmlEscape="true "/>"><spring:message code="menu.paciente" /></a></li>
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
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<h1 class="page-title txt-color-blueDark">
						<!-- PAGE HEADER -->
						<i class="fa-fw fa fa-fire"></i> 
							<spring:message code="menu.paciente" />
						<span> <i class="fa fa-angle-right"></i>  
							<spring:message code="person.search" />
						</span>
					</h1>
				</div>
				<!-- end col -->
			</div>
			<!-- end row -->
			<!-- widget grid -->
			<section id="widget-grid" class="">
				<!-- row -->
				<div class="row">
					<!-- NEW WIDGET START -->
					<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<!-- Widget ID (each widget will need unique ID)-->
						<div class="jarviswidget jarviswidget-color-darken" id="wid-id-0">
							<header>
								<span class="widget-icon"> <i class="fa fa-search"></i> </span>
								<h2><spring:message code="lbl.parameters" /> </h2>				
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
								<div class="widget-body no-padding">
									<form id="search-form" class="smart-form" autocomplete="off">
										<fieldset>
											<section>
												<label class="input"> <i class="icon-append fa fa-check"></i>
													<input type="text" id="filtro" name="filtro" placeholder="<spring:message code="person.search.parameters"/>">
													<b class="tooltip tooltip-bottom-right"><spring:message code="person.search.parameters"/></b> </label>
											</section>
										</fieldset>
										<footer>
											<button type="submit" id="search-person" class="btn btn-info"><i class="fa fa-search"></i> <spring:message code="act.search" /></button>
										</footer>
									</form>						
								</div>
								<!-- end widget content -->
							</div>
							<!-- end widget div -->
						</div>
						<!-- end widget -->
					</article>
					<!-- WIDGET END -->
					<!-- NEW WIDGET START -->
					<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<!-- Widget ID (each widget will need unique ID)-->
						<div class="jarviswidget jarviswidget-color-darken" id="wid-id-1">
							<header>
								<span class="widget-icon"> <i class="fa fa-reorder"></i> </span>
								<h2><spring:message code="lbl.results" /> </h2>				
							</header>
							<!-- widget div-->
							<div>
								<!-- widget edit box -->
								<div class="jarviswidget-editbox">
									<!-- This area used as dropdown edit box -->
									<input class="form-control" type="text">	
								</div>
                                <input id="smallBox_content" type="hidden" value="<spring:message code="smallBox.content.4s"/>"/>
                                <input id="msg_no_results_found" type="hidden" value="<spring:message code="msg.ento.no.results.found"/>"/>
								<!-- end widget edit box -->
								<!-- widget content -->
								<div class="widget-body no-padding">
									<table id="persons_result" class="table table-striped table-bordered table-hover" width="100%">
										<thead>			                
											<tr>
												<th data-class="expand"><i class="fa fa-fw fa-key text-muted hidden-md hidden-sm hidden-xs"></i> <spring:message code="person.id"/></th>
												<th data-hide="phone"><i class="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs"></i> <spring:message code="person.name1"/></th>
												<th data-hide="phone,tablet"><i class="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs"></i> <spring:message code="person.name2"/></th>
												<th data-hide="phone"><i class="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs"></i> <spring:message code="person.lastname1"/></th>
												<th data-hide="phone,tablet"><i class="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs"></i> <spring:message code="person.lastname2"/></th>
												<th data-hide="phone"><i class="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"></i> <spring:message code="person.fecnac"/></th>
                                                <th data-hide="phone"><i class="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"></i> <spring:message code="lbl.age"/></th>
												<th data-hide="phone,tablet"><i class="fa fa-fw fa-map-marker text-muted hidden-md hidden-sm hidden-xs"></i> <spring:message code="person.mun.res"/></th>
												<th></th>
											</tr>
										</thead>
									</table>
                                    <form id="paginate-form" class="smart-form" autocomplete="off">
                                        <footer>
                                            <button type="button" title="<spring:message code="lbl.next"/>" id="next" class="btn btn-info"><i class="fa fa-fast-forward"></i></button>
                                            <button type="button" title="<spring:message code="lbl.previous"/>" id="prev" class="btn btn-info"><i class="fa fa-fast-backward"></i></button>
                                        </footer>
                                    </form>
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
				<!-- row -->
				<div class="row">
					<!-- a blank row to get started -->
					<div class="col-sm-12">
						<!-- your contents here -->
					</div>
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
	<spring:url value="/resources/js/plugin/jquery-validate/jquery.validate.min.js" var="jqueryValidate" />
	<script src="${jqueryValidate}"></script>
	<spring:url value="/resources/js/plugin/jquery-validate/messages_{language}.js" var="jQValidationLoc">
	<spring:param name="language" value="${pageContext.request.locale.language}" /></spring:url>				
	<script src="${jQValidationLoc}"></script>
	<!-- JQUERY BLOCK UI -->
	<spring:url value="/resources/js/plugin/jquery-blockui/jquery.blockUI.js" var="jqueryBlockUi" />
	<script src="${jqueryBlockUi}"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<spring:url value="/resources/scripts/personas/person-search.js" var="personSearch" />
	<script src="${personSearch}"></script>
    <spring:url value="/resources/scripts/utilidades/calcularEdad.js" var="edadJS" />
    <script src="${edadJS}"></script>
    <!-- END PAGE LEVEL SCRIPTS -->
	<spring:url value="/personas/persons" var="sPersonUrl"/>
	<spring:url value="/paciente/search" var="sActionUrl"/>
	<c:set var="blockMess"><spring:message code="blockUI.message" /></c:set>
	<script type="text/javascript">
		$(document).ready(function() {
			pageSetUp();
			var parametros = {sPersonUrl: "${sPersonUrl}",
					sActionUrl: "${sActionUrl}",
					blockMess:"${blockMess}"};
			SearchPerson.init(parametros);
	    	$("li.notificacion").addClass("open");
	    	$("li.paciente").addClass("active");
	    	if("top"!=localStorage.getItem("sm-setmenu")){
	    		$("li.paciente").parents("ul").slideDown(200);
	    	}
		});
	</script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>