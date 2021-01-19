-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 16 2021 г., 20:13
-- Версия сервера: 10.3.16-MariaDB
-- Версия PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `approvalportal`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accesslevels`
--

CREATE TABLE `accesslevels` (
  `id_acc` tinyint(4) UNSIGNED NOT NULL,
  `accessLevel` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `accesslevels`
--

INSERT INTO `accesslevels` (`id_acc`, `accessLevel`) VALUES
(1, 'Администратор'),
(2, 'Пользователь'),
(3, 'Заблокирован');

-- --------------------------------------------------------

--
-- Структура таблицы `agreements`
--

CREATE TABLE `agreements` (
  `id_agr` int(10) UNSIGNED NOT NULL,
  `id_typ` tinyint(3) UNSIGNED NOT NULL,
  `id_cat` tinyint(3) UNSIGNED NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `contract_num` varchar(256) NOT NULL,
  `contract_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `contract_sub` varchar(256) NOT NULL,
  `dep_res` tinyint(3) UNSIGNED NOT NULL,
  `contract_own` smallint(5) UNSIGNED NOT NULL,
  `contract_adm` smallint(5) UNSIGNED NOT NULL,
  `inn` varchar(256) NOT NULL,
  `verification` tinyint(1) NOT NULL DEFAULT 0,
  `reason_ver` text DEFAULT NULL,
  `id_risk` tinyint(3) UNSIGNED NOT NULL DEFAULT 3,
  `creator_agr` smallint(8) UNSIGNED NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `agreements`
--

INSERT INTO `agreements` (`id_agr`, `id_typ`, `id_cat`, `price`, `contract_num`, `contract_date`, `contract_sub`, `dep_res`, `contract_own`, `contract_adm`, `inn`, `verification`, `reason_ver`, `id_risk`, `creator_agr`, `creation_date`, `id_status`) VALUES
(1, 1, 2, 100000, '285028', '2020-11-30 21:07:12', 'Интернеты в туалеты', 2, 4, 3, '1216775', 1, NULL, 1, 1, '2020-12-28 14:31:18', 1),
(2, 1, 2, 9599432, '961247', '2021-01-11 20:04:02', 'Пельмеши для рабочих', 2, 5, 4, '3142399', 0, NULL, 2, 7, '2021-01-11 20:04:02', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id_cat` tinyint(3) UNSIGNED NOT NULL,
  `category` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id_cat`, `category`) VALUES
(1, 'Закупки для целей монтажа'),
(2, 'Иные закупки');

-- --------------------------------------------------------

--
-- Структура таблицы `departments`
--

