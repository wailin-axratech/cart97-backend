const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const User = require("./user");

const Favorite = sequelize.define('favorite', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

Favorite.belongsTo(User)

module.exports = Favorite
