const router = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {JWT_SECRET} = require("../config/config");
const Order = require("../models/order");
const Favorite = require("../models/favorite");

router.post("/signin", async (req, res) => {
    const {phone, password} = req.body;
    try {
        const user = await User.findOne({where: {phone}});
        if (!user) res.status(404).send("invalid phone or password");
        else {
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return res.status(401).json("invalid phone or password");
            }
            const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '7d'});
            return res.json(token);
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})


// register user
router.post("/signup", async (req, res) => {
    const {name, phone, password, address} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const createdUser = await User.create({
            name,
            phone,
            password: hashedPassword,
            address
        })
        return res.status(201).json(createdUser)
    } catch (e) {
        return res.status(500).json(e)
    }
})

module.exports = router
