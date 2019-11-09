// Configuring the database
const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

// Connecting to the database
mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // Listen for requests
  app.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
