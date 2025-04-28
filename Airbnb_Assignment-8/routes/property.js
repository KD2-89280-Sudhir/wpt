const express = require('express');
const pool = require('../db/mysql.js');
const result = require('../utilis/result.js');
const multer = require('multer');
const upload = multer({ dest: 'images'});
const router = express.Router();

router.post('/', upload.single('icon'), (req, res)=>{
    const {categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent} = req.body
    console.log(req.body);
    const sql = `insert into property (categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent, profileImage) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    pool.query(sql, [categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent, req.file.filename], (error, data)=>{
        res.send(result.createResult(error, data));
    })
})

router.put('/:id', upload.single('icon'), (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const {categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent} = req.body
    console.log(req.body);
    const sql = `UPDATE property 
    SET categoryId = ?, 
        title = ?, 
        details = ?, 
        address = ?, 
        contactNo = ?, 
        ownerName = ?, 
        isLakeView = ?, 
        isTV = ?, 
        isAC = ?, 
        isWifi = ?, 
        isMiniBar = ?, 
        isBreakfast = ?, 
        isParking = ?, 
        guests = ?, 
        bedrooms = ?, 
        beds = ?, 
        bathrooms = ?, 
        rent = ?, 
        profileImage = ? 
    WHERE id = ?`;    
    pool.query(sql, [categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent, req.file.filename, id], (error, data)=>{
        res.send(result.createResult(error, data));
    })
})

router.get('/', (req, res)=>{
    const sql = `select * from property`;
    pool.query(sql, (error, data)=>{
        const propertyData = [];
        for(let i=0; i<data.length; i++){
            propertyData.push({
                id: data[i].id,
                title: data[i].title,
                details: data[i].details,
                rent: data[i].rent,
                profileImage: data[i].profileImage
            })
        }
        res.send(result.createResult(error, propertyData));
    })
})
router.get('/details/:id', (req, res)=>{
    const sql = `select * from property where id = ?`;
    pool.query(sql,[req.params.id], (error, data)=>{
        res.send(result.createResult(error, data));
    })
})

module.exports = router;