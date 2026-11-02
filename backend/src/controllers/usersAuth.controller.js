const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {custUser} = require('../db/db');

/**
 * User Registration Controller using user params
 * New user Registration
 */
const authUserRegController = async (req, res) =>{

    const {full_name, username, phone, password} = req.body;

    try{
    // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

    // inserting the user details in the user table
        
        // creating new user
        const newUser = await custUser.create({
            full_name: full_name,
            email: username,
            phone_number: phone,
            password_hash: hashedPassword
        });
        // only for development
        console.log('User Registration Successful')
        // console.log('new user details', newUser.toJSON())

        // sending repli
        return res.status(200).json({
            message : "User Registrtion Successful",
            data : newUser.id
        })
    }catch(err){

        // error logging only for development periods
        // console.log(err)
        res.status(500).json({
            message: 'Internal server error!'
        })
    }
}




/**
 * User Loging
 */
const authUserLoginController = async (req, res) =>{
    const {username, password} = req.body;
    const user_id = req.id;
    try{
     // token generation
        const token = jwt.sign({user_id, username, password}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'} );
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000
        })
        res.status(200).json({
            message: "login Successfull",
            user: true
        })
    }catch(err){
        res.status(500).json({
            message: "internal server error!"
        })
    }

}


/**
 * user logout
 */

const authUserLogoutController = async (req, res) =>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })
        res.status(200).json({
            message: "Logout Successfully"
        })
    }catch(err){
        return res.status(500).json({
            message: "internal server error! from logout controller"
        })
    }
}
module.exports = {authUserRegController, authUserLoginController, authUserLogoutController};
