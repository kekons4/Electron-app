const express = require("express");
const { Error } = require("mongoose");
const userModel = require("./models");
const app = express();

// Login route
app.post("/login", async (req, res) => {
  const data = req.body;
  console.log(data.username);
  try{
    const user = await userModel.findOne({username: data.username, password: data.password});
    
    if(!user) throw new Error('Account not found');
    
    console.log(user);
    res.status(200).send(user);
  } catch(err) {
    console.log(err);
    res.status(404).send('That Combination of username and password does not exist.');
  }
});

// Fetch all users
app.get("/users", async (req, res) => {
    const users = await userModel.find({});
  
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
});

// Register new account
app.post("/register", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

module.exports = app;
