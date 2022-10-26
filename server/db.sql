DROP TABLE IF EXISTS group_participants_draw;
DROP TABLE IF EXISTS secret_santa_group;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
     id                      SERIAL primary key,
     name                    VARCHAR(200) NOT NULL,
     email                   VARCHAR(100) NOT NULL UNIQUE,
     hash_password           VARCHAR NOT NULL,
     profile_picture_url     TEXT,
     about_me                TEXT, 
     wish_one                TEXT,
     wish_two                TEXT,
     wish_three              TEXT,
     created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE secret_santa_group (
     id                      SERIAL primary key,
     group_name              VARCHAR(200) NOT NULL UNIQUE,
     manager_id              INT REFERENCES users (id) NOT NULL,
     draw_date               DATE,
     event_date              TIMESTAMP without time zone,
     online                  BOOLEAN,
     meeting_link            TEXT,
     location                TEXT,    
     group_photo_url         TEXT,             
     created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE group_participants_draw (
     id                      SERIAL primary key,
     group_id                INT REFERENCES secret_santa_group (id) NOT NULL,
     participant_id          INT REFERENCES users (id) NOT NULL,
     secret_friend_id        INT REFERENCES users (id),
     created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO secret_santa_group (group_name, manager_id, online, group_photo_url, event_date, draw_date) VALUES ('group_1', 1, true, '/secret_img.jpg', '10/12/2022 20:30', '01/12/2022');
INSERT INTO group_participants_draw (group_id,participant_id) VALUES (1,1);

INSERT INTO secret_santa_group (group_name, manager_id, online, group_photo_url, event_date, draw_date) VALUES ('Confraternização do Grupo Mutterschaft', 1, true, '/secret_img.jpg', '17/12/2022 20:00', '01/11/2022');



SELECT group_participants_draw.participant_id, group_participants_draw.secret_friend_id, group_participants_draw.group_id, secret_santa_group.id, secret_santa_group.group_name, secret_santa_group.draw_date, secret_santa_group.event_date, secret_santa_group.online, secret_santa_group.meeting_link, secret_santa_group.location 
FROM group_participants_draw
JOIN secret_santa_group
ON group_participants_draw.group_id = secret_santa_group.id
WHERE group_participants_draw.participant_id = 1