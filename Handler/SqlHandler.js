const dotenv = require('dotenv')
dotenv.config()
const mysql = require('mysql2')
const Handler = require('./CommonHandler')
const ErrorCodeHandler = require('./ErrorCodeHandler')
const errorCodeHandler = new ErrorCodeHandler()

module.exports = class SqlHandler extends Handler{
    constructor(){
        super()
    }

    async goSql(sql, sqlParam) {
        try {
            const db = mysql.createPool({ host: process.env.DBHOST, user: process.env.DBUSER, password: process.env.DBPW, database: process.env.DB}).promise()
            console.log(`connect db`)
            console.log(`sql: ${sql}\nsqlParam: ${sqlParam}`)
            const result = await db.query(sql, sqlParam)
            return result[0]
        } catch (error) {
            const [error_code, error_message] = errorCodeHandler.goSql_error()
            throw new Error(super.genErrorMessage(error_code, error_message))
        }
    }

    async genPostSql(table, reqBody) {
        try {
            console.log(`genPostSql, table: ${table}, reqBody: ${JSON.stringify(reqBody)}`)

            if (reqBody == null || reqBody == undefined) {
                const [error_code, error_message] = errorCodeHandler.empty_request_body_error()
                console.log(`error_code: ${error_code}, error_message: ${error_message}`)
                throw new Error(super.genErrorMessage(error_code, error_message))
            }

            const column = await this.getColumn(table, true)
            console.log(`genPostSql, column: ${column}`)
            const sql = `INSERT INTO ${table} (${column.join(',')}) VALUES (${column.map(() => '?').join(',')})`
            console.log(`genPostSql, sql: ${sql}`)
            let sqlParam = []
            for (let i = 0; i < column.length; i++) {
                const targetColumn = column[i].toString()
                if (targetColumn != "status") {
                    if (targetColumn != "location" && !reqBody[targetColumn]) {
                        const [error_code, error_message] = errorCodeHandler.missing_column_error(targetColumn)
                        console.log(`error_code: ${error_code}, error_message: ${error_message}`)
                        throw new Error(super.genErrorMessage(error_code, error_message))
                    }
                    sqlParam.push(reqBody[targetColumn])
                }
                else {
                    sqlParam.push("N")
                }
            }

            console.log(`sql: ${sql}`)
            console.log(`sqlParam: ${sqlParam}`)

            return { sql, sqlParam }
        } catch (error) {
            throw error.message
        }
        
    }

    async genPutSql(table, req) {
        try {
            const id = req.params.id
            if (!id) {
                const [error_code, error_message] = errorCodeHandler.missing_id_error()
                console.log(`error_code: ${error_code}, error_message: ${error_message}`)
                throw new Error(super.genErrorMessage(error_code, error_message))
            }
            
            if (req.body == null || req.body == undefined || Object.keys(req.body).length === 0) {
                const [error_code, error_message] = errorCodeHandler.empty_request_body_error()
                console.log(`error_code: ${error_code}, error_message: ${error_message}`)
                throw new Error(super.genErrorMessage(error_code, error_message))
            }

            if (Object.keys(req.body).includes('status')) {
                if (req.body.status !== 'N' && req.body.status !== 'C') {
                    const [error_code, error_message] = errorCodeHandler.invalid_status_error()
                    console.log(`error_code: ${error_code}, error_message: ${error_message}`)
                    throw new Error(super.genErrorMessage(error_code, error_message))
                }
            }

            console.log(`genPutSql, table: ${table}, req.body: ${JSON.stringify(req.body)}`)
            const sql = `UPDATE ${table} SET ${Object.keys(req.body).map(key => `${key} = ?`).join(', ')} WHERE id = ?`
            const sqlParam = [...Object.keys(req.body).map(key => req.body[key]), id]

            console.log(`sql: ${sql}`)
            console.log(`sqlParam: ${sqlParam}`)
            return { sql, sqlParam }
        } catch (error) {
            throw error.message
        }
    }

    async getColumn(table, filter){
        try {
            const db = mysql.createPool({ host: process.env.DBHOST, user: process.env.DBUSER, password: process.env.DBPW, database: process.env.DB}).promise()
            const result = await db.query(`SELECT * FROM ${table} LIMIT 1`, [])
            const record = result[0][0]
            const key = Object.keys(record)
            let column = key

            if (filter) {
                column = key.filter(item => item !== `id` && item !== `lastUpdateTime` && item !== `postTime` && item !== `updateTime`)
            }

            console.log(`getColumn, table: ${table}, column: ${column}`)

            return column
        } catch (error) {
            throw super.genErrorMessage(600, 'Database query error')
        }
    }

}