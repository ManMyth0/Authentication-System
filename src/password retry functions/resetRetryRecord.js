// Here we will reset the retry record upon a successful login by the user

const PasswordRetry = require("../schemas/passwordRetrySchema.js");

async function resetRetryRecord(username) {
    try
    {
        const deleteRetryRecord = await PasswordRetry.deleteOne({ username });

        if(deleteRetryRecord.acknowledged)
        { 
            return { success: true };
        }

            return { success: false };
    }

    catch
    {
        console.error("There was an internal error when trying to reset the user's lockout record!:". error);
    } 
}

module.exports = resetRetryRecord;