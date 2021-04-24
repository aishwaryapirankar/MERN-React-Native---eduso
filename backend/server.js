require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require("./routers/userRouter");

const port = process.env.PORT;
require('./db/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);

mongoose.set('bufferCommands', false);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});