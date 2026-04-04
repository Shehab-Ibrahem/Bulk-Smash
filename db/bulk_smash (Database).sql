-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2026 at 11:38 PM
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
-- Database: `bulk_smash`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `address`, `phone`, `total_price`, `status`, `created_at`) VALUES
(1, 'Shehab Ibrahem', '36 شارع ابن نصر الحضرة البحرية اسكندرية', '123', 260.00, 'pending', '2026-03-27 14:08:22'),
(2, 'Shehab Ibrahem', '36 شارع ابن نصر الحضرة البحرية اسكندرية', '123', 195.00, 'pending', '2026-03-27 14:09:33'),
(3, 'Shehab Ibrahem', '36 شارع ابن نصر الحضرة البحرية اسكندرية', '123', 120.00, 'pending', '2026-03-27 14:10:12'),
(4, 'Shehab Ibrahem', '36 شارع ابن نصر الحضرة البحرية اسكندرية', '123123', 60.00, 'pending', '2026-03-27 14:11:00'),
(5, 'Shehab Ibrahem', '36 شارع ابن نصر الحضرة البحرية اسكندرية', '123', 60.00, 'pending', '2026-03-27 14:11:28'),
(6, 'Shehab Ibrahem', '36 شارع ابن نصر الحضرة البحرية اسكندرية', '01115585173', 100.00, 'pending', '2026-03-27 17:20:55'),
(7, 'Shehab Ibrahem', '36 شارع ابن نصر الحضرة البحرية اسكندرية', '01115585173', 310.00, 'pending', '2026-03-29 21:25:06'),
(8, 'Shehab Ibrahem', '36 شارع ابن نصر الحضرة البحرية اسكندرية', '01115585173', 450.00, 'pending', '2026-03-29 21:27:30'),
(9, 'Shehab Ibrahem', '36 شارع ابن نصر الحضرة البحرية اسكندرية', '01115585173', 450.00, 'pending', '2026-03-29 21:35:05');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 5, 1, 60.00),
(2, 1, 2, 2, 75.00),
(3, 1, 1, 1, 50.00),
(4, 2, 5, 2, 60.00),
(5, 2, 2, 1, 75.00),
(6, 3, 5, 2, 60.00),
(7, 4, 5, 1, 60.00),
(8, 5, 5, 1, 60.00),
(9, 6, 2, 1, 75.00),
(10, 7, 2, 3, 75.00),
(11, 7, 5, 1, 60.00),
(12, 8, 2, 6, 75.00),
(13, 9, 2, 2, 75.00),
(14, 9, 5, 5, 60.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`) VALUES
(1, 'Whey Protein', 50.00, 'High quality protein', 'wheyProtien.png'),
(2, 'Creatine', 75.00, 'High quality Creatine', 'creatine.png'),
(5, 'Pre-Work Out', 60.00, 'High quality Pre-Work Out', 'pre-work.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
