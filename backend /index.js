const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routes);
app.set('jwtSecret', process.env.JWT_SECRET);
// Set up the MongoDB connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DB connection succes');

// Start the server after DB connection
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
});

