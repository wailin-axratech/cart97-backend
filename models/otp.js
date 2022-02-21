const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const User = require("./user");
const {DataTypes} = require("sequelize");
const Token = require("./token");

const OTP = sequelize.define('otp', {
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
})

OTP.hasOne(Token)

module.exports = OTP
