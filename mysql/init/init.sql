-- backend/init.sql
ALTER USER 'sosei'@'%' IDENTIFIED WITH mysql_native_password BY 'Niko#124';

CREATE DATABASE IF NOT EXISTS hackathon;
USE hackathon;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
);

FLUSH PRIVILEGES;