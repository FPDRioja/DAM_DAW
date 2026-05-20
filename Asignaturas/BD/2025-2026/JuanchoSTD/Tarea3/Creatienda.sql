-- Eliminamos las tablas primero en caso de que existan
-- Esto es deliberado, espero que no se considere que es un error.

-- CASCADE CONSTRAINTS COMO LA FORMA DE GARANTIZAR QUE, AL HABER REFERENCIAS,
-- SE PUEDA EJECUTAR LA ELIMINACIÓN EN CASO DE QUE HAYA REGISTROS

DROP TABLE STOCK CASCADE CONSTRAINTS;
DROP TABLE TIENDA CASCADE CONSTRAINTS;
DROP TABLE PRODXTIENDAS CASCADE CONSTRAINTS;
DROP TABLE PRODUCTO CASCADE CONSTRAINTS;
DROP TABLE FAMILIA CASCADE CONSTRAINTS;


-- FAMILIA
-- Contiene las familias a las que pertenecen los productos,
-- como por ejemplo ordenadores, impresoras,etc.
CREATE TABLE FAMILIA(
    IdFamilia NUMBER(3) GENERATED ALWAYS AS IDENTITY
    (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    
    DenoFamilia VARCHAR2(50) NOT NULL UNIQUE
);


-- PRODUCTO
-- contendrá información general sobre los productos que distribuye 
-- la empresa a las tiendas.
CREATE TABLE PRODUCTO(
    IdProducto NUMBER(5) GENERATED ALWAYS AS IDENTITY 
    (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    
    DenoProducto VARCHAR2(20) NOT NULL,
    Descripcion VARCHAR2(100),
    PrecioBase NUMBER(8, 2) NOT NULL CHECK (PrecioBase > 0),
    PorcReposicion NUMBER(3) CHECK (PorcReposicion > 0),
    UnidadesMinimas NUMBER(4) NOT NULL CHECK (UnidadesMinimas > 0),
    
    -- FK
    IdFamilia NUMBER(3) NOT NULL,  

    CONSTRAINT FK_Producto_Familia FOREIGN KEY (IdFamilia) 
        REFERENCES FAMILIA(IdFamilia)
);

-- TIENDA
-- contendrá información básica sobre las tiendas que distribuyen los productos.
CREATE TABLE TIENDA (
    IdTienda NUMBER(3) GENERATED ALWAYS AS IDENTITY 
    (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    
    DenoTienda VARCHAR2(20) NOT NULL,
    Telefono VARCHAR2(11),
    CodigoPostal VARCHAR2(5) NOT NULL,
    Provincia VARCHAR2(5) NOT NULL
);

-- STOCK
-- Contendrá para cada tienda el número de unidades disponibles de cada producto. 
-- La clave primaria está formada por la concatenación de los campos IdTienda 
-- y IdProducto.
CREATE TABLE STOCK (
    IdTienda NUMBER(3) NOT NULL,
    IdProducto NUMBER(5) NOT NULL,
    Unidades NUMBER(6) NOT NULL CHECK (Unidades >= 0),
    
    --PK
    CONSTRAINT PK_Stock PRIMARY KEY (IdTienda, IdProducto),
    
    --FK
    CONSTRAINT FK_Stock_Tienda FOREIGN KEY (IdTienda) 
        REFERENCES TIENDA(IdTienda),
        
    CONSTRAINT FK_Stock_Producto FOREIGN KEY (IdProducto) 
        REFERENCES PRODUCTO(IdProducto)
);