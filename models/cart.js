const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const User = require("./user");
const Product = require("./product");

const Cart = sequelize.define('cart', {
    totalQuantity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
})

Cart.hasMany(Product)
Cart.belongsTo(User)

module.exports = Cart
