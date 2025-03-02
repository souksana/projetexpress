-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 02 mars 2025 à 19:30
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projetexpress`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `pseudo`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(3, 'Phetdara', 'Souksana', 'admin@a.com', 'aaether', '$2a$10$gNqnjCKqzD5EinutNNqMKe8FkdOc.SLm1XaFh6fmTvyUnaslPI3PW', 'admin', '2025-02-14 07:47:04', '2025-02-14 07:47:04'),
(4, 'Hoareau', 'Jumi', 'jumihoareau@gmail.com', 'xblod', '$2a$10$KrG6a4qGiLp8QUcLhyJbZuJmTey4iGcjR0Pc.YFsguuJsOhgbCI1K', 'user', '2025-02-14 07:58:31', '2025-02-14 07:58:31'),
(5, 'Waslam', 'Prisca', 'prisca.w@gmail.com', 'caliko', '$2a$10$bTsBX/wgooXnJ9qXbz7vtevZFvvd1.IdFhSJNeXFh.5.Fh869Lppq', 'user', '2025-02-14 07:59:00', '2025-02-14 07:59:00'),
(6, 'Lamy', 'Maud', 'm.lamy45@gmail.com', 'm__4515', '$2a$10$A/q1ae.uKqFRB.6/qrVTOuDbg6wnn.HQsB8RKeWx./YvtJ4hW1T/S', 'user', '2025-02-14 07:59:39', '2025-02-14 07:59:39'),
(7, 'Clermontet', 'Hugo', 'hugoclermonte@gmail.com', 'bbto', '$2a$10$nl3QjDZvRnaY5qT/8mFT..5HFAF3C6o3U0pfpVG3eX.7L5S4JDtse', 'user', '2025-02-14 08:00:28', '2025-02-14 08:00:28');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `pseudo` (`pseudo`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
