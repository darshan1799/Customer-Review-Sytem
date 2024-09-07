const express = require("express");
const Questions = require("./Db/QuestionSchema");
const Userschema = require("./Db/UserSchema");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(express.json());
app.use(CookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/api/getquestions", async (req, res) => {
  try {
    const data = await Questions.find({});
    res.send(data);
  } catch (e) {
    res.status(404).send("Please Try Again Later");
  }
});

app.post("/api/user", async (req, res) => {
  const ExistUser = await Userschema.find({ email: req.body.email });
  if (String(ExistUser) == "") {
    let addData = new Userschema(req.body);
    addData = await addData.save();
    console.log(addData);
    let token = jwt.sign(req.body, "DARSHANSUTARIYA", {
      expiresIn: 60 * 60 * 1000,
    });
    res.cookie("token", token, { credentials: true });
    res.send("Register Successfully");
  } else {
    res.status(404).send("You Are Already Give A Review");
  }
});

app.put("/api/answer", async (req, res) => {
  let userDetails = {};
  console.log(req.body);
  try {
    userDetails = await jwt.verify(req.cookies.token, "DARSHANSUTARIYA");
    const userAnswers = await Userschema.find({ email: userDetails.email });

    const userData = await Userschema.updateOne(
      { email: userDetails.email, name: userDetails.name },
      {
        $set: { answer: req.body },
      }
    );
    if (userData.acknowledged) {
      res.send({ msg: "Your Review Submitted" });
    } else {
      res.status(404).send({ msg: "please try again" });
    }
  } catch (e) {
    res.status(401).send({ msg: "User Not Authenticated" });
  }
});

app.listen(process.env.PORT || 2000, () => {
  console.log("App Listen On 2000");
});
