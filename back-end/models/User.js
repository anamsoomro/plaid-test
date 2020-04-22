const Sequelize = require('sequelize')
const {STRING} = Sequelize
// const { Sequelize, DataTypes } = require('sequelize');


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

// module.exports = User

db.sync() // this syncs db connection with db
