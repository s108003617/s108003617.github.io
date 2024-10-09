-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proj57
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `address_book`
--

DROP TABLE IF EXISTS `address_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_book` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_book`
--

LOCK TABLES `address_book` WRITE;
/*!40000 ALTER TABLE `address_book` DISABLE KEYS */;
INSERT INTO `address_book` VALUES (5,'李小明4','5387@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(6,'李小明5','5297@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(7,'李小明6','324@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(8,'李小明7','5729@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(9,'李小明8','7673@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(10,'李小明9','1179@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(13,'健氣☆ㄟ如','2876@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(17,'李小明4','841@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(18,'李小明5','5580@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(19,'李小明6','5375@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(20,'李小明7','133@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(21,'李小明8','4544@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(22,'李小明9','2319@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(23,'李小明10','7962@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(24,'花蓮雪莉','2854@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(25,'高雄郭郭','383@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(26,'李小明13','3352@gmail.com','0918111222','1990-05-07','台南市','2020-04-06 16:31:02'),(27,'方大同','5613@gmail.com','0918-222555','1990-04-01','新北市','2020-04-08 11:50:22'),(29,'gdsgdsfg','3196@gmail.com','0918-222333','2020-04-08','dfgdfg\r\n                    ','2020-04-09 14:56:05'),(30,'哈老大','1959@gmail.com','0918-222333','2020-04-01','哈老大','2020-04-09 15:11:01'),(33,'方大同','206@gmail.com','0918-222555','2020-04-01','asdfasd','2020-04-09 16:31:09'),(34,'林小白','5155@gmail.com','0999-123-456','1995-05-05','台北市','2020-04-10 09:23:56'),(36,'dfhdfh','5156@gmail.com','fghf','2020-04-09','fgh','2020-04-10 10:12:09'),(37,'>sdfsdasd','316@gmail.com','0918-222333','2020-04-01','sdfgsd','2020-04-10 14:03:13'),(38,'马占超','wtfbigpig2000@yahoo.com','0966771609','2024-05-03','文南路','2024-05-06 01:36:07');
/*!40000 ALTER TABLE `address_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `parent_sid` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'程式設計',0),(2,'繪圖軟體',0),(3,'網際網路應用',0),(4,'PHP',1),(5,'JavaScript',1),(7,'PS',2),(8,'Chrome',3),(9,'騙錢的',3),(10,'C++',1),(16,'椅拉',2);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_data`
--

DROP TABLE IF EXISTS `employee_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_data` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_data`
--

