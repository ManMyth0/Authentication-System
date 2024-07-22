// Route that contains the logic for creating a new user

const express = require('express');
const router = express.Router();

const createNewUser = require("../username functions/createNewUser.js");

// Route to create a new user
router.post('/users/newUser', async (req, res) => {
    try 
    {
        // Obtain client info from the req.body for logic use
        const { username, email, password } = req.body;

        // Invoke new user creation logic with needed parameters
        await createNewUser(username, email, password, res);
    } 
    
    catch (error) 
    {
        console.error("Internal Server Error with the new user route:", error);
        
        return res.status(500)
                  .json({ message: "There was an internal error with the new user route!" });
    }
});

module.exports = router;