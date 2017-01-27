// import the necessary modules
var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({

  questions : String,
  options : [{type : String}],
  correct : String
});
module.exports = mongoose.model("Questionbank", questionSchema);       //Questionbank is Model name .
