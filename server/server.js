const express = require('express');
const productRouter = require('./routes/products');
const cors = require('cors');
require('dotenv').config()






// create app
const app = express()


// PORT
const PORT = process.env.PORT || 5000;



// start app
app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});


// add middlewares
app.use(express.json());
app.use(
    cors({
        // origin: 'http://localhost:5173', // frontend link
        origin: "*",
        credentials: true
    })
);


// mount routes
app.use("/api/v1/products", productRouter)


// Default Route
app.get('/', (req, res) => {
    console.log('Your server is up and running..!');
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
})


// Test route
app.get('/test', (req, res) => {
    console.log('Your server is up and running..!');
    res.status(201), json({
        success: true,
        message: "This is Test route"
    });
})
