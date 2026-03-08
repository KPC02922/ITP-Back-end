const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const table = process.env.URREPORTTABLE
const Handler = require('../Handler/CommonHandler')
const handler = new Handler()

router.get('/', async (req, res) => {
    try {
        const result = `Connected to Umbrella Rental Report Table: ${table} successfully.`
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

module.exports = router