const router = require("express").Router()
const OTP = require("../models/otp");
const axios = require("axios");
const User = require("../models/user");

const smsApiKey = "Ol3cLVDnPakt_jMUj7DwL3hqNcBwOxd_jRHYifkETfo5xwJbJtIFN4z7c0gU-Jwn"

// sent otp
router.post("/request", async (req, res) => {
    const {phone} = req.body;

    try {
        const user = await User.findOne({where: {phone}})
        if (user) {
            return res.status(400).send("phone number already in used")
        }
        if (phone) {
            //generate random 6 digit code
            const randomCode = Math.floor(100000 + Math.random() * 900000)
            const createdCode = await OTP.create({
                phone,
                code: randomCode
            })
            const body = {
                to: phone,
                message: `${createdCode.code} is your one time password(OTP) for Cart97 registration`,
                sender: "Cart97",
                test: true
            }
            await axios.post("https://smspoh.com/api/v2/send ", body, {
                headers: {
                    'Authorization': `Bearer ${smsApiKey}`
                }
            })
            return res.json(createdCode)
        } else {
            return res.status(400).send("phone number missing")
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})

// verify otp
// router.post("/verify", async (req, res) => {
//     const {phone, code} = req.body;
//
//     try {
//         const otpCode = await OTP.findOne({
//             where: {phone, code, verified: false}
//         })
//         if (otpCode) {
//             await OTP.update({
//                     verified: true
//                 }, {where: {phone, code, verified: false}}
//             )
//             return res.send("otp code verified")
//         } else {
//             return res.status(400).send("invalid otp code")
//         }
//     } catch (e) {
//         return res.status(500).json(e)
//     }
// })

module.exports = router
