var plaid = require("plaid");
var moment = require("moment");

var PLAID_CLIENT_ID = "5e9b96c18a49a900129cd1f3";
var PLAID_SECRET = "513e54a8369a1359eea03efcdca830";
// var PLAID_SECRET = "5f8652ce5150eb461b58b236c69682";
var PLAID_PUBLIC_KEY = "38e9fa8478f20a384db53c1176e9b7";
var PLAID_ENV = "development";
var PLAID_ENV = "sandbox";


var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: "2019-05-29", clientApp: "plaid-test" }
);

const receivePublicToken = (req, res) => {
  // First, receive the public token and set it to a variable
  let PUBLIC_TOKEN = req.body.public_token;
  // Second, exchange the public token for an access token
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    res.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID
    });
    console.log("access token below");
    console.log(ACCESS_TOKEN);
  });
};

const getTransactions = (req, res) => {
  // Pull transactions for the last 30 days
  let startDate = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");
  let endDate = moment().format("YYYY-MM-DD");
  // heres where i actually get info from plaid
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(error, transactionsResponse) {
      res.json({ transactions: transactionsResponse });
      // log transactions in nodemon terminal 
      console.log(transactionsResponse);
    }
  );
};

const getAccounts = (req, res) => {
  client.getAccounts(ACCESS_TOKEN, (err, accountsResponse) => {
    res.json({accounts: accountsResponse})
  })
}

module.exports = {
  receivePublicToken,
  getTransactions,
  getAccounts
};