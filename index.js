const express = require('express')
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoConnect = require('./databaseAuth/mongoConnect');
const authRoute = require('./routes/auth_route');
const pvtRoute = require('./routes/private_routes');

// Create the express app
const app = express()
const port = process.env.PORT || 5000
mongoConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes and middleware
// app.use(/* ... */)
// app.get(/* ... */)
app.use('/api/user',authRoute)
app.use('/api/pvt',pvtRoute)
// Error handlers
app.use(function fourOhFourHandler (req, res) {
  res.status(404).send()
})
app.use(function fiveHundredHandler (err, req, res, next) {
  console.error(err)
  res.status(500).send()
})

// Start server
app.listen(port, function (err) {
  if (err) {
    return console.error(err)
  }
  console.log(`Server Started at :${port}`)
})