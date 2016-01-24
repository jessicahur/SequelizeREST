'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
//connect to mongoose and open a connection to the test database on local MongoDB

const Employee = require('../model/Employee');
const router = express.Router();

router.use(bodyParser.json());

//POST
router.post('/', (req, res, next) => {

  var postedEmployee = req.body;

  if (!Object.keys(postedEmployee).length) return res.sendStatus(400);

  Employee.create({
            _id: postedEmployee._id,
            name: postedEmployee.name,
            username: postedEmployee.username,
            email: postedEmployee.email,
            address: postedEmployee.address,
            phone: postedEmployee.phone,
            position: postedEmployee.position
          })
          .then(
            employee => {
              employee.toJSON();
              res.send(employee);
            })
          .catch(
            err => {
              res.sendStatus(500);
              console.log(err);
          });

});

//General GET
router.get('/', (req, res, next) => {
  Employee.findAll({})
          .then(
            employees => {
              employees = employees.map(employee => employee.toJSON() )
                                    .sort((a,b) => {
                                      return parseInt(a._id) - parseInt(b._id);
                                    });
              res.send(employees);
            })
          .catch(
            err => {
              res.sendStatus(500);
              console.log(err);
          });
});

//Specific get
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Employee.findById(id)
          .then( employee => employee.toJSON() )
          .catch(
            err => {
              res.sendStatus(500);
              console.log(err);
          });
});

//PUT
router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  var update = req.body;
  update.DOB = new Date(update.DOB);

  Employee.update(update, {where: {_id: id} })
          .then(
            array => res.send(array[0].toString()) //http://sequelize.readthedocs.org/en/latest/api/model/#updatevalues-options-promisearrayaffectedcount-affectedrows
          )
          .catch(
            err => {
              res.sendStatus(500);
              console.log(err);
          });
});

// //PATCH (Same logic as PUT)
// router.patch('/:id', (req, res, next) => {
//   var id = req.params.id;
//   var update = req.body;
//   update.DOB = new Date(update.DOB);

//   Employee.findByIdAndUpdate(id, update, {runValidators: true, multi: false}, (err, numAffected) => {
//     if (err) {
//       res.sendStatus(400);
//       return console.error(err);
//     }

//     Employee.findById(req.params.id, (err, employee) => {
//       if (err) {
//         console.error(err);
//         return res.sendStatus(500);
//       }
//       res.send(employee);
//     });

//   });
// });

//DELETE
router.delete('/:id', (req, res, next) => {
  var id = req.params.id;
  Employee.destroy({where: {_id: id} })
          .then(
            numDeleted => res.sendStatus(200)
          )
          .catch(
            err => {
              res.sendStatus(500);
              console.log(err);
          });
});
module.exports = router;


