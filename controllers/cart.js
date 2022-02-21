const router = require("express").Router()
const User = require("../models/user")
const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/cartItem");
const {authenticateUserToken} = require("../util/userAuthMiddleware");


// get all carts
router.get("", async (req, res) => {

    try {
        const orders = await Cart.findAll({
            order: [['createdAt', 'DESC']],
            include: User
        })
        return res.json(orders)
    } catch (e) {
        return res.status(500).json(e)
    }

})

// get order by id
router.get("/:id", async (req, res) => {
    const orderId = req.params.id

    try {
        const order = await Order.findByPk(orderId, {
            include: User
        })
        return res.json(order)
    } catch (e) {
        return res.status(500).json(e)
    }
})


// update order by id
router.put("/:id", async (req, res) => {
    const orderId = req.params.id
    const {status, receivedQuantity} = req.body;

    try {
        const updatedOrder = await Order.update({
            status,
            receivedQuantity
        }, {where: {id: orderId}})
        return res.json(updatedOrder)
    } catch (e) {
        return res.status(500).json(e)
    }
})

module.exports = router
