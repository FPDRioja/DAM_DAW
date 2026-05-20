-- A)  
-- Modificar las tablas creadas en el ejercicio anterior siguiendo las 
-- indicaciones. Los ejercicios se incluirán en un script llamado 
-- ModificaTienda.sql. Cada uno de ellos, como en el ejercicio anterior, 
-- irá precedido de un comentario con el enunciado.

-- Añadir a la tabla STOCK
--  - Una columna de tipo fecha llamada FechaUltimaEntrada que por defecto tome 
-- el valor de la fecha actual.

--  - Una columna llamada Beneficio que contendrá el tipo de porcentaje de 
-- beneficio que esa tienda aplica en ese producto. Se debe controlar 
-- que el valor que almacene sea 1,2, 3, 4 o 5.

ALTER TABLE STOCK ADD (
    FechaUltimaEntrada DATE DEFAULT SYSDATE,
    Beneficio NUMBER(1) CHECK (Beneficio IN (1, 2, 3, 4, 5))
);

-- En la tabla PRODUCTO

-- - Eliminar de la tabla producto la columna Descripción.

-- - Añadir una columna llamada Perecedero que únicamente acepte 
-- los valores: S o N.

-- - Modificar el tamaño de la columna DenoProducto a 50.

ALTER TABLE PRODUCTO DROP COLUMN Descripcion;

ALTER TABLE PRODUCTO ADD Perecedero VARCHAR2(1) 
    CHECK (Perecedero IN ('S', 'N'));

ALTER TABLE PRODUCTO MODIFY DenoProducto VARCHAR2(50);

-- En la tabla FAMILIA

-- - Añadir una columna llamada IVA, que represente el porcentaje de IVA y 
-- únicamente pueda contener los valores 21,10,ó 4.

ALTER TABLE FAMILIA ADD IVA NUMBER(2) CHECK (IVA IN (21, 10, 4));


-- En la tabla TIENDA

-- - La empresa desea restringir el número de tiendas con las que trabaja, 
-- de forma que no pueda haber más de una tienda en una misma zona 
-- (la zona se identifica por el código postal). 
-- Definir mediante DDL las restricciones necesarias para que se cumpla 
-- en el campo correspondiente..

-- Resolvemos esto haciendo único el CP 
ALTER TABLE TIENDA ADD CONSTRAINT UQ_Tienda_CP UNIQUE (CodigoPostal);


-- B) Renombra la tabla STOCK por PRODXTIENDAS.

RENAME STOCK TO PRODXTIENDAS;


-- C) Elimina la tabla FAMILIA y su contenido si lo tuviera.

DROP TABLE FAMILIA CASCADE CONSTRAINTS;


-- D) Crea un usuario llamado INVITADO siguiendo los pasos de la unidad 1 
-- y dale todos los privilegios sobre la tabla PRODUCTO.

-- nota: Esto no funcionará con el usuaro creado para este ejercicio,
-- necesitaremos correr esto con el admin y por tanto
-- incluir esto en este script es un error

CREATE USER INVITADO IDENTIFIED BY 1234;
GRANT CREATE SESSION TO INVITADO;

-- desde aquí sí se puede ejecutar con este usuario, ya que gestiona permisos
-- cuyo propietario es éste
GRANT ALL ON PRODUCTO TO INVITADO;


-- E) Retira los permisos de modificar la estructura de la tabla y borrar 
-- contenido de la tabla PRODUCTO al usuario anterior.

REVOKE ALTER, DELETE ON PRODUCTO FROM INVITADO;
