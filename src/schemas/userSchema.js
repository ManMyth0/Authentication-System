const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

// This schema will allow for a combination of numbers and letters for each category and requires special characters for the password.
const userSchema = new mongoose.Schema
({
    username: 
        {
            type: String,
            required: [true, "Please enter a username!"],
            unique: true,
            minLength: [ 3, "Username must have a minimum of 3 character!"],
            maxLength: [ 16, "Username must be a maximum of 16 characters long!"],
            validate:
            [
                    {   // Validate only numbers, letters and a list of special characters and ensure there is at least 1 of each and no white space
                        validator: function(v)
                        {
                            return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!?.$~\-*])(?!.*\s).+$/.test(v);
                        },
                        message: "Invalid username. Please do not include any white spaces and have at least at least 1 number, 1 letter and 1 special character from this list: '!', '?', '.', '$', '~', '-', '*' "
                    },
            ]

        },

    email:
         {
            type: mongoose.Schema.Types.Mixed,
            require: [true, "Please enter an email!"],
            unique: true,
            validate: [isEmail, "Please enter a valid email!"]
         },

    password: 
            {
                type: String,
                required: [true, "Please enter a password!"],
                minLength: [ 8, "Password must be at least 8 characters long"],
                maxLength: [ 16, "Password must be a maximum of 16 characters long"],

                // Test to make sure that the password contains a special character, at least 1 number and 1 letter with no white space
                validate: 
                        {
                            validator: function(v) 
                            {
                                return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!?.$~\-*])(?!.*\s).+$/.test(v);
                            },
                            message: "Invalid password! Please include at least 1 letter, 1 number, no white spaces and 1 of these special characters: '!', '?', '.', '$', '~', '-', '*' "
                        }
            },

})
        
// Below is using a Pre-save hook to hash the password before saving to the database while handling errors.
userSchema.pre('save', async function(next) 
{
    try 
    {
        if (!this.isModified('password')) 
        {
            // Skip password hashing if password is not new / modified
            next();
        }
        
        else
        {
            // Generate a salt and feel free to change this from the range of 4 - 31. Keep in mind the higher the salt value the more computational power needed
            const salt = await bcrypt.genSalt(13);
    
            // Hash the password using the generated salt and replace the plaintext password with the newly hashed password
            this.password = await bcrypt.hash(this.password, salt);
        }

        next();
    } 
    
    catch (error) 
    {
        // Pass any error(s) to the next middleware
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;