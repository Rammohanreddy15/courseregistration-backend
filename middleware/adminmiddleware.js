const {admin} =require("../db")
const jwt=require("jsonwebtoken");
const {jwtsecret}=require("../config")
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, jwtsecret);
        if (decoded.username) {
            next();
        } else {
            res.status(403).json({ msg: "You are not authenticated" });
        }
    } catch (error) {
        res.status(403).json({ msg: "Token verification failed" });
    }
}

module.exports = adminMiddleware;