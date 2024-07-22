const crypto = require('crypto');

// Secret Key Generator function using the crypto library for creating a secret key. Remember to place / update the _KEYs in the .env file if using this to generate new keys
async function secretKeyGenerator()
{
    // Create the secret keys:
    try
    {
        // Access Token Key
        const accessTokenKey = crypto.randomBytes(32).toString('hex');
    
        // Refresh Token Secret Key
        const refreshTokenKey = crypto.randomBytes(32).toString('hex');
    
        // Cookie Secret Key
        const cookieKey = crypto.randomBytes(32).toString('hex');
    
        // CSRF Protection Secret Key
        const csrfToken = crypto.randomBytes(32).toString('hex');
    
        // Session Secret Key
        const sessionKey = crypto.randomBytes(32).toString('hex');
    
        // Tabled the keys for easier viewing
        // console.table({accessTokenKey , refreshTokenKey, cookieKey, csrfToken, sessionKey });
    
        // Returning the csrfToken here so that it's randomly generated for production use
        return csrfToken 
    }

    catch (error)
    {
        console.error("Couldn't generate the Secret Keys!");
    }
}

// secretKeyGenerator();

module.exports = secretKeyGenerator;