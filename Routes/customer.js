const { query } = require('express')
const express = require('express')
const mysql = require('mysql')
const databa = require('../config/db.config')
const router = express.Router()
const connection  =mysql.createConnection(databa.database)

connection.connect(function (err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Connection Established and connected mysql");
        var customertable = "CREATE TABLE IF NOT EXISTS customer(id VARCHAR(255)PRIMARY KEY, name VARCHAR(255), address TEXT, salary DOUBLE)"
        connection.query(customertable, function(err,result) {
            if(result.warningCount === 0) {
                console.log("table created");
            }
        })
    }
}) 

router.get('/', (req, res) => {
    var getAllQuery = "SELECT * FROM customer";
    connection.query (getAllQuery,(err, rows) => {
         if(err) console.log(err);
         res.send(rows);
    })
})

router.post('/',(req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const contact = req.body.contact;

    var saveQuery = "INSERT INTO customer(id,name,address,contact) VALUES(?,?,?,?)";

    connection.query(saveQuery,[id,name,address,salary], (err) => {
        if (err) {
            res.send({"message" : "same key"})

        } else {
            res.send({"message" : "Customer details is ok"})
        }
    }) 
})


router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const contact = req.body.contact;

    var updateQuery = "UPDATE customer SET name=?,address=?,salary=? WHERE id=?";
    connection.query(updateQuery, [name, address, contact, id], (err, rows) => {
        if (err) {
            res.send({"message" : "customer update"})

        } else {
            res.send({"message" : "Customer is error. try again"})
        }
    })
})



router.get('/:id', (req,res) => {
    const id = req.params.id;

    var searchQuery = "SELECT * FROM customer WHERE id=?";

    connection.query(searchQuery, [id], (err, row) => {
        if(err) console.log(err);
        res.send(rows);
    })
})


router.delete('/:id', (req,res) => {
    const id = req.params.id;
    var deleteQuery = "DELETE FROM customer WHERE id=?";

    connection.query(deleteQuery, [id], (err, rows) => {
        if(err) console.log(err);

        if(rows.affectedRows > 0) {
            res.send({"message" : " date deleted"})
        } else {
            res.send({"message" : "data was not found. try it"})
        }
    })
})

module.exports = router;