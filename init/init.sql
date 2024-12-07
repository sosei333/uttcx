CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_introduction TEXT,
    url TEXT
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


-- Insert sample data into the users table
INSERT INTO users (user_id, user_name, user_introduction) VALUES
        ('user1', 'John Doe', 'I love coding and exploring new technologies.'),
        ('user2', 'Jane Smith', 'Traveler and food enthusiast.'),
        ('user3', 'Alice Johnson', 'Passionate about movies and music.'),
        ('user4', 'Bob Brown', 'Avid reader and art lover.'),
        ('user5', 'Charlie Davis', 'Enjoys running and photography.');

-- Insert sample data into the tweets table
INSERT INTO tweets (user_id, content) VALUES
          ('user1', 'Excited to share my first post here! Let’s connect!'),
          ('user2', 'Discovered a cozy café today. Their coffee is amazing!'),
          ('user3', 'Just watched an incredible movie. Highly recommend it!'),
          ('user4', 'Started a new book. It’s so captivating so far!'),
          ('user5', 'Captured a stunning sunset during my evening jog!');

-- Insert sample data into the replies table
INSERT INTO replies (parent_id, user_id, content) VALUES
                      (1, 'user2', 'That sounds great! Looking forward to more posts.'),
                      (1, 'user3', 'Welcome! Let’s stay connected.'),
                      (2, 'user1', 'Where is this café located?'),
                      (3, 'user5', 'What’s the title of the movie?'),
                      (4, 'user3', 'I’ve been wanting to read that book too!');

-- Insert sample data into the likes table
INSERT INTO likes (user_id, tweet_id) VALUES
          ('user1', 2),
          ('user2', 1),
          ('user3', 1),
          ('user3', 4),
          ('user5', 3);

-- Insert sample data into the follows table
INSERT INTO follows (follower_id, followed_id) VALUES
                   ('user1', 'user2'),
                   ('user1', 'user3'),
                   ('user2', 'user3'),
                   ('user3', 'user4'),
                   ('user4', 'user5');

