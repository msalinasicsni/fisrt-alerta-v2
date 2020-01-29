package ni.gob.minsa.alerta.utilities;

import java.util.Date;

/**
 * Created by FIRSTICT on 9/30/2015.
 * V1.0
 */
public class FiltrosReporte {
    String codArea;
    Long codSilais;
    Long codDepartamento;
    Long codMunicipio;
    Long codUnidad;
    String semInicial;
    String semFinal;
    String anioInicial;
    String anioFinal;
    String tipoNotificacion;
    Integer factor;
    Date fechaInicio;
    Date fechaFin;
    String tipoPoblacion;
    boolean subunidades;
    boolean porSilais;
    String codZona;
    Integer idDx;
    boolean incluirMxInadecuadas;
    String codLaboratio;
    Date fisInicial;
    Date fisFinal;
    boolean nivelCentral;
    String diagnosticos;
    String consolidarPor;
    String codigosLaboratorios;
    String idTomaMx;

    public String getCodArea() {
        return codArea;
    }

    public void setCodArea(String codArea) {
        this.codArea = codArea;
    }

    public Long getCodSilais() {
        return codSilais;
    }

    public void setCodSilais(Long codSilais) {
        this.codSilais = codSilais;
    }

    public Long getCodDepartamento() {
        return codDepartamento;
    }

    public void setCodDepartamento(Long codDepartamento) {
        this.codDepartamento = codDepartamento;
    }

    public Long getCodMunicipio() {
        return codMunicipio;
    }

    public void setCodMunicipio(Long codMunicipio) {
        this.codMunicipio = codMunicipio;
    }

    public Long getCodUnidad() {
        return codUnidad;
    }

    public void setCodUnidad(Long codUnidad) {
        this.codUnidad = codUnidad;
    }

    public String getSemInicial() {
        return semInicial;
    }

    public void setSemInicial(String semInicial) {
        this.semInicial = semInicial;
    }

    public String getSemFinal() {
        return semFinal;
    }

    public void setSemFinal(String semFinal) {
        this.semFinal = semFinal;
    }

    public String getAnioInicial() {
        return anioInicial;
    }

    public void setAnioInicial(String anioInicial) {
        this.anioInicial = anioInicial;
    }

    public String getAnioFinal() {
        return anioFinal;
    }

    public void setAnioFinal(String anioFinal) {
        this.anioFinal = anioFinal;
    }

    public String getTipoNotificacion() {
        return tipoNotificacion;
    }

    public void setTipoNotificacion(String tipoNotificacion) {
        this.tipoNotificacion = tipoNotificacion;
    }

    public Integer getFactor() {
        return factor;
    }

    public void setFactor(Integer factor) {
        this.factor = factor;
    }

    public Date getFechaInicio() { return fechaInicio; }

    public void setFechaInicio(Date fechaInicio) { this.fechaInicio = fechaInicio; }

    public Date getFechaFin() { return fechaFin; }

    public void setFechaFin(Date fechaFin) { this.fechaFin = fechaFin; }

    public String getTipoPoblacion() { return tipoPoblacion; }

    public void setTipoPoblacion(String tipoPoblacion) { this.tipoPoblacion = tipoPoblacion; }

    public boolean isSubunidades() { return subunidades; }

    public void setSubunidades(boolean subunidades) { this.subunidades = subunidades; }

    public boolean isPorSilais() {
        return porSilais;
    }

    public void setPorSilais(boolean porSilais) {
        this.porSilais = porSilais;
    }

    public String getCodZona() {
        return codZona;
    }

    public void setCodZona(String codZona) {
        this.codZona = codZona;
    }

    public Integer getIdDx() {
        return idDx;
    }

    public void setIdDx(Integer idDx) {
        this.idDx = idDx;
    }

    public boolean isIncluirMxInadecuadas() {
        return incluirMxInadecuadas;
    }

    public void setIncluirMxInadecuadas(boolean incluirMxInadecuadas) {
        this.incluirMxInadecuadas = incluirMxInadecuadas;
    }

    public String getCodLaboratio() {
        return codLaboratio;
    }

    public void setCodLaboratio(String codLaboratio) {
        this.codLaboratio = codLaboratio;
    }

    public Date getFisInicial() {
        return fisInicial;
    }

    public void setFisInicial(Date fisInicial) {
        this.fisInicial = fisInicial;
    }

    public Date getFisFinal() {
        return fisFinal;
    }

    public void setFisFinal(Date fisFinal) {
        this.fisFinal = fisFinal;
    }

    public boolean isNivelCentral() {
        return nivelCentral;
    }

    public void setNivelCentral(boolean nivelCentral) {
        this.nivelCentral = nivelCentral;
    }

    public String getDiagnosticos() {
        return diagnosticos;
    }

    public void setDiagnosticos(String diagnosticos) {
        this.diagnosticos = diagnosticos;
    }

    public String getConsolidarPor() {
        return consolidarPor;
    }

    public void setConsolidarPor(String consolidarPor) {
        this.consolidarPor = consolidarPor;
    }

    public String getCodigosLaboratorios() {
        return codigosLaboratorios;
    }

    public void setCodigosLaboratorios(String codigosLaboratorios) {
        this.codigosLaboratorios = codigosLaboratorios;
    }

    public String getIdTomaMx() {
        return idTomaMx;
    }

    public void setIdTomaMx(String idTomaMx) {
        this.idTomaMx = idTomaMx;
    }
}
