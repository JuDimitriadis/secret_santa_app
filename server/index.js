const express = require("express");
const compression = require("compression");
const path = require("path");
const database = require("./db.js");
const cookieSession = require("cookie-session");
// const ses = require("./ses.js");
// const multer = require("./midleware.js");
// const s3 = require("./s3.js");
const PORT = process.env.PORT || 3001;
const app = express();

let COOKIE_SECRET;

if (process.env.DATABASE_URL) {
    COOKIE_SECRET = process.env.COOKIE_SECRET;
} else {
    const { COOKIE_SECRET_DEV,
    } = require("../secrets.json");
    COOKIE_SECRET = COOKIE_SECRET_DEV
}

// const cookieParser = require("cookie-parser");
// const server = Server(app);
// app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(compression());

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

//API serving index.js
app.get("/api/user", (req, res) => {
    if (!req.session.id) {
        return res.json({ success: false });
    } else {
        return res.json({ success: true });
    }
});

//API serving registration.js
app.post("/api/register", (req, res) => {
    const { name, email, password } = req.body;
    database
        .newUser(name, email, password)
        .then((new_user) => {
            const newId = { id: new_user.id };
            req.session = newId;
            return res.json({ success: true });
        })
        .catch((error) => {
            console.log("new user error", error);
            if (error.constraint === "users_email_key") {
                return res.json({ error: "email" });
            } else {
                return res.json({ error: "others" });
            }
        });
});


//API SERVING login.js
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const loginCheck = await database.authLogin(email, password);

        if (loginCheck === null) {
            return res.json({ success: false });
        } else {
            const loginId = { id: loginCheck.id };
            req.session = loginId;
            return res.json({ success: true });
        }
        
    });

// API SERVING => app.js
app.get("/api/get-user-data", async (req, res) => {
    const getUser = await database.getUserById(req.session.id)
    return res.json(getUser);
    });


//API SERVING app.js
app.delete("/api/logout", (req, res) => {
    req.session = null;
   return res.json({ success: true });
});

//API serving app.js
app.post("/api/profile-update", async (req, res) => {

    if (req.body.wishOne && !req.body.wishOne.startsWith('https')) {
        return res.json({ error: "invalid link" });
    } else if (req.body.wishTwo && !req.body.wishTwo.startsWith('https')) {
        return res.json({ error: "invalid link" });
    } else if (req.body.wishThree && !req.body.wishThree.startsWith('https')) {
        return res.json({ error: "invalid link" });
    } else {
        const updateUsers = await database.updateUsers(req.body, req.session.id)
        if (updateUsers.id) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false });
        }
    }
})

app.get("/api/get-secret-group", async (req, res) => {
    const getGroupData = await database.getGroupData(req.session.id);
    return res.json(getGroupData);
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});