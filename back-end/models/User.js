const Sequelize = require('sequelize')
const {STRING} = Sequelize


const db = new Sequelize({
    dialect: "sqlite", //databse
    storage: "./database.sqlite" //file name
    // , {logging: true} // if you want see your sql queries in the console
})

const User = db.define("users", {
    username: {
        type: STRING
    },
    password: {
        type: STRING
    },
    email: {
        type: STRING
    }
})

module.exports = {
  User,
  db
}

// has init has async await 
// https://medium.com/@zhhjoseph/getting-started-with-sequelize-dd6045f366e6
db.sync()
// db.sync({ force: false})
