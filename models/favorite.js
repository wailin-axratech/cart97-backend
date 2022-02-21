const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const User = require("./user");

const Favorite = sequelize.define('favorite', {
    itemId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.TEXT,
        allowNull: false
    },
})

Favorite.belongsTo(User)

module.exports = Favorite
