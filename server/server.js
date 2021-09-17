const express = require('express');
const cors = require('cors');
const env = require('./app/config/env');
const app = express();

const init = require('./init');

app.use(cors(env.corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require('./app/models');

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  init.initial();
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to projet-libre-wac application.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/game.routes')(app);
require('./app/routes/equipment.routes')(app);

// set port, listen for requests
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}.`);
});
