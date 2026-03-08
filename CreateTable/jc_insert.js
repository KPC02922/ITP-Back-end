const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const fs = require('fs')
const app = express()
const port = process.env.PORT
const mysql = require('mysql2')

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)

    // fetch json file data
    const filePath = path.join(__dirname, 'JC_Location.json')
    fs.readFile(filePath, 'utf8', async (error, data) => {
        if (error) {
            console.error(`Error reading JSON file: ${error}`)
            return
        }
        else {
            try {
                const db = mysql.createPool({ host: process.env.DBHOST, user: process.env.DBUSER, password: process.env.DBPW, database: process.env.DB}).promise()
                const table = process.env.URJCTABLE

                const jsonObj = JSON.parse(data)
                const jsonArray = jsonObj.data
                for (let i = 0; i < jsonArray.length; i++) {
                    const item = jsonArray[i]
                    const sql = `INSERT INTO ${table} `
                    + `(regionCode, districtCode, location, officeHours, latitude, longitude, status) `
                    + `VALUES (?,?,?,?,?,?,?)`
                    const values = [
                        item.regionCode, item.districtCode, item.location, item.officeHours, parseFloat(item.latitude), parseFloat(item.longitude), 'N'
                    ]                    
                    //console.log(`${item.addressTC}`)
                    // const sql = `INSERT INTO ${table} `
                    // + `(regionEN, regionTC, regionSC, districtEN, districtTC, `
                    // + `districtSC, addressEN, `
                    // + `addressTC, addressSC, officeHours, `
                    // + `latitude, longitude, status) `
                    // + `VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
                    // const values = [
                    //     item.regionEN, item.regionTC, item.regionSC, item.districtEN, item.districtTC, 
                    //     item.districtSC,item.addressEN, 
                    //     item.addressTC, item.addressSC, item.officeHours, 
                    //     parseFloat(item.latitude), parseFloat(item.longitude), 'N'
                    // ]

                    db.query(sql, values, (error, result) => {
                        if (error) {
                            console.error(`Error inserting data: ${error}`)
                        }
                        else {
                            console.log(`Data jsonArray[${i}] inserted`)
                        }
                    })
                }
            } catch (error) {
                console.error(error)
                return
            }
        }
    })


})