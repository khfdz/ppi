-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 08, 2025 at 09:23 AM
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
-- Table structure for table `indikators`
--

CREATE TABLE `indikators` (
  `indikator_id` int NOT NULL,
  `indikator_jenis` text NOT NULL,
  `indikator_isi` varchar(255) NOT NULL,
  `indikator_tipe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `indikators`
--

INSERT INTO `indikators` (`indikator_id`, `indikator_jenis`, `indikator_isi`, `indikator_tipe`) VALUES
(1, 'MBTJ', 'Tersedia tempat limbah benda tajam yang sesuai', ''),
(2, 'MBTJ', 'Tempat limbah benda tajam diletakkan di tempat yang aman', ''),
(3, 'MBTJ', 'Tempat limbah benda tajam dirakit dengan benar', ''),
(4, 'MBTJ', 'Isi limbah benda tajam tidak lebih dari 3/4 penuh', ''),
(5, 'MBTJ', 'Tidak ada limbah benda tajam yang keluar dari tempat sampah', ''),
(6, 'MBTJ', 'Limbah tajam langsung dibuang ke tempat limbah benda tajam', ''),
(7, 'MBTJ', 'Jika sudah 3/4 penuh, tempat limbah tajam ditutup rapat dan dimasukkan ke tempat limbah infeksius', ''),
(8, 'MBTJ', 'Memastikan setiap tindakan yang menggunakan jarum dibuang ke tempat safetybox', ''),
(9, 'MBTJ', 'Memastikan setiap tindakan yang menggunakan jarum dibuang ke tempat safetybox', ''),
(10, 'MPKDA', 'Pembersihan rutin mobil ambulance dilakukan 1 minggu sekali oleh shift sore', ''),
(11, 'MPKDA', 'Apabila mobil dan peralatan di dalam nya sudah terpakai dan tercemar oleh cairan tubuh, darah, urine pasien maka dilakukan dekontaminasi', ''),
(12, 'MPKDA', 'Proses dekontaminasi dilakukan di samping IGD dengan menggunakan bahan disinfektan yang mengandung priseft 0.5%', ''),
(13, 'MPKDA', 'Petugas mencuci tangan', ''),
(14, 'MPKDA', 'Petugas menggunakan alat pelindung diri masker dan sarung tangan', ''),
(15, 'MPKDA', 'Petugas mengeluarkan stretcher dari mobil ambulance lalu melepas linen', ''),
(16, 'MPKDA', 'Petugas menyapu ruangan ambulance dari sisi terjauh, sampai di bawah tempat duduk', ''),
(17, 'MPKDA', 'Petugas mulai membersihkan sisi luar mobil dengan air mengalir, cuci dan lap dengan sabun kemudian bilas kembali dengan air mengalir dan keringkan kembali', ''),
(18, 'MPKDA', 'Petugas merapikan kembali ruangan mobil ambulance dan semua alat-alat di dalamnya', ''),
(19, 'MPKDA', 'Petugas melepaskan alat pelindung diri dan mencuci tangan', ''),
(20, 'STPM', 'Kursi, meja, lemari, tampak bersih dan kondisi baik', 'Kebersihan Secara Umum'),
(21, 'STPM', 'Troli tindakan tampak bersih', 'Kebersihan Secara Umum'),
(22, 'STPM', 'Troli tindakan dibersihkan dengan disinfektan setiap hari dan jika terkontaminasi', 'Kebersihan Secara Umum'),
(23, 'STPM', 'Lantai bersih dan dalam kondisi baik', 'Kebersihan Secara Umum'),
(24, 'STPM', 'Tidak ada debu dipermukaan alat', 'Kebersihan Secara Umum'),
(25, 'STPM', 'Tirai jendela kondisi bersih dan baik', 'Kebersihan Secara Umum'),
(26, 'STPM', 'Tirai jendela kondisi bersih dan baik', 'Hand Hygiene'),
(27, 'STPM', 'Kepathuan petugas cuci tangan terhadap 5 momen', 'Hand Hygiene'),
(28, 'STPM', 'Tersedia leaflet kebersihan tangan di unit pelayanan', 'Hand Hygiene'),
(29, 'STPM', 'Tersedia wastafel untuk cuci tangan', 'Hand Hygiene'),
(30, 'STPM', 'Kran air berfungsi dengan baik', 'Hand Hygiene'),
(31, 'STPM', 'Tersedia sabun cair disetiap wastafel', 'Hand Hygiene'),
(32, 'STPM', 'Tersedia alkohol hand rub disetiap ruangan', 'Hand Hygiene'),
(33, 'STPM', 'Tersedia tempat sampah infeksius dan non infeksius', 'Hand Hygiene'),
(34, 'STPM', 'Tersedia poster cuci tangan disetiap wastafel', 'Hand Hygiene'),
(35, 'STPM', 'Tersedia hand rub disetiap troli', 'Hand Hygiene'),
(36, 'STPM', 'Tersedia tempat sampah di dekat wastafel', 'Hand Hygiene'),
(37, 'STPM', 'Tersedia tempat sampah infeksius dan non infeksius', 'Hand Hygiene'),
(38, 'STPM', 'Tersedia poster cuci tangan disetiap wastafel', 'Hand Hygiene'),
(39, 'STPM', 'Ada SPO penggunaan apd', 'APD'),
(40, 'STPM', 'Tersedia nurse cap', 'APD'),
(41, 'STPM', 'Masker bedah', 'APD'),
(42, 'STPM', 'Masker N95', 'APD'),
(43, 'STPM', 'Sarung tangan', 'APD'),
(44, 'STPM', 'Apron plastik', 'APD'),
(45, 'STPM', 'Kacamata goggle', 'APD'),
(46, 'STPM', 'Sepatu boot', 'APD'),
(47, 'STPM', 'Petugas menerapkan SPO APD dengan baik', 'APD'),
(48, 'STPM', 'Menyimpan apd dilakukan dengan benar', 'APD'),
(49, 'STPM', 'Ada SPO penatalaksaan Limbah', 'Limbah'),
(50, 'STPM', 'Petugas menerapkan spo pembuangan limbah dengan baik', 'Limbah'),
(51, 'STPM', 'Tempat sampah menggunakan pedal', 'Limbah'),
(52, 'STPM', 'Tempat sampah diberi label sesuai jenis sampah infeksius / non infeksius', 'Limbah'),
(53, 'STPM', 'Tersedia kantong sampah plastik hitam untuk tempat sampah non infeksius / domestik', 'Limbah'),
(54, 'STPM', 'Tersedia kantong sampah warna kuning untuk sampah infeksius', 'Limbah'),
(55, 'STPM', 'Tempat sampah dalam kondisi baik', 'Limbah'),
(56, 'STPM', 'Sampah tidak lebih 3/4 penuh', 'Limbah'),
(57, 'STPM', 'Sampah infeksius dan non infeksius dipisahkan', 'Limbah'),
(58, 'STPM', 'Petugas yang menangani sampah telat mendapat sosialisasi ppi', 'Limbah'),
(59, 'STPM', 'Tersedia tempat limbah benda tajam yang sesuai', 'Limbah'),
(60, 'STPM', 'Tempat limbah benda tajam diletakkan di tempat yang aman', 'Limbah'),
(61, 'STPM', 'Tempat limbah benda tajam difiksasi dengan benar', 'Limbah'),
(62, 'STPM', 'Isi limbah benda tajam tidak lebih dari 3/4 penuh', 'Limbah'),
(63, 'STPM', 'Tidak ada limbah benda tajam langsung dibuang ke tempat limbah benda tajam', 'Limbah'),
(64, 'STPM', 'Limbah cair (darah, cairan tubuh pasien / cairan pleura / cairan ascites, dll) dibuang ke spoelhoek', 'Limbah'),
(65, 'STPM', 'Ada SPO penatalaksanaan linen', 'Linen'),
(66, 'STPM', 'Petugas menerapkan SPO penatalaksanaan linen dengan baik', 'Linen'),
(67, 'STPM', 'Ada dokumentasi linen', 'Linen'),
(68, 'STPM', 'Penyimpanan linen tertata rapi di lemari tutup', 'Linen'),
(69, 'STPM', 'Tersedia tempat sampah linen infeksius dan non infeksius', 'Linen'),
(70, 'STPM', 'Tersedia box / lemari tertutup rapat tempat penyimpanan alat steril', 'Perawatan Peralatan Pasien'),
(71, 'STPM', 'Temperatur ruangan 20-40° dan kelembaban 40-60%', 'Perawatan Peralatan Pasien'),
(72, 'STPM', 'Alat steril disimpan rapi', 'Perawatan Peralatan Pasien'),
(73, 'STPM', 'Alat selalu siap pakai', 'Perawatan Peralatan Pasien'),
(74, 'STPM', 'Terdapat tanda indikator pada alat steril', 'Perawatan Peralatan Pasien'),
(75, 'STPM', 'Semua petugas ruangan telah mendapatkan edukasi tentang tata cara etika batuk', 'Etika Batuk'),
(76, 'STPM', 'Tersedia leaflet etika batuk di unit pelayanan', 'Etika Batuk'),
(77, 'STPM', 'Petugas menerapkan SPO etika batuk', 'Etika Batuk'),
(78, 'STPM', 'Petugas mencuci tangan setelah batuk / bersin', 'Etika Batuk'),
(79, 'STPM', 'Petugas membuang tisu yang telah digunakan saat batuk / bersin', 'Etika Batuk'),
(80, 'STPM', 'Tersedia tempat sampah untuk membuang tisu', 'Etika Batuk');

-- --------------------------------------------------------

--
-- Table structure for table `monitoring_ambulance`
--

CREATE TABLE `monitoring_ambulance` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `indikator_id` varchar(255) NOT NULL,
  `minggu` int NOT NULL,
  `nilai` int NOT NULL,
  `waktu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monitoring_ambulance`
--

INSERT INTO `monitoring_ambulance` (`id`, `user_id`, `indikator_id`, `minggu`, `nilai`, `waktu`) VALUES
(1, 1, '10', 1, 0, '2025-08-06 11:10:23'),
(2, 1, '11', 1, 0, '2025-08-06 11:10:23'),
(3, 1, '12', 1, 1, '2025-08-06 11:10:23'),
(4, 1, '13', 1, 0, '2025-08-06 11:10:23'),
(5, 1, '14', 1, 1, '2025-08-06 11:10:23'),
(6, 1, '15', 1, 0, '2025-08-06 11:10:23'),
(7, 1, '16', 1, 1, '2025-08-06 11:10:23'),
(8, 1, '17', 1, 0, '2025-08-06 11:10:23'),
(9, 1, '18', 1, 1, '2025-08-06 11:10:23'),
(10, 1, '19', 1, 0, '2025-08-06 11:10:23'),
(11, 1, '10', 2, 0, '2025-08-06 13:13:55'),
(12, 1, '18', 2, 1, '2025-08-06 13:13:55'),
(13, 1, '12', 2, 1, '2025-08-06 13:13:55'),
(14, 1, '19', 2, 1, '2025-08-06 13:13:55'),
(15, 1, '11', 2, 0, '2025-08-06 13:13:55'),
(16, 1, '13', 2, 0, '2025-08-06 13:13:55'),
(17, 1, '14', 2, 0, '2025-08-06 13:13:55'),
(18, 1, '15', 2, 0, '2025-08-06 13:13:55'),
(19, 1, '16', 2, 1, '2025-08-06 13:13:55'),
(20, 1, '17', 2, 1, '2025-08-06 13:13:55'),
(21, 1, '10', 3, 0, '2025-08-06 13:17:59'),
(22, 1, '11', 3, 1, '2025-08-06 13:17:59'),
(23, 1, '12', 3, 1, '2025-08-06 13:17:59'),
(24, 1, '13', 3, 0, '2025-08-06 13:17:59'),
(25, 1, '14', 3, 1, '2025-08-06 13:17:59');

-- --------------------------------------------------------

--
-- Table structure for table `monitoring_benda_tajam`
--

CREATE TABLE `monitoring_benda_tajam` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `indikator_id` varchar(255) NOT NULL,
  `minggu` int NOT NULL,
  `nilai` int NOT NULL,
  `waktu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monitoring_benda_tajam`
--

INSERT INTO `monitoring_benda_tajam` (`id`, `user_id`, `indikator_id`, `minggu`, `nilai`, `waktu`) VALUES
(380, 1, '1', 1, 1, '2025-08-08 14:28:40'),
(381, 1, '2', 1, 0, '2025-08-08 14:28:40'),
(382, 1, '4', 1, 0, '2025-08-08 14:28:40'),
(383, 1, '5', 1, 1, '2025-08-08 14:28:40'),
(384, 1, '6', 1, 0, '2025-08-08 14:28:40'),
(385, 1, '3', 1, 0, '2025-08-08 14:28:40'),
(386, 1, '7', 1, 0, '2025-08-08 14:28:40'),
(387, 1, '8', 1, 1, '2025-08-08 14:28:40'),
(388, 1, '9', 1, 0, '2025-08-08 14:28:40'),
(389, 1, '1', 2, 1, '2025-08-08 14:38:23'),
(390, 1, '6', 2, 1, '2025-08-08 14:38:23'),
(391, 1, '7', 2, 0, '2025-08-08 14:38:23'),
(392, 1, '8', 2, 1, '2025-08-08 14:38:23'),
(393, 1, '9', 2, 0, '2025-08-08 14:38:23'),
(394, 1, '2', 2, 0, '2025-08-08 14:38:23'),
(395, 1, '3', 2, 0, '2025-08-08 14:38:23'),
(396, 1, '4', 2, 1, '2025-08-08 14:38:23'),
(397, 1, '5', 2, 0, '2025-08-08 14:38:23');

-- --------------------------------------------------------

--
-- Table structure for table `monitoring_medis`
--

CREATE TABLE `monitoring_medis` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `indikator_id` varchar(255) NOT NULL,
  `minggu` int NOT NULL,
  `nilai` int NOT NULL,
  `waktu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monitoring_medis`
--

INSERT INTO `monitoring_medis` (`id`, `user_id`, `indikator_id`, `minggu`, `nilai`, `waktu`) VALUES
(1, 1, '20', 1, 1, '2025-08-08 11:21:01'),
(2, 1, '30', 1, 0, '2025-08-08 11:21:01'),
(3, 1, '33', 1, 0, '2025-08-08 11:21:01'),
(4, 1, '31', 1, 0, '2025-08-08 11:21:01'),
(5, 1, '32', 1, 0, '2025-08-08 11:21:01'),
(6, 1, '34', 1, 1, '2025-08-08 11:21:01'),
(7, 1, '35', 1, 1, '2025-08-08 11:21:01'),
(8, 1, '21', 1, 1, '2025-08-08 11:21:01'),
(9, 1, '36', 1, 1, '2025-08-08 11:21:01'),
(10, 1, '37', 1, 0, '2025-08-08 11:21:01'),
(11, 1, '38', 1, 0, '2025-08-08 11:21:01'),
(12, 1, '39', 1, 1, '2025-08-08 11:21:01'),
(13, 1, '40', 1, 0, '2025-08-08 11:21:01'),
(14, 1, '41', 1, 1, '2025-08-08 11:21:01'),
(15, 1, '42', 1, 0, '2025-08-08 11:21:01'),
(16, 1, '43', 1, 1, '2025-08-08 11:21:01'),
(17, 1, '44', 1, 0, '2025-08-08 11:21:01'),
(18, 1, '45', 1, 1, '2025-08-08 11:21:01'),
(19, 1, '46', 1, 0, '2025-08-08 11:21:01'),
(20, 1, '47', 1, 1, '2025-08-08 11:21:01'),
(21, 1, '48', 1, 0, '2025-08-08 11:21:01'),
(22, 1, '22', 1, 1, '2025-08-08 11:21:01'),
(23, 1, '49', 1, 1, '2025-08-08 11:21:01'),
(24, 1, '50', 1, 0, '2025-08-08 11:21:01'),
(25, 1, '51', 1, 1, '2025-08-08 11:21:01'),
(26, 1, '52', 1, 0, '2025-08-08 11:21:01'),
(27, 1, '53', 1, 1, '2025-08-08 11:21:01'),
(28, 1, '54', 1, 0, '2025-08-08 11:21:01'),
(29, 1, '23', 1, 0, '2025-08-08 11:21:01'),
(30, 1, '55', 1, 1, '2025-08-08 11:21:01'),
(31, 1, '56', 1, 0, '2025-08-08 11:21:01'),
(32, 1, '57', 1, 1, '2025-08-08 11:21:01'),
(33, 1, '58', 1, 0, '2025-08-08 11:21:01'),
(34, 1, '24', 1, 0, '2025-08-08 11:21:01'),
(35, 1, '60', 1, 0, '2025-08-08 11:21:01'),
(36, 1, '59', 1, 1, '2025-08-08 11:21:01'),
(37, 1, '61', 1, 1, '2025-08-08 11:21:01'),
(38, 1, '25', 1, 0, '2025-08-08 11:21:01'),
(39, 1, '62', 1, 0, '2025-08-08 11:21:01'),
(40, 1, '63', 1, 1, '2025-08-08 11:21:01'),
(41, 1, '64', 1, 0, '2025-08-08 11:21:01'),
(42, 1, '26', 1, 0, '2025-08-08 11:21:01'),
(43, 1, '65', 1, 1, '2025-08-08 11:21:01'),
(44, 1, '66', 1, 0, '2025-08-08 11:21:01'),
(45, 1, '27', 1, 0, '2025-08-08 11:21:02'),
(46, 1, '67', 1, 1, '2025-08-08 11:21:02'),
(47, 1, '68', 1, 0, '2025-08-08 11:21:02'),
(48, 1, '69', 1, 1, '2025-08-08 11:21:02'),
(49, 1, '70', 1, 0, '2025-08-08 11:21:02'),
(50, 1, '71', 1, 1, '2025-08-08 11:21:02'),
(51, 1, '28', 1, 0, '2025-08-08 11:21:02'),
(52, 1, '72', 1, 0, '2025-08-08 11:21:02'),
(53, 1, '73', 1, 1, '2025-08-08 11:21:02'),
(54, 1, '74', 1, 0, '2025-08-08 11:21:02'),
(55, 1, '75', 1, 1, '2025-08-08 11:21:02'),
(56, 1, '76', 1, 0, '2025-08-08 11:21:02'),
(57, 1, '77', 1, 1, '2025-08-08 11:21:02'),
(58, 1, '79', 1, 1, '2025-08-08 11:21:02'),
(59, 1, '78', 1, 0, '2025-08-08 11:21:02'),
(60, 1, '80', 1, 1, '2025-08-08 11:21:02'),
(61, 1, '29', 1, 0, '2025-08-08 11:21:02'),
(62, 1, '20', 2, 1, '2025-08-08 16:22:15'),
(63, 1, '21', 2, 0, '2025-08-08 16:22:15'),
(64, 1, '20', 3, 0, '2025-08-08 16:01:46'),
(65, 1, '21', 3, 1, '2025-08-08 16:01:46'),
(66, 1, '26', 3, 0, '2025-08-08 16:01:48'),
(67, 1, '27', 3, 0, '2025-08-08 16:01:48'),
(68, 1, '28', 3, 0, '2025-08-08 16:01:48'),
(69, 1, '29', 3, 0, '2025-08-08 16:01:54'),
(70, 1, '30', 3, 0, '2025-08-08 16:01:55'),
(71, 1, '31', 3, 0, '2025-08-08 16:01:55'),
(72, 1, '32', 3, 0, '2025-08-08 16:01:56'),
(73, 1, '33', 3, 0, '2025-08-08 16:01:56'),
(74, 1, '34', 3, 0, '2025-08-08 16:01:56'),
(75, 1, '35', 3, 0, '2025-08-08 16:01:57'),
(76, 1, '36', 3, 0, '2025-08-08 16:01:57'),
(77, 1, '37', 3, 0, '2025-08-08 16:01:57'),
(78, 1, '20', 4, 0, '2025-08-08 16:03:39'),
(79, 1, '21', 4, 1, '2025-08-08 16:03:39'),
(80, 1, '22', 4, 0, '2025-08-08 16:03:39'),
(81, 1, '23', 4, 1, '2025-08-08 16:03:39'),
(82, 1, '24', 4, 0, '2025-08-08 16:03:39'),
(83, 1, '25', 4, 0, '2025-08-08 16:03:39'),
(84, 1, '26', 4, 1, '2025-08-08 16:03:02'),
(85, 1, '27', 4, 1, '2025-08-08 16:03:02'),
(86, 1, '28', 4, 1, '2025-08-08 16:03:02'),
(87, 1, '29', 4, 1, '2025-08-08 16:03:02'),
(88, 1, '30', 4, 1, '2025-08-08 16:03:02'),
(89, 1, '31', 4, 1, '2025-08-08 16:03:02'),
(90, 1, '32', 4, 1, '2025-08-08 16:03:02'),
(91, 1, '33', 4, 0, '2025-08-08 16:03:02'),
(92, 1, '34', 4, 0, '2025-08-08 16:03:02'),
(93, 1, '35', 4, 0, '2025-08-08 16:03:02'),
(94, 1, '36', 4, 0, '2025-08-08 16:03:02'),
(95, 1, '37', 4, 0, '2025-08-08 16:03:02'),
(96, 1, '38', 4, 1, '2025-08-08 16:03:02'),
(97, 1, '39', 4, 0, '2025-08-08 16:03:02'),
(98, 1, '40', 4, 0, '2025-08-08 16:03:02'),
(99, 1, '41', 4, 1, '2025-08-08 16:03:02'),
(100, 1, '42', 4, 1, '2025-08-08 16:03:02'),
(101, 1, '43', 4, 1, '2025-08-08 16:03:02'),
(102, 1, '44', 4, 0, '2025-08-08 16:03:02'),
(103, 1, '45', 4, 0, '2025-08-08 16:03:02'),
(104, 1, '46', 4, 0, '2025-08-08 16:03:02'),
(105, 1, '47', 4, 1, '2025-08-08 16:03:02'),
(106, 1, '48', 4, 1, '2025-08-08 16:03:02'),
(107, 1, '49', 4, 1, '2025-08-08 16:03:02'),
(108, 1, '50', 4, 0, '2025-08-08 16:03:02'),
(109, 1, '51', 4, 0, '2025-08-08 16:03:02'),
(110, 1, '52', 4, 0, '2025-08-08 16:03:02'),
(111, 1, '53', 4, 1, '2025-08-08 16:03:02'),
(112, 1, '54', 4, 1, '2025-08-08 16:03:02'),
(113, 1, '55', 4, 1, '2025-08-08 16:03:02'),
(114, 1, '56', 4, 0, '2025-08-08 16:03:02'),
(115, 1, '57', 4, 0, '2025-08-08 16:03:02'),
(116, 1, '58', 4, 0, '2025-08-08 16:03:02'),
(117, 1, '59', 4, 1, '2025-08-08 16:03:02'),
(118, 1, '60', 4, 1, '2025-08-08 16:03:02'),
(119, 1, '61', 4, 1, '2025-08-08 16:03:02'),
(120, 1, '62', 4, 0, '2025-08-08 16:03:02'),
(121, 1, '63', 4, 0, '2025-08-08 16:03:02'),
(122, 1, '64', 4, 0, '2025-08-08 16:03:02'),
(123, 1, '65', 4, 0, '2025-08-08 16:03:02'),
(124, 1, '66', 4, 0, '2025-08-08 16:03:02'),
(125, 1, '67', 4, 1, '2025-08-08 16:03:02'),
(126, 1, '68', 4, 1, '2025-08-08 16:03:02'),
(127, 1, '69', 4, 1, '2025-08-08 16:03:02'),
(128, 1, '70', 4, 0, '2025-08-08 16:03:02'),
(129, 1, '71', 4, 0, '2025-08-08 16:03:02'),
(130, 1, '72', 4, 0, '2025-08-08 16:03:02'),
(131, 1, '73', 4, 1, '2025-08-08 16:03:02'),
(132, 1, '74', 4, 0, '2025-08-08 16:03:02'),
(133, 1, '75', 4, 0, '2025-08-08 16:03:02'),
(134, 1, '76', 4, 1, '2025-08-08 16:03:02'),
(135, 1, '77', 4, 0, '2025-08-08 16:03:02'),
(136, 1, '78', 4, 1, '2025-08-08 16:03:02'),
(137, 1, '79', 4, 0, '2025-08-08 16:03:02'),
(138, 1, '80', 4, 1, '2025-08-08 16:03:02'),
(139, 1, '22', 2, 1, '2025-08-08 16:22:15'),
(140, 1, '23', 2, 1, '2025-08-08 16:22:15'),
(141, 1, '24', 2, 0, '2025-08-08 16:22:15'),
(142, 1, '25', 2, 1, '2025-08-08 16:22:15'),
(143, 1, '26', 2, 1, '2025-08-08 16:22:15'),
(144, 1, '27', 2, 1, '2025-08-08 16:22:15'),
(145, 1, '28', 2, 0, '2025-08-08 16:22:15'),
(146, 1, '29', 2, 1, '2025-08-08 16:22:15'),
(147, 1, '30', 2, 1, '2025-08-08 16:22:15'),
(148, 1, '31', 2, 0, '2025-08-08 16:22:15'),
(149, 1, '32', 2, 1, '2025-08-08 16:22:15'),
(150, 1, '33', 2, 1, '2025-08-08 16:22:15'),
(151, 1, '34', 2, 1, '2025-08-08 16:22:15'),
(152, 1, '35', 2, 0, '2025-08-08 16:22:15'),
(153, 1, '36', 2, 0, '2025-08-08 16:22:15'),
(154, 1, '37', 2, 0, '2025-08-08 16:22:15'),
(155, 1, '38', 2, 1, '2025-08-08 16:22:15'),
(156, 1, '39', 2, 1, '2025-08-08 16:22:15'),
(157, 1, '40', 2, 1, '2025-08-08 16:22:15'),
(158, 1, '41', 2, 1, '2025-08-08 16:22:15'),
(159, 1, '42', 2, 1, '2025-08-08 16:22:15'),
(160, 1, '43', 2, 1, '2025-08-08 16:22:15'),
(161, 1, '44', 2, 1, '2025-08-08 16:22:15'),
(162, 1, '45', 2, 0, '2025-08-08 16:22:15'),
(163, 1, '46', 2, 0, '2025-08-08 16:22:15'),
(164, 1, '47', 2, 0, '2025-08-08 16:22:15'),
(165, 1, '48', 2, 0, '2025-08-08 16:22:15'),
(166, 1, '49', 2, 1, '2025-08-08 16:22:15'),
(167, 1, '50', 2, 1, '2025-08-08 16:22:15'),
(168, 1, '51', 2, 1, '2025-08-08 16:22:15'),
(169, 1, '52', 2, 1, '2025-08-08 16:22:15'),
(170, 1, '53', 2, 1, '2025-08-08 16:22:15'),
(171, 1, '54', 2, 1, '2025-08-08 16:22:15'),
(172, 1, '55', 2, 1, '2025-08-08 16:22:15'),
(173, 1, '56', 2, 1, '2025-08-08 16:22:15'),
(174, 1, '57', 2, 0, '2025-08-08 16:22:15'),
(175, 1, '58', 2, 0, '2025-08-08 16:22:15'),
(176, 1, '59', 2, 0, '2025-08-08 16:22:15'),
(177, 1, '60', 2, 0, '2025-08-08 16:22:15'),
(178, 1, '61', 2, 0, '2025-08-08 16:22:15'),
(179, 1, '62', 2, 0, '2025-08-08 16:22:15'),
(180, 1, '63', 2, 0, '2025-08-08 16:22:15'),
(181, 1, '64', 2, 1, '2025-08-08 16:22:15'),
(182, 1, '65', 2, 1, '2025-08-08 16:22:15'),
(183, 1, '66', 2, 1, '2025-08-08 16:22:15'),
(184, 1, '67', 2, 1, '2025-08-08 16:22:15'),
(185, 1, '68', 2, 1, '2025-08-08 16:22:15'),
(186, 1, '69', 2, 1, '2025-08-08 16:22:15');

-- --------------------------------------------------------

--
-- Table structure for table `supervisi`
--

CREATE TABLE `supervisi` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `indikator_jenis` varchar(255) NOT NULL,
  `indikator_id` varchar(255) NOT NULL,
  `minggu` int NOT NULL,
  `nilai` int NOT NULL,
  `waktu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `nama_unit` varchar(100) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `nama_unit`, `role`, `password`) VALUES
(1, 'IT', 'user', '$2b$12$Udupx11LPY9hQlpbV/pK7u06Op.Y1dgAG5Dz986fIVk9jR3kvRDc6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `indikators`
--
ALTER TABLE `indikators`
  ADD PRIMARY KEY (`indikator_id`);

--
-- Indexes for table `monitoring_ambulance`
--
ALTER TABLE `monitoring_ambulance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monitoring_benda_tajam`
--
ALTER TABLE `monitoring_benda_tajam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monitoring_medis`
--
ALTER TABLE `monitoring_medis`
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
  MODIFY `indikator_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `monitoring_ambulance`
--
ALTER TABLE `monitoring_ambulance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `monitoring_benda_tajam`
--
ALTER TABLE `monitoring_benda_tajam`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=398;

--
-- AUTO_INCREMENT for table `monitoring_medis`
--
ALTER TABLE `monitoring_medis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT for table `supervisi`
--
ALTER TABLE `supervisi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
