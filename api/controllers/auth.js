require("dotenv").config();

SECRET =
  "f560bf0c02e7fa51af64064111a8ab8c40cebc967b849e60f7bdb6bcc25aa82d2e50846f15cfd8e1057a3cb7658962c12cf8967bb7f62b2671f24836ceaac6df";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

<<<<<<< HEAD
const User = require("../models/users");

async function create(req, res) {
  try {
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(req.body.password, salt);
      await User.create({ ...req.body, passwordHash: hashed });
      res.status(201).json({ message: "User has been created successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function checkLogin(req, res) {
  try {
    const user = await User.findByUserName(req.body.userName);
    if (!user) {
      throw new Error("No user found");
    }
    const authed = bcrypt.compare(req.body.password, user.passwordHash);
    if (!!authed) {
      const payload = { username: user.userName };
      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation");
        }
        res.status(200).json({
          success: true,
          token: "Bearer " + token,
        });
      };
      jwt.sign(payload, SECRET, sendToken);
    } else {
      throw new Error("User could not be authenticated");
=======
async function create(req, res)  {
    try {
        console.log("hello")
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        console.log("hello" + hashed);
        //if (!User.findById(req.body)) {
        await User.create({...req.body, passwordHash: hashed});
        res.status(201).json({message: "User has been created successfully"});
    //}
    //else(err)
    } catch (err) {
        res.status(500).json({err});
>>>>>>> a43926d639ae5ee4c23ea1f4e5b764944855a5d8
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
}

module.exports = { create, checkLogin };
