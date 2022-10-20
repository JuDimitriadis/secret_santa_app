-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS secret_santa_group;


CREATE TABLE users (
     id                      SERIAL primary key,
     name                    VARCHAR(200) NOT NULL,
     email                   VARCHAR(100) NOT NULL UNIQUE,
     hash_password           VARCHAR NOT NULL,
     profile_picture_url     TEXT, 
     gift
     created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE secret_santa_group (
     id                      SERIAL primary key,
     group_name              VARCHAR(200) NOT NULL UNIQUE,
     manager_id              INT REFERENCES users (id) NOT NULL,
     created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE group_participants_draw (
     id                      SERIAL primary key,
     group_id                INT REFERENCES secret_santa_group (id) NOT NULL,
     participant_id          INT REFERENCES users (id) NOT NULL,
     secret_friend_id        INT REFERENCES users (id),
     created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO secret_santa_group (group_name, manager_id) VALUES ('group_1', 1);