// Middleware logic for the async generation and cleanup of a CSRF token

const secretKeyGenerator  = require("../secretKeyGen.js");
const CsrfSessionToken = require("../schemas/csrfTokenSchema.js");
const databaseSessionCleanup = require("./CSRFExpiredTokenDeletion.js");


// Cleanup expired CSRF Session Tokens from the designated Database then Create the CSRF token asynchronously and set it's options
async function csrfTokenHandler(req, res) {
    try
    {
        // Set the needed variables for the cleanup logic and options for the CSRF Token Creation logic
        const expiresIn = 1000 * 60 * 60 * 12;  // Equation for 12 Hours in milliseconds, change this to whatever expiration is wanted.
        const expiresAt = new Date(Date.now() + expiresIn);   // Place in token creation to create the expiration logic
        
        // Generate the secret key for the csrfToken, unique for every user, via secretKeyGenerator. Whatever key is needed can be returned in the secretKeyGen's file
        const csrfToken = await secretKeyGenerator();

        // Create the CSRF Session token and set it's options
        const csrfSession = new CsrfSessionToken(
        {
            sessionID: req.session.id, 
            csrfToken: csrfToken,
            expiresAt: expiresAt 
        });
        
        // Place the CSRF Session Token in a cookie and set it's options, omitting the expiration time will default in the cookie being removed when the session is logged out or browser closed
        res.cookie("csrfToken", csrfToken, 
        {
            httpOnly: true, // Only accessible through web server
            secure: true,   // Only HTTPS usage. Feel free to change this to (process.env.NODE_ENV === 'environment_here') adjusted depending on 'production' / 'development' environment
            samSite: "lax", // Medium setting, allowing for third party login usage (FB, Google etc..)
            signed: true
        });

        // Save the CSRF session Token to the designated database for safe keeping
        await csrfSession.save();

        // In the event that the user doesn't logout of their session and just closes the browser,
        // start clean up of expired CSRF Session Tokens from the designated database once the CSRF Session Token is created, saved and placed in a cookie
        await databaseSessionCleanup();
    }
        
    catch (error)
    {
        console.error("Error generating and saving the CSRF token:", error);
    }
}

module.exports = csrfTokenHandler;