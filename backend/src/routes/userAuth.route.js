const express = require("express");

const router = express.Router();

// Importing middlewares
const validatingUserExists = require('../middlewares/usersExists.auth.middleware');
const userLogingMiddleware = require('../middlewares/logingUser.auth.middleware');

//Importing auth login controller
const authAdminUserRoutes = require("../controllers/userAuth.controller");
const authRegUsersRoutes = require("../controllers/usersAuth.controller");
const verifyLoginToken = require("../middlewares/usersAccess.validation.middleware");
const { authProtectionCheck, authAdminProtectionCheck } = require("../controllers/authProtectedPath.controller");
const verifyAdminLoginToken = require("../middlewares/adminUserAccess.validation.middleware");


/**
 * all user authentication router
 * 1. Login router
 */

router.get("/authCheck", verifyAdminLoginToken, authAdminProtectionCheck)
router.post("/login", authAdminUserRoutes.authLoginController);
router.post("/logout", authAdminUserRoutes.authAdminUserLogoutController);

/**
 * users modules Routers
 * 1. Register Router
 * 2. Login Router
 * 3. Logout Router
 */
router.get("/user/protected", verifyLoginToken, authProtectionCheck)
router.post("/user/register",validatingUserExists, authRegUsersRoutes.authUserRegController);
router.post("/user/login", userLogingMiddleware, authRegUsersRoutes.authUserLoginController);
router.post("/user/logout", authRegUsersRoutes.authUserLogoutController);
module.exports = router;