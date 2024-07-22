// Main housing for the api files

require('dotenv').config();

const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/optionsForCORS.js");
const cacheController = require("./middleware/cacheControl.js");

const app = express();

// Process.env usage:
const PORT = process.env.PORT || 3000;
const cookieSecret = process.env.COOKIE_SECRET_KEY;
const sessionSecret = process.env.SESSION_SECRET_KEY;

// Required Routes:
const login = require("./routes/login.js");
const newUser = require("./routes/newUser.js");
const logout = require("./routes/protected/logout.js");

// Database connection import and invocation
const { connectToMongoDB } = require("./config/connectToMongoDB.js");

connectToMongoDB();


// Middleware usage:
app.use(cors(corsOptions));     // Please make sure to change the options in the optionsForCORS file to suit your needs
app.use(cacheController);       // Globally controlling the cache, remove this to handle the cache per route or implement an override in individual routes where you might change how you want that caching to work
app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: true, cookie: { signed: true } }));    // For use when retrieving a session ID in middlewares / functions
app.use(express.json());    // Parse JSON bodies
app.use(cookieParser(cookieSecret));    // Parse and sign cookies. Cookie should last for the duration of the session by default, will handle it's removal manually in the logout as well
app.use(express.static('src/Static Pages'));   // Serve static files from this directory location, remember to change this location if changing where the static files are being served from
app.use(express.urlencoded({ extended: true }));    // Deprecation warning if extended isn't specifically set as of now. Needed to parse URL-encoded login data from browser


// Server initiation
app.listen(PORT, () => {
    console.log(`Server Initiated on: ${ PORT }`);
});


// Route usage:
app.use("/", login);
app.use("/", logout);
app.use("/", newUser);