const Sequelize = require("sequelize")

// postgres
// const sequelize = new Sequelize('postgres://mbiscidf:TQOOPNU-0ZE0GM6X4rufw43Y-iIXMhFC@john.db.elephantsql.com/mbiscidf')


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
