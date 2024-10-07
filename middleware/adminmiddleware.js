const {admin} =require("../db")
const jwt=require("jsonwebtoken");
const {jwtsecret}=require("../config")
function adminmiddleware(req,res,next){
    const token2=req.headers.authorization;
    const words=token2.split(" ");
    const jwttoken=words[1];
    const decoded=jwt.verify(jwttoken,jwtsecret);
    if(decoded.username){
        next();
    }
    else{
        res.status(403).json({
            msg:"you are not authenticated"
        })
    }
}
module.exports = adminmiddleware;