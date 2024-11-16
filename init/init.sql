CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
);

INSERT INTO users (id, user_name) VALUES
    ('1', 'Alice'),
    ('2', 'Bob'),
    ('3', 'Charlie');

CREATE TABLE IF NOT EXISTS posts (
   id INT AUTO_INCREMENT PRIMARY KEY,             -- 投稿ID (主キー)
   user_id VARCHAR(255) NOT NULL,                 -- ユーザーID
   content TEXT NOT NULL,                         -- 投稿内容
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 作成日時
);

INSERT INTO posts (user_id, content, created_at)
VALUES
    ('user123', 'これはサンプル投稿1です。', '2024-11-16 12:00:00'),
    ('user456', 'これはサンプル投稿2です。', '2024-11-16 12:05:00'),
    ('user789', 'これはサンプル投稿3です。', '2024-11-16 12:10:00');

