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
-- Definition of table `depositos`
--

DROP TABLE IF EXISTS `depositos`;
CREATE TABLE `depositos` (
  `codigodeposito` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `numerodeposito` varchar(45) NOT NULL,
  `codigopersona` int(10) unsigned NOT NULL,
  `fechadeposito` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `valordeposito` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`codigodeposito`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `depositos`
--

/*!40000 ALTER TABLE `depositos` DISABLE KEYS */;
INSERT INTO `depositos` (`codigodeposito`,`numerodeposito`,`codigopersona`,`fechadeposito`,`valordeposito`) VALUES 
 (1,'10001',2,'2019-12-01 00:00:00','20.00'),
 (2,'10002',1,'2019-12-01 00:00:00','100.00'),
 (3,'10003',3,'2019-12-11 23:10:14','15.50');
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
