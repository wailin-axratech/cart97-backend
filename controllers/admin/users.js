const router = require("express").Router()
const {authenticateAdminToken} = require("../../util/adminAuthMiddleware");
const User = require("../../models/user");
const Favorite = require("../../models/favorite");
const Order = require("../../models/order");


// get all users
router.get("/", authenticateAdminToken, async (req, res) => {

    try {
        const users = await User.findAll({
            order: [['createdAt', 'DESC']]
        })
        return res.json(users)
    } catch (e) {
        return res.status(500).json(e)
    }
})

// get user by id
router.get("/:id", authenticateAdminToken, async (req, res) => {
    const userId = req.params.id

    try {
        const user = await User.findByPk(userId)
        return res.json(user)
    } catch (e) {
        return res.status(500).json(e)
    }
})

// update user by id
router.put("/:userId", authenticateAdminToken, async (req, res) => {
    const userId = req.params.userId

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


// get all user orders with user id
router.get("/:userId/orders", authenticateAdminToken, async (req, res) => {
    const userId = req.params.userId

    try {
        const userOrders = await Order.findAll({
            where: {userId}
        })
        return res.json(userOrders)
    } catch (e) {
        return res.status(500).json(e)
    }
})


// get all user favorites with user id
router.get("/:userId/favorites", authenticateAdminToken, async (req, res) => {
    const userId = req.params.userId

    try {
        const userFavorites = await Favorite.findAll({
            where: {userId}
        })
        return res.json(userFavorites)
    } catch (e) {
        return res.status(500).json(e)
    }
})


module.exports = router
