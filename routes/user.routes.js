const router = require("express").Router()
const { userProtected } = require("../middleware/protected")
const userController = require("./../controllers/user.controller")
router

    .post("/Verify-user-email", userProtected, userController.verifyUserEmail)
    .post("/Verify-user-email-otp", userProtected, userController.verifyEmailOTP)
    .post("/Verify-user-mobile-otp", userProtected, userController.verifyMobileOTP)

module.exports = router