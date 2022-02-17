const router = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {JWT_SECRET} = require("../config/config");
const Order = require("../models/order");
const Favorite = require("../models/favorite");

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
router.put("/:id", async (req, res) => {
    const userId = req.params.id

    try {
        const updatedUser = await User.update(req.body, {where: {id: userId}})
        return res.json(updatedUser)
    } catch (e) {
        return res.status(500).json(e)
    }
})


// get all user orders by user id
router.get("/:id/orders", async (req, res) => {
    const userId = req.params.id

    try {
        const userOrders = await Order.findAll({
            where: {userId}
        })
        return res.json(userOrders)
    } catch (e) {
        return res.status(500).json(e)
    }
})

// get all user favorites by user id
router.get("/:id/favorites", async (req, res) => {
    const userId = req.params.id

    try {
        const userFavorites = await Favorite.findAll({
            where: {userId}
        })
        return res.json(userFavorites)
    } catch (e) {
        return res.status(500).json(e)
    }
})


// delete user by id
// router.delete("/:id",  async (req, res) => {
//     const userId = req.params.id
//
//     try {
//         await User.destroy({where: {id: userId}})
//         return res.sendStatus(200)
//     }
//     catch (e) {
//         return res.status(500).json(e)
//     }
// })

module.exports = router
