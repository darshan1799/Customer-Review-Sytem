const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/REVIEWQUESTION";
const connect = mongoose.connect(url).then(() => {
  console.log("Connected");
});

let QuestionSchema = mongoose.Schema({
  Question: String,
  Options: Array,
});

module.exports = mongoose.model("QUESTIONS", QuestionSchema);
