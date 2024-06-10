const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const routes = require('./routes'); 

dotenv.config();

const server = express();
server.use(express.json());

// Serve static files from the React app
server.use(express.static(path.join(__dirname, 'client/build')));

// API routes
server.use('/api', routes); 

// Catchall handler: for any request that doesn't match one above, send back React's index.html file.
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



module.exports = server;
