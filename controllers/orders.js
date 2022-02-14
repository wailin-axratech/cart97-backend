const router = require("express").Router()
const Order = require("../models/order")
const User = require("../models/user");


// create order
router.post("/", async (req, res) => {
    const {userName, userPhone, userAddress, paymentScreenshot, totalPrice} = req.body;

    try {
        const createdOrder = await Order.create({
            userName, userPhone, userAddress,
            paymentScreenshot,
            totalPrice
        })
        return res.status(201).json(createdOrder)
    } catch (e) {
        return res.status(500).json(e)
    }
})


// get all orders
router.get("", async (req, res) => {

    try {
        const orders = await Order.findAll({
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
