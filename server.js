//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const methodOverride = require('method-override');
const db = require('./models');
const path = require('path');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use('/api', routes);
app.use(methodOverride('_method'));


app.get('*', (req, res, next) => {
  res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});


app.listen(port, () => {
  db.sequelize.sync({ force : false });
  console.log("Server's UP" + `${port}`);
});