SET SERVEROUTPUT ON;

-- En el ejercicio se pide que:
-- "Solo debe dispararse si el valor de la alimentación ha cambiado realmente (:OLD.IDALIMENTACION_ESP IS DISTINCT FROM :NEW.IDALIMENTACION_ESP o controlando los nulos)."
-- PERO en realidad lo único que nos interesa es saber si el nuevo valor es null, además de que queremos asegurar que no hay cambio de informado a null

CREATE OR REPLACE TRIGGER trg_animal_dieta_default BEFORE
    INSERT OR UPDATE OF idalimentacion_esp ON animal
    FOR EACH ROW
    -- WHEN ( new.idalimentacion_esp IS NULL or (NVL(new.idalimentacion_esp, -1) != NVL(old.idalimentacion_esp, -1)) ) 
    WHEN ( new.idalimentacion_esp IS NULL ) -- en mi opinión, así está bien
BEGIN
    :new.idalimentacion_esp := obtener_dieta_especie(:new.idespecie);
    dbms_output.put_line('TRG_ANIMAL_DIETA_DEFAULT ejecutado para : ' || :new.nombre);
END trg_animal_dieta_default;
/

--INSERT INTO animal (
--    idanimal,
--    nombre,
--    chip,
--    fechanac,
--    fechaingreso,
--    sexo,
--    idespecie,
--    idraza,
--    idsocioacogida,
--    idvoluntario
--) VALUES ( '888',
--           'Bimba',
--           'ES-CHIP-2222',
--           TO_DATE('02/11/15', 'DD/MM/RR'),
--           TO_DATE('18/02/26', 'DD/MM/RR'),
--           'H',
--           '1',
--           '41',
--           NULL,
--           NULL );