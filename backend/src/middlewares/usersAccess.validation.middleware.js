const jwt = require('jsonwebtoken');

const verifyLoginToken = async (req, res, next) =>{
    const user_login_token = req.cookies.token;
    if(!user_login_token){
        return res.status(401).json({
            message: "access denied! token missing"
        })
    }

    try{
        const verified_token = jwt.verify(user_login_token, process.env.JWT_SECRET_KEY);
        if(!verified_token){
            return res.status(401).json({
                message: 'Unauthorised user!'
            })
        }
        req.user = verified_token.user_id;
        req.id = verified_token.user_id;
        
        next();
    }catch(err){
        console.log(err)
        return res.status(403).json({ message: "Invalid or expired token" });
    }

}

module.exports = verifyLoginToken