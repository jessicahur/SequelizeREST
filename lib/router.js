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
    DOB: new Date(postedEmployee.DOB),
    email: postedEmployee.email,
    address: postedEmployee.address,
    phone: postedEmployee.phone,
    position: postedEmployee.position
  }).then(
    employee => {
      res.send(employee);
    },
    err => {
      res.sendStatus(500);
    }
  )

});

// //General GET
router.get('/', (req, res, next) => {
  console.log(url.parse(req.url));
  Employee.findAll({}).then(
    employees => {
      res.send(employees);
    },
    err => {
      res.send(500);
    });
});

// //Specific get
// router.get('/:id', (req, res, next) => {
//   var id = req.params.id;
//   Employee.findById(id, (err, employee) => {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(500);
//     }
//     res.send(employee);
//   });
// });

// //PUT
// router.put('/:id', (req, res, next) => {
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

// //DELETE
// router.delete('/:id', (req, res, next) => {
//   Employee.where().findOneAndRemove({'_id': req.params.id}, {}, (err, removedEmployee) => {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(500);
//     }
//     res.send(removedEmployee);
//   });
// });
module.exports = router;


