// This will be the logic used when it's time to call the lockoutUser function from too many incorrect password attempts

const lockoutUser = require("./lockoutUser");

async function lockoutLogic(retryRecord) {
    try 
    {
        // Number of allowed retries. Change this to suit your needs
        const retryCounterLimit = 4;

        // Check if retry attempts exceed the limit
        if (retryRecord.attempts >= retryCounterLimit) 
        {
            // Call the lockoutUser function to lock the user's account
            return await lockoutUser(retryRecord);
        }
    } 
    
    catch (error) 
    {
        console.error("There was an error in the lockoutLogic:", error);

        return { success: false, message: "An error occurred in the lockout logic." };
    }
}

module.exports = lockoutLogic;