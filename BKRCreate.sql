CREATE DATABASE  IF NOT EXISTS `bekindrewind`;
USE `bekindrewind`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: bekindrewind
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `zip` int NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `notes` varchar(45) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`customer_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,'Jeff','Spence','22 Elm St.','Santa Cruz','NY',14580,'5555555555','test@test.com',NULL,1,'2022-04-01 10:00:00'),(3,'Tina','Turner','55 Colonial Rd.','Rochester','NY',14609,'6666666666','tina@test.com',NULL,1,'2022-04-01 10:20:00');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_item_rental`
--

DROP TABLE IF EXISTS `customer_item_rental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_item_rental` (
  `item_rental_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `item_id` int NOT NULL,
  `rental_date_out` datetime NOT NULL,
  `rental_date_due` datetime NOT NULL,
  `rental_date_returned` datetime DEFAULT NULL,
  `rental_amount_due` decimal(10,0) NOT NULL,
  `rental_notes` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`item_rental_id`),
  KEY `fk_rental_customer_id_idx` (`customer_id`),
  KEY `fk_rental_item_id_idx` (`item_id`),
  CONSTRAINT `fk_rental_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `fk_rental_item_id` FOREIGN KEY (`item_id`) REFERENCES `inventory_items` (`item_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_item_rental`
--

LOCK TABLES `customer_item_rental` WRITE;
/*!40000 ALTER TABLE `customer_item_rental` DISABLE KEYS */;
INSERT INTO `customer_item_rental` VALUES (2,2,2,'2022-04-01 10:22:00','2022-04-06 10:22:00',NULL,0,NULL),(3,3,4,'2022-04-01 10:23:00','2022-04-06 10:23:00',NULL,0,NULL);
/*!40000 ALTER TABLE `customer_item_rental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_items`
--

DROP TABLE IF EXISTS `inventory_items`;
CREATE TABLE `inventory_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `media_code` smallint NOT NULL,
  `movie_title` varchar(45) NOT NULL,
  `number_in_stock` int NOT NULL,
  `rental_rate` decimal(4,2) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `fk_inventory_media_type_idx` (`media_code`),
  CONSTRAINT `fk_inventory_media_type` FOREIGN KEY (`media_code`) REFERENCES `inventory_media_types` (`item_media_code`)
);
LOCK TABLES `inventory_items` WRITE;
INSERT INTO `inventory_items` VALUES (1,1,'Exorcist',3,5.00),(2,1,'Omen',2,5.00),(3,1,'Children of the Corn',1,5.00),(4,2,'Up',5,5.00),(5,3,'Tron',2,2.00);
UNLOCK TABLES;
DROP TABLE IF EXISTS `inventory_media_types`;
CREATE TABLE `inventory_media_types` (
  `item_media_code` smallint NOT NULL AUTO_INCREMENT,
  `item_media_description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`item_media_code`)
);
LOCK TABLES `inventory_media_types` WRITE;
INSERT INTO `inventory_media_types` VALUES (1,'VHS'),(2,'DVD'),(3,'LASERDISC');
UNLOCK TABLES;
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `session_token` varchar(100) DEFAULT NULL,
  `session_expire` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);
LOCK TABLES `user` WRITE;
UNLOCK TABLES;

