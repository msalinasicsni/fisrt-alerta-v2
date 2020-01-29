package ni.gob.minsa.alerta.domain.concepto;

import ni.gob.minsa.alerta.domain.estructura.Catalogo;

import javax.persistence.*;


@NamedQueries({
        @NamedQuery(
                name = "getTipoDatoCatalogo",
                query = "select cat from TipoDatoCatalogo cat where cat.codigo = :pCodigo"
        )
})

/**
 * Created by souyen-ics.
 */
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorValue(value = "TPDATO")
public class TipoDatoCatalogo extends Catalogo {

    private static final long serialVersionUID = 215694335378247572L;

    public TipoDatoCatalogo() {
    }
}
