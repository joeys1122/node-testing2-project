const express = require('express');
const Pokemon = require('./pokemon/pokemon-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('API UP');
});

server.get('/pokemon', (req, res) => {
  Pokemon.getAll()
    .then(pokemon => res.json(pokemon))
    .catch(err => console.log(err));
});

server.get('/pokemon/:id', (req, res) => {
  Pokemon.getById(req.params.id)
    .then(pokemon => res.json(pokemon))
    .catch(err => console.log(err));
});

server.post('/pokemon', (req, res) => {
  Pokemon.insert(req.body)
    .then(pokemon => res.status(201).json(pokemon))
    .catch(err => console.log(err));
});

server.delete('/pokemon/:id', (req, res) => {
  Pokemon.remove(req.params.id)
    .then(deleted => res.json(deleted))
    .catch(err => console.log(err));
});

module.exports = server;