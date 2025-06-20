const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/challenges', require('./routes/challenges'));
app.use('/api/solutions', require('./routes/solutions'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/moderation', require('./routes/moderation'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
  .catch((err) => console.log(err));
