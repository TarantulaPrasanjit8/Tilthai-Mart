const jwt = require('jsonwebtoken');

const authProtectionCheck = (req, res)=>{
    // const user_token = req.cookies.token;
    try{
        if(!req.user){
            return res.status(401).json({
                message: "Unauthorised user! Please Login Again."
            })
        }
        res.status(200).json({
            message: "ok",
            user: true
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: err
        })
    }
}

// admin auth check
const authAdminProtectionCheck = (req, res) =>{
    try{
        if(!req.admin_user){
            return res.status(401).json({
                message: "Unauthorised user! Please Login Again."
            })
        }
        res.status(200).json({
            user: req.admin_user
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: err
        })
    }
}


module.exports = {authProtectionCheck, authAdminProtectionCheck}