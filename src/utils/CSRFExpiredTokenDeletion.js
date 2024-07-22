// This simple clean up function will handle the deletion of expired tokens in the designated Database provided the client's session is terminated without logging out 
// or the token has expired by being stored in the CSRF Session Token Creation file 

const CsrfSessionToken = require("../schemas/csrfTokenSchema.js");

async function databaseSessionCleanup()
{
    try
    {
        // Grab the current time and date for logic use
        const currentDate = new Date();

        // Remove the commented out sections below for testing purposes unless you want a message returned in the console upon success and failure of query / deletion attempt
        const sessionDeletionResult = await CsrfSessionToken.deleteMany({expiresAt: {$lt: currentDate}});

        // if (sessionDeletionResult.deletedCount === 0)
        // {
        //     console.error("No expired sessions found for cleanup!");
        // }
        
        // else
        // {
        //     console.log(`Deleted ${sessionDeletionResult.deletedCount} expired sessions!`);
        // }
    
        if (!sessionDeletionResult)
        {
            console.error("Couldn't clean up the sessions from Database!");
        }
    }

    catch (error)
    {
        console.error("Internal error with the session cleanup function!");
    }
}

module.exports = databaseSessionCleanup;