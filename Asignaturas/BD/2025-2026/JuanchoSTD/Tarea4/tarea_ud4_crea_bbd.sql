/* ========================================================= 
   LIMPIEZA PREVIA DE LA BBDD (BORRADO DE TABLAS SI EXISTEN) 
   ========================================================= */ 
 
BEGIN 
  EXECUTE IMMEDIATE 'DROP TABLE EMPLEADO CASCADE CONSTRAINTS'; 
EXCEPTION 
  WHEN OTHERS THEN 
    IF SQLCODE != -942 THEN RAISE; END IF; 
END; 
/ 
 
BEGIN 
  EXECUTE IMMEDIATE 'DROP TABLE DPTO CASCADE CONSTRAINTS'; 
EXCEPTION 
  WHEN OTHERS THEN 
    IF SQLCODE != -942 THEN RAISE; END IF; 
END; 
/ 
 
BEGIN 
  EXECUTE IMMEDIATE 'DROP TABLE CATEGORIA CASCADE CONSTRAINTS'; 
EXCEPTION 
  WHEN OTHERS THEN 
    IF SQLCODE != -942 THEN RAISE; END IF; 
END; 
/ 
 
BEGIN 
  EXECUTE IMMEDIATE 'DROP TABLE CENTRO CASCADE CONSTRAINTS'; 
EXCEPTION 
  WHEN OTHERS THEN 
    IF SQLCODE != -942 THEN RAISE; END IF; 
END; 
/ 
 
 -- ========================================================= -- TABLA: CENTRO -- ========================================================= 
CREATE TABLE CENTRO ( 
  CodCentro  NUMBER(2)    NOT NULL, 
  Direccion  VARCHAR2(30) NOT NULL, 
  Localidad  VARCHAR2(20) NOT NULL, 
  CONSTRAINT pk_centro PRIMARY KEY (CodCentro) 
); 
 
INSERT INTO CENTRO VALUES (01, 'Rambla Nova', 'Tarragona'); 
INSERT INTO CENTRO VALUES (02, 'Alcala',      'Madrid'); 
INSERT INTO CENTRO VALUES (03, 'Sierpes',     'Sevilla'); 
 -- ========================================================= -- TABLA: CATEGORIA -- ========================================================= 
CREATE TABLE CATEGORIA ( 
  CodCate    NUMBER(2)    NOT NULL, 
  Denom      VARCHAR2(20) NOT NULL, 
  Julio      NUMBER(6,2)  NOT NULL, 
  Diciembre  NUMBER(6,2)  NOT NULL, 
  CONSTRAINT pk_categoria PRIMARY KEY (CodCate) 
); 
 
INSERT INTO CATEGORIA VALUES (1, 'ALTOS DIRECTIVOS', 6000, 5000); 
INSERT INTO CATEGORIA VALUES (2, 'DIRECTIVOS',       3000, 2000); 
INSERT INTO CATEGORIA VALUES (3, 'ADMINISTRATIVOS',  2000, 1500); 
 -- ========================================================= -- TABLA: EMPLEADO -- ========================================================= 
CREATE TABLE EMPLEADO ( 
  CodEmple      NUMBER(3)    NOT NULL, 
  Ape1          VARCHAR2(20) NOT NULL, 
  Ape2          VARCHAR2(20) NOT NULL, 
  Nombre        VARCHAR2(15) NOT NULL, 
  Direccion     VARCHAR2(25) NOT NULL, 
  Localidad     VARCHAR2(25) NOT NULL, 
  Telef         VARCHAR2(9), 
  CodDpto       NUMBER(2)    NOT NULL, 
  CodCate       NUMBER(2)    NOT NULL, 
  FechaIngreso  DATE         NOT NULL, 
  Salario       NUMBER(6,2)  NOT NULL, 
  Comision      NUMBER(6,2), 
  CONSTRAINT pk_empleado PRIMARY KEY (CodEmple) 
); 
 
INSERT INTO EMPLEADO VALUES (01,'LOPEZ','GARCIA','ANA','C/ 
ANAS','MADRID','666666666', 
  01,01,TO_DATE('01/02/2000','DD/MM/YYYY'),3000,NULL); 
 
INSERT INTO EMPLEADO VALUES 
(02,'FERNANDEZ','MORON','JUAN','C/FUENTE','TARRAGONA','7777777', 
  01,02,TO_DATE('01/02/2002','DD/MM/YYYY'),2000,NULL); 
 
