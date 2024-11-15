CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
);

INSERT INTO users (id, user_name) VALUES
    ('1', 'Alice'),
    ('2', 'Bob'),
    ('3', 'Charlie');