const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // How we connect to mongoDB


require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // allows us to parse JSON

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established")
});

const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
}); //What starts teh server