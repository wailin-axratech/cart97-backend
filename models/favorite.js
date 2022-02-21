const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const User = require("./user");

const Favorite = sequelize.define('favorite', {
    itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

Favorite.belongsTo(User)

module.exports = Favorite
