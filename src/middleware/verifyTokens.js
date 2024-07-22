// This will contain the combined verification functions of the JWT and CSRF to make the middleware insertion more direct

const verifyJWT = require("../middleware/verifyJWT.js");
const verifyCSRF = require("../middleware/verifyCSRF.js"); 

async function verifyTokens(req, res, next) {
    try
    {
        // Run the JWT Verification first. Redirects to the login upon failure and stop the further execution of headers if already sent
        await verifyJWT(req, res);
        if (res.headersSent) return;

        // Run the CSRF Verification second. Redirects to the login upon failure and stop the further execution of headers if already sent
        await verifyCSRF(req, res);
        if (res.headersSent) return;

        next();
    }

    catch (error)
    {
        return res.status(500)
                  .json({ message: "There was an internal error running the Token's Verification Process!" });
    }
}

module.exports = verifyTokens;