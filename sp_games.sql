CREATE DATABASE  IF NOT EXISTS `sp_games` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sp_games`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: sp_games
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `catname` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `catname_UNIQUE` (`catname`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Action','An action game emphasizes physical challenges, including hand–eye coordination and reaction-time','2020-12-15 03:36:23'),(2,'Romance','A life changing experience','2021-01-01 16:11:00'),(12,'Simulation','Exploration of new issues from a different perspective and to create new mental models','2021-01-02 17:39:46'),(14,'Fighting','Focuses the action on combat, and in most cases, hand-to-hand combat','2021-01-05 03:15:15'),(16,'Stealth','Stresses cunning and precision to resolve game challenges','2021-01-05 03:15:42'),(17,'Survival','Have to use resources around in the surroundings in order to survive','2021-01-22 08:22:13'),(18,'Horror','Experience scary and heart intense jump scares everywhere you look','2021-01-31 08:12:58'),(19,'Gore','Blood being spilled everywhere, something only those who have been through wars know the experience','2021-02-02 15:11:33'),(20,'Multiplayer','Enjoy single player? Wait till you experience multiplayer where you get to play with real players online!','2021-02-02 15:13:22');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `gameid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `platform` varchar(45) NOT NULL,
  `categoryid` int NOT NULL,
  `categoryid2` int NOT NULL,
  `year` year NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gameid`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `cat_idx` (`categoryid`),
  KEY `catid2_idx` (`categoryid2`),
  CONSTRAINT `catid1` FOREIGN KEY (`categoryid`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `catid2` FOREIGN KEY (`categoryid2`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'Assassin’s Creed Valhalla','Assassin\'s Creed Valhalla is an action role-playing video game developed by Ubisoft Montreal and published by Ubisoft',69.9,'PC',1,0,2020,'2020-12-18 15:07:25'),(9,'Assassin’s Creed','Assassin\'s Creed Valhalla is an action role-playing video game developed by Ubisoft Montreal and published by Ubisoft',69.9,'PC',1,2,2020,'2021-01-01 16:13:26'),(11,'Sims 4','Sims 4 is an offline interactive mode where you can interact with other sims and enjoy your life inside! ',10.1,'PS4',14,16,2020,'2021-01-05 03:17:21'),(14,'Grand Theft Auto 5','Grand Theft Auto 5 is an open world game multiplayer game where you can play with all of your friends',20.2,'PS4',14,16,2015,'2021-01-22 08:22:38'),(19,'The Space in Between','What if you could create your own constellations? A love story about Asian American identity, mental health and stargazing',12.5,'PC',2,0,2021,'2021-01-31 08:18:24'),(20,'Microsoft Flight Simulator','From light planes to wide-body jets, fly highly detailed and accurate aircraft in the next generation of Microsoft Flight Simulator',74.9,'PC',12,0,2020,'2021-01-31 08:18:24'),(21,'Dead by Daylight','Dead by Daylight is a multiplayer horror game where one player takes on the role of the savage killer, and the other four players play as Survivors, trying to escape the killer and avoid being caught and killed',20,'PC',16,18,2016,'2021-01-31 08:18:24'),(22,'ARK: Survival Evolved','Stranded on the shores of a mysterious island, you must learn to survive. Use your cunning to kill or tame the primeval creatures roaming the land, and encounter other players to survive, dominate... and escape!',42,'PS4',14,17,2017,'2021-01-31 08:18:24'),(23,'Red Dead Redemption II','Step into the vibrant, ever-evolving world of Red Dead Online and experience life in frontier America. Chase down bounties, battle outlaw gangs and other players, hunt, fish and trade, search for exotic treasures.',79.9,'PC',1,19,2019,'2021-02-02 15:12:31'),(41,'Valorant','Valorant is a FPS game that everyone of all ages would enjoy a lot!',0,'PC',1,20,2019,'2021-02-07 12:04:48');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `gid` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `uid_idx` (`uid`),
  KEY `gid_idx` (`gid`),
  CONSTRAINT `gid` FOREIGN KEY (`gid`) REFERENCES `game` (`gameid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,11,1,'Enjoyed the game! The story and gameplay was good!',5,'2021-01-22 08:28:55'),(5,11,1,'Very good!',10,'2021-01-22 08:28:55'),(10,11,9,'Very Naise!',10,'2021-01-22 08:30:26'),(13,15,22,'Ark is the best game ever!',6,'2021-02-02 07:19:50'),(14,18,21,'DBD is so intensifying and it makes me not regret buying this game!',9,'2021-02-02 07:25:05');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` varchar(45) NOT NULL,
  `profile_pic_url` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (11,'Terry Tan','terry@gmail.com','Customer','https://www.abc.com/terry.jpg','2020-12-14 16:24:59','t1'),(15,'Perry Pan','perry@gmail.com','Admin','https://www.abc.com/perry.jpg','2021-01-02 16:48:07','p2'),(16,'u1','u1@gmail.com','Customer','https://www.abc.com/u1.jpg','2021-01-05 03:13:11','u1'),(18,'u8','u8@bmail.com','Customer','https://www.abc.com/u2.jpg','2021-01-05 03:13:42','u8'),(20,'Tom','tom@gmail.com','Admin','https://www.abc.com/tom.jpg','2021-02-05 09:46:22','tom');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sp_games'
--

--
-- Dumping routines for database 'sp_games'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-08  1:25:49
