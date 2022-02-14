const router = require("express").Router()
const Order = require("../models/order")
const User = require("../models/user");
const Favorite = require("../models/favorite");


// create favorite
router.post("/", async (req, res) => {

    try {
        const createdFavorite = await Favorite.create(req.body)
        return res.status(201).json(createdFavorite)
    } catch (e) {
        return res.status(500).json(e)
    }
})

// get order by id
router.get("/:id", async (req, res) => {
    const favoriteId = req.params.id

    try {
        const favorite = await Favorite.findByPk(favoriteId)
        return res.json(favorite)
    } catch (e) {
        return res.status(500).json(e)
    }
})

// delete order by id
router.delete("/:id", async (req, res) => {
    const favoriteId = req.params.id

    try {
        await Favorite.destroy({where: {id: favoriteId}})
        return res.sendStatus(200)
    } catch (e) {
        return res.status(500).json(e)
    }
})

module.exports = router
