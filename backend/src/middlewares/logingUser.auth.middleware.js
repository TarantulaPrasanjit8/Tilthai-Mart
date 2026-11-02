const {custUser} = require('../db/db');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize')


const userLogingMiddleware = async (req, res, next) =>{
    const {username, password} = req.body;

    // all fields are mandetory || field check
    if(!username || !password){
        return res.status(400).json({
            message: "invalid credentials! 1"
        })
    }

    try{
        // checking if user exists
        const isUserAvailable = await custUser.findOne({
            where: {
                [Op.or] : [
                    {email: username},
                    {phone_number: username}
                ]
            }
        })

        if(!isUserAvailable){
            return res.status(404).json({
                message: "invalid credetials! 2"
            })
        }
        // checking password
        const ispassword_correct = await bcrypt.compare(password, isUserAvailable.password_hash);
        if(!ispassword_correct){
            return res.status(403).json({
                message: "invalid credentials! 3"
            })
        }
        req.user = isUserAvailable.id;
        req.id = isUserAvailable.id;
        next()
        
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Internal server error!"
        })
    }

}

module.exports = userLogingMiddleware;