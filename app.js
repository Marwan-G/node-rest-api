const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const morgan = require('morgan')


try {
 const mongoURI = 'mongodb://' + process.env.ROOT + ':' + process.env.PASSWORD + '@127.0.0.1:27017/admin';

 console.log(mongoURI)

 const db = mongoose.connect(mongoURI)
 debugger

} catch (error) {
 console.log("this is the DB ERRROR", error.name)
}
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');
app.use(express.json())
app.use(morgan('dev'));

// Middleware to set up CORS headers
app.use((req, res, next) => {
 // Allow requests from any origin
 res.header('Access-Control-Allow-Origin', '*');
 // Allow specified headers
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

 // Handle preflight requests (OPTIONS)
 // if (req.method === 'OPTIONS') {
 //  console.log(req.method)
 // Allow specified methods
 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
 //  return res.sendStatus(200);
 // }
 next();
});

//middelware forwards requests to Products and orders
app.use('/products', productRoutes);
app.use('/order', orderRoutes);

app.use((res, req, next) => {
 const error = new Error('Not Found');
 error.status = 404;
 next(error)
})

app.use((error, req, res, next) => {
 res.status(error.status || 500);
 res.json({
  error: {
   message: error.message
  }
 })
})



module.exports = app;