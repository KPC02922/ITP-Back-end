const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const table = process.env.UROTHERTABLE
const Handler = require('../Handler/CommonHandler')
const handler = new Handler()
const SqlHandler = require('../Handler/SqlHandler')
const sqlHandler = new SqlHandler()
const ErrorCodeHandler = require('../Handler/ErrorCodeHandler')
const errorCodeHandler = new ErrorCodeHandler()

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
        const isNumber = Number.isFinite(+req.params.id)
        if (!isNumber) {
            const [error_code, error_message] = errorCodeHandler.data_type_error_id()
            console.log(`error_code: ${error_code}, error_message: ${error_message}`)
            res.status(error_code).send(handler.genErrorMessage(error_code, error_message))
            res.end()
            return
        }
        const sql = `SELECT * FROM ${table} WHERE id > ? AND status = 'N'`
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


// http://localhost:8080/report/other/updateOtherReport/1
router.put('/updateOtherReport/:id', async (req, res) => {
    try {
        const isNumber = Number.isFinite(+req.params.id)
        if (!isNumber) {
            const [error_code, error_message] = errorCodeHandler.data_type_error_id()
            console.log(`error_code: ${error_code}, error_message: ${error_message}`)
            res.status(error_code).send(handler.genErrorMessage(error_code, error_message))
            res.end()
            return
        }
        const { sql, sqlParam } = await sqlHandler.genPutSql(table, req)
        const result = await sqlHandler.goSql(sql, sqlParam)
        res.send(handler.genSuccessMessage(`Updated record`))
        res.end()
    }
    catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

module.exports = router