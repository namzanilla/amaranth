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
-- Table structure for table `data_type`
--

DROP TABLE IF EXISTS `data_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_type`
--

LOCK TABLES `data_type` WRITE;
/*!40000 ALTER TABLE `data_type` DISABLE KEYS */;
INSERT INTO `data_type` VALUES (3,'float'),(2,'int'),(4,'string'),(1,'uint');
/*!40000 ALTER TABLE `data_type` ENABLE KEYS */;
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
-- Table structure for table `meta_key`
--

DROP TABLE IF EXISTS `meta_key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meta_key` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta_key`
--

LOCK TABLES `meta_key` WRITE;
/*!40000 ALTER TABLE `meta_key` DISABLE KEYS */;
INSERT INTO `meta_key` VALUES (1,'product_brand','Бренд товара'),(2,'product_net_weight_gramm','Вес нетто товара (в граммах) '),(3,'product_flavor','Вкус товара'),(4,'product_brand_model','Линека бренда товара');
/*!40000 ALTER TABLE `meta_key` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meta_value`
--

DROP TABLE IF EXISTS `meta_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meta_value` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `meta_key_id` int unsigned NOT NULL,
  `data_type_id` int unsigned NOT NULL DEFAULT '4',
  `name` text,
  PRIMARY KEY (`id`),
  KEY `fk_meta_value_meta_id_idx` (`meta_key_id`),
  KEY `fk_meta_value_data_type_id_idx` (`data_type_id`),
  CONSTRAINT `fk_meta_value_data_type_id` FOREIGN KEY (`data_type_id`) REFERENCES `data_type` (`id`),
  CONSTRAINT `fk_meta_value_meta_key_id` FOREIGN KEY (`meta_key_id`) REFERENCES `meta_key` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta_value`
--

LOCK TABLES `meta_value` WRITE;
/*!40000 ALTER TABLE `meta_value` DISABLE KEYS */;
INSERT INTO `meta_value` VALUES (1,4,4,'Gold Standard 100% Whey'),(2,1,4,'Optimum Nutrition'),(3,1,4,'Now Foods'),(4,2,1,'454'),(5,2,1,'819'),(6,2,1,'837'),(7,2,1,'896'),(8,2,1,'899'),(9,2,1,'907'),(10,2,1,'2100'),(11,2,1,'2240'),(12,2,1,'2260'),(13,2,1,'2270'),(14,2,1,'3470'),(15,2,1,'3530'),(16,3,4,'Banana Cream'),(17,3,4,'Birthday Cake'),(18,3,4,'Blueberry Cheese Cake'),(19,3,4,'Cake Batter'),(20,3,4,'Cake Donut'),(21,3,4,'Chocolate Coconut'),(22,3,4,'Chocolate Hazelnut'),(23,3,4,'Chocolate Malt'),(24,3,4,'Chocolate Mint'),(25,3,4,'Chocolate Peanut Butter'),(26,3,4,'Coffee'),(27,3,4,'Cookies & Cream'),(28,3,4,'Double Rich Chocolate'),(29,3,4,'Dulce De Leche'),(30,3,4,'Extreme Milk Chocolate'),(31,3,4,'French Vanilla Creme'),(32,3,4,'Gingerbread'),(33,3,4,'Key Lime Pie'),(34,3,4,'Mocha Cappuccino'),(35,3,4,'Peppermint Mocha'),(36,3,4,'Rocky Road'),(37,3,4,'Salted Caramel'),(38,3,4,'Strawberries & Cream'),(39,3,4,'Strawberry'),(40,3,4,'Strawberry Banana'),(41,3,4,'Unflavored'),(42,3,4,'Vanilla Ice Cream'),(43,3,4,'White Chocolate');
/*!40000 ALTER TABLE `meta_value` ENABLE KEYS */;
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
-- Table structure for table `product2meta_value`
--

DROP TABLE IF EXISTS `product2meta_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product2meta_value` (
  `product_id` bigint unsigned NOT NULL,
  `meta_value_id` bigint unsigned NOT NULL,
  UNIQUE KEY `uq` (`product_id`,`meta_value_id`),
  KEY `fk_product2meta_value_product_id_idx` (`product_id`),
  KEY `fk_product2meta_value_meta_value_id_idx` (`meta_value_id`),
  CONSTRAINT `fk_product2meta_value_meta_value_id` FOREIGN KEY (`meta_value_id`) REFERENCES `meta_value` (`id`),
  CONSTRAINT `fk_product2meta_value_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product2meta_value`
--

LOCK TABLES `product2meta_value` WRITE;
/*!40000 ALTER TABLE `product2meta_value` DISABLE KEYS */;
INSERT INTO `product2meta_value` VALUES (1,1),(1,2),(1,4),(1,16),(2,1),(2,2),(2,5),(2,16),(3,1),(3,2),(3,6),(3,16),(4,1),(4,2),(4,7),(4,16),(5,1),(5,2),(5,8),(5,16),(6,1),(6,2),(6,9),(6,16),(7,1),(7,2),(7,10),(7,16),(8,1),(8,2),(8,11),(8,16),(9,1),(9,2),(9,12),(9,16),(10,1),(10,2),(10,13),(10,16),(11,1),(11,2),(11,14),(11,16),(12,1),(12,2),(12,15),(12,16),(13,1),(13,2),(13,4),(13,17),(14,1),(14,2),(14,5),(14,17),(15,1),(15,2),(15,6),(15,17),(16,1),(16,2),(16,7),(16,17),(17,1),(17,2),(17,8),(17,17),(18,1),(18,2),(18,9),(18,17),(19,1),(19,2),(19,10),(19,17),(20,1),(20,2),(20,11),(20,17),(21,1),(21,2),(21,12),(21,17),(22,1),(22,2),(22,13),(22,17),(23,1),(23,2),(23,14),(23,17),(24,1),(24,2),(24,15),(24,17),(25,1),(25,2),(25,4),(25,18),(26,1),(26,2),(26,5),(26,18),(27,1),(27,2),(27,6),(27,18),(28,1),(28,2),(28,7),(28,18),(29,1),(29,2),(29,8),(29,18),(30,1),(30,2),(30,9),(30,18),(31,1),(31,2),(31,10),(31,18),(32,1),(32,2),(32,11),(32,18),(33,1),(33,2),(33,12),(33,18),(34,1),(34,2),(34,13),(34,18),(35,1),(35,2),(35,14),(35,18),(36,1),(36,2),(36,15),(36,18),(37,1),(37,2),(37,4),(37,19),(38,1),(38,2),(38,5),(38,19),(39,1),(39,2),(39,6),(39,19),(40,1),(40,2),(40,7),(40,19),(41,1),(41,2),(41,8),(41,19),(42,1),(42,2),(42,9),(42,19),(43,1),(43,2),(43,10),(43,19),(44,1),(44,2),(44,11),(44,19),(45,1),(45,2),(45,12),(45,19),(46,1),(46,2),(46,13),(46,19),(47,1),(47,2),(47,14),(47,19),(48,1),(48,2),(48,15),(48,19),(49,1),(49,2),(49,4),(49,20),(50,1),(50,2),(50,5),(50,20),(51,1),(51,2),(51,6),(51,20),(52,1),(52,2),(52,7),(52,20),(53,1),(53,2),(53,8),(53,20),(54,1),(54,2),(54,9),(54,20),(55,1),(55,2),(55,10),(55,20),(56,1),(56,2),(56,11),(56,20),(57,1),(57,2),(57,12),(57,20),(58,1),(58,2),(58,13),(58,20),(59,1),(59,2),(59,14),(59,20),(60,1),(60,2),(60,15),(60,20),(61,1),(61,2),(61,4),(61,21),(62,1),(62,2),(62,5),(62,21),(63,1),(63,2),(63,6),(63,21),(64,1),(64,2),(64,7),(64,21),(65,1),(65,2),(65,8),(65,21),(66,1),(66,2),(66,9),(66,21),(67,1),(67,2),(67,10),(67,21),(68,1),(68,2),(68,11),(68,21),(69,1),(69,2),(69,12),(69,21),(70,1),(70,2),(70,13),(70,21),(71,1),(71,2),(71,14),(71,21),(72,1),(72,2),(72,15),(72,21),(73,1),(73,2),(73,4),(73,22),(74,1),(74,2),(74,5),(74,22),(75,1),(75,2),(75,6),(75,22),(76,1),(76,2),(76,7),(76,22),(77,1),(77,2),(77,8),(77,22),(78,1),(78,2),(78,9),(78,22),(79,1),(79,2),(79,10),(79,22),(80,1),(80,2),(80,11),(80,22),(81,1),(81,2),(81,12),(81,22),(82,1),(82,2),(82,13),(82,22),(83,1),(83,2),(83,14),(83,22),(84,1),(84,2),(84,15),(84,22),(85,1),(85,2),(85,4),(85,23),(86,1),(86,2),(86,5),(86,23),(87,1),(87,2),(87,6),(87,23),(88,1),(88,2),(88,7),(88,23),(89,1),(89,2),(89,8),(89,23),(90,1),(90,2),(90,9),(90,23),(91,1),(91,2),(91,10),(91,23),(92,1),(92,2),(92,11),(92,23),(93,1),(93,2),(93,12),(93,23),(94,1),(94,2),(94,13),(94,23),(95,1),(95,2),(95,14),(95,23),(96,1),(96,2),(96,15),(96,23),(97,1),(97,2),(97,4),(97,24),(98,1),(98,2),(98,5),(98,24),(99,1),(99,2),(99,6),(99,24),(100,1),(100,2),(100,7),(100,24),(101,1),(101,2),(101,8),(101,24),(102,1),(102,2),(102,9),(102,24),(103,1),(103,2),(103,10),(103,24),(104,1),(104,2),(104,11),(104,24),(105,1),(105,2),(105,12),(105,24),(106,1),(106,2),(106,13),(106,24),(107,1),(107,2),(107,14),(107,24),(108,1),(108,2),(108,15),(108,24),(109,1),(109,2),(109,4),(109,25),(110,1),(110,2),(110,5),(110,25),(111,1),(111,2),(111,6),(111,25),(112,1),(112,2),(112,7),(112,25),(113,1),(113,2),(113,8),(113,25),(114,1),(114,2),(114,9),(114,25),(115,1),(115,2),(115,10),(115,25),(116,1),(116,2),(116,11),(116,25),(117,1),(117,2),(117,12),(117,25),(118,1),(118,2),(118,13),(118,25),(119,1),(119,2),(119,14),(119,25),(120,1),(120,2),(120,15),(120,25),(121,1),(121,2),(121,4),(121,26),(122,1),(122,2),(122,5),(122,26),(123,1),(123,2),(123,6),(123,26),(124,1),(124,2),(124,7),(124,26),(125,1),(125,2),(125,8),(125,26),(126,1),(126,2),(126,9),(126,26),(127,1),(127,2),(127,10),(127,26),(128,1),(128,2),(128,11),(128,26),(129,1),(129,2),(129,12),(129,26),(130,1),(130,2),(130,13),(130,26),(131,1),(131,2),(131,14),(131,26),(132,1),(132,2),(132,15),(132,26),(133,1),(133,2),(133,4),(133,27),(134,1),(134,2),(134,5),(134,27),(135,1),(135,2),(135,6),(135,27),(136,1),(136,2),(136,7),(136,27),(137,1),(137,2),(137,8),(137,27),(138,1),(138,2),(138,9),(138,27),(139,1),(139,2),(139,10),(139,27),(140,1),(140,2),(140,11),(140,27),(141,1),(141,2),(141,12),(141,27),(142,1),(142,2),(142,13),(142,27),(143,1),(143,2),(143,14),(143,27),(144,1),(144,2),(144,15),(144,27),(145,1),(145,2),(145,4),(145,28),(146,1),(146,2),(146,5),(146,28),(147,1),(147,2),(147,6),(147,28),(148,1),(148,2),(148,7),(148,28),(149,1),(149,2),(149,8),(149,28),(150,1),(150,2),(150,9),(150,28),(151,1),(151,2),(151,10),(151,28),(152,1),(152,2),(152,11),(152,28),(153,1),(153,2),(153,12),(153,28),(154,1),(154,2),(154,13),(154,28),(155,1),(155,2),(155,14),(155,28),(156,1),(156,2),(156,15),(156,28),(157,1),(157,2),(157,4),(157,29),(158,1),(158,2),(158,5),(158,29),(159,1),(159,2),(159,6),(159,29),(160,1),(160,2),(160,7),(160,29),(161,1),(161,2),(161,8),(161,29),(162,1),(162,2),(162,9),(162,29),(163,1),(163,2),(163,10),(163,29),(164,1),(164,2),(164,11),(164,29),(165,1),(165,2),(165,12),(165,29),(166,1),(166,2),(166,13),(166,29),(167,1),(167,2),(167,14),(167,29),(168,1),(168,2),(168,15),(168,29),(169,1),(169,2),(169,4),(169,30),(170,1),(170,2),(170,5),(170,30),(171,1),(171,2),(171,6),(171,30),(172,1),(172,2),(172,7),(172,30),(173,1),(173,2),(173,8),(173,30),(174,1),(174,2),(174,9),(174,30),(175,1),(175,2),(175,10),(175,30),(176,1),(176,2),(176,11),(176,30),(177,1),(177,2),(177,12),(177,30),(178,1),(178,2),(178,13),(178,30),(179,1),(179,2),(179,14),(179,30),(180,1),(180,2),(180,15),(180,30),(181,1),(181,2),(181,4),(181,31),(182,1),(182,2),(182,5),(182,31),(183,1),(183,2),(183,6),(183,31),(184,1),(184,2),(184,7),(184,31),(185,1),(185,2),(185,8),(185,31),(186,1),(186,2),(186,9),(186,31),(187,1),(187,2),(187,10),(187,31),(188,1),(188,2),(188,11),(188,31),(189,1),(189,2),(189,12),(189,31),(190,1),(190,2),(190,13),(190,31),(191,1),(191,2),(191,14),(191,31),(192,1),(192,2),(192,15),(192,31),(193,1),(193,2),(193,4),(193,32),(194,1),(194,2),(194,5),(194,32),(195,1),(195,2),(195,6),(195,32),(196,1),(196,2),(196,7),(196,32),(197,1),(197,2),(197,8),(197,32),(198,1),(198,2),(198,9),(198,32),(199,1),(199,2),(199,10),(199,32),(200,1),(200,2),(200,11),(200,32),(201,1),(201,2),(201,12),(201,32),(202,1),(202,2),(202,13),(202,32),(203,1),(203,2),(203,14),(203,32),(204,1),(204,2),(204,15),(204,32),(205,1),(205,2),(205,4),(205,33),(206,1),(206,2),(206,5),(206,33),(207,1),(207,2),(207,6),(207,33),(208,1),(208,2),(208,7),(208,33),(209,1),(209,2),(209,8),(209,33),(210,1),(210,2),(210,9),(210,33),(211,1),(211,2),(211,10),(211,33),(212,1),(212,2),(212,11),(212,33),(213,1),(213,2),(213,12),(213,33),(214,1),(214,2),(214,13),(214,33),(215,1),(215,2),(215,14),(215,33),(216,1),(216,2),(216,15),(216,33),(217,1),(217,2),(217,4),(217,34),(218,1),(218,2),(218,5),(218,34),(219,1),(219,2),(219,6),(219,34),(220,1),(220,2),(220,7),(220,34),(221,1),(221,2),(221,8),(221,34),(222,1),(222,2),(222,9),(222,34),(223,1),(223,2),(223,10),(223,34),(224,1),(224,2),(224,11),(224,34),(225,1),(225,2),(225,12),(225,34),(226,1),(226,2),(226,13),(226,34),(227,1),(227,2),(227,14),(227,34),(228,1),(228,2),(228,15),(228,34),(229,1),(229,2),(229,4),(229,35),(230,1),(230,2),(230,5),(230,35),(231,1),(231,2),(231,6),(231,35),(232,1),(232,2),(232,7),(232,35),(233,1),(233,2),(233,8),(233,35),(234,1),(234,2),(234,9),(234,35),(235,1),(235,2),(235,10),(235,35),(236,1),(236,2),(236,11),(236,35),(237,1),(237,2),(237,12),(237,35),(238,1),(238,2),(238,13),(238,35),(239,1),(239,2),(239,14),(239,35),(240,1),(240,2),(240,15),(240,35),(241,1),(241,2),(241,4),(241,36),(242,1),(242,2),(242,5),(242,36),(243,1),(243,2),(243,6),(243,36),(244,1),(244,2),(244,7),(244,36),(245,1),(245,2),(245,8),(245,36),(246,1),(246,2),(246,9),(246,36),(247,1),(247,2),(247,10),(247,36),(248,1),(248,2),(248,11),(248,36),(249,1),(249,2),(249,12),(249,36),(250,1),(250,2),(250,13),(250,36),(251,1),(251,2),(251,14),(251,36),(252,1),(252,2),(252,15),(252,36),(253,1),(253,2),(253,4),(253,37),(254,1),(254,2),(254,5),(254,37),(255,1),(255,2),(255,6),(255,37),(256,1),(256,2),(256,7),(256,37),(257,1),(257,2),(257,8),(257,37),(258,1),(258,2),(258,9),(258,37),(259,1),(259,2),(259,10),(259,37),(260,1),(260,2),(260,11),(260,37),(261,1),(261,2),(261,12),(261,37),(262,1),(262,2),(262,13),(262,37),(263,1),(263,2),(263,14),(263,37),(264,1),(264,2),(264,15),(264,37),(265,1),(265,2),(265,4),(265,38),(266,1),(266,2),(266,5),(266,38),(267,1),(267,2),(267,6),(267,38),(268,1),(268,2),(268,7),(268,38),(269,1),(269,2),(269,8),(269,38),(270,1),(270,2),(270,9),(270,38),(271,1),(271,2),(271,10),(271,38),(272,1),(272,2),(272,11),(272,38),(273,1),(273,2),(273,12),(273,38),(274,1),(274,2),(274,13),(274,38),(275,1),(275,2),(275,14),(275,38),(276,1),(276,2),(276,15),(276,38),(277,1),(277,2),(277,4),(277,39),(278,1),(278,2),(278,5),(278,39),(279,1),(279,2),(279,6),(279,39),(280,1),(280,2),(280,7),(280,39),(281,1),(281,2),(281,8),(281,39),(282,1),(282,2),(282,9),(282,39),(283,1),(283,2),(283,10),(283,39),(284,1),(284,2),(284,11),(284,39),(285,1),(285,2),(285,12),(285,39),(286,1),(286,2),(286,13),(286,39),(287,1),(287,2),(287,14),(287,39),(288,1),(288,2),(288,15),(288,39),(289,1),(289,2),(289,4),(289,40),(290,1),(290,2),(290,5),(290,40),(291,1),(291,2),(291,6),(291,40),(292,1),(292,2),(292,7),(292,40),(293,1),(293,2),(293,8),(293,40),(294,1),(294,2),(294,9),(294,40),(295,1),(295,2),(295,10),(295,40),(296,1),(296,2),(296,11),(296,40),(297,1),(297,2),(297,12),(297,40),(298,1),(298,2),(298,13),(298,40),(299,1),(299,2),(299,14),(299,40),(300,1),(300,2),(300,15),(300,40),(301,1),(301,2),(301,4),(301,41),(302,1),(302,2),(302,5),(302,41),(303,1),(303,2),(303,6),(303,41),(304,1),(304,2),(304,7),(304,41),(305,1),(305,2),(305,8),(305,41),(306,1),(306,2),(306,9),(306,41),(307,1),(307,2),(307,10),(307,41),(308,1),(308,2),(308,11),(308,41),(309,1),(309,2),(309,12),(309,41),(310,1),(310,2),(310,13),(310,41),(311,1),(311,2),(311,14),(311,41),(312,1),(312,2),(312,15),(312,41),(313,1),(313,2),(313,4),(313,42),(314,1),(314,2),(314,5),(314,42),(315,1),(315,2),(315,6),(315,42),(316,1),(316,2),(316,7),(316,42),(317,1),(317,2),(317,8),(317,42),(318,1),(318,2),(318,9),(318,42),(319,1),(319,2),(319,10),(319,42),(320,1),(320,2),(320,11),(320,42),(321,1),(321,2),(321,12),(321,42),(322,1),(322,2),(322,13),(322,42),(323,1),(323,2),(323,14),(323,42),(324,1),(324,2),(324,15),(324,42),(325,1),(325,2),(325,4),(325,43),(326,1),(326,2),(326,5),(326,43),(327,1),(327,2),(327,6),(327,43),(328,1),(328,2),(328,7),(328,43),(329,1),(329,2),(329,8),(329,43),(330,1),(330,2),(330,9),(330,43),(331,1),(331,2),(331,10),(331,43),(332,1),(332,2),(332,11),(332,43),(333,1),(333,2),(333,12),(333,43),(334,1),(334,2),(334,13),(334,43),(335,1),(335,2),(335,14),(335,43),(336,1),(336,2),(336,15),(336,43);
/*!40000 ALTER TABLE `product2meta_value` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-26 13:36:46
