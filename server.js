const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://mychef:mychef@cluster0.zj31c2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
    { useNewUrlParser: true, useUnifiedTopology: true });

    app.use(cors());
    app.use(express.json());
    
    const usersRouter = require('./routes/users');
    app.use('/users', usersRouter);
    
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });