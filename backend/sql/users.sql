-- 創建用戶表
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL COMMENT '用戶名',
  `email` VARCHAR(255) NOT NULL COMMENT '電子郵箱',
  `password` VARCHAR(255) NOT NULL COMMENT '密碼',
  `nickname` VARCHAR(15) NOT NULL COMMENT '暱稱',
  `age` SMALLINT NOT NULL COMMENT '年齡',
  `gender` ENUM('male', 'female', 'MTF', 'FTM', 'other') NOT NULL COMMENT '性別',
  `introduction` TEXT COMMENT '用戶個人簡介',
  `avatar` VARCHAR(1024) COMMENT '大頭貼',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;