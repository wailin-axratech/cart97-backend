const express = require("express")
const cors = require('cors')
const sequelize = require("./util/database")
const usersController = require("./controllers/users")
const ordersController = require("./controllers/orders")
const otpController = require("./controllers/otp")
const authController = require("./controllers/auth")
const cartController = require("./controllers/cart")
const productsController = require("./controllers/products")
const favoritesController = require("./controllers/favorites")

const adminAuthController = require("./controllers/admin/auth")
const adminUsersController = require("./controllers/admin/users")
const adminOrdersController = require("./controllers/admin/orders")


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/users", usersController)
app.use("/api/orders", ordersController)
app.use("/api/products", productsController)
app.use("/api/favorites", favoritesController)
app.use("/api/cart", cartController)
app.use("/api/auth", authController)
app.use("/api/otp", otpController)

// admin routes
app.use("/admin/api/auth", adminAuthController)
app.use("/admin/api/users", adminUsersController)
app.use("/admin/api/orders", adminOrdersController)

const port = process.env.PORT || 3000;

// set force true to recreate all tables

sequelize
    .sync({force: false})
    .then(result => {
        console.log(result)
        app.listen(port)
    })
    .catch(err => {
        console.log(err)
    })
