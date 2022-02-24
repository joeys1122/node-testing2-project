const express = require('express');
const Pokemon = require('./pokemon/pokemon-model');

const server = express();

server.use(express.json());

const checkId = async (req, res, next) => {
  const poke = await Pokemon.getById(req.params.id);
  if(!poke) {
    res.status(404).json({message:`pokemon with id ${req.params.id} not found`})
  } else {
    next();
  }
}

const checkName = async (req, res, next) => {
  if(!req.body.name || !req.body.name.trim()) {
    res.status(422).json({message:'please enter a name'});
  } else {
    next();
  }
}

server.get('/', (req, res) => {
  res.send('API UP');
});

server.get('/pokemon', (req, res) => {
  Pokemon.getAll()
    .then(pokemon => res.json(pokemon))
    .catch(err => console.log(err));
});

server.get('/pokemon/:id', checkId, (req, res) => {
  Pokemon.getById(req.params.id)
    .then(pokemon => res.json(pokemon))
    .catch(err => console.log(err));
});

server.post('/pokemon', checkName, (req, res) => {
  Pokemon.insert(req.body)
    .then(pokemon => res.status(201).json(pokemon))
    .catch(err => console.log(err));
});

server.delete('/pokemon/:id', checkId, (req, res) => {
  Pokemon.remove(req.params.id)
    .then(deleted => {
      if(deleted === 1) {
        res.json({message:`pokemon with id ${req.params.id} deleted`});
      } else {
        res.status(500).json({message:'error deleting pokemon'});
      }
    })
    .catch(err => console.log(err));
});

module.exports = server;