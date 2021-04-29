require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

const userRouter = require("./routers/userRouter");

const port = process.env.PORT;
require('./db/db');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);

mongoose.set('bufferCommands', false);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});