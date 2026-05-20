set serveroutput on;

DECLARE
    mivariable NUMBER := 2;
BEGIN
    dbms_output.put_line(mivariable);
    SELECT
        MIN(idespecie)
    INTO mivariable
    FROM
        especie;

    dbms_output.put_line(mivariable);
END;

BEGIN
    FOR r IN (
        SELECT
            nombre
        FROM
            animal
    ) LOOP
        dbms_output.put_line('Hola ' || r.nombre);
    END LOOP;
END;

DECLARE
    variable NUMBER;
BEGIN
    variable := 1 / 0;
EXCEPTION
    WHEN OTHERS THEN
        dbms_output.put_line('---ERRORRES---');
        dbms_output.put_line('Código ' || sqlcode);
        dbms_output.put_line('Mensaje' || sqlerrm);
END;

CREATE OR REPLACE FUNCTION ejemplo_fc (
    idespecie_par IN NUMBER
) RETURN especie.idalimentacion_defecto%TYPE IS
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
END ejemplo_fc;
/

DECLARE
    v_dieta NUMBER;
BEGIN
    v_dieta := ejemplo_fc(0); -- Debería devolver 1 (Perro -> Pienso Seco)
    dbms_output.put_line('La dieta por defecto es: ' || v_dieta);
END;

CREATE OR REPLACE TRIGGER trigger_de_prueba AFTER
    UPDATE OF idalimentacion_esp ON animal
    FOR EACH ROW
    -- no funciona en 21c WHEN (new.idalimentacion_esp IS DISTINCT FROM old.idalimentacion_esp)
    WHEN ( lnnvl(new.idalimentacion_esp = old.idalimentacion_esp) )
BEGIN
    INSERT INTO historico_alimentacion (
        idanimal,
        fecha_cambio,
        id_alim_antigua,
        id_alim_nueva,
        usuario
    ) VALUES ( :new.idanimal,
               sysdate,
               :old.idalimentacion_esp,
               :new.idalimentacion_esp,
               user );

END trigger_de_prueba;
/

UPDATE animal
SET
    idalimentacion_esp = 3
WHERE
    idanimal = 2;


CREATE OR REPLACE PROCEDURE proc_prueba IS
    e_especie_no_existe EXCEPTION;
    PRAGMA exception_init ( e_especie_no_existe, -20001 );
    var_contador NUMBER := 0;
BEGIN
    FOR reg IN (
        SELECT
            idanimal,
            idespecie
        FROM
            animal
        WHERE
            idalimentacion_esp IS NULL
    ) LOOP
        BEGIN
            UPDATE animal
            SET
                idalimentacion_esp = obtener_dieta_especie(reg.idespecie)
            WHERE
                animal.idanimal = reg.idanimal;

            var_contador := var_contador + 1;
        EXCEPTION
            WHEN e_especie_no_existe THEN
                dbms_output.put_line('Esta especie no existe: ' || reg.idespecie);
        END;
    END LOOP;

    dbms_output.put_line('Se han actualizado las dietas de '
                         || var_contador
                         || ' animales.');
END proc_prueba;
/
exec proc_prueba;

CREATE OR REPLACE PROCEDURE proc_prueba2 IS
BEGIN
    UPDATE animal
    SET
        animal.idalimentacion_esp = obtener_dieta_especie(animal.idespecie)
    WHERE
        animal.idalimentacion_esp IS NULL;

END proc_prueba2;
/
exec proc_prueba2;


CREATE OR REPLACE TRIGGER trigger_de_prueba2 BEFORE
    INSERT OR UPDATE OF idalimentacion_esp ON animal
    FOR EACH ROW
    WHEN ( new.idalimentacion_esp IS NULL )
BEGIN
    :new.idalimentacion_esp := obtener_dieta_especie(:new.idespecie);
EXCEPTION 
    WHEN OTHERS THEN
        RAISE;
END trigger_de_prueba2;
