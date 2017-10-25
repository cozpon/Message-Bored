//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const routes = require('./routes');

const db = require('./models');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use('/api', routes);


app.listen(port, () => {
  db.sequelize.sync({ force : true });
  console.log("Server's UP" + `${port}`);
});