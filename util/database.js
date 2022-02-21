const Sequelize = require("sequelize")

// postgres
// const sequelize = new Sequelize('postgres://crdjlxbo:OMBMA35GyD6ukmLs73_u88edBVOR3tUz@john.db.elephantsql.com/crdjlxbo')

// mysql
const sequelize = new Sequelize(
    "thinzarphyu",
    "root",
    "wailinhtet",
    {
        host: "localhost",
        dialect: "mysql",
    })

module.exports = sequelize
