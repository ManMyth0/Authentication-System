// This will handle the check for a user's lockout record from too many incorrect passwords attempts

async function checkLockout(retryRecord) {
    try
    {
        // Calculate the remaining time of a lockout
        const remainingLockout = retryRecord.lockUntil ? Math.ceil(( retryRecord.lockUntil - Date.now()) / 60000 ) : 0;

        // If the lockout time has not yet expired, return the remaining time
        if (retryRecord.lockUntil && retryRecord.lockUntil > Date.now()) 
        {
            return { locked: true, remainingLockout, message: `Account locked. Try again in ${ remainingLockout } minutes.` };
        }
        
        // Else, if the lockout time has expired then the locked status is false
        return { locked: false };
    }

    catch (error)
    {
        console.error("There was an internal error when searching for the user's lockout status in the database!:", error);
    }
}

module.exports = checkLockout;