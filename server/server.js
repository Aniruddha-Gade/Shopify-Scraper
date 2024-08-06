const express = require('express')
require('dotenv').config()






// create app
const app = express()


// PORT
const PORT = process.env.PORT || 5000;



// start app
app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});



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
