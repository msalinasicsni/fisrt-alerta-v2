package ni.gob.minsa.alerta.domain.sive;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "sive_patologias_vig", schema = "sive", uniqueConstraints = @UniqueConstraint(columnNames = "CODIGO"))
public class SivePatologias implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String codigo;
	private String nombre;
	private String grupo;
	private String sexo;
	private String gruposEdades;
	private Date fechaBaja;
	
	@Id
	@Column(name = "ID_PATOLOGIA", nullable = false)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@Column(name = "CODIGO", nullable = false, length = 6)
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	@Column(name = "NOMBRE", nullable = false, length = 80)
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	@Column(name = "GRUPO", nullable = true, length = 6)
	public String getGrupo() {
		return grupo;
	}
	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}
	@Column(name = "SEXO", nullable = true, length = 1)
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	@Column(name = "GRUPOSEDADES", nullable = true, length = 80)
	public String getGruposEdades() {
		return gruposEdades;
	}
	public void setGruposEdades(String gruposEdades) {
		this.gruposEdades = gruposEdades;
	}
    @Temporal(TemporalType.DATE)
    @Column(name = "FECHABAJA", nullable = true)
	public Date getFechaBaja() {
		return fechaBaja;
	}
	public void setFechaBaja(Date fechaBaja) {
		this.fechaBaja = fechaBaja;
	}
}
