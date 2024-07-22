// Find a retry record from a specific username and return the data

const PasswordRetry = require("../schemas/passwordRetrySchema.js");

async function findRetryRecord(username)
{
    try
    {
        // Search the database for the username's retry record
        let retryRecord = await PasswordRetry.findOne({ username });
        
        // If no record exists, create a new one
        if (!retryRecord) 
        {
            retryRecord = new PasswordRetry({ username, attempts: 0 });
        }

        return retryRecord;
    }

    catch (error)
    {
        console.error("There was an internal error when trying to find the user's retry record in the database!:", error);
    }
}

module.exports = findRetryRecord;