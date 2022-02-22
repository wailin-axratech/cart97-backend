const Order = require("../../models/order");
const User = require("../../models/user");
const {authenticateAdminToken} = require("../../util/adminAuthMiddleware");
const router = require("express").Router()

// get all orders
router.get("", authenticateAdminToken, async (req, res) => {

    try {
        const orders = await Order.findAll()
        return res.json(orders)
    } catch (e) {
        return res.status(500).json(e)
    }

})

// get order by id
router.get("/:id", authenticateAdminToken, async (req, res) => {
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
router.put("/:id", authenticateAdminToken, async (req, res) => {
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
