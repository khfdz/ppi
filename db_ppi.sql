-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2025 at 11:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ppi`
--

-- --------------------------------------------------------

--
-- Table structure for table `indikators`
--

CREATE TABLE `indikators` (
  `indikator_id` int(11) NOT NULL,
  `indikator_jenis` text NOT NULL,
  `indikator_isi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `indikators`
--

INSERT INTO `indikators` (`indikator_id`, `indikator_jenis`, `indikator_isi`) VALUES
(1, 'MBTJ', 'Tersedia tempat limbah benda tajam yang sesuai'),
(2, 'MBTJ', 'Tempat limbah benda tajam diletakkan di tempat yang aman'),
(3, 'MBTJ', 'Tempat limbah benda tajam dirakit dengan benar'),
(4, 'MBTJ', 'Isi limbah benda tajam tidak lebih dari 3/4 penuh'),
(5, 'MBTJ', 'Tidak ada limbah benda tajam yang keluar dari tempat sampah'),
(6, 'MBTJ', 'Limbah tajam langsung dibuang ke tempat limbah benda tajam'),
(7, 'MBTJ', 'Jika sudah 3/4 penuh, tempat limbah tajam ditutup rapat dan dimasukkan ke tempat limbah infeksius'),
(8, 'MBTJ', 'Memastikan setiap tindakan yang menggunakan jarum dibuang ke tempat safetybox'),
(9, 'MBTJ', 'Memastikan setiap tindakan yang menggunakan jarum dibuang ke tempat safetybox');

-- --------------------------------------------------------

--
-- Table structure for table `monitoring_benda_tajam`
--

CREATE TABLE `monitoring_benda_tajam` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `indikator_id` varchar(255) NOT NULL,
  `minggu` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `waktu` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `monitoring_benda_tajam`
--

INSERT INTO `monitoring_benda_tajam` (`id`, `user_id`, `indikator_id`, `minggu`, `nilai`, `waktu`) VALUES
(19, 1, '1', 1, 1, '2025-07-25'),
(20, 1, '2', 1, 0, '2025-07-25'),
(21, 1, '3', 1, 1, '2025-07-25'),
(22, 1, '4', 1, 1, '2025-07-25'),
(23, 1, '5', 1, 1, '2025-07-25'),
(24, 1, '6', 1, 1, '2025-07-25'),
(25, 1, '7', 1, 1, '2025-07-25'),
(26, 1, '8', 1, 1, '2025-07-25'),
(27, 1, '9', 1, 1, '2025-07-25');

-- --------------------------------------------------------

--
-- Table structure for table `supervisi`
--

CREATE TABLE `supervisi` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `indikator_jenis` varchar(255) NOT NULL,
  `indikator_id` varchar(255) NOT NULL,
  `minggu` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `waktu` int(11) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `nama_unit` varchar(100) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `nama_unit`, `role`, `password`) VALUES
(1, 'IT', 'user', '$2b$12$AOw7k4ptpoVNYBtZB2Omle2nQETQxvxpD1Qy0eOOvBVL3E2UI80IC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `indikators`
--
ALTER TABLE `indikators`
  ADD PRIMARY KEY (`indikator_id`);

--
-- Indexes for table `monitoring_benda_tajam`
--
ALTER TABLE `monitoring_benda_tajam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supervisi`
--
ALTER TABLE `supervisi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `indikators`
--
ALTER TABLE `indikators`
  MODIFY `indikator_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `monitoring_benda_tajam`
--
ALTER TABLE `monitoring_benda_tajam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `supervisi`
--
ALTER TABLE `supervisi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
