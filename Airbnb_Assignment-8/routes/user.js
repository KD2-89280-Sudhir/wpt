const express = require('express');
const cryptojs = require('crypto-js');
const pool = require('../db/mysql.js');
const jwt = require('jsonwebtoken');
const result = require('../utilis/result.js');
const config = require('../config/config.js');
const router = express.Router();


router.post('/registration',(req, res)=>{
    const {firstName, lastName, email, password, phone} = req.body;
    const encryptedPassword = cryptojs.SHA256(password).toString();
    const sql = `insert into user (firstName, lastName, email, password, phoneNumber) values(?,?,?,?,?)`;
    pool.query(sql, [firstName, lastName, email, encryptedPassword, phone], (error, data)=>{
        res.send(result.createResult(error, data));
    })
})

router.post('/login',(req, res)=>{
    const {email, password} = req.body;
    const encryptedPassword = cryptojs.SHA256(password).toString();
    const sql = `select * from user where email = ? and password = ?`;
    pool.query(sql, [email, encryptedPassword], (error, data)=>{
        if(data){
            if(data.length != 0){
                if(data[0].isDeleted == 1){
                    res.send(result.createErrorResult('User is deleted'));
                }else{
                    const userId = data[0].id;
                    const payload = {
                        id : userId
                    }
                    const token = jwt.sign(payload, config.secret);
                    console.log(token);
                    const fullName = data[0].firstName + ' ' + data[0].lastName;
                    const userData = {
                        name: fullName,
                        token: token
                    }
                    res.send(result.createResult(error, userData));
                }
            }else{
                res.send(result.createErrorResult('Invalid email or password'));

            }
        }else{
            res.send(result.createErrorResult(error));
        }
        
    })
})

router.get('/profile',(req, res)=>{
    sql = `select * from user where id = ?`;
    pool.query(sql, [req.headers.id], (error, data)=>{
        if(data){
            if(data.length != 0){
                if(data[0].isDeleted == 1){
                    res.send(result.createErrorResult('User is deleted'));
                }else{
                    const userData = {
                        firstName: data[0].firstName,
                        lastName: data[0].lastName,
                        phoneNumber: data[0].phoneNumber,
                        email: data[0].email,
                    }
                    res.send(result.createResult(error, userData));
                }
                
            }else{
                res.send(result.createErrorResult('User not found'));
            }
        }else{
            res.send(result.createErrorResult(error));
        }
        
    })
})

router.put('/profile', (req, res)=>{
    const {firstName, lastName, phone} = req.body;
    const sql = `update user set firstName = ?, lastName = ?, phoneNumber = ? where id = ?`;
    pool.query(sql, [firstName, lastName, phone, req.headers.id], (error, data)=>{
        if(data){
            if(data.affectedRows != 0){
                res.send(result.createResult(error, data));
            }else{
                res.send(result.createErrorResult('User not found'));
            }
        }else{
            res.send(result.createErrorResult(error));
        }
        
    })
})

router.put('/activateProfile', (req, res)=>{
    const { email } = req.body;
    const sql = `update user set isDeleted = 0 where email = ?`;

    pool.query(sql, [email], (error, data) => {
        if (error) {
            res.send(result.createErrorResult(error));
        } else if (data.affectedRows != 0) {
            res.send(result.createResult(null, "User Activated Successfully"));
        } else {
            res.send(result.createErrorResult('User not found'));
        }
    });
})

router.delete('/profile', (req, res)=>{
    // const {email} = req.body;
    const sql = `update user set isDeleted = 1 where id = ?`;
    pool.query(sql, [req.headers.id], (error, data)=>{
        if(data){
            if(data.affectedRows != 0){
                res.send(result.createResult(error, data));
            }else{
                res.send(result.createErrorResult('User not found'));
            }
        }else{
            res.send(result.createErrorResult(error));
        }
        
    })
})


module.exports = router;