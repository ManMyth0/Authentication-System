require("dotenv").config();

const express = require('express');
const router = express.Router();

const loginUser = require("../services/loginUser.js");
const checkForExistingSession = require("../middleware/checkForSession.js");

router.post('/login', checkForExistingSession, async (req, res) => {
    try
    {
        // Extract username and password from request body to pass to the loginUser function
        const { username, password } = req.body;

        // Call the loginUser function to evaluate the client's credentials and create the necessary authentication tokens (JWT, CSRF)
        await loginUser(username, password, req, res);
    }

    catch (error)
    {
        console.error("There was an error with the login route");

        return res.status(500)
                  .json({ message: "There was an error with executing the login!" });
    }
});

module.exports = router;