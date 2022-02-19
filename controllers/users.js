const router = require("express").Router()
const User = require("../models/user")
const Order = require("../models/order");
const Favorite = require("../models/favorite");
const {authenticateUserToken} = require("../util/userAuthMiddleware");


// get all users
router.get("/", async (req, res) => {

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
router.get("/:id", async (req, res) => {
    const userId = req.params.id

    try {
        const user = await User.findByPk(userId)
        return res.json(user)
    } catch (e) {
        return res.status(500).json(e)
    }
})

// update user by id
router.put("/:userId", authenticateUserToken, async (req, res) => {
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


/*  user orders    */

// get all user orders with user id
router.get("/:userId/orders", authenticateUserToken, async (req, res) => {
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

// create user orders with user id
router.post("/:userId/orders", authenticateUserToken, async (req, res) => {
    const userId = req.params.userId
    const {userName, userPhone, userAddress, paymentScreenshot, totalPrice} = req.body;

    try {
        const createdOrder = await Order.create({
            userName, userPhone, userAddress,
            paymentScreenshot,
            totalPrice,
            userId
        })
        return res.status(201).json(createdOrder)
    } catch (e) {
        return res.status(500).json(e)
    }
})
/*  user orders  s*/


/*  user favorites    */

// get all user favorites with user id
router.get("/:userId/favorites", authenticateUserToken, async (req, res) => {
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

// create user favorite with user id
router.post("/:userId/favorites", authenticateUserToken, async (req, res) => {
    const userId = req.params.userId
    console.log(userId)

    try {
        const createdFavorite = await Favorite.create({
            ...req.body,
            userId
        })
        return res.status(201).json(createdFavorite)
    } catch (e) {
        return res.status(500).json(e)
    }
})

// delete user favorite with user id
router.delete("/:userId/favorites/:favoriteId", authenticateUserToken, async (req, res) => {

    const userId = req.params.userId
    const favoriteId = req.params.favoriteId

    try {
        await Favorite.destroy({where: {id: favoriteId, userId}})
        return res.sendStatus(200)
    } catch (e) {
        return res.status(500).json(e)
    }
})
/*  user favorites    */


module.exports = router
