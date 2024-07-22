// A simple schema model for the organization of CSRF Token creation

const mongoose = require("mongoose");

const csrfTokenModel = new mongoose.Schema({

    // Each cookie will be given a CSRF Token that contains a this layout: session ID and an expiration and the token itself. The CSRF Token will be stored in a collection (csrftokens) 
    // in the designated database for safe keeping and used to compare with the client's current session per route call via middleware and cleaned from the database by a function 
    // when expired
    sessionID:
    {
        type: String,
        required: true,
        unique: true,   
    },

    csrfToken:
    {
        type: String,
        required: true,
        unique: true
    },

    expiresAt: 
    {
        type: Date,
        required: true
    }
});

const CsrfSessionToken = mongoose.model('CsrfToken', csrfTokenModel);

module.exports = CsrfSessionToken;