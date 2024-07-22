// Populated with a route that sends users to the homePage. This file is just for demonstration purpose and won't contain anything but the protected GET route that will 
// verify the token and a 'Hello World' statement to be displayed as a response in the browser if verification is successful.

const express = require("express");
const verifyTokens = require("../../middleware/verifyTokens.js");

const router = express();

// Calling the JWT verification middleware in the route to ensure the token inside the cookie is correct
router.get("/homePage", verifyTokens, async (req, res) => {
    try
    {
        res.status(200)
           .send("homePage.html");
    }

    catch (error)
    {
        console.error("The homepage route didn't load as expected!");

        return res.status(500)
                  .json({ message: "The simple homepage route failed to be accessed!" });
    }
});

module.exports = router;