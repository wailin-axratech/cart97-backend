const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/config");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (!accessToken) {
        return res.status(403).send("you need user token to access this resource")
    }
    try {
        const validatedUser = jwt.verify(accessToken, JWT_SECRET);

        //check if jwt user id and requested id are the same
        if (validatedUser.role !== "admin") {
            return res.status(403).send("you don't have access to perform this operation")
        }
        req.user = validatedUser;
        if (validatedUser) {
            return next();
        }
    } catch (err) {
        return res.status(401).json(err);
    }
};

module.exports = {authenticateToken};
