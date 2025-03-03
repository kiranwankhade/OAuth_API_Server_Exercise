function verifyAccessToken (req,res,next) {
    console.log("Received Cookies:", req.cookies); // Debugging

    if (!req.cookies.access_token) {
        return res.status(403).json({ error: "Access Denied" });
    }

    next();
}

module.exports = {verifyAccessToken}