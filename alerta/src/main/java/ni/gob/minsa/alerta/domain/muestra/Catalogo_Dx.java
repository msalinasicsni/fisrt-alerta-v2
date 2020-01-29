package ni.gob.minsa.alerta.domain.muestra;

import ni.gob.minsa.alerta.domain.examen.Area;
import ni.gob.minsa.alerta.domain.seguridadLab.User;
import org.hibernate.annotations.ForeignKey;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by souyen-ics.
 */
@Entity
@Table(name = "catalogo_dx", schema = "laboratorio")
public class Catalogo_Dx implements Serializable {

    private static final long serialVersionUID = 7177495708144097064L;
    private Integer idDiagnostico;
    private String nombre;
    private boolean pasivo;
    private Area area;
    private Integer prioridad; //indica la prioridad de recepci�n respecto a otros dx de la misma mx
    private Date fechaRegistro;
    private User usuarioRegistro;

    public Catalogo_Dx() {
    }

    public Catalogo_Dx(Integer idDiagnostico, String nombre) {
        this.idDiagnostico = idDiagnostico;
        this.nombre = nombre;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "ID_DIAGNOSTICO", nullable = false, insertable = true, updatable = true, length = 10)
    public Integer getIdDiagnostico() {   return idDiagnostico; }

    public void setIdDiagnostico(Integer idDiagnostico) {  this.idDiagnostico = idDiagnostico;   }

    @Basic
    @Column(name = "NOMBRE", nullable = false, insertable = true, updatable = true, length = 100)
    public String getNombre() {  return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    @Basic
    @Column(name = "PASIVO", nullable = true, insertable = true, updatable = true)
    public boolean isPasivo() {  return pasivo; }

    public void setPasivo(boolean pasivo) { this.pasivo = pasivo; }

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_AREA", referencedColumnName = "ID_AREA", nullable = false)
    @ForeignKey(name = "DX_AREA_FK")
    public Area getArea() {   return area; }

    public void setArea(Area area) {  this.area = area; }

    @Basic
    @Column(name = "PRIORIDAD", nullable = true, insertable = true, updatable = true)
    public Integer getPrioridad() {  return prioridad; }

    public void setPrioridad(Integer prioridad) { this.prioridad = prioridad; }

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "FECHA_REGISTRO", nullable = true)
    public Date getFechaRegistro() {  return fechaRegistro; }

    public void setFechaRegistro(Date fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    @ManyToOne()
    @JoinColumn(name = "USUARIO_REGISTRO", referencedColumnName = "username", nullable = true)
    @ForeignKey(name = "fk_dxTipoMxNoti_usuario")
    public User getUsuarioRegistro() {  return usuarioRegistro; }

    public void setUsuarioRegistro(User usuarioRegistro) { this.usuarioRegistro = usuarioRegistro;  }

}
