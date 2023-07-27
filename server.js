require('dotenv').config()
const express = require('express')
require('./src/connection/mongoConnection')
const userRoute = require('./src/routes/userRoute')
var bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

//importing routes
userRoute(app)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})