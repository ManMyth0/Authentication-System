// This will be the middleware file that helps manage the cache to prevent inappropriate usage of possibly stored browser data

async function cacheController(req, res, next) 
{
    // Set Cache-Control header to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    // Set Pragma header to prevent caching in HTTP/1.0 proxies
    res.setHeader('Pragma', 'no-cache');

    // Set Expires header to a past date to prevent caching
    res.setHeader('Expires', '0');

    next();
}

module.exports = cacheController;