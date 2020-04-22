const bcrypt = require("bcrypt")
const pry = require('pryjs')
const jwt = require("jsonwebtoken")
const User = require("../models/User").User
// const { User } = require("./models/User")


const users = []

const signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 salt rounds
    const user = { username: req.body.username, password: hashedPassword, email: req.body.email }
    // users.push(user)
    let newUser = await User.create(user)
    // 500 internal server error. 
    // User.create is not a function. so maybe issue with my sequelize
    // no, it was with destructurinig. if export multiple make sure to import one
    res.status(201).json(
      {username: newUser.username, email: newUser.email}
      // {user: newUser}
    ) // status 201 succes created also send me back a user
  } catch {
    res.status(500).send()
  }
}

const login = async (req, res) => {
  console.log("users [] at login", users) 
  const user = users.find(user => user.name === req.body.name) 
  if (user == null) {
    return res.status(400).send('cant find user') 
  }
  try {
    if( await bcrypt.compare(req.body.password, user.password)) { //check what was sent against your memory 
      // res.send('success') 
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) // this is to serialize the user 
      res.json({accessToken: accessToken})
      // here i would make an access token and send it for user to store in localStorage
    } else {
      res.send('not allowed') 
    }
  } catch {
    res.status(500).send()
  }
}

const testAuth = (req, res) => {
  res.json({status: `${req.user.name} is logged in`})
}

function authenticateToken (req, res, next){ // middleware
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1] // if we have authorized user, we are targetting Bearer TOKEN here else be undefined
  if (token === null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(req)
    console.log("user", user) // user here return {iat: some number}. issued at. not an object 
    console.log("req.user", req.user) // here undefined
    if (err) return res.sendStatus(403)
    req.user = user // now wherever you authenticate you have access to user by doing req.user.name
    next()
  })
}

module.exports = { 
  users,
  signUp,
  login,
  testAuth,
  authenticateToken
}