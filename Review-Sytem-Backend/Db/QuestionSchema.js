const mongoose = require("mongoose");
require("dotenv").config();
//const url = "mongodb://localhost:27017/REVIEWQUESTION";
const url = process.env.MONGOURL;
const connect = mongoose.connect(url).then(() => {
  console.log("Connected");
});

let QuestionSchema = mongoose.Schema({
  Question: String,
  Options: Array,
});

module.exports = mongoose.model("QUESTIONS", QuestionSchema);
