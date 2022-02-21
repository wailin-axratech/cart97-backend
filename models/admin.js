const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Admin = sequelize.define('admin', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false
    },
    disabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Admin
