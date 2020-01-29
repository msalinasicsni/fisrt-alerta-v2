package ni.gob.minsa.alerta.service;

import ni.gob.minsa.alerta.domain.catalogos.Anios;
import ni.gob.minsa.alerta.domain.catalogos.AreaRep;
import ni.gob.minsa.alerta.domain.catalogos.FactorPoblacion;
import ni.gob.minsa.alerta.domain.catalogos.Semanas;
import ni.gob.minsa.alerta.domain.estructura.Catalogo;
import ni.gob.minsa.alerta.domain.estructura.ZonaEspecial;
import ni.gob.minsa.alerta.domain.irag.*;
import ni.gob.minsa.alerta.domain.muestra.CategoriaMx;
import ni.gob.minsa.alerta.domain.muestra.EstadoMx;
import ni.gob.minsa.alerta.domain.muestra.TipoMx;
import ni.gob.minsa.alerta.domain.notificacion.TipoNotificacion;
import ni.gob.minsa.alerta.domain.persona.*;
import ni.gob.minsa.alerta.domain.rotavirus.*;
import ni.gob.minsa.alerta.domain.vigilanciaEntomologica.*;
import ni.gob.minsa.alerta.domain.vih.*;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.Animales;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.EnfAgudas;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.EnfCronicas;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.FuenteAgua;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.SintomasCHIK;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.SintomasDCSA;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.SintomasDGRA;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.SintomasDSSA;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.SintomasHANT;
import ni.gob.minsa.alerta.domain.vigilanciaSindFebril.SintomasLEPT;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Servicio para el objeto de Catalogos
 *
 * @author Miguel Salinas
 */

@Service("catalogosService")
@Transactional
public class CatalogoService {

    private Logger logger = LoggerFactory.getLogger(CatalogoService.class);

    @Resource(name="sessionFactory")
    private SessionFactory sessionFactory;

    public CatalogoService() {

    }

    public SessionFactory getSessionFactory(){
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory){
        if(this.sessionFactory == null){
            this.sessionFactory = sessionFactory;
        }
    }

    public List<Catalogo> ElementosCatalogos(String discriminador) throws Exception {
        //String query = "from Catalogo where pasivo = false and nodoPadre.codigo= :discriminador order by orden";
        String query = "from Catalogo";
        Session session = sessionFactory.getCurrentSession();
        Query q = session.createQuery(query);
        //q.setString("discriminador", discriminador);
        return q.list();
    }
    
