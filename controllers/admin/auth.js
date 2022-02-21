const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {where} = require("sequelize");
const Admin = require("../../models/admin");
const {authenticateAdminToken} = require("../../util/adminAuthMiddleware");
const {JWT_SECRET} = require("../../config/config");

// get admin profile
router.get("/account", authenticateAdminToken, async (req, res) => {

    try {
        const admin = await Admin.findByPk(req.admin.id)
        return res.json(admin)
    } catch (e) {
        return res.status(500).json(e)
    }
})


router.post("/signin", async (req, res) => {
    const {name, password} = req.body;

    try {
        const admin = await Admin.findOne({where: {name}});

        if (!admin) res.status(404).send("invalid name or password");
        else {
            const match = await bcrypt.compare(password, admin.password)
            if (!match) {
                return res.status(401).json("invalid name or password");
            }
            const token = jwt.sign({id: admin.id, role: admin.role}, JWT_SECRET, {expiresIn: '1d'});
            return res.json({token});
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})


// register admin
router.post("/signup", authenticateAdminToken, async (req, res) => {
    const {name, password, role} = req.body;

    try {

        const admin = await Admin.findOne({where: {name}})
        console.log(admin)
        if (admin) {
            return res.status(400).send(`${name} already exists`)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const createdAdmin = await Admin.create({
            name,
            password: hashedPassword,
            role
        })
        return res.status(201).json(createdAdmin)
    } catch (e) {
        return res.status(500).json(e)
    }
})

module.exports = router
