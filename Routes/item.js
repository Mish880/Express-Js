const express = require('express')
const mysql = require('mysql')
const databa = require('../config/db.config')
const router = express.Router()
const connection  =mysql.createConnection(databa.database)


//item table
connection.connect(function (err) {
    if(err) {
        console.log(err);
    } else {
        
        var itemtable = "CREATE TABLE IF NOT EXISTS item(itemcode VARCHAR(255)PRIMARY KEY, name VARCHAR(255), qtyonHand INT, unitprice DOUBLE)"
        connection.query(itemtable, function(err,result) {
          
        })
    }
}) 

/*get all items*/
router.get('/', (req, res) => {
    var getAllitemQuery = "SELECT * FROM item";
    connection.query (getAllitemQuery,(err, rows) => {
         if(err) console.log(err);
         res.send(rows);
    })
})

/*save items*/ 
router.post('/',(req, res) => {
    const itemcode = req.body.itemcode;
    const name = req.body.name;
    const qtyonHand = req.body.qtyonHand;
    const unitprice = req.body.unitprice;

    var saveitemQuery = "INSERT INTO item(itemcode,name,qtyonHand,unitprice) VALUES(?,?,?,?)";

    connection.query(saveitemQuery,[itemcode,name,qtyonHand,unitprice], (err) => {
        if (err) {
            res.send({"message" : "same key"})

        } else {
            res.send({"message" : "item details is ok"})
        }
    }) 
})

/*update items*/
router.put('/', (req, res) => {
    const itemcode = req.body.itemcode;
    const name = req.body.name;
    const qtyonHand = req.body.qtyonHand;
    const unitprice = req.body.unitprice;

    var updateitemQuery = "UPDATE item SET name=?,address=?,salary=? WHERE itemcode=?";
    connection.query(updateitemQuery, [name, qtyonHand, unitprice, itemcode], (err, rows) => {
        if (err) {
            res.send({"message" : "item update"})

        } else {
            res.send({"message" : "item is error. try again"})
        }
    })
})

/*search items*/

router.get('/:itemcode', (req,res) => {
    const itemcode = req.params.itemcode;

    var searchitemQuery = "SELECT * FROM item WHERE itemcode=?";

    connection.query(searchitemQuery, [itemcode], (err, row) => {
        if(err) console.log(err);
        res.send(rows);
    })
})

/*delete items*/ 

router.delete('/:itemcode', (req,res) => {
    const id = req.params.id;
    var deleteQuery = "DELETE FROM item WHERE id=?";

    connection.query(deleteQuery, [id], (err, rows) => {
        if(err) console.log(err);

        if(rows.affectedRows > 0) {
            res.send({"message" : " data deleted"})
        } else {
            res.send({"message" : "data was not found. try it"})
        }
    })
})





module.exports = router;