const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminuser = require('../models/adminuser.model');
const {Op} = require('sequelize');

const authLoginController = async (req, res) => {
    const {username, password} = req.body;
    console.log('username:', username);
    try {
        // find all users 
        if(!username || !password){
            return res.status(400).json({
                message: "Fields username and password are required"
            })
        }
        const user = await adminuser.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { password: password }
                ]
            }
        });
        if(!user){
            return res.status(404).json({
                message: "No accounts found"
            })
        }
        console.log('user:', JSON.stringify(user, null, 2));
        const adminUserToken = jwt.sign({username, password}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
        res.cookie('adminToken', adminUserToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message: 'Login Successful',
        })
    }catch(err){
        console.error('Error fetching users from the database:', err);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const authAdminUserLogoutController = async (req, res) => {
    try {
        if(!req.cookies.adminToken){
            res.status(400).json({
                message: 'No admin user is currently logged in'
            });
        }
        
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        res.status(200).json({
            message: 'Admin user logged out successfully'
        });
    } catch (err) {
        console.error('Error logging out admin user:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

module.exports = {authLoginController, authAdminUserLogoutController};
