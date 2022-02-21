const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const User = require("./user");
const {DataTypes} = require("sequelize");
const OTP = require("./otp");

const Token = sequelize.define('token', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
})

module.exports = Token
