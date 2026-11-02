const jwt = require('jsonwebtoken');

const verifyAdminLoginToken = async (req, res, next) =>{
    const admin_login_token = req.cookies.adminToken;
    if(!admin_login_token){
        return res.status(401).json({
            message: "access denied! 1"
        })
    }

    try{
        const verified_token = jwt.verify(admin_login_token, process.env.JWT_SECRET_KEY);
        if(!verified_token){
            return res.status(401).json({
                message: 'Access Denied!'
            })
        }
        req.admin_user = verified_token.username;
        next();
    }catch(err){
        return res.status(403).json({ message: "Invalid or expired token" });
    }

}

module.exports = verifyAdminLoginToken;