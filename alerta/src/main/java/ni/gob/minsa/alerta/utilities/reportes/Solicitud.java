package ni.gob.minsa.alerta.utilities.reportes;

/**
 * Created by Miguel Salinas on 07/05/2019.
 * V1.0
 */
public class Solicitud {

    Integer idSolicitud;
    String nombre;
    String tipo;

    public Integer getIdSolicitud() {
        return idSolicitud;
    }

    public void setIdSolicitud(Integer idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
