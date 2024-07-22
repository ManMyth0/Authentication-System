// This file will combine the different pieces of logic to compose the authentication system for the login of a user

const retryLogic = require('../password retry functions/retryLogic.js');
const comparePasswords = require("../authControllers/comparePasswords.js");
const checkLockout = require('../password retry functions/checkLockout.js');
const usernameQuery = require("../username functions/checkDatabaseForUser.js");
const findRetryRecord = require('../password retry functions/findRetryRecord.js');

async function authenticateUser(username, password) {
    try 
    {
        // Grab the user in the database if it exists
        const { success, message } = await usernameQuery(username);

        // If unsuccessful, return false and the usernameQuery's failure message
        if (!success) 
        {
            return { success: false, message };
        }

        // Check if the account is locked before validating the password
        const retryRecord = await findRetryRecord(username);

        if (retryRecord) 
        {
            // Grab the remaining lockout time via the checkLockout function's message
            const { locked, message: lockoutMessage } = await checkLockout(retryRecord);

            // If locked, return the false success message and the checkLockout's failure message
            if (locked) 
            {
                return { success: false, message: lockoutMessage };
            }
        }

        // Compare the plain text and hashed password from the database with the comparePasswords function
        const { success: comparisonSuccess, message: failureMessage } = await comparePasswords(username, password);

        // If successful, return true to the retryLogic for login 
        if (comparisonSuccess)
        {
            await retryLogic(username, true);

            return { success: true };
        }

        // If the comparison fails, return false to the retryLogic to initiate the retry logic and display the failure message
        else
        {
            await retryLogic(username, false);

            return { success: false, message: failureMessage };
        }
    } 
    
    catch (error)
    {
        console.error("There was an error with the authentication method:", error);
        
        return { success: false, message: "An internal error occurred when authenticating the user!" };
    }
}

module.exports = authenticateUser;