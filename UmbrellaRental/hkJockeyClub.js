const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const table = process.env.URJCTABLE
const Handler = require('../Handler/CommonHandler')
const handler = new Handler()
const SqlHandler = require('../Handler/SqlHandler')
const sqlHandler = new SqlHandler()
const ErrorCodeHandler = require('../Handler/ErrorCodeHandler')
const errorCodeHandler = new ErrorCodeHandler()

// http://localhost:8080/umbrellaRental/hkJockeyClub
router.get('/', async (req, res) => {
    try {
        const result = `Connected to JC Umbrella Rental Table: ${table} successfully.`
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

// http://localhost:8080/umbrellaRental/hkJockeyClub/getLocation
router.get('/getLocation', async (req, res) => {
    try {
        const sql = `SELECT * FROM ${table} WHERE status = 'N'`
        const result = await sqlHandler.goSql(sql)
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

// http://localhost:8080/umbrellaRental/hkJockeyClub/getLastUpdateTime
router.get('/getLastUpdateTime', async (req, res) => {
    try {
        const sql = `SELECT lastUpdateTime FROM ${table} GROUP BY lastUpdateTime ORDER BY lastUpdateTime DESC LIMIT 1`
        const result = await sqlHandler.goSql(sql)
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

// http://localhost:8080/umbrellaRental/hkJockeyClub/postLocation
router.post('/postLocation', async (req, res) => {
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

// http://localhost:8080/umbrellaRental/hkJockeyClub/updateRecord/0
router.put('/updateRecord/:id', async (req, res) => {
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
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

module.exports = router