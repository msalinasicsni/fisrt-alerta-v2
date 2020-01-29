package ni.gob.minsa.alerta.service;

import ni.gob.minsa.alerta.domain.vigilanciaEntomologica.DaDetalleEncuestaAedes;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Servicio para el manejo de Objeto de dominio "Maestro de Encuesta de Encuesta Entomologica"
 *
 * @author Miguel Salinas
 * @version v1.0
 */
@Service("detalleEncuestaAedesService")
@Transactional
public class DaDetalleEncuestaAedesService {


    @Resource(name = "sessionFactory")
    private SessionFactory sessionFactory;

    /**
     * Agrega una Registro de encuesta al maestro y al detalle
     *
     * @param dto
     * @throws Exception
     */
    public void addDaDetalleEncuestaAedes(DaDetalleEncuestaAedes dto) throws Exception {
        try {
            if (dto != null) {
                Session session = sessionFactory.getCurrentSession();
                session.save(dto);
            }
            else
                throw new Exception("");
        }catch (Exception ex){
            throw ex;
        }
    }

    /**
     * Actualiza un registro ya sea en el Maestro Encuesta
     *
     * @param dto
     * @throws Exception
     */
    public void updateDaDetalleEncuestaAedes(DaDetalleEncuestaAedes dto) throws Exception {
        try {
            if (dto != null) {
                Session session = sessionFactory.getCurrentSession();
                session.saveOrUpdate(dto);
            }
            else
                throw new Exception("");
        }catch (Exception ex){
            throw ex;
        }
    }

    /**
     * Obtiene un detalle de encuesta del modelo aedes aegypti según localidad y maestro de encuesta
     * @param idLocalidad
     * @param idEncuestaMaestro
     * @return
     * @throws Exception
     */
    public List<DaDetalleEncuestaAedes> getDetalleEncuestaByLocalidad(String idLocalidad, String idEncuestaMaestro) throws Exception {
        Session session = sessionFactory.getCurrentSession();
        String query = "from DaDetalleEncuestaAedes as a join a.maeEncuesta b join a.localidad l where l.codigo = :idLocalidad and b.encuestaId = :idMaestro";
        Query q = session.createQuery(query);
        q.setString("idLocalidad",idLocalidad);
        q.setString("idMaestro",idEncuestaMaestro);
        return q.list();
    }

    /**
     * Retorna los detalles de encuestas asociados a un maestro, según id de maestro informado
     * @param idEncuestaMaestro : String con el id del maestro a obtener detalle
     * @return List<DaDetalleEncuestaAedes> : Detalles encontrados
     * @throws Exception
     */
    public List<DaDetalleEncuestaAedes> getDetalleEncuestaByIdMaestro(String idEncuestaMaestro) throws Exception {
        Session session = sessionFactory.getCurrentSession();
        String query = "from DaDetalleEncuestaAedes as a join a.maeEncuesta as b where b.encuestaId = :idMaestro order by a.feRegistro asc";
        Query q = session.createQuery(query);
        q.setString("idMaestro",idEncuestaMaestro);
        return q.list();
    }

    public DaDetalleEncuestaAedes getDetalleEncuestaByIdDetalle(String idEncuestaDetalle) throws Exception {
        Session session = sessionFactory.getCurrentSession();
        String query = "from DaDetalleEncuestaAedes where detaEncuestaId = :idEncuestaDetalle";
        Query q = session.createQuery(query);
        q.setString("idEncuestaDetalle",idEncuestaDetalle);
        return (DaDetalleEncuestaAedes)q.uniqueResult();
    }

}