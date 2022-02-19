const express = require("express")
const cors = require('cors')
const sequelize = require("./util/database")
const usersController = require("./controllers/users")
const ordersController = require("./controllers/orders")
const otpController = require("./controllers/otp")
const authController = require("./controllers/auth")
const cartController = require("./controllers/cart")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/users", usersController)
app.use("/api/orders", ordersController)
app.use("/api/cart", cartController)
app.use("/api/auth", authController)
app.use("/api/otp", otpController)

const port = process.env.PORT || 3000;

// set force true to recreate all tables if model updated
sequelize
    .sync({force: true})
    .then(result => {
        console.log(result)
        app.listen(port)
    })
    .catch(err => {
        console.log(err)
    })
