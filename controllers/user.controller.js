const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const sendEmail = require("../utils/email")
const { sendSms } = require("../utils/sms")
const { checkEmpty } = require("../utils/CheckEmpty")
const Posts = require("../models/Posts")


exports.verifyUserEmail = asyncHandler(async (req, res) => {
    console.log(req.loggedInUser)
    const result = await User.findById(req.loggedInUser)
    if (!result) {
        return res.status(401).json({ message: " You Are Not Logged In. Please" })
    }
    console.log(result)
    const otp = Math.floor(10000 + Math.random() * 900000)
    await User.findByIdAndUpdate(req.loggedInUser, { emailCode: otp })
    await sendEmail({ to: result.email, subject: "verify Email", message: `<h1>your Login OTP${otp}</h1>` })
    res.json({ message: "Verification send Success" })
})

exports.verifyEmailOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body
    const result = await User.findById(req.loggedInUser)
    if (!result) {
        return res.status(401).json({ message: " You Are Not Logged In. Please" })
    }
    if (otp != result.emailCode) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    const emailupdate = await User.findByIdAndUpdate(req.loggedInUser, { emailVerified: true }, { new: true })
    res.json({
        message: "Email Verify Success", result: {
            _id: emailupdate._id,
            name: emailupdate.name,
            email: emailupdate.email,
            mobile: emailupdate.mobile,
            avatar: emailupdate.avatar,
            emailVerified: emailupdate.emailVerified,
            mobileVerified: emailupdate.mobileVerified,
        }
    })
})

exports.verifyUserMobile = asyncHandler(async (req, res) => {
    const result = await User.findById(req.loggedInUser)
    const otp = Math.floor(10000 + Math.random() * 900000)
    await User.findByIdAndUpdate(req.loggedInUser, { mobileCode: otp })
    await sendSms({
        message: `Welcome to SKILLHUB .Your OTP Is ${otp}`,
        number: `${result.mobile}`
    })
    res.json({ message: "Verification send Success" })
})

exports.verifyMobileOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body
    const result = await User.findById(req.loggedInUser)
    if (!result) {
        return res.status(401).json({ message: " You Are Not Logged In. Please" })
    }
    if (otp !== result.mobileCode) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    const updateUser = await User.findByIdAndUpdate(req.loggedInUser, { mobileVerified: true }, { new: true })
    res.json({
        message: "Email Verify Success", result: {
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            mobile: updateUser.mobile,
            avatar: updateUser.avatar,
            emailVerified: updateUser.emailVerified,
            mobileVerified: updateUser.mobileVerified,
        }
    })
})

exports.addPost = asyncHandler(async (req, res) => {
    const { title, desc, price, images, location, category } = req.body
    const { error, isError } = checkEmpty({ title, desc, price, images, location, category })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    await Posts.create({ title, desc, price, images, location, category, user: req.loggedInUser })
    res.json({ message: "Post create Success" })
})