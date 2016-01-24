const Employee = require('./model/Employee');
const app = require('./lib/app');

Employee.sync()
        .then(
          () => {
            app.listen(3000, () => {
              console.log('Server has started. Listening on port 3000...');
            })
          })
        .catch( err => console.log(err) );


