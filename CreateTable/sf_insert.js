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
    const filePath = path.join(__dirname, 'SF_Location.json')
    fs.readFile(filePath, 'utf8', async (error, data) => {
        if (error) {
            console.error(`Error reading JSON file: ${error}`)
            return
        }
        else {
            try {
                const db = mysql.createPool({ host: process.env.DBHOST, user: process.env.DBUSER, password: process.env.DBPW, database: process.env.DB}).promise()
                const table = process.env.URSFTABLE

                const jsonObj = JSON.parse(data)
                const jsonArray = jsonObj.data
                for (let i = 0; i < jsonArray.length; i++) {
                    const item = jsonArray[i]
                    //console.log(`${item.addressTC}`)
                    const sql = `INSERT INTO ${table} `
                    + `(regionCode, districtCode, code, location, weekDayOfficeHours, satOfficeHours, sunHolidayOfficeHours, latitude, longitude, status) `
                    + `VALUES (?,?,?,?,?,?,?,?,?,?)`
                    const values = [
                        item.regionCode, item.districtCode, item.code, item.location, item.weekDayOfficeHours, item.satOfficeHours, item.sunHolidayOfficeHours, parseFloat(item.latitude), parseFloat(item.longitude), 'N'
                    ]

                    db.query(sql, values, (error, result) => {
                        if (error) {
                            console.error(`Error inserting data: ${error}`)
                        }
                        else {
                            console.log(`Data jsonArray[${i}] inserted`)
                        }
                    })
                }


                // for (let i = 0; i < jsonArray.length; i++) {
                //     const item = jsonArray[i]
                //     //console.log(`${item.addressTC}`)
                //     const sql = `INSERT INTO ${table} `
                //     + `(regionEN, regionTC, regionSC, districtEN, districtTC, `
                //     + `districtSC, code, abbreviationTC, abbreviationSC, addressEN, `
                //     + `addressTC, addressSC, weekDayOfficeHours, satOfficeHours, sunHolidayOfficeHours, `
                //     + `latitude, longitude, status) `
                //     + `VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                //     const values = [
                //         item.regionEN, item.regionTC, item.regionSC, item.districtEN, item.districtTC, 
                //         item.districtSC, item.code, item.abbreviationTC, item.abbreviationSC, item.addressEN, 
                //         item.addressTC, item.addressSC, item.weekDayOfficeHours, item.satOfficeHours, item.sunHolidayOfficeHours, 
                //         parseFloat(item.latitude), parseFloat(item.longitude), 'N'
                //     ]

                //     db.query(sql, values, (error, result) => {
                //         if (error) {
                //             console.error(`Error inserting data: ${error}`)
                //         }
                //         else {
                //             console.log(`Data jsonArray[${i}] inserted`)
                //         }
                //     })
                // }
            } catch (error) {
                console.error(error)
                return
            }
        }
    })


})