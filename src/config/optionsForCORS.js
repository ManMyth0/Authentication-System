// Please update this file to suit your needs in CORS options

const corsOptions = 
{
    methods: [ 'GET', 'POST' ],

    // Cookie and Token usage
    credentials: true,

    allowedHeaders: ['Content-Type', 'Authorization'],

    // Pre-flight request time, 10 minute default (configured in seconds)
    maxAge: 600
}

module.exports = corsOptions;