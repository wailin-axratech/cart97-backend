const router = require("express").Router()
const User = require("../models/user")
const Order = require("../models/order");
const Favorite = require("../models/favorite");
const {authenticateUserToken} = require("../util/userAuthMiddleware");


// update user by id
router.put("/:id", authenticateUserToken, async (req, res) => {
    const userId = req.params.id

    const {name, address} = req.body

    try {
        const updatedUser = await User.update({
            name,
            address
        }, {where: {id: userId}})
        return res.json(updatedUser)
    } catch (e) {
        return res.status(500).json(e)
    }
})



module.exports = router
