const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/config");
const Admin = require("../models/admin");

const authenticateAdminToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (!accessToken) {
        return res.status(403).send("you need user token to access this resource")
    }
    try {
        const validatedUser = jwt.verify(accessToken, JWT_SECRET);

        const admin = await Admin.findByPk(validatedUser.id)
        if (admin.disabled) {
            return res.status(403).send("your account is disabled")
        }
        req.admin = validatedUser;
        if (validatedUser) {
            return next();
        }
    } catch (err) {
        return res.status(401).json(err);
    }
};

module.exports = {authenticateAdminToken};
