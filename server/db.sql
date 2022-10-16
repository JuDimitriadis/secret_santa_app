-- DROP TABLE IF EXISTS users;

CREATE TABLE users (
     id                      SERIAL primary key,
     name                    VARCHAR(200) NOT NULL,
     email                   VARCHAR(100) NOT NULL UNIQUE,
     hash_password           VARCHAR NOT NULL,
     profile_picture_url     TEXT, 
     created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
