-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 05, 2025 at 08:33 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

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
-- Table structure for table `indikator_tipe_master`
--

CREATE TABLE `indikator_tipe_master` (
  `id` int NOT NULL,
  `monitoring_kode` varchar(20) NOT NULL,
  `nama_tipe` varchar(255) NOT NULL,
  `dibuat_pada` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `indikator_tipe_master`
--

INSERT INTO `indikator_tipe_master` (`id`, `monitoring_kode`, `nama_tipe`, `dibuat_pada`) VALUES
(21, 'MPKDA', 'tes', '2025-11-28 08:05:24');

-- --------------------------------------------------------

--
-- Table structure for table `monitoring`
--

CREATE TABLE `monitoring` (
  `id` int NOT NULL,
  `kode` varchar(20) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `keterangan` text,
  `dibuat_pada` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `monitoring`
--

INSERT INTO `monitoring` (`id`, `kode`, `judul`, `keterangan`, `dibuat_pada`) VALUES
(37, 'MPKDA', 'FORM MONITORING PENATALAKSANAAN KEBERSIHAN / DEKONTAMINASI AMBULANCE', 'Form ini digunakan untuk memonitor kebersihan dan dekontaminasi ambulans, memastikan kendaraan selalu higienis, aman, serta siap digunakan sesuai standar pencegahan infeksi.', '2025-11-28 08:03:55');

-- --------------------------------------------------------

--
-- Table structure for table `monitoring_indikator`
--

CREATE TABLE `monitoring_indikator` (
  `id` int NOT NULL,
  `monitoring_kode` varchar(20) NOT NULL,
  `indikator_tipe_id` int NOT NULL,
  `indikator_isi` text NOT NULL,
  `dibuat_pada` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `monitoring_indikator`
--

INSERT INTO `monitoring_indikator` (`id`, `monitoring_kode`, `indikator_tipe_id`, `indikator_isi`, `dibuat_pada`) VALUES
(10, 'MPKDA', 21, 'Pembersihan rutin mobil ambulance dilakukan 1 minggu sekali oleh shift sore', '2025-11-28 08:06:21'),
(11, 'MPKDA', 21, 'Apabila mobil dan peralatan di dalam nya sudah terpakai dan tercemar oleh cairan tubuh, darah, urine pasien maka dilakukan dekontaminasi.', '2025-11-28 08:07:34'),
(12, 'MPKDA', 21, 'Proses dekontaminasi di lakukan samping di IGD dengan menggunakan bahan desinfectan yang mengandung priseft 0.5 %', '2025-11-28 08:07:45'),
(13, 'MPKDA', 21, 'Apabila mobil dan peralatan di dalam nya sudah terpakai dan tercemar oleh cairan tubuh, darah, urine pasien maka dilakukan dekontaminasi.', '2025-11-28 08:08:08');

-- --------------------------------------------------------

--
-- Table structure for table `monitoring_pengisian`
--

CREATE TABLE `monitoring_pengisian` (
  `id` int NOT NULL,
  `indikator_id` int NOT NULL,
  `user_id` int NOT NULL,
  `minggu_ke` tinyint NOT NULL,
  `jawaban` tinyint(1) NOT NULL,
  `tanggal_input` date NOT NULL,
  `dibuat_pada` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `monitoring_pengisian`
--

INSERT INTO `monitoring_pengisian` (`id`, `indikator_id`, `user_id`, `minggu_ke`, `jawaban`, `tanggal_input`, `dibuat_pada`) VALUES
(2, 10, 1, 1, 1, '2025-12-01', '2025-12-01 03:45:52'),
(9, 10, 1, 1, 1, '2025-12-01', '2025-12-01 04:29:48'),
(11, 10, 1, 1, 1, '2025-12-01', '2025-12-01 04:50:00'),
(12, 11, 1, 1, 0, '2025-12-01', '2025-12-01 04:50:00'),
(23, 10, 1, 2, 1, '2025-12-10', '2025-12-01 07:07:51'),
(24, 11, 1, 2, 0, '2025-12-10', '2025-12-01 07:07:51'),
(25, 12, 1, 2, 1, '2025-12-10', '2025-12-01 07:07:51'),
(26, 13, 1, 2, 0, '2025-12-10', '2025-12-01 07:07:51'),
(35, 10, 1, 4, 0, '2025-12-22', '2025-12-01 07:26:15'),
(36, 11, 1, 4, 0, '2025-12-22', '2025-12-01 07:26:15'),
(37, 12, 1, 4, 1, '2025-12-22', '2025-12-01 07:26:15'),
(38, 13, 1, 4, 0, '2025-12-22', '2025-12-01 07:26:15'),
(39, 10, 1, 3, 1, '2025-12-21', '2025-12-01 07:27:49'),
(40, 11, 1, 3, 1, '2025-12-21', '2025-12-01 07:27:49'),
(41, 12, 1, 3, 0, '2025-12-21', '2025-12-01 07:27:49'),
(42, 13, 1, 3, 1, '2025-12-21', '2025-12-01 07:27:49'),
(45, 12, 1, 1, 0, '2025-12-01', '2025-12-01 08:40:05'),
(46, 13, 1, 1, 0, '2025-12-01', '2025-12-01 08:40:05');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `nama_user` varchar(100) DEFAULT NULL,
  `nama_unit` varchar(100) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `nama_user`, `nama_unit`, `role`, `password`) VALUES
(1, 'Budi', 'IT', 'user', '$2b$12$Udupx11LPY9hQlpbV/pK7u06Op.Y1dgAG5Dz986fIVk9jR3kvRDc6'),
(2, 'Khfdz', 'khfdz', 'admin', '$2b$12$BXUpwshzQkJc1R2diC908e8fx7MkR.KtpCMzFvZhCGiBua/5pllS.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','supervisor','user') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `indikator_tipe_master`
--
ALTER TABLE `indikator_tipe_master`
  ADD PRIMARY KEY (`id`),
  ADD KEY `monitoring_kode` (`monitoring_kode`);

--
-- Indexes for table `monitoring`
--
ALTER TABLE `monitoring`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `monitoring_indikator`
--
ALTER TABLE `monitoring_indikator`
  ADD PRIMARY KEY (`id`),
  ADD KEY `monitoring_kode` (`monitoring_kode`),
  ADD KEY `indikator_tipe_id` (`indikator_tipe_id`);

--
-- Indexes for table `monitoring_pengisian`
--
ALTER TABLE `monitoring_pengisian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `indikator_id` (`indikator_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `indikator_tipe_master`
--
ALTER TABLE `indikator_tipe_master`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `monitoring`
--
ALTER TABLE `monitoring`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `monitoring_indikator`
--
ALTER TABLE `monitoring_indikator`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `monitoring_pengisian`
--
ALTER TABLE `monitoring_pengisian`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `indikator_tipe_master`
--
ALTER TABLE `indikator_tipe_master`
  ADD CONSTRAINT `indikator_tipe_master_ibfk_1` FOREIGN KEY (`monitoring_kode`) REFERENCES `monitoring` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `monitoring_indikator`
--
ALTER TABLE `monitoring_indikator`
  ADD CONSTRAINT `monitoring_indikator_ibfk_1` FOREIGN KEY (`monitoring_kode`) REFERENCES `monitoring` (`kode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `monitoring_indikator_ibfk_2` FOREIGN KEY (`indikator_tipe_id`) REFERENCES `indikator_tipe_master` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `monitoring_pengisian`
--
ALTER TABLE `monitoring_pengisian`
  ADD CONSTRAINT `monitoring_pengisian_ibfk_1` FOREIGN KEY (`indikator_id`) REFERENCES `monitoring_indikator` (`id`),
  ADD CONSTRAINT `monitoring_pengisian_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
