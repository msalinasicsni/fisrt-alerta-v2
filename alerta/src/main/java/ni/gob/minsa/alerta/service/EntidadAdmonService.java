package ni.gob.minsa.alerta.service;

import ni.gob.minsa.alerta.domain.estructura.EntidadesAdtvas;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Servicio para el objeto Entidad Administrativa
 *
 * @author Miguel Salinas
 */
@Service("entidadAdmonService")
@Transactional
public class EntidadAdmonService {

    @Resource(name = "sessionFactory")
    SessionFactory sessionFactory;

    public SessionFactory getSessionFactory(){
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory){
        if(this.sessionFactory == null){
            this.sessionFactory = sessionFactory;
        }
    }


    public List<EntidadesAdtvas> getAllEntidadesAdtvas() throws Exception {
        String query = "from EntidadesAdtvas as a where a.pasivo = :pasivo order by nombre asc";

        Session session = sessionFactory.getCurrentSession();
        Query q = session.createQuery(query);
        q.setParameter("pasivo",'0');
        return q.list();
    }

    /**
     * @param idMunicipio Id del Municipio por el que queres obtener las Entidades Administrativas
     * @return Retorna una lista de Entidades Administrativas obtenidas a partir del parametro ID Municipio
     * @throws Exception
     */
    @Deprecated
    public EntidadesAdtvas getSilaisFromMunicipio(String idMunicipio) throws Exception {
        String query = "from EntidadesAdtvas as a where pasivo = :pasivo and municipio=:idMunicipio order by nombre asc";

        Session session = sessionFactory.getCurrentSession();
        Query q = session.createQuery(query);
        q.setString("idMunicipio",idMunicipio);
        q.setParameter("pasivo",'0');
        return  (EntidadesAdtvas)q.uniqueResult();
     }

    /**
     * @param codigo Id para obtener un objeto en especifico del tipo <code>EntidadesAdtvas</code>
     * @return retorna un objeto filtrado del tipo <code>EntidadesAdtvas</code>
     * @throws Exception
     */
    public EntidadesAdtvas getSilaisByCodigo(Integer codigo) throws Exception {
        String query = "from EntidadesAdtvas as a where codigo= :codigo order by nombre asc";

        Session session = sessionFactory.getCurrentSession();
        Query q = session.createQuery(query);
        q.setInteger("codigo",codigo);
        return  (EntidadesAdtvas)q.uniqueResult();
    }
    
    /**
     * @param idSilais Id para obtener un objeto en especifico del tipo <code>EntidadesAdtvas</code>
     * @return retorna un objeto filtrado del tipo <code>EntidadesAdtvas</code>
     * @throws Exception
     */
    public EntidadesAdtvas getEntidadById(long idSilais) throws Exception {
        String query = "from EntidadesAdtvas as a where entidadAdtvaId= :idSilais order by nombre asc";

        Session session = sessionFactory.getCurrentSession();
        Query q = session.createQuery(query);
        q.setLong("idSilais",idSilais);
        return  (EntidadesAdtvas)q.uniqueResult();
    }
}