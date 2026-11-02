const {custUser} = require('../db/db');
const {Op} = require('sequelize');

// validating user to check is a user exists before DB hit a new record

/**
 * user validation middleware
 * Is User exists already
 */

const validatingUserExists = async (req, res, next) =>{
    // checking if any fields undefined or empty
    const {full_name, username, phone, password} = req.body;
    // console.log(req.body);
    // checking for undefined value
    if(!username || !phone || !full_name || !password){
        return res.status(400).json({
            message: "All fields are mendatory!"
        })
    }
    
    const userData = req.body;
    await custUser.sync()
    const isUserExists = await custUser.findOne({
            where: {
                [Op.or] : [
                    {email : userData.username},
                    {phone_number: userData.phone}
                ]
            }
        });
    if(isUserExists){
        return res.status(401).json({
            message: "You are already registered user"
        })
    }
    next()
}

module.exports = validatingUserExists;