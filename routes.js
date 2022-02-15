const express = require("express");
const userModel = require("./models");
const app = express();

app.get("/users", async (req, res) => {
    const users = await userModel.find({});
  
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.post("/addUser", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

module.exports = app;
