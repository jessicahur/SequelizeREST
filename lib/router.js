'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
//connect to mongoose and open a connection to the test database on local MongoDB

const data = require('./dataProcessing');
const router = express.Router();

router.use(bodyParser.json());

//POST: returns error JSON to inform client what was wrong
router.post('/', (req, res, next) => {
  let postedEmployee = req.body;
  data.createAndSave(res, postedEmployee);
});

//General GET
router.get('/', (req, res, next) => {
  data.findAndReturn(res);
});

//Specific get
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  data.findEmployeeAndReturn(res, id);
});

//PUT
router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  var update = req.body;
  data.putAndReturn(res, id, update);
});

//DELETE
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  data.deleteEmployee(res, id);
});

module.exports = router;


