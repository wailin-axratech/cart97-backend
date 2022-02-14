const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const User = require("./user");

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
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
        type: Sequelize.INTEGER.UNSIGNED,
    }
})

Order.belongsTo(User)

module.exports = Order
