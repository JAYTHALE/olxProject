const router = require("express").Router()
const { userProtected } = require("../middleware/protected")
const userController = require("./../controllers/user.controller")
router

    .post("/Verify-user-email", userProtected, userController.verifyUserEmail)
    .post("/Verify-user-mobile", userProtected, userController.verifyUserMobile)

    .post("/Verify-user-email-otp", userProtected, userController.verifyEmailOTP)
    .post("/Verify-user-mobile-otp", userProtected, userController.verifyMobileOTP)

    .post("/add-post", userProtected, userController.addPost)
    .post("/det-location", userProtected, userController.getLocation)

module.exports = router