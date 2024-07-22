
const csrfTokenHandler = require("./createSaveCleanCSRFToken.js");
const handleJwtAuthTokenAndCookie = require("./loginCookieAndToken.js");

async function creationOfClientsTokens(username, req, res)
{
    try
    {
        const resultOfJwtAndCookie = await handleJwtAuthTokenAndCookie(username, res);
        
        if (resultOfJwtAndCookie)
        {
            // Issue CSRF Session Token if JWT successfully created and placed in a cookie then return true
            await csrfTokenHandler(req, res);

            return true;
        }

        else
        {
            // If Authentication fails, return false and an error message to the console
            console.error("The Authentication has failed!");

            return false;
        }
    }

    catch (error)
    {
        console.error("There was an error with the authentication of the loginUser function:", error);

        return false
    }
}

module.exports = creationOfClientsTokens;