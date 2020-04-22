require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pry = require('pryjs') 
const User = require('./models/User')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// just checking if stuff works
app.get("/", (req, res) => {
  res.json({text: "heres something from the backend"})
})

// authController 
const {users, signUp, login, testAuth, authenticateToken} = require("./controllers/authController");
app.get('/users', (req, res) => {res.json(users)})
app.post('/users', signUp)
app.post('/users/login', login)    
app.get("/testAuth", authenticateToken, testAuth) // itsa tesssst


// plaidController all the product info will have to be tailored witih accounts id params
const {receivePublicToken, getTransactions, getAccounts} = require("./controllers/plaidController");
app.post("/auth/public_token", receivePublicToken);
app.get("/transactions", getTransactions);
app.get("/accounts", getAccounts)





app.listen(8000, () => console.log("oh yeaaa"))





