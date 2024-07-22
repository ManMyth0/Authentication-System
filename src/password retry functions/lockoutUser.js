// This will handle locking the user's account after exceeding allowed retry attempts

async function lockoutUser(retryRecord) {
    try 
    {
        // Duration of 15 minutes in milliseconds, change this based on wants/needs
        const lockoutDuration = 1000 * 60 * 15;

        // Set lockout time
        retryRecord.lockUntil = Date.now() + lockoutDuration;

        // Calculate the remaining lockout duration by rounding the time up and turn it into minutes (60000 milliseconds == 1 minute)
        const remainingLockoutTime = retryRecord.lockUntil ? Math.ceil((retryRecord.lockUntil - Date.now()) / 60000) : 0;

        // Save the lockout to the database
        await retryRecord.save();

        // Produce the lockout message with remaining time
        return { success: false, remainingLockoutTime }
    } 
    
    catch (error) 
    {
        console.error("There was an internal error locking the user account!", error);

        return { success: false, message: "There was an error locking the user account!" };
    }
}

module.exports = lockoutUser;