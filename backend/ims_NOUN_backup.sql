-- MySQL dump 10.13  Distrib 8.4.10, for Linux (x86_64)
--
-- Host: localhost    Database: inventory_management_sys_NOUN
-- ------------------------------------------------------
-- Server version	8.4.10-0ubuntu0.26.04.1

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
-- Table structure for table `courseware`
--

DROP TABLE IF EXISTS `courseware`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courseware` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `course_code` varchar(20) NOT NULL,
  `course_title` varchar(200) NOT NULL,
  `level` varchar(10) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `status` enum('available','low_stock','out_of_stock') DEFAULT 'available',
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_code` (`course_code`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courseware`
--

LOCK TABLES `courseware` WRITE;
/*!40000 ALTER TABLE `courseware` DISABLE KEYS */;
INSERT INTO `courseware` VALUES (26,'2026-06-30 12:40:43','2026-07-02 15:47:09','GST103','Computer Fundamentals 001','400','2nd','low_stock'),(27,'2026-06-30 12:41:31','2026-07-01 17:53:23','GST105','History and Philosophy of Science','PG','1st','available'),(28,'2026-06-30 12:41:31','2026-07-01 18:05:13','SOC201','Elements of Management I','PG','1st','available'),(50,'2026-06-30 12:46:50','2026-07-01 06:10:54','SOC202','Introduction to Sociology','100','2nd','out_of_stock'),(51,'2026-06-30 12:48:36','2026-06-30 12:48:36','BUS201','Business Communication','100','2nd','available'),(52,'2026-06-30 12:48:36','2026-06-30 12:48:36','ECO101','Principles of Economics I','PG','2nd','available'),(53,'2026-06-30 12:48:36','2026-07-01 06:06:24','PSY101','Introduction to Psychology','100','1st','low_stock'),(54,'2026-06-30 12:49:08','2026-06-30 20:26:56','MTH101','Basic Mathematics','PG','2nd','out_of_stock'),(55,'2026-06-30 12:49:08','2026-06-30 12:49:08','LIT201','African Literature','100','1st','available'),(56,'2026-06-30 12:49:08','2026-06-30 20:31:50','PAD201','Public Administration','100','1st','low_stock'),(57,'2026-06-30 12:49:08','2026-07-01 06:06:35','POL101','Political Theory','300','1st','out_of_stock'),(58,'2026-06-30 12:49:08','2026-06-30 12:49:08','LAW101','Nigerian Legal System','100','1st','available'),(59,'2026-06-30 12:49:34','2026-06-30 12:49:34','ACC201','Introduction to Accounting','100','2nd','available'),(60,'2026-06-30 12:49:34','2026-06-30 12:49:34','MKT201','Marketing Principles','200','1st','available'),(61,'2026-06-30 12:49:34','2026-06-30 12:49:34','RES301','Research Methods','300','2nd','available'),(62,'2026-06-30 12:49:34','2026-07-02 15:41:01','STA201','Statistics for Social Sciences','PG','2nd','out_of_stock'),(63,'2026-06-30 12:49:34','2026-06-30 12:49:34','IRL301','International Relations','200','2nd','available'),(64,'2026-06-30 12:49:34','2026-06-30 12:49:34','DEV301','Development Economics','300','1st','available'),(65,'2026-06-30 12:49:34','2026-06-30 12:49:34','ENV201','Environmental Science','100','1st','available'),(66,'2026-06-30 12:49:34','2026-06-30 12:49:34','GST101','Use of English / Communication Skills I','300','1st','available'),(67,'2026-07-01 17:04:08','2026-07-01 17:16:07','SWE33','Software Engineering','PG','1st','available'),(69,'2026-07-01 20:13:43','2026-07-01 20:14:08','CMS8u','Bio chem ','300','2nd','available'),(70,'2026-07-04 16:11:46','2026-07-04 16:11:46','AI123','Artificial Intelligence','300','1st','available');
/*!40000 ALTER TABLE `courseware` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseware_id` int NOT NULL,
  `center_id` int NOT NULL,
  `quantity` int DEFAULT '0',
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_inventory` (`courseware_id`,`center_id`),
  KEY `center_id` (`center_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`courseware_id`) REFERENCES `courseware` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`center_id`) REFERENCES `study_centers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,26,1,88,'2026-07-02 15:40:34'),(2,27,2,283,'2026-06-30 13:51:39'),(3,28,3,81,'2026-06-30 13:51:39'),(4,50,4,94,'2026-06-30 13:51:39'),(5,51,5,170,'2026-06-30 13:51:39'),(6,52,6,302,'2026-06-30 13:51:39'),(7,53,7,127,'2026-06-30 13:51:39'),(8,54,8,191,'2026-06-30 13:51:39'),(9,55,9,82,'2026-06-30 13:51:39'),(10,56,10,106,'2026-06-30 13:51:39'),(11,57,11,33,'2026-06-30 13:51:39'),(12,58,12,84,'2026-06-30 13:51:39'),(13,59,13,84,'2026-06-30 13:51:39'),(14,60,14,241,'2026-06-30 13:51:39'),(15,61,15,162,'2026-06-30 13:51:39'),(16,62,16,396,'2026-06-30 13:51:39'),(17,63,17,314,'2026-06-30 13:51:39'),(18,64,18,111,'2026-06-30 13:51:39'),(19,65,19,306,'2026-06-30 13:51:39'),(21,69,38,100,'2026-07-02 15:41:45'),(29,67,39,100,'2026-07-04 14:52:08'),(31,66,19,100,'2026-07-04 16:09:44'),(32,70,2,1000,'2026-07-04 16:12:29');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_transactions`
