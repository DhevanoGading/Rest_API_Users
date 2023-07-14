-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: db_user
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

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
-- Table structure for table `Karyawans`
--

DROP TABLE IF EXISTS `Karyawans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Karyawans` (
  `karyawanId` varchar(255) NOT NULL,
  `namaLengkap` varchar(255) NOT NULL,
  `tempatLahir` varchar(255) NOT NULL,
  `tglLahir` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telegramId` varchar(255) NOT NULL,
  `nomorTelepon` varchar(255) NOT NULL,
  `jenisIdentitas` enum('KTP','SIM') NOT NULL,
  `nomorIdentitas` bigint NOT NULL,
  `statusPernikahan` enum('Lajang','Menikah','Janda','Duda') NOT NULL,
  `alamatKtp` text NOT NULL,
  `pendidikanAkhir` enum('SMK/SMU/Sederajat','D1','D2','D3','S1','S2','S3') NOT NULL,
  `namaInstitusi` varchar(255) NOT NULL,
  `jurusan` varchar(255) NOT NULL,
  `nikKaryawan` varchar(255) NOT NULL,
  `divisi` enum('RMO','PMO','BSO','SDO','DSO','KMO','BO') NOT NULL,
  `resource` enum('RMO','PMO','BSO','SDO','DSO','KMO','BO') NOT NULL,
  `posisi` enum('Developer','Developer Analyst','System Analyst','Project Manager','Project Admin','Quality Control','Technical Writer','Data Scientist','Support Surveillance','Support Leader','Support Specialist','Subject Matter Expert','UI/UX','System Architect','Digital Solutions Senior Officer','RF Engineer','System Administrator','Senior Training Officer','Field Engineer Radar','Data Analyst','Consultant','Lingustict','Radar Engineer','Inventory Admin','Machine Learning Engineer') NOT NULL,
  `statusKaryawan` enum('Permanent','Fixed-term contracts','Freelance') NOT NULL,
  `penempatan` enum('Jakarta','Yogyakarta') NOT NULL,
  `tglBergabung` datetime NOT NULL,
  `userRole` enum('HRD','PMO Admin','PMO Employee','BSO Admin','BSO Employee','SDO Admin','SDO Employee','RMO Admin','RMO Employee','Trello Admin','Project Manager','System Analyst','Finance') NOT NULL,
  PRIMARY KEY (`karyawanId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telegramId` (`telegramId`),
  UNIQUE KEY `nomorTelepon` (`nomorTelepon`),
  UNIQUE KEY `nomorIdentitas` (`nomorIdentitas`),
  UNIQUE KEY `nikKaryawan` (`nikKaryawan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Karyawans`
--

LOCK TABLES `Karyawans` WRITE;
/*!40000 ALTER TABLE `Karyawans` DISABLE KEYS */;
INSERT INTO `Karyawans` VALUES ('dhevano.gading','Dhevano Gading','Malang','2004-09-14 00:00:00','dhevano@solusi247.com','e9591f71930d3e397fe792aeb78bf510','DhevanoGoo','085675889800','KTP',8798737876663767,'Lajang','jl. jalan RT.06 RW.08','SMK/SMU/Sederajat','SMK Telkom Malang','Rekayasa Perangakat Lunak','293eiji98JKU','RMO','RMO','Developer','Fixed-term contracts','Yogyakarta','2023-06-26 00:00:00','RMO Employee');
/*!40000 ALTER TABLE `Karyawans` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-13 22:51:24
