-- ===== TAREA UD 4 JUAN CRUZ GARRIDO =====

-- NOTA: AUTO FORMAT CRTL + F7
-- NOTA: CRTL + ENTER EJECUTA LA COSULTA COMPLETA DE DND ESTÉ EL CURSOR
-- USO COALESCE EN VEZ DE NVL, YA QUE AL PARECER ES ESTÁNDAR Y MÁS EFICIENTE

-- 1 .- Obtener los nombres y salarios de los empleados con más de 1000 euros de salario por orden alfabético.

SELECT
    nombre,
    salario
FROM
    empleado
WHERE
    salario > 1000
ORDER BY
    nombre;

-- 2.- Obtener el nombre de los empleados cuya comisión es superior al 20% de su salario.


SELECT
    nombre
FROM
    empleado
WHERE
    coalesce(comision, 0) > ( salario * 0.2 );

-- 3.- Obtener el código de empleado, código de departamento, nombre y sueldo total en pesetas de aquellos empleados
-- cuyo sueldo total (salario más comisión) supera los 1800 euros. Presentarlos ordenados por código de departamento y
-- dentro de éstos por orden alfabético.


SELECT
    codemple,
    coddpto,
    nombre,
    ( ( salario + coalesce(comision, 0) ) * 166.386 ) AS sueldo_total_pesetas
FROM
    empleado
WHERE
    ( salario + coalesce(comision, 0) ) > 1800
ORDER BY
    coddpto,
    nombre;

-- 4.- Obtener por orden alfabético los nombres de empleados cuyo salario igualen o superen en más de un 5% al salario de
-- la empleada 'MARIA JAZMIN'.


SELECT
    nombre
FROM
    empleado
WHERE
    salario >= (
        SELECT
            MAX(salario * 1.05)
        FROM
            empleado
        WHERE
            ( nombre = 'MARIA'
              AND ape1 = 'JAZMIN' )
    )
ORDER BY
    nombre;


-- 5.- Obtener un listado ordenado por años en la empresa con los nombres, y apellidos de los empleados y los años de
-- antigüedad en la empresa

SELECT
    nombre,
    ape1,
    ape2,
    trunc((sysdate - fechaingreso) / 365) AS antigüedad
FROM
    empleado
ORDER BY
    antigüedad DESC;



-- 6.- Obtener el nombre de los empleados que trabajan en un departamento con presupuesto superior a 50.000 euros. Hay
-- que usar predicado cuantificado

SELECT
    nombre
FROM
    empleado
WHERE
    coddpto = ANY (
        SELECT
            coddpto
        FROM
            dpto
        WHERE
            presupuesto > 50000
    );


-- 7.- Obtener los nombres y apellidos de empleados que más cobran en la empresa. Considerar eI salario más la comisión,

--NOTA: PONGO LOS 3 QUE MÁS COBRAN

SELECT
    nombre,
    ape1,
    ape2,
    ( salario + coalesce(comision, 0) ) AS retribucion_total
FROM
    empleado
ORDER BY
    retribucion_total DESC
FETCH FIRST 3 ROWS WITH TIES;


-- 8.- Obtener en orden alfabético los nombres de empleado cuyo salario es inferior al mínimo de los empleados del
-- departamento 1.

SELECT
    nombre
FROM
    empleado
WHERE
    salario < (
        SELECT
            MIN(salario)
        FROM
            empleado
        WHERE
            coddpto = 1
    );

-- 9.- Obtener los nombres de empleados que trabajan en el departamento del cuál es jefe el empleado con código 1.

SELECT
    nombre
FROM
    empleado
WHERE
    coddpto = (
        SELECT
            coddpto
        FROM
            dpto
        WHERE
            codemplejefe = 1
    );

-- 10.- Obtener los nombres de los empleados cuyo primer apellido empiece por las letras p, q, r, s.


SELECT
    nombre,
    ape1,
    ape2
FROM
    empleado
WHERE
    upper(substr(ape1, 1, 1)) IN ( 'P', 'Q', 'R', 'S' );

-- 11.- Obtener los empleados cuyo nombre de pila contenga eI nombre JUAN.

SELECT
    *
FROM
    empleado
WHERE
    nombre LIKE '%JUAN%';

-- 12.- Obtener los nombres de los empleados que viven en ciudades en las que hay algún centro de trabajo

SELECT
    nombre
FROM
    empleado
WHERE
    upper(localidad) = ANY (
        SELECT
            upper(localidad)
        FROM
            centro
    );

-- 13.- Obtener el nombre del jefe de departamento que tiene mayor salario de entre los jefes de departamento.

SELECT
    nombre
FROM
    empleado
WHERE
    codemple IN (
        SELECT
            codemplejefe
        FROM
            dpto
    )
    AND salario >= (
        SELECT
            MAX(salario)
        FROM
            empleado
        WHERE
            empleado.codemple = ANY (
                SELECT
                    codemplejefe
                FROM
                    dpto
            )
    );


