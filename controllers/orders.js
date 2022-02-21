const router = require("express").Router()
const Order = require("../models/order")
const User = require("../models/user");
const {authenticateUserToken} = require("../util/userAuthMiddleware");

//get all user orders
router.get("/", authenticateUserToken, async (req, res) => {
    const userId = req.user.id

    try {
        const userOrders = await Order.findAll({
            where: {userId}
        })
        return res.json(userOrders)
    } catch (e) {
        return res.status(500).json(e)
    }
})


//TODO
//incldue user wherere user id
// get order by id
router.get("/:id", authenticateUserToken, async (req, res) => {
    const userId = req.user.id
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

// create user orders
router.post("/", authenticateUserToken, async (req, res) => {
    const userId = req.user.id
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

//TODO
//incldue user wherere user id
// update order by id
router.put("/:id", async (req, res) => {
    const userId = req.user.id
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
