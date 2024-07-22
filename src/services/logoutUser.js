// Handling the logout logic here

const deleteCSRFSessionFromDB = require("../utils/deleteSessionCSRF.js"); 

async function logoutUser(req, res) {
    try
    {
        // Clear the tokens within the cookie that's given from the login and CSRF logic
        res.clearCookie('jwt', 'csrfToken', 'connect.sid');

        // Clear the cookies from the browser using the header when the user logs out
        res.setHeader('Clear-Site-Data', 'cookies');

        // Remove the CSRF Session token from the designated database by sessionID
        await deleteCSRFSessionFromDB(req, res);

        // We will also destroy the session data here if applicable
        await req.session.destroy((error) => {
            if(error)
            {
                console.error("There was an error when destroying the session:", error);

                return res.status(500)
                          .json({ message: "There was an error destroying the session" });
            }

            else
            {
                // console.log('Session destroyed!');

                return true;
            }
        });
    }

    catch (error)
    {
        console.error("There was an internal error running the logoutUser function!");

        return res.status(500)
                  .json({ message: "There was an internal error with the logout logic" });
    }
}

module.exports = logoutUser;