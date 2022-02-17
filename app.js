const express = require("express")
const cors = require('cors')
const sequelize = require("./util/database")
const usersController = require("./controllers/users")
const ordersController = require("./controllers/orders")
const favoritesController = require("./controllers/favorites")
const otpController = require("./controllers/otp")
const authController = require("./controllers/auth")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", usersController)
app.use("/orders", ordersController)
app.use("/favorites", favoritesController)
app.use("/auth", authController)
app.use("/otp", otpController)

const port = process.env.PORT || 3000;

// set force true to recreate all tables
sequelize
    .sync({ force: false})
    .then(result => {
        console.log(result)
        app.listen(port)
    })
    .catch(err => {
        console.log(err)
    })
