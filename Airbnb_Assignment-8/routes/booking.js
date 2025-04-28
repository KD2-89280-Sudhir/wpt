const express = require('express');
const router = express.Router();
const pool = require('../db/mysql.js');
const result = require('../utilis/result.js');


router.post('/', (req, res)=> {
    const {propertyId, total, fromDate, toDate} = req.body;
    const sql = `insert into bookings (userId, propertyId, total, fromDate, toDate) values(?,?,?,?,?)`;
    pool.query(sql, [req.headers.id, propertyId, total, fromDate, toDate], (error, data)=>{
        res.send(result.createResult(error, data));
    })
})


router.get('/', (req, res)=> {
    const sql = `select * from bookings where userId = ?`;
    pool.query(sql, [req.headers.id], (error, data)=>{
        if(data.length != 0){
            res.send(result.createResult(error, data));
        }else{
            res.send(result.createErrorResult('No booking found'));
        }
    })
})
module.exports = router;