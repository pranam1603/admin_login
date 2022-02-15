require('dotenv').config();

const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

const bodyParser = require('body-parser')
const auth = require('./helper/jwt')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const port = 8080;

const admConnection = require('./connection/connect')

const checkUserFilter = (req, res, next) => {
    const admRegex = '\/api\/admin\/'

    if (req._parsedUrl.pathname.match(admRegex)) auth.authenticateToken(req, res, next)
    else next()
}

app.use(cors())
app.use(checkUserFilter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./helper/verify.js')(app)
require('./routes/admin/gateway.js')(app, admConnection, uuidv4, bcrypt)

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})