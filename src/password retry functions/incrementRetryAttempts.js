// This will handle the incrementing of the retry attempts upon a failed login attempt and lock the account if / when necessary

// Increment retry attempts and handle lockout if necessary
async function incrementRetryAttempts(retryRecord) {
    try 
    {
        // Increment the retry count on a failed attempt
        retryRecord.attempts += 1;

        // Save the user's retry record to the database
        const savedRecorded = await retryRecord.save();

        // If the save fails, return the success as false and pass a message
        if (!savedRecorded)
        {
            return { success: false, message: "Failed to save the retry record to the database!" };
        }
    } 
    
    catch (error) 
    {
        console.error("There was an internal error handling the failed login attempt!", error);

        return { success: false, message: "There was an error incrementing the retry record!" };
    }
}

module.exports = incrementRetryAttempts;