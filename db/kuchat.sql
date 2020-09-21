-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2020 at 03:29 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kuchat`
--

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `idUser` int(10) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `imageUser` varchar(256) NOT NULL,
  `bio` text NOT NULL,
  `password` varchar(100) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`idUser`, `userName`, `name`, `email`, `imageUser`, `bio`, `password`, `createAt`, `updateAt`) VALUES
(23, '@agung1997', 'Agung Wicaksono Putro', 'agungwicaksono@gmail.com', 'http://localhost:3400/uploads/1600550755880ian-dooley-10ca-K3e6Ko-unsplash 1.png', 'I\'am ready on Kuchat', '$2a$10$oLdoEB6547CxRH0kdun.HO06D/XtAIDE3B9EZpXiuuHV08gTpmcOe', '2020-09-19 21:25:55', '2020-09-19 21:25:55'),
(41, '', 'Edo Arman', 'edo@gmail.com', '', 'I\'am ready on kuchat', '$2a$10$7ibLLC0xVzfVBjOil0qQyeF.vqU8Ie9zsvAs61z3ebFnHCzjJm2eu', '2020-09-20 14:40:45', '2020-09-20 14:40:45'),
(42, '@daniananta', 'Dani Ananta', 'dani@gmail.com', '', 'I\'am ready on kuchat', '$2a$10$dxJUmo0mZNbv169sKzoBSOP25Dhw4ACcC4bGmwf.2FudlM.xbkdme', '2020-09-20 14:49:36', '2020-09-20 14:49:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `idUser` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