--

DROP TABLE IF EXISTS `inventory_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `courseware_id` int NOT NULL,
  `center_id` int NOT NULL,
  `transaction_type` enum('add','remove','dispatch','receive') NOT NULL,
  `quantity` int NOT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `courseware_id` (`courseware_id`),
  KEY `center_id` (`center_id`),
  CONSTRAINT `inventory_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `inventory_transactions_ibfk_2` FOREIGN KEY (`courseware_id`) REFERENCES `courseware` (`id`),
  CONSTRAINT `inventory_transactions_ibfk_3` FOREIGN KEY (`center_id`) REFERENCES `study_centers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_transactions`
--

LOCK TABLES `inventory_transactions` WRITE;
/*!40000 ALTER TABLE `inventory_transactions` DISABLE KEYS */;
INSERT INTO `inventory_transactions` VALUES (1,'2026-07-02 21:31:42',1,26,1,'add',20,'Received from HQ'),(2,'2026-07-03 11:36:44',1,27,2,'remove',50,'Test'),(3,'2026-07-03 12:03:38',1,28,3,'add',9,'Added 9 '),(4,'2026-07-03 12:06:14',1,51,3,'dispatch',70,'Dispatch from kn'),(6,'2026-07-03 14:20:21',1,52,6,'add',100,'Added'),(7,'2026-07-03 14:44:19',1,53,7,'add',73,'Added course'),(8,'2026-07-03 15:01:34',1,50,4,'add',9,'Added course'),(9,'2026-07-04 14:46:44',9,55,2,'add',8,'Added');
/*!40000 ALTER TABLE `inventory_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `school_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_centers`
--

DROP TABLE IF EXISTS `study_centers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_centers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `center_name` varchar(100) NOT NULL,
  `center_code` varchar(20) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_centers`
--

LOCK TABLES `study_centers` WRITE;
/*!40000 ALTER TABLE `study_centers` DISABLE KEYS */;
INSERT INTO `study_centers` VALUES (1,'2026-06-29 21:29:06','Ikoyi Study Center ','LG001','Lagos'),(2,'2026-06-29 21:29:06','Abuja Study Center','ABJ001','Abuja'),(3,'2026-06-29 21:29:06','Kano Study Center','KN001','Kano'),(4,'2026-06-30 13:20:15','Enugu Centre','ENG001','Enugu'),(5,'2026-06-30 13:20:15','Kano Centre','KN001','Kano'),(6,'2026-06-30 13:20:15','Benin Centre','BN001','Benin'),(7,'2026-06-30 13:20:15','Jos Centre','JS001','Jos'),(8,'2026-06-30 13:20:15','Benin Centre','BN00Q','Benin'),(9,'2026-06-30 13:20:15','Abuja Centre','ABJ001','FCT Abuja'),(10,'2026-06-30 13:20:15','Enugu Centre','ENG001','Enugu'),(11,'2026-06-30 13:20:15','Benin Centre','BN001','Benin'),(12,'2026-06-30 13:20:15','Kano Centre','KN00W','Kano'),(13,'2026-06-30 13:20:15','Kano Centre','KN001','Kano'),(14,'2026-06-30 13:20:15','Kaduna Centre','KDN001','Kaduna'),(15,'2026-06-30 13:20:15','Abuja','ABJ001','FCT Abuja'),(16,'2026-06-30 13:20:15','Abuja','ABJ001','FCT Abuja'),(17,'2026-06-30 13:20:15','Enugu','ENG001','Enugu'),(18,'2026-06-30 13:20:15','Port Harcourt Centre','PH001','Port Harcourt'),(19,'2026-06-30 13:20:15','Ibadan Centre','OYO001','Ibadan'),(20,'2026-06-30 13:20:18','Enugu Centre','ENG001','Enugu'),(38,'2026-07-02 09:14:04','kaduna  center','KDE09','Kaduna'),(39,'2026-07-04 14:51:52','Test Center','TEST','TEST');
/*!40000 ALTER TABLE `study_centers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','staff') DEFAULT 'staff',
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `uk_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-06-30 06:04:32','2026-06-30 06:04:32','UserT','$2y$10$mDYKO2SFynQg2PMrmfOVRunWcNb6zQJLQ.94wWLtM3.4aL../ENMe','staff','UserT','usert@test.com'),(2,'2026-07-03 17:29:42','2026-07-03 17:29:42','Scripter123','#test123','staff','scripter js','scripter@mail.com'),(3,'2026-07-03 22:58:21','2026-07-03 22:58:21','m_clark','$2a$10$nXfWOcz/71XtY4HVM/dAp.5BXcLydtDKKLOj1gkZJtWIjRCb5mD62','admin','Mary Clark','mclark@test.com'),(4,'2026-07-03 23:05:41','2026-07-03 23:05:41','maria','$2a$10$3OWnvQLZxPbDKvNNk2iYi.A6Unb2W.CRhcXLGJCx0/I8Rb4aex49e','admin','mariajohnson','mariajohnson@test.com'),(6,'2026-07-04 02:53:51','2026-07-04 03:43:10','mariaD','$2a$10$AzqKFIxkktwDgqsHwsUkxuz5w/joq6FUG53p2pNyIf2h.xcwujphy','admin','Maria David','tets@test.com'),(7,'2026-07-04 02:55:47','2026-07-04 03:42:33','saibari','$2a$10$xP4b4lIv0UW6JvHd.MvFR.KkTPajAHnNLQ/8T3eWjgN5SRgp4gkhe','staff',' Muhammad Saibari','test@tets.com'),(9,'2026-07-04 05:48:08','2026-07-04 05:48:08','sadiq_dev','$2a$10$xyVohwiLoejljeZTiE4rTeA18MM14OYgt3MAB.0zFB01/gEKGp9pu','staff','Ab Sadiq','test@gmail.com'),(10,'2026-07-04 16:37:29','2026-07-04 16:38:11','mariadavid','$2a$10$DHwjh2prdvzo/ejlw.R7huAes3SKYU1dO5wDPt2UKwmp.8IP.z8b2','admin','Maria David','maria@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-05 17:44:25
