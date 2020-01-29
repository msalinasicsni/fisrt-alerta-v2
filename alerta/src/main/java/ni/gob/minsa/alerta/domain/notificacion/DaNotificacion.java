package ni.gob.minsa.alerta.domain.notificacion;

import ni.gob.minsa.alerta.domain.audit.Auditable;
import ni.gob.minsa.alerta.domain.estructura.Catalogo;
import ni.gob.minsa.alerta.domain.estructura.EntidadesAdtvas;
import ni.gob.minsa.alerta.domain.estructura.Unidades;
import ni.gob.minsa.alerta.domain.irag.Respuesta;
import ni.gob.minsa.alerta.domain.persona.SisPersona;
import ni.gob.minsa.alerta.domain.poblacion.Comunidades;
import ni.gob.minsa.alerta.domain.poblacion.Divisionpolitica;
import ni.gob.minsa.alerta.domain.portal.Usuarios;
import ni.gob.minsa.alerta.domain.solicitante.Solicitante;
import org.hibernate.annotations.ForeignKey;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;


/**
 * Created by souyen-ics on 11-17-14.
 */
@Entity
@Table(name = "da_notificacion", schema = "alerta")
public class DaNotificacion implements Serializable, Auditable {

    private static final long serialVersionUID = 1L;
    private String idNotificacion;
    private SisPersona persona;
    private TipoNotificacion codTipoNotificacion;
    private boolean pasivo;
    private EntidadesAdtvas codSilaisAtencion;
    private Unidades codUnidadAtencion;
    private Usuarios usuarioRegistro;
    private Timestamp fechaAnulacion;
    private Timestamp fechaRegistro;
    private Divisionpolitica municipioResidencia;
    private Comunidades comunidadResidencia;
    private String direccionResidencia;
    private Date fechaInicioSintomas;
    private Respuesta urgente;
    private Solicitante solicitante;
    private Respuesta embarazada;
    private Integer semanasEmbarazo;
    private String codigoPacienteVIH;
    private String codExpediente;
    private boolean completa;
    private String actor;

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(name = "ID_NOTIFICACION", nullable = false, insertable = true, updatable = true, length = 36)
    public String getIdNotificacion() {
        return idNotificacion;
    }

    public void setIdNotificacion(String idNotificacion) {
        this.idNotificacion = idNotificacion;
    }

    @ManyToOne(optional = true)
    @JoinColumn(name = "PERSONA_ID", referencedColumnName = "PERSONA_ID")
    @ForeignKey(name = "PERSONA_ID_NOT_FK")
    public SisPersona getPersona() {
        return persona;
    }

