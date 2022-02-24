const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('API UP');
});

server.get('/pokemon', (req, res) => {
  res.end();
});

server.get('/pokemon/:id', (req, res) => {
  res.end();
});

server.post('/pokemon', (req, res) => {
  res.end();
});

server.delete('/pokemon/:id', (req, res) => {
  res.end();
});

module.exports = server;