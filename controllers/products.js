const router = require("express").Router()
const User = require("../models/user")
const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/cartItem");
const {authenticateUserToken} = require("../util/userAuthMiddleware");
const shopeeApiMiddleWare = require("../util/shopeeApiMiddleWare");


// get all carts
router.get("", async (req, res) => {
    const productLink = req.query.link

    try {
        const response = await shopeeApiMiddleWare(productLink)
        console.log(response)

        return res.json(response)
    } catch (e) {
        return res.status(500).json(e)
    }

})


module.exports = router
