// import the necessary modules
var mongoose = require('mongoose');
var resultSchema = new mongoose.Schema({

  name : String,
  number : Number,
  time : String
});
module.exports = mongoose.model("Result", resultSchema);
