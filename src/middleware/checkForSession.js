// This simple middleware will check for an existing session to make sure one isn't already created. This will help prevent duplicated session errors

const CsrfSessionToken = require("../schemas/csrfTokenSchema.js");

async function checkForExistingSession(req, res, next) {
    try {
        const sessionID = req.session.id;

        // Check if a CSRF session token exists with the given session ID
        const existingSession = await CsrfSessionToken.findOne({ sessionID: sessionID });

        // If existingToken is null or expired return false, otherwise return true
        if ( existingSession && existingSession.expiresAt > new Date() ) 
        {
            // Return the success status key as well as the alreadyLoggedIn key for the frontend to use for redirecting the user to the homepage file
            return res.status(200).json(
            {
                success: false,
                alreadyLoggedIn: true,
                message: 'User is already logged in',   // Display a message for the front end to grab and display to the user in an alert before redirection
                redirectUrl: "/homepage.html"   // Redirect location, change this if you decide to change the name of the homepage file
            });
        }
        // If a session has been found, we don't want to duplicate it so we move on after the initial check
        next();
    } 
    
    catch (error) 
    {
        console.error("Error checking existing session:", error);

        return res.status(500)
                  .json({ success: false, message: 'Internal server error' });
    }
}

module.exports = checkForExistingSession;