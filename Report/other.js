const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const table = process.env.UROTHERTABLE
const Handler = require('../Handler/CommonHandler')
const handler = new Handler()
const SqlHandler = require('../Handler/SqlHandler')
const sqlHandler = new SqlHandler()

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

// http://localhost:8080/report/other/getOtherReport/0
router.get('/getOtherReport/:id', async (req, res) => {
    try {
        const sql = `SELECT * FROM ${table} WHERE id > ?`
        const sqlParam = [req.params.id]
        const result = await sqlHandler.goSql(sql, sqlParam)
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

// http://localhost:8080/report/other/getOtherReportCount
router.get('/getOtherReportCount', async (req, res) => {
    try {
        const sql = `SELECT COUNT(*) as count FROM ${table}`
        const result = await sqlHandler.goSql(sql)
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

// http://localhost:8080/report/other/postOtherReport
router.post('/postOtherReport', async (req, res) => {
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