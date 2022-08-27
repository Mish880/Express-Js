const express = require('express')
const mysql = require('mysql')
const databa = require('../config/db.config')
const router = express.Router()
const connection  =mysql.createConnection(databa.database)





module.exports = router