    public void setPersona(SisPersona persona) {
        this.persona = persona;
    }

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Catalogo.class, optional = true)
    @JoinColumn(name = "COD_TIPO_NOTIFICACION", referencedColumnName = "CODIGO", nullable = true)
    @ForeignKey(name = "TIPO_NOTIF_FK")
    public TipoNotificacion getCodTipoNotificacion() {
        return codTipoNotificacion;
    }

    public void setCodTipoNotificacion(TipoNotificacion codTipoNotificacion) {
        this.codTipoNotificacion = codTipoNotificacion;
    }

    @Basic
    @Column(name = "PASIVO", nullable = true, insertable = true, updatable = true)
    public boolean isPasivo() {
        return pasivo;
    }

    public void setPasivo(boolean pasivo) {
        this.pasivo = pasivo;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "USUARIO_ID", referencedColumnName = "USUARIO_ID")
    @ForeignKey(name = "USUARIO_NOTI_FK")
    public Usuarios getUsuarioRegistro() {
        return usuarioRegistro;
    }

    public void setUsuarioRegistro(Usuarios usuarioRegistro) {
        this.usuarioRegistro = usuarioRegistro;
    }

    @Basic
    @Column(name = "FECHA_REGISTRO", nullable = false, insertable = true, updatable = true)
    public Timestamp getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Timestamp fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }


    @ManyToOne(optional = true)
    @JoinColumn(name = "COD_SILAIS_ATENCION", referencedColumnName = "CODIGO", nullable = true)
    @ForeignKey(name = "COD_SILAIS_FK")
    public EntidadesAdtvas getCodSilaisAtencion() {
        return codSilaisAtencion;
    }

    public void setCodSilaisAtencion(EntidadesAdtvas codSilaisAtencion) {
        this.codSilaisAtencion = codSilaisAtencion;
    }

    @ManyToOne(optional = true)
    @JoinColumn(name = "COD_UNIDAD_ATENCION", referencedColumnName = "CODIGO", nullable = true)
    @ForeignKey(name = "COD_UNIDAD_FK")
    public Unidades getCodUnidadAtencion() {
        return codUnidadAtencion;
    }

    public void setCodUnidadAtencion(Unidades codUnidadAtencion) {
        this.codUnidadAtencion = codUnidadAtencion;
    }

    @Basic
    @Column(name = "FECHA_ANULACION", nullable = true, insertable = true, updatable = true)
    public Timestamp getFechaAnulacion() {
        return fechaAnulacion;
    }

    public void setFechaAnulacion(Timestamp fechaAnulacion) {
        this.fechaAnulacion = fechaAnulacion;
    }

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Divisionpolitica.class)
    @JoinColumn(name = "CODIGO_MUNIC_RESIDENCIA", referencedColumnName = "CODIGO_NACIONAL", nullable = true)
    public Divisionpolitica getMunicipioResidencia() { return municipioResidencia; }

    public void setMunicipioResidencia(Divisionpolitica municipioResidencia) { this.municipioResidencia = municipioResidencia; }

    @ManyToOne(fetch=FetchType.LAZY,targetEntity=Comunidades.class)
    @JoinColumn(name="CODIGO_COMUNIDAD_RESIDENCIA", referencedColumnName="CODIGO", nullable=true)
    public Comunidades getComunidadResidencia() {
        return this.comunidadResidencia;
    }

    public void setComunidadResidencia(Comunidades comunidadResidencia) {
        this.comunidadResidencia = comunidadResidencia;
    }

    @Column(name = "DIRECCION_RESIDENCIA", length = 100)
    public String getDireccionResidencia() {
        return direccionResidencia;
    }

    public void setDireccionResidencia(String direccionResidencia) {
        this.direccionResidencia = direccionResidencia;
    }

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "FECHA_INICIO_SINTOMAS", nullable = true)
    public Date getFechaInicioSintomas() {
        return fechaInicioSintomas;
    }

    public void setFechaInicioSintomas(Date fechaInicioSintomas) {
        this.fechaInicioSintomas = fechaInicioSintomas;
    }

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Catalogo.class, optional = true)
    @JoinColumn(name = "URGENTE", referencedColumnName = "CODIGO", nullable = true)
    @ForeignKey(name = "SF_URGENTE_FK")
    public Respuesta getUrgente() { return urgente; }

    public void setUrgente(Respuesta urgente) { this.urgente = urgente; }

    @ManyToOne(optional = true)
    @JoinColumn(name = "ID_SOLICITANTE", referencedColumnName = "ID_SOLICITANTE")
    @ForeignKey(name = "SOLICITANTE_NOT_FK")
    public Solicitante getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(Solicitante solicitante) {
        this.solicitante = solicitante;
    }

    @ManyToOne(fetch=FetchType.LAZY,targetEntity=Catalogo.class, optional = true)
    @JoinColumn(name="EMBARAZADA", referencedColumnName = "CODIGO", nullable = true)
    @ForeignKey(name = "NOTI_EMBARAZADA_FK")
    public Respuesta getEmbarazada() {
        return embarazada;
    }

    public void setEmbarazada(Respuesta embarazada) {
        this.embarazada = embarazada;
    }

    @Basic
    @Column(name = "SEMANAS_EMBARAZO")
    public Integer getSemanasEmbarazo() {
        return semanasEmbarazo;
    }

    public void setSemanasEmbarazo(Integer semanasEmbarazo) {
        this.semanasEmbarazo = semanasEmbarazo;
    }

    @Basic
    @Column(name = "CODIGO_VIH", length=100)
    public String getCodigoPacienteVIH() {
        return codigoPacienteVIH;
    }

    public void setCodigoPacienteVIH(String codigoPacienteVIH) {
        this.codigoPacienteVIH = codigoPacienteVIH;
    }

    @Basic
    @Column(name = "COD_EXPEDIENTE", nullable = true, insertable = true, updatable = true, length = 30)
    public String getCodExpediente() {
        return codExpediente;
    }

    public void setCodExpediente(String codExpediente) {
        this.codExpediente = codExpediente;
    }
    @Basic
    @Column(name = "COMPLETA", nullable = true, insertable = true, updatable = true)
    public boolean isCompleta() { return completa; }

    public void setCompleta(boolean completa) {  this.completa = completa; }

    @Override
    public boolean isFieldAuditable(String fieldname) {
        if (fieldname.matches("usuarioRegistro") || fieldname.matches("fechaRegistro") || fieldname.matches("solicitante") || fieldname.matches("persona"))
            return false;
        else
            return true;
    }

    @Override
    @Transient
    public String getActor(){
        return this.actor;
    }

    @Override
    public void setActor(String actor){
        this.actor = actor;
    }

    @Override
    public String toString(){
        return idNotificacion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DaNotificacion)) return false;

        DaNotificacion that = (DaNotificacion) o;

        if (!idNotificacion.equals(that.idNotificacion)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return idNotificacion.hashCode();
    }
}