package ni.gob.minsa.alerta.utilities.typeAdapter;

import java.util.Random;

/**
 * Created by FIRSTICT on 1/6/2015.
 */
public class StringUtil {

    /**
     * M�todo que retorna un cadena alfanumerica compuesta por n�meros del 0-9, y letras a-z,A-Z; seg�n la longitud indicada
      * @param longitud tama�o de la cadena
     * @return String cadenaAleatoria
     */
    public static String getCadenaAlfanumAleatoria (int longitud){
        StringBuffer cadenaAleatoria = new StringBuffer();
        long milis = new java.util.GregorianCalendar().getTimeInMillis();
        Random r = new Random(milis);
        int i = 0;
        while ( i < longitud){
            char c = (char)r.nextInt(255);
            if ( (c >= '0' && c <='9') || (c >='a' && c <='z') || (c >='A' && c <='Z') ){
                cadenaAleatoria.append(c);
                i ++;
            }
        }
        return cadenaAleatoria.toString();
    }
}
