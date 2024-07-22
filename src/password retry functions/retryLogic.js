// This function contains the bulk of the logic for the password attempts and lockout

const lockoutLogic = require("./lockoutLogic.js");
const checkLockout = require("./findRetryRecord.js");
const findRetryRecord = require("./findRetryRecord.js");
const resetRetryRecord = require("./resetRetryRecord.js");
const incrementRetryAttempts = require("./incrementRetryAttempts.js");

async function retryLogic(username, success) {
    try 
    {
        // Find the retry record for the user
        let retryRecord = await findRetryRecord(username);

        // Check if the account is currently locked
        const lockoutStatus = await checkLockout(retryRecord);

        if (lockoutStatus.locked) 
        {
            return { success: false, message: lockoutStatus.message };
        }

        // Reset retry record upon successful login and produce a message, currently the message lays dormant
        if (success) 
        {
            await resetRetryRecord(username);

            return { success: true, message: "Login Successful!" };
        } 
        
        // Increment retry attempts upon failed login
        await incrementRetryAttempts(retryRecord);

        // Check if retry attempts exceed the limit and if exceeded, the account will be locked
        const lockout = await lockoutLogic(retryRecord);

        if (lockout) 
        {
            return lockout;
        }
    } 
    
    catch (error) 
    {
        console.error("There was an error in the retryLogic:", error);

        return { success: false, message: "An internal error occurred in the retryLogic!" };
    }
}

module.exports = retryLogic;