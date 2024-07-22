// This file will handle the authentication and login of the client which will include a redirect to the static homePage.html file

const creationOfClientsTokens = require("../utils/creationOfClientsTokens.js");
const authenticateUser = require("../authControllers/authenticateUser.js");

async function loginUser(username, password, req, res) {
    try 
    {
        // Authenticate the user
        const authenticationResult = await authenticateUser(username, password);

        // If the authentication is successful, begin the login process:
        if (authenticationResult.success) 
        {
            // Create tokens for the user
            const resultOfLoginUser = await creationOfClientsTokens(username, req, res);

            // If the login is successful, return success as true and redirect the user to the homepage
            if (resultOfLoginUser) 
            {
                return res.status(200)
                          .json({ success: true, redirectUrl: "/homePage.html" });
            }
            
            // If the login fails, then return success as false and a message
            else 
            {
                return res.status(401)
                          .json({ success: false, message: "The redirect failed!" });
            }
        } 
        
        // If the authentication fails, return success as false and the authentication's failure message
        else 
        {
            return res.status(401)
                      .json({ success: false, message: authenticationResult.message });
        }
    } 
    
    catch (error) 
    {
        console.error("There was an error with the login route:", error);

        return res.status(500)
                  .json({ success: false, message: "There was an error with executing the login!" });
    }
}

module.exports = loginUser;