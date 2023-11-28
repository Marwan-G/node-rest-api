//const express = require("express")
const http = require('http')
const app = require('./app')
port = process.env.PORT || 3000;
//app.listen(PORT, () => {
//  console.log("Im listening on Port 3000")
// })
const server = http.createServer(app);
server.listen(port, () => {
 console.log(`Server is running on port ${port}`)
})