const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Gram = require('../models/gram');

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Gram
      .insert({ ...req.body, userId: req.user.id })
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Gram
      .findById(req.params.id)
      .then(gram => res.send(gram))
      .catch(next);
  });
