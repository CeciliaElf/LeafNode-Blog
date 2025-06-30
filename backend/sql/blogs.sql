-- 創建 blogs 表
CREATE TABLE `blogs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NOT NULL COMMENT '標題',
  `content` TEXT NOT NULL COMMENT '部落格內容',
  `coverImg` VARCHAR(1024) COMMENT '封面圖片',
  `category` VARCHAR(64) COMMENT '所屬專欄',
  `isDelete` BOOLEAN NOT NULL DEFAULT false COMMENT '是否已經刪除',
  `userId` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;