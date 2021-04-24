const mongoose = require("mongoose");
const User = require('../models/User')

const main = async() => {
  const con = await mongoose.connect('mongodb://localhost:27017/eduso', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  //await con.disconnect();
}

main();
