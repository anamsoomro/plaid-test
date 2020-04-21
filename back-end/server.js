const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pry = require('pryjs')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json({text: "heres something from the backend"})
})

// this pulls methods from the controller to use in the routes
const {receivePublicToken, getTransactions} = require("./controllers/controller");

// Get the public token and exchange it for an access token
app.post("/auth/public_token", receivePublicToken);
// app.post("/auth/public_token", () => {
//   console.log("this post was hit")
// });


// Get Transactions
app.get("/transactions", getTransactions);
// app.get("/transactions", () => {
//   console.log("this get was hit")
// });

app.listen(8000, () => console.log("oh yeaaa"))





