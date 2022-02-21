const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const User = require("./user");

const Order = sequelize.define('order', {
    exchangeRate: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paymentScreenshot: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    receivedQuantity: {
        type: Sequelize.INTEGER,
    }
})

Order.belongsTo(User)

module.exports = Order
