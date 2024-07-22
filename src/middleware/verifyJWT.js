// JSON Web Token and CSRF Session Token Middleware

require('dotenv').config();

const jsonToken = require('jsonwebtoken');

async function verifyJWT(req, res) {
  try
  {
    // Grab the current tokens from the client
    const jwt = req.signedCookies.jwt

    // If no token is present in the cookie, redirect the client to the login page
    if (!jwt) 
    {
      console.log("No JWT present!");
  
      return res.status(403)
                .redirect( "/loginSignupPage.html" );
    }
    
    // Verify the JWT with matching algorithm and secret key
    jsonToken.verify(jwt, process.env.ACCESS_TOKEN_SECRET_KEY, { algorithm: 'HS256' }, (err, decoded) => {
      
      // If there is an error with the token authentication, redirect the client to the login page 
      if (err) 
      {
        console.log("Token Authentication Error", err);
    
        return res.status(403)
                  .redirect( "/loginSignupPage.html" );
      }
  
      // Attaching the decoded token data to the req object for usage
      req.user = decoded;
    });
  }

  catch (error)
  {
    return res.status(500)
              .json({ message: "There was an internal error with the Token verification process!" });
  }
}

module.exports = verifyJWT;