const router = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {JWT_SECRET} = require("../config/config");
const {authenticateUserToken} = require("../util/userAuthMiddleware");
const {where} = require("sequelize");
const OTP = require("../models/otp");
const Token = require("../models/token");

// get user profile
router.get("/account", authenticateUserToken, async (req, res) => {

    try {
        const user = await User.findByPk(req.user.id)
        return res.json(user)
    } catch (e) {
        return res.status(500).json(e)
    }
})

// change password
router.post("/update", authenticateUserToken, async (req, res) => {
    const {oldPassword, newPassword} = req.body

    try {
        const user = await User.findByPk(req.user.id)
        const match = await bcrypt.compare(oldPassword, user.password)
        if (!match) {
            return res.status(401).send("wrong old password");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        await User.update({password: hashedNewPassword}, {where: {id: user.id}})
        return res.sendStatus(200)
    } catch (e) {
        return res.status(500).json(e)
    }
})

// reset password
router.post("/recovery", async (req, res) => {
    const {phone, newPassword, token} = req.body

    console.log(phone, newPassword, token)

    try {
        const accessToken = await Token.findByPk(token)
        if (!accessToken){
            return res.status(500).send("token doesn't exist")
        }
        if (accessToken.used) {
            return res.status(400).send("token already used")
        }

        await Token.update({used: true}, {where: {id: accessToken.id}})
        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        await User.update({password: hashedNewPassword}, {where: {phone}})
        return res.sendStatus(200)
    } catch (e) {
        return res.status(500).json(e)
    }
})

router.post("/signin", async (req, res) => {
    const {phone, password} = req.body;
    try {
        const user = await User.findOne({where: {phone}});
        if (!user) res.status(404).send("invalid phone number or password");
        else {
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return res.status(401).json("invalid phone number or password");
            }
            const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '7d'});
            return res.send(token);
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})


// register user
router.post("/signup", async (req, res) => {
    const {name, phone, code, password, address} = req.body;

    try {

        const user = await User.findOne({where: {phone}})
        if (user) {
            return res.status(400).send("phone number already in used")
        }

        const otpCode = await OTP.findOne({where: {phone, code, verified: false}})
        if (otpCode) {
            await OTP.update({verified: true}, {where: {phone, code, verified: false}})
            const hashedPassword = await bcrypt.hash(password, 10)
            const createdUser = await User.create({
                name,
                phone,
                password: hashedPassword,
                address
            })
            return res.status(201).json(createdUser)
        } else {
            return res.status(400).send("invalid otp code")
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})

module.exports = router
