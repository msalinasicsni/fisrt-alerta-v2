package ni.gob.minsa.alerta.domain.vigilanciaSindFebril;

import ni.gob.minsa.alerta.domain.estructura.Catalogo;

import javax.persistence.*;

/**
 * Created by souyen-ics
 */
@NamedQueries({
        @NamedQuery(name ="getSintomasHANTByCodigo",
                query = "select cat from SintomasHANT cat where cat.codigo = :pCodigo")})

@Entity
@Inheritance (strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorValue(value = "HANT")
public class SintomasHANT extends Catalogo {

    private static final long serialVersionUID = -6665592634170716248L;

    public SintomasHANT() {
    	
    }
}
