const router = require("express").Router()
const userController = require("./../controllers/user.controller")
router
    .post("/Verify-user-email", userController, userController.verifyUserEmail)
module.exports = router