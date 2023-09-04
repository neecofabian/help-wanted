// Borrows from Week 8 demo: express/server.js
'use strict';

const express = require('express')
const app = express()
const path = require('path')

console.log(__dirname)
app.use(express.static(path.join(__dirname, '/pub')))

// Send HTML to client
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/examples.html'))
})

// Listen to port 5000
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})