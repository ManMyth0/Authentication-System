// Route that contain the logic for logging a user out

const express = require('express');
const logoutUser = require("../../services/logoutUser.js");
const verifyTokens = require('../../middleware/verifyTokens.js');

const router = express();

// Start by verifying that the token inside the cookie is the same one that's issued to the user then proceed with the logout logic
router.post("/logout", verifyTokens, async (req, res) => {
    try
    {
        // Execute the logout logic. We handle the redirect to the loginSignUpPage.html in the CSRF deletion since that is the last function to execute
        await logoutUser(req, res);
    }

    catch (error)
    {
        console.error("There was an error with the logout route:", error);

        return res.status(500)
                  .json({ message: "There was an internal error running the logout route" });
    }
});

module.exports = router;