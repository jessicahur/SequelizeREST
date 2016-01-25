'use strict';

var data = data || {};

const Employee = require('../model/Employee');

data.createAndSave = (res, postedEmployee) => {
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
            res.send(err);
            console.log(err);
        });
};

data.findAndReturn = (res) => {
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
};

data.findEmployeeAndReturn = (res, id) => {
  Employee.findById(id)
        .then( employee => {
          employee.toJSON();
          res.send(employee);
          })
        .catch(
          err => {
            res.send(err);
            console.log(err);
        });
};

data.putAndReturn = (res, id, update) => {
  Employee.update(update, {where: {_id: id} })
        .then(
          // array => res.send(array[0].toString()) //http://sequelize.readthedocs.org/en/latest/api/model/#updatevalues-options-promisearrayaffectedcount-affectedrows
          () => data.findEmployeeAndReturn(res, id)
        )
        .catch(
          err => {
            res.sendStatus(500);
            console.log(err);
        });
};

data.deleteEmployee = (res, id) => {
  Employee.destroy({where: {_id: id} })
          .then(
            numDeleted => res.sendStatus(200)
          )
          .catch(
            err => {
              res.sendStatus(500);
              console.log(err);
          });
}


module.exports = data;
