const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const table = process.env.RAINFALLREPORTTABLE
const Handler = require('../Handler/CommonHandler')
const handler = new Handler()
const SqlHandler = require('../Handler/SqlHandler')
const sqlHandler = new SqlHandler()

router.get('/', async (req, res) => {
    try {
        const result = `Connected to Rainfall Report Table: ${table} successfully.`
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

// http://localhost:8080/report/rainfall/getRainfallReport/0
router.get('/getRainfallReport/:id', async (req, res) => {
    try {
        const result = `Connected to Rainfall Report Table: ${table} successfully.`
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

// http://localhost:8080/report/rainfall/postRainfallReport
router.post('/postRainfallReport', async (req, res) => {
    try {
        const { sql, sqlParam } = await sqlHandler.genPostSql(table, req.body)
        const result = await sqlHandler.goSql(sql, sqlParam)
        res.send(handler.genSuccessMessage(`Inserted new record`))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

module.exports = router