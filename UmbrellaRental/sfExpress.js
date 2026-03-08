const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const table = process.env.URSFTABLE
const Handler = require('../Handler/CommonHandler')
const handler = new Handler()
const SqlHandler = require('../Handler/SqlHandler')
const sqlHandler = new SqlHandler()

// http://localhost:8080/umbrellaRental/sfExpress
router.get('/', async (req, res) => {
    try {
        const result = `Connected to SF Umbrella Rental Table: ${table} successfully.`
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

// http://localhost:8080/umbrellaRental/sfExpress/getLocation
router.get('/getLocation', async (req, res) => {
    try {
        const sql = `SELECT * FROM ${table} `
        const result = await sqlHandler.goSql(sql)
        res.send(handler.genSuccessMessage(result))
        res.end()
    } catch (error) {
        res.status(parseInt(JSON.parse(error).error_code)).send(error)
        res.end()
    }
})

// http://localhost:8080/umbrellaRental/sfExpress/getLastUpdateTime
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

// http://localhost:8080/umbrellaRental/sfExpress/postLocation
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

// http://localhost:8080/umbrellaRental/sfExpress/updateLocation
router.put('/updateLocation/:id', async (req, res) => {
    try {
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