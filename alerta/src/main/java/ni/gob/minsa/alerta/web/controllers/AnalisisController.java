package ni.gob.minsa.alerta.web.controllers;

import ni.gob.minsa.alerta.domain.agrupaciones.Grupo;
import ni.gob.minsa.alerta.domain.estructura.EntidadesAdtvas;
//import ni.gob.minsa.alerta.domain.poblacion.Divisionpolitica;
import ni.gob.minsa.alerta.domain.sive.SivePatologias;
import ni.gob.minsa.alerta.restServices.CallRestServices;
import ni.gob.minsa.alerta.restServices.entidades.Catalogo;
import ni.gob.minsa.alerta.restServices.entidades.Departamento;
import ni.gob.minsa.alerta.service.*;
import ni.gob.minsa.alerta.utilities.ConstantsSecurity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.List;

/**
 * Controlador web de peticiones relacionadas a analisis
 * 
 * @author William Aviles
 */
@Controller
@RequestMapping("/analisis/*")
public class AnalisisController {
	private static final Logger logger = LoggerFactory.getLogger(AnalisisController.class);
	@Resource(name="entidadAdmonService")
	private EntidadAdmonService entidadAdmonService;
	@Resource(name="catalogosService")
	private CatalogoService catalogosService;
	@Resource(name="analisisService")
	private AnalisisService analisisService;
	@Resource(name="sivePatologiasService")
	private SivePatologiasService sivePatologiasService;
	@Resource(name="divisionPoliticaService")
	private DivisionPoliticaService divisionPoliticaService;
    @Resource(name="seguridadService")
    private SeguridadService seguridadService;
    @Resource(name="admonPatoGroupService")
    private AdmonPatoGroupService admonPatoGroupService;

	@RequestMapping(value = "series", method = RequestMethod.GET)
    public String initSeriesPage(Model model, HttpServletRequest request) throws Exception {
        logger.debug("presentar series temporales");
        String urlValidacion = "";
        try {
            urlValidacion = seguridadService.validarLogin(request);
            //si la url esta vacia significa que la validaci�n del login fue exitosa
            if (urlValidacion.isEmpty())
                urlValidacion = seguridadService.validarAutorizacionUsuario(request, ConstantsSecurity.SYSTEM_CODE, false);
        } catch (Exception e) {
            e.printStackTrace();
            urlValidacion = "404";
        }
        if (urlValidacion.isEmpty()) {

            long idUsuario = seguridadService.obtenerIdUsuario(request);
            List<EntidadesAdtvas> entidades = seguridadService.obtenerEntidadesPorUsuario((int) idUsuario, ConstantsSecurity.SYSTEM_CODE);
            //List<Divisionpolitica> departamentos = divisionPoliticaService.getAllDepartamentos();
            List<Departamento> departamentos = CallRestServices.getDepartamentos();
            //List<AreaRep> areas = catalogosService.getAreaRep();
            //List<AreaRep> areas = seguridadService.getAreasUsuario((int) idUsuario, 3);

            List<Catalogo> areasList = CallRestServices.getCatalogos("AREAREP");
            List<Catalogo> areas = seguridadService.getAreasUsuario((int) idUsuario, 3, areasList);

            List<SivePatologias> patologias = sivePatologiasService.getSivePatologias();
            //List<ZonaEspecial> zonas = catalogosService.getZonasEspeciales();
            List<Catalogo> zonas = CallRestServices.getCatalogos("ZONACM");
            List<Grupo> grupos = admonPatoGroupService.getGrupos();
            model.addAttribute("areas", areas);
            model.addAttribute("entidades", entidades);
            model.addAttribute("departamentos", departamentos);
            model.addAttribute("patologias", patologias);
            model.addAttribute("zonas",zonas);
            model.addAttribute("grupos",grupos);
            return "analisis/series";
        } else {
            return urlValidacion;
        }
    }
	