-- 14.- Obtener en orden alfabético los salarios y nombres de los empleados cuyo salario sea superior al 60% del máximo
-- salario de la empresa.

SELECT
    nombre,
    salario
FROM
    empleado
WHERE
    salario > 0.6 * (
        SELECT
            MAX(salario)
        FROM
            empleado
    )
ORDER BY
    nombre ASC;

-- 15.- Obtener en cuántas ciudades distintas viven los empleados

SELECT
    COUNT(DISTINCT localidad)
FROM
    empleado;

-- 16.- EI nombre y apellidos del empleado que más salario cobra

SELECT
    nombre,
    ape1,
    ape2,
    salario
FROM
    empleado
WHERE
    salario = (
        SELECT
            MAX(salario)
        FROM
            empleado
    );

-- 17.- Obtener las localidades y número de empleados de aquellas en las que viven más de 3 empleados

SELECT
    localidad,
    COUNT(*) AS num_empleados
FROM
    empleado
GROUP BY
    localidad
HAVING
    COUNT(*) > 3
ORDER BY
    num_empleados DESC;


-- 18.- Obtener para cada departamento cuántos empleados trabajan, la suma de sus salarios y la suma de sus comisiones
-- para aquellos departamentos en los que hay algún empleado cuyo salario es superior a 1700 euros.

SELECT
    dpto.coddpto,
    dpto.denominacion,
    COUNT(empleado.codemple)            AS numero_de_empleados,
    SUM(empleado.salario)               AS salario_total,
    SUM(coalesce(empleado.comision, 0)) AS comisiones_total
FROM
         dpto
    JOIN empleado ON empleado.coddpto = dpto.coddpto
WHERE
    dpto.coddpto = ANY (
        SELECT
            empleado.coddpto
        FROM
            empleado
        WHERE
            empleado.salario > 1700
    )
GROUP BY
    dpto.coddpto,
    dpto.denominacion;


-- 19.- Obtener el departamento que más empleados tiene

SELECT
    dpto.denominacion,
    COUNT(empleado.codemple) AS numero_empleados
FROM
         dpto
    JOIN empleado ON empleado.coddpto = dpto.coddpto
GROUP BY
    dpto.denominacion
ORDER BY
    numero_empleados DESC
FETCH FIRST 1 ROW WITH TIES;

-- Sin usar paginación

SELECT
    dpto.coddpto,
    dpto.denominacion,
    COUNT(empleado.codemple) AS numero_empleados
FROM
         dpto
    JOIN empleado ON empleado.coddpto = dpto.coddpto
GROUP BY
    dpto.coddpto,
    dpto.denominacion
HAVING
    COUNT(empleado.codemple) >= ALL (
        SELECT
            COUNT(codemple)
        FROM
            empleado
        GROUP BY
            coddpto
    );


-- 20.- Obtener los nombres de todos los centros y los departamentos que se ubican en cada uno, así como aquellos
-- centros que no tienen departamentos.

-- ¿Nombres de los centros?
-- left join para escribir aquellos centros sin departamentos

SELECT
    centro.localidad,
    centro.direccion,
    dpto.denominacion
FROM
    centro
    LEFT JOIN dpto ON dpto.codcentro = centro.codcentro
ORDER BY
    localidad;
    
-- 21 Obtener el nombre del departamento de más alto nivel, es decir, aquel que no depende de ningún otro.

SELECT
    denominacion
FROM
    dpto
WHERE
    dpto.coddptodepende IS NULL;
    

-- 22.- Obtener todos los departamentos existentes en la empresa y los empleados (si los tiene) que pertenecen a él.

SELECT
    *
FROM
    dpto
    LEFT JOIN empleado ON empleado.coddpto = dpto.coddpto;

-- 23- Obtener un listado en eI que aparezcan todos los departamentos existentes y eI departamento del cual depende, si
-- depende de alguno.


SELECT
    d.denominacion  AS departamento,
    d2.denominacion AS depende_de
FROM
    dpto d
    LEFT JOIN dpto d2 ON d.coddptodepende = d2.coddpto
ORDER BY
    d.coddpto;

-- 24.- Obtener un listado ordenado alfabéticamente donde aparezcan los nombres de los empleados y a continuación el
-- literal *tiene comisión' si la tiene, y "no tiene comisión" si no la tiene.

--CASE 
--    WHEN [condición 1] THEN 'Literal 1'
--    WHEN [condición 2] THEN 'Literal 2'
--    ELSE 'Literal por defecto'
--END


SELECT
    nombre,
    CASE
        WHEN coalesce(comision, 0) <= 0 THEN
            'No tiene Comisión'
        ELSE
            'Tiene comisión'
    END AS tiene_comision
