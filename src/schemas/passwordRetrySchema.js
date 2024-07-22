// This is a schema for the database outlining of the password retry system. This will intake the username from the req.body, number of attempts and lockout time frame
// to be stored in the designated database and then removed upon successful login
const mongoose = require('mongoose');

const passwordRetrySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    attempts: {
        type: Number,
        required: true,
        default: 0,
    },
    lockUntil: {
        type: Date,
    }
});

const PasswordRetry = mongoose.model('PasswordRetry', passwordRetrySchema);

module.exports = PasswordRetry;