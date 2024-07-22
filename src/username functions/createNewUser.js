const User = require('../schemas/userSchema.js');

// This function will handle the logic for creating a new user by checking if the chosen username exists and if not, it will proceed with the logic
async function createNewUser(username, email, password, res) {
    try 
    {
        // First, check if the user already exists
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) 
        {
            return res.status(400)
                      .json({ success: false, message: "A user with this email already exists!" });
        } 
        
        else 
        {
            // Create a new user
            const user = new User({ username, email, password });

            // Save the user's info to the designated Database
            const newUser = await user.save();

            // If the user is successfully saved, return a message to the client
            if (newUser) 
            {
                // Return JSON response for success and redirect to the loginSignUpPage.html
                return res.status(200)
                          .json({ success: true, message: "User created successfully!", redirectUrl: "/loginSignupPage.html?success=true" });
            }
        }
    } 
    
    catch (error) 
    {
        // Testing validation here for now. Will make an auth controller file to store validations in later
        if (error.name === 'ValidationError') 
        {
            // Map the errors by object.values to appropriate error message(s)
            const errors = Object.values(error.errors).map(err => err.message);

            return res.status(400)
                      .json({ success: false, message: "Validation failed", errors });
        }
        
        console.error("There was an internal error with the creating new user logic!", error);

        return res.status(500)
                  .json({ success: false, message: "There was an internal error with the logic for creating a new user!" });
    }
}

module.exports = createNewUser;