FROM
    empleado
ORDER BY
    nombre; 

-- 25.- Obtener un listado de las localidades en las que hay centros y no vive ningún empleado ordenado alfabéticamente.

-- primero he hecho esto:

SELECT
    localidad
FROM
    centro
WHERE
    codcentro = ANY (
        SELECT
            cc
        FROM
            (
                SELECT
                    centro.codcentro         AS cc,
                    COUNT(empleado.codemple) AS numero_empleados
                FROM
                    centro
                    LEFT JOIN empleado ON upper(empleado.localidad) = upper(centro.localidad)
                GROUP BY
                    centro.codcentro
            )
        WHERE
            numero_empleados = 0
    )
ORDER BY
    localidad;

-- pero es mucho mejor así:

SELECT
    upper(localidad) AS localidad_centro
FROM
    centro
MINUS
SELECT
    upper(localidad)
FROM
    empleado
ORDER BY
    localidad_centro;


-- 26.- Obtener un listado de las localidades en las que hay centros y además vive al menos un empleado ordenado
-- alfabéticamente.

SELECT
    upper(localidad) AS localidad_centro
FROM
    centro
INTERSECT
SELECT
    upper(localidad)
FROM
    empleado
ORDER BY
    localidad_centro;

-- 27.- Esta cuestión puntúa por 2. Se desea dar una gratificación por navidades en función de la antigüedad en la empresa
-- siguiendo estas pautas:
-- Si lleva entre 1 y 5 años, se le dará 100 euros
-- Si lleva entre 6 y 10 años, se le dará 50 euros por año
-- Si lleva entre 11 y 20 años, se le dará 70 euros por año
-- Si lleva más de 21 años, se le dará 100 euros por año
-- 32.- Obtener un listado de los empleados, ordenado alfabéticamente, indicando cuánto le corresponde de gratificación.

-- NOTA: CREO QUE ESTA CONSULTA CUMPLE CON TODOS LOS REQUISITOS
-- NOTA: la antigüedad es mejor calcularla así que por días

SELECT
    nombre,
    ape1,
    ape2,
    antigüedad,
    CASE
        WHEN antigüedad >= 1
             AND antigüedad <= 5 THEN
            100 * antigüedad
        WHEN antigüedad >= 6
             AND antigüedad <= 10 THEN
            50 * antigüedad
        WHEN antigüedad >= 11
             AND antigüedad <= 20 THEN
            70 * antigüedad
        WHEN antigüedad >= 21 THEN
            100 * antigüedad
        ELSE
            0
    END AS gratificacion
FROM
    (
        SELECT
            nombre,
            ape1,
            ape2,
            trunc(months_between(sysdate, fechaingreso) / 12) AS antigüedad
        FROM
            empleado
    )
ORDER BY
    nombre,
    ape1,
    ape2;


-- 33.- Obtener a los nombres, apellidos de los empleados que no son jefes de departamento.

SELECT
    nombre,
    ape1,
    ape2
FROM
    empleado
WHERE
    codemple <> ALL ( -- ~NOT IN
        SELECT
            codemplejefe
        FROM
            dpto
    );
    
-- EXTRA 1.- Ofrecer los datos de empleados y sus jefes, tal que sepamos los empleados que ganan más que su jefe

SELECT
    *
FROM
    (
        SELECT
            cod_empleado,
            nombre_empleado,
            retribución_total_emple,
            nombre_departamento,
            cod_jefe,
            jefe.nombre                               AS nombre_jefe,
            jefe.salario + coalesce(jefe.comision, 0) AS retribución_total_jefe
        FROM
                 (
                SELECT
                    empleado.nombre                                   AS nombre_empleado,
                    empleado.salario + coalesce(empleado.comision, 0) AS retribución_total_emple,
                    empleado.codemple                                 AS cod_empleado,
                    dpto.denominacion                                 AS nombre_departamento,
                    dpto.codemplejefe                                 AS cod_jefe
                FROM
                    empleado
                    LEFT JOIN dpto ON empleado.coddpto = dpto.coddpto
            )
            JOIN empleado jefe ON cod_jefe = jefe.codemple
    )
WHERE
        retribución_total_emple > retribución_total_jefe
    AND cod_jefe <> cod_empleado;
    
 
-- Otro modo de escribirlo, no sé si mejor:
-- más fácil de leer? pero no admite ejecución parcial

WITH empleado_dpto AS (
    SELECT
        empleado.nombre                                   AS nombre_empleado,
        empleado.salario + coalesce(empleado.comision, 0) AS retribución_total_emple,
        empleado.codemple                                 AS cod_empleado,
        dpto.denominacion                                 AS nombre_departamento,
        dpto.codemplejefe                                 AS cod_jefe
    FROM
        empleado
        LEFT JOIN dpto ON empleado.coddpto = dpto.coddpto
), empleado_dpto_jefe AS (
    SELECT
        nombre_empleado,
        retribución_total_emple,
        nombre_departamento,
        cod_empleado,
        jefe.nombre                               AS nombre_jefe,
        jefe.salario + coalesce(jefe.comision, 0) AS retribución_total_jefe,
        cod_jefe
    FROM
        empleado_dpto
        LEFT JOIN empleado jefe ON cod_jefe = jefe.codemple
)
SELECT
    *
