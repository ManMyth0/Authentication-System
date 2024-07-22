// This will be the housing of the password comparison function to grab the hashed password from the database and then compare it to the plain-text password input by the user

const bcrypt = require('bcrypt');
const User = require('../schemas/userSchema.js');

async function comparePasswords(username, password) {
    try 
    {
        // Find user by username to get hashed password
        const findUser = await User.findOne({ username });

        // Set the plain-text password for comparison
        const hashedPassword = findUser.password;

        // Compare the passwords using bcrypt 
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        // If a match, pass a truthy success status to a return statement
        if (passwordMatch) 
        {
            return { success: true };
        } 
        
        else 
        {
            // Handle the false comparison by passing a failed success status to a return statement
            return { success: false, message: "Incorrect Password. Please try again!" };
        }
    } 
    
    catch (error) 
    {
        console.error("Error comparing passwords:", error);

        return { success: false, message: "Error comparing passwords." };
    }
}

module.exports = comparePasswords;