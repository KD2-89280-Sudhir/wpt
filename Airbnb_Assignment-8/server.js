const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config/config.js');
const result = require('./utilis/result.js');
const app = express();

app.use(cors());
app.use(express.static("./images"));
app.use(express.json());
app.use((req,res,next)=>{
    if(req.url === '/users/login' || req.url === '/users/registration' || req.url.startsWith('/image/') || req.url === '/users/activateProfile'){
        //skip authentication for these routes
        next();
    }else{
        // getthe token
        // const authtoken = req.headers.token;
        const token = req.headers.token
            if (token) {
                try {
                    const payload = jwt.verify(token, config.secret)
                    req.headers.id = payload.id
                    next()
                } catch (error) {
                    res.send(result.createErrorResult('Token is Invalid'))
                }
            }
            else{
                res.send(result.createErrorResult('Token is Missing'))
            }
    }
})
// app.use(authentication);

const userRoute = require('./routes/user.js');
const categoryRoute = require('./routes/category.js');
const propertyRoute = require('./routes/property.js');
// const imageRoute = require('./routes/image.js');
const bookingRoute = require('./routes/booking.js');


app.use('/users', userRoute);
app.use('/property', propertyRoute);
app.use('/category', categoryRoute);
app.use('/booking', bookingRoute);
// app.use('/image', imageRoute);
app.get('/', (req, res) => {
    res.send(result.createResult(null, "Welcome to the API!"));
})

app.listen(4000, 'localhost', ()=>{
    console.log("Server started on port 4000");
})