FROM
    empleado_dpto_jefe
WHERE
        retribución_total_emple > retribución_total_jefe
    AND cod_jefe <> cod_empleado;          



-- EXTRA 2.- Dame los datos de los jefes y sus departamentos ordenados según la comisión que dan

SELECT
    nombre_departamento,
    nombre_jefe,
    retribución_total_jefe,
    cod_jefe,
    cod_dpto,
    SUM(comision_emple) AS comision_total_dpto
FROM
    (
        SELECT
            nombre_empleado,
            comision_emple,
            nombre_departamento,
            cod_empleado,
            jefe.nombre                               AS nombre_jefe,
            jefe.salario + coalesce(jefe.comision, 0) AS retribución_total_jefe,
            cod_jefe,
            cod_dpto
        FROM
            (
                SELECT
                    empleado.nombre                AS nombre_empleado,
                    coalesce(empleado.comision, 0) AS comision_emple,
                    empleado.codemple              AS cod_empleado,
                    dpto.denominacion              AS nombre_departamento,
                    dpto.codemplejefe              AS cod_jefe,
                    dpto.coddpto                   AS cod_dpto
                FROM
                    empleado
                    LEFT JOIN dpto ON empleado.coddpto = dpto.coddpto
            )
            LEFT JOIN empleado jefe ON cod_jefe = jefe.codemple
    )
GROUP BY
    cod_jefe,
    nombre_departamento,
    nombre_jefe,
    retribución_total_jefe,
    cod_dpto
ORDER BY
    comision_total_dpto DESC;

-- Concatenando joins

SELECT
    d.denominacion                      AS nombre_departamento,
    j.nombre                            AS nombre_jefe,
    j.salario + coalesce(j.comision, 0) AS retribucion_total_jefe,
    d.codemplejefe                      AS cod_jefe,
    d.coddpto                           AS cod_dpto,
    SUM(coalesce(e.comision, 0))        AS comision_total_dpto
FROM
    empleado e
    LEFT JOIN dpto     d ON e.coddpto = d.coddpto
    LEFT JOIN empleado j ON d.codemplejefe = j.codemple
GROUP BY
    d.coddpto,
    d.denominacion,
    d.codemplejefe,
    j.nombre,
    j.salario,
    j.comision
ORDER BY
    comision_total_dpto DESC; 

-- EXTRA 3.- Para cada departamento, muéstrame sus datos y la lista de empleados ordenados según su comisión.

SELECT
    nombre_departamento,
    nombre_jefe,
    retribución_total_jefe,
    cod_jefe,
    cod_dpto,
    cod_empleado,
    nombre_empleado,
    comision_emple
FROM
    (
        SELECT
            nombre_empleado,
            comision_emple,
            nombre_departamento,
            cod_empleado,
            jefe.nombre                               AS nombre_jefe,
            jefe.salario + coalesce(jefe.comision, 0) AS retribución_total_jefe,
            cod_jefe,
            cod_dpto
        FROM
            (
                SELECT
                    empleado.nombre                AS nombre_empleado,
                    coalesce(empleado.comision, 0) AS comision_emple,
                    empleado.codemple              AS cod_empleado,
                    dpto.denominacion              AS nombre_departamento,
                    dpto.codemplejefe              AS cod_jefe,
                    dpto.coddpto                   AS cod_dpto
                FROM
                    empleado
                    LEFT JOIN dpto ON empleado.coddpto = dpto.coddpto
            )
            LEFT JOIN empleado jefe ON cod_jefe = jefe.codemple
    )
WHERE
    ( comision_emple >= 0 )
ORDER BY
    cod_dpto,
    comision_emple DESC;

SELECT
    d.denominacion                      AS nombre_departamento,
    j.nombre                            AS nombre_jefe,
    j.salario + coalesce(j.comision, 0) AS retribucion_total_jefe,
    d.codemplejefe                      AS cod_jefe,
    d.coddpto                           AS cod_dpto,
    e.codemple                          AS cod_empleado,
    e.nombre                            AS nombre_empleado,
    coalesce(e.comision, 0)             AS comision_emple
FROM
    empleado e
    LEFT JOIN dpto     d ON e.coddpto = d.coddpto
    LEFT JOIN empleado j ON d.codemplejefe = j.codemple
WHERE
    coalesce(e.comision, 0) >= 0
ORDER BY
    d.coddpto,
    comision_emple DESC;