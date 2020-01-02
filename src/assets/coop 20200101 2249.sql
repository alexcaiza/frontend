-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.32


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema coop
--

CREATE DATABASE IF NOT EXISTS coop;
USE coop;

--
-- Definition of table `cuotas`
--

DROP TABLE IF EXISTS `cuotas`;
CREATE TABLE `cuotas` (
  `codigocuota` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcioncuota` varchar(50) DEFAULT NULL,
  `valorcuota` decimal(10,2) NOT NULL,
  `fechainicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fechafin` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`codigocuota`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cuotas`
--

/*!40000 ALTER TABLE `cuotas` DISABLE KEYS */;
INSERT INTO `cuotas` (`codigocuota`,`descripcioncuota`,`valorcuota`,`fechainicio`,`fechafin`) VALUES 
 (1,'Administracion Enero 2019','4.00','2019-01-01 00:00:00','2019-01-31 00:00:00'),
 (2,'Administracion Febrero 2019','4.00','2019-02-01 00:00:00','2019-02-28 00:00:00'),
 (3,'Administracion Marzo 2019','4.00','2019-01-01 00:00:00','2019-01-01 00:00:00'),
 (4,'Administracion Abril 2019','4.00','2019-04-01 10:44:35','2019-04-30 00:00:00'),
 (5,'Administracion Mayo 2019','4.00','2019-12-18 22:27:40','2019-01-01 00:00:00'),
 (6,'Administracion Junio 2019','4.00','2019-01-01 00:00:00','2019-01-01 00:00:00');
/*!40000 ALTER TABLE `cuotas` ENABLE KEYS */;


--
-- Definition of table `depositos`
--

DROP TABLE IF EXISTS `depositos`;
CREATE TABLE `depositos` (
  `codigodeposito` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `numerodeposito` varchar(45) NOT NULL,
  `codigopersona` int(10) unsigned NOT NULL,
  `fechadeposito` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `valordeposito` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tipodeposito` varchar(45) NOT NULL,
  PRIMARY KEY (`codigodeposito`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `depositos`
--

/*!40000 ALTER TABLE `depositos` DISABLE KEYS */;
INSERT INTO `depositos` (`codigodeposito`,`numerodeposito`,`codigopersona`,`fechadeposito`,`valordeposito`,`tipodeposito`) VALUES 
 (1,'10001',2,'2019-12-14 22:45:46','20.00','DEP'),
 (2,'10002',1,'2019-12-14 22:45:46','100.00','DEP'),
 (3,'10003',3,'2019-12-14 22:45:46','15.50','DEP'),
 (4,'10004',2,'2019-12-14 22:45:46','100.20','DEP'),
 (5,'',0,'0000-00-00 00:00:00','0.00',''),
 (6,'',1,'2019-12-15 00:00:00','10.00','DEP'),
 (7,'10005',1,'2019-12-15 00:00:00','10.00','DEP'),
 (8,'10006',1,'2019-12-15 00:00:00','10.00','DEP'),
 (9,'106',1,'2019-12-15 00:00:00','10.00','DEP'),
 (10,'11',1,'2019-12-15 00:00:00','11.00','DEP'),
 (11,'111',1,'2019-12-15 00:00:00','11.00','DEP'),
 (12,'12',1,'2019-12-16 00:00:00','1212.00','DEP');
/*!40000 ALTER TABLE `depositos` ENABLE KEYS */;


--
-- Definition of table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` (`id`,`name`,`price`) VALUES 
 (2,'Alex El Leon',100.01),
 (3,'Cars',12),
 (4,'Josue',9),
 (5,'SPIDERMAN',40),
 (6,'SUPERMAN',40.06);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;


--
-- Definition of table `lotes`
--

DROP TABLE IF EXISTS `lotes`;
CREATE TABLE `lotes` (
  `codigolote` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `codigoreferencia` varchar(45) NOT NULL,
  `codigopersona` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codigolote`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lotes`
--

/*!40000 ALTER TABLE `lotes` DISABLE KEYS */;
INSERT INTO `lotes` (`codigolote`,`codigoreferencia`,`codigopersona`) VALUES 
 (1,'L0T-01',2),
 (2,'LOT-02',3),
 (3,'LOT-03',1),
 (4,'LOT-04',1),
 (5,'LOT-05',1),
 (6,'LOT-06',2);
/*!40000 ALTER TABLE `lotes` ENABLE KEYS */;


--
-- Definition of table `pagocuotalote`
--

DROP TABLE IF EXISTS `pagocuotalote`;
CREATE TABLE `pagocuotalote` (
  `codigopagocuotalote` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `codigocuota` int(10) unsigned NOT NULL,
  `codigodeposito` int(10) unsigned NOT NULL,
  `valorpagocuotalote` decimal(10,2) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `fecharegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `codigolote` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codigopagocuotalote`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pagocuotalote`
--

/*!40000 ALTER TABLE `pagocuotalote` DISABLE KEYS */;
INSERT INTO `pagocuotalote` (`codigopagocuotalote`,`codigocuota`,`codigodeposito`,`valorpagocuotalote`,`estado`,`fecharegistro`,`codigolote`) VALUES 
 (2,1,2,'4.00','1','2020-01-02 00:00:00',3),
 (3,1,2,'4.00','1','2020-01-02 00:00:00',3),
 (4,1,1,'4.00','1','2020-01-02 00:00:00',1),
 (5,1,7,'4.00','1','2020-01-02 00:00:00',3),
 (6,1,2,'4.00','1','2020-01-02 00:00:00',3),
 (7,1,2,'4.00','1','2020-01-02 00:00:00',5);
/*!40000 ALTER TABLE `pagocuotalote` ENABLE KEYS */;


--
-- Definition of table `personas`
--

DROP TABLE IF EXISTS `personas`;
CREATE TABLE `personas` (
  `codigopersona` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `primernombre` varchar(45) NOT NULL,
  `segundonombre` varchar(45) DEFAULT NULL,
  `primerapellido` varchar(45) NOT NULL,
  `segundoapellido` varchar(45) DEFAULT NULL,
  `cedula` varchar(45) NOT NULL,
  PRIMARY KEY (`codigopersona`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personas`
--

/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` (`codigopersona`,`primernombre`,`segundonombre`,`primerapellido`,`segundoapellido`,`cedula`) VALUES 
 (1,'Nelly','','Rosero','','100'),
 (2,'Alex','Raul','Caiza','Morillo','1002556437'),
 (3,'Mariana','Cristina','Montenegro','Guzman','1003001375');
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;


--
-- Definition of table `policies`
--

DROP TABLE IF EXISTS `policies`;
CREATE TABLE `policies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(20) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `policies`
--

/*!40000 ALTER TABLE `policies` DISABLE KEYS */;
INSERT INTO `policies` (`id`,`number`,`amount`) VALUES 
 (1,'100-100',10.05),
 (2,'101-101',1.55),
 (3,'102-102',3),
 (4,'1',1),
 (5,'1',1),
 (6,'2',2),
 (7,'3',3),
 (8,'3',3),
 (9,'4',4);
/*!40000 ALTER TABLE `policies` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
