SHOW DATABASES;

CREATE DATABASE cfmeu;

USE cfmeu;

CREATE TABLE users(
	id CHAR(8) PRIMARY KEY,
    name VARCHAR(60),
    status ENUM('Active', 'Inactive')
);

CREATE TABLE meetings (
	id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE
);

CREATE TABLE users_meeting (
	id INT AUTO_INCREMENT PRIMARY KEY,
	meeting_id INT,
    user_id CHAR(8),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(meeting_id) REFERENCES meetings(id)
);

SELECT * FROM users