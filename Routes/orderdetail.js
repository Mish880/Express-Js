const express = require('express')
const mysql = require('mysql')
const databa = require('../config/db.config')
const router = express.Router()
const connection  =mysql.createConnection(databa.database)

//order detail table created
connection.connect(function(err) {
    if(err) {
        console.log(err);
    } else {
        var orderdetailTbl = "CREATE TABLE IF NOT EXISTS orderdetail(orderId VARCHAR(10) PRIMARY KEY, itemcode VARCHAR(15) PRIMARY KEY, qty INT, unitPrice DOUBLE)";
        if(err) {
           
        } else {
           connection.query(orderdetailTbl, function(err, result) {
               if(result.warningCount===0){
                   console.log("table created")
               }
           })
        }
    }
})

//get order detail
router.get('/',(req,res) =>{
    var query = "SELECT * FROM orderdetail";
     connection.query(query, (err, rows) =>{
        if(err) console.log(err)
        res.send(rows) 
     })
})

// save order details

router.post('/', (req,res) =>{
    const orderId = req.body.orderId;
    const itemcode = req.body.itemcode;
    const qty = req.body.qty;
    const unitPrice = req.body.unitPrice;

    var query = "INSERT INTO orderdetail(orderId,itemcode,qty,unitprice) VALUES (?,?,?,?)";
    connection.query(query, [orderId,itemcode,qty,unitPrice], (err)=>{
        if (err) {
             res.send({"message": "same data"})
            
        } else {
            res.send({"message": "order detail wash saved"})
        }
    })
})

// delete order details
router.delete('/:orderid',(req,res) =>{
     const orderId = req.params.orderId
     var deleteQuery = "DELETE FROM orderdetail WHERE orderId=?";

     connection.query(deleteQuery, [orderId], (err, rows) =>{
           if(err) console.log(err);

           if (rows.affectedRows > 0) {
               res.send({"message" : "order detail was deleted"})
            
           } else {
               res.send({"message" : "order detail is not found. try it"})
           }
     })
})


module.exports = router