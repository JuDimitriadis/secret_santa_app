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

async function changePassword(newpassword, id) {
    const hashPass = await hashPassword(newpassword);
    const result = db.query(
        `UPDATE users SET hash_password = $1 WHERE id = $2
            RETURNING * `,
        [hashPass, id]
    );
    return result.rows[0];
}

// ** TO DO - CONVERT TO ASYNC FUNCTION **
function authLogin(email, password) {
    let userLogin;
    return getUserByemail(email)
        .then((user) => {
            userLogin = user;
            if (!user) {
                return null;
            } else {
                return bcrypt.compare(password, user.hash_password);
            }
        })
        .then((result) => {
            if (result === false || result === null) {
                return null;
            } else {
                return userLogin;
            }
        });
}

async function newUser(name, email, password) {
    console.log("param db.js", name, email, password);
    const newName = name.toUpperCase();
    console.log("newName", newName);
    const hashPass = await hashPassword(password);
    const result = await db.query(
        `INSERT INTO users (name, email, hash_password)
        VALUES ($1,$2,$3)
        RETURNING * `,
        [newName, email, hashPass]
    );
    return result.rows[0];
}

module.exports = {changePassword, authLogin, newUser,}