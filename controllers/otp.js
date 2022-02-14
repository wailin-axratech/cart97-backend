const router = require("express").Router()

// sent otp
const Order = require("../models/order");
const {verify} = require("jsonwebtoken");
router.post("/request", async (req, res) => {
    const {phone} = req.body;

    try {
        // sent otp
        const code = undefined
        return res.status(200).json({code})
    } catch (e) {
        return res.status(500).json(e)
    }
})

// verify otp
router.post("/verify", async (req, res) => {
    const {phone, code} = req.body;

    try {
        // verify code
        const verified = false
        if (verified) {
            return res.status(200).send("otp code verified")
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})

module.exports = router
