package ni.gob.minsa.alerta.domain.seguridadLab;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;


/**
 * Simple objeto de dominio que representa un usuario
 * 
 * @author William Aviles
 **/

@Entity
@Table(name = "usuarios_sistema", schema = "laboratorio")
public class User implements Serializable {
    private String username;
    private Date created;
    private String password;
    private String completeName;
    private String email;
    private Boolean enabled=true;
    private String usuario;
    //private Set<Authority> authorities;

    @Id
    @Column(name = "username", nullable = false, length =50)
    @Size(min = 5, max = 50, message = "Nombre de usuario debe contener m�nimo 5 caracteres.")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Solo alfanumerico sin espacios")
    @NotBlank(message = "No puede estar vac�o.")
    public String getUsername() {
	return username;
    }
    public void setUsername(String username) {
	this.username = username;
    }
    @Column(name = "fecha_modificacion", nullable = false)
    public Date getCreated() {
	return created;
    }
    public void setCreated(Date created) {
	this.created = created;
    }
    @Column(name = "password", nullable = false, length =150)
    @Size(min = 4, max = 150, message = "Contrase�a debe contener m�nimo 8 caracteres.")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()?/]+$", message = "Solo alfanumerico y caracteres especiales (!@#$%^&*()?/). No espacios")
    @NotBlank(message = "No puede estar vac�o.")
    public String getPassword() {
	return password;
    }
    public void setPassword(String password) {
	this.password = password;
    }
    @Column(name = "descripcion", nullable = false, length =250)
    public String getCompleteName() {
	return completeName;
    }
    public void setCompleteName(String completeName) {
	this.completeName = completeName;
    }
    @Column(name = "email", nullable = true, length =100)
    public String getEmail() {
	return email;
    }
    public void setEmail(String email) {
	this.email = email;
    }
    @Column(name = "enabled", nullable = false)
    public Boolean getEnabled() {
	return enabled;
    }
    public void setEnabled(Boolean enabled) {
	this.enabled = enabled;
    }

    /*@OneToMany(mappedBy = "user", fetch=FetchType.EAGER)
    @IndexColumn(name = "username", base=0)
    public Set<Authority> getAuthorities() {
	return authorities;
    }
    public void setAuthorities(Set<Authority> authorities) {
	this.authorities = authorities;
    }*/

    @Column(name = "usuario", nullable = false, length =50)
    public String getUsuario() {
	return usuario;
    }
    public void setUsuario(String usuario) {
	this.usuario = usuario;
    }
}
