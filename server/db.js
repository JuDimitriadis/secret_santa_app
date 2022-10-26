const spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");
// const cryptoRandomString = require("crypto-random-string");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const {
        DATABASE_USER,
        DATABASE_PASSWORD,
        DATABASE_NAME,
    } = require("../secrets.json");
    db = spicedPg(
        `postgres:${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`
    );
}

// called by function newUser
async function hashPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

//called by function authLogin
async function getUserByEmail(email) {
    const user = await  db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return user.rows[0];
}

async function changePassword(newpassword, id) {
    const hashPass = await hashPassword(newpassword);
    const result = db.query(
        `UPDATE users SET hash_password = $1 WHERE id = $2
            RETURNING * `,
        [hashPass, id]
    );
    return result.rows[0];
}

//CALLED BY /api/login
async function authLogin(email, password) {
    let userLogin;
    const user = await getUserByEmail(email);
    if (!user) {
        userLogin = null;
        return userLogin 
    } else {
        const auth = await bcrypt.compare(password, user.hash_password);

        if (auth === false || auth === null) {
            userLogin = null;
            return userLogin 
        } else {
            userLogin = user;
            return userLogin
        }
    }
    
}

// CALLED BY /api/register
async function newUser(name, email, password) {
    const newName = name.toUpperCase();
    const hashPass = await hashPassword(password);
    const result = await db.query(
        `INSERT INTO users (name, email, hash_password)
        VALUES ($1,$2,$3)
        RETURNING * `,
        [newName, email, hashPass]
    );
    return result.rows[0];
}

// FUNCTION CALLED BY "/api/get-user/data"
async function getUserById(id) {
    const query = await db.query(
            `SELECT id, name, profile_picture_url, about_me, wish_one, wish_two, wish_three FROM users WHERE users.id = $1`,
            [id]
        )
    return query.rows[0]
  
}

// FUNCTION CALLED BY "/api/profile-update"
async function updateUsers({aboutMe, wishOne, wishTwo, wishThree}, id) {
    const query = await db.query(
        `UPDATE users SET about_me = $1, wish_one = $2, wish_two = $3, wish_three = $4 WHERE id = $5
    RETURNING * `,
        [aboutMe, wishOne, wishTwo, wishThree, id]
    )
    return query.rows[0]
}

async function getGroupData(id) {
    const query = await db.query(`SELECT group_participants_draw.participant_id, group_participants_draw.secret_friend_id, group_participants_draw.group_id, secret_santa_group.id, secret_santa_group.group_name, secret_santa_group.draw_date, secret_santa_group.group_photo_url, secret_santa_group.event_date, secret_santa_group.online, secret_santa_group.meeting_link, secret_santa_group.location 
    FROM group_participants_draw
    JOIN secret_santa_group
    ON group_participants_draw.group_id = secret_santa_group.id
    WHERE group_participants_draw.participant_id = $1`, [id]);
    console.log("return query.rows[0]", query.rows[0]);
    return query.rows[0]

}

module.exports = {changePassword, authLogin, newUser, getUserById, updateUsers, getGroupData}