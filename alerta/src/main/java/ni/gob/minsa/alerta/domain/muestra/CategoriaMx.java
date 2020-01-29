package ni.gob.minsa.alerta.domain.muestra;

import ni.gob.minsa.alerta.domain.estructura.Catalogo;

import javax.persistence.*;

/**
 * Created by souyen-ics on 11-13-14.
 */

@NamedQueries({
        @NamedQuery(
                name = "getCategoriaMxByCodigo",
                query = "select cat from CategoriaMx cat where cat.codigo = :pCodigo"
        )
})


@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorValue(value = "CATEGMX")
public class CategoriaMx extends Catalogo {

    private static final long serialVersionUID = -2125376946497990948L;

    public CategoriaMx() {
    }
}