    public Catalogo getElementoByCodigo(String codigo) throws Exception {
        String query = "from Catalogo as a where pasivo = false and codigo= :codigo order by orden";

        Session session = sessionFactory.getCurrentSession();
        Query q = session.createQuery(query);
        q.setString("codigo", codigo);
        return  (Catalogo)q.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<ModeloEncuesta> getModeloEncuesta() {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.createQuery("FROM ModeloEncuesta where pasivo = :pasivo order by orden");
        query.setParameter("pasivo", false);
        // Retrieve all
        return  query.list();
    }
    @SuppressWarnings("unchecked")
         public List<Ordinal> getOrdinalEncuesta() {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.createQuery("FROM Ordinal where pasivo = :pasivo order by orden");
        query.setParameter("pasivo", false);
        // Retrieve all
        return  query.list();
    }
    @SuppressWarnings("unchecked")
    public List<Procedencia> getProcedencia() {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.createQuery("FROM Procedencia where pasivo = :pasivo order by orden");
        query.setParameter("pasivo", false);
        // Retrieve all
        return  query.list();
    }
    @SuppressWarnings("unchecked")
    public List<Distritos> getDistritos() {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.createQuery("FROM Distritos where pasivo = :pasivo order by orden");
        query.setParameter("pasivo", false);
        // Retrieve all
        return  query.list();
    }
    @SuppressWarnings("unchecked")
    public List<Areas> getAreas() {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.createQuery("FROM Areas where pasivo = :pasivo order by orden");
        query.setParameter("pasivo", false);
        // Retrieve all
        return  query.list();
    }

    @SuppressWarnings("unchecked")
    public List<Captacion> getCaptacion(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Captacion capta where capta.pasivo = false order by orden");
       //retrieve all
        return query.list();
    }

    @SuppressWarnings("unchecked")
    public List<Clasificacion> getClasificacion(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Clasificacion clas where clas.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    @SuppressWarnings("unchecked")
    public List<Respuesta> getRespuesta(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Respuesta res where res.pasivo = false  order by orden");
        //retrieve all
        return query.list();
    }

    @SuppressWarnings("unchecked")
    public List<ViaAntibiotico> getViaAntibiotico(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM ViaAntibiotico via where via.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    @SuppressWarnings("unchecked")
    public List<ResultadoRadiologia> getResultadoRadiologia(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM ResultadoRadiologia resRad where resRad.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    @SuppressWarnings("unchecked")
    public List<CondicionEgreso> getCondicionEgreso(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM CondicionEgreso cond where cond.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    @SuppressWarnings("unchecked")
    public List<ClasificacionFinal> getClasificacionFinal(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM ClasificacionFinal clas where clas.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    @SuppressWarnings("unchecked")
    public List<ClasificacionFinalNV> getClasificacionFinalNV(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM ClasificacionFinalNV cla where cla.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    @SuppressWarnings("unchecked")
    public List<ClasificacionFinalNB> getClasificacionFinalNB(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM ClasificacionFinalNB clasi where clasi.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    @SuppressWarnings("unchecked")
    public List<Vacuna> getVacuna(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Vacuna vac where vac.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    @SuppressWarnings("unchecked")
    public List<TipoVacuna> getTipoVacuna(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoVacuna tvac where tvac.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    public List<TipoVacuna> getTipoVacunaHib(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoVacuna tvac where tvac.pasivo = false and tvac.codigo like :codigo order by orden");
        query.setString("codigo","TVAC|HIB1");
        //retrieve all
        return query.list();
    }

    public List<TipoVacuna> getTipoVacunaMeningococica(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoVacuna tvac where tvac.pasivo = false and tvac.codigo like :codigo order by orden");
        query.setString("codigo","%"+"TVAC|MENING"+"%");
        //retrieve all
        return query.list();
    }

    public List<TipoVacuna> getTipoVacunaNeumococica(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoVacuna tvac where tvac.pasivo = false and tvac.codigo like :codigo order by orden");
        query.setString("codigo","%"+"TVAC|NEUMO"+"%");
        //retrieve all
        return query.list();
    }

    public List<TipoVacuna> getTipoVacunaFlu(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoVacuna tvac where tvac.pasivo = false and tvac.codigo like :codigo order by orden");
        query.setString("codigo","%"+"TVAC|FLU"+"%");
        //retrieve all
        return query.list();
    }

    @SuppressWarnings("unchecked")
    public List<CondicionPrevia> getCondicionPrevia(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM CondicionPrevia cond where cond.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    @SuppressWarnings("unchecked")
    public List<ManifestacionClinica> getManifestacionClinica(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM ManifestacionClinica mani where mani.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    @SuppressWarnings("unchecked")
    public List<TipoMx> getTipoMuestra(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("select distinct tmx FROM TipoMx_TipoNotificacion tpmx, TipoMx tmx where tpmx.pasivo = false and tpmx.tipoMx.idTipoMx = tmx.idTipoMx order by tmx.nombre");
        //retrieve all
        return query.list();

    }

    @SuppressWarnings("unchecked")
    public List<TipoMx> getEstadoMx(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM EstadoMx est where est.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    @SuppressWarnings("unchecked")
    public List<TipoNotificacion> getTipoNotificacion(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoNotificacion noti where noti.pasivo = false order by orden");
        //retrieve all
        return query.list();

    }

    public ModeloEncuesta getModeloEncuesta(String mencuesta) {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerModelosEncuestaPorCodigo").setString("pCodigo", mencuesta);
        // Retrieve all
        return  (ModeloEncuesta) query.uniqueResult();
    }

    public Ordinal getOrdinalEncuesta(String oencuesta) {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerOrdinalEncuestaPorCodigo").setString("pCodigo", oencuesta);
        // Retrieve all
        return  (Ordinal) query.uniqueResult();
    }
    public Procedencia getProcedencia(String procedencia) {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerProcedenciaPorCodigo").setString("pCodigo", procedencia);
        // Retrieve all
        return  (Procedencia) query.uniqueResult();
    }
    public Distritos getDistritos(String distrito) {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerDistritosPorCodigo").setString("pCodigo", distrito);
        // Retrieve all
        return  (Distritos) query.uniqueResult();
    }
    public Areas getAreas(String area) {
        // Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        // Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerAreasPorCodigo").setString("pCodigo", area);
        // Retrieve all
        return  (Areas) query.uniqueResult();
    }


    public Captacion getCaptacion(String captacion){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("getCaptacionByCodigo").setString("pCodigo", captacion);
        //Retrieve all
        return (Captacion) query.uniqueResult();
    }

    public Clasificacion getClasificacion(String clasificacion){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("getClasificacionByCodigo").setString("pCodigo", clasificacion);
        //Retrieve all
        return (Clasificacion) query.uniqueResult();
    }

    public Respuesta getRespuesta(String respuesta){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("getRespuestaByCodigo").setString("pCodigo", respuesta);
        //Retrieve all
        return (Respuesta) query.uniqueResult();
    }

    public ViaAntibiotico getViaAntibiotico(String via){
        //Retrieve session from hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("getViaAntibioticoByCodigo").setString("pCodigo", via);
        //Retrieve all
        return (ViaAntibiotico) query.uniqueResult();
    }

    public ResultadoRadiologia getResultadoRadiologia (String res){
        //Retrieve session from hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getResRadiologiaByCodigo").setString("pCodigo", res);
        //Retrieve all
        return (ResultadoRadiologia) query.uniqueResult();
    }

    public CondicionEgreso getCondicionEgreso (String cond){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getCondicionEgresoByCodigo").setString("pCodigo", cond);
        //Retrieve all
        return (CondicionEgreso) query.uniqueResult();
    }

    public ClasificacionFinal getClasificacionFinal (String clas){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getClasificacionFinalByCodigo").setString("pCodigo", clas);
        //Retrieve all
        return (ClasificacionFinal) query.uniqueResult();
    }

    public ClasificacionFinalNV getClasificacionFinalNV (String cla){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getClasificacionFinalNVByCodigo").setString("pCodigo", cla);
        //Retrieve all
        return (ClasificacionFinalNV) query.uniqueResult();
    }

    public ClasificacionFinalNB getClasificacionFinalNB (String clasi){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getClasificacionFinalNBByCodigo").setString("pCodigo", clasi);
        //Retrieve all
        return (ClasificacionFinalNB) query.uniqueResult();
    }

    public Vacuna getVacuna (String vac){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getVacunaByCodigo").setString("pCodigo", vac);
        //Retrieve all
        return (Vacuna) query.uniqueResult();
    }

    public TipoVacuna getTipoVacuna (String tvac){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getTipoVacunaByCodigo").setString("pCodigo", tvac);
        //Retrieve all
        return (TipoVacuna) query.uniqueResult();
    }

    public CondicionPrevia getCondicionPrevia (String cond){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getCondicionPreviaByCodigo").setString("pCodigo", cond);
        //Retrieve all
        return (CondicionPrevia) query.uniqueResult();
    }


    public ManifestacionClinica getManifestacionClinica(String mani){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getManifestacionClinicaByCodigo").setString("pCodigo", mani);
        //Retrieve all
        return (ManifestacionClinica) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<TipoAsegurado> getTiposAsegurados(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoAsegurado tipoas where tipoas.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public TipoAsegurado getTipoAsegurado(String tipoas){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerTipoAseguradoPorCodigo").setString("pCodigo", tipoas);
        //Retrieve all
        return (TipoAsegurado) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<TipoAseguradovih> getListaTiposAseguradosVih(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoAseguradovih tipoas where tipoas.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public TipoAseguradovih getTipoAseguradoVih(String tipoas){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("getTipoAseguradoByCodigo").setString("pCodigo", tipoas);
        //Retrieve all
        return (TipoAseguradovih) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<TipoEdadVih> getTiposEdad(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoEdadVih tedad where tedad.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public TipoEdadVih getTipoEdad(String tipoedad){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("getTipoEdadVihByCodigo").setString("pCodigo", tipoedad);
        //Retrieve all
        return (TipoEdadVih) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<Sexo> getListaSexo(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Sexo catsexo where catsexo.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public Sexo getSexo(String sex){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerSexoPorCodigo").setString("pCodigo", sex);
        //Retrieve all
        return (Sexo) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<Etnia> getListaEtnia(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Etnia catetnia where catetnia.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public Etnia getEtnia(String etnia){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerEtniaPorCodigo").setString("pCodigo", etnia);
        //Retrieve all
        return (Etnia) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<EstadoCivil> getListaEstadoCivil(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM EstadoCivil catestadocivil where catestadocivil.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public EstadoCivil getEstadoCivil(String estado){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerEstadoCivilPorCodigo").setString("pCodigo", estado);
        //Retrieve all
        return (EstadoCivil) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<Escolaridad> getListaEscolaridad(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Escolaridad esc where esc.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public Escolaridad getEscolaridad(String esc){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerEscolaridadPorCodigo").setString("pCodigo", esc);
        //Retrieve all
        return (Escolaridad) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<Ocupacion> getListaOcupacion(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Ocupacion ocup where ocup.pasivo = false order by nombre");
        //retrieve all
        return query.list();
    }

    public Ocupacion getOcupacion(String ocup){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerOcupacionPorCodigo").setString("pCodigo", ocup);
        //Retrieve all
        return (Ocupacion) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<MetodosCalculoSemanasEmbarazo> getListaMetodosCalcSeEmb(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM MetodosCalculoSemanasEmbarazo metodos where metodos.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public MetodosCalculoSemanasEmbarazo getMetodoCalcSeEmb(String metodo){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerMetodCalcSeEmbPorCodigo").setString("pCodigo", metodo);
        //Retrieve all
        return (MetodosCalculoSemanasEmbarazo) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<PeriodoPruebaVihEmb> getListaPeriodoPruebaVihEmb(){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM PeriodoPruebaVihEmb periodo where periodo.pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public PeriodoPruebaVihEmb getPeriodoPruebaVihEmb(String periodo){
        //Retrieve session from Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a Hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerPeriodoPruebaVihEmbPorCodigo").setString("pCodigo", periodo);
        //Retrieve all
        return (PeriodoPruebaVihEmb) query.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<Animales> getAnimales(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Animales where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public Animales getAnimal(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getAnimalesByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (Animales) query.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<EnfAgudas> getEnfAgudas(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM EnfAgudas where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public EnfAgudas getEnfAgudas(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getEnfAgudasByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (EnfAgudas) query.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<EnfCronicas> getEnfCronicas(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM EnfCronicas where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public EnfCronicas getEnfCronicas(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getEnfCronicasByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (EnfCronicas) query.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<FuenteAgua> getFuenteAgua(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM FuenteAgua where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public FuenteAgua getFuenteAgua(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getFuenteAguaByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (FuenteAgua) query.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<SintomasCHIK> getSintomasCHIK(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM SintomasCHIK where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public SintomasCHIK getSintomasCHIK(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getSintomasCHIKByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (SintomasCHIK) query.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<SintomasDCSA> getSintomasDCSA(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM SintomasDCSA where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public SintomasDCSA getSintomasDCSA(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getSintomasDCSAByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (SintomasDCSA) query.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<SintomasDGRA> getSintomasDGRA(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM SintomasDGRA where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public SintomasDGRA getSintomasDGRA(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getSintomasDGRAByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (SintomasDGRA) query.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<SintomasDSSA> getSintomasDSSA(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM SintomasDSSA where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public SintomasDSSA getSintomasDSSA(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getSintomasDSSAByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (SintomasDSSA) query.uniqueResult();
    }
    
    
    @SuppressWarnings("unchecked")
    public List<SintomasHANT> getSintomasHANT(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM SintomasHANT where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public SintomasHANT getSintomasHANT(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getSintomasHANTByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (SintomasHANT) query.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<SintomasLEPT> getSintomasLEPT(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM SintomasLEPT where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    public SintomasLEPT getSintomasLEPT(String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getSintomasLEPTByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (SintomasLEPT) query.uniqueResult();
    }

    public List<Identificacion> getListaTipoIdentificacion(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Identificacion where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public EstadoMx getEstadoMx (String tmx){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getEstadoMxByCodigo").setString("pCodigo", tmx);
        //Retrieve all
        return (EstadoMx) query.uniqueResult();
    }

    public TipoNotificacion getTipoNotificacion (String tpNoti){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getTipoNotifCodigo").setString("pCodigo", tpNoti);
        //Retrieve all
        return (TipoNotificacion) query.uniqueResult();
    }
   
    @SuppressWarnings("unchecked")
    public List<AreaRep> getAreaRep(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM AreaRep where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public AreaRep getAreaRep (String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM AreaRep area where area.pasivo = false and area.codigo = :codigo ");
        query.setParameter("codigo",codigo);
        //Retrieve all
        return (AreaRep) query.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<Semanas> getSemanas(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Semanas where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }
    
    @SuppressWarnings("unchecked")
    public List<Anios> getAnios(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM Anios where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public CategoriaMx getCategoriaMx (String cmx){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getCategoriaMxByCodigo").setString("pCodigo", cmx);
        //Retrieve all
        return (CategoriaMx) query.uniqueResult();
    }

    public List<CategoriaMx> getCategoriasMx(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM CategoriaMx where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public FactorPoblacion getFactorPoblacion (String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("obtenerFactorPoblacionPorCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (FactorPoblacion) query.uniqueResult();
    }

    public List<FactorPoblacion> getFactoresPoblacion(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM FactorPoblacion where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    //ROTAVIRUS

    public GradoDeshidratacion getGradoDeshidratacion (String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getGradoDeshidratacionByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (GradoDeshidratacion) query.uniqueResult();
    }

    public List<GradoDeshidratacion> getGradosDeshidratacion(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM GradoDeshidratacion where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public TipoVacunaRotavirus getTipoVacunaRotavirus (String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getTipoVacunaRotavirusByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (TipoVacunaRotavirus) query.uniqueResult();
    }

    public List<TipoVacunaRotavirus> getTiposVacunasRotavirus(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM TipoVacunaRotavirus where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public ClasificacionFinalRotavirus getClasificacionFinalRotavirus (String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getClasificacionFinalRotavirusByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (ClasificacionFinalRotavirus) query.uniqueResult();
    }

    public List<ClasificacionFinalRotavirus> getClasificacionesFinalRotavirus(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM ClasificacionFinalRotavirus where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public RegistroVacuna getRegistroVacuna (String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getRegistroVacunaByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (RegistroVacuna) query.uniqueResult();
    }

    public List<RegistroVacuna> getRegistrosVacuna(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM RegistroVacuna where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public CaracteristaHeces getCaracteristaHeces (String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getCaracteristaHecesByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (CaracteristaHeces) query.uniqueResult();
    }

    public List<CaracteristaHeces> getCaracteristasHeces(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM CaracteristaHeces where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public SalaRotaVirus getSalaRotaVirus (String codigo){
        //Retrieve session from hibernated
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.getNamedQuery("getSalasRTByCodigo").setString("pCodigo", codigo);
        //Retrieve all
        return (SalaRotaVirus) query.uniqueResult();
    }

    public List<SalaRotaVirus> getSalasRotaVirus(){
        //Retrieve session Hibernate
        Session session = sessionFactory.getCurrentSession();
        //Create a hibernate query (HQL)
        Query query = session.createQuery("FROM SalaRotaVirus where pasivo = false order by orden");
        //retrieve all
        return query.list();
    }

    public ZonaEspecial getZonaEspecial(String codigo){
        Session session = sessionFactory.getCurrentSession();
        Query query = session.getNamedQuery("obtenerZonasPorCodigo").setString("pCodigo",codigo);
        return (ZonaEspecial) query.uniqueResult();
    }

    public List<ZonaEspecial> getZonasEspeciales(){
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery("From ZonaEspecial  where pasivo = false order by orden");
        return query.list();
    }
}