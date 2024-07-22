// File for handling the database connection to MongoDB

require('dotenv').config();

const mongoose = require('mongoose');

async function connectToMongoDB() {
    try 
    {
        const URI = process.env.URI; // Remember to change this to your mongodb atlas string
        
        await mongoose.connect( URI, {
            dbName: 'Your_Cluster_Name_Here' // Defining the cluster name here to help avoid a test and sub collection from being created
        });
    } 
    
    catch (error) 
    {
        console.error("Failed to connect to MongoDB:", error);
    }
}

module.exports = { connectToMongoDB };