CREATE TABLE `departments` (
  `id_dep` tinyint(3) UNSIGNED NOT NULL,
  `department` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `departments`
--

INSERT INTO `departments` (`id_dep`, `department`) VALUES
(1, 'Карательный'),
(2, 'Sourcing'),
(3, 'Отдел продаж');

-- --------------------------------------------------------

--
-- Структура таблицы `positions`
--

CREATE TABLE `positions` (
  `id_pos` tinyint(4) UNSIGNED NOT NULL,
  `position` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `positions`
--

INSERT INTO `positions` (`id_pos`, `position`) VALUES
(1, 'Менеджер по продажам'),
(2, 'Sourcing Specialist'),
(3, 'Кладовщик'),
(4, 'Каратель'),
(5, 'Экзорцист');

-- --------------------------------------------------------

--
-- Структура таблицы `reviewers`
--

CREATE TABLE `reviewers` (
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `comment` text DEFAULT NULL,
  `id_agr` int(10) UNSIGNED NOT NULL,
  `id_user` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `reviewers`
--

INSERT INTO `reviewers` (`status`, `comment`, `id_agr`, `id_user`) VALUES
(1, NULL, 1, 5),
(1, NULL, 1, 4),
(1, NULL, 1, 2),
(1, NULL, 1, 1),
(2, NULL, 2, 6),
(1, NULL, 2, 5),
(2, NULL, 2, 3),
(1, NULL, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `risks`
--

CREATE TABLE `risks` (
  `id_risk` tinyint(3) UNSIGNED NOT NULL,
  `risk` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `risks`
--

INSERT INTO `risks` (`id_risk`, `risk`) VALUES
(1, 'Низкая'),
(2, 'Средняя'),
(3, 'Высокая');

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `id_sessions` int(10) UNSIGNED NOT NULL,
  `id_user` smallint(5) UNSIGNED NOT NULL,
  `token` varchar(128) NOT NULL,
  `dt_login` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `status_agr`
--

CREATE TABLE `status_agr` (
  `id_status` tinyint(1) NOT NULL,
  `status` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `status_agr`
--

INSERT INTO `status_agr` (`id_status`, `status`) VALUES
(1, 'Не согласовано'),
(2, 'Согласовано');

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE `types` (
  `id_typ` tinyint(3) UNSIGNED NOT NULL,
  `type` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `types`
--

INSERT INTO `types` (`id_typ`, `type`) VALUES
(1, 'Разовые закупки'),
(2, 'Рамочные соглашения');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` smallint(5) UNSIGNED NOT NULL,
  `secondname` varchar(32) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `patronymic` varchar(32) DEFAULT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(256) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_dep` tinyint(4) UNSIGNED NOT NULL,
  `id_pos` tinyint(4) UNSIGNED NOT NULL,
  `id_acc` tinyint(4) UNSIGNED NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `secondname`, `firstname`, `patronymic`, `email`, `password`, `reg_date`, `id_dep`, `id_pos`, `id_acc`) VALUES
(1, 'Яковенко', 'Данил', 'Юрьевич', 'danil.yakovenko@outlook.com', '123456', '2020-12-28 11:44:32', 1, 4, 1),
(2, 'Иванов', 'Владимир', 'Игоревич', 'vladimir.ivanov@test.com', '123456', '2020-12-28 11:44:32', 2, 2, 1),
(3, 'Петрова', 'Анастасия', 'Юрьевна', 'anastasia.petrova@test.com', '123456', '2020-12-28 11:46:33', 2, 2, 2),
(4, 'Иванов', 'Иван', 'Иванович', 'ivanovivan@mail.ru', '123456', '2020-12-28 11:46:33', 1, 3, 3),
(5, 'Петров', 'Петр', 'Петрович', 'petrovpetr@yandex.com', '123456', '2020-12-28 11:48:10', 3, 1, 2),
(6, 'Алексеев', 'Алексей', 'Алексеевич', 'alexeyale@yandex.com', '123456', '2020-12-28 11:48:10', 3, 1, 2),
(7, 'Странный', 'Сергей', 'Сергеевич', 'eererer@test.ru', '123456', '2020-12-28 11:48:51', 1, 5, 2);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `accesslevels`
--
ALTER TABLE `accesslevels`
  ADD PRIMARY KEY (`id_acc`),
  ADD UNIQUE KEY `id_acc` (`id_acc`),
  ADD KEY `id_acc_2` (`id_acc`),
  ADD KEY `id_acc_3` (`id_acc`);

--
-- Индексы таблицы `agreements`
--
ALTER TABLE `agreements`
  ADD PRIMARY KEY (`id_agr`),
  ADD KEY `id_typ` (`id_typ`),
  ADD KEY `id_cat` (`id_cat`),
  ADD KEY `contract_num` (`contract_num`),
  ADD KEY `contract_sub` (`contract_sub`),
  ADD KEY `dep_res` (`dep_res`),
  ADD KEY `contract_own` (`contract_own`),
  ADD KEY `contract_adm` (`contract_adm`),
  ADD KEY `inn` (`inn`),
  ADD KEY `verification` (`verification`),
  ADD KEY `id_risk` (`id_risk`),
  ADD KEY `creator_agr` (`creator_agr`),
  ADD KEY `status_agr` (`id_status`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_cat`);

--
-- Индексы таблицы `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id_dep`);

--
-- Индексы таблицы `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id_pos`);

--
-- Индексы таблицы `reviewers`
--
ALTER TABLE `reviewers`
  ADD KEY `id_agr` (`id_agr`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `risks`
--
ALTER TABLE `risks`
  ADD PRIMARY KEY (`id_risk`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id_sessions`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `id_sessions` (`id_sessions`);

--
-- Индексы таблицы `status_agr`
--
ALTER TABLE `status_agr`
  ADD PRIMARY KEY (`id_status`);

--
-- Индексы таблицы `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id_typ`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_acc` (`id_acc`),
  ADD KEY `id_pos` (`id_pos`),
  ADD KEY `id_dep` (`id_dep`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `accesslevels`
--
ALTER TABLE `accesslevels`
  MODIFY `id_acc` tinyint(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `agreements`
--
ALTER TABLE `agreements`
  MODIFY `id_agr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id_cat` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `id_dep` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `positions`
--
ALTER TABLE `positions`
  MODIFY `id_pos` tinyint(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `risks`
--
ALTER TABLE `risks`
  MODIFY `id_risk` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id_sessions` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `status_agr`
--
ALTER TABLE `status_agr`
  MODIFY `id_status` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `id_typ` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `agreements`
--
ALTER TABLE `agreements`
  ADD CONSTRAINT `agreements_ibfk_1` FOREIGN KEY (`id_cat`) REFERENCES `categories` (`id_cat`),
  ADD CONSTRAINT `agreements_ibfk_2` FOREIGN KEY (`id_typ`) REFERENCES `types` (`id_typ`),
  ADD CONSTRAINT `agreements_ibfk_3` FOREIGN KEY (`id_risk`) REFERENCES `risks` (`id_risk`),
  ADD CONSTRAINT `agreements_ibfk_4` FOREIGN KEY (`dep_res`) REFERENCES `departments` (`id_dep`),
  ADD CONSTRAINT `agreements_ibfk_5` FOREIGN KEY (`creator_agr`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `agreements_ibfk_6` FOREIGN KEY (`contract_own`) REFERENCES `users` (`id_user`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `agreements_ibfk_7` FOREIGN KEY (`contract_adm`) REFERENCES `users` (`id_user`) ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `reviewers`
--
ALTER TABLE `reviewers`
  ADD CONSTRAINT `reviewers_ibfk_1` FOREIGN KEY (`id_agr`) REFERENCES `agreements` (`id_agr`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviewers_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_acc`) REFERENCES `accesslevels` (`id_acc`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`id_dep`) REFERENCES `departments` (`id_dep`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`id_pos`) REFERENCES `positions` (`id_pos`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
