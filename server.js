const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb+srv://mychef:mychef@cluster0.zj31c2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
    { useNewUrlParser: true, useUnifiedTopology: true });

// Increase the payload size limit
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increase limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Increase limit as needed

const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipeRoutes');
const settingsRouter = require('./routes/settings');

app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/settings', settingsRouter);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
