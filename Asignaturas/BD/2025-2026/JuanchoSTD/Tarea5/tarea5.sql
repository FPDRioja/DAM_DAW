INSERT INTO "TAREA_UD5"."PROFESORADO" (
    codigo,
    nombre,
    apellidos,
    dni,
    especialidad,
    fecha_nac,
    antiguedad
) VALUES ( '2',
           'MARIA LUISA',
           'FABRE BERDUN',
           '51083099F',
           'TECNOLOGIA',
           TO_DATE('31/3/1975', 'DD/MM/YYYY'),
           '4' );

INSERT INTO "TAREA_UD5"."PROFESORADO" (
    codigo,
    nombre,
    apellidos,
    especialidad,
    fecha_nac,
    antiguedad
) VALUES ( '3',
           'JAVIER',
           'JIMENEZ HERNANDO',
           'LENGUA',
           TO_DATE('04/05/1969', 'DD/MM/YYYY'),
           '10' );

INSERT INTO "TAREA_UD5"."PROFESORADO" (
    codigo,
    nombre,
    apellidos,
    dni,
    especialidad,
    fecha_nac,
    antiguedad
) VALUES ( '9',
           'ESTEFANIA2',
           'FERNANDEZ MARTINEZ',
           '19964324W',
           'INGLES',
           TO_DATE('10/1/1973', 'MM/DD/YYYY'),
           '5' );

INSERT INTO "TAREA_UD5"."PROFESORADO" (
    codigo,
    nombre,
    apellidos
) VALUES ( '5',
           'JOSE M.',
           'ANERO PAYAN' );

UPDATE "TAREA_UD5"."PROFESORADO"
SET
    especialidad = 'Informática',
    dni = '9876543C'
WHERE
    codigo = '3';

UPDATE profesorado
SET
    antiguedad = antiguedad - 2
WHERE
    antiguedad > 2;

DELETE FROM alumnado
WHERE
        cod_curso = 2
    AND sexo = 'H';

INSERT INTO alumnado (
    nombre,
    apellidos,
    sexo,
    fecha_nac,
    cod_curso
)
    SELECT
        nombre,
        apellidos,
        sexo,
        fecha_nac,
        1
    FROM
        alumnado_nuevo;

UPDATE cursos
SET
    cursos.max_alumn = (
        SELECT
            COUNT(*)
        FROM
            alumnado
        WHERE
            alumnado.cod_curso = 1
    )
WHERE
    cursos.codigo = 1;

DELETE FROM alumnado
WHERE
    alumnado.cod_curso IN (
        SELECT
            cursos.codigo
        FROM
            cursos
        WHERE
            cursos.cod_profe = 3
    );