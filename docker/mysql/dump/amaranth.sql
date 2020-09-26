-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: amaranth
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Optimum Nutrition'),(2,'Now Foods');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand_model`
--

DROP TABLE IF EXISTS `brand_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand_model` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `brand_id` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_brand_model_brand_id_idx` (`brand_id`),
  CONSTRAINT `fk_brand_model_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand_model`
--

LOCK TABLES `brand_model` WRITE;
/*!40000 ALTER TABLE `brand_model` DISABLE KEYS */;
INSERT INTO `brand_model` VALUES (1,1,'Gold Standard 100% Whey');
/*!40000 ALTER TABLE `brand_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `parent` int unsigned NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '0',
  `group` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Бренды',0,0,1,1),(2,'Пищевые добавки',0,0,0,0),(3,'Моноподи для селфі',1,1,0,0),(4,'Тримачі для телефонів',1,0,0,0),(6,'Протеин',2,0,0,0),(7,'Аминокислоты',2,0,0,0),(8,'Витамины',2,0,0,0),(9,'Optimum Nutrition',1,0,1,1),(10,'Now Foods',1,0,1,1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_trans`
--

DROP TABLE IF EXISTS `category_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_trans` (
  `category_id` int unsigned NOT NULL,
  `language_id` int unsigned NOT NULL,
  `name` varchar(32) NOT NULL,
  UNIQUE KEY `uq` (`category_id`,`language_id`),
  KEY `fk_category_trans_category_id_idx` (`category_id`),
  KEY `fk_category_trans_language_id_idx` (`language_id`),
  CONSTRAINT `fk_category_trans_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_category_trans_language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_trans`
--

LOCK TABLES `category_trans` WRITE;
/*!40000 ALTER TABLE `category_trans` DISABLE KEYS */;
INSERT INTO `category_trans` VALUES (1,1,'Бренди'),(1,2,'Бренды'),(2,1,'Харчові добавки'),(2,2,'Пищевые добавки'),(3,1,'Моноподи для селфі'),(3,2,'Моноподы для селфи'),(4,1,'Тримачі для телефонів'),(4,2,'Держатели для телефонов'),(6,1,'Протеїн'),(6,2,'Протеин'),(7,1,'Амінокислоти'),(7,2,'Аминокислоты'),(8,1,'Витаміни'),(8,2,'Витамины');
/*!40000 ALTER TABLE `category_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `default` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,'Українська',1),(2,'Русский',NULL);
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meta`
--

DROP TABLE IF EXISTS `meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meta` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta`
--

LOCK TABLES `meta` WRITE;
/*!40000 ALTER TABLE `meta` DISABLE KEYS */;
INSERT INTO `meta` VALUES (1,'product_brand','Object ID - бренд'),(2,'product_net_weight_gramm','uInt - вес нетто (в граммах) '),(3,'product_flavor','Object ID - вкус или аромат'),(4,'product_model','Object ID - линека бренда');
/*!40000 ALTER TABLE `meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=337 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 1 LB (454 G)'),(2,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 1.81 LB (819 G)'),(3,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 1.84 LB (837 G)'),(4,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 1.97 LB (896 G)'),(5,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 1.98 LB (899 G)'),(6,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 2 LB (907 G)'),(7,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 4.63 LB (2.1 KG)'),(8,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 4.94 LB (2.24 KG)'),(9,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 4.98 LB (2.26 KG)'),(10,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 5 LB (2.27 KG)'),(11,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 7.64 LB (3.47 KG)'),(12,'Optimum Nutrition, Gold Standard 100% Whey, Banana Cream, 7.79 LB (3.53 KG)'),(13,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 1 LB (454 G)'),(14,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 1.81 LB (819 G)'),(15,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 1.84 LB (837 G)'),(16,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 1.97 LB (896 G)'),(17,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 1.98 LB (899 G)'),(18,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 2 LB (907 G)'),(19,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 4.63 LB (2.1 KG)'),(20,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 4.94 LB (2.24 KG)'),(21,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 4.98 LB (2.26 KG)'),(22,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 5 LB (2.27 KG)'),(23,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 7.64 LB (3.47 KG)'),(24,'Optimum Nutrition, Gold Standard 100% Whey, Birthday Cake, 7.79 LB (3.53 KG)'),(25,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 1 LB (454 G)'),(26,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 1.81 LB (819 G)'),(27,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 1.84 LB (837 G)'),(28,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 1.97 LB (896 G)'),(29,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 1.98 LB (899 G)'),(30,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 2 LB (907 G)'),(31,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 4.63 LB (2.1 KG)'),(32,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 4.94 LB (2.24 KG)'),(33,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 4.98 LB (2.26 KG)'),(34,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 5 LB (2.27 KG)'),(35,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 7.64 LB (3.47 KG)'),(36,'Optimum Nutrition, Gold Standard 100% Whey, Blueberry Cheese Cake, 7.79 LB (3.53 KG)'),(37,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 1 LB (454 G)'),(38,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 1.81 LB (819 G)'),(39,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 1.84 LB (837 G)'),(40,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 1.97 LB (896 G)'),(41,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 1.98 LB (899 G)'),(42,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 2 LB (907 G)'),(43,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 4.63 LB (2.1 KG)'),(44,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 4.94 LB (2.24 KG)'),(45,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 4.98 LB (2.26 KG)'),(46,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 5 LB (2.27 KG)'),(47,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 7.64 LB (3.47 KG)'),(48,'Optimum Nutrition, Gold Standard 100% Whey, Cake Batter, 7.79 LB (3.53 KG)'),(49,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 1 LB (454 G)'),(50,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 1.81 LB (819 G)'),(51,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 1.84 LB (837 G)'),(52,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 1.97 LB (896 G)'),(53,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 1.98 LB (899 G)'),(54,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 2 LB (907 G)'),(55,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 4.63 LB (2.1 KG)'),(56,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 4.94 LB (2.24 KG)'),(57,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 4.98 LB (2.26 KG)'),(58,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 5 LB (2.27 KG)'),(59,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 7.64 LB (3.47 KG)'),(60,'Optimum Nutrition, Gold Standard 100% Whey, Cake Donut, 7.79 LB (3.53 KG)'),(61,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 1 LB (454 G)'),(62,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 1.81 LB (819 G)'),(63,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 1.84 LB (837 G)'),(64,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 1.97 LB (896 G)'),(65,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 1.98 LB (899 G)'),(66,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 2 LB (907 G)'),(67,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 4.63 LB (2.1 KG)'),(68,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 4.94 LB (2.24 KG)'),(69,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 4.98 LB (2.26 KG)'),(70,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 5 LB (2.27 KG)'),(71,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 7.64 LB (3.47 KG)'),(72,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Coconut, 7.79 LB (3.53 KG)'),(73,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 1 LB (454 G)'),(74,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 1.81 LB (819 G)'),(75,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 1.84 LB (837 G)'),(76,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 1.97 LB (896 G)'),(77,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 1.98 LB (899 G)'),(78,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 2 LB (907 G)'),(79,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 4.63 LB (2.1 KG)'),(80,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 4.94 LB (2.24 KG)'),(81,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 4.98 LB (2.26 KG)'),(82,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 5 LB (2.27 KG)'),(83,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 7.64 LB (3.47 KG)'),(84,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Hazelnut, 7.79 LB (3.53 KG)'),(85,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 1 LB (454 G)'),(86,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 1.81 LB (819 G)'),(87,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 1.84 LB (837 G)'),(88,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 1.97 LB (896 G)'),(89,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 1.98 LB (899 G)'),(90,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 2 LB (907 G)'),(91,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 4.63 LB (2.1 KG)'),(92,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 4.94 LB (2.24 KG)'),(93,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 4.98 LB (2.26 KG)'),(94,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 5 LB (2.27 KG)'),(95,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 7.64 LB (3.47 KG)'),(96,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Malt, 7.79 LB (3.53 KG)'),(97,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 1 LB (454 G)'),(98,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 1.81 LB (819 G)'),(99,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 1.84 LB (837 G)'),(100,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 1.97 LB (896 G)'),(101,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 1.98 LB (899 G)'),(102,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 2 LB (907 G)'),(103,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 4.63 LB (2.1 KG)'),(104,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 4.94 LB (2.24 KG)'),(105,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 4.98 LB (2.26 KG)'),(106,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 5 LB (2.27 KG)'),(107,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 7.64 LB (3.47 KG)'),(108,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Mint, 7.79 LB (3.53 KG)'),(109,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 1 LB (454 G)'),(110,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 1.81 LB (819 G)'),(111,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 1.84 LB (837 G)'),(112,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 1.97 LB (896 G)'),(113,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 1.98 LB (899 G)'),(114,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 2 LB (907 G)'),(115,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 4.63 LB (2.1 KG)'),(116,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 4.94 LB (2.24 KG)'),(117,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 4.98 LB (2.26 KG)'),(118,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 5 LB (2.27 KG)'),(119,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 7.64 LB (3.47 KG)'),(120,'Optimum Nutrition, Gold Standard 100% Whey, Chocolate Peanut Butter, 7.79 LB (3.53 KG)'),(121,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 1 LB (454 G)'),(122,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 1.81 LB (819 G)'),(123,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 1.84 LB (837 G)'),(124,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 1.97 LB (896 G)'),(125,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 1.98 LB (899 G)'),(126,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 2 LB (907 G)'),(127,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 4.63 LB (2.1 KG)'),(128,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 4.94 LB (2.24 KG)'),(129,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 4.98 LB (2.26 KG)'),(130,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 5 LB (2.27 KG)'),(131,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 7.64 LB (3.47 KG)'),(132,'Optimum Nutrition, Gold Standard 100% Whey, Coffee, 7.79 LB (3.53 KG)'),(133,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 1 LB (454 G)'),(134,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 1.81 LB (819 G)'),(135,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 1.84 LB (837 G)'),(136,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 1.97 LB (896 G)'),(137,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 1.98 LB (899 G)'),(138,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 2 LB (907 G)'),(139,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 4.63 LB (2.1 KG)'),(140,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 4.94 LB (2.24 KG)'),(141,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 4.98 LB (2.26 KG)'),(142,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 5 LB (2.27 KG)'),(143,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 7.64 LB (3.47 KG)'),(144,'Optimum Nutrition, Gold Standard 100% Whey, Cookies & Cream, 7.79 LB (3.53 KG)'),(145,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 1 LB (454 G)'),(146,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 1.81 LB (819 G)'),(147,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 1.84 LB (837 G)'),(148,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 1.97 LB (896 G)'),(149,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 1.98 LB (899 G)'),(150,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 2 LB (907 G)'),(151,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 4.63 LB (2.1 KG)'),(152,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 4.94 LB (2.24 KG)'),(153,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 4.98 LB (2.26 KG)'),(154,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 5 LB (2.27 KG)'),(155,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 7.64 LB (3.47 KG)'),(156,'Optimum Nutrition, Gold Standard 100% Whey, Double Rich Chocolate, 7.79 LB (3.53 KG)'),(157,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 1 LB (454 G)'),(158,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 1.81 LB (819 G)'),(159,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 1.84 LB (837 G)'),(160,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 1.97 LB (896 G)'),(161,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 1.98 LB (899 G)'),(162,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 2 LB (907 G)'),(163,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 4.63 LB (2.1 KG)'),(164,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 4.94 LB (2.24 KG)'),(165,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 4.98 LB (2.26 KG)'),(166,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 5 LB (2.27 KG)'),(167,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 7.64 LB (3.47 KG)'),(168,'Optimum Nutrition, Gold Standard 100% Whey, Dulce De Leche, 7.79 LB (3.53 KG)'),(169,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 1 LB (454 G)'),(170,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 1.81 LB (819 G)'),(171,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 1.84 LB (837 G)'),(172,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 1.97 LB (896 G)'),(173,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 1.98 LB (899 G)'),(174,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 2 LB (907 G)'),(175,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 4.63 LB (2.1 KG)'),(176,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 4.94 LB (2.24 KG)'),(177,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 4.98 LB (2.26 KG)'),(178,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 5 LB (2.27 KG)'),(179,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 7.64 LB (3.47 KG)'),(180,'Optimum Nutrition, Gold Standard 100% Whey, Extreme Milk Chocolate, 7.79 LB (3.53 KG)'),(181,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 1 LB (454 G)'),(182,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 1.81 LB (819 G)'),(183,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 1.84 LB (837 G)'),(184,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 1.97 LB (896 G)'),(185,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 1.98 LB (899 G)'),(186,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 2 LB (907 G)'),(187,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 4.63 LB (2.1 KG)'),(188,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 4.94 LB (2.24 KG)'),(189,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 4.98 LB (2.26 KG)'),(190,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 5 LB (2.27 KG)'),(191,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 7.64 LB (3.47 KG)'),(192,'Optimum Nutrition, Gold Standard 100% Whey, French Vanilla Creme, 7.79 LB (3.53 KG)'),(193,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 1 LB (454 G)'),(194,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 1.81 LB (819 G)'),(195,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 1.84 LB (837 G)'),(196,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 1.97 LB (896 G)'),(197,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 1.98 LB (899 G)'),(198,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 2 LB (907 G)'),(199,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 4.63 LB (2.1 KG)'),(200,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 4.94 LB (2.24 KG)'),(201,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 4.98 LB (2.26 KG)'),(202,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 5 LB (2.27 KG)'),(203,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 7.64 LB (3.47 KG)'),(204,'Optimum Nutrition, Gold Standard 100% Whey, Gingerbread, 7.79 LB (3.53 KG)'),(205,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 1 LB (454 G)'),(206,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 1.81 LB (819 G)'),(207,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 1.84 LB (837 G)'),(208,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 1.97 LB (896 G)'),(209,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 1.98 LB (899 G)'),(210,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 2 LB (907 G)'),(211,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 4.63 LB (2.1 KG)'),(212,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 4.94 LB (2.24 KG)'),(213,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 4.98 LB (2.26 KG)'),(214,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 5 LB (2.27 KG)'),(215,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 7.64 LB (3.47 KG)'),(216,'Optimum Nutrition, Gold Standard 100% Whey, Key Lime Pie, 7.79 LB (3.53 KG)'),(217,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 1 LB (454 G)'),(218,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 1.81 LB (819 G)'),(219,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 1.84 LB (837 G)'),(220,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 1.97 LB (896 G)'),(221,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 1.98 LB (899 G)'),(222,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 2 LB (907 G)'),(223,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 4.63 LB (2.1 KG)'),(224,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 4.94 LB (2.24 KG)'),(225,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 4.98 LB (2.26 KG)'),(226,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 5 LB (2.27 KG)'),(227,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 7.64 LB (3.47 KG)'),(228,'Optimum Nutrition, Gold Standard 100% Whey, Mocha Cappuccino, 7.79 LB (3.53 KG)'),(229,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 1 LB (454 G)'),(230,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 1.81 LB (819 G)'),(231,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 1.84 LB (837 G)'),(232,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 1.97 LB (896 G)'),(233,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 1.98 LB (899 G)'),(234,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 2 LB (907 G)'),(235,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 4.63 LB (2.1 KG)'),(236,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 4.94 LB (2.24 KG)'),(237,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 4.98 LB (2.26 KG)'),(238,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 5 LB (2.27 KG)'),(239,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 7.64 LB (3.47 KG)'),(240,'Optimum Nutrition, Gold Standard 100% Whey, Peppermint Mocha, 7.79 LB (3.53 KG)'),(241,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 1 LB (454 G)'),(242,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 1.81 LB (819 G)'),(243,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 1.84 LB (837 G)'),(244,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 1.97 LB (896 G)'),(245,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 1.98 LB (899 G)'),(246,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 2 LB (907 G)'),(247,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 4.63 LB (2.1 KG)'),(248,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 4.94 LB (2.24 KG)'),(249,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 4.98 LB (2.26 KG)'),(250,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 5 LB (2.27 KG)'),(251,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 7.64 LB (3.47 KG)'),(252,'Optimum Nutrition, Gold Standard 100% Whey, Rocky Road, 7.79 LB (3.53 KG)'),(253,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 1 LB (454 G)'),(254,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 1.81 LB (819 G)'),(255,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 1.84 LB (837 G)'),(256,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 1.97 LB (896 G)'),(257,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 1.98 LB (899 G)'),(258,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 2 LB (907 G)'),(259,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 4.63 LB (2.1 KG)'),(260,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 4.94 LB (2.24 KG)'),(261,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 4.98 LB (2.26 KG)'),(262,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 5 LB (2.27 KG)'),(263,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 7.64 LB (3.47 KG)'),(264,'Optimum Nutrition, Gold Standard 100% Whey, Salted Caramel, 7.79 LB (3.53 KG)'),(265,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 1 LB (454 G)'),(266,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 1.81 LB (819 G)'),(267,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 1.84 LB (837 G)'),(268,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 1.97 LB (896 G)'),(269,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 1.98 LB (899 G)'),(270,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 2 LB (907 G)'),(271,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 4.63 LB (2.1 KG)'),(272,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 4.94 LB (2.24 KG)'),(273,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 4.98 LB (2.26 KG)'),(274,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 5 LB (2.27 KG)'),(275,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 7.64 LB (3.47 KG)'),(276,'Optimum Nutrition, Gold Standard 100% Whey, Strawberries & Cream, 7.79 LB (3.53 KG)'),(277,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 1 LB (454 G)'),(278,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 1.81 LB (819 G)'),(279,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 1.84 LB (837 G)'),(280,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 1.97 LB (896 G)'),(281,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 1.98 LB (899 G)'),(282,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 2 LB (907 G)'),(283,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 4.63 LB (2.1 KG)'),(284,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 4.94 LB (2.24 KG)'),(285,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 4.98 LB (2.26 KG)'),(286,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 5 LB (2.27 KG)'),(287,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 7.64 LB (3.47 KG)'),(288,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry, 7.79 LB (3.53 KG)'),(289,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 1 LB (454 G)'),(290,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 1.81 LB (819 G)'),(291,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 1.84 LB (837 G)'),(292,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 1.97 LB (896 G)'),(293,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 1.98 LB (899 G)'),(294,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 2 LB (907 G)'),(295,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 4.63 LB (2.1 KG)'),(296,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 4.94 LB (2.24 KG)'),(297,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 4.98 LB (2.26 KG)'),(298,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 5 LB (2.27 KG)'),(299,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 7.64 LB (3.47 KG)'),(300,'Optimum Nutrition, Gold Standard 100% Whey, Strawberry Banana, 7.79 LB (3.53 KG)'),(301,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 1 LB (454 G)'),(302,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 1.81 LB (819 G)'),(303,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 1.84 LB (837 G)'),(304,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 1.97 LB (896 G)'),(305,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 1.98 LB (899 G)'),(306,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 2 LB (907 G)'),(307,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 4.63 LB (2.1 KG)'),(308,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 4.94 LB (2.24 KG)'),(309,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 4.98 LB (2.26 KG)'),(310,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 5 LB (2.27 KG)'),(311,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 7.64 LB (3.47 KG)'),(312,'Optimum Nutrition, Gold Standard 100% Whey, Unflavored, 7.79 LB (3.53 KG)'),(313,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 1 LB (454 G)'),(314,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 1.81 LB (819 G)'),(315,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 1.84 LB (837 G)'),(316,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 1.97 LB (896 G)'),(317,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 1.98 LB (899 G)'),(318,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 2 LB (907 G)'),(319,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 4.63 LB (2.1 KG)'),(320,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 4.94 LB (2.24 KG)'),(321,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 4.98 LB (2.26 KG)'),(322,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 5 LB (2.27 KG)'),(323,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 7.64 LB (3.47 KG)'),(324,'Optimum Nutrition, Gold Standard 100% Whey, Vanilla Ice Cream, 7.79 LB (3.53 KG)'),(325,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 1 LB (454 G)'),(326,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 1.81 LB (819 G)'),(327,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 1.84 LB (837 G)'),(328,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 1.97 LB (896 G)'),(329,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 1.98 LB (899 G)'),(330,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 2 LB (907 G)'),(331,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 4.63 LB (2.1 KG)'),(332,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 4.94 LB (2.24 KG)'),(333,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 4.98 LB (2.26 KG)'),(334,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 5 LB (2.27 KG)'),(335,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 7.64 LB (3.47 KG)'),(336,'Optimum Nutrition, Gold Standard 100% Whey, White Chocolate, 7.79 LB (3.53 KG)');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product2brand`
--

DROP TABLE IF EXISTS `product2brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product2brand` (
  `product_id` bigint unsigned NOT NULL,
  `brand_id` int unsigned NOT NULL,
  UNIQUE KEY `uq` (`product_id`,`brand_id`),
  KEY `fk_product2brand_brand_id_idx` (`brand_id`),
  CONSTRAINT `fk_product2brand_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `fk_product2brand_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product2brand`
--

LOCK TABLES `product2brand` WRITE;
/*!40000 ALTER TABLE `product2brand` DISABLE KEYS */;
INSERT INTO `product2brand` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1),(34,1),(35,1),(36,1),(37,1),(38,1),(39,1),(40,1),(41,1),(42,1),(43,1),(44,1),(45,1),(46,1),(47,1),(48,1),(49,1),(50,1),(51,1),(52,1),(53,1),(54,1),(55,1),(56,1),(57,1),(58,1),(59,1),(60,1),(61,1),(62,1),(63,1),(64,1),(65,1),(66,1),(67,1),(68,1),(69,1),(70,1),(71,1),(72,1),(73,1),(74,1),(75,1),(76,1),(77,1),(78,1),(79,1),(80,1),(81,1),(82,1),(83,1),(84,1),(85,1),(86,1),(87,1),(88,1),(89,1),(90,1),(91,1),(92,1),(93,1),(94,1),(95,1),(96,1),(97,1),(98,1),(99,1),(100,1),(101,1),(102,1),(103,1),(104,1),(105,1),(106,1),(107,1),(108,1),(109,1),(110,1),(111,1),(112,1),(113,1),(114,1),(115,1),(116,1),(117,1),(118,1),(119,1),(120,1),(121,1),(122,1),(123,1),(124,1),(125,1),(126,1),(127,1),(128,1),(129,1),(130,1),(131,1),(132,1),(133,1),(134,1),(135,1),(136,1),(137,1),(138,1),(139,1),(140,1),(141,1),(142,1),(143,1),(144,1),(145,1),(146,1),(147,1),(148,1),(149,1),(150,1),(151,1),(152,1),(153,1),(154,1),(155,1),(156,1),(157,1),(158,1),(159,1),(160,1),(161,1),(162,1),(163,1),(164,1),(165,1),(166,1),(167,1),(168,1),(169,1),(170,1),(171,1),(172,1),(173,1),(174,1),(175,1),(176,1),(177,1),(178,1),(179,1),(180,1),(181,1),(182,1),(183,1),(184,1),(185,1),(186,1),(187,1),(188,1),(189,1),(190,1),(191,1),(192,1),(193,1),(194,1),(195,1),(196,1),(197,1),(198,1),(199,1),(200,1),(201,1),(202,1),(203,1),(204,1),(205,1),(206,1),(207,1),(208,1),(209,1),(210,1),(211,1),(212,1),(213,1),(214,1),(215,1),(216,1),(217,1),(218,1),(219,1),(220,1),(221,1),(222,1),(223,1),(224,1),(225,1),(226,1),(227,1),(228,1),(229,1),(230,1),(231,1),(232,1),(233,1),(234,1),(235,1),(236,1),(237,1),(238,1),(239,1),(240,1),(241,1),(242,1),(243,1),(244,1),(245,1),(246,1),(247,1),(248,1),(249,1),(250,1),(251,1),(252,1),(253,1),(254,1),(255,1),(256,1),(257,1),(258,1),(259,1),(260,1),(261,1),(262,1),(263,1),(264,1),(265,1),(266,1),(267,1),(268,1),(269,1),(270,1),(271,1),(272,1),(273,1),(274,1),(275,1),(276,1),(277,1),(278,1),(279,1),(280,1),(281,1),(282,1),(283,1),(284,1),(285,1),(286,1),(287,1),(288,1),(289,1),(290,1),(291,1),(292,1),(293,1),(294,1),(295,1),(296,1),(297,1),(298,1),(299,1),(300,1),(301,1),(302,1),(303,1),(304,1),(305,1),(306,1),(307,1),(308,1),(309,1),(310,1),(311,1),(312,1),(313,1),(314,1),(315,1),(316,1),(317,1),(318,1),(319,1),(320,1),(321,1),(322,1),(323,1),(324,1),(325,1),(326,1),(327,1),(328,1),(329,1),(330,1),(331,1),(332,1),(333,1),(334,1),(335,1),(336,1);
/*!40000 ALTER TABLE `product2brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product2category`
--

DROP TABLE IF EXISTS `product2category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product2category` (
  `product_id` bigint unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  UNIQUE KEY `uq` (`product_id`,`category_id`),
  KEY `fk_product2category_category_id_idx` (`category_id`),
  CONSTRAINT `fk_product2category_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_product2category_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product2category`
--

LOCK TABLES `product2category` WRITE;
/*!40000 ALTER TABLE `product2category` DISABLE KEYS */;
INSERT INTO `product2category` VALUES (1,9),(2,9),(3,9),(4,9),(5,9),(6,9),(7,9),(8,9),(9,9),(10,9),(11,9),(12,9),(13,9),(14,9),(15,9),(16,9),(17,9),(18,9),(19,9),(20,9),(21,9),(22,9),(23,9),(24,9),(25,9),(26,9),(27,9),(28,9),(29,9),(30,9),(31,9),(32,9),(33,9),(34,9),(35,9),(36,9),(37,9),(38,9),(39,9),(40,9),(41,9),(42,9),(43,9),(44,9),(45,9),(46,9),(47,9),(48,9),(49,9),(50,9),(51,9),(52,9),(53,9),(54,9),(55,9),(56,9),(57,9),(58,9),(59,9),(60,9),(61,9),(62,9),(63,9),(64,9),(65,9),(66,9),(67,9),(68,9),(69,9),(70,9),(71,9),(72,9),(73,9),(74,9),(75,9),(76,9),(77,9),(78,9),(79,9),(80,9),(81,9),(82,9),(83,9),(84,9),(85,9),(86,9),(87,9),(88,9),(89,9),(90,9),(91,9),(92,9),(93,9),(94,9),(95,9),(96,9),(97,9),(98,9),(99,9),(100,9),(101,9),(102,9),(103,9),(104,9),(105,9),(106,9),(107,9),(108,9),(109,9),(110,9),(111,9),(112,9),(113,9),(114,9),(115,9),(116,9),(117,9),(118,9),(119,9),(120,9),(121,9),(122,9),(123,9),(124,9),(125,9),(126,9),(127,9),(128,9),(129,9),(130,9),(131,9),(132,9),(133,9),(134,9),(135,9),(136,9),(137,9),(138,9),(139,9),(140,9),(141,9),(142,9),(143,9),(144,9),(145,9),(146,9),(147,9),(148,9),(149,9),(150,9),(151,9),(152,9),(153,9),(154,9),(155,9),(156,9),(157,9),(158,9),(159,9),(160,9),(161,9),(162,9),(163,9),(164,9),(165,9),(166,9),(167,9),(168,9),(169,9),(170,9),(171,9),(172,9),(173,9),(174,9),(175,9),(176,9),(177,9),(178,9),(179,9),(180,9),(181,9),(182,9),(183,9),(184,9),(185,9),(186,9),(187,9),(188,9),(189,9),(190,9),(191,9),(192,9),(193,9),(194,9),(195,9),(196,9),(197,9),(198,9),(199,9),(200,9),(201,9),(202,9),(203,9),(204,9),(205,9),(206,9),(207,9),(208,9),(209,9),(210,9),(211,9),(212,9),(213,9),(214,9),(215,9),(216,9),(217,9),(218,9),(219,9),(220,9),(221,9),(222,9),(223,9),(224,9),(225,9),(226,9),(227,9),(228,9),(229,9),(230,9),(231,9),(232,9),(233,9),(234,9),(235,9),(236,9),(237,9),(238,9),(239,9),(240,9),(241,9),(242,9),(243,9),(244,9),(245,9),(246,9),(247,9),(248,9),(249,9),(250,9),(251,9),(252,9),(253,9),(254,9),(255,9),(256,9),(257,9),(258,9),(259,9),(260,9),(261,9),(262,9),(263,9),(264,9),(265,9),(266,9),(267,9),(268,9),(269,9),(270,9),(271,9),(272,9),(273,9),(274,9),(275,9),(276,9),(277,9),(278,9),(279,9),(280,9),(281,9),(282,9),(283,9),(284,9),(285,9),(286,9),(287,9),(288,9),(289,9),(290,9),(291,9),(292,9),(293,9),(294,9),(295,9),(296,9),(297,9),(298,9),(299,9),(300,9),(301,9),(302,9),(303,9),(304,9),(305,9),(306,9),(307,9),(308,9),(309,9),(310,9),(311,9),(312,9),(313,9),(314,9),(315,9),(316,9),(317,9),(318,9),(319,9),(320,9),(321,9),(322,9),(323,9),(324,9),(325,9),(326,9),(327,9),(328,9),(329,9),(330,9),(331,9),(332,9),(333,9),(334,9),(335,9),(336,9);
/*!40000 ALTER TABLE `product2category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product2meta`
--

DROP TABLE IF EXISTS `product2meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product2meta` (
  `product_id` bigint unsigned NOT NULL,
  `meta_id` int unsigned NOT NULL,
  UNIQUE KEY `uq` (`product_id`,`meta_id`),
  KEY `fk_product2meta_meta_id_idx` (`meta_id`),
  CONSTRAINT `fk_product2meta_meta_id` FOREIGN KEY (`meta_id`) REFERENCES `meta` (`id`),
  CONSTRAINT `fk_product2meta_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product2meta`
--

LOCK TABLES `product2meta` WRITE;
/*!40000 ALTER TABLE `product2meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `product2meta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-25 16:06:48
