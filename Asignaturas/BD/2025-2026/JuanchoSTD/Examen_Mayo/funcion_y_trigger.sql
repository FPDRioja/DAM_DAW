-- ej 6.1
set serveroutput on;

CREATE OR REPLACE FUNCTION fn_calcular_descuento (
    par_id_pelicula IN pelicula.id_pelicula%TYPE
) RETURN NUMBER IS
    v_anio_peli NUMBER;
    r_descuento NUMBER;
BEGIN
    -- si no llego a sobreescribir esta variable es que la peli o no tiene año o no existe
    r_descuento := -1;
    SELECT
        pelicula.anio
    INTO v_anio_peli
    FROM
        pelicula
    WHERE
        pelicula.id_pelicula = par_id_pelicula;

    IF v_anio_peli < 2000 THEN
        r_descuento := 0.5;
    ELSIF v_anio_peli <= 2009 THEN
        r_descuento := 0.75;
    ELSIF v_anio_peli >= 2010 THEN
        r_descuento := 1;
    END IF;

    RETURN r_descuento;

END fn_calcular_descuento;
/

fn_calcular_descuento(1);

CREATE OR REPLACE TRIGGER trg_aplicar_descuento BEFORE
    INSERT ON emision
    FOR EACH ROW
BEGIN
    IF fn_calcular_descuento(:new.id_pelicula) = -1 THEN
        raise_application_error(-20002, 'La Película indicada no existe.');
    END IF;

    :new.precio := :new.precio * fn_calcular_descuento(:new.id_pelicula);

END trg_aplicar_descuento;