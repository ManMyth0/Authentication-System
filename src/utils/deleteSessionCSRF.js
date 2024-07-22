// Simple logic to remove the client's CSRF session Token from the designated database

const CsrfSessionToken  = require("../schemas/csrfTokenSchema");

async function deleteCSRFSessionFromDB(req, res)
{
    try
    {
        // Grab the token from the cookie
        const currentCsrfToken = req.signedCookies.csrfToken;

        // Grab the current session ID
        const currentSession = req.session.id

        // Search for the current sessions's CSRF Token ID in the designated Database
        const storedToken = await CsrfSessionToken.findOne({ sessionID: currentSession });
        
        // If there is not CSRF Token or no stored token with the same session ID or the current CSRF Token in the cookie is not the same as the one stored in the designated Database
        if (!currentCsrfToken || !storedToken.csrfToken || currentCsrfToken !== storedToken.csrfToken)
        {
            return res.status(400)
                      .json({ message: `That is an Invalid Token!` });
        }

            // Else, successfully found, delete that session's token from the designated Database
            const csrfDeletionResult = await CsrfSessionToken.deleteOne({ sessionID: currentSession});

            // If successfully deleted, return a message to the client stating the success of the deletion
            if (csrfDeletionResult)
            {
                // Since this will be the last function to be called, we will redirect the user from here upon successful deletion of the CSRF Token from the designated Database
                return res.status(200)
                          .redirect("/loginSignUpPage.html")
            }    
    
            else
            {
                // If the deletion fails, handle the error
                return res.status(400)
                          .json({ message: `The CSRF Session Token couldn't be deleted!`});
            }
    }

    catch (error)
    {
        return res.status(500)
                  .json({ message: "There was an internal error with attempting to delete the CSRF session token from the designated Database! " })
    }
}

module.exports = deleteCSRFSessionFromDB;