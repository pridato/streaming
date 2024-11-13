CREATE DATABASE streaming_db;
USE streaming_db;

CREATE TABLE user (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  name varchar(50) not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone numeric(9) not null,
  is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE video (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   description TEXT,
   url VARCHAR(500) NOT NULL,
   uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   user_id BIGINT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE comment (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     content TEXT NOT NULL,
     commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     user_id BIGINT NOT NULL,
     video_id BIGINT NOT NULL,
     FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
     FOREIGN KEY (video_id) REFERENCES video(id) ON DELETE CASCADE
);

insert into user (username, name, email, password_hash, phone, is_verified)
values (
           'david',
           'David',
           'david@example.com',
              'david2004',
              123456789,
                FALSE
);