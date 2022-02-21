const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const User = require("./user");
const Cart = require("./cart");

const CartItem = sequelize.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    itemId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    weight: {
        type: Sequelize.STRING,
        allowNull: true
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true
    },
    size: {
        type: Sequelize.STRING,
        allowNull: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

CartItem.belongsTo(User)


module.exports = CartItem
