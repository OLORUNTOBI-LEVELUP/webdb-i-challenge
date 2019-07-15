const express = require('express');

const db = require('./data/dbConfig.js');
const accountRouter = require('./routes/accountsRouter')

const server = express();

server.use(express.json());
server.use('/', accountRouter);


  

module.exports = server;