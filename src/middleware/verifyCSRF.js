// This file will handle the CSRF Token verification middleware logic 

const CsrfSessionToken = require("../schemas/csrfTokenSchema.js");

async function verifyCSRF(req, res) {
    try
    {
        // Grab current session's CSRF token from request body
        const currentCsrfToken = req.signedCookies.csrfToken

        // Grab current session ID
        const csrfSessionID = req.session.id

        // Check for the csrfToken's presence, redirect to the login page if missing
        if (!currentCsrfToken) 
        {
            console.log("No CSRF Token present!");
            
            return res.status(403)
                      .redirect("/loginSignupPage.html");       // Change this to wherever you want this to redirect for the client to login / signup.
        }

        // Verify CSRF Session Token with stored database session ID
        const storedCSRFToken = await CsrfSessionToken.findOne({ sessionID: csrfSessionID });

        // If the CSRF token is invalid, redirect the user to the login page
        if (!storedCSRFToken || storedCSRFToken.csrfToken !== currentCsrfToken)
        {
            return res.status(403)
                      .redirect( "/loginSignupPage.html" );     // Change this to wherever you want this to redirect for the client to login / signup.
        }
    }

    catch (error)
    {
        // Upon failing to execute the logic, redirect to the login page
        console.error("The middleware verification for the CSRF token failed! Redirecting the client to the login page.");

        return res.status(500)
                  .redirect( "/loginSignupPage.html" );     // Change this to wherever you want this to redirect for the client to login / signup.
    }
}

module.exports = verifyCSRF;