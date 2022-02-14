const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/config");

const authenticateToken = (req, res, next) => {
    const accessToken = req.header("authorization");
    if (!accessToken) {
        return res.sendStatus(403)
    }
    try {
        const validated = jwt.verify(accessToken, JWT_SECRET);
        req.user = validated;
        if (validated) {
            return next();
        }
    } catch (err) {
        return res.status(401).json(err);
    }
};

module.exports = { authenticateToken };