INSERT INTO EMPLEADO VALUES 
(03,'CORTES','LOPEZ','ANGEL','C/CIFUENTES','BARACALDO','888888', 
  02,01,TO_DATE('01/03/2003','DD/MM/YYYY'),2000,NULL); 
 
INSERT INTO EMPLEADO VALUES 
(04,'SANCHEZ','LUZ','FABIOLA','C/CARDON','SEVILLA','99999999', 
  03,02,TO_DATE('21/05/2001','DD/MM/YYYY'),2500,NULL); 
 
INSERT INTO EMPLEADO VALUES 
(05,'RAJOY','AZNAR','PAZ','C/MAR','JAEN','88888888', 
  03,01,TO_DATE('23/02/2000','DD/MM/YYYY'),2000,130); 
 
INSERT INTO EMPLEADO VALUES 
(06,'ZAPATERO','GALLARDON','ANGUSTIAS','C/SUR','MADRID','78787878', 
  05,03,TO_DATE('01/02/2000','DD/MM/YYYY'),2000,NULL); 
 
INSERT INTO EMPLEADO VALUES 
(07,'FLOR','LUZ','BLANCA','C/TECLA','SEVILLA','7777777', 
  06,01,TO_DATE('01/02/2000','DD/MM/YYYY'),3000,130); 
 
INSERT INTO EMPLEADO VALUES (08,'ROS','SANTON','ALFONSO','C/ 
LUZ','MADRID','888888', 
  07,03,TO_DATE('01/02/2003','DD/MM/YYYY'),2000,NULL); 
 
INSERT INTO EMPLEADO VALUES 
(09,'LOPEZ','ITURRIALDE','GANDI','C/OASIS','TARRAGONA','777777', 
  05,01,TO_DATE('01/02/1998','DD/MM/YYYY'),1500,210); 
 
INSERT INTO EMPLEADO VALUES 
(10,'JAZMIN','EXPOSITO','MARIA','C/MANDRAGORA','MADRID','888888', 
  05,03,TO_DATE('01/03/2001','DD/MM/YYYY'),1000,200); 
 -- ========================================================= -- TABLA: DPTO -- ========================================================= 
CREATE TABLE DPTO ( 
  CodDpto        NUMBER(2)    NOT NULL, 
  Denominacion   VARCHAR2(20) NOT NULL, 
  CodCentro      NUMBER(2)    NOT NULL, 
  CodDptoDepende NUMBER(2), 
  CodEmpleJefe   NUMBER(3)    NOT NULL, 
  Tipo           CHAR(1)      NOT NULL, 
  Presupuesto    NUMBER(8,2)  NOT NULL, 
  CONSTRAINT pk_dpto PRIMARY KEY (CodDpto), 
 
  CONSTRAINT fk_dpto_centro 
    FOREIGN KEY (CodCentro) 
    REFERENCES CENTRO (CodCentro), 
 
  CONSTRAINT fk_dpto_dpto 
    FOREIGN KEY (CodDptoDepende) 
REFERENCES DPTO (CodDpto), 
CONSTRAINT fk_dpto_empleado 
FOREIGN KEY (CodEmpleJefe) 
REFERENCES EMPLEADO (CodEmple), 
CONSTRAINT chk_dpto_tipo 
CHECK (Tipo IN ('P','F')) 
); 
INSERT INTO DPTO VALUES (01,'DIRECCIÓN',         
01, NULL, 01,'P',100000); 
INSERT INTO DPTO VALUES (02,'ADMINISTRACION',    01, 01,   03,'F', 50000); 
INSERT INTO DPTO VALUES (03,'RECURSOS HUMANOS',  01, 01,   05,'P', 30000); 
INSERT INTO DPTO VALUES (05,'CENTRAL COMERCIAL', 01, 01,   07,'P',100000); 
INSERT INTO DPTO VALUES (06,'COMERCIAL CENTRO',  02, 05,   02,'F',  5000); 
INSERT INTO DPTO VALUES (07,'COMERCIAL SUR',     03, 05,   04,'F', 40000); -- ========================================================= -- FKs pendientes en EMPLEADO (dependen de DPTO y CATEGORIA) -- ========================================================= 
ALTER TABLE EMPLEADO ADD CONSTRAINT fk_empleado_dpto 
FOREIGN KEY (CodDpto) REFERENCES DPTO (CodDpto); 
ALTER TABLE EMPLEADO ADD CONSTRAINT fk_empleado_categoria 
FOREIGN KEY (CodCate) REFERENCES CATEGORIA (CodCate); 
COMMIT; 