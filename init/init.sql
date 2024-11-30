CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tweets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

CREATE TABLE replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT NOT NULL, -- 親投稿ID
    user_id VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES tweets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    tweet_id INT, -- tweets テーブルへの外部キー
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE,
    UNIQUE (user_id, tweet_id) -- 同じユーザーが同じ投稿に複数回いいねできない
);

CREATE TABLE IF NOT EXISTS follows (
    follower_id VARCHAR(255) NOT NULL, -- フォローするユーザーID
    followed_id VARCHAR(255) NOT NULL, -- フォローされるユーザーID
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- フォロー日時
    PRIMARY KEY (follower_id, followed_id), -- 重複フォローを防ぐ複合主キー
    FOREIGN KEY (follower_id) REFERENCES users(user_id) ON DELETE CASCADE, -- フォローするユーザー削除時に削除
    FOREIGN KEY (followed_id) REFERENCES users(user_id) ON DELETE CASCADE -- フォローされるユーザー削除時に削除
);

INSERT INTO users (user_id, user_name) VALUES
    ('1', 'Alice'),
    ('2', 'Bob'),
    ('3', 'Charlie');

INSERT INTO tweets (user_id, content, created_at)
VALUES
    ('1', 'Hello, how are you doing today?', '2024-11-16 12:00:00'),
    ('2', 'I am planning to visit the library this afternoon.', '2024-11-16 12:05:00'),
    ('3', 'The weather is perfect for a walk in the park.', '2024-11-16 12:10:00');

INSERT INTO replies (parent_id, user_id, content, created_at)
VALUES
    (1, '2', 'I am good, thank you!', '2024-11-16 12:15:00');
