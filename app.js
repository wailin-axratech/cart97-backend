const express = require("express")
const cors = require('cors')
const sequelize = require("./util/database")
const usersController = require("./controllers/users")
const ordersController = require("./controllers/orders")
const otpController = require("./controllers/otp")
const authController = require("./controllers/auth")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", usersController)
app.use("/orders", ordersController)
app.use("/auth", authController)
app.use("/otp", otpController)

const port = process.env.PORT || 3000;

// set force true if any model changes
// set force true to recreate all tables
sequelize
    .sync({force: true})
    .then(result => {
        console.log(result)
        app.listen(port)
    })
    .catch(err => {
        console.log(err)
    })
