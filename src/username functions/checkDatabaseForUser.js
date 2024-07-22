// Search the database for an existing user

const User = require("../schemas/userSchema.js");

async function usernameQuery(username)
{
    try
    {
        // Query the database for a specific user
        const findUserInDatabase = await User.findOne({ username });

        // If the user exists, return it and the success as true
        if (findUserInDatabase)
        {
            return { success: true, user: findUserInDatabase };
        }

        // If the user is not in the database, return the success as false and produce a message
        else
        {
            return { success: false, message: `The user: ${ username } does not exist!` };
        }
    }

    catch (error)
    {
        console.error(`There was an error trying to find the user: ${ username } in the database!`);

        return { success: false, error: "An internal error while fetching the username occurred." };
    }
}

module.exports = usernameQuery;