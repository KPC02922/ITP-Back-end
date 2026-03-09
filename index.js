const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const cors = require('cors')
const Handler = require('./Handler/CommonHandler')
const handler = new Handler()
const ErrorCodeHandler = require('./Handler/ErrorCodeHandler')
const errorCodeHandler = new ErrorCodeHandler()

// http://localhost:8080/
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const reportFlooding = require('./Report/flooding')
const reportRainfall = require('./Report/rainfall')
const reportOther = require('./Report/other')
const umbrellaRentalJc = require('./UmbrellaRental/hkJockeyClub')
const umbrellaRentalSf = require('./UmbrellaRental/sfExpress')

app.use('/report/flooding', reportFlooding)
app.use('/report/rainfall', reportRainfall)
app.use('/report/other', reportOther)
app.use('/umbrellaRental/hkJockeyClub', umbrellaRentalJc)
app.use('/umbrellaRental/sfExpress', umbrellaRentalSf)

// handle undefined path
app.use((req, res) => {
    const [error_code, error_message] = errorCodeHandler.url_error()
    res.status(error_code).send(handler.genErrorMessage(error_code, error_message))
})