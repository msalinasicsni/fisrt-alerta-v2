package ni.gob.minsa.alerta.domain.muestra;

import ni.gob.minsa.alerta.domain.concepto.Concepto;
import ni.gob.minsa.alerta.domain.seguridadLab.User;
import org.hibernate.annotations.ForeignKey;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by souyen-ics.
 */
@Entity
@Table(name = "dato_solicitud", schema = "laboratorio")
public class DatoSolicitud implements Serializable{

    Integer idConceptoSol;
    String nombre;
    Catalogo_Dx diagnostico;
    Concepto concepto;
    Integer orden;
    boolean requerido;
    boolean pasivo;
    User usuarioRegistro;
    Timestamp fechahRegistro;
    String descripcion;

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "ID_CONCEPTO_SOL", nullable = false, insertable = true, updatable = false)
    public Integer getIdConceptoSol() {
        return idConceptoSol;
    }

    public void setIdConceptoSol(Integer idConceptoSol) {
        this.idConceptoSol = idConceptoSol;
    }

    @Basic
    @Column(name = "NOMBRE", nullable = false, insertable = true, updatable = true, length = 50)
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToOne(optional = true)
    @JoinColumn(name = "DIAGNOSTICO", referencedColumnName = "ID_DIAGNOSTICO", nullable = false)
    @ForeignKey(name = "CONCEPTO_DX_FK")
    public Catalogo_Dx getDiagnostico() { return diagnostico; }

    public void setDiagnostico(Catalogo_Dx diagnostico) { this.diagnostico = diagnostico; }

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_CONCEPTO", referencedColumnName = "ID_CONCEPTO", nullable = false)
    @ForeignKey(name = "CONCEPT_FK")
    public Concepto getConcepto() {
        return concepto;
    }

    public void setConcepto(Concepto concepto) {
        this.concepto = concepto;
    }

    @Basic
    @Column(name = "ORDEN", nullable = false, insertable = true)
    public Integer getOrden() {
        return orden;
    }

    public void setOrden(Integer orden) {
        this.orden = orden;
    }

    @Basic
    @Column(name = "REQUERIDO", nullable = false, insertable = true)
    public boolean isRequerido() {
        return requerido;
    }

    public void setRequerido(boolean requerido) {
        this.requerido = requerido;
    }

    @Basic
    @Column(name = "PASIVO", nullable = false, insertable = true)
    public boolean isPasivo() {
        return pasivo;
    }

    public void setPasivo(boolean pasivo) {
        this.pasivo = pasivo;
    }

    @ManyToOne(optional = true)
    @JoinColumn(name = "USUARIO_REGISTRO", referencedColumnName = "username")
    @ForeignKey(name = "DS_USUARIO_REG_FK")
    public User getUsuarioRegistro() {
        return usuarioRegistro;
    }

    public void setUsuarioRegistro(User usuarioRegistro) {
        this.usuarioRegistro = usuarioRegistro;
    }

    @Basic
    @Column(name = "FECHAH_REGISTRO", nullable = false, insertable = true, updatable = false)
    public Timestamp getFechahRegistro() {
        return fechahRegistro;
    }

    public void setFechahRegistro(Timestamp fechahRegistro) {
        this.fechahRegistro = fechahRegistro;
    }

    @Basic
    @Column(name = "DESCRIPCION", nullable = true, insertable = true, updatable = true, length = 500)
    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