	/**
     * Retorna una lista de datos. Acepta una solicitud GET para JSON
     * @return Un arreglo JSON
	 * @throws ParseException 
     */
    @RequestMapping(value = "seriesdata", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody List<Object[]> fetchSeriesDataJson(@RequestParam(value = "codPato", required = true) String codPato,
    		@RequestParam(value = "codArea", required = true) String codArea,
    		@RequestParam(value = "codSilaisAtencion", required = false) Long codSilais,
    		@RequestParam(value = "codDepartamento", required = false) Long codDepartamento,
    		@RequestParam(value = "codMunicipio", required = false) Long codMunicipio,
    		@RequestParam(value = "codUnidadAtencion", required = false) Long codUnidad,
            @RequestParam(value = "ckUS", required = false) boolean subunidades,
            @RequestParam(value = "codZona", required = false) String codZona) throws ParseException {
        logger.info("Obteniendo los datos de series temporales en JSON");
        List<Object[]> datos = analisisService.getDataSeries(codPato, codArea, codSilais, codDepartamento, codMunicipio, codUnidad, codZona, subunidades);
        if (datos == null){
        	logger.debug("Nulo");
        }
        return datos;
    }   
    
    @RequestMapping(value = "mapas", method = RequestMethod.GET)
    public String initMapasPage(Model model, HttpServletRequest request) throws Exception {
		logger.debug("presentar mapas");
        String urlValidacion = "";
        try {
            urlValidacion = seguridadService.validarLogin(request);
            //si la url esta vacia significa que la validaci�n del login fue exitosa
            if (urlValidacion.isEmpty())
                urlValidacion = seguridadService.validarAutorizacionUsuario(request, ConstantsSecurity.SYSTEM_CODE, false);
        } catch (Exception e) {
            e.printStackTrace();
            urlValidacion = "404";
        }
        if (urlValidacion.isEmpty()) {
        long idUsuario = seguridadService.obtenerIdUsuario(request);
		List<EntidadesAdtvas> entidades = seguridadService.obtenerEntidadesPorUsuario((int) idUsuario, ConstantsSecurity.SYSTEM_CODE);
    	//List<Divisionpolitica> departamentos = divisionPoliticaService.getAllDepartamentos();
        List<Departamento> departamentos = CallRestServices.getDepartamentos();
    	/*List<AreaRep> areas = new ArrayList<AreaRep>();
        areas.add(catalogosService.getAreaRep("AREAREP|PAIS"));
        areas.add(catalogosService.getAreaRep("AREAREP|SILAIS"));*/
        //List<AreaRep> areas = seguridadService.getAreasUsuario((int)idUsuario,4);
        List<Catalogo> areasList = CallRestServices.getCatalogos("AREAREP");
        List<Catalogo> areas = seguridadService.getAreasUsuario((int) idUsuario, 4, areasList);
    	//List<Semanas> semanas = catalogosService.getSemanas();
        List<Catalogo> semanas = CallRestServices.getCatalogos("SEMANASEPI");
    	//List<Anios> anios = catalogosService.getAnios();
        List<Catalogo> anios = CallRestServices.getCatalogos("ANIOSEPI");
    	List<SivePatologias> patologias = sivePatologiasService.getSivePatologias();
    	List<Grupo> grupos = admonPatoGroupService.getGrupos();
    	model.addAttribute("areas", areas);
    	model.addAttribute("semanas", semanas);
    	model.addAttribute("anios", anios);
    	model.addAttribute("entidades", entidades);
    	model.addAttribute("departamentos", departamentos);
    	model.addAttribute("patologias", patologias);
            model.addAttribute("grupos",grupos);
    	return "analisis/mapas";
	}else {
            return urlValidacion;
        }
    }
    
    /**
     * Retorna una lista de datos. Acepta una solicitud GET para JSON
     * @return Un arreglo JSON
	 * @throws ParseException 
     */
    @RequestMapping(value = "mapasdata", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody List<Object[]> fetchMapasDataJson(@RequestParam(value = "codPato", required = true) String codPato,
    		@RequestParam(value = "codArea", required = true) String codArea,
    		@RequestParam(value = "semI", required = true) String semI,
    		@RequestParam(value = "semF", required = true) String semF,
    		@RequestParam(value = "anioI", required = true) String anioI,
    		@RequestParam(value = "codSilaisAtencion", required = false) Long codSilais,
    		@RequestParam(value = "codDepartamento", required = false) Long codDepartamento,
    		@RequestParam(value = "codMunicipio", required = false) Long codMunicipio,
    		@RequestParam(value = "codUnidadAtencion", required = false) Long codUnidad,
            @RequestParam(value = "tipoIndicador", required = false) String tipoIndicador,
            @RequestParam(value = "nivelPais", required = false) boolean paisPorSILAIS) throws ParseException {
        logger.info("Obteniendo los datos de mapas en JSON");
        List<Object[]> datos =  analisisService.getDataMapas(codPato, codArea, codSilais, codDepartamento, codMunicipio, codUnidad, semI, semF, anioI, tipoIndicador, paisPorSILAIS);
            if (datos == null) {
                logger.debug("Nulo");
            }
        return datos;
    }
    
    @RequestMapping(value = "piramides", method = RequestMethod.GET)
    public String initPiramidesPage(Model model,  HttpServletRequest request) throws Exception {
		logger.debug("presentar piramides");
        String urlValidacion = "";
        try {
            urlValidacion = seguridadService.validarLogin(request);
            //si la url esta vacia significa que la validaci�n del login fue exitosa
            if (urlValidacion.isEmpty())
                urlValidacion = seguridadService.validarAutorizacionUsuario(request, ConstantsSecurity.SYSTEM_CODE, false);
        } catch (Exception e) {
            e.printStackTrace();
            urlValidacion = "404";
        }
        if (urlValidacion.isEmpty()) {
        long idUsuario = seguridadService.obtenerIdUsuario(request);
        List<EntidadesAdtvas> entidades = seguridadService.obtenerEntidadesPorUsuario((int) idUsuario, ConstantsSecurity.SYSTEM_CODE);
        //List<Divisionpolitica> departamentos = divisionPoliticaService.getAllDepartamentos();
        List<Departamento> departamentos = CallRestServices.getDepartamentos();
    	//List<AreaRep> areas = catalogosService.getAreaRep();
       // List<AreaRep> areas = seguridadService.getAreasUsuario((int)idUsuario,3);
        //List<AreaRep> areas = seguridadService.getAreasUsuario((int)idUsuario,3);
        List<Catalogo> areasList = CallRestServices.getCatalogos("AREAREP");
        List<Catalogo> areas = seguridadService.getAreasUsuario((int) idUsuario, 3, areasList);
    	//List<Anios> anios = catalogosService.getAnios();
        List<Catalogo> anios = CallRestServices.getCatalogos("ANIOSEPI");
    	model.addAttribute("areas", areas);
    	model.addAttribute("anios", anios);
    	model.addAttribute("entidades", entidades);
    	model.addAttribute("departamentos", departamentos);
    	return "analisis/piramides";
	}else {
            return urlValidacion;
        }
    }
    
    /**
     * Retorna una lista de datos. Acepta una solicitud GET para JSON
     * @return Un arreglo JSON
	 * @throws ParseException 
     */
    @RequestMapping(value = "piramidesdata", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody List<Object[]> fetchPiramidesDataJson(@RequestParam(value = "codArea", required = true) String codArea,
    		@RequestParam(value = "anioI", required = true) String anioI,
    		@RequestParam(value = "codSilaisAtencion", required = false) Long codSilais,
    		@RequestParam(value = "codDepartamento", required = false) Long codDepartamento,
    		@RequestParam(value = "codMunicipio", required = false) Long codMunicipio,
    		@RequestParam(value = "codUnidadAtencion", required = false) Long codUnidad) throws ParseException {
        logger.info("Obteniendo los datos de piramides en JSON");
        List<Object[]> datos = analisisService.getDataPiramides(codArea, codSilais, codDepartamento, codMunicipio, codUnidad,anioI);
        if (datos == null){
        	logger.debug("Nulo");
        }
        return datos;
    }

}
