CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
);

INSERT INTO users (user_id, user_name) VALUES
    ('1', 'Alice'),
    ('2', 'Bob'),
    ('3', 'Charlie');

CREATE TABLE IF NOT EXISTS posts (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id VARCHAR(255) NOT NULL,
   content TEXT NOT NULL,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (user_id, content, created_at)
VALUES
    ('user123', 'Hello, how are you doing today?', '2024-11-16 12:00:00'),
    ('user456', 'I am planning to visit the library this afternoon.', '2024-11-16 12:05:00'),
    ('user789', 'The weather is perfect for a walk in the park.', '2024-11-16 12:10:00');

