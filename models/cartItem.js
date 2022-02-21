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
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
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
    specifications: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.TEXT,
        allowNull: false
    },
})

CartItem.belongsTo(User)


module.exports = CartItem
