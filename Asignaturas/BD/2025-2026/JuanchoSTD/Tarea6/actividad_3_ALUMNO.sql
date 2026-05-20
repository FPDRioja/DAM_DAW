SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE sincronizar_dietas_animales IS
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
        BEGIN -- esto consigue hacer bloque y que podamos capturar la excepción en cada paso del loop
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
END sincronizar_dietas_animales;
/

exec SINCRONIZAR_DIETAS_ANIMALES;

COMMIT;