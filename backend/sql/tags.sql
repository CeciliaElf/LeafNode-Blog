-- 創建標籤表
CREATE TABLE `tags` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL COMMENT '標籤名稱',
  `isDeleted` BOOLEAN NOT NULL DEFAULT false COMMENT '是否已經刪除',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;