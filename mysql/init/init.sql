-- backend/init.sql
CREATE DATABASE IF NOT EXISTS hackathon;
USE hackathon;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL
);