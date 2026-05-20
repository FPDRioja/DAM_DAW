SET SERVEROUTPUT ON;

CREATE OR REPLACE FUNCTION obtener_dieta_especie (
    idespecie_par IN NUMBER
) RETURN especie.idalimentacion_defecto%TYPE 
IS
    var_id_dieta_especie especie.idalimentacion_defecto%TYPE;
BEGIN
    SELECT
        idalimentacion_defecto
    INTO var_id_dieta_especie
    FROM
        especie
    WHERE
        idespecie = idespecie_par;

    RETURN var_id_dieta_especie;
EXCEPTION
    WHEN no_data_found THEN
        dbms_output.put_line('No se ha encontrado dieta para: ' || idespecie_par);
        raise_application_error(-20001, 'Error: La especie con ID '
                                        || idespecie_par
                                        || ' no existe en el sistema.');
    WHEN OTHERS THEN
        dbms_output.put_line('Error no contemplado:');
        dbms_output.put_line(sqlcode
                             || ':'
                             || sqlerrm);
        raise_application_error(-20000, 'Error inesperado: '
                                        || sqlcode
                                        || ':'
                                        || sqlerrm);
END obtener_dieta_especie;
/

DECLARE
    v_dieta NUMBER;
BEGIN
    v_dieta := obtener_dieta_especie(0); -- Debería devolver el error
    dbms_output.put_line('La dieta por defecto es: ' || v_dieta);
END;