LOCK TABLES `employee_data` WRITE;
/*!40000 ALTER TABLE `employee_data` DISABLE KEYS */;
INSERT INTO `employee_data` VALUES (2,'李四','財務部','會計師','2019-11-28'),(3,'王五','市場部','市場專員','2021-03-10'),(4,'趙六','技術部','軟體工程師','2022-05-20'),(5,'鄭七','行政部','行政助理','2020-09-03'),(6,'马占超','資訊部門','米蟲','2024-05-07');
/*!40000 ALTER TABLE `employee_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `from_csv_01`
--

DROP TABLE IF EXISTS `from_csv_01`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `from_csv_01` (
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `from_csv_01`
--

LOCK TABLES `from_csv_01` WRITE;
/*!40000 ALTER TABLE `from_csv_01` DISABLE KEYS */;
INSERT INTO `from_csv_01` VALUES ('李小明',25,'台北市'),('陳小華',28,'高雄市'),('吳大同',24,'宜蘭縣');
/*!40000 ALTER TABLE `from_csv_01` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `management_reviews`
--

DROP TABLE IF EXISTS `management_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management_reviews` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `manager_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `review_content` text,
  `review_time` datetime DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `management_reviews`
--

LOCK TABLES `management_reviews` WRITE;
/*!40000 ALTER TABLE `management_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `management_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `hash` varchar(255) NOT NULL,
  `activated` int NOT NULL DEFAULT '0',
  `nickname` varchar(255) NOT NULL,
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (3,'shin@gg.com','$2y$10$U9A21ut7J7VpOC7UDvfA5uG.Y7n2qxFK0TWR3Z3PTYSjOI.LGkVqm','0918222333','','1990-02-02','52c61e86824899ca67e8d815a7a7afb0ce43878c',0,'小新','2019-01-07 10:39:38'),(7,'ming@gg.com','$2y$10$U9A21ut7J7VpOC7UDvfA5uG.Y7n2qxFK0TWR3Z3PTYSjOI.LGkVqm','0918222333','','1990-02-02','52c61e86824899ca67e8d815a7a7afb0ce43878c',0,'大明','2019-01-07 10:39:38');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `order_sid` int NOT NULL,
  `product_sid` int NOT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`sid`),
  KEY `order_sid` (`order_sid`),
  KEY `product_sid` (`product_sid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,4,22,580,1),(2,4,17,620,2),(3,4,22,580,1),(4,5,22,580,1),(5,5,17,620,2),(6,9,6,450,1),(7,9,8,520,2),(8,9,22,580,1),(9,10,1,560,1),(10,10,2,420,1),(11,10,3,480,1),(12,11,5,690,2),(13,11,15,650,1);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,2,'2024-05-02',150.50,'處理中'),(3,3,'2024-05-03',200.25,'已付款'),(4,1,'2024-05-04',75.80,'已完成'),(5,4,'2024-05-05',300.00,'處理中'),(6,2,'2024-05-09',30.00,'處理中');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `product_sid` int NOT NULL,
  `color` varchar(255) NOT NULL,
  `size` int NOT NULL,
  `p_no` varchar(255) NOT NULL,
  `imgs` varchar(500) NOT NULL,
  PRIMARY KEY (`sid`),
  KEY `product_sid` (`product_sid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (1,2,'紅色',10,'bbb_red_10_001','a.png,bb.png,c.jpg'),(2,2,'藍色',15,'',''),(3,2,'紅色',20,'bbb_red_20_002',''),(4,2,'藍色',30,'','');
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productreviews`
--

DROP TABLE IF EXISTS `productreviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productreviews` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `review_text` text NOT NULL,
  `rating` int NOT NULL,
  `review_date` date NOT NULL,
  PRIMARY KEY (`sid`),
  CONSTRAINT `productreviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productreviews`
--

LOCK TABLES `productreviews` WRITE;
/*!40000 ALTER TABLE `productreviews` DISABLE KEYS */;
INSERT INTO `productreviews` VALUES (2,2,2,'這個產品超出了我的預期。它運作得非常好。',4,'2024-05-02'),(3,1,3,'對產品的品質不滿意。使用幾次後就壞了。',2,'2024-05-03'),(4,3,4,'這是一個普通的產品。它完成了它的功能，但沒有特別之處。',3,'2024-05-04'),(5,2,5,'這是我用過最差的產品！品質差，客戶服務糟糕。',1,'2024-05-05'),(6,180,100,'vzdfvdzdfasdsad',2,'2024-05-18');
/*!40000 ALTER TABLE `productreviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'三星 Galaxy S22','高性能的安卓智慧手機。',899.99,120,'2024-05-05 17:47:16'),(3,'蘋果筆記型電腦 Pro 16','具有出色性能的專業級筆記型電腦。',1999.99,80,'2024-05-05 17:47:16'),(4,'索尼 PlayStation 5','具有沉浸式遊戲體驗的下一代遊戲主機。',499.99,50,'2024-05-05 17:47:16'),(5,'任天堂 Switch','多功能的遊戲主機，適合隨時隨地遊戲。',299.99,150,'2024-05-05 17:47:16'),(6,'马占超','123',300.00,200,'2024-05-05 18:05:50'),(7,'马占超','',12.00,1,'2024-05-05 18:06:56'),(8,'马占超','dewsd',156.00,156,'2024-05-05 18:09:07'),(9,'马占超','123wadad',123456.00,20,'2024-05-05 18:18:32'),(10,'蘋果手機 13','擁有最新功能的強大智慧手機。',999.99,100,'2024-05-05 18:29:55'),(11,'三星 Galaxy S22','高性能的安卓智慧手機。',899.99,120,'2024-05-05 18:29:55'),(12,'蘋果筆記型電腦 Pro 16','具有出色性能的專業級筆記型電腦。',1999.99,80,'2024-05-05 18:29:55'),(13,'索尼 PlayStation 5','具有沉浸式遊戲體驗的下一代遊戲主機。',499.99,50,'2024-05-05 18:29:55'),(14,'任天堂 Switch','多功能的遊戲主機，適合隨時隨地遊戲。',299.99,150,'2024-05-05 18:29:55'),(15,'蘋果手機 13','擁有最新功能的強大智慧手機。',999.99,100,'2024-05-05 18:29:56'),(16,'三星 Galaxy S22','高性能的安卓智慧手機。',899.99,120,'2024-05-05 18:29:56'),(17,'蘋果筆記型電腦 Pro 16','具有出色性能的專業級筆記型電腦。',1999.99,80,'2024-05-05 18:29:56'),(18,'索尼 PlayStation 5','具有沉浸式遊戲體驗的下一代遊戲主機。',499.99,50,'2024-05-05 18:29:56'),(19,'任天堂 Switch','多功能的遊戲主機，適合隨時隨地遊戲。',299.99,150,'2024-05-05 18:29:56'),(20,'蘋果手機 13','擁有最新功能的強大智慧手機。',999.99,100,'2024-05-05 18:29:56'),(21,'三星 Galaxy S22','高性能的安卓智慧手機。',899.99,120,'2024-05-05 18:29:56'),(22,'蘋果筆記型電腦 Pro 16','具有出色性能的專業級筆記型電腦。',1999.99,80,'2024-05-05 18:29:56'),(23,'索尼 PlayStation 5','具有沉浸式遊戲體驗的下一代遊戲主機。',499.99,50,'2024-05-05 18:29:56'),(24,'任天堂 Switch','多功能的遊戲主機，適合隨時隨地遊戲。',299.99,150,'2024-05-05 18:29:56'),(25,'蘋果手機 13','擁有最新功能的強大智慧手機。',999.99,100,'2024-05-05 18:29:56'),(26,'三星 Galaxy S22','高性能的安卓智慧手機。',899.99,120,'2024-05-05 18:29:56'),(27,'蘋果筆記型電腦 Pro 16','具有出色性能的專業級筆記型電腦。',1999.99,80,'2024-05-05 18:29:56'),(28,'索尼 PlayStation 5','具有沉浸式遊戲體驗的下一代遊戲主機。',499.99,50,'2024-05-05 18:29:56'),(29,'任天堂 Switch','多功能的遊戲主機，適合隨時隨地遊戲。',299.99,150,'2024-05-05 18:29:56'),(30,'蘋果手機 13','擁有最新功能的強大智慧手機。',999.99,100,'2024-05-05 18:29:56'),(31,'三星 Galaxy S22','高性能的安卓智慧手機。',899.99,120,'2024-05-05 18:29:56'),(32,'蘋果筆記型電腦 Pro 16','具有出色性能的專業級筆記型電腦。',1999.99,80,'2024-05-05 18:29:56'),(33,'索尼 PlayStation 5','具有沉浸式遊戲體驗的下一代遊戲主機。',499.99,50,'2024-05-05 18:29:56'),(34,'任天堂 Switch','多功能的遊戲主機，適合隨時隨地遊戲。',299.99,150,'2024-05-05 18:29:56'),(35,'蘋果手機 13','擁有最新功能的強大智慧手機。',999.99,100,'2024-05-05 18:29:56'),(36,'三星 Galaxy S22','高性能的安卓智慧手機。',899.99,120,'2024-05-05 18:29:56'),(37,'蘋果筆記型電腦 Pro 16','具有出色性能的專業級筆記型電腦。',1999.99,80,'2024-05-05 18:29:56'),(38,'索尼 PlayStation 5','具有沉浸式遊戲體驗的下一代遊戲主機。',499.99,50,'2024-05-05 18:29:56'),(39,'任天堂 Switch','多功能的遊戲主機，適合隨時隨地遊戲。',299.99,150,'2024-05-05 18:29:56'),(40,'蘋果手機 13','擁有最新功能的強大智慧手機。',999.99,100,'2024-05-05 18:29:56'),(41,'三星 Galaxy S22','高性能的安卓智慧手機。',899.99,120,'2024-05-05 18:29:56'),(42,'蘋果筆記型電腦 Pro 16','具有出色性能的專業級筆記型電腦。',1999.99,80,'2024-05-05 18:29:56'),(43,'索尼 PlayStation 5','具有沉浸式遊戲體驗的下一代遊戲主機。',499.99,50,'2024-05-05 18:29:56'),(44,'任天堂 Switch','多功能的遊戲主機，適合隨時隨地遊戲。',299.99,150,'2024-05-05 18:29:56'),(45,'蘋果手機 13','擁有最新功能的強大智慧手機。',999.99,100,'2024-05-05 18:29:57'),(46,'三星 Galaxy S22','高性能的安卓智慧手機。',899.99,120,'2024-05-05 18:29:57'),(47,'蘋果筆記型電腦 Pro 16','具有出色性能的專業級筆記型電腦。',1999.99,80,'2024-05-05 18:29:57'),(48,'索尼 PlayStation 5','具有沉浸式遊戲體驗的下一代遊戲主機。',499.99,50,'2024-05-05 18:29:57'),(49,'任天堂 Switch','多功能的遊戲主機，適合隨時隨地遊戲。',299.99,150,'2024-05-05 18:29:57');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-06  4:24:49
