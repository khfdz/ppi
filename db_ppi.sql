-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 07, 2025 at 08:48 AM
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
(80, 'STPM', 'Tersedia tempat sampah untuk membuang tisu', 'Etika Batuk'),
(81, 'STPM', 'Tersedia tempat sampah untuk membuang tisu', 'Penyuntikan Yang Aman'),
(82, 'STPM', 'Ada SPO praktek penyuntikan yang aman', 'Penyuntikan Yang Aman'),
(83, 'STPM', 'Petugas menerapkan SPO praktek penyuntikan yang aman', 'Penyuntikan Yang Aman'),
(84, 'STPM', 'Petugas melakukan identifikasi pasien', 'Penyuntikan Yang Aman'),
(85, 'STPM', 'Tersedia ruangan dispensing di unit instalasi farmasi', 'Penyuntikan Yang Aman'),
(86, 'STPM', 'Petugas menjelaskan prosedur yang akan dilakukan', 'Penyuntikan Yang Aman'),
(87, 'STPM', 'Obat di spuit diberi label sesuai prosedur', 'Penyuntikan Yang Aman'),
(88, 'STPM', 'Obat disimpan di lemari pendingin 2-8°c atau suhu ruang yang sesuai indikator obat', 'Penyuntikan Yang Aman'),
(89, 'STPM', 'Tersedia lemari pendingin tempat penyimpanan obat (obat-obat tertentu)', 'Penyuntikan Yang Aman'),
(90, 'STPM', 'Petugas melakukan hand hygiene sebelum tindakan', 'Penyuntikan Yang Aman'),
(91, 'STPM', 'Petugas melakukan swab alkohol pada karet penutup vial sebelum menusuk vial', 'Penyuntikan Yang Aman'),
(92, 'STPM', 'Petugas menggunakan 1 spuit untuk satu jenis obat (single dosase)', 'Penyuntikan Yang Aman'),
(93, 'STPM', 'Petugas menggunakan APD saat mencampur obat', 'Penyuntikan Yang Aman'),
(94, 'STPM', 'Petugas menggunakan teknik aseptik dalam pencampuran obat', 'Penyuntikan Yang Aman'),
(95, 'STPM', 'Petugas membuang spuit tanpa needle pada sampah infeksius', 'Penyuntikan Yang Aman'),
(96, 'STPM', 'Petugas membuang needle dan pecahan ampul pada safety box', 'Penyuntikan Yang Aman'),
(97, 'STPM', 'Petugas melakukan hand hygiene setelah tindakan', 'Penyuntikan Yang Aman'),
(98, 'STPM', 'Kursi, meja, lemari, tampak bersih dan kondisi baik', 'Kebersihan Secara Umum'),
(99, 'STPM', 'Troli tindakan tampak bersih', 'Kebersihan Secara Umum'),
(100, 'STPM', 'Troli tindakan dibersihkan dengan disinfektan setiap hari dan jika terkontaminasi', 'Kebersihan Secara Umum'),
(101, 'STPM', 'Lantai bersih dan dalam kondisi baik', 'Kebersihan Secara Umum'),
(102, 'STPM', 'Tidak ada debu dipermukaan alat', 'Kebersihan Secara Umum'),
(103, 'STPM', 'Tirai jendela kondisi bersih dan baik', 'Kebersihan Secara Umum'),
(104, 'STPM', 'Tirai jendela kondisi bersih dan baik', 'Hand Hygiene'),
(105, 'STPM', 'Kepathuan petugas cuci tangan terhadap 5 momen', 'Hand Hygiene'),
(106, 'STPM', 'Tersedia leaflet kebersihan tangan di unit pelayanan', 'Hand Hygiene'),
(107, 'STPM', 'Tersedia wastafel untuk cuci tangan', 'Hand Hygiene'),
(108, 'STPM', 'Kran air berfungsi dengan baik', 'Hand Hygiene'),
(109, 'STPM', 'Tersedia sabun cair disetiap wastafel', 'Hand Hygiene'),
(110, 'STPM', 'Tersedia alkohol hand rub disetiap ruangan', 'Hand Hygiene'),
(111, 'STPM', 'Tersedia tempat sampah infeksius dan non infeksius', 'Hand Hygiene'),
(112, 'STPM', 'Tersedia poster cuci tangan disetiap wastafel', 'Hand Hygiene'),
(113, 'STPM', 'Tersedia hand rub disetiap troli', 'Hand Hygiene'),
(114, 'STPM', 'Tersedia tempat sampah di dekat wastafel', 'Hand Hygiene'),
(115, 'STPM', 'Tersedia tempat sampah infeksius dan non infeksius', 'Hand Hygiene'),
(116, 'STPM', 'Tersedia poster cuci tangan disetiap wastafel', 'Hand Hygiene'),
(117, 'STPM', 'Ada SPO penggunaan apd', 'APD'),
(118, 'STPM', 'Tersedia nurse cap', 'APD'),
(119, 'STPM', 'Masker bedah', 'APD'),
(120, 'STPM', 'Masker N95', 'APD'),
(121, 'STPM', 'Sarung tangan', 'APD'),
(122, 'STPM', 'Apron plastik', 'APD'),
(123, 'STPM', 'Kacamata goggle', 'APD'),
(124, 'STPM', 'Sepatu boot', 'APD'),
(125, 'STPM', 'Petugas menerapkan SPO APD dengan baik', 'APD'),
(126, 'STPM', 'Menyimpan apd dilakukan dengan benar', 'APD'),
(127, 'STPM', 'Ada SPO penatalaksaan Limbah', 'Limbah'),
(128, 'STPM', 'Petugas menerapkan spo pembuangan limbah dengan baik', 'Limbah'),
(129, 'STPM', 'Tempat sampah menggunakan pedal', 'Limbah'),
(130, 'STPM', 'Tempat sampah diberi label sesuai jenis sampah infeksius / non infeksius', 'Limbah'),
(131, 'STPM', 'Tersedia kantong sampah plastik hitam untuk tempat sampah non infeksius / domestik', 'Limbah'),
(132, 'STPM', 'Tersedia kantong sampah warna kuning untuk sampah infeksius', 'Limbah'),
(133, 'STPM', 'Tempat sampah dalam kondisi baik', 'Limbah'),
(134, 'STPM', 'Sampah tidak lebih 3/4 penuh', 'Limbah'),
(135, 'STPM', 'Sampah infeksius dan non infeksius dipisahkan', 'Limbah'),
(136, 'STPM', 'Petugas yang menangani sampah telat mendapat sosialisasi ppi', 'Limbah'),
(137, 'STPM', 'Tersedia tempat limbah benda tajam yang sesuai', 'Limbah'),
(138, 'STPM', 'Tempat limbah benda tajam diletakkan di tempat yang aman', 'Limbah'),
(139, 'STPM', 'Tempat limbah benda tajam difiksasi dengan benar', 'Limbah'),
(140, 'STPM', 'Isi limbah benda tajam tidak lebih dari 3/4 penuh', 'Limbah'),
(141, 'STPM', 'Tidak ada limbah benda tajam langsung dibuang ke tempat limbah benda tajam', 'Limbah'),
(142, 'STPM', 'Limbah cair (darah, cairan tubuh pasien / cairan pleura / cairan ascites, dll) dibuang ke spoelhoek', 'Limbah'),
(143, 'STPM', 'Ada SPO penatalaksanaan linen', 'Linen'),
(144, 'STPM', 'Petugas menerapkan SPO penatalaksanaan linen dengan baik', 'Linen'),
(145, 'STPM', 'Ada dokumentasi linen', 'Linen'),
(146, 'STPM', 'Penyimpanan linen tertata rapi di lemari tutup', 'Linen'),
(147, 'STPM', 'Tersedia tempat sampah linen infeksius dan non infeksius', 'Linen'),
(148, 'STPM', 'Tersedia box / lemari tertutup rapat tempat penyimpanan alat steril', 'Perawatan Peralatan Pasien'),
(149, 'STPM', 'Temperatur ruangan 20-40° dan kelembaban 40-60%', 'Perawatan Peralatan Pasien'),
(150, 'STPM', 'Alat steril disimpan rapi', 'Perawatan Peralatan Pasien'),
(151, 'STPM', 'Alat selalu siap pakai', 'Perawatan Peralatan Pasien'),
(152, 'STPM', 'Terdapat tanda indikator pada alat steril', 'Perawatan Peralatan Pasien'),
(153, 'STPM', 'Semua petugas ruangan telah mendapatkan edukasi tentang tata cara etika batuk', 'Etika Batuk'),
(154, 'STPM', 'Tersedia leaflet etika batuk di unit pelayanan', 'Etika Batuk'),
(155, 'STPM', 'Petugas menerapkan SPO etika batuk', 'Etika Batuk'),
(156, 'STPM', 'Petugas mencuci tangan setelah batuk / bersin', 'Etika Batuk'),
(157, 'STPM', 'Petugas membuang tsu yang telah digunakan saat batuk / bersin', 'Etika Batuk'),
(158, 'STPM', 'Tersedia tempat sampah untuk membuang tisu', 'Etika Batuk');

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
(25, 1, '14', 3, 1, '2025-08-06 13:17:59'),
(26, 1, '15', 3, 0, '2025-08-06 13:17:59'),
(27, 1, '16', 3, 1, '2025-08-06 13:17:59'),
(28, 1, '17', 3, 0, '2025-08-06 13:17:59'),
(29, 1, '18', 3, 1, '2025-08-06 13:17:59'),
(30, 1, '19', 3, 1, '2025-08-06 13:17:59'),
(31, 1, '10', 4, 1, '2025-08-06 14:13:24'),
(32, 1, '19', 4, 0, '2025-08-06 14:13:24'),
(33, 1, '11', 4, 1, '2025-08-06 14:13:24'),
(34, 1, '17', 4, 0, '2025-08-06 14:13:24'),
(35, 1, '18', 4, 1, '2025-08-06 14:13:24'),
(36, 1, '12', 4, 1, '2025-08-06 14:13:24'),
(37, 1, '13', 4, 0, '2025-08-06 14:13:24'),
(38, 1, '14', 4, 0, '2025-08-06 14:13:24'),
(39, 1, '15', 4, 1, '2025-08-06 14:13:24'),
(40, 1, '16', 4, 0, '2025-08-06 14:13:24');

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
(91, 1, '1', 1, 0, '2025-01-01 00:00:00'),
(92, 1, '1', 2, 0, '2025-01-01 00:00:00'),
(93, 1, '1', 3, 0, '2025-01-01 00:00:00'),
(94, 1, '1', 4, 0, '2025-01-01 00:00:00'),
(95, 1, '2', 1, 0, '2025-01-01 00:00:00'),
(96, 1, '2', 2, 0, '2025-01-01 00:00:00'),
(97, 1, '2', 3, 0, '2025-01-01 00:00:00'),
(98, 1, '2', 4, 0, '2025-01-01 00:00:00'),
(99, 1, '3', 1, 0, '2025-01-01 00:00:00'),
(100, 1, '3', 2, 0, '2025-01-01 00:00:00'),
(101, 1, '3', 3, 0, '2025-01-01 00:00:00'),
(102, 1, '3', 4, 0, '2025-01-01 00:00:00'),
(103, 1, '4', 1, 0, '2025-01-01 00:00:00'),
(104, 1, '4', 2, 0, '2025-01-01 00:00:00'),
(105, 1, '4', 3, 0, '2025-01-01 00:00:00'),
(106, 1, '4', 4, 0, '2025-01-01 00:00:00'),
(107, 1, '5', 1, 0, '2025-01-01 00:00:00'),
(108, 1, '5', 2, 0, '2025-01-01 00:00:00'),
(109, 1, '5', 3, 0, '2025-01-01 00:00:00'),
(110, 1, '5', 4, 0, '2025-01-01 00:00:00'),
(111, 1, '6', 1, 0, '2025-01-01 00:00:00'),
(112, 1, '6', 2, 0, '2025-01-01 00:00:00'),
(113, 1, '6', 3, 0, '2025-01-01 00:00:00'),
(114, 1, '6', 4, 0, '2025-01-01 00:00:00'),
(115, 1, '7', 1, 0, '2025-01-01 00:00:00'),
(116, 1, '7', 2, 0, '2025-01-01 00:00:00'),
(117, 1, '7', 3, 0, '2025-01-01 00:00:00'),
(118, 1, '7', 4, 0, '2025-01-01 00:00:00'),
(119, 1, '8', 1, 0, '2025-01-01 00:00:00'),
(120, 1, '8', 2, 0, '2025-01-01 00:00:00'),
(121, 1, '8', 3, 0, '2025-01-01 00:00:00'),
(122, 1, '8', 4, 0, '2025-01-01 00:00:00'),
(123, 1, '9', 1, 0, '2025-01-01 00:00:00'),
(124, 1, '9', 2, 0, '2025-01-01 00:00:00'),
(125, 1, '9', 3, 0, '2025-01-01 00:00:00'),
(126, 1, '9', 4, 0, '2025-01-01 00:00:00'),
(127, 1, '1', 1, 0, '2025-02-01 00:00:00'),
(128, 1, '1', 2, 0, '2025-02-01 00:00:00'),
(129, 1, '1', 3, 0, '2025-02-01 00:00:00'),
(130, 1, '1', 4, 0, '2025-02-01 00:00:00'),
(131, 1, '2', 1, 0, '2025-02-01 00:00:00'),
(132, 1, '2', 2, 0, '2025-02-01 00:00:00'),
(133, 1, '2', 3, 0, '2025-02-01 00:00:00'),
(134, 1, '2', 4, 0, '2025-02-01 00:00:00'),
(135, 1, '3', 1, 0, '2025-02-01 00:00:00'),
(136, 1, '3', 2, 0, '2025-02-01 00:00:00'),
(137, 1, '3', 3, 0, '2025-02-01 00:00:00'),
(138, 1, '3', 4, 0, '2025-02-01 00:00:00'),
(139, 1, '4', 1, 0, '2025-02-01 00:00:00'),
(140, 1, '4', 2, 0, '2025-02-01 00:00:00'),
(141, 1, '4', 3, 0, '2025-02-01 00:00:00'),
(142, 1, '4', 4, 0, '2025-02-01 00:00:00'),
(143, 1, '5', 1, 0, '2025-02-01 00:00:00'),
(144, 1, '5', 2, 0, '2025-02-01 00:00:00'),
(145, 1, '5', 3, 0, '2025-02-01 00:00:00'),
(146, 1, '5', 4, 0, '2025-02-01 00:00:00'),
(147, 1, '6', 1, 0, '2025-02-01 00:00:00'),
(148, 1, '6', 2, 0, '2025-02-01 00:00:00'),
(149, 1, '6', 3, 0, '2025-02-01 00:00:00'),
(150, 1, '6', 4, 0, '2025-02-01 00:00:00'),
(151, 1, '7', 1, 0, '2025-02-01 00:00:00'),
(152, 1, '7', 2, 0, '2025-02-01 00:00:00'),
(153, 1, '7', 3, 0, '2025-02-01 00:00:00'),
(154, 1, '7', 4, 0, '2025-02-01 00:00:00'),
(155, 1, '8', 1, 0, '2025-02-01 00:00:00'),
(156, 1, '8', 2, 0, '2025-02-01 00:00:00'),
(157, 1, '8', 3, 0, '2025-02-01 00:00:00'),
(158, 1, '8', 4, 0, '2025-02-01 00:00:00'),
(159, 1, '9', 1, 0, '2025-02-01 00:00:00'),
(160, 1, '9', 2, 0, '2025-02-01 00:00:00'),
(161, 1, '9', 3, 0, '2025-02-01 00:00:00'),
(162, 1, '9', 4, 0, '2025-02-01 00:00:00'),
(163, 1, '1', 1, 1, '2025-03-01 00:00:00'),
(164, 1, '1', 2, 1, '2025-03-01 00:00:00'),
(165, 1, '1', 3, 1, '2025-03-01 00:00:00'),
(166, 1, '1', 4, 1, '2025-03-01 00:00:00'),
(167, 1, '2', 1, 1, '2025-03-01 00:00:00'),
(168, 1, '2', 2, 0, '2025-03-01 00:00:00'),
(169, 1, '2', 3, 0, '2025-03-01 00:00:00'),
(170, 1, '2', 4, 1, '2025-03-01 00:00:00'),
(171, 1, '3', 1, 0, '2025-03-01 00:00:00'),
(172, 1, '3', 2, 0, '2025-03-01 00:00:00'),
(173, 1, '3', 3, 0, '2025-03-01 00:00:00'),
(174, 1, '3', 4, 0, '2025-03-01 00:00:00'),
(175, 1, '4', 1, 0, '2025-03-01 00:00:00'),
(176, 1, '4', 2, 0, '2025-03-01 00:00:00'),
(177, 1, '4', 3, 0, '2025-03-01 00:00:00'),
(178, 1, '4', 4, 1, '2025-03-01 00:00:00'),
(179, 1, '5', 1, 1, '2025-03-01 00:00:00'),
(180, 1, '5', 2, 1, '2025-03-01 00:00:00'),
(181, 1, '5', 3, 0, '2025-03-01 00:00:00'),
(182, 1, '5', 4, 1, '2025-03-01 00:00:00'),
(183, 1, '6', 1, 0, '2025-03-01 00:00:00'),
(184, 1, '6', 2, 1, '2025-03-01 00:00:00'),
(185, 1, '6', 3, 1, '2025-03-01 00:00:00'),
(186, 1, '6', 4, 1, '2025-03-01 00:00:00'),
(187, 1, '7', 1, 1, '2025-03-01 00:00:00'),
(188, 1, '7', 2, 0, '2025-03-01 00:00:00'),
(189, 1, '7', 3, 1, '2025-03-01 00:00:00'),
(190, 1, '7', 4, 0, '2025-03-01 00:00:00'),
(191, 1, '8', 1, 0, '2025-03-01 00:00:00'),
(192, 1, '8', 2, 0, '2025-03-01 00:00:00'),
(193, 1, '8', 3, 1, '2025-03-01 00:00:00'),
(194, 1, '8', 4, 0, '2025-03-01 00:00:00'),
(195, 1, '9', 1, 0, '2025-03-01 00:00:00'),
(196, 1, '9', 2, 0, '2025-03-01 00:00:00'),
(197, 1, '9', 3, 1, '2025-03-01 00:00:00'),
(198, 1, '9', 4, 0, '2025-03-01 00:00:00'),
(199, 1, '1', 1, 1, '2025-04-01 00:00:00'),
(200, 1, '1', 2, 1, '2025-04-01 00:00:00'),
(201, 1, '1', 3, 1, '2025-04-01 00:00:00'),
(202, 1, '1', 4, 0, '2025-04-01 00:00:00'),
(203, 1, '2', 1, 0, '2025-04-01 00:00:00'),
(204, 1, '2', 2, 1, '2025-04-01 00:00:00'),
(205, 1, '2', 3, 1, '2025-04-01 00:00:00'),
(206, 1, '2', 4, 1, '2025-04-01 00:00:00'),
(207, 1, '3', 1, 0, '2025-04-01 00:00:00'),
(208, 1, '3', 2, 1, '2025-04-01 00:00:00'),
(209, 1, '3', 3, 1, '2025-04-01 00:00:00'),
(210, 1, '3', 4, 1, '2025-04-01 00:00:00'),
(211, 1, '4', 1, 0, '2025-04-01 00:00:00'),
(212, 1, '4', 2, 1, '2025-04-01 00:00:00'),
(213, 1, '4', 3, 1, '2025-04-01 00:00:00'),
(214, 1, '4', 4, 0, '2025-04-01 00:00:00'),
(215, 1, '5', 1, 1, '2025-04-01 00:00:00'),
(216, 1, '5', 2, 1, '2025-04-01 00:00:00'),
(217, 1, '5', 3, 1, '2025-04-01 00:00:00'),
(218, 1, '5', 4, 1, '2025-04-01 00:00:00'),
(219, 1, '6', 1, 0, '2025-04-01 00:00:00'),
(220, 1, '6', 2, 0, '2025-04-01 00:00:00'),
(221, 1, '6', 3, 1, '2025-04-01 00:00:00'),
(222, 1, '6', 4, 0, '2025-04-01 00:00:00'),
(223, 1, '7', 1, 0, '2025-04-01 00:00:00'),
(224, 1, '7', 2, 0, '2025-04-01 00:00:00'),
(225, 1, '7', 3, 1, '2025-04-01 00:00:00'),
(226, 1, '7', 4, 1, '2025-04-01 00:00:00'),
(227, 1, '8', 1, 0, '2025-04-01 00:00:00'),
(228, 1, '8', 2, 1, '2025-04-01 00:00:00'),
(229, 1, '8', 3, 0, '2025-04-01 00:00:00'),
(230, 1, '8', 4, 1, '2025-04-01 00:00:00'),
(231, 1, '9', 1, 0, '2025-04-01 00:00:00'),
(232, 1, '9', 2, 0, '2025-04-01 00:00:00'),
(233, 1, '9', 3, 1, '2025-04-01 00:00:00'),
(234, 1, '9', 4, 0, '2025-04-01 00:00:00'),
(235, 1, '1', 1, 0, '2025-05-01 00:00:00'),
(236, 1, '1', 2, 1, '2025-05-01 00:00:00'),
(237, 1, '1', 3, 0, '2025-05-01 00:00:00'),
(238, 1, '1', 4, 0, '2025-05-01 00:00:00'),
(239, 1, '2', 1, 1, '2025-05-01 00:00:00'),
(240, 1, '2', 2, 1, '2025-05-01 00:00:00'),
(241, 1, '2', 3, 0, '2025-05-01 00:00:00'),
(242, 1, '2', 4, 1, '2025-05-01 00:00:00'),
(243, 1, '3', 1, 1, '2025-05-01 00:00:00'),
(244, 1, '3', 2, 1, '2025-05-01 00:00:00'),
(245, 1, '3', 3, 1, '2025-05-01 00:00:00'),
(246, 1, '3', 4, 1, '2025-05-01 00:00:00'),
(247, 1, '4', 1, 1, '2025-05-01 00:00:00'),
(248, 1, '4', 2, 1, '2025-05-01 00:00:00'),
(249, 1, '4', 3, 0, '2025-05-01 00:00:00'),
(250, 1, '4', 4, 1, '2025-05-01 00:00:00'),
(251, 1, '5', 1, 1, '2025-05-01 00:00:00'),
(252, 1, '5', 2, 1, '2025-05-01 00:00:00'),
(253, 1, '5', 3, 1, '2025-05-01 00:00:00'),
(254, 1, '5', 4, 0, '2025-05-01 00:00:00'),
(255, 1, '6', 1, 1, '2025-05-01 00:00:00'),
(256, 1, '6', 2, 1, '2025-05-01 00:00:00'),
(257, 1, '6', 3, 1, '2025-05-01 00:00:00'),
(258, 1, '6', 4, 0, '2025-05-01 00:00:00'),
(259, 1, '7', 1, 0, '2025-05-01 00:00:00'),
(260, 1, '7', 2, 1, '2025-05-01 00:00:00'),
(261, 1, '7', 3, 1, '2025-05-01 00:00:00'),
(262, 1, '7', 4, 1, '2025-05-01 00:00:00'),
(263, 1, '8', 1, 1, '2025-05-01 00:00:00'),
(264, 1, '8', 2, 1, '2025-05-01 00:00:00'),
(265, 1, '8', 3, 1, '2025-05-01 00:00:00'),
(266, 1, '8', 4, 1, '2025-05-01 00:00:00'),
(267, 1, '9', 1, 1, '2025-05-01 00:00:00'),
(268, 1, '9', 2, 0, '2025-05-01 00:00:00'),
(269, 1, '9', 3, 1, '2025-05-01 00:00:00'),
(270, 1, '9', 4, 1, '2025-05-01 00:00:00'),
(271, 1, '1', 1, 1, '2025-06-01 00:00:00'),
(272, 1, '1', 2, 0, '2025-06-01 00:00:00'),
(273, 1, '1', 3, 0, '2025-06-01 00:00:00'),
(274, 1, '1', 4, 0, '2025-06-01 00:00:00'),
(275, 1, '2', 1, 1, '2025-06-01 00:00:00'),
(276, 1, '2', 2, 1, '2025-06-01 00:00:00'),
(277, 1, '2', 3, 1, '2025-06-01 00:00:00'),
(278, 1, '2', 4, 1, '2025-06-01 00:00:00'),
(279, 1, '3', 1, 0, '2025-06-01 00:00:00'),
(280, 1, '3', 2, 1, '2025-06-01 00:00:00'),
(281, 1, '3', 3, 0, '2025-06-01 00:00:00'),
(282, 1, '3', 4, 1, '2025-06-01 00:00:00'),
(283, 1, '4', 1, 0, '2025-06-01 00:00:00'),
(284, 1, '4', 2, 1, '2025-06-01 00:00:00'),
(285, 1, '4', 3, 1, '2025-06-01 00:00:00'),
(286, 1, '4', 4, 0, '2025-06-01 00:00:00'),
(287, 1, '5', 1, 0, '2025-06-01 00:00:00'),
(288, 1, '5', 2, 0, '2025-06-01 00:00:00'),
(289, 1, '5', 3, 1, '2025-06-01 00:00:00'),
(290, 1, '5', 4, 1, '2025-06-01 00:00:00'),
(291, 1, '6', 1, 1, '2025-06-01 00:00:00'),
(292, 1, '6', 2, 0, '2025-06-01 00:00:00'),
(293, 1, '6', 3, 1, '2025-06-01 00:00:00'),
(294, 1, '6', 4, 1, '2025-06-01 00:00:00'),
(295, 1, '7', 1, 1, '2025-06-01 00:00:00'),
(296, 1, '7', 2, 1, '2025-06-01 00:00:00'),
(297, 1, '7', 3, 1, '2025-06-01 00:00:00'),
(298, 1, '7', 4, 1, '2025-06-01 00:00:00'),
(299, 1, '8', 1, 1, '2025-06-01 00:00:00'),
(300, 1, '8', 2, 1, '2025-06-01 00:00:00'),
(301, 1, '8', 3, 1, '2025-06-01 00:00:00'),
(302, 1, '8', 4, 0, '2025-06-01 00:00:00'),
(303, 1, '9', 1, 1, '2025-06-01 00:00:00'),
(304, 1, '9', 2, 1, '2025-06-01 00:00:00'),
(305, 1, '9', 3, 1, '2025-06-01 00:00:00'),
(306, 1, '9', 4, 0, '2025-06-01 00:00:00'),
(307, 1, '9', 1, 1, '2025-07-30 00:00:00'),
(308, 1, '8', 1, 1, '2025-07-30 00:00:00'),
(309, 1, '7', 1, 1, '2025-07-30 00:00:00'),
(310, 1, '6', 1, 1, '2025-07-30 00:00:00'),
(311, 1, '5', 1, 1, '2025-07-30 00:00:00'),
(312, 1, '4', 1, 1, '2025-07-30 00:00:00'),
(313, 1, '3', 1, 1, '2025-07-30 00:00:00'),
(314, 1, '2', 1, 1, '2025-07-30 00:00:00'),
(315, 1, '1', 1, 1, '2025-07-30 00:00:00'),
(316, 1, '9', 2, 1, '2025-07-30 00:00:00'),
(317, 1, '8', 2, 0, '2025-07-30 00:00:00'),
(318, 1, '7', 2, 1, '2025-07-30 00:00:00'),
(319, 1, '6', 2, 1, '2025-07-30 00:00:00'),
(320, 1, '5', 2, 0, '2025-07-30 00:00:00'),
(321, 1, '4', 2, 1, '2025-07-30 00:00:00'),
(322, 1, '3', 2, 1, '2025-07-30 00:00:00'),
(323, 1, '2', 2, 0, '2025-07-30 00:00:00'),
(324, 1, '1', 2, 1, '2025-07-30 00:00:00'),
(325, 1, '9', 3, 1, '2025-07-30 00:00:00'),
(326, 1, '8', 3, 0, '2025-07-30 00:00:00'),
(327, 1, '7', 3, 1, '2025-07-30 00:00:00'),
(328, 1, '6', 3, 0, '2025-07-30 00:00:00'),
(329, 1, '5', 3, 1, '2025-07-30 00:00:00'),
(330, 1, '4', 3, 0, '2025-07-30 00:00:00'),
(331, 1, '3', 3, 1, '2025-07-30 00:00:00'),
(332, 1, '2', 3, 1, '2025-07-30 00:00:00'),
(333, 1, '1', 3, 1, '2025-07-30 00:00:00'),
(334, 1, '9', 4, 0, '2025-07-30 00:00:00'),
(335, 1, '8', 4, 1, '2025-07-30 00:00:00'),
(336, 1, '7', 4, 1, '2025-07-30 00:00:00'),
(337, 1, '6', 4, 0, '2025-07-30 00:00:00'),
(338, 1, '5', 4, 1, '2025-07-30 00:00:00'),
(339, 1, '4', 4, 0, '2025-07-30 00:00:00'),
(340, 1, '3', 4, 1, '2025-07-30 00:00:00'),
(341, 1, '2', 4, 0, '2025-07-30 00:00:00'),
(342, 1, '1', 4, 1, '2025-07-30 00:00:00'),
(343, 1, '9', 1, 0, '2025-08-04 00:00:00'),
(344, 1, '9', 2, 0, '2025-08-04 00:00:00'),
(345, 1, '8', 2, 1, '2025-08-04 00:00:00'),
(346, 1, '7', 2, 0, '2025-08-04 00:00:00'),
(347, 1, '6', 2, 1, '2025-08-04 00:00:00'),
(348, 1, '5', 2, 0, '2025-08-04 00:00:00'),
(349, 1, '4', 2, 0, '2025-08-04 00:00:00'),
(350, 1, '3', 2, 1, '2025-08-04 00:00:00'),
(351, 1, '2', 2, 0, '2025-08-04 00:00:00'),
(352, 1, '1', 2, 1, '2025-08-04 00:00:00'),
(353, 1, '9', 4, 1, '2025-08-04 00:00:00'),
(354, 1, '8', 4, 0, '2025-08-04 00:00:00'),
(355, 1, '7', 4, 1, '2025-08-04 00:00:00'),
(356, 1, '6', 4, 0, '2025-08-04 00:00:00'),
(357, 1, '5', 4, 1, '2025-08-04 00:00:00'),
(358, 1, '4', 4, 0, '2025-08-04 00:00:00'),
(359, 1, '3', 4, 1, '2025-08-04 00:00:00'),
(360, 1, '2', 4, 0, '2025-08-04 00:00:00'),
(361, 1, '1', 4, 1, '2025-08-04 00:00:00'),
(362, 1, '8', 1, 0, '2025-08-04 00:00:00'),
(363, 1, '7', 1, 1, '2025-08-04 00:00:00'),
(364, 1, '6', 1, 0, '2025-08-04 00:00:00'),
(365, 1, '5', 1, 1, '2025-08-04 00:00:00'),
(366, 1, '4', 1, 0, '2025-08-04 00:00:00'),
(367, 1, '3', 1, 0, '2025-08-04 00:00:00'),
(368, 1, '2', 1, 1, '2025-08-04 00:00:00'),
(369, 1, '1', 1, 2, '2025-08-05 00:00:00'),
(370, 1, '10', 1, 1, '2025-08-05 00:00:00'),
(371, 1, '11', 1, 1, '2025-08-05 00:00:00'),
(372, 1, '12', 1, 1, '2025-08-05 00:00:00'),
(373, 1, '13', 1, 1, '2025-08-05 00:00:00'),
(374, 1, '14', 1, 1, '2025-08-05 00:00:00'),
(375, 1, '15', 1, 1, '2025-08-05 00:00:00'),
(376, 1, '16', 1, 1, '2025-08-05 00:00:00'),
(377, 1, '17', 1, 1, '2025-08-05 00:00:00'),
(378, 1, '18', 1, 1, '2025-08-05 00:00:00'),
(379, 1, '19', 1, 2, '2025-08-05 00:00:00');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=380;

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
