const express = require('express');
const router = require('./router');
const app = express();

app.use('/employees',router);

app.use(function(req, res, next) {
  res.send('404 page not found for '+req.url);
});

module.exports = app;
