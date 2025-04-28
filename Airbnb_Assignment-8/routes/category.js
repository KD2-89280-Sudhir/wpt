const express = require('express');
const pool = require('../db/mysql.js');
const result = require('../utilis/result.js');
const path = require('path');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images'); 
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + ext); 
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('icon'), (req, res)=>{
    const {title, details} = req.body;
    const sql = `insert into category (title, details, image) values(?, ?, ?)`;
    console.log("file name: ", req.file);
    pool.query(sql, [title, details, req.file.filename], (error, data)=>{
        res.send(result.createResult(error, data));
    })
})

router.get('/:image', (req, res) => {
    const imageName = req.params.image;
    const imagePath = path.join(process.cwd(), 'images', imageName);
    console.log(__dirname, imagePath, imageName);
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error("Image not found:", err);
            res.status(404).send('Image not found');
        }
    });
});

module.exports = router;