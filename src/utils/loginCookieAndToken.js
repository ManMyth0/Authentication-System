// Handle logic for cookies and jwt here:

require("dotenv").config();

const jsonToken = require('jsonwebtoken');

async function handleJwtAuthTokenAndCookie(username, res)
{
    try
    {
        // Generate Json Web Token and use the default algorithm. Refer to the npm jsonwebtoken library documentation for a list of usable algorithms
        const token = jsonToken.sign({ id: username }, process.env.ACCESS_TOKEN_SECRET_KEY, { algorithm: 'HS256' });

        // If no token, pass a failed message to the console
        if(!token)
        {
           console.error("JWT generation failed!");
           
           return false;
        }
        
        else 
        {
             // If the token is successfully generated, return a true statement so the login can proceed
             res.cookie("jwt", token, 
             {
                 httpOnly: true, // Only accessible through web server
                 secure: true,   // Only HTTPS usage. Feel free to change this to (process.env.NODE_ENV === 'environment_here') adjusted depending on 'production' / 'development' environment
                 samSite: "lax", // Medium setting, allowing for third party login usage (FB, Google etc..)
                 signed: true,
             });
         
             return true;
        }
    }

    catch (error)
    {
        console.error("Couldn't authenticate the JWT!");

        return false
    }
}

module.exports = handleJwtAuthTokenAndCookie;