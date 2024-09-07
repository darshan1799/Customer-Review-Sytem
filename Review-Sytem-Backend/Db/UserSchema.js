const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/REVIEWQUESTION";
const connect = mongoose.connect(url).then(() => {
  console.log("Connected");
});

let UsersSchema = mongoose.Schema({
  name: String,
  email: String,
  answer: Array,
});

module.exports = mongoose.model("UserReview", UsersSchema);
