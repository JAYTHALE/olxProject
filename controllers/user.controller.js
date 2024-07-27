const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const sendEmail = require("../utils/email")


exports.verifyUserEmail = asyncHandler(async (req, res) => {
    console.log(req.loggedInUser);
    const result = await User.findById(req.loggedInUser)
    console.log(result)
    const otp = Math.floor(10000 + Math.random() * 900000)
    await User.findByIdAndUpdate(req.loggedInUser, { emailCode: otp })
    await sendEmail({ to: result.email, subject: "verify Email", message: `<h1>your Login OTP${otp}</h1>` })

    res.json({ message: "Verification send Success" })
})