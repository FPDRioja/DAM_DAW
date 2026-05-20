-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-11-2016 a las 17:11:56
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `ejemplodept`
--
CREATE DATABASE IF NOT EXISTS `ejemplodept` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ejemplodept`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE IF NOT EXISTS `departamentos` (
  `dept_no` tinyint(2) NOT NULL,
  `dnombre` varchar(15) DEFAULT NULL,
  `loc` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`dept_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`dept_no`, `dnombre`, `loc`) VALUES
(10, 'CONTABILIDAD', 'SEVILLA'),
(20, 'INVESTIGACIÓN', 'MADRID'),
(30, 'VENTAS', 'BARCELONA'),
(40, 'PRODUCCIÓN', 'BILBAO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE IF NOT EXISTS `empleados` (
  `emp_no` tinyint(2) NOT NULL,
  `apellido` varchar(10) DEFAULT NULL,
  `oficio` varchar(10) DEFAULT NULL,
  `dir` int(11) DEFAULT NULL,
  `fecha_alt` date DEFAULT NULL,
  `salario` float DEFAULT NULL,
  `comision` float DEFAULT NULL,
  `dept_no` tinyint(2) NOT NULL,
  PRIMARY KEY (`emp_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`emp_no`, `apellido`, `oficio`, `dir`, `fecha_alt`, `salario`, `comision`, `dept_no`) VALUES
(1, 'Hidalgo', 'Contable', 1100, '1992-06-07', 1230, NULL, 10),
(2, 'Piqueras', 'Investigad', 1101, '1992-09-07', 1130, NULL, 20),
(3, 'Cagigas', 'Investigad', 1102, '1994-09-07', 1130, NULL, 20),
(4, 'Pérez-Arad', 'Vendedor', 1103, '1994-09-07', 1330, 80, 30),
(5, 'Rojas', 'Empleado', 1104, '1980-09-07', 1138, 87, 40),
(6, 'Carrasco', 'Albanil', 1104, '2016-11-05', 1200, 15, 30),
(7, 'Olmo', 'Investigad', 1101, '1992-09-07', 1130, NULL, 20),
(8, 'Robles', 'Investigad', 1102, '1994-12-07', 1130, NULL, 20),
(9, 'Martín', 'Vendedor', 1103, '1994-09-32', 1330, 80, 30),
(10, 'Rojas', 'Empleado', 1104, '1980-08-07', 1138, 87, 40),
(11, 'Nalda', 'Investigad', 1101, '1992-04-07', 1130, NULL, 20),
(12, 'Viguera', 'Investigad', 1102, '1994-02-07', 1130, NULL, 20),
(14, 'Torrecilla', 'Vendedor', 1103, '1994-09-07', 1330, 80, 30),
(15, 'Hornos', 'Empleado', 1104, '1980-12-01', 1138, 87, 40),
(16, 'Nadal', 'Investigad', 1101, '1993-09-25', 1130, NULL, 20),
(13, 'Casas', 'Investigad', 1102, '1994-09-22', 1130, NULL, 20),
(17, 'Torres', 'Vendedor', 1103, '1995-09-23', 1330, 80, 30),
(18, 'Antonio', 'Empleado', 1104, '1981-08-07', 1138, 87, 40),
(19, 'Pérez', 'Investigad', 1101, '1992-09-06', 1130, NULL, 20),
(20, 'Jonhson', 'Investigad', 1102, '1992-09-04', 1130, NULL, 20),
(21, 'Pérez-Arad', 'Vendedor', 1103, '1994-04-07', 1330, 80, 30),
(22, 'Smith', 'Empleado', 1104, '1981-01-07', 1138, 87, 40),
(23, 'Sanchez', 'Investigad', 1101, '1997-09-02', 1130, NULL, 20),
(24, 'García', 'Investigad', 1102, '1999-02-07', 1130, NULL, 20);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
