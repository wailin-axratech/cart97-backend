const router = require("express").Router()
const User = require("../models/user")
const Order = require("../models/order");
const Favorite = require("../models/favorite");
const {authenticateUserToken} = require("../util/userAuthMiddleware");


// get all user favorites with user id
router.get("/", authenticateUserToken, async (req, res) => {
    const userId = req.user.id

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
router.post("/", authenticateUserToken, async (req, res) => {
    const userId = req.user.id

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

// delete user favorite
router.delete("/:id", authenticateUserToken, async (req, res) => {

    const userId = req.user.id
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
